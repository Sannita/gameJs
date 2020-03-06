
export { launch as default }

import { Core, Item, 
    Point, Line, Circle,Rectangle, Triangle, Square, Shape,
    InvalidParameter,  
    CircleRenderer,  ShapeRenderer, LineRenderer, PointRenderer } from './engine/engine.js'

import { Vector2D, Vector, Matrix } from './engine/math/math.js'

let launch = () => {
    console.log('plague')
    let core = new Core()
    core.setup('#container', 640, 360)
    core.start()

    let lr = new LineRenderer()
    let axisX = new Item(new Line(new Point(-320,0), new Point(320,0)), lr )
    let axisY = new Item(new Line(new Point(0,-180), new Point(0,180)), lr )
    
    core.addItem(axisX)
    core.addItem(axisY)

    let v = new Vector2D(30,40)
    let m = new Item(new Line(new Point(0,0), new Point(30,40)), lr)
    core.addItem(m)

}