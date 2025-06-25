export function importDataForm(){
    return(
        `        <div id="importModal" tabindex="-1" class="flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full">
  <div class="relative p-4 w-full max-w-4xl max-h-full absolute top-5 justify-center">
    <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Загрузить данные
        </h3>
        <button type="button" class="close_modal_btn text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
      <!-- Body -->
      <div class="p-4 md:p-5" name="importModalBody">
        
      </div>
    </div>
  </div>
</div>`
    )
}
export function importModalFirstPage(){
    return(
        `
        <div class="grid grid-cols-3 gap-6 mb-5">
          <!-- Left side -->
          <div class="col-span-1 flex flex-col space-y-4">
            <div>
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Поле</label>
              <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="chooseOption">Выберите поле</option>
                <option value="requestDate">Дата заявки</option>
                <option value="requestNumber">Номер заявки</option>
                <option value="subject">Название заявки</option>
                <option value="fio">Фио</option>
                <option value="phoneNumber">Телефон</option>
                <option value="email">Почта</option>
                <option value="source">Source</option>
                <option value="medium">Medium</option>
                <option value="campaign">Campaign</option>
                <option value="content">Content</option>
                <option value="term">Term</option>
                <option value="manager">Менеджер</option>
                <option value="requestUrl">Адрес страницы</option>
              </select>
            </div>
            <div class="flex-grow">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Данные</label>
              <textarea id="description" rows="10" class="resize-none block w-full h-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Добавьте данные с новой строки"></textarea>
            </div>
            
          </div>

          <!-- Right side -->
          <div class="col-span-2 flex items-center justify-center" id="dropZone">
            <label for="dropzone-file" class="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-400">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 28 28" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">              
                    <path d="M5 4a2 2 0 0 1 2-2h10l6 6v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/>
                    <polyline points="15 2 15 8 21 8"/> 
                    <line x1="9" y1="13" x2="19" y2="13"/>
                    <line x1="9" y1="17" x2="19" y2="17"/>
                    <line x1="9" y1="21" x2="16" y2="21"/>
                  </svg>
                <p class="my-2 text-sm text-gray-500 dark:text-gray-300"><span class="font-semibold">Перетащите Excel файл</span> или кликните для выбора</p>
              </div>
              <input id="fileInput" type="file" class="hidden" accept=".xlsx, .xls"/>
            </label>
          </div>
        </div>
        <button type="submit" class="w-fit text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/></svg>
              Загрузить
            </button>
        `
    )
}
export function importModalSecondPage(headers){
    function generateMatchingList(headers){
        let matchingItem = ``
        headers.forEach(header => {
            matchingItem += (`
                <div>${header}</div>
                    <select name="matchingHeaderSelector" data-header-from="${header}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="chooseOption">Выберите поле</option>
                        <option value="requestDate">Дата заявки</option>
                        <option value="requestNumber">Номер заявки</option>
                        <option value="subject">Название заявки</option>
                        <option value="fio">Фио</option>
                        <option value="phoneNumber">Телефон</option>
                        <option value="email">Почта</option>
                        <option value="comment">Комментарий</option>
                        <option value="sessionId">ID сессии</option>
                        <option value="source">Source</option>
                        <option value="medium">Medium</option>
                        <option value="campaign">Campaign</option>
                        <option value="content">Content</option>
                        <option value="term">Term</option>
                        <option value="manager">Менеджер</option>
                        <option value="tags">Теги</option>
                        <option value="requestUrl">Адрес страницы</option>
                    </select>`)
        })
        return matchingItem
    }
    return(
        `
            <div class="overflow-y-auto px-6 py-4 space-y-4" style="max-height: 70vh;">
                <div class="grid grid-cols-2 items-center gap-4" id="modalMathcingList">
                    ${generateMatchingList(headers)}
                </div>
            </div>
            <button type="submit" class="w-fit text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/></svg>
              Загрузить
            </button>
        `
    )
}