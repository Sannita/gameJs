export { Matrix }

import { Vector } from './vector2d.js'

class Matrix{
    constructor(rows, cols){
        this.rows = rows
        this.cols = cols
        this.data = new Array(rows * cols)
    }

    getValue(row, col){
        return this.data[row * this.cols + col]
    }

    setValue(row, col, value){
        return this.data[row * this.cols + col] = value
    }

    getRow(row){
        let v = new Array(this.cols)
        for(let i=0;i<this.cols;i++){
            v[i] = this.getValue(row, i)
        }
        return new Vector(v)
    }

    getCol(col){
        let v = new Array(this.rows)
        for(let i=0;i<this.rows;i++){
            v[i] = this.getValue(i, col)
        }
        return new Vector(v)
    }

    multiply(scalar){
        for(let r = 0; r<this.rows; r++){
            for(let c = 0; r < this.cols; c++){
                let v = this.getValue(r,c)
                this.setValue(r,c, v * scalar)
            }    
        }
    }

    product(matrix){
        let result = new Matrix(this.rows, matrix.cols)
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; r < matrix.cols; c++){
                let row = this.getRow(r)
                let col = matrix.getCol(c)
                let value = row.dot(col)    
                result.setValue(r,c,value)
            }    
        }
        return result
    }
}