export default function getForm(id){
    return(
        `<form class="relative z-1 py-3 rounded-lg shadow-lg mb-12" data-form-id="${id}">
                        <div class="flex flex-col justify-center">
                            <div class="flex justify-between">
                                <div class="flex-1 px-3 items-center  items-start">
                                    <div class="flex flex-col flex-grow justify-around space-y-2">
                                        <div class="flex flex-grow  flex-nowrap lg:flex-wrap md:flex-wrap sm:flex-wrap space-y-2 ">
                                            <!-- <div class="flex flex-col flex-grow   space-y-2"> -->
                                               <div class="flex relative flex-col mr-7 w-full lg:w-1/3 flex-grow space-y-2">
                                                   <span>Дата *</span>
                                                <button data-tooltip="Скопировать значение поля  в остальные формы" tabindex="-1" data-duplicate="requestDate" name="duplicateInputData" class="absolute top-8 right-0 color-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none"  stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                                   <input type="text" required  name="requestDate" placeholder="dd-mm-yyyy hh:mm:ss" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                               </div>
                                               <div class="flex flex-col flex-grow space-y-2 relative">
                                                   <span>Номер заявки *</span>
                                                    <button tabindex="-1" data-duplicate="requestNumber" name="duplicateInputData" class="absolute top-8 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                   <input type="text" required  name="requestNumber" placeholder="Номер заявки" maxlength="100" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                               </div>
                                            <!-- </div> -->
                                        </div>
                                        <div class="flex justify-between ">
                                            <div class="flex flex-col flex-grow space-y-2 relative">
                                                <span>Название заявки</span>
                                                <button tabindex="-1" data-duplicate="subject" name="duplicateInputData" class="absolute top-8 right-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                                <input type="text" name="subject" placeholder="Название заявки" maxlength="100" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                            </div>
                                            

                                        </div>
                                        <div class="flex justify-between ">
                                            <div class="flex flex-col space-y-2 flex-grow relative ">
                                                <span>Контактные данные</span>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="fio" name="duplicateInputData" class="absolute top-0 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" maxlength="100" name="fio" placeholder="ФИО" class="w-full p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                    </div>
                                                    <div class="relative">
                                                        <button tabindex="-1" data-duplicate="phoneNumber" name="duplicateInputData" class="absolute top-0 right-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                            </svg>
                                                        </button>
                                                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phoneNumber" placeholder="Телефон" class="w-full p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                </div>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="email" name="duplicateInputData" class="absolute top-0 right-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                            </svg>
                                                        </button>
                                                        <input type="text" name="email" placeholder="Почта" class="w-full p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                </div>
                                                <span>Комментарий</span>
                                                <textarea maxlength="1000" placeholder="Комментарий заявки" name="comment" class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"></textarea>
                                            </div>
                                            
                                        </div>
                                        <!-- <input type="text" name="comment" placeholder="Комментарий" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"> -->
                                    </div>
                                </div>
            
                                <div class="flex-1 px-3 items-center justify-around items-start">
                                <div class="flex flex-col flex-grow  space-y-2 relative">
                                    <div class="flex flex-col flex-grow space-y-2 relative">
                                    <span>Адрес страницы</span>
                                        <button tabindex="-1" data-duplicate="requestUrl" name="duplicateInputData" class="absolute top-8 right-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                            </svg>
                                        </button>
                                        <input name ="requestUrl" maxlength="1000" type="text" placeholder="Адрес страницы" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                        </div>
                                        <div class="flex flex-col space-y-2 flex-grow relative">
                                            <span>Источники</span>
                                            
                                                <input type="number" placeholder="sessionId" maxlength="100" name="sessionId" class="p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
    
                                        
                                            </div>
                                                <div class="flex flex-col  sources flex-grow">
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="source" name="duplicateInputData" class="absolute top-3 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" name="source" placeholder="Source" class="p-3 w-full my-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                    </div>
                                                    <div class="relative">
                                                        <button tabindex="-1" data-duplicate="medium" name="duplicateInputData" class="absolute top-3 right-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                            </svg>
                                                        </button>
                                                    <input type="text" name="medium" placeholder="Medium" class="p-3 pr-18 w-full my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                </div>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="campaign" name="duplicateInputData" class="absolute top-3 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" name="campaign" placeholder="Campaign" class="p-3 pr-18 w-full my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                </div>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="content" name="duplicateInputData" class="absolute top-3 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" name="content" placeholder="Content" class="p-3 pr-18 w-full my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                            
                                                </div>
                                                    
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="term" name="duplicateInputData" class="absolute top-3 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                <input type="text" name="term" placeholder="Term" class="p-3 pr-18 w-full border my-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                
                                                </div>
                                                </div>
                                                <div class="flex flex-col justify-around space-y-2">
                                                    <span>Менеджер | Теги</span>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="manager" name="duplicateInputData" class="absolute top-0 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" name="manager" maxlength="50" placeholder="Менеджер" class="w-full p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                
                                                </div>
                                                <div class="relative">
                                                    <button tabindex="-1" data-duplicate="tags" name="duplicateInputData" class="absolute top-0 right-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="#D1D5DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 64 64">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    <input type="text" name="tags" placeholder="Теги | введите теги через запятую" class=" w-full p-3 pr-18 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                                                
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div class="flex-1 px-3 items-center items-start" name="customFields">
                                    <div class="flex flex-col flex-grow space-y-2 relative">
                                    <span>Пользовательские поля</span> 
                                        <div class="relative h-150 overflow-y-auto" name="customFieldsContainer">
                                            
                                           
                                        </div>
                                        <div class="button_area">
                                                <button name="customFieldBtn" tabindex="-1" class="w-full text-gray-700 bg-white button_send p-3 rounded-lg">
                                                    <strong>Добавить поле</strong   >
                                                </button>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="-z-2 w-30 h-12 absolute -top-9 left-0 rounded-lg pl-3 pt-3 form_number">
                                    <strong>${id+1}</strong>
                                </div>
                        </div>
                    <form>`
    )
}