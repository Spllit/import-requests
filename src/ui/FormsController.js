import {formatLiveDate} from '../utils/dateUtils.js'
import validateDigits from '../utils/validateDigits.js'
export default class FormsController{
    constructor(state, manager){
        this.state = state  
        this.manager = manager
        this.handleClick = this.handleClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    container = document.querySelector('#container')
    lifter = document.querySelector('[name="lifter"]')
    view(){
        container.addEventListener('click', this.handleClick)
        container.addEventListener('input', this.handleInput)
        document.addEventListener('scroll', this.handleScroll)
    }
    duplicate(btn){
        const formId = btn.dataset.formId
        const name = btn.dataset.duplicate 
        const value = this.manager.getInputData({formId: formId, name:name})
        this.manager.updateStateFormInput({name: name, val: value})
    }

    handleInput(e){
        const target = e.target
        const formId = e.target.dataset.formId
        const inputName = e.target.getAttribute('name')
        let value = target.value
        if(inputName === 'requestDate'){
            target.classList.remove('input-error')
            value = formatLiveDate(value)
        }
        if(inputName === 'sessionId'){
            value = validateDigits(target.value)
        }
        if(inputName === 'customFieldApi' || inputName === 'customFieldValue'){
            const parent =  target.closest('[name="customField"]')
            const fieldId = parent.dataset.customFieldId
            const formId = parent.dataset.customfieldFormid
            const apiElem = parent.querySelector('[name="customFieldApi"]')
            const valueElem = parent.querySelector('[name="customFieldValue"]')
            const type = parent.querySelector('[name="customFieldSelect"]').dataset.type
            target.classList.remove('input-error')
            const {field, value} = this.manager.rewriteCustomField(+formId, {field: apiElem.value, value:valueElem.value, type:type, fieldId:+fieldId,})
            apiElem.value = field
            valueElem.value = value
        }
        else{
            target.classList.remove('input-error')
            target.value = this.manager.rewriteData({name:inputName, formId: formId, value: value})
        }
    }
    updateCounter(name,id, value){
        const counter = document.querySelector(`form[data-form-id="${id}"] span[data-counter="${name}"]`)
        if(counter) counter.textContent = value
    }
    markErrorInputs(){
        const inputs = this.state.errorInputs
        if(!inputs.length)return
        inputs.forEach(input => {
            document.querySelector(input).classList.add('input-error')
        })
    }
    clearErrors(){
        const inputs = this.state.errorInputs
        if(!inputs.length)return
        inputs.forEach(input => {
            document.querySelector(input).classList.remove('input-error')
        })
    }
    handleClick(e){
        e.preventDefault()
        const target = e.target
        if(target.closest('button') && target.closest('button').getAttribute('name') == 'duplicateInputData'){
            this.duplicate(target.closest('button'))
        }
        if(target.closest('button') && target.closest('[name="customFieldBtn"]')){
            console.dir(target.closest('[name="customFieldBtn"]'))
           const formId = +(target.closest('[name="customFieldBtn"]').dataset.formid)
           this.manager.createCustomField(formId)
        }
        console.log(this)
        if(target.closest('[name="customDropdownMenu"]')){
            const fieldType = target.dataset.customfieldtype
            const container = target.closest('[name="customField"]')
            const formId = container?.dataset.customFieldFormId
            const fieldId = container?.dataset.customFieldID
            const typesList = container.querySelector('[name="customFieldSelect"]')
            typesList.textContent = `Тип: ${this.state.customFieldsTypesMap[fieldType]} ▾`
            typesList.dataset.type=`${fieldType}`
            this.manager.changeCustomFieldType(formId, fieldId, fieldType)
            // console.log(this.state.forms)
            
        }
    }

}