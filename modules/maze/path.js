export { Path }

import { Item } from '../engine/engine.js'

class Path extends Item {
    constructor(path) {
        super()

        this.path = path;
        this.pos = 0;
    }

    update(dt) {
        if (this.pos < this.path.length) {
            this.pos++;
        }
    }

    render(ctx, dw, dh) {
        if (this.path.length == 0) {
            return;
        }
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        let start = this.path[0];
        ctx.moveTo(Math.floor(start.i * dw + dw / 2), Math.floor(start.j * dh + dh / 2));
        for (let i = 1; i < this.pos; i++) {
            let item = this.path[i];
            ctx.lineTo(Math.floor(item.i * dw + dw / 2), Math.floor(item.j * dh + dh / 2));
        }
        ctx.stroke();
        ctx.restore();
    }

}