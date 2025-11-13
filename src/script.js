import AppState from './core/AppState.js'
import Manager from './core/Manager.js'
import FormsController from './ui/FormsController.js'
import MenuController from './ui/MenuController.js'
import FinderController from './ui/FinderController.js'
import Send from "./core/ApiService.js"
import LifterController from './ui/LifterController.js'

function init(){
const appState = new AppState()
const manager = new Manager(appState)
const sendApi = new Send(appState,manager)
manager.sendApi = sendApi
const formsController = new FormsController(appState, manager)
manager.formsController = formsController
const menuController = new MenuController(appState, manager)
const finder = new FinderController(appState)
manager.createForm(1)
formsController.view()
menuController.view()
finder.view()
LifterController()
}

document.addEventListener('DOMContentLoaded', init); 
