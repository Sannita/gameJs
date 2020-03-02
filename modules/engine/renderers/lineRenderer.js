export { LineRenderer }

import { Renderer } from './renderer.js'

class LineRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)
    }

    render(ctx, alpha, line){
        ctx.save();
        ctx.lineCap = this.renderOptions.lineCap || 'round';
        ctx.lineJoin = this.renderOptions.lineJoin || 'round';
        ctx.lineWidth = this.renderOptions.lineWidth || 5;
        ctx.strokeStyle = this.renderOptions.strokeStyle || 'red';
        ctx.beginPath();
        ctx.moveTo(line.a.x, line.a.y);
        ctx.lineTo(line.b.x, line.b.y);
        ctx.stroke();
        ctx.restore();   
    }
}