export { getRandomInt, createPoint, createLine, createCircle }

import { Core, Item, 
    Point, Line, Circle,Rectangle, Triangle, Square, Shape,
    InvalidParameter,  
    CircleRenderer,  ShapeRenderer, LineRenderer, PointRenderer } from './engine.js'

let defaultPointRenderer = new PointRenderer()
let defaultLineRenderer = new LineRenderer()

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

const createRectangle = () => {

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