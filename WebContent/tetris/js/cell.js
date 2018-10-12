(function(g, undefined){

	var Cell = function(i,j){
		g.Item.call(this);
	  this.i = i;
		this.j = j;
		this.wall = false;
		this.color = 'white';
		this.border = 'white';
	}

	Cell.prototype = Object.create(g.Item.prototype);
	Cell.prototype.constructor = Cell;

	Cell.prototype.render = function(ctx, dw, dh){
		ctx.beginPath();
		ctx.rect(Math.floor(this.i * dw), Math.floor(this.j * dh), dw, dh);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle = this.border;
		ctx.stroke();
	}

	g.Cell = Cell;

})(window.gameJs);
