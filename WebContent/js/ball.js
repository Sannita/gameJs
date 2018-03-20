(function(g, Item, BaseState, undefined){

		var baseUpdate = function(data, item, world){
			item.oldVx = item.vx;
			item.oldVy = item.vy;

			item.vx += item.ax;
			item.vy += item.ay;

			if(item.vx > 0 && item.vx > item.maxVx){
				item.vx = item.maxVx;
			}

			if(item.vx < 0 && -item.vx > item.maxVx){
				item.vx = -item.maxVx;
			}

			if(item.vy > 0 && item.vy > item.maxVy){
				item.vy = item.maxVy;
			}

			if(item.vy < 0 && -item.vy > item.maxVy){
				item.vy = -item.maxVy;
			}

			item.oldX = item.x;
			item.oldY = item.y;

			item.x += item.vx;
			item.y += item.vy;

			item.errX = 0;
			item.errY = 0;

			if( item.vx > 0 && item.x > world.getWidth() - 2 * item.radius){
				item.x = world.getWidth() - 2 * item.radius;
				item.vx *= -1;
			}
			if( item.vx < 0 && item.x < 0){
				item.x = 0;
				item.vx *= -1;
			}
			if( item.vy > 0 && item.y > world.getHeight() - 2 * item.radius){
				item.y = world.getHeight() - 2 * item.radius;
				item.vy *= -1;
				item.bounce = true;
			}else{
				item.bounce = false;
			}
			if( item.vy < 0 && item.y < 0){
				item.y = 0;
				item.vy *= -1;
			}
		}

		var basePreRender = function(data, item){
			data.imageData = g.utils.preRender(2 * item.radius, 2 * item.radius, function(ctx){
				 ctx.beginPath();
				 ctx.arc(item.radius + 1, item.radius + 1, item.radius, 0, 2 * Math.PI);
				 ctx.fillStyle = item.color;
				 ctx.fill();
				 ctx.stroke();
			 });
		}

		var StandOrMove = function(){
			BaseState.call(this);
		}

		g.utils.inherits(StandOrMove, BaseState);

		StandOrMove.prototype.preRender = basePreRender;

		StandOrMove.prototype.enter = function(data, item){
			item.ax = 0;
			item.ay = 0;
		}

			StandOrMove.prototype.handleInput = function(data, item, input){
			 if(item.bounce){
					return item.bouncingState;
				}
				if(input['KeyA'] || input['KeyD'] || input['KeyW'] || input['KeyS']){
					return item.acceleratingState;
				}
				return null;
			}

	StandOrMove.prototype.update = baseUpdate;

			var Accelerating = function(){
				BaseState.call(this);
			}

			g.utils.inherits(Accelerating, BaseState);

			Accelerating.prototype.preRender = basePreRender;

			Accelerating.prototype.handleInput = function(data, item, input){
				if(input['KeyA']){
					item.ax = - 1;
				}
				if(input['KeyD']){
					item.ax = 1;
				}
				if(input['KeyW']){
					item.ay = - 1;
				}
				if(input['KeyS']){
					item.ay = 1;
				}

				if(item.bounce){
					return item.bouncingState;
				}
				if(!input['KeyA'] && !input['KeyD'] && !input['KeyW'] && !input['KeyS']){
					return item.standOrMoveState;
				}
				return null;
			}

			Accelerating.prototype.update = baseUpdate;

		var Bouncing = function(){
			var data = new g.items.StateData();
			data.frame = 0;
			data.frames = [0.04, 0.08, 0.12, 0.16, 0.12, 0.08, 0.04];
			data.imageData = [];

			BaseState.call(this, data);
		}

		g.utils.inherits(Bouncing, BaseState);

			Bouncing.prototype.preRender = function(data, item){
				for(var i=0;i<data.frames.length;i++){
					var d = data.frames[i];
					var r1 = item.radius / (1 - d);
					var r2 = item.radius * (1 - d)

					data.imageData[i] = g.utils.preRender(2 * r1, 2 * r2, function(ctx){
						var d = data.frames[i];
						ctx.beginPath();
						ctx.ellipse(r1, r2, r1 , r2, 0, 0, 2 * Math.PI);
						ctx.fillStyle = item.color;
						ctx.fill();
						ctx.stroke();
					});
				}
			}

			Bouncing.prototype.enter = function(data, item, input){
				data.frame = 0;
			}
			Bouncing.prototype.handleInput = function(data,item, input){
				if(data.frame >= data.frames.length){
					item.bounce = false;
					return item.standOrMoveState;
				}
			}
			Bouncing.prototype.update = function(data, item, world){
				var d = (1 + data.frame) / data.frames.length;

				item.vx += item.ax;

				if(item.vx > 0 && item.vx > item.maxVx){
					item.vx = item.maxVx;
				}

				if(item.vx < 0 && -item.vx > item.maxVx){
					item.vx = -item.maxVx;
				}

				item.oldX = item.x;
				item.x += item.vx * d;

				if( item.vx > 0 && item.x > world.getWidth() - 2 * item.radius){
					item.x = world.getWidth() - 2 * item.radius;
					item.vx *= -1;
				}
				if( item.vx < 0 && item.x < 0){
					item.x = 0;
					item.vx *= -1;
				}
			}
			Bouncing.prototype.render = function(data, item, ctx, alpha){
				alpha = alpha || 1;

				var x = alpha * item.x + (1 - alpha) * item.oldX;
				var y = alpha * item.y + (1 - alpha) * item.oldY;

				//x = item.x + item.radius;
				y = item.y;

				var d = data.frames[data.frame];

				ctx.drawImage(data.imageData[data.frame], x - (item.radius * d), y + (item.radius * d * 2));

				data.frame++;
			}


	var Ball = function(radius){
	  var data = new g.items.ItemData();
	  data.radius = radius;
		data.maxVx = 30;
		data.maxVy = 30;

		Item.call(this, 2 * radius, 2 * radius, data);

		data.standOrMoveState = new StandOrMove();
		data.acceleratingState = new Accelerating();
		data.bouncingState = new Bouncing();
		data.state = data.standOrMoveState;
	}

	g.utils.inherits(Ball, Item);

	Ball.prototype.getRadius = function(data){
		return data.radius;
	}

	Ball.prototype.preRender = function(data){
		data.standOrMoveState.preRender(data);
		data.acceleratingState.preRender(data);
		data.bouncingState.preRender(data);
	}

	g.items.Ball = Ball;
})(window.gameJs, window.gameJs.items.Item, window.gameJs.items.BaseState);
