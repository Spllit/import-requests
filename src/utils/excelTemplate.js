export default function downloadTemplate(){
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
            {name: 'Теги (укажите через запятую)', width: 25},
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