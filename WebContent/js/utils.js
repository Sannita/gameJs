(function(g, undefined){
	
	var Utils = function() {
		
	}
	
	Utils.prototype.getRandomInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	g.Utils = new Utils();
	
})(window.gameJs);
