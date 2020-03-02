
export { launch as default }

import { Core, Item, Point, Line, LineRenderer, InvalidParameter } from './engine/engine.js'

let launch = () => {
    console.log('plague')
    let core = new Core()
    core.setup('#container', 640, 360)
    core.start()

    let p1 = new Point(20, 10)
    let p2 = new Point(620, 10)
    let p3 = new Point(20, 350)
    let p4 = new Point(620, 350)
    let line1 = new Line(p1, p2)
    let line2 = new Line(p2, p3)
    let line3 = new Line(p3, p4)
    let line4 = new Line(p4, p1)
    let renderer1 = new LineRenderer()
    let renderer2 = new LineRenderer({ lineWidth : '10'})
    let renderer3 = new LineRenderer({ lineCap : 'butt', lineJoin : 'square', lineWidth : '1', strokeStyle : 'blue'})
    let renderer4 = new LineRenderer({ lineCap : 'square', lineJoin : 'circle', lineWidth : '3', strokeStyle : 'green'})
    let item1 = new Item(line1, renderer1)
    let item2 = new Item(line2, renderer2)
    let item3 = new Item(line3, renderer3)
    let item4 = new Item(line4, renderer4)
    
    core.addItem(item1)
    core.addItem(item2)
    core.addItem(item3)
    core.addItem(item4)

}