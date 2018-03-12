(function(g,undefined){
	var ItemData = function(){
		this.itemId = null;
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
		this.color = 'rgba(0,0,0,0)';
		this.isVisible = true;
		this.isActive = true;
		this.toDelete = false;
	};

	var ItemState = function(){

	};

	var Item = function(h, w, data)
	{
	  var data = data || new ItemData();
	  data.h = h;
	  data.w = w;
	  g.utils.bindPublicProtoFunctions(this, data);
	}

	Item.prototype.getItemId = function(data)
	{
	  return data.itemId;
	}

	Item.prototype.setItemId = function(data, itemId)
	{
	  data.itemId = itemId;
	}

	Item.prototype.getWidth = function(data)
	{
	  return data.w;
	}

	Item.prototype.getHeight = function(data)
	{
	  return data.h;
	}

	Item.prototype.getX = function(data)
	{
	  return data.x;
	}

	Item.prototype.getY = function(data)
	{
	  return data.y;
	}

	Item.prototype.getVx = function(data)
	{
	  return data.vx;
	}

	Item.prototype.getVy = function(data)
	{
	  return data.vy;
	}

	Item.prototype.getAx = function(data)
	{
	  return data.ax;
	}

	Item.prototype.getAy = function(data)
	{
	  return data.ay;
	}

	Item.prototype.setSize = function(data,h,w){
		data.h = h;
		data.w = w;
	}

	Item.prototype.setPos = function(data,x,y){
		data.x = x;
		data.y = y;
		data.oldX = x;
		data.oldY = y;
	}

	Item.prototype.setSpeed = function(data,vx,vy){
		data.vx = vx;
		data.vy = vy;
		data.oldVx = vx;
		data.oldVy = vy;
	}

	Item.prototype.setAccel = function(data,ax,ay){
		data.ax = ax;
		data.ay = ay;
	}

	Item.prototype.setColor = function(data, color) {
		color = color || 'rgba(0,0,0,0)';
		data.color = color;
	}

	Item.prototype.isVisible = function(data) {
		return data.isVisible;
	}

	Item.prototype.setVisible = function(data, visible) {
		data.isVisible = visible;
	}


	Item.prototype.isToDelete = function(data) {
		return data.toDelete;
	}

	Item.prototype.setToDelete = function(data, toDelete) {
		data.toDelete = toDelete;
	}

	Item.prototype.isActive = function(data) {
		return data.isActive;
	}

	Item.prototype.setActive = function(data, active) {
		data.isActive = active;
	}

	Item.prototype.handleInput = function(data, input){
		//console.log(input);
	}

	Item.prototype.update = function(data, world, t, dt){

	}

	Item.prototype.render = function(data, ctx, alpha){
		alpha = alpha || 1;

		var x = alpha * data.x + (1 - alpha) * data.oldX;
		var y = alpha * data.y + (1 - alpha) * data.oldY;

		ctx.beginPath();
		ctx.rect(x,y,data.w,data.h);
		ctx.fillStyle = data.color;
		ctx.fill();
		ctx.stroke();
	}

  g.items.ItemData = ItemData;
  g.items.ItemState = ItemState;
	g.items.Item = Item;
})(window.gameJs);
