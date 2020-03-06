import { Point } from "./geometry/point"
import { Vector } from "./math/math"

export { World }

class World{
    constructor(width, height){
        this.width = width
        this.height = height

        this.origin = new Point(width/2, height/2)
        this.orientation = new Vector2D(1,-1)
    }
}