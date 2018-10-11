(function(g, undefined){
	
	var Cell = function(i,j){
	    this.i = i;
		this.j = j;
		this.wall = false;
		this.color = 'white';
		this.border = 'black';
	}	
	
	Cell.prototype.setWall = function(wall){
		this.wall = wall;
		if(this.wall){
			this.color = 'black';
		}else{
			this.color = 'white';
		}
	}
	
	Cell.prototype.setColor = function(color){
		this.color = color;
	}
	
	Cell.prototype.setBorder = function(color){
		this.border = color;
	}
	
	Cell.prototype.render = function(ctx, dw, dh){
		ctx.beginPath();
		ctx.rect(Math.floor(this.i * dw), Math.floor(this.j * dh), dw, dh);
		//ctx.ellipse(this.i * dw + dw/2, this.j * dh + dh/2, dw / 4, dh / 4, 0, 0 , 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		//ctx.strokeStyle = this.border;
		ctx.stroke();
	}
	
	g.Cell = Cell;
	
})(window.gameJs);