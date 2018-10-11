(function(g, undefined){

	var Item = function(x,y,w,h,color){
		var data = {};
		data.x = x || 0;
		data.y = y || 0;
		data.w = w || 10;
		data.h = h || 10;
		data.color = color || 'white';
		data.visible = true;
		data.active = false;
		data.toDelete = false;
		this.data = data;
	}
	
	Item.prototype.handleInput = function(input){
		
	}
	
	Item.prototype.update = function(t){
		
	}
	
	Item.prototype.render = function(ctx, alpha){
		ctx.beginPath();
		ctx.rect(this.data.x, this.data.y, this.data.w, this.data.h)
		ctx.fillStyle = this.data.color;
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}
	
	Item.prototype.hide = function(){
		this.data.visible = false;
	}
	
	Item.prototype.show = function(){
		this.data.visible = true;
	}
	
	Item.prototype.setToDelete = function(){
		this.data.toDelete = true;
	}
	
	Item.prototype.activate = function() {
		this.data.active = true;
	}
	
	Item.prototype.deActivate = function() {
		this.data.active = false;
	}
	
	Item.prototype.isToDelete = function() {
		return this.data.toDelete;
	}
	
	Item.prototype.isActive = function() {
		return this.data.active;
	}
	
	Item.prototype.isVisible = function() {
		return this.data.visible;
	}
	
	Item.prototype.collide = function(x,y,w,h){
		if( (x >= this.data.x && x <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
			((x + w) >= this.data.x && (x + w) <= (this.data.x + this.data.w) && y >= this.data.y && y <= (this.data.y + this.data.h)) ||
			((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y+h) >= this.data.y && (y+h) <= (this.data.y + this.data.h)) ||
			((x + w) >= this.data.x && x <= (this.data.x + this.data.w) && (y+h) >= this.data.y && (y+h) <= (this.data.y + this.data.h))
		){
			return this;
		}else{
			return false;
		}
	}
	
	g.Item = Item;
	
})(window.gameJs = window.gameJs || {});