import FormModel from "./FormModel.js"
import FormTemplate from "../ui/FormTemplate.js"
import generateReqNums from "../utils/generateReqNums.js"
import ConfirmSendModalController from "../ui/ConfirmSendModalController.js"
import showNotification from "../ui/showNotification.js"
import getCustomField from "../ui/CustomFieldTemplate.js"
import {fullDateValidator, shortDateValidator} from "../utils/dateUtils.js";
// import FormsController from "../ui/FormsController.js"
export default class Manager{
    constructor (state){
        this.state = state
        this.typeValidator = this.state.typeValidator
        this.warningModal = new ConfirmSendModalController()
        
    }
    container = document.querySelector('#container')
    set(val, prop){
        this.state[prop] = val
    }
    mountForms(startIndex, newSize) {
        return new Promise(resolve => {
            const batchSize = 50;
            let i = startIndex;
    
            const renderBatch = () => {
                let counter = 0;
                const fragment = document.createDocumentFragment();
    
                while (i < newSize && counter < batchSize) {
                fragment.appendChild(
                    FormTemplate(i, this.state.typeValidator,this.state.customFieldsTypesMap, this.state.formProps)
                );
                i++;
                counter++;
                }
    
                this.container.appendChild(fragment);
    
                if (i < newSize) {
                requestAnimationFrame(renderBatch);
                } else {
                    resolve()
                }
            };
    
            requestAnimationFrame(renderBatch);
        })
    }
    // saveUnloadedForms(unsendedIDs){
    //     this.state.backupForms = this.state.forms
    //     this.state.forms.map(form => {
    //         if(form.formProps.requestNumber.indexOf(unsendedIDs) == -1){
    //             this.state.removeExactForm(form.formId)
    //         }
    //     })

    // }
    // cleanup(){
    //     this.clearAllForms()
    //     this.state.cleanup()

    //     console.log(this.state)
    // }
    // renderUnsendedForms(){
    //     if(this.state.forms.length){
    //         this.cleanup()
    //         this.size = 0
    //         this.newSize = this.state.forms
    //         this.mountManager()
    //     }
    // }
    mountCustomField(formId, fieldId){
        const form = document.querySelector(`form[data-form-id="${formId}"]`)
        const container = form.querySelector('[name="customFieldsContainer"]')
        const fragment = document.createDocumentFragment();
        fragment.appendChild(getCustomField({formId:formId, customFieldId:fieldId, types: this.state.customFieldsTypesMap}))
        container.appendChild(fragment)
    }
    // clearForms(removeCount){
        
    //     const batchSize = 50;
    //     let toRemove = removeCount;

    //     const renderBatch = () => {
    //         let counter = 0;
    //         while (toRemove > 0 && counter < batchSize) {
    //         const forms = this.container.querySelectorAll('[name="formContainer"]');
    //         if (forms.length === 0) break;
    //         forms[forms.length - 1].remove();
    //         toRemove--;
    //         counter++;
    //         }

    //         if (toRemove > 0) {
    //         requestAnimationFrame(renderBatch);
    //         }
    //     };

    //     requestAnimationFrame(renderBatch);
    // }
    // clearAllForms(){
    //     this.clearForms(this.state.forms.length)
    // }
    unmountForms(removeCount) {
        if (removeCount <= 0) return;
         const batchSize = 50;
        let toRemove = removeCount;

        const renderBatch = () => {
            let counter = 0;
            while (toRemove > 0 && counter < batchSize) {
            const forms = this.container.querySelectorAll('[name="formContainer"]');
            if (forms.length === 0) break;
            forms[forms.length - 1].remove();
            toRemove--;
            counter++;
            }

            if (toRemove > 0) {
            requestAnimationFrame(renderBatch);
            }
        };

        requestAnimationFrame(renderBatch);

    }
    generateFormNumbers(){
        const generator = generateReqNums()
        this.state.forms.forEach(form => form.formProps['requestNumber'] = String(generator()))
        this.renderNewInputs('requestNumber')
    }
    updateSingleInput(id, name){
        const input = document.querySelector(`[data-form-id="${id}"][name="${name}"]`)
        if(input) input.value = this.state.forms[id].get(name)
    }
    renderNewInputs(name){
        const forms = document.querySelectorAll(`form [name="${name}"]`)
        const batchSize = 50
        let i = 0
        const renderBatch = () => {
            while(i < forms.length && batchSize){
                forms[i].value = this.state.forms[i].formProps[name]
                forms[i].classList.remove('input-error')
                i++
            }
            if(i < forms.length){
                setTimeout(() => requestAnimationFrame(renderBatch),10)
            }
        }
        requestAnimationFrame(renderBatch)
    }
    
    async createForm(targetSize) {
    const size = this.state.size;

    for (let i = size; i < targetSize; i++) {
        this.state.addForm(new FormModel(i, this.typeValidator, this.formsController.updateCounter));
    }

    await this.mountForms(size, targetSize);
}


    removeForm(count) {
        this.state.cutFormsArray(count);
        this.unmountForms(count);
    }

   async mountManager() {
    const oldSize = this.state.size;
    const newSize = this.state.newSize;

    if (oldSize === newSize) return;

    if (newSize > oldSize) {
        await this.createForm(newSize);
        showNotification(`Форм создано: ${newSize}`, 'success')
    } else {
        this.removeForm(oldSize - newSize);
        showNotification(`Форм создано: ${newSize}`, 'success')
    }
    }

    rewriteData({name:name, formId: id, value:value}){
        return this.state.forms[id].set(name, value)
    }
    rewriteCustomField(id, data){
        const safeValue = this.state.forms[id].setCustomFields(data)
        return safeValue
    }
    createCustomField(id){
        const fieldId = this.state.forms[id].addCustomField()
        if(fieldId){
            this.mountCustomField(id, fieldId)
        }
    }
    changeCustomFieldType(formId, fieldId, type){
        this.state.forms[formId].changeCustomFieldType(fieldId, type)
    }
    updateStateFormInput({name: name,  val: val}){
        this.state.forms.forEach(form => {
            form.formProps[name] = val
        });
        this.renderNewInputs(name)
    }
    getInputData({formId:id, name:name}){
        return this.state.forms[id].formProps[name]
    }

    hasRepeatedRequestNumbers = () => {
        const requestNumbers = this.state.forms.map(form => form.get('requestNumber'));
        const uniqueNumbers = new Set();

        for (const number of requestNumbers) {
            if (uniqueNumbers.has(number)) {
                // this.state.errorForms = number
                // this.state.errorInputs = `input[data-form-id="${form}"]`
                return true;
            }
            uniqueNumbers.add(number);
        }
        return false;
    };
    checkSources(){
        if(this.state.forms.length){
            return this.state.forms.every(form => form.checkSources())
        }
    }
    hasRequestDate(){
        let hasError = false
        const forms = this.state.forms
        if(forms.length){
            forms.forEach(form => {
                if(!(form.get('requestDate').length && fullDateValidator(form.get('requestDate')))) {
                    hasError = true
                    this.state.errorForms = form.formId
                    this.state.errorInputs = `input[data-form-id="${form.formId}"][name="requestDate"]`
                }
            })
            
        }
        return hasError
    }
    hasRequestedNumbers(){
        let hasError = false
        const forms = this.state.forms
        if(forms.length){
            forms.forEach(form => {
                if(!form.get('requestNumber').length){
                    hasError = true
                    this.state.errorForms = form.formId
                    this.state.errorInputs = `input[data-form-id="${form.formId}"][name="requestNumber"]`
                }
            })
        
        }
        return hasError
    }
    checkCustomFields() {
    let status = true;
    const filtered = [];

    // Собираем все пользовательские поля из всех форм
    this.state.forms.forEach(form => {
        const customFields = form.get('customFields') || [];
        customFields.forEach(userField => {
            const field = (userField.field || '').trim();
            const value = (userField.value || '').trim();
            if (field !== '' && value !== '') filtered.push(userField);
        });
    });

    for (const userField of filtered) {
        const { field, value, type, id } = userField;
        const inputSelector = `input[id="customFieldValue${id}"]`;

        // Проверка числовых полей
        if (type === 'number') {
            const isStrictNumber = /^-?\d+(\.\d+)?$/.test(value.trim());
            if (!isStrictNumber) {
                this.state.errorInputs = inputSelector;
                this.formsController.markErrorInputs();
                showNotification(
                    'В пользовательском поле необходимо указать числовое значение.\nДопускаются положительные и отрицательные числа.',
                    'error'
                );
                status = false;
                break;
            }
            if (value.length > 38) {
                this.state.errorInputs = inputSelector;
                this.formsController.markErrorInputs();
                showNotification('В пользовательском поле число не может превышать 38 знаков.', 'error');
                status = false;
                break;
            }
        }

        // Проверка даты
        else if (type === 'date') {
            const isValidFull = fullDateValidator(value);
            const isValidShort = shortDateValidator(value);

            if (!isValidFull && !isValidShort) {
                this.state.errorInputs = inputSelector;
                this.formsController.markErrorInputs();
                showNotification(
                    'В пользовательском поле дата должна быть указана в формате DD-MM-YYYY или DD-MM-YYYY hh:mm:ss.',
                    'error'
                );
                status = false;
                break;
            }
        }

    }

    return status;
}

    async verifyForms(){
        this.formsController.clearErrors()
        this.state.clearErrors()
        if(!this.state.siteId){
            this.state.errorInputs = `input[name="siteId"]`
            this.formsController.markErrorInputs()
            showNotification('Не указан ID сайта', 'error');
            return false
        }
        if(!this.state.accessToken){
            this.state.errorInputs = `input[name="access-token"]`
            this.formsController.markErrorInputs()
            showNotification('Не заполнен accessToken', 'error');
            return false
        }
        if(this.hasRequestDate()){
            showNotification('Не указаны или неверно заполнены даты заявок', 'error')
            this.formsController.markErrorInputs()
            return false
        }
        if(this.hasRequestedNumbers()){
            showNotification('Не указаны номера форм', 'error')
            this.formsController.markErrorInputs()
            return false
        }
        if(this.hasRepeatedRequestNumbers()){
            showNotification('Указаны повторяющиеся номера форм', 'error');
            return false
        }
        if(!this.checkCustomFields()){
            // showNotification()
            return false
        }
        if (!this.checkSources()) {
            const confirmed = await this.warningModal.showModal();
            return confirmed;
        }
        return true
    }   
    async submit(){
        const isVerified = await this.verifyForms()
        if(isVerified){
            const chunkSize = 100;
        
            for (let i = 0; i < this.state.forms.length; i += chunkSize) {
                const chunk = this.state.forms.slice(i, i + chunkSize);
        
                const json = {
                    requests: chunk.map(form => form.getFormData())
                };
        
                // Ждём, пока send завершится, прежде чем перейти к следующей пачке
                this.sendApi.send(this.state.siteId, this.state.accessToken, JSON.stringify(json));
            }
        }
    }
}