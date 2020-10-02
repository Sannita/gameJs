export { initialize, Core }

let initialize = () => {
    if(initialized){
        return;
    }

    let vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    let lastTime = 0
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            let currTime = performance.now()
            let timeToCall = Math.max(0, 16 - (currTime - lastTime))
            let id = setTimeout(() => {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }

    var initialized = true
}

class Core {

    constructor() {
        this.config = {
            width: 0,
            height: 0,
            running: false,
            debug: true,
            tps: 25,
            maxFrameSkip: 5
        }

        this.ctx = null
        this.canvas = null
        this.container = null
        this.input = {}
        this.items = {}
    }

    handleInput() {
        for (let i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                let item = this.items[i]
                if (item.toDelete) {
                    this.deleteItem(i)
                    continue
                }
                if (item.active && item.handleInput) {
                    item.handleInput(this.input)
                }
            }
        }
    }

    update (t) {
        for (let i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                let item = this.items[i]
                if (item.toDelete) {
                    this.deleteItem(i)
                    continue
                }
                if (item.active && item.update) {
                    item.update(t)
                }
            }
        }
    }

    render (alpha)  {
        this.ctx.clearRect(0, 0, this.config.width, this.config.height)
        this.ctx.save()
        //this.ctx.translate(this.config.width/2, this.config.height /2)
        //this.ctx.scale(1,-1)
        //this.ctx.translate(-this.config.width/2, -this.config.height /2)
        
        for (let i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                let item = this.items[i]
                if (item.toDelete) {
                    this.deleteItem(i)
                    continue;
                }
                if (item.visible && item.render) {
                    item.render(this.ctx, alpha)
                }
            }
        }

        this.ctx.restore()
    }

    log (item) {
        if (this.config.debug) {
            console.log(item)
        }
    }

    setup(container, width, height) {
        initialize()
      
        this.canvas = document.createElement('canvas')
        if (typeof (this.canvas.getContext) === undefined) {
            throw new Error('not canvas')
        }

        this.container = document.querySelector(container)
        this.ctx = this.canvas.getContext('2d')
        this.items = {}

        this.resize(width, height)
    }

    resize(width, height){
        this.config.width = width
        this.config.height = height
        this.canvas.width = width
        this.canvas.height = height

        let container = this.container
        while(container && container.firstChild){
            container.removeChild(container.lastChild)
        }
        this.container.appendChild(this.canvas)
        this.container.style.width = this.canvas.width + 'px'
        this.container.style.height = this.canvas.height + 'px'
    }

    start () {
        this.config.running = true

        let dt = 1000 / this.config.tps;
        let currentTime = performance.now();
        let accumulator = 0
        let t = 0

        let loop = (timestamp) => {

            this.handleInput()

            let newTime = performance.now()
            let frameTime = newTime - currentTime
            if (frameTime > 1000 / this.config.maxFrameSkip) {
                frameTime = 1000 / this.config.maxFrameSkip
            }
            currentTime = newTime
            accumulator += frameTime
            while (accumulator >= dt) {
                this.update(dt)
                accumulator -= dt
                t += dt
            }

            let alpha = accumulator / dt
            this.render(alpha)

            if (this.config.running) {
                window.requestAnimationFrame(loop)
            }
        }

        loop(performance.now())

    }

    stop (){
        this.config.running = false
    }

    addListener (name, callback) {
        this.container.addEventListener(name, callback, false)
    }

    resetMouse () {
        this.input['click'] = false
        this.input['mousedown'] = false
        this.input['mouseup'] = false
    }

    initListeners(){
        this.input = {}
            
        this.addListener('keydown', (key) => {
            this.input[key.code] = true
            this.log(key)
        }, false)

        this.addListener('keyup', (key) => {
            this.input[key.code] = false
            this.log(key)
        }, false)

        this.addListener('click', (evt) => {
            this.input['click'] = true
            this.input['mousedown'] = false
            this.input['mouseup'] = true
            this.input['mouseX'] = evt.clientX
            this.input['mouseY'] = evt.clientY
            this.log(evt)
        }, false)

        this.addListener('mousedown', (evt) => {
            this.input['click'] = false
            this.input['mousedown'] = true
            this.input['mouseup'] = false
            this.input['mouseX'] = evt.clientX
            this.input['mouseY'] = evt.clientY
            this.log(evt)
        }, false)

        this.addListener('mouseup', (evt) => {
            this.input['click'] = true
            this.input['mousedown'] = false
            this.input['mouseup'] = true
            this.input['mouseX'] = evt.clientX
            this.input['mouseY'] = evt.clientY
            if( this.input['dragging']){
                this.input['dragging'] = false
            }
            this.log(evt)
        }, false)

        this.addListener('mousemove', (evt) => {
            this.input['mouseX'] = evt.clientX
            this.input['mouseY'] = evt.clientY
            if( this.input['mousedown']){
                this.input['dragging'] = true
            }
            this.log(evt)
        }, false)

        this.container.focus()
    }

    setDebug (debug) {
        this.config.debug = debug
    }

    addItem (item){
        this.items[item.id] = item
    }

    deleteItem (item){
        delete this.items[item.id]
    }

    getContext () {
        return this.ctx
    }

}