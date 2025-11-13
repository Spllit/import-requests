export default function generateReqNums(){
    const  generateUniqueId = (()=>{
        let counter = 0;
        return function(){
            const timePart = Date.now() % 10000; // последние 4 цифры времени
            const randomPart = Math.floor(Math.random() * 100); // 2 случайные цифры
            counter = (counter + 1) % 1000;
            return parseInt(`${timePart}${counter.toString().padStart(2, '0')}${randomPart}`);
        }
    })();    
    return generateUniqueId
}