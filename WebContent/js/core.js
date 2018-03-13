//see http://articles.edwardsoft.com/private-prototype-functions

(function(g, undefined){
	g.utils ={};
	g.items ={};

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

	g.utils.bindPublicProtoFunctions = bindPublicProtoFunctions;
	g.utils.inherits = inherits;

	g.utils.getRandomInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	g.utils.preRender = function(w, h, fnRender){
		var canvas = document.createElement('canvas');
		canvas.width = w + 2;
		canvas.height = h + 2;

		var ctx = canvas.getContext('2d');

		fnRender(ctx);

		ctx.getImageData(0,0,canvas.width,canvas.height);
		return canvas;
	}
})(window.gameJs = {});
