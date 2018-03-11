(function(g, undefined){
	
	var WorldData = function(){
		this.items = {};
		this.nextId = 0;
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
		item.setItemId(data.nextId);
		data.items[data.nextId] = item;
		data.nextId++;
	}
	
	World.prototype.getItem = function(data, itemId){
		return data.items[itemId];
	}
	
	/*World.prototype.checkCollisions = function(data){
		for(var i=0;i<data.items.length;i++){
			if(data.items[i].collision){
				continue;
			}
			for(var j=i+1;j<data.items.length;j++){
				
				if(i != j && !data.items[j].collision && data.items[i].collide(data.items[j])){
					data.items[i].collision = true;
					data.items[j].collision = true;
					break;
				}
			}
		}
	}*/
	
	g.World = World;
})(window.gameJs);