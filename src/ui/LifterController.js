export default function LifterController(){
    const lifter = document.querySelector('[name="lifter"]')
    const onScroll = () => {
        if(window.pageYOffset > document.documentElement.clientHeight/2){
            lifter.classList.remove('opacity-0')
            lifter.classList.add('opacity-100')
        }
        else{
            lifter.classList.remove('opacity-100')
            lifter.classList.add('opacity-0')
        }
    }
    const onClick = () => {
        window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
    }
    document.addEventListener('scroll', onScroll)
    lifter.addEventListener('click', onClick)
}