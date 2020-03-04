
export { launch as default }

import { Core, Item, 
    Point, Line, Circle,Rectangle, Triangle, Square, Shape,
    InvalidParameter,  
    CircleRenderer,  ShapeRenderer,  PointRenderer } from './engine/engine.js'

import { Vector2D } from './engine/math/math.js'

let launch = () => {
    console.log('plague')
    let core = new Core()
    core.setup('#container', 640, 360)
    core.start()

    let shape = new Item(new Shape([
            new Point(100,200), 
            new Point(300,50), 
            new Point(200,100), 
            new Point(500,100), 
            new Point(500, 60), 
            new Point(400, 50)
        ]), new ShapeRenderer({ lineCap : 'square', lineJoin : 'circle', lineWidth : '3', strokeStyle : 'green', fill : false, closePath : false}))
    core.addItem(shape)

    let v = new Vector2D(3,4)

    console.log(v)

}