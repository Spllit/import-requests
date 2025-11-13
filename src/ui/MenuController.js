import validateDigits from "../utils/validateDigits.js"
import ImportController from "./importController.js"
import ImportManager from "../core/ImportManager.js"
import excelTemplate from "../utils/excelTemplate.js"
import Preview from "./PreviewController.js"
import showNotification from "./showNotification.js"
export default class MenuController {
    constructor(state, manager) {
        this.state = state
        this.manager = manager
        this.handleClick = this.handleClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.menu = document.querySelector('nav')
        
        // Проверка существования меню
        if (!this.menu) {
            console.warn('Navigation element not found');
        }
        
        this.ImportManager = new ImportManager(this.state, this.manager) 
        this.ImportController = new ImportController(this.ImportManager)
        this.Preview = new Preview(state)
    }
    
    view() {
        if (!this.menu) return;
        
        this.menu.addEventListener('click', this.handleClick)
        this.menu.addEventListener('input', this.handleInput)
        document.addEventListener('keydown', this.handleKeyDown)
    }
    
    handleClick(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        const name = button.getAttribute('name');
        
        if (name === 'addForms') {
            this.manager.mountManager?.();
        // this.state.forms.forEach(form => {console.log(form.getFormData())})
        } else if (name === 'reqNumsGenerator') {
            this.manager.generateFormNumbers?.();
            showNotification('Номера заявок сгенерированы', 'success')
        } else if (name === 'importDataForm') {
            this.ImportController.open();
        }else if(name ==='downloadTemplate'){
            excelTemplate()
        }
        else if(name ==='preview'){
            this.Preview.open()
        }
        if(name == 'send'){
            this.manager.submit()
        }
    }
    
    handleInput(e) {
        const target = e.target;
        const name = target.getAttribute('name');
        const value = target.value.trim();
        
        if (target.dataset.type === 'number') {
            const res = validateDigits(value);
            
            if (name === 'siteId') {
                this.manager.set?.(+value, 'siteId');
                target.value = res;
                target.classList.remove('input-error')
            } else if (name === 'formAmount') {
                this.manager.set?.(+res, 'newSize');
                target.value = res;
            }
        } else if (name === 'access-token') {
            this.manager.set?.(value, 'accessToken');
            target.classList.remove('input-error')
        }
    }
    handleKeyDown(e){
        if(e.key === 'Enter' && e.target.name==="formAmount"){
            this.manager.mountManager?.();
        }
    }
}