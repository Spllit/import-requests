import showNotification from "../ui/showNotification.js"
export default class Send{
    constructor(state,manager){
        this.state = state
        this.manager = manager
    }
    url = 'https://api.calltouch.ru/lead-service/v1/api/request/create'
    data = {}

    onSuccessResponse = ({data}) => {
        const amoutRequests = data.requests.length
        let successfulySent = 0
        const unsendedIDs = []
        data.requests.forEach(request => {
            if(request.imported) successfulySent++
            else{unsendedIDs.push(request.requestNumber.trim())}
        })
        if(successfulySent < amoutRequests){
            showNotification(`Часть заявок не была отправлена! Отправлено: ${successfulySent} из ${amoutRequests}`, 'error')
            this.manager.saveUnloadedForms(unsendedIDs)
        }
        else{
            showNotification(`Заявка(и) успешно отправлены! ${successfulySent} из ${amoutRequests}`, 'success')
        }
    }
    onErrorResponse = (error) => {
        showNotification(`Заявка(и) не были отправлены! Статус: ${error.status}`, 'error')
    }
    async send(siteID, accessToken, data) {
        this.data = data
        try {
            const response = await axios.post(this.url, data, {
                headers: {
                    'Access-Token': accessToken,
                    'SiteId': siteID
                }
            });
            this.onSuccessResponse(response.data);
        } catch (error) {
            this.onErrorResponse(error.response || error);
        }
    }
}