(function(g, undefined){

	var Grid = function(width, height, dw, dh){
		g.Item.call(this);
		this.width = width;
		this.height = height;
		this.dw = dw;
		this.dh = dh;
		this.cols = Math.floor(this.width / this.dw);
		this.rows = Math.floor(this.height / this.dh);

	}

	Grid.prototype = Object.create(g.Item.prototype);
	Grid.prototype.constructor = Grid;

	Grid.prototype.generate = function(color, border){
		this.grid = new Array(this.cols);
		for(var i = 0; i< this.cols; i++){
			this.grid[i] = new Array(this.rows);
			for(var j=0;j<this.rows;j++){
				this.grid[i][j] = new g.Cell(i,j);
				this.grid[i][j].color = color;
				this.grid[i][j].border = border;
			}
		}
	}

	Grid.prototype.getNeighbors8 = function(cell){
        var neighbors = [];

        if(cell.j > 0){
            if(cell.i > 0){
                neighbors.push(this.grid[cell.i-1][cell.j-1]);
            }
            neighbors.push(this.grid[cell.i][cell.j-1]);
            if(cell.i < this.cols-1){
                neighbors.push(this.grid[cell.i+1][cell.j-1]);
            }
        }

        if(cell.i > 0){
            neighbors.push(this.grid[cell.i-1][cell.j]);
        }

        if(cell.i < this.cols-1){
            neighbors.push(this.grid[cell.i+1][cell.j]);
        }

        if(cell.j < this.rows - 1){
            if(cell.i > 0){
                neighbors.push(this.grid[cell.i-1][cell.j+1]);
            }
            neighbors.push(this.grid[cell.i][cell.j+1]);
            if(cell.i < this.cols-1){
                neighbors.push(this.grid[cell.i+1][cell.j+1]);
            }
        }

        return neighbors;
    }


	Grid.prototype.update = function(dt){
		if(this.path){
			this.path.update(dt);
		}
	}

	Grid.prototype.render = function(ctx, alpha){
		for(var i=0;i<this.cols;i++){
			for(var j=0;j<this.rows;j++){
				this.grid[i][j].render(ctx, this.dw, this.dh);
			}
		}
		if(this.path){
			this.path.render(ctx, this.dw, this.dh);
		}
	}

	g.Grid = Grid;

})(window.gameJs);
