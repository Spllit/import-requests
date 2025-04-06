export default function throwMessage(...message){
    let messageSpan = ''
    message.forEach(message => {
        messageSpan += `<span>${message}</span>`
    })
return messageSpan

}