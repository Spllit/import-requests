// import CustomFieldsManager from "./CustomFieldManager.js";
export default class FormModel {
    static CUSTOM_FIELDS_MAX = 20;

    constructor(formId, typeValidator, updateCounter) {
        this.formId = formId;
        this.typeValidator = typeValidator;
        this.updateCounter = updateCounter
        this.#initializeProps();
        this.addCustomField()
        // this.customFieldsManager = new CustomFieldsManager(this, this.formId)
    }

    #formProps;
    #isEmpty = true;

    #initializeProps() {
        this.#formProps = {
            requestUrl: '',
            requestDate: '',
            requestNumber: '',
            subject: '',
            fio: '',
            phoneNumber: '',
            email: '',
            sessionId: '',
            comment: '',
            tags: '',
            source: '',
            medium: '',
            campaign: '',
            content: '',
            term: '',
            manager: '',
            customFields: [],
        };
    }

    // --- Core API ---

    set(field, value) {
        if (field in this.#formProps === false) return;

        const limit = this.typeValidator[field];
        let safeValue = limit ? value.slice(0, limit) : value;
        this.updateCounter(field, this.formId, safeValue.length)
        this.#formProps[field] = safeValue;
        this.#isEmpty = false;
        return safeValue
    }
    setCustomFields(data){
        const {field, value, type,fieldId} = data
        const limit = this.typeValidator['customFieldValue']
        const safeValue = limit ? value.slice(0,limit) : value
        this.#formProps.customFields[fieldId] = {field:field, value:safeValue, type:type, id:`${fieldId}${this.formId}`}
        return {field:field, value:safeValue}
    }
    get(field) {
        return this.#formProps[field];
    }

    get formProps() {
        return this.#formProps;
    }

    addCustomField() {
        if (this.#formProps.customFields.length < FormModel.CUSTOM_FIELDS_MAX) {
            this.#formProps.customFields.push({ field: '', value: '',type:'text', id:`${this.#formProps.customFields.length - 1}${this.formId}` });
            return this.#formProps.customFields.length - 1
        }
    }
    changeCustomFieldType(filedId, type){
        this.#formProps.customFields[filedId].type = type
    }
    verifyForm() {
        const { requestDate, requestNumber } = this.#formProps;
        return Boolean(requestDate && requestNumber);
    }

    checkSources() {
        const { source, medium, campaign, content, term } = this.#formProps;

        const any = source || medium || campaign || content || term;
        const coreValid = source && medium && campaign;

        return any ? coreValid : true;
    }

    // --- Helpers used only inside getFormData ---

    #buildTags(data) {
        const { tags } = this.#formProps;
        if (!tags) return;

        const addTags = tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .map(tag => ({ tag }));

        if (addTags.length) data.addTags = addTags;
    }

    #buildComment(data) {
        const { comment } = this.#formProps;
        if (comment) data.comment = { text: comment };
    }

    #buildCustomSources(data) {
        const { source, medium, campaign, content, term } = this.#formProps;

        if (!(source && medium && campaign)) return;

        const customSources = { source, medium, campaign };
        if (content) customSources.content = content;
        if (term) customSources.term = term;

        data.customSources = customSources;
    }

    #buildCustomFields(data = {}) {
        const filtered = this.#formProps.customFields.filter(
            ({ field, value }) => field && value
        );

        if (filtered.length) data.customFields = filtered;
    }

    // --- Output model ---

    getFormData() {
        const {
            subject,
            requestDate,
            fio,
            phoneNumber,
            email,
            requestNumber,
            requestUrl,
            sessionId,
        } = this.#formProps;

        const data = {
            requestNumber,
            requestDate,
        };

        if (subject) data.subject = subject;
        if (requestUrl) data.requestUrl = requestUrl;
        if (sessionId) data.sessionId = sessionId;
        if (phoneNumber) data.phoneNumber = phoneNumber;
        if (email) data.email = email;
        if (fio) data.fio = fio;

        this.#buildComment(data);
        this.#buildTags(data);
        this.#buildCustomSources(data);
        this.#buildCustomFields(data);

        return data;
    }
}
