(function(g, undefined){
	var LiveRocket = function(x, y, dna, maxLife){
		g.Rocket.call(this, x, y);
		this.dna = dna;
		this.life = 0;
		this.maxLife = maxLife;
		
	}
	
	LiveRocket.prototype = Object.create(g.Rocket.prototype);
	LiveRocket.prototype.constructor = LiveRocket;
	
	LiveRocket.prototype.doAction = function(){
		var action = this.dna.data[this.life];
		if(action === 0){
			this.accelerate(10);
		}else if(action === 1){
			this.turn(-0.05);
		}else if(action === 2){
			this.turn(0.05);
		}else{
			this.constantSpeed();
		}
	}
	
	var Population = function(width, height, collisions, target){
		var data = {};
		data.items = [];
		data.size = 64;
		data.maxLifeSpan = 250;
		data.lifeSpan = 0;
		data.width = width;
		data.height = height;
		data.collisions = collisions;
		data.target = target;
		this.data = data;
		
		var chromosomes = [];
		for(var i=0; i < data.size; i++){
			var ch = new g.Chromosome(data.maxLifeSpan);
			ch.randomize();
			chromosomes.push(ch);
		}
		
		this.createNewRockets(chromosomes);
		this.show();
		this.activate();
	}
	
	Population.prototype = Object.create(g.Item.prototype);
	Population.prototype.constructor = Population;
	
	Population.prototype.createNewRockets = function(chromosomes){
		
		var rockets = [];
		
		for(var i=0; i < chromosomes.length; i++){
			var dna = chromosomes[i];
			var r = new LiveRocket(this.data.width / 2, this.data.height - 65, dna, this.data.maxLifeSpan);
			r.itemId = 'rocket' + i;
			rockets.push(r);
			r.show();
			r.activate();
		
		}
		
		this.data.items = rockets;
		this.data.lifeSpan = this.data.maxLifeSpan;
	}
	
	Population.prototype.nextGeneration = function(){
		var n = this.data.items.length;
		
		var maxD = Math.sqrt(this.data.width * this.data.width + this.data.height * this.data.height);
		var totalScore = 0;
		for(var i=0; i < n; i++){
			var r = this.data.items[i];
			totalScore += r.score;
		}
		
		var candidates = [];
		for(var i=0; i < n; i++){
			var r = this.data.items[i];
			var p = Math.floor(100 * r.score / totalScore);
			//console.log(' rocket ' +i + ' score ' + r.score + ' p ' + p);
			for(var j=0; j < p; j++){
				candidates.push(i);
			}
		}
		
		var chromosomes = [];
		while(candidates.length > 0 && chromosomes.length < this.data.size){
			var rnd1 = g.Utils.getRandomInt(0, candidates.length - 1);
			var r1 = candidates[rnd1];
			var a = this.data.items[r1];
			/*for(var j = candidates.length - 1; j >= 0; j--){
				if(candidates[j] == r1){
					candidates.splice(j, 1);
				}
			}*/
			var rnd2 = g.Utils.getRandomInt(0, candidates.length - 1);
			var r2 = candidates[rnd2];
			var b = this.data.items[r2];
			/*for(var j = candidates.length - 1; j >= 0; j--){
				if(candidates[j] == r2){
					candidates.splice(j, 1);
				}
			}*/
			
			var percent = a.score / (a.score + b.score);
			var t = a.dna.crossover(b.dna, percent);
			
			chromosomes.push(t[0]);
			chromosomes.push(t[1]);
			chromosomes.push(t[2]);
			chromosomes.push(t[3]);
		}
		
		
		this.createNewRockets(chromosomes);
	}
	
	Population.prototype.handleInput = function(input){
		if(this.data.lifeSpan <= 0){
			this.nextGeneration();
			return;
		}
		for(var i=0; i < this.data.items.length; i++){
			var r = this.data.items[i];
			
			r.doAction();
		}
		
	}
	
	Population.prototype.update = function(dt){
		if(this.data.lifeSpan <= 0){
			return;
		}
		
		for(var i=0; i < this.data.items.length; i++){
			var r = this.data.items[i];
			if(r.isToDelete()){
				continue;
			}
			r.update(dt);
			this.calculateScore(r);
			
			r.life++;
		}
		this.data.lifeSpan--;
	}
	
	Population.prototype.render = function(ctx, alpha){
		if(this.data.lifeSpan <= 0){
			return;
		}
		for(var i=0; i < this.data.items.length; i++){
			var r = this.data.items[i];
			if(r.isToDelete()){
				continue;
			}
			r.render(ctx, alpha);
		}
	}
	
	Population.prototype.calculateScore = function(rocket){
		var r = this.data;
		var maxD = Math.sqrt(r.width * r.width + r.height * r.height);
		var dx = r.target.data.x - rocket.data.x;
		var dy = r.target.data.y - rocket.data.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		var dist = 1000 - 1000 * d / maxD;
		var life = 1000 - 1000 * rocket.life / (rocket.maxLife - 1);
		var score = dist + life;
		
		var oob = this.outOfBounds(rocket);
		var collision = this.checkCollision(rocket);
		if(oob || collision){
			if(collision === r.target){
				score = score * 10;
			}else if(oob){
				score = 0.2 * dist + 0.2 * life;
			}else{
				score = 0.1 * dist + 0.1 * life;
			}
			rocket.setToDelete();
		}
		rocket.score = Math.round(score);
	}
	
	Population.prototype.outOfBounds = function(rocket){
		var oob = rocket.data.x < 0 || (rocket.data.x + rocket.data.w) > this.width || rocket.data.y < 0 || (rocket.data.y + rocket.data.h) > this.height;
		return oob;
	}
	Population.prototype.checkCollision =  function(rocket){
		var items = this.data.collisions;
		for(var i=0;i< items.length; i++){
			var item = items[i];
			var collide = this.collide(rocket, item);
			if(collide){
				return collide;
			}
		}
	}
	
	Population.prototype.collide = function(a, b){
		var x1 = a.data.x;
		var y1 = a.data.y;
		var w1 = a.data.w;
		var h1 = a.data.h;
		
		var x2 = b.data.x;
		var y2 = b.data.y;
		var w2 = b.data.w;
		var h2 = b.data.h;
		
		if( (x1 >= x2 && x1 <= (x2 + w2) && y1 >= y2 && y1 <= (y2 + h2)) ||
			((x1 + w1) >= x2 && (x1 + w1) <= (x2 + w2) && y1 >= y2 && y1 <= (y2 + h2)) ||
			(x1 >= x2 && x1 <= (x2 + w2) && (y1+h1) >= y2 && (y1+h1) <= (y2 + h2)) ||
			((x1 + w1) >= x2 && x1 <= (x2 + w2) && (y1+h1) >= y2 && (y1+h1) <= (y2 + h2))
		){
			return b;
		}else{
			return false;
		}
	}
	
	g.Population = Population;
	
})(window.gameJs = window.gameJs || {});