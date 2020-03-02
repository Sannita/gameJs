export { PointRenderer }

import { Renderer } from './renderer.js'

class PointRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)
    }

    render(ctx, alpha, point){
        ctx.save();
        ctx.fillStyle = renderOptions.fillStyle || 'red';
        ctx.beginPath();
        ctx.fillRect(point.x,point.y,1,1)
        ctx.restore();
    }
}