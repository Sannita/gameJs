export { Vector2D }

let magnitude = ()=>{
    return Math.sqrt(this.x * this.x + this.y * this.y)
}

let angle = ()=>{
    return Math.atan2(this.y / this.x)
}

let dot = (v)=>{
    return Math.sqrt(this.x * v.x + this.y * v.y)
}

let cross = (v) => {
    let m1 = this.magnitude()
    let m2 = v.magnitude()
    let t1 = this.angle()
    let t2 = v.angle()
    return m1 * m2 * Math.cos(t1 - t2)
}

class Vector2D{
    constructor(x,y){
        this.x = x
        this.y = y

        this.magnitude = magnitude()
    }
}