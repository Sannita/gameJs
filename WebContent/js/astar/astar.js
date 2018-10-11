(function(g, undefined){
	
	var heuristic = function(start, end){
		var dx = Math.abs(start.i - end.i);
		var dy = Math.abs(start.j - end.j);
		var dc = Math.abs(end.value - start.value);
		
		var d = Math.sqrt(dx * dx + dy * dy + dc * dc);
		
		return d;
	}
	
	var distance = function(start, end){
		
		
		var dx = Math.abs(start.i - end.i);
		var dy = Math.abs(start.j - end.j);
		var dc = Math.abs(end.value - start.value);
		
		//var d = (dx + dy) + (Math.sqrt(2) - 2 ) * Math.min(dx, dy);
		/*
		if(dc > 0){
			dc = dc * 1.1;
		}else{
			dc = dc * 0.9;
		}*/
		var d = Math.sqrt(dx * dx + dy * dy + dc * dc);
		return d;
	
	}
	
	var heuristic2 = function(start, end){

		var dx = Math.abs(start.i - end.i);
		var dy = Math.abs(start.j - end.j);
		var dc = Math.abs(end.value - start.value);
		
		return dx + dy + dc;
	}
	
	var distance2 = function(start, end){
		return 1;
	}
	
	var findLowFScore  = function(set){
		var min;
		var keys = Object.keys(set);
		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			var item = set[key];
			if (min === undefined || item.fScore < min.fScore){
				min = item;
			}
		}
		return min;
	}
	
	var reconstructPath  = function(node){
		var path = [];
		var temp = node;
		path.push(temp);
		while(temp.cameFrom){
			temp = temp.cameFrom;
			path.push(temp);
		}
		return path.reverse();
	}
	
	var AStar = function(grid){
		this.grid = grid;
	}
	
	AStar.prototype.findPath = function(){
		var start = this.grid.start;
		var end = this.grid.end;
		
		var openSet = {};
		var closedSet = {};
		
		openSet[start.id] = start;
		
		start.gScore = 0;
		start.fScore = heuristic2(start, end);
		
		var keys = Object.keys(openSet);
		while(keys.length > 0){
			
			var current = findLowFScore(openSet);
			
			if( current === end){
				return reconstructPath(current);
			}
			
			delete openSet[current.id];
			closedSet[current.id] = current;
			
			var neighbors = this.grid.getNeighbors4(current);
			for(var i=0;i<neighbors.length;i++) {
				var neighbor = neighbors[i];
				if(neighbor.value === undefined || closedSet[neighbor.id] !== undefined){
					continue;
				}
				var tentativeGScore = current.gScore + distance2(current, neighbor);
				if(openSet[neighbor.id] === undefined){
					openSet[neighbor.id] = neighbor;
				}else if( neighbor.gScore !== undefined && tentativeGScore >= neighbor.gScore){
					continue;
				}
				
				neighbor.cameFrom = current;
				neighbor.gScore = tentativeGScore;
				neighbor.fScore = tentativeGScore + heuristic2(neighbor, end);
			}
			keys = Object.keys(openSet);
		}
		
		return [];
	}
	
	g.AStar = AStar;
	
})(window.gameJs);