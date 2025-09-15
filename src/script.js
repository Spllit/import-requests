import getForm from './getForm.js'
import Form from './Form.js'
import throwMessage from './throwMessage.js'
import {importDataForm, importModalFirstPage, importModalSecondPage} from './ImportDataForm.js'
import ConfirmationModal from './ConfirmationModal.js'
import getReportModal from './reportModal.js'
import getCustomField from './getCustomField.js'
const url = 'https://api.calltouch.ru/lead-service/v1/api/request/create'


document.addEventListener('DOMContentLoaded', function(){
const container = document.querySelector('#container')
const formAmountInput = document.querySelector('input[name="formAmount"]')
let siteId = undefined
let accessToken = undefined
const formInstances = []
document.querySelector("#customFields > div > div.button_area > button")


const onImportModalClick = () => {
    let modalPage = 1
    const container = document.querySelector('#modalContainer')
    container.innerHTML += importDataForm()
    const modal = document.querySelector('#importModal')
    const modalBodyContainer = document.querySelector('[name="importModalBody"]')
    modalBodyContainer.innerHTML = importModalFirstPage()
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');
    const columns = {}
    let headers = ''
    let rows = ''
     // Показать диалог выбора файла по клику
    dropZone.addEventListener('click', () => fileInput.click());

    // Обработка выбора файла через input
    fileInput.addEventListener('change', (e) => {
      handleFile(e.target.files[0]);
    });

    // Обработка drag & drop
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    function handleFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Берём первый лист
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Преобразуем в массив объектов: [{Колонка1: значение, Колонка2: значение}, ...]
            // const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const json = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                raw: false, // чтобы даты сразу преобразовывались в строку, если возможно
                dateNF: "dd.mm.yyyy hh:mm:ss", // желаемый формат даты
            });

            if (json.length === 0) return;

            // Первая строка — заголовки столбцов
            headers = json[0];

            // Остальные строки — данные
            rows = json.slice(1);

            // Преобразуем данные в удобный объект: {Колонка: [значения]}
            headers.forEach((header, i) => {
            columns[header] = rows.map(row => row[i]);
            });
            function onFileLoad(headers){
                modalPage = 2
                const layout = importModalSecondPage(headers)
                modalBodyContainer.innerHTML = layout
                modal.querySelector('button[type="submit"]').addEventListener('click', onSubmit)
            }
            onFileLoad(headers)
            
        } catch (err) {
          output.textContent = 'Ошибка чтения файла: ' + err.message;
        }
      };
      reader.readAsArrayBuffer(file);
    }
    function onSubmit(){
        if(modalPage === 1){
            const textArea = modal.querySelector('textarea')
            const selector = modal.querySelector('select')
            if(textArea.value.length && selector.value !== 'chooseOption'){
            const formInputs = document.querySelectorAll(`form input[name="${selector.value}"]`)
            let textAreaData = textArea.value.split('\n')
                for(let i = 0; i <= textAreaData.length - 1; i++){
                    let value = textAreaData[i]
    
                    if(selector.value === 'requestDate'){
                        
                        let digits = value.replace(/\D/g, "");
                        digits = digits.slice(0, 14);
                        value = formateDate(digits);
                        if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(value)) {
                            value += ":00";
                        }
                    }
                    if(formInputs[i]){
                        formInputs[i].value = value
                    }
                    if(formInstances[i]){
                        formInstances[i][selector.value] = value
                    }
                }
    
            }
            textArea.value = ''
            modal.remove()
        }
        else if(modalPage === 2){
            const matchingList = document.querySelectorAll('select[name="matchingHeaderSelector"]')
            const matchingPairs = []
            if(matchingList.length){
                matchingList.forEach(select => {
                    if(select.value !== 'chooseOption'){
                        matchingPairs.push([select.dataset.headerFrom, select.value])
                        
                    }
                })
            }
            function insertData(){
                let maxFormsToCreate = 1
                if(!matchingPairs.length) return
                matchingPairs.forEach(pair => {
                    if(columns[pair[0]].length){
                        maxFormsToCreate = columns[pair[0]].length
                        if(columns[pair[0]].length > maxFormsToCreate){
                            maxFormsToCreate = columns[pair[0]].length > maxFormsToCreate && columns[pair[0]].length
                        }
                    }
                })
                drawForms(maxFormsToCreate)
                const forms = document.querySelectorAll('form')
                console.log(headers)
                console.log(columns)
                if(forms.length){
                    forms.forEach((form, i) => {
                        matchingPairs.forEach((pair, j) => {
                            const from = pair[0]
                            const to = pair[1]
                            const cell = columns[from][i]
                            if(cell){
                            const input = form.querySelector(`[name="${to}"]`)
                            if(to === 'requestDate'){
                                function normalizeDate(value) {
                                    if (typeof value !== 'string') return '';

                                    const [datePart, timePart = '00:00:00'] = value.trim().split(/\s+/);

                                    // Определим разделитель даты
                                    const dateDelim = datePart.includes('.') ? '.' : datePart.includes('-') ? '-' : '/';
                                    const [d, m, y] = datePart.split(dateDelim).map(n => n.padStart(2, '0'));

                                    // Часы, минуты, секунды
                                    const [h = '00', min = '00', s = '00'] = timePart.split(':').map(n => n.padStart(2, '0'));

                                    return `${d}.${m}.${y} ${h}:${min}:${s}`;
                                    }
                                // console.log(normalizeDate(cell))
                                let digits = normalizeDate(cell).replace(/\D/g, "");
                                digits = digits.slice(0, 14);
                                digits = formateDate(digits);
                                if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(digits)) {
                                    digits += ":00";
                                }
                                input.value = digits
                                formInstances[i][to] = digits
                                
                            }
                            else{
                                input.value = cell
                                formInstances[i][to] = cell
                            }
                            }
                        })
                    })
                }
            }
            insertData()
            modal.remove()
        }
    }
    modal.querySelector('button[type="submit"]').addEventListener('click', onSubmit)
    const closeModal = (e) => {
        const target = e.target
        if(target.closest('.close_modal_btn')){
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
  
        input.value = formateDate(digits);
      });
      input.addEventListener('blur', function(){
         if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(input.value)) {
        input.value += ":00";
      }
    })
    });

}
function formateDate(value){
 // Ограничиваем длину до 14 символов
        let digits = value.slice(0, 14);
  
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
        return formatted
}


async function prepareData() {
    const chunkSize = 100;

    for (let i = 0; i < formInstances.length; i += chunkSize) {
        const chunk = formInstances.slice(i, i + chunkSize);

        const json = {
            requests: chunk.map(instance => instance.getFormData())
        };

        // Ждём, пока send завершится, прежде чем перейти к следующей пачке
        await send(siteId, accessToken, JSON.stringify(json));
    }
}

function removeErrors(input){
        input.classList.remove('border-red-600')
}
function markRequiredInputs(){
    const requiredInputs = document.querySelectorAll('[required]')
    requiredInputs.forEach(input=>{
        if(!input.value){
            input.classList.add('border-red-600')
            showNotification('Не заполнены обязательные поля или контактные данные', 'error')
        }
        else{
            removeErrors(input)
        }
    })

}
function verifyData() {
    console.log(formInstances.length, formInstances)
    markRequiredInputs();


    const hasRepeatedRequestNumbers = () => {
        const requestNumbers = formInstances.map(form => form.requestNumber);
        const uniqueNumbers = new Set();

        for (const number of requestNumbers) {
            if (uniqueNumbers.has(number)) {
                return true;
            }
            uniqueNumbers.add(number);
        }
        return false;
    };

    const numbersRepeated = hasRepeatedRequestNumbers();

    const allFormsVerified = formInstances.every(form => {
        if (!form.verifyForm()) {

            showNotification('Не заполнены обязательные поля', 'error');
            return false;
        }
        return true;
    });

    if (!allFormsVerified) return;

    const sourcesChecked = formInstances.every(form => form.checkSources());

    if (!siteId || !accessToken) {
        showNotification('Не заполнены обязательные поля', 'error');
        return;
    }

    if (numbersRepeated) {
        showNotification('Указаны повторяющиеся номера форм', 'error');

        return;
    }

    if (!sourcesChecked) {
        showConfirmationModal();
    } else {
        submitData();
    }

    function showConfirmationModal() {
        const container = document.querySelector('#modalContainer');
        container.innerHTML += ConfirmationModal();
        const modal = document.querySelector('#modalConfirmation');

        modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('[name="modalConfirmCancel"]') || target.id === 'modalConfirmation') {
                modal.remove();
            } else if (target.closest('[name="modalConfirm"]')) {
                submitData();
                modal.remove();
            }
        });
    }

    function submitData() {
        prepareData();
        markRequiredInputs();
    }
}

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

    
}

function downloadTemplate(){
    const headers = [
        {name: 'Дата заявки (дд-мм-гггг чч:мм:сс)', width: 30},
        {name: 'ФИО', width: 15},
        {name: 'Номер телефона', width: 20},
        {name: 'email', width: 15},
        {name: 'Название заявки', width: 20},
        {name: 'ID сессии', width: 15},
        {name: 'source', width: 15},
        {name: 'medium', width: 15},
        {name: 'campaign', width: 15},
        {name: 'content', width: 15},
        {name: 'term', width: 15},
        {name: 'tags', width: 15},
        {name: 'Комментарий', width: 20},
        {name: 'URL адреса заявки', width: 30},
    ];

    const worksheetData = [headers.map(header => header.name)];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(wb, ws, "Шаблон");

    ws['!cols'] = headers.map(col => ({ wch: col.width }));
    XLSX.writeFile(wb, "Шаблон импорта заявок.xlsx");
}
function generateReqNums(){
    const reqNumsInputs = document.querySelectorAll('#container [name="requestNumber"]')

    
    if(formInstances.length && reqNumsInputs.length && formInstances.length == reqNumsInputs.length){
        formInstances.forEach(form => {
            const id = form['formId'] // id формы
            const reqID = `imp${generateUniqueId()}` // id заявки

            form['requestNumber'] = reqID
            reqNumsInputs[id].value = reqID
        })
    }

    function generateUniqueId() {
        const timePart = Date.now() % 10000; // последние 4 цифры времени
        const randomPart = Math.floor(Math.random() * 100); // 2 случайные цифры
        return parseInt(`${timePart}${randomPart.toString().padStart(2, '0')}`);
    }
}
document.addEventListener('input', (e)=>{
    const {target} = e
    // if(target.getAttribute('name') == 'formAmount') onAddForms()
    if(target.getAttribute('name') === 'siteId') siteId = target.value
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
    if(target.hasAttribute('id') && target.getAttribute('id') === 'send') verifyData()
    else if(target.hasAttribute('id') && target.getAttribute('id') === 'addForms') addForms()
    else if(target.hasAttribute('id') && target.getAttribute('id') === 'importDataForm') onImportModalClick()
    else if(target.hasAttribute('name') && target.getAttribute('name') === 'modalConfirmCancel'){}
    else if((target.hasAttribute('name') && target.getAttribute('name') === 'customFieldBtn') || (target.closest('button') && target.closest('button').hasAttribute('name') && target.closest('button').getAttribute('name') === 'customFieldBtn')){
        e.preventDefault()
        addCustomFiled(target.closest('form'))
    }
    else if(target.hasAttribute('name') && target.getAttribute('name') === 'downloadTemplate') downloadTemplate()
    else if(target.hasAttribute('name') && target.getAttribute('name') === 'reqNumsGenerator') generateReqNums()
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
 function showNotification(message, type) {
    const error = document.getElementById('errorNotification');
    const success = document.getElementById('successNotification');
    const warning = document.getElementById('successNotification');

    function showElement(el){
        el.querySelector('div.flex-1').innerText = message;
        el.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        el.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    
        setTimeout(() => {
          el.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
          el.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }, 3000);
    }
    if(type === 'error') showElement(error)
    else if(type === 'success') showElement(success)
    else if(type === 'warning') showElement(warning)
  }

  
function onSuccessResponse({data} = data){

    const amoutRequests = data.requests.length
    let successfulySent = 0
    data.requests.forEach(request => {
        if(request.imported) successfulySent++
    })
    if(successfulySent < amoutRequests){
        // addMessage('warining', throwMessage(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`))
        showNotification(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`, 'warning')
    }
    else{
        // addMessage('success', throwMessage(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`))
        showNotification(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`, 'success')
    }
}
function onErrorResponse(error){
    // addMessage('error', throwMessage(`Заявка(и) не были отправлены! Статус: ${error.status}`))
    showNotification(`Заявка(и) не были отправлены! Статус: ${error.status}`, 'error')
}
function send(siteId, accessToken, data){
    console.log(data)
    console.log(formInstances)
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