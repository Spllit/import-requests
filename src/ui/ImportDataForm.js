// ui/ImportDataForm.js
export function importModalFirstPage() {
  return `
    <div class="grid grid-cols-3 gap-6 mb-5">
      <!-- Левый столбец: ручной импорт (визуально) -->
      <div class="col-span-1 flex flex-col space-y-4">
        <div>
          
          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Поле</label>
          <select id="category" name="handleImportCategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="">Выберите поле</option>
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
          <textarea id="description" name="handleImportData" rows="10" class="resize-none block w-full h-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Добавьте данные с новой строки"></textarea>
        </div>
      </div>

      <!-- Правый столбец: автоматический импорт (визуально) -->
      <div class="col-span-2">
        <div id="dropZone" class="col-span-2 flex items-center justify-center h-full">
          <label for="dropzone-file" class="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-400">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 28 28" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4a2 2 0 0 1 2-2h10l6 6v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/>
                <polyline points="15 2 15 8 21 8"/>
                <line x1="9" y1="13" x2="19" y2="13"/>
                <line x1="9" y1="17" x2="19" y2="17"/>
                <line x1="9" y1="21" x2="16" y2="21"/>
              </svg>
              <p class="my-2 text-sm text-gray-500 dark:text-gray-300"><span class="my-2 text-sm text-gray-500 dark:text-gray-300">Перетащите Excel файл</span> или кликните для выбора</p>
            </div>
            <input id="fileInput" type="file" class="hidden" accept=".xlsx, .xls"/>
          </label>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button type="submit" class="submit-btn w-fit text-gray-700 inline-flex items-center bg-white hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
        <svg class="me-1 -ms-1 w-5 h-5" fill="black" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
        Загрузить
      </button>
    </div>
  `;
}

export function importModalSecondPage(headers = []) {
  function generateMatchingList(headersList) {
    let html = '';
    headersList.forEach(header => {
      html += `
        <div class="mb-2">${header}</div>
        <select name="matchingHeaderSelector" data-header-from="${header}" class="dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <option value="">Выберите поле</option>
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
        </select>`;
    });
    return html;
  }

  return `
    <div class="overflow-y-auto pr-4 space-y-2 compact-scrollbar" style="max-height: 70vh;">
      <div class="grid grid-cols-2 items-center gap-4 p-1" id="modalMathcingList">
        ${generateMatchingList(headers)}
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button type="submit" class="submit-btn w-fit text-gray-700 inline-flex items-center bg-white hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
        <svg class="me-1 -ms-1 w-5 h-5" fill="black" viewBox="0 0 20 20"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path></svg>
        Загрузить
      </button>
    </div>
  `;
}