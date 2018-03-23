(function(g, undefined){
	var PhysicsData = function(){

	};

	var Physics = function(){
		var data = data || new PhysicsData;

		g.utils.bindPublicProtoFunctions(this, data);
	}

	Physics.prototype.moveObject = function(data, x,y,vx,vy,ax,ay){
		var result = {};
		
		result.vx = vx + ax;
		result.vy = vy + ay;

		result.x = x + result.vx;
		result.y = y + result.vy;
		
		return result;
	}
	
	Physics.prototype.collide = function(data, obj1, obj2){
		var result = {};
		
		var prevPos1 = {x : obj1.oldX, y : obj1.oldY};
		var prevPos2 = {x : obj2.oldX, y : obj2.oldY};
		var m1 = ( obj1.y - prevPos1.y ) / ( obj1.x - prevPos1.x );
		var m2 = ( obj2.y - prevPos2.y ) / ( obj2.x - prevPos2.x );
		var q1 = obj1.y - m1 * obj1.x;
		var q2 = obj2.y - m2 * obj2.x;
		
		var collision = (m1 * q2 - m2 * q1) != 0;
		
		return result;
	}
	
	g.Physics = Physics;
})(window.gameJs);
