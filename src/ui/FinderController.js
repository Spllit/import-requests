import validateDigits from "../utils/validateDigits.js"
export default class FinderController{
    constructor(state){
        this.state = state
        this.finder = document.querySelector('#finder')
        this.btn = this.finder.querySelector('[name="finderHide"]')
        this.arrow = this.btn.querySelector('svg')
        this.finderInput = this.finder.querySelector('[name="finderInput"]')
        this.amount = this.finder.querySelector('[name="finderAmount"]')
        this.handleClick = this.handleClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.hidden = true
        this.updateAmount()
        this.amountForms = 1
        this.toFind = 1
    }
    view(){
        this.state.subscribers = {'key':'updateFinder', 'action': this.updateAmount}
        this.btn.addEventListener('click', this.handleClick)
        this.finderInput.addEventListener('input', this.handleInput)
        document.addEventListener('keydown', this.handleKeyDown)
    }
    updateAmount = (value = 1) => {
        this.amountForms = value
        this.amount.textContent = this.amountForms
    }
    handleClick(e){
        this.hidden = !this.hidden
        if(this.hidden){
            this.finder.classList.add("translate-x-[calc(100%-1.5rem)]");
            this.arrow.classList.remove("rotate-180");
            
        }else{
            finder.classList.remove("translate-x-[calc(100%-1.5rem)]");
            this.arrow.classList.add("rotate-180");
        }
    }
    handleInput(e){
        const target = e.target
        target.value = validateDigits(target.value)
        if(target.value === ''){
            this.toFind = ''
            target.value = ''
        }
        else if(Number(target.value) < 1) {
            this.toFind = 1
            target.value = 1
        }
        else if(Number(target.value) > this.amountForms) {
            this.toFind = this.amountForms
            target.value = this.amountForms
        }
        else{
            this.toFind = target.value
        }
        
    }
    scroll(){
        document.querySelector(`form[data-form-id="${this.toFind-1}"]`)?.scrollIntoView({behavior: "auto", block: "center", inline: "start"})

    }
    handleKeyDown(e){
        if(e.key === 'Enter'){
            if(this.toFind)this.scroll()
        }
        else if(e.key === 'ArrowUp'){
            this.toFind = Number(this.toFind) - 1
            e.target.value = this.toFind
           this.finderInput.dispatchEvent(new Event('input', { bubbles: true }));
            this.scroll()
        }
        else if(e.key === 'ArrowDown'){
            this.toFind = Number(this.toFind) + 1
            e.target.value = this.toFind
           this.finderInput.dispatchEvent(new Event('input', { bubbles: true }));
            this.scroll()
        }
    }
}