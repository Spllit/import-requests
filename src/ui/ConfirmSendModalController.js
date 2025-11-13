export default class ConfirmSendModalController{
    constructor(){
        this.modal = document.querySelector('#modalConfirmation')
        this.send = document.querySelector('[name="modalConfirm"]')
        this.cancel = document.querySelector('[name="modalConfirmCancel"]')
    }
    showModal(){
        return new Promise(resolve => {
            const closeModal = () => this.modal.classList.add('hidden')
            
            const cleanUp = () => {
                closeModal()
                this.send.removeEventListener('click', this.onConfirm)
                this.cancel.removeEventListener('click', this.onCancel)
            }
            const onConfirm = () => {
                cleanUp()
                resolve(true)
                
            }
            const onCancel = () => {
                cleanUp()
                resolve(false)
            }
            const onKeypress = (e) => {{
                if (e.key === 'Escape') {
                    cleanUp()
                    resolve(false)
                }
            }}
            this.modal.classList.remove('hidden')
            this.send.addEventListener('click', onConfirm)
            this.cancel.addEventListener('click', onCancel)
            document.addEventListener('keydown', onKeypress)
            // this.modal.addEventListener('click', ({target} = e ) => {
            //     if(!target.closest('[data-dialog="modal"]')){
            //         this.on
            //     }
            // })
        })
    }
}