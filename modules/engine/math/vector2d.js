export { Vector}

class Vector{
    constructor(data){
        this.data = data
    }

    get(i){
        return this.data[i]
    }

    set(i, value){
        this.data[i] = value
    }

    size(){
        return this.data.length
    }

    dot(v){
        let acc = this.data.map((e,i)=> [e, v.data[i]]).reduce( (a,b) => { return a[0] * a[1] + b[0] * b[1] } )
        return Math.sqrt(acc)
    }

    sum(v){
        let result = this.data.map((e,i)=> { return e + v.data[i] } )
        return new Vector(result)
    }

    mul(x){
        let result = this.data.map((e)=> { x * e } )
        return result
    }

    magnitude(){
        return Math.sqrt(this.data.reduce((a,b) => { return a * a + b * b }))
    }

    normalize(){
        let magnitude = this.magnitude()
        return this.mul(1 / magnitude)
    }

    distance(v){
        let result = this.data.map((e,i)=> [e, v.data[i]]).reduce( (a,b) => {
            return ( a[1] - a[0] ) * ( a[1] - a[0] ) + ( b[1] - b[0] ) * ( b[1] - b[0] ) 
        } )
        return Math.sqrt(result)
    }

    angle(){
        if(this.data.length > 2){
            throw new Error('angle non defined for more than 2 dimensions')
        }
        return Math.atan2(this.data[1], this.data[0])
    }

}