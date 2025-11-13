// PreviewManager.js
import previewTemplate from "../ui/PreviewTempate.js"
export default class PreviewManager {
    constructor(state) {
        this.state = state;
    }

    fieldMap = {
        requestUrl: 'Адрес заявки',
        requestDate: 'Дата заявки',
        subject: 'Название',
        fio: 'ФИО',
        phoneNumber: 'Номер телефона',
        email: 'Email',
        sessionId: 'ID сессии',
        comment: 'Комментарий',
        tags: 'Теги',
        source: 'Source',
        medium: 'Medium',
        campaign: 'Campaign',
        content: 'Content',
        term: 'Term',
        manager: 'Менеджер',
        requestNumber: 'Номер заявки',
    }

    getPreviewLayout(id, data) {
        const template = document.createElement('div');
        template.classList.add('form-preview', 'mb-6');

        const content = previewTemplate(id, data);
        template.appendChild(content);

        return template;
    }

    collectData() {
        const forms = this.state.forms;
        const resElement = document.createDocumentFragment();

        if (forms.length) {
            forms.forEach((form, index) => {
                const formData = form.formProps;
                const res = {};

                // --- Стандартные поля ---
                for (let key in formData) {
                    if (
                        ['customFields', 'customSources', 'comment', 'addTags'].includes(key)
                    ) continue; // обработаем отдельно

                    if (formData[key] !== undefined && formData[key] !== '') {
                        res[this.fieldMap[key] || key] = formData[key];
                    }
                }

                // --- Custom Sources ---
                if (formData.customSources) {
                    for (let key in formData.customSources) {
                        const name = this.fieldMap[key] || key;
                        res[name] = formData.customSources[key];
                    }
                }

                // --- Комментарий ---
                if (formData.comment && formData.comment.text) {
                    res['Комментарий'] = formData.comment.text;
                }

                // --- Теги ---
                if (formData.addTags && Array.isArray(formData.addTags)) {
                    res['Теги'] = formData.addTags.map(t => t.tag).join(', ');
                }

                // --- Кастомные поля ---
                if (formData.customFields && formData.customFields.length) {
                    formData.customFields.forEach(f => {
                        if (f.field && f.value) {
                            res[`Кастомное поле: ${f.field}`] = f.value;
                        }
                    });
                }

                // --- Добавляем блок только если есть что показать ---

                if (Object.keys(res).length) {
                    resElement.appendChild(this.getPreviewLayout(index, res));
                }
                else{
                    resElement.appendChild(this.getPreviewLayout(index));
                }
            });
        }

        return resElement;
    }
}