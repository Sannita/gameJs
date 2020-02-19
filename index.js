import { Core } from './modules/core.js'
import { Item } from './modules/item.js'

let core = new Core()
core.setup('#container', 640, 360)
core.start()


for(let i=5;i<200;i+=20){
    let item = new Item(i,20,10,10)
    core.addItem(item)
}