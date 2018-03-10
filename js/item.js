(function(g,undefined){
	
	var ItemData = function(){
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
	var Item = function(data)
	{
	  // container for private vars: now we assume data
	  // may also be passed from the outside
	  var data = data || new ItemData;
	  g.utils.bindPublicProtoFunctions(this, data);
	}
/*
	// private prototype functions have trailing underscore in their names
	// Calculates the distance between this and other point.
	Point.prototype.distance_ = function(data, point)
	{
	  if(!(data instanceof oop.DataStore))
		throw new Error('Trying to call private method');

	  var dx = data.x - point.getX(), dy = data.y - point.getY();
	  return Math.sqrt(dx * dx + dy * dy);
	}
	*/
	// public prototype functions: called by instance wrappers only,
	// so there is no need to check for 'data'

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
	}
	
	Item.prototype.setSpeed = function(data,vx,vy){
		data.vx = vx;
		data.vy = vy;
	}
	
	Item.prototype.setAccel = function(data,ax,ay){
		data.ax = ax;
		data.ay = ay;
	}
	
	Item.prototype.move = function(data){
		data.x += data.vx;
		data.vx += data.ax;
		data.y += data.vy;
		data.vy += data.ay;
	}
	
	Item.prototype.processInput = function(data, input){
		//console.log('input: ' + input);
	}
	
	Item.prototype.update = function(data, world){
		//console.log('update: ' + world);
	}
	
	Item.prototype.render = function(data, ctx){
		ctx.beginPath();
		ctx.rect(data.x,data.y,data.w,data.h);
		ctx.stroke();
	}
	
	g.items.Item = Item;
})(window.gameJs);