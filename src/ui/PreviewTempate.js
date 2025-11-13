// PreviewTemplate.js
export default function previewTemplate(id, data = {}) {
    const container = document.createDocumentFragment();

    // Заголовок формы
    const header = document.createElement('h4');
    header.className = "text-xl font-semibold text-gray-900 dark:text-white mb-4";
    header.textContent = `Форма ${id + 1}:`;
    container.appendChild(header);

    // Сетка с полями
    if(Object.keys(data).length){
    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 gap-3";
        for (let key in data) {
            const fieldDiv = document.createElement('div');
            
            fieldDiv.className = "flex justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150 cursor-pointer";
    
            const nameSpan = document.createElement('span');
            nameSpan.className = "font-medium text-gray-700 dark:text-gray-300";
            nameSpan.textContent = key + ":";
    
            const valueSpan = document.createElement('span');
            valueSpan.textContent = data[key];
    
            fieldDiv.appendChild(nameSpan);
            fieldDiv.appendChild(valueSpan);
    
            grid.appendChild(fieldDiv);
        }
        container.appendChild(grid);
    }

    return container;
}
