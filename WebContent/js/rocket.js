(function(g, undefined){

	var Rocket = function(x, y){
		g.Item.call(this, x,y,36,4,'rgba(255,0,0,0.6)');
		
		var data = this.data;
		
		data.oldX = this.data.x;
		data.oldY = this.data.y;
		
		data.maxSpeed = 400;
		
		data.speed = 0;
		data.accel = 0;
		
		data.ax = 0;
		data.ay = 0;
		
		data.angle = -Math.PI / 2;
		
		data.cos = Math.cos(data.angle);
		data.sin = Math.sin(data.angle);

	}
	
	Rocket.prototype = Object.create(g.Item.prototype);
	Rocket.prototype.constructor = Rocket;
	
	Rocket.prototype.launch = function(){
		this.accelerate(10);
	}
	
	Rocket.prototype.accelerate = function(accel){
		this.data.accel += accel;
	}
	
	Rocket.prototype.constantSpeed = function(){
		this.data.accel = 0;
	}
	
	Rocket.prototype.turn = function(angle){
		this.data.angle += angle;
		this.data.cos = Math.cos(this.data.angle);
		this.data.sin = Math.sin(this.data.angle);
	}
	
	Rocket.prototype.handleInput = function(input){
		if(input['KeyW']){
			this.accelerate(10);
		}else if(input['KeyS']){
			this.accelerate(-10);
		}else{
			this.constantSpeed();
		}
		if(input['KeyA']){
			this.turn(-0.05);
		}else if(input['KeyD']){
			this.turn(0.05);
		}
	}
		
	Rocket.prototype.update = function(dt){
		this.data.oldX = this.data.x;
		this.data.oldY = this.data.y;
		if(Math.abs(this.data.speed) > this.data.maxSpeed){
			if(this.data.speed < 0){
				this.data.speed = -this.data.maxSpeed;
			}else{
				this.data.speed = this.data.maxSpeed;
			}
			this.constantSpeed();
		}else{
			this.data.speed += dt * this.data.accel / 1000;
		}
		this.data.x += dt * this.data.speed * this.data.cos / 1000;
		this.data.y += dt * this.data.speed * this.data.sin / 1000;
	}
		
	Rocket.prototype.render = function(ctx, alpha)  {
		var x = alpha * this.data.x + (1 - alpha) * this.data.oldX;
		var y = alpha * this.data.y + (1 - alpha) * this.data.oldY;
		
		ctx.save();
		ctx.translate(x, y + this.data.h / 2);
		ctx.rotate(this.data.angle);
		ctx.translate(-x, -y - this.data.h / 2);
		ctx.beginPath();
		ctx.rect(x, y, this.data.w, this.data.h);
		
		ctx.fillStyle = this.data.color;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	
	g.Rocket = Rocket;
	
})(window.gameJs = window.gameJs || {});