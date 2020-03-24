export { Cell }

import { Item } from '../engine/engine.js'

class Cell extends Item{
    constructor(i, j) {
        super()
        this.i = i;
        this.j = j;
        this.wall = false;
        this.color = 'white';
        this.border = 'black';
    }

    setWall(wall) {
        this.wall = wall;
        if (this.wall) {
            this.color = 'black';
        } else {
            this.color = 'white';
        }
    }

    setColor(color) {
        this.color = color;
    }

    setBorder(color) {
        this.border = color;
    }

    render(ctx, dw, dh) {
        ctx.beginPath();
        ctx.rect(Math.floor(this.i * dw), Math.floor(this.j * dh), dw, dh);
        //ctx.ellipse(this.i * dw + dw/2, this.j * dh + dh/2, dw / 4, dh / 4, 0, 0 , 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.strokeStyle = this.border;
        ctx.stroke();
    }
}
