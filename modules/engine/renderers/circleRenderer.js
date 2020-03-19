export { CircleRenderer }

import { Renderer } from './renderer.js'

class CircleRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)
    }

    render(ctx, alpha, circle){
        ctx.save()
        ctx.lineWidth = this.renderOptions.lineWidth || 1
        ctx.strokeStyle = this.renderOptions.strokeStyle || 'red'
        ctx.fillStyle = this.renderOptions.fillStyle || "rgba(255, 0, 0, 0.1)"
        ctx.beginPath()
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI, false)
        ctx.fill()
        ctx.stroke()
        ctx.restore()   
    }
}