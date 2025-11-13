export default class AppState{
    #forms = [];
    #size = 0
    #newSize = 0
    #lastId = 0
    #siteId = undefined
    #accessToken =  undefined
    #collapsedFinder = false
    #typeValidator =  {
            requestNumber: 100,
            subject: 100,
            requestUrl: 1000,
            sessionId: 100,
            fio: 100,
            comment: 1000,
            customFieldValue: 100,
            customFieldNumber: 38,
    }
    #customFieldsTypesMap = {
        'text': 'текст',
        'date': 'дата',
        'number': 'число'
    }
    #unsendedForms = []
    #backupForms = []
    #subscribers = {}
    #errorInputs = []
    #errorForms = new Set()
    
    get forms(){
        return this.#forms
    }
    set size(val){
        this.#size = val
    }
    get size(){
        return this.#size
    }
    get lastId(){
        return this.#lastId
    }
    set newSize(val){
        this.#newSize = val
    }
    get newSize(){
        return this.#newSize
    }

    set siteId(val){
        this.#siteId = val
    }
    get siteId(){
        return this.#siteId
    }
    set accessToken(val){
        this.#accessToken = val
    }
    get accessToken(){
        return this.#accessToken
    }

    set collapsedFinder(val){
        this.#collapsedFinder = val
    }
    get collapsedFinder(){
        return this.#collapsedFinder
    }
    set unsendedForms(val){
        this.#unsendedForms = val
    }
    get unsendedForms(){
        return this.#unsendedForms
    }
    get customFieldsTypesMap(){
        return this.#customFieldsTypesMap
    }
    set backupForms(val){
        this.#backupForms = val
    }
    get backupForms(){
        return this.#backupForms
    }
    get typeValidator(){
        return this.#typeValidator
    }

    set errorInputs(value){
        return this.#errorInputs.push(value)
    }
    get errorInputs(){
        return this.#errorInputs
    }
    set errorForms(value){
        return this.#errorForms.add(value)
    }
    get errorForms(){
        return this.#errorInputs
    }
    set subscribers(val){
        if(typeof val === 'object' && typeof val?.action === 'function'){
            this.#subscribers[val.key] = val.action
        }
    }
    clearErrors(){
        this.#errorInputs = []
        this.#errorForms.clear()
    }
    cleanup(){
        this.#forms = []
        this.#size = 0
        this.#newSize = 0
        this.#lastId = 0
    }
    addForm(form){
        this.#forms.push(form) 
        this.#size = this.#forms.length
        this.#lastId = this.#size - 1
        if(this.#subscribers.updateFinder){
            this.#subscribers.updateFinder(this.#forms.length)
        }
    }
    callSubscribers(){
        if(this.#subscribers.length){
            this.#subscribers.forEach(fn => {
                if(typeof fn === 'function') fn()
            })
        }
    }
    removeExactForm(id = this.#forms.length-1){
        this.#forms = this.#forms.filter((_,index) => index !== id)
        this.#size = this.#forms.length
        this.#lastId = this.#size - 1
        if(this.#subscribers.updateFinder){
            this.#subscribers.updateFinder(this.#forms.length)
        }
    }
    cutFormsArray(amount){
        this.#forms.length -= amount
        this.#size = this.#forms.length
        this.#lastId = this.#size - 1
        if(this.#subscribers.updateFinder){
            this.#subscribers.updateFinder(this.#forms.length)
        }
    }
}