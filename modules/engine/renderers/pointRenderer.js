export { PointRenderer }

import { Renderer } from './renderer.js'

class PointRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)
    }

    render(ctx, alpha, point){
        ctx.save()
        let rgba = this.renderOptions.rgba || [ 255, 0, 0, 255]
        let imageData = ctx.getImageData(point.x,point.y,1,1)
        
        for(let i=0; i< 4; i++){
            imageData.data[ i ] = rgba[i % 4]
        }

        ctx.putImageData(imageData,point.x,point.y)
        ctx.restore()
    }
}