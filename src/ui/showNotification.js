export default function showNotification(message, type) {
    const error = document.getElementById('errorNotification');
    const success = document.getElementById('successNotification');
    const warning = document.getElementById('warningNotification');

    function showElement(el){
        el.querySelector('div.flex-1').innerText = message;
        el.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        el.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');

        setTimeout(() => {
            el.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            el.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }, 3000);
    }
    if(type === 'error') showElement(error)
    else if(type === 'success') showElement(success)
    else if(type === 'warning') showElement(warning)
}