import {Point} from './point.js'

export {Rectangle}

class Rectangle{
    constructor(x, y, width, height){
        this.shape = new Array(4)
        this.shape[0] = new Point(x,y)
        this.shape[1] = new Point(x + width, y)
        this.shape[2] = new Point(x + width, y + height)
        this.shape[3] = new Point(x, y + height)
    }
}