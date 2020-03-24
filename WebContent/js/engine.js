(function(g, undefined){
	var EngineData = function(){
		this.gameCanvas = null;
		this.ctx = null;
		this.debug = true;
		this.running = false;
		this.stats = null;
		this.world = null;
	};

	var Engine = function(world, inputListener, physics){
		var data = data || new EngineData;
		data.world = world;
		data.inputListener = inputListener;
		data.physics = physics;
		data.tps = 25;
		data.maxFrameSkip = 5;
		g.utils.bindPublicProtoFunctions(this, data);
	}

	Engine.prototype.handleInput_ = function(data){
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');

		var input =  data.inputListener.getInput();

		var items = data.world.getItems();
		for (var i in items) {
			if (items.hasOwnProperty(i)) {
				if(items[i].isToDelete()){
					delete items[i];
					continue;
				}
				if(items[i].isActive()){
					items[i].handleInput(input);
				}
			}
		}
	}

	Engine.prototype.update_ = function(data){
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');

		var items = data.world.getItems();
		for (var i in items) {
			if (items.hasOwnProperty(i)) {
				if(items[i].isToDelete()){
					delete items[i];
					continue;
				}
				if(items[i].isActive()){
					items[i].update(data.world, data.physics);
				}
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
				if(items[i].isToDelete()){
					delete items[i];
					continue;
				}
				if(items[i].isVisible()){
					items[i].render(data.ctx, alpha);
				}
			}
		}
	}

	Engine.prototype.mainLoop_ = function(data){
		var engine = this;
		if(!(data instanceof EngineData))
			throw new Error('Trying to call private method');

		var dt = 1000 / data.tps;
		var currentTime = performance.now();
		var accumulator = 0;
		var t = 0;
		var loop = function(timestamp) {
			if(data.debug){
				data.stats.begin();
			}

			engine.handleInput_(data);

			var newTime =  performance.now();
			var frameTime = newTime - currentTime;
			if ( frameTime > 1000 / data.maxFrameSkip ){
				frameTime = 1000 / data.maxFrameSkip;
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

	Engine.prototype.init = function(data, containerId){
		var gameCanvas = document.createElement('canvas');
		gameCanvas.width = data.world.getWidth();
		gameCanvas.height = data.world.getHeight();

		if (typeof (gameCanvas.getContext) === undefined) {
			throw new Error('not canvas');
		}

		document.getElementById(containerId).appendChild(gameCanvas);
		document.getElementById(containerId).style.width = data.world.getWidth() + 'px';
		document.getElementById(containerId).style.height = data.world.getHeight() + 'px';

		var ctx = gameCanvas.getContext('2d');

		data.gameCanvas = gameCanvas;
		data.ctx = ctx;

		if(data.debug){
			var stats = new Stats();
			stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild( stats.dom );
			data.stats = stats;
		}
	}

	Engine.prototype.update = function(data){
		this.update_(data);
	}

	Engine.prototype.render = function(data){
		this.render_(data, 1);
	}

	Engine.prototype.start = function(data){
		data.world.init();
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
