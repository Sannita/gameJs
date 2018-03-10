(function(g, undefined){
	
	var WorldData = function(){
		this.items = [];
	};
	
	var World = function(w,h)
	{
		var data = data || new WorldData;
		data.w = w;
		data.h = h;
		
		g.utils.bindPublicProtoFunctions(this, data);
	}
	
	World.prototype.init = function(data){
		console.log('init');
	}
	
	World.prototype.getWidth = function(data){
		return data.w;
	}
	
	World.prototype.getHeight = function(data){
		return data.h;
	}
	
	World.prototype.getItems = function(data){
		return data.items;
	}
	
	World.prototype.addItem = function(data, item){
		data.items.push(item);
	}
	
	g.World = World;
})(window.gameJs);