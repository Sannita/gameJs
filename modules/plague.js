
export { launch as default }

import { Core, Item, Point, Line, LineRenderer, InvalidParameter } from './engine/engine.js'

let launch = () => {
    console.log('plague')
    let core = new Core()
    core.setup('#container', 640, 360)
    core.start()

    let p1 = new Point(20, 10)
    let p2 = new Point(50, 30)
    let line = new Line(p1, p2)
    let renderer = new LineRenderer()
    let item = new Item(line, renderer)

    core.addItem(item)

}