export { SpriteRenderer }

import { Renderer } from './renderer.js'

class SpriteRenderer extends Renderer{
    constructor(renderOptions = {}){
        super(renderOptions)

        if(renderOptions.fill === undefined){
            this.renderOptions.fill = true
        }

        if(renderOptions.closePath === undefined){
            this.renderOptions.closePath = true
        }
    }

    render(ctx, alpha, item){

        let sx = 0
        let sy = 0
        let swidth = item.getWidth()
        let sheight = item.getHeight()
        let x = item.getX()
        let y = item.getY()
        let width = swidth
        let height = sheight

        ctx.save()
        
        ctx.drawImage(item.img, sx, sy, swidth, sheight, x, y, width, height)
     
        ctx.restore()
    }
}