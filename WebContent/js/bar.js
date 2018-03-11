(function(g, Item, undefined){
	
	var BarData = function(){
		this.itemId = 0;
		this.h = 0;
		this.w = 0;
		this.x = 0;
		this.y = 0;
		this.oldX = 0;
		this.oldY = 0;
		this.errX = 0;
		this.errY = 0;
		this.vx = 0;
		this.vy = 0;
		this.oldVx = 0;
		this.oldVy = 0;
		this.ax = 0;
		this.ay = 0;
		this.color = 'green';
		this.toDelete = false;
	};
	
	var Bar = function(minValue, maxValue)
	{
	  var data = new BarData;
	  data.value = 0;
	  data.minValue = minValue;
	  data.maxValue = maxValue;
	  
	  Item.call(this, 5, 50, data);
	}
	
	g.utils.inherits(Bar, Item);
	
	Bar.prototype.getValue = function(data){
		return data.value;
	}
	
	Bar.prototype.update = function(data, world, t, dt){
		if(data.value < data.maxValue)
			data.value++;
	}
	
	Bar.prototype.render = function(data, ctx, alpha ){
		var p = data.w * data.value / (data.maxValue - data.minValue);
		
		ctx.beginPath();
		ctx.rect(data.x,data.y,data.w,data.h)
		ctx.fillStyle = 'rgba(0,0,0,0)';
		ctx.fill();
		ctx.lineWidth =2;
		ctx.stroke();
		if(p > 0){
			ctx.beginPath();
			ctx.rect(data.x+1,data.y+1,p-2,data.h-2);
			ctx.fillStyle = data.color;
			ctx.fill();
		}
	}
	
	g.items.Bar = Bar;
})(window.gameJs, window.gameJs.items.Item);