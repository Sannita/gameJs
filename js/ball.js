(function(g, Item, undefined){
	
	var BallData = function(){
		this.h = 0;
		this.w = 0;
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
	};
	
	//---- Point ----
	// Object constructor
	var Ball = function(radius)
	{
	  // container for private vars: now we assume data
	  // may also be passed from the outside
	  var data = new BallData;
	  data.radius = radius;
	  
	  Item.call(this,data);
	}
	
	g.utils.inherits(Ball, Item);

	Ball.prototype.getRadius = function(data){
		return data.radius;
	}
	
	Ball.prototype.move = function(data){
		if( data.x > world.w - data.radius){
			data.x = world.w - data.radius;
			data.vx *= -1;
		}
		if( data.x < data.radius){
			data.x = data.radius;
			data.vx *= -1;
		}
		if( data.y > world.h - data.radius){
			data.y = world.h - data.radius;
			if(data.vy > 0.8){
				data.vy *= -0.8;
			}else{
				data.vy = 0;
			}
		}
		if( data.y < data.radius){
			data.y = data.radius;
		}

		data.x += data.vx;
		data.y += data.vy;
		
		data.vx += data.ax;
		data.vy += data.ay;
	}
	
	Ball.prototype.update = function(data, world){
		if( data.x > world.getWidth() - data.radius){
			data.x = world.getWidth() - data.radius;
			data.vx *= -1;
		}
		if( data.x < data.radius){
			data.x = data.radius;
			data.vx *= -1;
		}
		if( data.y > world.getHeight() - data.radius){
			data.y = world.getHeight() - data.radius;
			if(data.vy > 0.8){
				data.vy *= -0.8;
			}else{
				data.vy = 0;
			}
		}
		if( data.y < data.radius){
			data.y = data.radius;
		}

		data.x += data.vx;
		data.y += data.vy;
		
		data.vx += data.ax;
		data.vy += data.ay;
	}
	
	Ball.prototype.render = function(data, ctx){
		ctx.beginPath();
		ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 360);
		ctx.stroke();
	}
	
	g.items.Ball = Ball;
})(window.gameJs, window.gameJs.items.Item);