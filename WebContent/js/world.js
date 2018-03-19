(function(g, undefined){

	var WorldData = function(){
		this.items = {};
		this.nextId = 0;
	};

	var World = function(w,h){
		var data = data || new WorldData;
		data.w = w;
		data.h = h;

		g.utils.bindPublicProtoFunctions(this, data);
	}

	World.prototype.init = function(data){
		for (var i in data.items) {
			if (data.items.hasOwnProperty(i)) {
					data.items[i].preRender();
			}
		}
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

	g.World = World;
})(window.gameJs);
