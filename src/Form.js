export default class Form{
    constructor(formId){
        this.formId = formId
    }

requestUrl = '' 
requestDate = '' 
requestNumber = '' 
subject = ''
fio = '' 
phoneNumber = '' 
email = ''
sessionId = ''
comment = ''
tags = ''
source = ''
medium = ''
campaign = ''
content = '' 
term = ''
manager = ''
customFields = []

get customFiledsAmout(){
    if(this.customFields.length < 20){
        if(this.customFields.length === 0){
            return 0
        }
        else{
            return this.customFields.length
        }
    }
    return false
}
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