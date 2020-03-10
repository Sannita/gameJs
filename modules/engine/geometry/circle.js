export {Circle}

import { Point } from './point.js'
import {InvalidParameter} from '../errors.js' 

class Circle{
    constructor(x, y, radius){
        
        this.center = new Point(x,y)
        this.radius = radius
    }

}