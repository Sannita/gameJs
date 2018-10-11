window.gameJs = window.gameJs || {};

(function(g, undefined){
	
	var init = function(){
		var vendors = ['webkit', 'moz'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		var lastTime = 0;
		if (!window.requestAnimationFrame){
			window.requestAnimationFrame = function(callback, element) {
				var currTime = performance.now();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame){
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	
	}

	
	var Core = function(){
		
		this.config = {
			width : 0,
			height : 0,
			running : false,
			debug : true,
			tps : 25,
			maxFrameSkip : 5
		};
		
		this.ctx = null;
		this.canvas = null;
		this.container = null;
		this.input = null;
		this.items = null;
		
		init();
	}
	
	Core.prototype.handleInput = function(){
		for (var i in this.items) {
			if (this.items.hasOwnProperty(i)) {
				var item = this.items[i];
				if(item.isToDelete()){
					this.deleteItem(i);
					continue;
				}
				if(item.isActive() && item.handleInput){
					item.handleInput(this.input);
				}
			}
		}
	}
	
	Core.prototype.update = function(t){
		for (var i in this.items) {
			if (this.items.hasOwnProperty(i)) {
				var item = this.items[i];
				if(item.isToDelete()){
					this.deleteItem(i);
					continue;
				}
				if(item.isActive() && item.update){
					item.update(t);
				}
			}
		}
	}
	
	Core.prototype.render = function(alpha){
		this.ctx.clearRect(0,0,this.config.width,this.config.height);
		for (var i in this.items) {
			if (this.items.hasOwnProperty(i)) {
				var item = this.items[i];
				if(item.isToDelete()){
					this.deleteItem(i);
					continue;
				}
				if(item.isVisible() && item.render){
					item.render(this.ctx, alpha);
				}
			}
		}
	}
	
	Core.prototype.log = function(item){
		if(this.config.debug){
			console.log(item);
		}
	}
	
	Core.prototype.setup = function(containerId, width, height){
		
		this.container = document.getElementById(containerId);
		this.config.width = width;
		this.config.height = height;
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;

		if (typeof (this.canvas.getContext) === undefined) {
			throw new Error('not canvas');
		}
		
		this.container.appendChild(this.canvas);
		this.container.style.width = this.canvas.width + 'px';
		this.container.style.height = this.canvas.height + 'px';

		this.ctx = this.canvas.getContext('2d');
		this.items = {};
	}
	
	Core.prototype.start = function(){
		var self = this;
		this.config.running = true;
		
		var dt = 1000 / this.config.tps;
		var currentTime = performance.now();
		var accumulator = 0;
		var t = 0;
		
		var loop = function(timestamp) {
		
			self.handleInput();

			var newTime =  performance.now();
			var frameTime = newTime - currentTime;
			if ( frameTime > 1000 / self.config.maxFrameSkip ){
				frameTime = 1000 / self.config.maxFrameSkip;
			}
			currentTime = newTime;
			accumulator += frameTime;
			while ( accumulator >= dt )
			{
				self.update(dt);
				accumulator -= dt;
				t += dt;
			}

			var alpha = accumulator / dt;
			self.render(alpha);

			if(self.config.running){
				window.requestAnimationFrame(loop);
			}
		}
		
		loop(performance.now());

	}
	
	Core.prototype.stop = function(){
		this.config.running = false;
	}
	
	Core.prototype.addListener = function(name, callback){
		this.container.addEventListener(name, callback, false);
	}
	
	Core.prototype.initListeners = function() {
		var self = this;
		self.input = {};
		
		this.addListener('keydown', function(key){
		    self.input[key.code] = true;
			self.log(key);
		}, false);

		this.addListener('keyup', function(key){
			self.input[key.code] = false;
			self.log(key);
		}, false);
		
		/*container_.addEventListener('click', function(evt){
			input_['click'] = true;
			input_['mouseX'] = evt.clientX;
			input_['mouseY'] = evt.clientY;
			log_(evt);
		}, false);*/
		/*
		this.addListener('mousedown', function(evt){
			this.input['click'] = true;
			this.input['mouseup'] = false;
			this.input['mousedown'] = true;
			this.input['mouseX'] = evt.clientX;
			this.input['mouseY'] = evt.clientY;
			this.log(evt);
		}, false);
		
		this.addListener('mouseup', function(evt){
			this.input['click'] = false;
			this.input['mouseup'] = true;
			this.input['mousedown'] = false;
			this.input['mouseX'] = evt.clientX;
			this.input['mouseY'] = evt.clientY;
			this.log(evt);
		}, false);
		
		this.addListener('mousemove', function(evt){
			this.input['mouseX'] = evt.clientX;
			this.input['mouseY'] = evt.clientY;
			this.log(evt);
		}, false);
*/

	}
	
	Core.prototype.setDebug = function(debug){
		this.config.debug = debug;
	}
	
	Core.prototype.addItem = function(item){
		this.items[item.id] = item;
	}
	
	Core.prototype.deleteItem = function(item){
		delete this.items[item.id];
	}
	
	g.Core = new Core();
	
})(window.gameJs);
