import {Point} from './point.js'

export {Square}

class Square{
    constructor(x, y, side){
        this.shape = new Array(4)
        this.shape[0] = new Point(x,y)
        this.shape[1] = new Point(upperLeft.x + side, this.shape.y)
        this.shape[2] = new Point(upperLeft.x + side, this.shape.y + side)
        this.shape[3] = new Point(upperLeft.x, this.shape.y + side)
    }
}