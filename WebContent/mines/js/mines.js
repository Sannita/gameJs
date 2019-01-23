(function(g, undefined) {

  var Mines = function(width, height, dw, dh, mines) {
    g.Grid.call(this, width, height, dw, dh);

    this.generate('rgb(196,196,196)', 'black');

    this.mines = mines;

    for(var n=0;n<mines;n++){
      var i = g.Utils.getRandomInt(0,this.cols-1);
      var j = g.Utils.getRandomInt(0,this.rows-1);
      this.grid[i][j].color = 'black';
      this.grid.bomb = true;
      this.grid[i][j].render = function(ctx, alpha){
        ctx.beginPath();
  		ctx.ellipse(Math.floor(this.i * dw + dw/2), Math.floor(this.j * dh + dh/2), dw / 4, dh / 4, 0,0, 2*Math.PI);
        ctx.fillStyle = this.color;
  		ctx.fill();
  		ctx.strokeStyle = this.border;
  		ctx.stroke();
      }
    }

    for(var i=0; i< this.cols; i++){
        for(var j=0;j<this.rows;j++){
            var cell = this.grid[i][j]
            if(cell.bomb)
                continue
            var neighbors = this.getNeighbors8(cell);
            var c = 0;
            for(var n = 0; n < neighbors.length; n++){
                if (neighbors[n].bomb)
                    c++;
            }
            cell.bombs = c;
            if( c > 0)
                cell.render = function(ctx, alpha){
                    //ctx.font = '8px Arial'
                    ctx.fillStyle = this.color;
            		ctx.fillText(this.bombs, Math.floor(this.i * dw + dw/2), Math.floor(this.j * dh + dh/2));
            	}
        }

    }

    this.activate();
  }

  Mines.prototype = Object.create(g.Grid.prototype);
  Mines.prototype.constructor = Mines;

/*
 Mines.prototype.handleInput = function(input) {

  }

  Mines.prototype.update = function(dt) {

  }

  Mines.prototype.render = function(ctx, alpha) {


  }
*/
  g.Mines = Mines;

})(window.gameJs);
