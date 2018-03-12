(function(g, Item, undefined){

	var Bar = function(minValue, maxValue, h, w)
	{
	  var data = new g.items.ItemData;
	  data.value = minValue;
	  data.minValue = minValue;
	  data.maxValue = maxValue;
		data.border = 2;
		data.color = 'green';

	  Item.call(this, h, w, data);
	}

	g.utils.inherits(Bar, Item);

	Bar.prototype.getValue = function(data){
		return data.value;
	}

	Bar.prototype.setValue = function(data, value){
		data.value = value;
	}

	Bar.prototype.update = function(data, world, t, dt){
		//if(data.value < data.maxValue)
		//	data.value++;
	}

	Bar.prototype.render = function(data, ctx, alpha ){
		var p = data.w * data.value / (data.maxValue - data.minValue);

		ctx.beginPath();
		ctx.rect(data.x, data.y, data.w + 2 * data.border, data.h + 2 * data.border)
		ctx.fillStyle = 'rgba(0,0,0,0)';
		ctx.fill();
		ctx.lineWidth = data.border;
		ctx.stroke();
		if(p > 0){
			ctx.beginPath();
			ctx.rect(data.x + data.border , data.y + data.border, p, data.h);
			ctx.fillStyle = data.color;
			ctx.fill();
		}
	}

	g.items.Bar = Bar;
})(window.gameJs, window.gameJs.items.Item);
