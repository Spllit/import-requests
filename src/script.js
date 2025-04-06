import getForm from './getForm.js'
import Form from './Form.js'
import throwMessage from './throwMessage.js'
import importDataForm from './ImportDataForm.js'
const url = 'https://api.calltouch.ru/lead-service/v1/api/request/create'


document.addEventListener('DOMContentLoaded', function(){
let formAmount = 1
const container = document.querySelector('#container')
const siteIdInput = document.querySelector('input[name="siteId"]')
const accessTokenInput = document.querySelector('input[name="access-token"]')
const formAmountInput = document.querySelector('input[name="formAmount"]')
const sendBtn = document.querySelector('#send')
const addFormsBtn = document.querySelector('#addForms')
const importDataBtn = document.querySelector('#importDataForm')
let siteId = undefined
let accessToken = undefined
const formInstances = []
let valid = false;

const onAddForms = () => {
    
    if(Number(formAmountInput.value) > 100) formAmountInput.value = 100 
    if(Number(formAmountInput.value) < 0) formAmountInput.value = 1
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
        }
    }
    btns.forEach(btn => {
        btn.addEventListener('click', onDuplicateClick)
    })
}

// function onDateTyping(){
// const dateInputs = document.querySelectorAll('[name="requestDate"]')
// dateInputs.forEach(input => {
//     input.addEventListener("input", function () {
//         let value = input.value.replace(/\D/g, ""); // Убираем все нецифровые символы
        
//         if (value.length > 14) {
//             value = value.slice(0, 14); // Ограничиваем длину до 14 цифр
//         }
//         // 12:45:7890 12:34:56
//         let date = [];
//         let time = [];
//         if (value.length > 0) date.push(value.slice(0, 2)); // День
//         if (value.length > 2) date.push(value.slice(2, 4)); // Месяц
//         if (value.length > 4) {date.push(value.slice(4, 8)); date.push(' ')} // Год

//         if (value.length > 8) time.push(value.slice(8, 10)); // Часы
//         if (value.length > 10) time.push(value.slice(10, 12)); // Минуты
//         if (value.length > 12) time.push(value.slice(12, 14)); // Секунды
//         // let formattedValue = parts.join(value.length > 4 ? (value.length > 8 ? " " : ":") : "-");
//         let formattedValue = `${date.join('-')} ${time.join(':')}`
        
//         // Устанавливаем курсор в конец
//         // let cursorPosition = formattedValue.length;
//         input.value = formattedValue;
//         // input.setSelectionRange(cursorPosition, cursorPosition);
//     });
// })

// }

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
        let requestNumbersIsRepeated = true
        const requestNumbers = []
        for(let i = 0; i <= formInstances.length -1; i++){requestNumbers.push(formInstances[i].requestNumber)}
        if(requestNumbers.length){
            requestNumbers.forEach((numberTofind, i) => {
                if(!requestNumbers.find((number) => number == numberTofind, i != requestNumbers.length -1 ? requestNumbers.slice(i+1) : [])){
                    requestNumbersIsRepeated = false
                }
            })

        }
        valid = !!(siteId && accessToken && !requestNumbersIsRepeated && formInstances.every((form) => {
            return form.verifyForm()
        }))
        console.log(valid)
        if(valid) {
            prepareData()
            markRequiredInputs()
            removeMessage()
        }
        else{
            markRequiredInputs()
            addMessage('error',throwMessage('Не заполнены обязательные поля или контактные данные'))
        console.log('не заполенены поля')}
    }


function collectFormData(){
    const forms = document.getElementsByTagName('form');
    for (const form of forms) {
        const idForm  = form.dataset.formId
        const data = new FormData(form)
        for (const formData of data) {
            formInstances[idForm][formData[0]] = formData[1]

        }

    }
    siteId = siteIdInput.value
    accessToken = accessTokenInput.value
    verifyData()

}
sendBtn.addEventListener('click', collectFormData)
addFormsBtn.addEventListener('click', addForms)
formAmountInput.addEventListener('input', onAddForms)
importDataBtn.addEventListener('click', onImportModalClick)

function drawForms(){
    formInstances.length = 0;
    container.innerHTML = ''
    for(let i = 0; i < formAmount; i++){
        formInstances.push(new Form(i))
        container.innerHTML += getForm(i)

    }
}
function addForms(){
    formAmount = Number(formAmountInput.value) || 1
    drawForms()
    // onDateTyping()
    duplicateInuteData()

}

function onResponse({data} = data){
    const amoutRequests = data.requests.length
    let successfulySent = 0
    data.requests.forEach(request => {
        if(request.imported) successfulySent++
    })
    addMessage('success', throwMessage(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`))
}
     function send(siteId, accessToken, data){
         console.log(data)
        //  axios.defaults.headers.post['Access-Token'] = accessToken;
        //  axios.defaults.headers.post['SiteId '] = siteId;
        // try{
        //     axios.post(url, 
        //         data,
        //         {
        //             headers: {
        //                 'Access-Token': accessToken,
        //                 'SiteId': siteId
        //             }
        //         }
        //     )
        //     .then(response => onResponse(response.data))
        //     .catch(error => console.error(error));
        // }catch(e){(e)=>console.log(e)}
    }
    addForms()
})