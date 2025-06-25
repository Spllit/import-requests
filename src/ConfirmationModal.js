export default function ConfirmationModal(){
    return(
        `
          <div id="modalConfirmation" tabindex="-1"  class="flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div
      data-dialog="modal"
      class="absolute z-10 dark:bg-gray-700 m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
      <div class="flex shrink-0 items-center pb-4 text-xl font-medium text-white">
      Не корректно заполнены источники заявки
      </div>
      <div class="relative border-t dark:border-gray-600 border-gray-400 py-4 leading-normal text-white font-light">
      Некорректно заполнены источники заявки: при указании произвольных источников необходимо заполнять поля <span class="font-semibold">source, medium и campaign</span>. Иначе такая заявка будет отправлена <span class="font-semibold">без источников.  </span> 
      <br>
      <span class="text-lg font-semibold">Отправить формы?</span>
      </div>
      <div class="flex shrink-0 flex-wrap items-center pt-4 justify-end">
      <button name="modalConfirmCancel" data-dialog-close="true" class="bg-red-600 rounded-md border border-transparent font-medium py-2 px-4 text-center text-sm transition-all text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          Отмена
      </button>
      <button name="modalConfirm" data-dialog-close="true" class="dark:border-gray-600 border-gray-400 rounded-md font-medium bg-gray-600 py-2 px-4  text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
          Отправить
      </button>
      </div>
    </div>
  </div>
        `
    )
}