export default function getReportModal(data){
    return(
        `                        <div id="reportModal" class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                            <div class="bg-white w-full max-w-3xl h-[65vh] rounded-2xl shadow-xl flex flex-col dark:bg-gray-700">
                              
                              <!-- Заголовок -->
                              <div class="flex items-center justify-between p-4 border-b dark:bg-gray-700 dark:border-gray-600 ">
                                <h2 class="text-lg font-semibold">Просмотр JSON</h2>
                                <button type="button" class="close_modal_btn text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                              </div>
                          
                              <!-- Тело окна с прокруткой -->
                              <div class="p-4 overflow-auto h-[90%]">
                                <pre class="dark:bg-gray-700 p-4 rounded-lg text-sm whitespace-pre-wrap">
                                    <code>
${data}
                                    </code>
                                </pre>
                              </div>
                              
                            </div>
                          </div>`
    )
}