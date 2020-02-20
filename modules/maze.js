export { launch as default }

import { Core } from './core.js'
import { Item } from './item.js'


let launch = (containerId, width, height) => {
    console.log('maze')

    let core = new Core()
    core.setup(containerId, width, height)
    core.start()
    
    for(let i=5;i<200;i+=20){
        let item = new Item(i,20,10,10)
        core.addItem(item)
    }
}