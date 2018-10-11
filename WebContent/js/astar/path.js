(function(g, undefined){

	var Path = function(path){
		g.Item.call(this);
	    this.path = path;
		this.pos = 0;
	}
	
	Path.prototype = Object.create(g.Item.prototype);
	Path.prototype.constructor = Path;
	
	Path.prototype.update = function(dt){
		if(this.pos < this.path.length){
			this.pos++;
		}	
	}
	
	Path.prototype.render = function(ctx, dw, dh){
		if(this.path.length == 0){
			return;
		}
		ctx.save();
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		var start = this.path[0];
		ctx.moveTo(Math.floor(start.i*dw + dw/2), Math.floor(start.j*dh+dh/2));
		for(var i=1;i<this.pos;i++){
			var item = this.path[i];
			ctx.lineTo(Math.floor(item.i*dw + dw/2), Math.floor(item.j*dh+dh/2));
		}
		ctx.stroke();
		ctx.restore();
	}
	
	g.Path = Path;
	
})(window.gameJs);