(function(g,undefined){

	var ItemData = function(){
		var itemData = this;
		itemData.itemId = null;
		itemData.h = 0;
		itemData.w = 0;
		itemData.x = 0;
		itemData.y = 0;
		itemData.oldX = 0;
		itemData.oldY = 0;
		itemData.maxVx = 0;
		itemData.maxVy = 0;
		itemData.vx = 0;
		itemData.vy = 0;
		itemData.oldVx = 0;
		itemData.oldVy = 0;
		itemData.maxAx = 0;
		itemData.maxAy = 0;
		itemData.ax = 0;
		itemData.ay = 0;
		itemData.color = 'rgba(0,0,0,0)';
		itemData.isVisible = true;
		itemData.isActive = true;
		itemData.toDelete = false;
		itemData.state = {};
	};

	var Item = function(h, w, data)
	{
	  var data = data || new ItemData();
	  data.h = h;
	  data.w = w;
		data.state = new g.items.BaseState();
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
		data.ax = 0;
		data.ay = 0;
		data.maxAx = ax;
		data.maxAy = ay;
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
		var state = data.state.handleInput(data, input);
		if(state){
			data.state = state;
			data.state.enter(data, input);
		}
	}

	Item.prototype.update = function(data, world, t, dt){
		data.state.update(data, world);
	}

	Item.prototype.render = function(data, ctx, alpha){
		data.state.render(data, ctx, alpha);
	}

	Item.prototype.preRender = function(data){
		data.state.preRender(data);
	}

	g.items.ItemData = ItemData;
	g.items.Item = Item;
})(window.gameJs);
