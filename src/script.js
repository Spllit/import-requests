import getForm from './getForm.js'
import Form from './Form.js'
import throwMessage from './throwMessage.js'
import importDataForm from './ImportDataForm.js'
import getReportModal from './reportModal.js'
import getCustomField from './getCustomField.js'
const url = 'https://api.calltouch.ru/lead-service/v1/api/request/create'


document.addEventListener('DOMContentLoaded', function(){
// let prevFormAmout = 0
// let formAmount = 1
const container = document.querySelector('#container')
const siteIdInput = document.querySelector('input[name="siteId"]')
const accessTokenInput = document.querySelector('input[name="access-token"]')
const formAmountInput = document.querySelector('input[name="formAmount"]')
// const sendBtn = document.querySelector('#send')
// const addFormsBtn = document.querySelector('#addForms')
// const importDataBtn = document.querySelector('#importDataForm')

let siteId = undefined
let accessToken = undefined
const formInstances = []
document.querySelector("#customFields > div > div.button_area > button")

let valid = false;

const onAddForms = () => {
    
    if(Number(formAmountInput.value) > 100) formAmountInput.value = 100 
    if(Number(formAmountInput.value) < 0) formAmountInput.value = 1
}
const onReportBtnClick = () => {
    const container = document.querySelector('#modalContainer')
    container.innerHTML = getReportModal()
    const modal = document.querySelector('#reportModal')
    const closeModal = (e) => {
        const target = e.target
        if(target.closest('.close_modal_btn') || target.getAttribute('id') === 'reportModal'){
            modal.remove()
        }
    }
    modal.addEventListener('mousedown', closeModal)
}
const onImportModalClick = () => {
    const container = document.querySelector('#modalContainer')
    container.innerHTML += importDataForm()
    const modal = document.querySelector('#importModal')
    
    const submitBtn = modal.querySelector('button[type="submit"]')
    const onSubmit = () =>{
        const textArea = modal.querySelector('textarea')
        const selector = modal.querySelector('select')
        if(textArea.value.length && selector.value !== 'chooseOption'){
        const formInputs = document.querySelectorAll(`form input[name="${selector.value}"]`)
        let textAreaData = textArea.value.split('\n')
            for(let i = 0; i <= textAreaData.length - 1; i++){
                if(formInputs[i]){
                    formInputs[i].value = textAreaData[i]
                }
            }
        }
        textArea.value = ''

    }
    submitBtn.addEventListener('click', onSubmit)
    const closeModal = (e) => {
        const target = e.target
        if(target.closest('.close_modal_btn') || target.getAttribute('id') === 'importModal'){
            modal.remove()
        }
    }
    modal.addEventListener('mousedown', closeModal)
    
}
const duplicateInuteData = () => {
    const btns = container.querySelectorAll('button[name="duplicateInputData"]')
    const onDuplicateClick = (e, {target} = e) => {
        e.preventDefault()
        const inputType = target.closest('button').dataset.duplicate
        
        const closestInput = target.closest('div').querySelector(`input[name="${inputType}"]`)
        if(closestInput.value){
            const sameInputs = container.querySelectorAll(`input[name="${inputType}"]`)
            sameInputs.forEach(input => {
                input.value = closestInput.value
            })
            formInstances.forEach(instance => {
                instance[inputType] = closestInput.value
            })
        }
    }
    btns.forEach(btn => {
        btn.addEventListener('click', onDuplicateClick)
    })
}

function onDateTyping(){
    const dateInputs = document.querySelectorAll('[name="requestDate"]');

    dateInputs.forEach(input => {
      input.addEventListener("input", function () {

        // Убираем все нецифровые символы
        let digits = input.value.replace(/\D/g, "");
  
        // Если ничего не введено — оставляем пустым
        if (digits.length === 0) {
          input.value = "";
          return;
        }
  
        // Ограничиваем длину до 14 символов
        digits = digits.slice(0, 14);
  
        let parts = [];
  
        if (digits.length >= 1) parts.push(digits.slice(0, 2));       // День
        if (digits.length >= 3) parts[1] = digits.slice(2, 4);         // Месяц
        if (digits.length >= 5) parts[2] = digits.slice(4, 8);         // Год
        if (digits.length >= 9) parts[3] = digits.slice(8, 10);        // Часы
        if (digits.length >= 11) parts[4] = digits.slice(10, 12);      // Минуты
        if (digits.length >= 13) parts[5] = digits.slice(12, 14);      // Секунды
  
        let formatted = "";
  
        if (parts.length >= 1) formatted += parts[0] || "";
        if (parts.length >= 2) formatted += "-" + (parts[1] || "");
        if (parts.length >= 3) formatted += "-" + (parts[2] || "");
        if (parts.length >= 4) formatted += " " + (parts[3] || "");
        if (parts.length >= 5) formatted += ":" + (parts[4] || "");
        if (parts.length >= 6) formatted += ":" + (parts[5] || "");
  
        input.value = formatted;
      });
    });

}

function prepareData(){

    let json = {
        'requests': []
    }
    for(let i = 0; i < formInstances.length; i++){
        json.requests.push(formInstances[i].getFormData())
    }
    send(siteId, accessToken, JSON.stringify(json))

}

function addMessage(messageType, message){
    const messageContainer = document.querySelector('#messageContainer')
    messageContainer.classList.remove('hide')
    if(messageType === 'error'){
        messageContainer.classList.add('error_maeesage')
    }
    else if(messageType === 'warning'){
        messageContainer.classList.add('warning_message')
    }
    else if(messageType === 'success'){
        messageContainer.classList.add('success_sent')
    }
    messageContainer.innerHTML = message
}
function removeMessage(){
    const messageContainer = document.querySelector('#messageContainer')
    if(!messageContainer.classList.contains('hide')){
        messageContainer.classList.remove('error_maeesage')
        messageContainer.classList.remove('success_sent')
        messageContainer.classList.remove('warning_message')
        messageContainer.classList.add('hide')
    }
    messageContainer.innerHTML = ''
}
function removeErrors(input){
        input.classList.remove('border-red-600')
}
function markRequiredInputs(){
    const requiredInputs = document.querySelectorAll('[required]')
    requiredInputs.forEach(input=>{
        if(!input.value){
            input.classList.add('border-red-600')
            addMessage('error', throwMessage('Не заполнены обязательные поля или контактные данные'))
        }
        else{
            removeErrors(input)
        }
    })
    removeMessage()
}
function verifyData(){
    const checkIsRepeated = () => {
        let requestNumbersIsRepeated = false
        const requestNumbers = []
        for(let i = 0; i <= formInstances.length -1; i++){requestNumbers.push(formInstances[i].requestNumber)}
        if(requestNumbers.length){
            requestNumbers.forEach((numberTofind, i) => {
                const arrToFind = i != requestNumbers.length -1 ? requestNumbers.slice(i+1) : []
                if(arrToFind.find((number) => number == numberTofind)){
                    requestNumbersIsRepeated = true
                    return
                }
            })

        }
        return requestNumbersIsRepeated
    }
    const numbersIsRepeated = checkIsRepeated()
    const formsIsVerified = formInstances.every((form) => {return form.verifyForm() })
        valid = !!(siteId && accessToken && !numbersIsRepeated && formsIsVerified)
        console.log(valid)
        if(valid) {
            prepareData()
            markRequiredInputs()
            removeMessage()
        }
        else if((siteId && accessToken) && formsIsVerified && numbersIsRepeated){
            addMessage('error',throwMessage('Указаны повторяющиеся номера форм'))
        }
        else{
            markRequiredInputs()
            addMessage('error',throwMessage('Не заполнены обязательные поля или контактные данные'))
        console.log('не заполенены поля')}
    }


// function collectFormData(){
//     const forms = document.getElementsByTagName('form');
//     for (const form of forms) {
//         const idForm  = form.dataset.formId
//         const data = new FormData(form)
//         for (const formData of data) {
//             formInstances[idForm][formData[0]] = formData[1]

//         }

//     }
//     console.log(forms)
//     siteId = siteIdInput.value
//     accessToken = accessTokenInput.value
//     verifyData()

// }
function addCustomFiled(form){
    const formId = form.dataset.formId 
    const currentFormContainer = document.querySelector(`form[data-form-id="${formId}"] [name="customFieldsContainer"]`)
    const customFiledsAmout = formInstances[formId].customFiledsAmout
    if(customFiledsAmout !== false){
        formInstances[formId].addCustomFiled()
        const newField = document.createElement('div')
        newField.innerHTML = getCustomField({formId, 'customFieldId':customFiledsAmout})
        currentFormContainer.appendChild(newField)
    }
    // if(formInstances[formId].currentFormAmount){
    //     formInstances[formId].currentFormAmount++
    //     currentFormContainer.
    // }
    
}

// function onAddCustomFiledBtnClick(){
//     const customFieldBtn = document.querySelectorAll('button[name="customFieldBtn"]')
//     customFieldBtn.forEach(btn => {
//         btn.addEventListener('click', e => {
//             const {target} = e
//             e.preventDefault() 
//             const closestForm = target.closest('form')
//             addCustomFiled(closestForm)
            
//         })
//     })
// }

// sendBtn.addEventListener('click', collectFormData)
// addFormsBtn.addEventListener('click', addForms)
// formAmountInput.addEventListener('input', onAddForms)
// importDataBtn.addEventListener('click', onImportModalClick)
document.addEventListener('input', (e)=>{
    const {target} = e
    if(target.getAttribute('name') == 'formAmount') onAddForms()
    else if(target.getAttribute('name') === 'siteId') siteId = target.value
    else if(target.getAttribute('name') === 'access-token') accessToken = target.value
    else if(target.hasAttribute('name') && target.closest('form') && target.getAttribute('name') in formInstances[target.closest('form').dataset.formId]){
        formInstances[target.closest('form').dataset.formId][target.getAttribute('name')] = target.value

    }
    else if(target.getAttribute('name') === 'customFieldApi' || target.getAttribute('name') === 'customFieldValue'){
        const formId = target.closest('div[name="customField"]').dataset.customfieldFormid
        const fieldId = target.closest('div[name="customField"]').dataset.customFieldId
        if(target.getAttribute('name') === 'customFieldApi'){
            formInstances[formId].customFields[fieldId].field = target.value
        }
        else if(target.getAttribute('name') === 'customFieldValue'){
            formInstances[formId].customFields[fieldId].value = target.value
        }
    }
})
document.addEventListener('click', (e) => {
    const {target} = e
    if(target.hasAttribute('id') && target.getAttribute('id') === 'send'){
        verifyData()
    }
    else if(target.hasAttribute('id') && target.getAttribute('id') === 'addForms'){
        addForms()
    }
    else if(target.hasAttribute('id') && target.getAttribute('id') === 'importDataForm'){
        onImportModalClick()
    }
    else if((target.hasAttribute('name') && target.getAttribute('name') === 'customFieldBtn') || (target.closest('button') && target.closest('button').hasAttribute('name') && target.closest('button').getAttribute('name') === 'customFieldBtn')){
        e.preventDefault()
        addCustomFiled(target.closest('form'))
    }
})

function drawForms(amount){
    const currentFormAmount = formInstances.length
    if(amount === currentFormAmount){
        return
    }
    else if(amount > currentFormAmount){
        for(let i = currentFormAmount; i < amount; i++){
            formInstances.push(new Form(i))
            const formContainer = document.createElement('div')
            formContainer.innerHTML = getForm(i)
            container.appendChild(formContainer)
            addCustomFiled(formContainer.querySelector('form'))
        }               
    }
    else if(amount < currentFormAmount){
        for(let i = 0; i < currentFormAmount - amount; i++){
            const removedItem = formInstances.pop()
            const itemToRemove = container.querySelector(`form[data-form-id="${removedItem.formId}"]`).closest('div')
            container.removeChild(itemToRemove)

    
        }
    }
    // onAddCustomFiledBtnClick()
}
function addForms(){
    const amount = formAmountInput.value || 1
    drawForms(amount)
    onDateTyping()
    duplicateInuteData()
}

function onSuccessResponse({data} = data){

    const amoutRequests = data.requests.length
    let successfulySent = 0
    data.requests.forEach(request => {
        if(request.imported) successfulySent++
    })
    if(successfulySent < amoutRequests){
        addMessage('warining', throwMessage(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`))
    }
    else{
        addMessage('success', throwMessage(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`))
    }
}
function onErrorResponse(error){
    addMessage('error', throwMessage(`Заявка(и) не были отправлены! Статус: ${error.status}`))
}
     function send(siteId, accessToken, data){
        //  console.log(data)
        //  console.log(formInstances)
         axios.defaults.headers.post['Access-Token'] = accessToken;
         axios.defaults.headers.post['SiteId '] = siteId;
        try{
            axios.post(url, 
                data,
                {
                    headers: {
                        'Access-Token': accessToken,
                        'SiteId': siteId
                    }
                }
            )
            .then(response => onSuccessResponse(response.data))
            .catch(error => onErrorResponse(error));
        }catch(e){(e)=>console.log(e)}
    }
    addForms()
})