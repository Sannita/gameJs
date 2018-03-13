(function(g, Item, undefined){
	var initStates = function(data){
		var baseUpdate = function(item, world){
			item.oldVx = item.vx;
			item.oldVy = item.vy;

			item.vx += item.currAx;
			item.vy += item.currAy;

			if(item.vx > 0 && item.vx > item.maxVx){
				item.vx = item.maxVx;
			}

			if(item.vx < 0 && -item.vx > item.maxVx){
				item.vx = -item.maxVx;
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

		var StandOrMove = function(){
			var state = this;
			var imageData = null;

			state.preRender = function(data){
				imageData = g.utils.preRender(2 * data.radius, 2 * data.radius, function(ctx){
					ctx.beginPath();
					ctx.arc(data.radius + 1, data.radius + 1, data.radius, 0, 2 * Math.PI);
					ctx.fillStyle = data.color;
					ctx.fill();
					ctx.stroke();
				});
			}

			state.handleInput = function(item, input){
				if(item.bounce){
					return item.bouncingState;
				}
				if(input['KeyA'] || input['KeyD'] || input['KeyW'] || input['KeyS']){
					return item.acceleratingState;
				}
				return null;
			}
			state.enter = function(item, input){
				item.currAx = item.ax;
				item.currAy = item.ay;
			}
			state.update = baseUpdate;
			state.render = function(item, ctx, alpha){
				alpha = alpha || 1;

				var x = alpha * item.x + (1 - alpha) * item.oldX;
				var y = alpha * item.y + (1 - alpha) * item.oldY;

				ctx.drawImage(imageData, x, y);
			}
		}

		var Accelerating = function(){
			var state = this;
			var imageData = null;

			state.preRender = function(data){
				imageData = g.utils.preRender(2 * data.radius, 2 * data.radius, function(ctx){
					ctx.beginPath();
					ctx.arc(data.radius + 1, data.radius + 1, data.radius, 0, 2 * Math.PI);
					ctx.fillStyle = data.color;
					ctx.fill();
					ctx.stroke();
				});
			}

			state.handleInput = function(item, input){
				if(item.bounce){
					return item.bouncingState;
				}
				if(!input['KeyA'] && !input['KeyD'] && !input['KeyW'] && !input['KeyS']){
					return item.standOrMoveState;
				}
				return null;
			}

			state.enter = function(item, input){
				if(input['KeyA']){
					item.currAx = item.ax - 1;
				}
				if(input['KeyD']){
					item.currAx = item.ax + 1;
				}
				if(input['KeyW']){
					item.currAy = item.ay - 1;
				}
				if(input['KeyS']){
					item.currAy = item.ay + 1;
				}
			}

			state.update = baseUpdate;
			state.render = function(item, ctx, alpha){
				alpha = alpha || 1;

				var x = alpha * item.x + (1 - alpha) * item.oldX;
				var y = alpha * item.y + (1 - alpha) * item.oldY;

				ctx.drawImage(imageData, x, y);
			}
		}

		var Bouncing = function(){
			var frame = 0;
			var frames = [0.04, 0.08, 0.12, 0.16, 0.12, 0.08, 0.04];
			var imageData = [];

			var state = this;

			state.preRender = function(data){
				for(var i=0;i<frames.length;i++){
					var d = frames[i];
					var r1 = data.radius / (1 - d);
					var r2 = data.radius * (1 - d)

					imageData[i] = g.utils.preRender(2 * r1, 2 * r2, function(ctx){
						var d = frames[i];
						ctx.beginPath();
						ctx.ellipse(r1, r2, r1 , r2, 0, 0, 2 * Math.PI);
						ctx.fillStyle = data.color;
						ctx.fill();
						ctx.stroke();
					});
				}
			}

			state.enter = function(item, input){
				frame = 0;
			}
			state.handleInput = function(item, input){
				if(frame >= frames.length){
					item.bounce = false;
					return item.standOrMoveState;
				}
			}
			state.update = function(item, world){
				var d = (1 + frame) / frames.length;

				item.vx += item.currAx;

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
			state.render = function(item, ctx, alpha){
				alpha = alpha || 1;

				var x = alpha * item.x + (1 - alpha) * item.oldX;
				var y = alpha * item.y + (1 - alpha) * item.oldY;

				//x = item.x + item.radius;
				y = item.y;

				var d = frames[frame];

				ctx.drawImage(imageData[frame], x - (data.radius * d), y + (data.radius * d * 2));

				frame++;
			}
		}

		data.standOrMoveState = new StandOrMove();
		data.acceleratingState = new Accelerating();
		data.bouncingState = new Bouncing();
		data.state = data.standOrMoveState;
	}

	var Ball = function(radius)
	{
	  var data = new g.items.ItemData();
	  data.radius = radius;
		data.maxVx = 30;
		data.maxVy = 30;

		Item.call(this, 2 * radius, 2 * radius, data);

		initStates(data);
	}

	g.utils.inherits(Ball, Item);

	Ball.prototype.getRadius = function(data){
		return data.radius;
	}

	Ball.prototype.update = function(data, world, t, dt){
		data.state.update(data, world);
	}

	Ball.prototype.render = function(data, ctx, alpha ){
		data.state.render(data,ctx,alpha);
	}

	Ball.prototype.preRender = function(data){
		data.standOrMoveState.preRender(data);
		data.acceleratingState.preRender(data);
		data.bouncingState.preRender(data);
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
