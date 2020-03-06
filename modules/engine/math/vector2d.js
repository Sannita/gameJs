export { Vector, Vector2D }

class Vector{
    constructor(data){
        this.data = data
    }

    dot(v){
        let acc = 0
        for(let i=0;i<this.data.length;i++){
            acc += this.data [i] * v.data[j]
        }
        return Math.sqrt(acc)
    }

    magnitude(){
        return Math.sqrt(this.data.reduce((a,b) => { a * a + b * b }))
    }
    
    /*cross(v){
        let m1 = this.magnitude()
        let m2 = v.magnitude()
        let t1 = this.angle()
        let t2 = v.angle()
        return m1 * m2 * Math.sin(t2 - t1)
    }*/
}

class Vector2D extends Vector{
    constructor(x,y){
        super([x,y])
        
    }

    angle(){
        return Math.atan2(this.data[0] / this.data[1])
    }
    
}