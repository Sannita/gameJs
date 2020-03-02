export { Point }

import {InvalidParameter} from '../errors.js';

class Point{
    constructor(x = 0, y = 0) {
        if( ! x instanceof Number || x < 0){
            throw new InvalidParameter('x is not a positive number: ${x}')
        }
        if( ! y instanceof Number || y < 0){
            throw new InvalidParameter('y is not a positive number: ${y}')   
        }
        this.x = x
        this.y = y
    }

    distance(p){
        let dx = p.x - this.x
        let dy = p.y - this.y
        let d = Math.sqrt( dx*dx + dy * dy )
        return d
    }
}
