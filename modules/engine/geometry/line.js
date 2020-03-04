export {Line}

import { Point } from './point.js'
import {InvalidParameter} from '../errors.js' 

class Line{
    constructor(a, b){
        if( !a instanceof Point){
            throw new InvalidParameter('a is not a point: ${a}')
        } 
        if( ! b instanceof Point){
            throw new InvalidParameter('b is not a point: ${b}')
        }
        this.shape = new Array([a,b])
    }

    length(){
        return this.shape[0].distance(this.shape[1])
    }
}