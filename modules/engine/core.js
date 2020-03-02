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
        this.input = null
        this.items = null

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
    }

    log (item) {
        if (this.config.debug) {
            console.log(item)
        }
    }

    setup  (container, width, height) {
        initialize()

        this.config.width = width
        this.config.height = height

        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height

        if (typeof (this.canvas.getContext) === undefined) {
            throw new Error('not canvas')
        }

        this.container = document.querySelector(container)
        while(this.container.firstChild){
            this.container.removeChild(this.container.lastChild)
        }
        this.container.appendChild(this.canvas)
        this.container.style.width = this.canvas.width + 'px'
        this.container.style.height = this.canvas.height + 'px'

        this.ctx = this.canvas.getContext('2d')
        this.items = {}

    }

    start () {
        let self = this;
        this.config.running = true

        let dt = 1000 / this.config.tps;
        let currentTime = performance.now();
        let accumulator = 0
        let t = 0

        let loop = (timestamp) => {

            self.handleInput()

            let newTime = performance.now()
            let frameTime = newTime - currentTime
            if (frameTime > 1000 / self.config.maxFrameSkip) {
                frameTime = 1000 / self.config.maxFrameSkip
            }
            currentTime = newTime
            accumulator += frameTime
            while (accumulator >= dt) {
                self.update(dt)
                accumulator -= dt
                t += dt
            }

            let alpha = accumulator / dt
            self.render(alpha)

            if (self.config.running) {
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
        let self = this
        self.input['click'] = false
        self.input['mousedown'] = false
        self.input['mouseup'] = false
    }

    initListeners(){
        let self = this
        self.input = {}

        this.addListener('keydown', (key) => {
            self.input[key.code] = true
            self.log(key)
        }, false)

        this.addListener('keyup', (key) => {
            self.input[key.code] = false
            self.log(key)
        }, false)

        this.addListener('click', (evt) => {
            self.input['click'] = true
            self.input['mouseX'] = evt.clientX
            self.input['mouseY'] = evt.clientY
            self.log(evt)
        }, false)

        this.addListener('mousedown', (evt) => {
            self.input['mousedown'] = true
            self.input['mouseX'] = evt.clientX
            self.input['mouseY'] = evt.clientY
            self.log(evt)
        }, false)

        this.addListener('mouseup', (evt) => {
            self.input['mouseup'] = true
            self.input['mouseX'] = evt.clientX
            self.input['mouseY'] = evt.clientY
            self.log(evt)
        }, false)

        this.addListener('mousemove', (evt) => {
            self.input['mouseX'] = evt.clientX
            self.input['mouseY'] = evt.clientY
            self.log(evt)
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