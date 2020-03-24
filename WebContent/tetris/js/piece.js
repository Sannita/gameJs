(function(g, undefined) {
  var colors = {
    i : 'rgb(255,0,0)',
    j : 'rgb(255,255,0)',
    l : 'rgb(255,0,255)',
    o : 'rgb(0,0,255)',
    s : 'rgb(0,255,255)',
    t : 'rgb(0,255,0)',
    z : 'rgb(255,165,0)'
  };

  var Piece = function(i, j, color, tiles) {
    g.Item.call(this);
    this.oldCol = i;
    this.col = i;
    this.oldRow = j;
    this.row = j;
    this.cells = [];
    this.color = color;
    this.tiles = tiles;
    this.tilesSize = Object.keys(tiles).length;
    this.currentTiles = g.Utils.getRandomInt(0, this.tilesSize - 1);
    this.setTiles(this.tiles[this.currentTiles]);
  }

  Piece.prototype = Object.create(g.Item.prototype);
  Piece.prototype.constructor = Piece;

  Piece.prototype.setTiles = function(tiles) {
    this.cells = [];
    var rows = tiles.length;
    var cols = tiles[0].length;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var c = tiles[j][i];
        if (c == 0) {
          continue;
        }
        var cell = new g.Cell(this.col + i, this.row + j);
        cell.color = this.color;
        cell.border = 'black';
        this.cells.push(cell);
      }
    }
  }

  Piece.prototype.rotateLeft = function() {

    this.currentTiles = (this.tilesSize + this.currentTiles - 1) % this.tilesSize;
    this.setTiles(this.tiles[this.currentTiles]);
  }

  Piece.prototype.rotateRight = function() {

    this.currentTiles = (this.tilesSize + this.currentTiles + 1) % this.tilesSize;
    this.setTiles(this.tiles[this.currentTiles]);
  }

  Piece.prototype.moveLeft = function() {

    this.oldCol = this.col;
    this.col--;
    for (var n = 0; n < this.cells.length; n++) {
      this.cells[n].i--;
    }
  }
  Piece.prototype.moveRight = function() {

    this.oldCol = this.col;
    this.col++;
    for (var n = 0; n < this.cells.length; n++) {
      this.cells[n].i++;
    }
  }
  Piece.prototype.moveUp = function() {

    this.oldRow = this.row;
    this.row--;
    for (var n = 0; n < this.cells.length; n++) {
      this.cells[n].j--;
    }
  }
  Piece.prototype.moveDown = function() {

    this.oldRow = this.row;
    this.row++;
    for (var n = 0; n < this.cells.length; n++) {
      this.cells[n].j++;
    }
  }



  Piece.prototype.render = function(ctx, dw, dh) {
    for (var n = 0; n < this.cells.length; n++) {
      var c = this.cells[n];
      c.render(ctx, dw, dh);
    }
  }

  var IPiece = function(i, j) {
    var tiles = {
      '0': [
        [1, 1, 1, 1]
      ],
      '1': [
        [1],
        [1],
        [1],
        [1]
      ]
    };
    Piece.call(this, i, j, colors['i'], tiles);
  }

  IPiece.prototype = Object.create(Piece.prototype);
  IPiece.prototype.constructor = IPiece;

  var JPiece = function(i, j) {
    var tiles = {
      '0': [
        [1, 1, 1],
        [0, 0, 1]
      ],
      '1': [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      '2': [
        [1, 0, 0],
        [1, 1, 1]
      ],
      '3': [
        [1, 1],
        [1, 0],
        [1, 0]
      ]
    };
    Piece.call(this, i, j, colors['j'], tiles);
  }

  JPiece.prototype = Object.create(Piece.prototype);
  JPiece.prototype.constructor = JPiece;

  var LPiece = function(i, j) {
    var tiles = {
      '0': [
        [0, 0, 1],
        [1, 1, 1]
      ],
      '1': [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      '2': [
        [1, 1, 1],
        [1, 0, 0]
      ],
      '3': [
        [1, 1],
        [0, 1],
        [0, 1]
      ]
    };
    Piece.call(this, i, j, colors['l'], tiles);
  }

  LPiece.prototype = Object.create(Piece.prototype);
  LPiece.prototype.constructor = LPiece;

  var SPiece = function(i, j) {
    var tiles = {
      '0': [
        [0, 1, 1],
        [1, 1, 0]
      ],
      '1': [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    };
    Piece.call(this, i, j, colors['s'], tiles);
  }

  SPiece.prototype = Object.create(Piece.prototype);
  SPiece.prototype.constructor = SPiece;

  var ZPiece = function(i, j) {
    var tiles = {
      '0': [
        [1, 1, 0],
        [0, 1, 1]
      ],
      '1': [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    };

    Piece.call(this, i, j, colors['z'], tiles);
  }

  ZPiece.prototype = Object.create(Piece.prototype);
  ZPiece.prototype.constructor = ZPiece;

  var TPiece = function(i, j) {
    var tiles = {
      '0': [
        [0, 1, 0],
        [1, 1, 1]
      ],
      '1': [
        [1, 0],
        [1, 1],
        [1, 0]
      ],
      '2': [
        [1, 1, 1],
        [0, 1, 0]
      ],
      '3': [
        [0, 1],
        [1, 1],
        [0, 1]
      ]
    };
    Piece.call(this, i, j, colors['t'], tiles);
  }

  TPiece.prototype = Object.create(Piece.prototype);
  TPiece.prototype.constructor = TPiece;

  var OPiece = function(i, j) {
    var tiles = {
      '0': [
        [1, 1],
        [1, 1]
      ]
    };

    Piece.call(this, i, j, colors['o'], tiles);
  }

  OPiece.prototype = Object.create(Piece.prototype);
  OPiece.prototype.constructor = OPiece;

  g.IPiece = IPiece;
  g.JPiece = JPiece;
  g.LPiece = LPiece;
  g.ZPiece = ZPiece;
  g.SPiece = SPiece;
  g.TPiece = TPiece;
  g.OPiece = OPiece;

})(window.gameJs);
