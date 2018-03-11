(function(g, undefined){
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
	
	var EngineData = function(){
		this.canvas = null;
		this.ctx = null;
		this.debug = true;
		this.running = false;
		this.stats = null;
		this.world = null;
	};
	
	var Engine = function(world){
		var data = data || new EngineData;
		data.world = world;

		var canvas = document.getElementById('canvas');
		canvas.height = world.getHeight();
		canvas.width = world.getWidth();
		

		if (typeof (canvas.getContext) === undefined) {
			throw new Error('not canvas');
		}

		var ctx = canvas.getContext('2d');
		
		data.canvas = canvas;
		data.ctx = ctx;
		
		if(data.debug){	
			var stats = new Stats();
			stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild( stats.dom );
			data.stats = stats;
		}
		
		g.utils.bindPublicProtoFunctions(this, data);
	}
	
	Engine.prototype.processInput_ = function(data){
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');
		
		var items = data.world.getItems();
		for (var i in items) {
			if (items.hasOwnProperty(i)) {
				items[i].processInput(data.input);
			}
		}
	}
	
	Engine.prototype.update_ = function(data){
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');
		
		var items = data.world.getItems();
		for (var i in items) {
			if (items.hasOwnProperty(i)) {
				if(items[i].toDelete){
					delete items[i];
					continue;
				}
				items[i].update(data.world);
			}
		}
	}
	
	Engine.prototype.render_ = function(data, alpha){
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');
		
		data.ctx.clearRect(0,0, data.world.getWidth(), data.world.getHeight());
		var items = data.world.getItems();
		for (var i in items) {
			if (items.hasOwnProperty(i)) {
				items[i].render(data.ctx, alpha);
			}
		}
	}
	
	Engine.prototype.mainLoop_ = function(data){
		var engine = this;
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');
		
		var tps = 50;
		var dt = 1000 / tps;
		var maxFrameSkip = 5;
		var currentTime = performance.now();
		var accumulator = 0;
		var t = 0;
		var loop = function(timestamp) {
			if(data.debug){
				data.stats.begin();
			}
			
			engine.processInput_(data);
			
			var newTime =  performance.now();
			var frameTime = newTime - currentTime;
			if ( frameTime > 1000 / maxFrameSkip ){
				frameTime = 1000 / maxFrameSkip;
			}
			currentTime = newTime;
			accumulator += frameTime;
			while ( accumulator >= dt )
			{
				engine.update_(data);
				accumulator -= dt;
				t += dt;
			}
			
			var alpha = accumulator / dt;
			engine.render_(data, alpha);
			
			if(data.debug){
				data.stats.end();
			}
			
			if(data.running){
				window.requestAnimationFrame(loop);
			}
		}
		
		loop(performance.now());
	}
	
	Engine.prototype.init = function(data){
		data.world.init();
	}
	
	Engine.prototype.update = function(data){
		this.update_(data);
	}
	
	Engine.prototype.render = function(data){
		this.render_(data, 1);
	}
	
	Engine.prototype.start = function(data){
		data.running = true;
		this.mainLoop_(data);
	}
	
	Engine.prototype.stop = function(data){
		data.running = false;
	}
	
	Engine.prototype.getContext = function(data){
		return data.ctx;
	}
	
	g.Engine = Engine;
})(window.gameJs);