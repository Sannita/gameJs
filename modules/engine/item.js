export { Item }

let itemId = 0

let nextItemId = () => {
    return itemId++
}

class ItemNew {
    constructor(geometry, renderer, renderOptions) {
        this.id = nextItemId()
        this.geometry = geometry
        this.renderer = renderer
        this.renderOptions = renderOptions || { color: 'black', border : 'white'}
        this.visible = true
        this.active = false
        this.toDelete = false
    }

    handleInput (input) {

    }

    update (t){

    }

    render (ctx, alpha) {
        this.renderer.render(ctx, alpha, this.geometry, this.renderOptions)
    }

    hide () {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    setToDelete (){
        this.toDelete = true;
    }

    activate () {
        this.active = true;
    }

    deactivate  () {
        this.active = false;
    }

    isToDelete (){
        return this.toDelete;
    }

    isActive (){
        return this.active;
    }

    isVisible  () {
        return this.visible;
    }

    collide (x, y, w, h) {
        if ((x >= this.data.x && x <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && (x + w) <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h))
        ) {
            return this
        } else {
            return false
        }
    }

}

class Item {
    constructor(x, y, w, h) {
        let data = {}
        data.id = nextItemId()
        data.x = x || 0
        data.y = y || 0
        data.w = w || 1
        data.h = h || 1
        data.color = 'white'
        data.border = 'black'
        data.visible = true
        data.active = false
        data.toDelete = false

        this.data = data

    }

    handleInput (input) {

    }

    update (t){

    }

    render (ctx, alpha) {
        ctx.beginPath();
        ctx.rect(this.data.x, this.data.y, this.data.w, this.data.h)
        ctx.fillStyle = this.data.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.data.border;
        ctx.stroke();
    }

    get id () {
        return this.data.id
    }

    hide () {
        this.data.visible = false;
    }

    show() {
        this.data.visible = true;
    }

    setToDelete (){
        this.data.toDelete = true;
    }

    activate () {
        this.data.active = true;
    }

    deactivate  () {
        this.data.active = false;
    }

    isToDelete (){
        return this.data.toDelete;
    }

    isActive (){
        return this.data.active;
    }

    isVisible  () {
        return this.data.visible;
    }

    collide (x, y, w, h) {
        if ((x >= this.data.x && x <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && (x + w) <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h))
        ) {
            return this
        } else {
            return false
        }
    }

}
