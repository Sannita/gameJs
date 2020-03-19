export { getRandomInt, createPoint, createLine, createCircle, createRectangle, loadImage, Dragger }

import { Core, Item, 
    Point, Line, Circle, Rectangle, Triangle, Square, Shape,
    InvalidParameter,  
    CircleRenderer,  ShapeRenderer, LineRenderer, PointRenderer } from './engine.js'
import { SpriteRenderer } from './renderers/renderers.js'

let defaultPointRenderer = new PointRenderer()
let defaultLineRenderer = new LineRenderer()
let defaultSpriteRenderer = new SpriteRenderer()
let defaultShapeRenderer = new ShapeRenderer()

const defaultCircleRenderer = new CircleRenderer()

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createPoint = (x, y) => {
    let p = new Point(x, y)
    return new Item(p, defaultPointRenderer)
}

const createLine = (a, b) => {
    let line = new Line(a, b)
    return new Item(line, defaultLineRenderer)
}

const createTriangle = () => {

}

const createSquare = () => {

}

const createRectangle = (x,y,width,height) => {
    let rect = new Rectangle(x,y,width,height)
    return new Item(rect, defaultShapeRenderer)
}

const createCircle = (x,y,radius) => {
    let circle = new Circle(x,y,radius)
    return new Item(circle, defaultCircleRenderer)
}

const createShape = () => {

}

const zip = (arr1, arr2) => {
    return arr1.map((e,i)=> [e,arr2[i]])
}

const loadImage = (url) => {
    let promise = new Promise( (resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            let rect = new Rectangle(img.x, img.y, img.width, img.height)
            rect.img = img
            let sprite = new Item(rect, defaultSpriteRenderer)
            resolve(sprite)
        }
        img.onerror = (err) =>{
            reject(err)
        }
        img.src = url
    })

    return promise
}


class Dragger extends Item{
    constructor(core, startDrag, drag, endDrag){
        super(new Rectangle(0, 0, core.config.width, core.config.height), defaultShapeRenderer)
        this.startDrag = startDrag
        this.drag = drag
        this.endDrag = endDrag
        this.dragging = false
    }

    handleInput (input) {
        if(input['mousedown'] && !this.dragging){
            this.dragging = true  
            let x = input['mouseX']
            let y = input['mouseY']
            this.startDrag(x,y)
        }else if(input['mousedown'] && this.dragging){
            let x = input['mouseX']
            let y = input['mouseY']
            this.drag(x,y)
        }else if(input['mouseup'] && this.dragging){
            this.dragging = false
            let x = input['mouseX']
            let y = input['mouseY']
            this.endDrag(x,y)
        }
    }

}
