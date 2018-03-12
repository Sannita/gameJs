(function(g, Item, undefined){

	var Ball = function(radius)
	{
	  var data = new g.items.ItemData();
	  data.radius = radius;

	  Item.call(this, 2 * radius, 2 * radius, data);
	}

	g.utils.inherits(Ball, Item);

	Ball.prototype.getRadius = function(data){
		return data.radius;
	}

	Ball.prototype.update = function(data, world, t, dt){
		data.oldVx = data.vx;
		data.oldVy = data.vy;

		data.vx += data.ax;
		data.vy += data.ay;

		data.oldX = data.x;
		data.oldY = data.y;

		data.x += data.vx;
		data.y += data.vy;

		data.errX = 0;
		data.errY = 0;

		if( data.vx > 0 && data.x > world.getWidth() - 2 * data.radius){
			data.x = world.getWidth() - 2 * data.radius;
			data.vx *= -1;
		}
		if( data.vx < 0 && data.x < 0){
			data.x = 0;
			data.vx *= -1;
		}
		if( data.vy > 0 && data.y > world.getHeight() - 2 * data.radius){
			data.y = world.getHeight() - 2 * data.radius;
			data.vy *= -1;
			data.bounce = true;
		}else{
			data.bounce = false;
		}
		if( data.vy < 0 && data.y < 0){
			data.y = 0;
			data.vy *= -1;
		}

		/*
		var items = world.getItems();
		for(var i=0;i<items.length;i++){
			if(this.collide(data, items[i])){
				if(data.vx > 0){
					data.x = items[i].getX() - data.radius - items[i].getRadius();
				}
				if(data.vx < 0){
					data.x = items[i].getX() + data.radius + items[i].getRadius();
				}
				if(data.vy > 0){
					data.y = items[i].getY() - data.radius - items[i].getRadius();
				}
				if(data.vy < 0){
					data.y = items[i].getY() + data.radius + items[i].getRadius();
				}
				data.toDelete = true;
			}
		}*/
	}

	Ball.prototype.render = function(data, ctx, alpha ){
		alpha = alpha || 1;

		var x = alpha * data.x + (1 - alpha) * data.oldX + data.radius;
		var y = alpha * data.y + (1 - alpha) * data.oldY + data.radius;
		ctx.beginPath();
		if(data.bounce){
			ctx.ellipse(x, y + data.radius * 0.15, data.radius / 0.85 , data.radius * 0.85, 0, 0, 2 * Math.PI);
		}else{
			ctx.arc(x, y, data.radius, 0, 2 * Math.PI);
		}

		ctx.fillStyle = data.color;
		ctx.fill();
		ctx.stroke();
		/*
		console.log(JSON.stringify({
			alpha: alpha,
			y : data.y,
			oldY : data.oldY,
			vy : data.vy,
			errY : data.errY,
			rY : y
		}));*/
	}

	Ball.prototype.collide = function(data, ball){
		//console.log(this);
		//console.log(data);
		//console.log(ball);
		if(this == ball){
			return false;
		}
		var minDist = (data.radius + ball.getRadius())*(data.radius + ball.getRadius());
		var dist = (data.x - ball.getX())*(data.x - ball.getX()) + (data.y - ball.getY())*(data.y - ball.getY());
		if(dist > minDist){
			return false;
		}
		return true;
	}

	g.items.Ball = Ball;
})(window.gameJs, window.gameJs.items.Item);