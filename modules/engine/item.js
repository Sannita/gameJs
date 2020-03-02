export { Item }

let itemId = 0

let nextItemId = () => {
    return itemId++
}

class Item {
    constructor(geometry, renderer) {
        this.id = nextItemId()
        this.geometry = geometry
        this.renderer = renderer
        this.visible = true
        this.active = false
        this.toDelete = false
    }

    handleInput (input) {

    }

    update (t){

    }

    render (ctx, alpha) {
        this.renderer.render(ctx, alpha, this.geometry)
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

/*    collide (x, y, w, h) {
        if ((x >= this.data.x && x <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && (x + w) <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h)) ||
            ((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y + h) >= this.data.y && (y + h) <= (this.data.y + this.data.h))
        ) {
            return this
        } else {
            return false
        }
    }*/

}
