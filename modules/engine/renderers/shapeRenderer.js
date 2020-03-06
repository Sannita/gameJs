export { ShapeRenderer, LineRenderer }

import { Renderer } from './renderer.js'

class ShapeRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)

        if(renderOptions.fill === undefined){
            this.renderOptions.fill = true
        }

        if(renderOptions.closePath === undefined){
            this.renderOptions.closePath = true
        }
    }

    render(ctx, alpha, geometry){
        let shape = geometry.shape
        ctx.save()
        ctx.lineWidth = this.renderOptions.lineWidth || 1
        ctx.strokeStyle = this.renderOptions.strokeStyle || 'red'
        ctx.fillStyle = this.renderOptions.fillStyle || "rgba(255, 0, 0, 0.1)"
        ctx.lineCap = this.renderOptions.lineCap || 'circle'
        ctx.lineJoin = this.renderOptions.lineJoin || 'circle'
        ctx.beginPath()
        let startPoint = shape[0]
        ctx.moveTo(startPoint.x, startPoint.y)
        shape.slice(1).forEach(point => {
            ctx.lineTo(point.x, point.y)
        })
        if(this.renderOptions.closePath){
            ctx.closePath()
        }
        if(this.renderOptions.fill){
            ctx.fill()
        }
        ctx.stroke()
        ctx.restore()
    }
}

class LineRenderer extends ShapeRenderer{
    constructor(renderOptions = {}){
        super(renderOptions)

        this.renderOptions.fill = false
        this.renderOptions.closePath = false

    }
}