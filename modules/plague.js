
export { launch as default }

import { Core, Item, 
    Point, Line, Circle,Rectangle, Triangle, Square, Shape,
    InvalidParameter,  
    CircleRenderer,  ShapeRenderer, LineRenderer, PointRenderer } from './engine/engine.js'

import { Vector, Matrix } from './engine/math/math.js'

import * as Utils from './engine/utils.js'

let launch = () => {
    console.log('plague')
    let core = new Core()
    core.setup('#container', 640, 360)
    core.start()

    let axisX = Utils.createLine(new Point(-320,0), new Point(320,0))
    let axisY = Utils.createLine(new Point(0,-180), new Point(0,180))
    
    core.addItem(axisX)
    core.addItem(axisY)

    let v1 = new Vector([3,4])
    let v2 = new Vector([-3, 4])
    
    let v3 = v1.sum(v2)
    console.log(v3)
    console.log(v3.magnitude())
}