export default function getCustomField({formId, customFieldId, types}){
const container = document.createElement('div')
container.setAttribute('name', 'customField')
container.dataset.customFieldId = customFieldId
container.dataset.customfieldFormid = formId
container.classList.add('mb-3', 'flex', 'flex-wrap', 'lg:flex-nowrap', 'w-full', 'gap-3')
container.dataset.customFieldFormId = `${formId}`
container.dataset.customFieldID = `${customFieldId}`

const template = `
<div class="flex flex-col min-[1200px]:flex-row gap-4 min-[1200px]:gap-6 w-full">
    <div class="relative flex flex-col w-full min-[1200px]:flex-grow">
        <div class="relative w-full">
            <label for="customFieldApi${customFieldId}${formId}" class="absolute -top-2 left-2 px-2 text-sm font-semibold text-slate-400 bg-[#4c5e75] rounded-lg z-10">
                Название поля в API
            </label>
            <input id="customFieldApi${customFieldId}${formId}" name="customFieldApi" 
                   class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"/>
        </div>
    </div>

    <div class="relative flex flex-col w-full min-[1200px]:flex-grow">
        <div class="relative w-full">
            <!-- Выпадающий "лейбл" -->
            <div name="customDropdown" class="dropdown-group absolute -top-2 left-2">
                <div name="customFieldSelect" data-type="text" class="dropdown-trigger px-2 text-sm font-semibold text-gray-300 bg-[#4c5e75] rounded-lg cursor-pointer select-none hover:text-sky-300 transition-colors duration-150">Тип: 
                    ${types['text']} ▾
                </div>

                <ul name="customDropdownMenu" class="dropdown-menu absolute top-6 z-50 left-0 bg-[#4c5e75] text-slate-200 rounded-lg shadow-lg border border-[#5a6e87] opacity-0 invisible translate-y-1 transition-all duration-200 w-30 pt-1">
                    <li class="px-3 py-2 hover:bg-[#556981] cursor-pointer text-center text-sm border-b border-[#5a6e87] first:rounded-t-lg" 
                        data-customFieldType="text">Текст</li>
                    <li class="px-3 py-2 hover:bg-[#556981] cursor-pointer text-center text-sm border-b border-[#5a6e87]" 
                        data-customFieldType="number">Число</li>
                    <li class="px-3 py-2 hover:bg-[#556981] cursor-pointer text-center text-sm last:rounded-b-lg" 
                        data-customFieldType="date">Дата</li>
                </ul>
            </div>

            <!-- Input -->
            <input
                id="customFieldValue${customFieldId}${formId}"
                name="customFieldValue"
                class="peer w-full bg-[#4c5e75] text-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-[#556981] transition-all duration-200"
            />
        </div>
    </div>
</div>

<style>
.dropdown-group:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    translate: 0 0;
}
</style>`

container.innerHTML = template
    // const typeSelect = container.querySelector('[name="customFieldSelect"]')
    // const handleClick = e => {
    //   const target = e.target
    //   type = target.dataset.customfieldtype
    //   typeSelect.textContent = `Тип: ${type} ▾`
    // }
    // container.addEventListener('click', handleClick)
    return container
}
