export { Point }

import {InvalidParameter} from '../errors.js';

class Point{
    constructor(x = 0, y = 0) {
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
