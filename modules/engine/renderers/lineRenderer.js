export { LineRenderer }

import { Renderer } from './renderer.js'

class LineRenderer extends Renderer{
    constructor(){
        
    }

    static render(ctx, alpha, line, params){
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(line.a.x, line.a.y);
        ctx.lineTo(line.b.x, line.b.y);
        ctx.stroke();
        ctx.restore();
   
    }
}