//see http://articles.edwardsoft.com/private-prototype-functions

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

	var bindPublicProtoFunctions = function(obj, data)
	{
	  var proto = Object.getPrototypeOf(obj);
	  if(!proto)
		return;

	  for(key in proto)
		if(typeof proto[key] == 'function')
		  if(key != 'constructor' && key.charAt(key.length - 1) != '_')
			obj[key] = proto[key].bind(obj, data);
	}

	var inherits = function(subclass, superclass)
	{
	  subclass.prototype = Object.create(superclass.prototype);
	  subclass.prototype.constructor = subclass;
	}

	var getRandomInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var preRender = function(w, h, fnRender){
		var canvas = document.createElement('canvas');
		canvas.width = w + 2;
		canvas.height = h + 2;

		var ctx = canvas.getContext('2d');

		fnRender(ctx);

		ctx.getImageData(0,0,canvas.width,canvas.height);
		return canvas;
	}

	g.utils ={};
	g.items ={};

	g.utils.bindPublicProtoFunctions = bindPublicProtoFunctions;
	g.utils.inherits = inherits;
	g.utils.getRandomInt = getRandomInt;
	g.utils.preRender = preRender;

})(window.gameJs = {});
