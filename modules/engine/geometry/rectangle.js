import {Point} from './point.js'

export { Rectangle }

class Rectangle{
    constructor(x, y, width, height){
        this.shape = new Array(4)
        this.shape[0] = new Point(x,y)
        this.shape[1] = new Point(x + width, y)
        this.shape[2] = new Point(x + width, y + height)
        this.shape[3] = new Point(x, y + height)
    }

    getX(){
        return this.shape[0].x
    }

    getY(){
        return this.shape[0].y
    }

    getWidth(){
        return this.shape[2].x - this.getX()
    }

    getHeight(){
        return this.shape[2].y - this.getY()
    }

    setPos(x,y){
        this.shape[0] = new Point(x, y)
        this.shape[1] = new Point(x + this.getWidth(), y)
        this.shape[2] = new Point(x + this.getWidth(), y + this.getHeight())
        this.shape[3] = new Point(x, y + this.getHeight())
    }

    setSize(width,height){
        this.shape[0] = new Point(this.getX(),this.getY())
        this.shape[1] = new Point(this.getX() + width, this.getY())
        this.shape[2] = new Point(this.getX() + width, this.getY() + height)
        this.shape[3] = new Point(this.getX(), this.getY() + height)
    }
}