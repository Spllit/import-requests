export default class Form{
    constructor(formId, ){
        this.formId = formId
    }

_requestUrl = '' 
requestDate = '' 
_requestNumber = '' 
_subject = ''
_fio = '' 
phoneNumber = '' 
email = ''
_sessionId = ''
_comment = ''
tags = ''
source = ''
medium = ''
campaign = ''
content = '' 
term = ''
manager = ''
customFields = []
customFieldsMaxSize = 20

set requestNumber(number){
    this._requestNumber = number.slice(0,100)
}
get requestNumber(){
    return this._requestNumber
}
set subject(subject){
    this._subject = subject.slice(0,100)
}
get subject(){
    return this._subject
}
set requestUrl(requestUrl){
    this._requestUrl = requestUrl.slice(0,1000)
}
get requestUrl(){
    return this._requestUrl
}
set sessionId(sessionId){
    this._sessionId = sessionId.slice(0, 100)
}
get sessionId(){
    return this._sessionId
}
set fio(fio){
    this._fio = fio.slice(0,100)
}
get fio(){
    return this._fio
}
set comment(comment){
    this._comment = comment.slice(0,1000)
}
get comment(){
    return this._comment
}

// get customFiledsAmout(){
//     if(this.customFields.length < 20){
//         if(this.customFields.length === 0){
//             return 0
//         }
//         else{
//             return this.customFields.length
//         }
//     }
//     return false
// }
addCustomFiled(){
    if(this.customFields.length < 20){
        this.customFields.push({field: '', value: ''})
        return this.customFields.length
    }
    return false
}
// с проверкой контактных данных
// verifyForm(){
//     if(!!(this.requestDate && this.requestNumber) && !!(this.fio || this.phoneNumber || this.email || this.comment)) return true
//     return false
// }
verifyForm(){
    if(!!(this.requestDate && this.requestNumber)) return true
    return false
}
checkSources(){
    if(this.source || this.medium || this.campaign || this.content || this.term){
        if(!(this.source && this.medium && this.campaign)){
            return false
        }
    }
    return true
}

getFormData(){
    const data = {
        'requestNumber':this.requestNumber,
        'requestDate': this.requestDate,
    }
    if(this.subject)data.subject = this.subject
    if(this.requestUrl) data.requestUrl = this.requestUrl
    if(this.sessionId) data.sessionId = this.sessionId
    if(this.phoneNumber) data.phoneNumber = this.phoneNumber
    if(this.email) data.email = this.email
    if(this.fio) data.fio = this.fio
    const getComment = () =>{
        if(this.comment) data.comment = {"text": this.comment}
    }
    const getTags = () => {
        if(this.tags){
            const tagsArray = this.tags.split(',')
            const finishedArray = []
            tagsArray.forEach(tag => {
                if(tag.trim()) finishedArray.push({"tag": tag.trim()})
            })
            data.addTags = finishedArray
        }
    }
    const getCustomSources = () => {
        const validCustomSources = this.source && this.medium && this.campaign
        const customSources = {}
        if(validCustomSources){
            customSources.source = this.source
            customSources.medium = this.medium
            customSources.campaign = this.campaign
        }
        else return
        if(this.content) customSources.content = this.content
        if(this.term) customSources.term = this.term
        data.customSources = customSources
    }
    const getCustomFields = () => {
        const fieldsArr = this.customFields.filter(field => {if(field.field && field.value) return field})
            if(fieldsArr.length) data.customFields = fieldsArr
    }
    getComment()
    getTags()
    getCustomSources()
    getCustomFields()
    return data
}
}