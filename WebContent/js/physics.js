(function(g, undefined){
	var PhysicsData = function(){

	};

	var Physics = function(){
		var data = data || new PhysicsData;

		g.utils.bindPublicProtoFunctions(this, data);
	}

	g.Physics = Physics;
})(window.gameJs);
