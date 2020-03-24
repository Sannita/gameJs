(function(g, undefined){
	var mutationRate = 10;
	
	var Chromosome = function(size){
		this.data = [];
		this.size = size;
		this.actions = 4;
	}
	
	Chromosome.prototype.randomize = function(){
		var action = g.Utils.getRandomInt(0, 99);
		if(action < 70){
			this.data.push(0);
		}else if(action < 80){
			this.data.push(1);
		}else if(action < 90){
			this.data.push(2);
		}else{
			this.data.push(3);
		}
		for(var i=1;i<this.size;i++){
			action = g.Utils.getRandomInt(0, 100);
			var a0 = 70;   					//70 10 10 10
			var a1 = 80;
			var a2 = 90;
		
			if(this.data[i-1] === 0){ 		//60 10 10 20
				a0 = 60;
				a1 = 70;
				a2 = 80;
			}
			if(this.data[i-1] === 1){		//10 50 30 10
				a0 = 10;
				a1 = 60;
				a2 = 90;
			}
			if(this.data[i-1] === 2){		//10 30 50 10
				a0 = 10;
				a1 = 40;
				a2 = 90;
			}
			if(this.data[i-1] === 3){		//10 20 20 50
				a0 = 10;
				a1 = 30;
				a2 = 50;
			}
			
			if(action < a0){
				this.data.push(0);
			}else if(action < a1){
				this.data.push(1);
			}else if(action < a2){
				this.data.push(2);
			}else{
				this.data.push(3);
			}
			//this.data.push(g.Utils.getRandomInt(0,this.actions));
		}
	}
	
	Chromosome.prototype.crossover = function(other, percent){
		var a = new Chromosome(this.size);
		var b = new Chromosome(this.size);
		var c = new Chromosome(this.size);
		var d = new Chromosome(this.size);
		
		var n1 = Math.floor( percent * this.size );
		var n2 = this.size - n1;
		
		//var n = g.Utils.getRandomInt(0,this.size - 1);
		//var n = this.size / 2; 
		for(var i=0; i < n1; i++){
			a.data[i] = this.data[i];
			b.data[i] = other.data[i];
			
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				a.data[i] = (a.data[i] + 1) % this.actions;
			}
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				b.data[i] = (b.data[i] + 1) % this.actions;
			}
		}
		
		for(var i=n2; i < this.size; i++){
			a.data[i] = other.data[i];
			b.data[i] = this.data[i];
			
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				a.data[i] = (a.data[i] + 1) % this.actions;
			}
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				b.data[i] = (b.data[i] + 1) % this.actions;
			}
		}
		
		for(var i=0; i < n2; i++){
			c.data[i] = this.data[i];
			d.data[i] = other.data[i];
			
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				c.data[i] = (a.data[i] + 1) % this.actions;
			}
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				d.data[i] = (b.data[i] + 1) % this.actions;
			}
		}
		
		for(var i=n2; i < this.size; i++){
			c.data[i] = other.data[i];
			d.data[i] = this.data[i];
			
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				c.data[i] = (a.data[i] + 1) % this.actions;
			}
			if(g.Utils.getRandomInt(0,1000) <= mutationRate){
				d.data[i] = (b.data[i] + 1) % this.actions;
			}
		}
		
		return [a, b, c, d];
	}
	
	g.Chromosome = Chromosome;
	
})(window.gameJs = window.gameJs || {});