import AppState from './core/AppState.js'
import Manager from './core/Manager.js'
import FormsController from './ui/FormsController.js'
import MenuController from './ui/MenuController.js'
import FinderController from './ui/FinderController.js'
import Send from "./core/ApiService.js"
import LifterController from './ui/LifterController.js'

function init(){
const appState = new AppState()
const manager = new Manager(appState)
const sendApi = new Send(appState,manager)
manager.sendApi = sendApi
const formsController = new FormsController(appState, manager)
manager.formsController = formsController
const menuController = new MenuController(appState, manager)
const finder = new FinderController(appState)
manager.createForm(1)
formsController.view()
menuController.view()
finder.view()
LifterController()
}

document.addEventListener('DOMContentLoaded', init); 

// function oldCode(){

//     const container = document.querySelector('#container')
//     const lifter = document.querySelector('[name="lifter"]')
//     let siteId = undefined
    
//     const mainData = {
//         formInstances: [],
//         size: 0,
//         newSize: 0,
//         siteId: undefined,
//         accessToken: undefined,
//         collapsedFinder: false,
//         typeValidator: {
//                 requestNumber: 100,
//                 subject: 100,
//                 requestUrl: 1000,
//                 sessionId: 100,
//                 fio: 100,
//                 comment: 1000,
//                 customFieldValue: 100,
//             },
//     }
//     function isDefined(val) {
//         return val !== undefined && val !== null;
//     }
//     function enterData({type, formId}){
//             if(isDefined(type) && isDefined(formId)){
//             const to = document.querySelector(`form[data-form-id="${formId}"] [name="${type}"]`)
//             const formInstance = mainData.formInstances[formId]
//             formInstance[type] = to.value
//             // console.log(formInstance)
//             if(to){
//                 window.requestAnimationFrame(() => {to.value = ''
//                 to.value = formInstance[type]})
//             }
//         }
//     }
//     function updateInputLengthCounter({formId, type, value}){
//         if(isDefined(formId) && isDefined(type) && isDefined(length)){
//             const form = document.querySelector(`form[data-form-id="${formId}"]`)
//             const counter = form.querySelector(`[data-${type.toLowerCase()}-counter]`)
//             if(counter) counter.textContent = value.length
//             else return
            
//         }
//     }
//     const onImportModalClick = () => {
//         let modalPage = 1
//         const container = document.querySelector('#modalContainer')
//         container.innerHTML += importDataForm()
//         const modal = document.querySelector('#importModal')
//         const modalBodyContainer = document.querySelector('[name="importModalBody"]')
//         modalBodyContainer.innerHTML = importModalFirstPage()
//         const dropZone = document.getElementById('dropZone');
//         const fileInput = document.getElementById('fileInput');
//         const output = document.getElementById('output');
//         const columns = {}
//         let headers = ''
//         let rows = ''
        
//          // Показать диалог выбора файла по клику
//         dropZone.addEventListener('click', () => fileInput.click());
    
//         // Обработка выбора файла через input
//         fileInput.addEventListener('change', (e) => {
//           handleFile(e.target.files[0]);
//         });
    
//         // Обработка drag & drop
//         dropZone.addEventListener('dragover', (e) => {
//           e.preventDefault();
//           dropZone.classList.add('dragover');
//         });
    
//         dropZone.addEventListener('dragleave', () => {
//           dropZone.classList.remove('dragover');
//         });
    
//         dropZone.addEventListener('drop', (e) => {
//           e.preventDefault();
//           dropZone.classList.remove('dragover');
//           if (e.dataTransfer.files.length) {
//             handleFile(e.dataTransfer.files[0]);
//           }
//         });
    
//         function handleFile(file) {
//           if (!file) return;
//           const reader = new FileReader();
//           reader.onload = function (e) {
//             try {
//                 const data = new Uint8Array(e.target.result);
//                 const workbook = XLSX.read(data, { type: "array" });
    
//                 // Берём первый лист
//                 const sheetName = workbook.SheetNames[0];
//                 const worksheet = workbook.Sheets[sheetName];
    
//                 // Преобразуем в массив объектов: [{Колонка1: значение, Колонка2: значение}, ...]
//                 // const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
//                 const json = XLSX.utils.sheet_to_json(worksheet, {
//                     header: 1,
//                     raw: false, // чтобы даты сразу преобразовывались в строку, если возможно
//                     dateNF: "dd.mm.yyyy hh:mm:ss", // желаемый формат даты
//                 });
    
//                 if (json.length === 0) return;
    
//                 // Первая строка — заголовки столбцов
//                 headers = json[0];
    
//                 // Остальные строки — данные
//                 rows = json.slice(1);
    
//                 // Преобразуем данные в удобный объект: {Колонка: [значения]}
//                 headers.forEach((header, i) => {
//                 columns[header] = rows.map(row => row[i]);
//                 });
//                 function onFileLoad(headers){
//                     modalPage = 2
//                     const layout = importModalSecondPage(headers)
//                     modalBodyContainer.innerHTML = layout
//                     modal.querySelector('button[type="submit"]').addEventListener('click', onSubmit)
//                 }
//                 onFileLoad(headers)
                
//             } catch (err) {
//               output.textContent = 'Ошибка чтения файла: ' + err.message;
//             }
//           };
//           reader.readAsArrayBuffer(file);
//         }
        
//         function onSubmit(){
//             if(modalPage === 1){
//                 const textArea = modal.querySelector('textarea')
//                 const selector = modal.querySelector('select')
//                 const formInputs = document.getElementsByName(`${selector.value}`)
//                 if(textArea.value.length && selector.value !== 'chooseOption'){
//                     let textAreaData = textArea.value.split('\n')
//                     drawForms(textAreaData.length)
//                     for(let i = 0; i <= textAreaData.length - 1; i++){
//                         let value = textAreaData[i]
        
//                         if(selector.value === 'requestDate'){
                            
//                             let digits = value.replace(/\D/g, "");
//                             digits = digits.slice(0, 14);
//                             value = formateDate(digits);
//                             if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(value)) {
//                                 value += ":00";
//                             }
//                         }
//                         enterData({
//                             value:value,
//                             type: selector.value,
//                             formId: i
//                         })
//                         updateInputLengthCounter({
//                             formId:i,
//                             type:selector.value,
//                             value:value
//                         })
//                     }
        
//                 }
//                 modal.remove()
//             }
//             else if(modalPage === 2){
//                 const matchingList = document.querySelectorAll('select[name="matchingHeaderSelector"]')
//                 const matchingPairs = []
//                 if(matchingList.length){
//                     matchingList.forEach(select => {
//                         if(select.value !== 'chooseOption'){
//                             matchingPairs.push([select.dataset.headerFrom, select.value])
                            
//                         }
//                     })
//                 }
//                 function insertData(){
//                     let maxFormsToCreate = 1
//                     if(!matchingPairs.length) return
//                     matchingPairs.forEach(pair => {
//                         if(columns[pair[0]].length){
//                             maxFormsToCreate = columns[pair[0]].length
//                             if(columns[pair[0]].length > maxFormsToCreate){
//                                 maxFormsToCreate = columns[pair[0]].length > maxFormsToCreate && columns[pair[0]].length
//                             }
//                         }
//                     })
//                     drawForms(maxFormsToCreate)
//                     const forms = document.querySelectorAll('form')
//                     console.log(`headers: ${headers}`)
//                     console.log(`columns: ${columns}`)
//                     if(forms.length){
//                         forms.forEach((form, i) => {
//                             matchingPairs.forEach((pair, j) => {
//                                 const from = pair[0]
//                                 const to = pair[1]
//                                 const cell = columns[from][i]
//                                 if(cell){
//                                     const input = form.querySelector(`[name="${to}"]`)
//                                     if(to === 'requestDate'){
//                                         function normalizeDate(value) {
//                                             if (typeof value !== 'string') return '';
    
//                                             const [datePart, timePart = '00:00:00'] = value.trim().split(/\s+/);
    
//                                             // Определим разделитель даты
//                                             const dateDelim = datePart.includes('.') ? '.' : datePart.includes('-') ? '-' : '/';
//                                             const [d, m, y] = datePart.split(dateDelim).map(n => n.padStart(2, '0'));
    
//                                             // Часы, минуты, секунды
//                                             const [h = '00', min = '00', s = '00'] = timePart.split(':').map(n => n.padStart(2, '0'));
    
//                                             return `${d}.${m}.${y} ${h}:${min}:${s}`;
//                                             }
//                                         let digits = normalizeDate(cell).replace(/\D/g, "");
//                                         digits = digits.slice(0, 14);
//                                         digits = formateDate(digits);
//                                         if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(digits)) {
//                                             digits += ":00";
//                                         }
//                                         // input.value = digits
//                                         // formInstances[i][to] = digits
//                                         enterData({
//                                             value:digits,
//                                             type: to,
//                                             formId: i
//                                         })
//                                         updateInputLengthCounter({
//                                             formId:i,
//                                             type:to,
//                                             value:digits
//                                         })
//                                     }
//                                     else{
//                                         // input.value = cell
//                                         // formInstances[i][to] = cell
//                                         enterData({
//                                             value:cell,
//                                             type: to,
//                                             formId: i
//                                         })
//                                         updateInputLengthCounter({
//                                             formId:i,
//                                             type:to,
//                                             value:cell
//                                         })
//                                     }
//                                 }
//                             })
//                         })
//                     }
//                 }
//                 insertData()
//                 modal.remove()
//             }
//         }
//         // function closeModal(){
    
//         // }
//         modal.querySelector('button[type="submit"]').addEventListener('click', onSubmit)
//         const closeModal = (e) => {
//             const target = e.target
//             if(target.closest('.close_modal_btn')){
//                 modal.remove()
//             }
//         }
//         modal.addEventListener('mousedown', closeModal)
        
//     }
    
    
//     function duplicateInuteData(e,{target} = e){
//         e.preventDefault()
//         const inputName = target.closest('button').dataset.duplicate     
//         const value = target.closest('div').querySelector(`input[name="${inputName}"]`).value
//         if(mainData.size){
//             mainData.formInstances.map(form => {form[inputName] = value})
//             updateFormInput(inputName)
//         }
//         // document.querySelectorAll('form').forEach(form=>{
//         //     enterData({
//         //         value: value,
//         //         type: inputName,
//         //         formId: form.dataset.formId
//         //     })
//         //     updateInputLengthCounter({
//         //         value:value,
//         //         type: inputName,
//         //         formId: form.dataset.formId,
//         //     })
//         // })
//     }
    
//     function onDateTyping(){
//         const dateInputs = document.querySelectorAll('[name="requestDate"]');
    
//         dateInputs.forEach(input => {
//           input.addEventListener("input", function () {
    
//             // Убираем все нецифровые символы
//             let digits = input.value.replace(/\D/g, "");
      
//             // Если ничего не введено — оставляем пустым
//             if (digits.length === 0) {
//               input.value = "";
//               return;
//             }
      
//             input.value = formateDate(digits);
//           });
//           input.addEventListener('blur', function(){
//              if (/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/.test(input.value)) {
//             input.value += ":00";
//             mainData.formInstances[input.closest('form').dataset.formId]['requestDate'] = input.value
//           }
//         })
    
//         });
    
//     }
//     function formateDate(value){
//      // Ограничиваем длину до 14 символов
//             let digits = value.slice(0, 14);
      
//             let parts = [];
      
//             if (digits.length >= 1) parts.push(digits.slice(0, 2));       // День
//             if (digits.length >= 3) parts[1] = digits.slice(2, 4);         // Месяц
//             if (digits.length >= 5) parts[2] = digits.slice(4, 8);         // Год
//             if (digits.length >= 9) parts[3] = digits.slice(8, 10);        // Часы
//             if (digits.length >= 11) parts[4] = digits.slice(10, 12);      // Минуты
//             if (digits.length >= 13) parts[5] = digits.slice(12, 14);      // Секунды
      
//             let formatted = "";
      
//             if (parts.length >= 1) formatted += parts[0] || "";
//             if (parts.length >= 2) formatted += "-" + (parts[1] || "");
//             if (parts.length >= 3) formatted += "-" + (parts[2] || "");
//             if (parts.length >= 4) formatted += " " + (parts[3] || "");
//             if (parts.length >= 5) formatted += ":" + (parts[4] || "");
//             if (parts.length >= 6) formatted += ":" + (parts[5] || "");
//             return formatted
//     }
    
    
//     async function prepareData() {
//         const chunkSize = 100;
    
//         for (let i = 0; i < mainData.length; i += chunkSize) {
//             const chunk = mainData.formInstances.slice(i, i + chunkSize);
    
//             const json = {
//                 requests: chunk.map(instance => instance.getFormData())
//             };
    
//             // Ждём, пока send завершится, прежде чем перейти к следующей пачке
//             await send(siteId, accessToken, JSON.stringify(json));
//         }
//     }
    
//     function removeErrors(input){
//             input.classList.remove('border-red-600')
//     }
//     function markRequiredInputs(){
//         const requiredInputs = document.querySelectorAll('[required]')
//         requiredInputs.forEach(input=>{
//             if(!input.value){
//                 input.classList.add('border-red-600')
//                 showNotification('Не заполнены обязательные поля или контактные данные', 'error')
//             }
//             else{
//                 removeErrors(input)
//             }
//         })
    
//     }
//     function verifyData() {
//         console.log(mainData.formInstances.length, mainData.formInstances)
//         markRequiredInputs();
    
    
//         const hasRepeatedRequestNumbers = () => {
//             const requestNumbers = mainData.formInstances.map(form => form.requestNumber);
//             const uniqueNumbers = new Set();
    
//             for (const number of requestNumbers) {
//                 if (uniqueNumbers.has(number)) {
//                     return true;
//                 }
//                 uniqueNumbers.add(number);
//             }
//             return false;
//         };
    
//         const numbersRepeated = hasRepeatedRequestNumbers();
    
//         const allFormsVerified = mainData.formInstances.every(form => {
//             if (!form.verifyForm()) {
    
//                 showNotification('Не заполнены обязательные поля', 'error');
//                 return false;
//             }
//             return true;
//         });
    
//         if (!allFormsVerified) return;
    
//         const sourcesChecked = mainData.formInstances.every(form => form.checkSources());
    
//         if (!siteId || !accessToken) {
//             showNotification('Не заполнены обязательные поля', 'error');
//             return;
//         }
    
//         if (numbersRepeated) {
//             showNotification('Указаны повторяющиеся номера форм', 'error');
    
//             return;
//         }
    
//         if (!sourcesChecked) {
//             showConfirmationModal();
//         } else {
//             submitData();
//         }
    
//         function showConfirmationModal() {
//             const container = document.querySelector('#modalContainer');
//             container.innerHTML += ConfirmationModal();
//             const modal = document.querySelector('#modalConfirmation');
    
//             modal.addEventListener('click', (e) => {
//                 const target = e.target;
//                 if (target.closest('[name="modalConfirmCancel"]') || target.id === 'modalConfirmation') {
//                     modal.remove();
//                 } else if (target.closest('[name="modalConfirm"]')) {
//                     submitData();
//                     modal.remove();
//                 }
//             });
//         }
    
//         function submitData() {
//             prepareData();
//             markRequiredInputs();
//         }
//     }
//     function createCustomField(formId, fieldId){
//         const currentFormContainer = document.querySelector(`form[data-form-id="${formId}"] [name="customFieldsContainer"]`)
//         const newField = document.createElement('div')
//         newField.innerHTML = getCustomField({formId, 'customFieldId':fieldId})
//         currentFormContainer.appendChild(newField)
    
//     }
//     function addCustomFiled(formId){
//         const customFiledsAmount = mainData.formInstances[formId].customFields.length
//         if(customFiledsAmount < mainData.formInstances[formId].customFieldsMaxSize){
//             mainData.formInstances[formId].addCustomFiled()
//             createCustomField(formId, customFiledsAmount)
//         }
    
        
//     }
    
//     function downloadTemplate(){
//         const headers = [
//             {name: 'Дата заявки (дд-мм-гггг чч:мм:сс)', width: 30},
//             {name: 'ФИО', width: 15},
//             {name: 'Номер телефона', width: 20},
//             {name: 'email', width: 15},
//             {name: 'Название заявки', width: 20},
//             {name: 'ID сессии', width: 15},
//             {name: 'source', width: 15},
//             {name: 'medium', width: 15},
//             {name: 'campaign', width: 15},
//             {name: 'content', width: 15},
//             {name: 'term', width: 15},
//             {name: 'tags', width: 15},
//             {name: 'Комментарий', width: 20},
//             {name: 'URL адреса заявки', width: 30},
//         ];
    
//         const worksheetData = [headers.map(header => header.name)];
//         const ws = XLSX.utils.aoa_to_sheet(worksheetData);
//         const wb = XLSX.utils.book_new();    
//         XLSX.utils.book_append_sheet(wb, ws, "Шаблон");
    
//         ws['!cols'] = headers.map(col => ({ wch: col.width }));
//         XLSX.writeFile(wb, "Шаблон импорта заявок.xlsx");
//     }
//     function generateReqNums(){
//         // const reqNumsInputs = document.querySelectorAll('#container [name="requestNumber"]')
//         const  generateUniqueId = (()=>{
//             let counter = 0;
//             return function(){
//                 const timePart = Date.now() % 10000; // последние 4 цифры времени
//                 const randomPart = Math.floor(Math.random() * 100); // 2 случайные цифры
//                 counter = (counter + 1) % 1000;
//                 return parseInt(`${timePart}${counter.toString().padStart(2, '0')}${randomPart}`);
//             }
//         })();    
//         if(mainData.size){
//             mainData.formInstances.map(
//                     form => {
//                     const reqID = `imp${generateUniqueId()}` // id заявки
//                     form['requestNumber'] = reqID
//                 })
//             updateFormInput('requestNumber')
//         }
    
//     }
//     function updateFormInput(inputName){
//         const update = () => {
//             mainData.formInstances.map((form, id) => {
//                 const input = document.querySelector(`form[data-form-id="${id}"] input[name="${inputName}"]`)
//                 input.value = mainData.formInstances[id][inputName]
//                 updateInputLengthCounter({formId: id, type: inputName, value: mainData.formInstances[id][inputName]})
//             })
//         }
//         window.requestAnimationFrame(update)
//     }
//     function showMenuContainer(){
//         const menuContainer = document.querySelector('[name="menu_container"]')
//         menuContainer.classList.remove('hidden')
//     }
//     function hideMenuContainer(){
//         const menuContainer = document.querySelector('[name="menu_container"]')
//         menuContainer.classList.add('hidden')
//     }
//     function updateFinder(amount){
//         const finder = document.querySelector('#finder')
//         const amountSpan = finder.querySelector('[name="finderAmount"]')
//         amountSpan.textContent = amount
    
//     }
//     function finderInputHandler(inputValue){
//         if(inputValue === '') return ''
//         if(+inputValue === 0) return 1
//         if(+inputValue > mainData.size) return mainData.size
//         return inputValue
//     }
//     function findForm(id){
//         if(id === '') return
//         id--
//         if(id < 0) id = 0
//         container.querySelector(`form[data-form-id="${id}"]`).scrollIntoView({behavior: "auto", block: "center", inline: "start"}
//     )
//     }
//     function hideFinder(finder, arrow){
//         const collapsedFinder = !mainData.collapsedFinder
//         if(collapsedFinder){
//             finder.classList.remove("translate-x-[calc(100%-1.5rem)]"); // разворачиваем обратно
//             arrow.classList.remove("rotate-180"); // стрелка вправо
//         }
//         else{
//             finder.classList.add("translate-x-[calc(100%-1.5rem)]"); // скрываем всё кроме стрелки
//             arrow.classList.add("rotate-180"); // стрелка влево
//         }
    
//     }
//     function scrollToTop(){
//         window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: "instant"
//         });
//     }
    
//     document.addEventListener('input', (e)=>{
//         const {target} = e
//         // siteID
//         if(target.dataset.type === 'number') {
//             const res = target.value.replace(/[^0-9]/g, '')
//             target.value = res
//             if(target.getAttribute('name') ==='siteId') siteId = res
//         }
//         if(target.getAttribute('name') === 'formAmount'){
//             if(target.value === '0') {
//                 target.value = 1
//                 mainData.newSize = Number(target.value)
//             }
//             else mainData.newSize = Number(target.value)
//         }
//         // AccessToken 
//         if(target.getAttribute('name') === 'access-token') mainData.accessToken = target.value
//         // Остальные поля
//         if(target.hasAttribute('name') && target.closest('form') && target.getAttribute('name') in mainData.formInstances[target.closest('form').dataset.formId]){
//             const form = target.closest('form')
//             const formId = form.dataset.formId
//             const type = target.getAttribute('name')
//             enterData({value:target.value, type:type, formId:formId})
//             updateInputLengthCounter({formId:formId, type:type, value:target.value})
            
    
//         }
//         // Поле поисковика форм
//         if(target.getAttribute('name') === 'finderInput') target.value = finderInputHandler(target.value)
//         // Кастомные поля 
//         if(target.getAttribute('name') === 'customFieldApi' || target.getAttribute('name') === 'customFieldValue'){
//             const formId = target.closest('div[name="customField"]').dataset.customfieldFormid
//             const fieldId = target.closest('div[name="customField"]').dataset.customFieldId
//             if(target.getAttribute('name') === 'customFieldApi'){
//                 mainData.formInstances[formId].customFields[fieldId].field = target.value
//             }
//             else if(target.getAttribute('name') === 'customFieldValue'){
//                 mainData.formInstances[formId].customFields[fieldId].value = target.value
//             }
//         }
//     })
    
//     document.addEventListener('click', (e) => {
//         const {target} = e
//         if(target.hasAttribute('id') && target.getAttribute('id') === 'send') verifyData()
//         else if(target.hasAttribute('id') && target.getAttribute('id') === 'addForms') onUpdateForms()
//         else if(target.closest('#importDataForm')) onImportModalClick()
//         else if(target.hasAttribute('name') && target.getAttribute('name') === 'modalConfirmCancel'){}
//         else if((target.hasAttribute('name') && target.getAttribute('name') === 'customFieldBtn') || (target.closest('button') && target.closest('button').hasAttribute('name') && target.closest('button').getAttribute('name') === 'customFieldBtn')){
//             e.preventDefault()
//             addCustomFiled(target.closest('form').getAttribute('data-form-id'))
//         }
//         else if(target.closest('[name="downloadTemplate"]')) downloadTemplate()
//         else if(target.closest('[name="reqNumsGenerator"]')) generateReqNums()
//         else if(target.closest('[name="duplicateInputData"]'))duplicateInuteData(e)
//         else if(target.getAttribute('name') === 'finderHide' || target.closest('[name="finderHide"]')) hideFinder(target.closest('#finder'), target.closest('[name="finderHide"]'))
//         else if(target.closest('[name="lifter"]')) scrollToTop()
//         })
//     document.addEventListener('scroll', ()=>{
//     if(window.pageYOffset > document.documentElement.clientHeight/2){
//         lifter.classList.remove('opacity-0')
//         lifter.classList.add('opacity-100')
//     }
//     else{
//         lifter.classList.remove('opacity-100')
//         lifter.classList.add('opacity-0')
//     }
//     })
//     document.addEventListener('keydown', e => {
//         if(e.key === 'Enter'){
//             const target = e.target
//             if(target.getAttribute('name') === 'formAmount') onUpdateForms()
//             else if(target.getAttribute('name') === 'finderInput') findForm(target.value)
//         }
//     })
//     document.addEventListener('mouseover', e =>{
//         const target = e.target
//         if(target.closest('[name="menuButton"]')) {
//             showMenuContainer()
//         }
       
//     })
//     document.addEventListener('mouseout', e =>{
//         const target = e.target
//         if(!target.closest('[name="menuButton"]') && !target.closest('[name="menu_container"]')) {
//             hideMenuContainer()
//         }
       
//     })
    
//     // function drawForms(amount){
//     //     const currentFormAmount = mainData.length
//     //     if(amount === currentFormAmount){
//     //         return
//     //     }
//     //     else if(amount > currentFormAmount){
//     //         for(let i = currentFormAmount; i < amount; i++){
//     //             mainData.formInstances.push(new Form(i))
                
//     //             addCustomFiled(formContainer.querySelector('form'))
//     //         }               
//     //     }
//     //     else if(amount < currentFormAmount){
//     //         for(let i = 0; i < currentFormAmount - amount; i++){
//     //             const removedItem = mainData.formInstances.pop()
                
//     //         }
//     //     }
//     //     updateFinder(amount)
//     //     // onAddCustomFiledBtnClick()
//     // }
//     // function createForms(id){
        
//     //     const formContainer = document.createElement('div')
//     //     formContainer.innerHTML = getForm(id, mainData.typeValidator)
//     //     container.appendChild(formContainer)
//     //     addCustomFiled(id)
//     // }
//     // function removeForms(id){
//     //     const itemToRemove = container.querySelector(`form[data-form-id="${id}"]`).closest('div')
//     //     container.removeChild(itemToRemove)
//     // }
//     // function onUpdateForms(){
//     //     const amount = mainData.newSize
//     //     if(mainData.size === amount) return
//     //     else if(mainData.size < amount){
//     //         for(let i = mainData.size; i < amount; i++){
//     //             mainData.formInstances.push(new Form(i))
//     //             createForms(i)
//     //         }
//     //         mainData.size = mainData.formInstances.length
//     //         mainData.pages = Math.ceil(mainData.size / mainData.formsPerPage)
//     //     }
//     //     // const start = (mainData.formInstances.length - 1) - (mainData.formsPerPage * (mainData.currentPage - 1))
//     //     // const end = Math.max(start + Math.min(mainData.formsPerPage, mainData.size - start))
//     //     // console.log(start, end)
//     //     else if(mainData.size > amount){
//     //         for(let i = mainData.size; i > amount; i--){
//     //             mainData.formInstances.pop()
//     //             removeForms(i-1)
//     //         }
//     //         mainData.size = mainData.formInstances.length
//     //     }
//     //     updateFinder(mainData.size)
//     // }
//     function init(){
//         mainData.formInstances.push(new Form(0))
//         mainData.size = mainData.formInstances.length
//         createForms(0)
//         updateFinder(mainData.size)
//     }
//     // function addForms(){
//     //     let  amount = formAmountInput.value
//     //     if(amount < 1 || amount == 0) amount = 1 
//     //     drawForms(amount)
//     //     onDateTyping()
//     //     // duplicateInuteData()
//     //     updateFinder(amount)
//     // }
//      function showNotification(message, type) {
//         const error = document.getElementById('errorNotification');
//         const success = document.getElementById('successNotification');
//         const warning = document.getElementById('successNotification');
    
//         function showElement(el){
//             el.querySelector('div.flex-1').innerText = message;
//             el.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
//             el.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        
//             setTimeout(() => {
//               el.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
//               el.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
//             }, 3000);
//         }
//         if(type === 'error') showElement(error)
//         else if(type === 'success') showElement(success)
//         else if(type === 'warning') showElement(warning)
//       }
    
//         init()
// }