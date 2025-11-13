import PreviewManager from "../core/PreviewManager.js"

export default class Preview{
    constructor(state){
        this.state = state
        this.manager = new PreviewManager(state)

        this.modal = document.querySelector('#previewModal')
        this.closeBtn = this.modal.querySelector('[name="closeModal"]')
        this.body = this.modal.querySelector('[name="previewModalBody"]')
    }
    close = () => {
        if (!this.modal) return;

        this.modal.classList.add('hidden');
        this.modal.removeEventListener('click', this.handleClick);
        document.removeEventListener('keydown', this.handleKeyDown);   
    }
    handleKeyDown = (e) => {
        if (e.key === 'Escape') this.close();
    };
    open(){
        this.closeBtn.addEventListener('click', this.close)
        document.addEventListener('keydown', this.handleKeyDown);
        this.modal.classList.remove('hidden')
        this.body.innerHTML = ''
        this.body.appendChild(this.manager.collectData())
        console.log(this.state)
    }
}