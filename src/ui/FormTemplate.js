import getCustomField from "./CustomFieldTemplate.js"
export default function FormTemplate(id, typeValidator, customFieldsTypesMap, data = [{}]){
    const {
        requestDate,
        requestNumber,
        requestUrl,
        subject,
        fio,
        phoneNumber,
        email,
        comment,
        sessionId,
        source,
        medium,
        campaign,
        content,
        term,
        manager,
        tags,} = data
    const container = document.createElement('div')
    container.setAttribute('name', 'formContainer') 
    const template = `<form class="shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative z-1 py-5 pt-7 rounded-lg shadow-lg mb-12" data-form-id="${id}">
                        <div class="flex flex-col justify-center">
                            <div class="flex justify-between">
                                <div class="flex-1 px-3 items-center  items-start">
                                    <div class="flex flex-col flex-grow justify-between space-y-6">
                                    
                                   <div class="flex flex-col min-[1200px]:flex-row gap-4 min-[1200px]:gap-6 w-full"> 
                                        
                                    <div class="relative flex flex-col w-full min-[1200px]:flex-grow">
                                        <div class="relative w-full">
                                            <label for="requestDate-${id}" class="absolute -top-2 peer-focus:text-sky-100 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Дата заявки *</label>
                                            <input id="requestDate-${id}" placeholder="dd-mm-yyyy hh:mm:ss" data-form-id="${id}" value="${requestDate || ''}" name="requestDate" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                            <!-- Кнопка справа -->
                                            <button tabindex="-1" title="Скопировать дату заявки в другие формы" data-form-id="${id}" data-duplicate="requestDate" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="0 0 64 64"
                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="relative flex flex-col w-full min-[1200px]:flex-grow">
                                        <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                            <span data-counter="requestNumber" >0</span> / <span>${typeValidator.requestNumber}</span>
                                        </div>
                                        <div class="relative w-full">
                                            <label for="requestNumber-${id}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Номер заявки *</label>
                                            <input id="requestNumber-${id}" data-form-id="${id}" name="requestNumber" value="${requestNumber || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                        </div>
                                    </div>
                                </div>
                                        <div class="relative flex flex-col flex-grow">
                                        <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                            <span data-counter="subject" >0</span> / <span>${typeValidator.subject}</span>
                                        </div>
                                            <div class="relative">
                                                <label for="subject-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Название заявки</label>
                                                <input id="subject-${id}" data-form-id="${id}" value="${subject || ''}" name="subject"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                <!-- Кнопка справа -->
                                                <button tabindex="-1" data-form-id="${id}" title="Скопировать название в другие формы" data-duplicate="subject" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 64 64"
                                                        class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                        fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="flex flex-col space-y-6">
                                            <span>Контактные данные</span>
                                            
                                            <!-- Поле ФИО -->
                                            <div class="relative flex flex-col flex-grow">
                                                <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                                    <span data-counter="fio">0</span> / <span>${typeValidator.fio}</span>
                                                </div>
                                                <label for="fio-${id}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">ФИО</label>
                                                <input id="fio-${id}" data-form-id="${id}" name="fio" value="${fio || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                <button tabindex="-1" data-form-id="${id}" data-duplicate="fio" title="Скопировать ФИО в другие формы" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 64 64"
                                                        class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                        fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <!-- Поле Номер телефона -->
                                            <div class="relative flex flex-col flex-grow">
                                                <label for="phoneNumber-${id}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Номер телефона</label>
                                                <input id="phoneNumber-${id}" data-form-id="${id}" value="${phoneNumber || ''}" name="phoneNumber" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                <button tabindex="-1" data-form-id="${id}" title="Скопировать номер телефона в другие формы" data-duplicate="phoneNumber" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 64 64"
                                                        class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                        fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <!-- Поле Почта -->
                                            <div class="relative flex flex-col flex-grow">
                                                <label for="email-${id}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Почта</label>
                                                <input id="email-${id}" data-form-id="${id}" name="email" value="${email || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                <button tabindex="-1" data-form-id="${id}" data-duplicate="email" title="Скопировать почту в другие формы" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 64 64"
                                                        class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                        fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                        <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                        <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                        <line x1="32" y1="28" x2="32" y2="36"/>
                                                        <line x1="28" y1="32" x2="36" y2="32"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <!-- Поле Комментарий -->
                                            <div class="relative flex flex-col flex-grow">
                                                <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                                    <span data-counter="comment">0</span> / <span>${typeValidator.comment}</span>
                                                </div>
                                                <label for="comment-${id}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Комментарий</label>
                                                <textarea id="comment-${id}" data-form-id="${id}" name="comment" value="${comment || ''}" class="peer resize-vertical w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="flex-1 px-3 items-center justify-around items-start">
                                <div class="flex flex-col flex-grow  space-y-6 relative">
                                    <div class="relative flex flex-col flex-grow">
                                        <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                            <span data-counter="requestUrl">0</span> / <span>${typeValidator.requestUrl}</span>
                                        </div>
                                        <div class="relative">
                                        <label for="requestUrl-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Адрес страницы</label>
                                            <input id="requestUrl-${id}" data-form-id="${id}" name="requestUrl" value="${requestUrl || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                            <!-- Кнопка справа -->
                                            <button tabindex="-1" data-form-id="${id}" title="Скопировать адрес заявки в другие формы" data-duplicate="requestUrl" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="0 0 64 64"
                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                </svg>
                                            </button>
                                    </div>
                                    </div>
                                        <div class="flex flex-col space-y-3 mb-4 flex-grow relative">
                                            
                                            <div class="relative flex flex-col flex-grow">
                                                <div class="absolute -top-5 right-3 text-xs text-slate-100 z-10">
                                                    <span data-counter="sessionId">0</span> / <span>${typeValidator.sessionId}</span>
                                                </div>
                                                <div class="relative">
                                                <label for="sessionId-${id}"  class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">ID сессии</label>
                                                <input id="sessionId-${id}" data-form-id="${id}" data-type="number" name="sessionId" value="${sessionId || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                            </div>
                                        </div>
                                    </div>
                                <div class="flex flex-col flex-grow  space-y-4 relative">
                                    <span>Кастомные источники</span>
                                            <div class="relative flex flex-col flex-grow">
                                                <div class="relative">
                                                
                                                    <label for="source-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Source</label>
                                                    <input id="source-${id}" data-form-id="${id}" name="source" value="${source || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                    <!-- Кнопка справа -->
                                                    <button tabindex="-1" title="Скопировать source в другие формы" data-form-id="${id}" data-duplicate="source" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 0 64 64"
                                                            class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                            fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                                    <div class="relative flex flex-col flex-grow">
                                                    <div class="relative">
                                                    <label for="medium-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Medium</label>
                                                    <input id="medium-${id}" data-form-id="${id}" name="medium" value="${medium || ''}" class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                    <!-- Кнопка справа -->
                                                    <button tabindex="-1" data-form-id="${id}" title="Скопировать medium в другие формы" data-duplicate="medium" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 0 64 64"
                                                            class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                            fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                    </div>
                                                </div>
                                                <div class="relative flex flex-col flex-grow">
                                                <div class="relative">
                                                    <label for="campaign-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Campaign</label>
                                                    <input id="campaign-${id}" data-form-id="${id}" value="${campaign || ''}" name="campaign"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                    <!-- Кнопка справа -->
                                                    <button tabindex="-1" data-form-id="${id}" title="Скопировать campaign в другие формы" data-duplicate="campaign" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 0 64 64"
                                                            class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                            fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                            <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                            <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                            <line x1="32" y1="28" x2="32" y2="36"/>
                                                            <line x1="28" y1="32" x2="36" y2="32"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                                <div class="relative flex flex-col flex-grow">
                                                        <div class="relative">
                                                            <label for="content-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Content</label>
                                                            <input id="content-${id}" data-form-id="${id}" value="${content || ''}" name="content"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                            <!-- Кнопка справа -->
                                                            <button tabindex="-1" data-form-id="${id}" title="Скопировать content в другие формы" data-duplicate="content" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                    viewBox="0 0 64 64"
                                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="relative flex flex-col flex-grow">
                                                        <div class="relative">
                                                            <label for="term-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Term</label>
                                                            <input id="term-${id}" data-form-id="${id}" value="${term || ''}" name="term"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                            <!-- Кнопка справа -->
                                                            <button tabindex="-1" data-form-id="${id}" title="Скопировать term в другие формы" data-duplicate="term" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                    viewBox="0 0 64 64"
                                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <span>Менеджер | Теги</span>
                                                    <div class="relative flex flex-col flex-grow">
                                                        <div class="relative">
                                                            <label for="manager-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Менеджер</label>
                                                            <input id="manager-${id}" data-form-id="${id}" value="${manager || ''}" name="manager"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                            <!-- Кнопка справа -->
                                                            <button tabindex="-1" data-form-id="${id}" title="Скопировать менеджера в другие формы" data-duplicate="manager" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                    viewBox="0 0 64 64"
                                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        </div>
                                                        <div class="relative flex flex-col flex-grow">
                                                        <div class="relative">
                                                           <label for="tags-${id}"class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg">Теги</label>
                                                            <input id="tags-${id}" data-form-id="${id}" placeholder="теги указываются через запятую" value="${tags || ''}" name="tags"class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
                                                            <!-- Кнопка справа -->
                                                            <button tabindex="-1" data-form-id="${id}" title="Скопировать теги в другие формы" data-duplicate="tags" name="duplicateInputData" class="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center w-12 h-12 rounded-md transition-all duration-200 group">
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                    viewBox="0 0 64 64"
                                                                    class="w-10 h-10 stroke-[#D1D5DC] group-hover:stroke-sky-400 transition-colors duration-300"
                                                                    fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                                    <rect x="12" y="12" width="32" height="32" rx="8"/>
                                                                    <rect x="20" y="20" width="32" height="32" rx="8"/>
                                                                    <line x1="32" y1="28" x2="32" y2="36"/>
                                                                    <line x1="28" y1="32" x2="36" y2="32"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div class="flex-1 px-3 items-center items-start" name="customFields">
                                        <div class="flex flex-col flex-grow relative">
                                                <div class="relative h-147 overflow-y-auto pt-2 pl-1 pr-2 compact-scrollbar mb-2" name="customFieldsContainer">
                                                
                                                </div>
                                                <div class="button_area">
                                                    <button name="customFieldBtn" data-formId="${id}" tabindex="-1" class="w-full text-gray-700 bg-white transition-colors hover:bg-gray-300 p-3 rounded-lg">
                                                        <strong>Добавить кастомное поле</strong>
                                                    </button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="-z-2 w-30 h-12 absolute -top-9 left-0 rounded-lg pl-3 pt-3 form_number">
                                    <strong>${id+1}</strong>
                                </div>
                        </form>`
        container.innerHTML = template
        container.querySelector('[name="customFieldsContainer"]').appendChild(getCustomField({formId:id, customFieldId:0, types:customFieldsTypesMap}))
    return container
}