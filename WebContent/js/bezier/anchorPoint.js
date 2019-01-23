(function(g, undefined){

	var AnchorPoint = function(x, y){
		g.Item.call(this, x, y,100,100,'rgb(255,0,0)')
		this.activate()

		var data = this.data;

		data.lastMove = 0
		data.oldX = this.data.x;
		data.oldY = this.data.y;

	}

	AnchorPoint.prototype = Object.create(g.Item.prototype);
	AnchorPoint.prototype.constructor =  AnchorPoint;

	AnchorPoint.prototype.move = function(x, y){
		this.data.oldX = this.data.x;
		this.data.oldY = this.data.y;
		this.data.x = x
		this.data.y = y
	}

	AnchorPoint.prototype.render = function(ctx, alpha)  {
		var x = alpha * this.data.x + (1 - alpha) * this.data.oldX;
		var y = alpha * this.data.y + (1 - alpha) * this.data.oldY;

		ctx.beginPath();
		ctx.arc(x + 1, y + 1, 5, 0, 2 * Math.PI);
		ctx.fillStyle = this.data.color;
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}

	g.AnchorPoint = AnchorPoint;

})(window.gameJs = window.gameJs || {});
