export {Circle}

import { Point } from './point.js'
import {InvalidParameter} from '../errors.js' 

class Circle{
    constructor(center, radius){
        if( !center instanceof Point){
            throw new InvalidParameter('center is not a point: ${center}')
        }
        
        this.center = center
        this.radius = radius
    }

}