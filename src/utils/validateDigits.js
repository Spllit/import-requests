export default function validateDigits(val){
    if(val === '') return val
    else if(val){
        return val.replace(/[^0-9]/g, '') || ''
    }
}