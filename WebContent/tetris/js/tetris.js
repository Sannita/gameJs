(function(g, undefined) {
  var Tetris = function(width, height, dw, dh) {
    g.Grid.call(this, width, height, dw, dh)
    this.id = 'board'

    this.cols = Math.floor(this.width / this.dw);
    this.rows = Math.floor(this.height / this.dh);

    this.generate('rgb(0,0,0)', 'rgb(0,0,0)');

    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (i == 0 || j == 0 || i == this.cols - 1 || j == this.rows - 1) {
          this.grid[i][j].color = 'rgb(127,127,127)';
          this.grid[i][j].border = 'rgb(63,63,63)';
          this.grid[i][j].value = 1;
        } else {
          this.grid[i][j].color = 'rgb(0,0,0)';
          this.grid[i][j].border = 'rgb(0,0,0)';
          this.grid[i][j].value = 0;
        }
      }
    }

    this.objId = 0;

    this.piece = this.newPiece();
    this.nextPiece = null;

    this.activate();
    this.piece.activate();

    this.lastUpdate = performance.now();
    this.lastMove = performance.now();
  }

  Tetris.prototype = Object.create(g.Grid.prototype);
  Tetris.prototype.constructor = Tetris;

  Tetris.prototype.checkLastMove = function() {
    var now = performance.now();
    var elapsed = now - this.lastMove;
    if (elapsed < 125) {
      return true;
    }
    this.lastMove = now;
    return false;
  }


  Tetris.prototype.newPiece = function() {
    var n = g.Utils.getRandomInt(0, 6);
    var p;
    if (n == 0) {
      p = new g.IPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 1) {
      p = new g.LPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 2) {
      p = new g.SPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 3) {
      p = new g.JPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 4) {
      p = new g.ZPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 5) {
      p = new g.OPiece(Math.floor(this.cols / 2), 1);
    }
    if (n == 6) {
      p = new g.TPiece(Math.floor(this.cols / 2), 1);
    }
    p.id = this.objId++;
    return p;

  }

  Tetris.prototype.checkRows = function() {
    for (var i = this.rows - 2; i >= 1; i--) {
      var full = true;
      var empty = true;
      for (var j = 1; j < this.cols - 1; j++) {
        empty = empty && (this.grid[j][i].value == 0);
        full = full && (this.grid[j][i].value == 1);
      }
      if (empty) {
        return;
      }

      if (full) {
        this.deleteRow(i);
      }
      full = true;
      empty = true;
    }
  }

  Tetris.prototype.deleteRow = function(row) {
    for (var i = row; i > 1; i--) {
      var empty = true;
      for (var j = 1; j < this.cols - 1; j++) {
        empty = empty && (this.grid[j][i].value == 0);
        this.grid[j][i].color = this.grid[j][i - 1].color;
        this.grid[j][i].value = this.grid[j][i - 1].value;
      }
      if (empty) {
        return;
      }
      empty = true;
    }
  }

  Tetris.prototype.checkCollision = function(direction) {
    var current = this.piece.tiles[this.piece.currentTiles];
    var collision = false;
    for (var n = 0; n < this.piece.cells.length; n++) {
      var c = this.piece.cells[n];
      if (direction == 'left') {
        collision = collision || (this.grid[c.i - 1][c.j].value == 1);
      }
      if (direction == 'right') {
        collision = collision || (this.grid[c.i + 1][c.j].value == 1);
      }
      if (direction == 'down') {
        collision = collision || (this.grid[c.i][c.j + 1].value == 1);
      }
    }

    return collision;
  }

  Tetris.prototype.handleInput = function(input) {
    if (this.checkLastMove()) {
      return;
    }
    var current = this.piece.tiles[this.piece.currentTiles];
    if (input['KeyQ']) {
      this.piece.rotateLeft();
      if(this.checkCollision('left') && this.checkCollision('right')){
        this.piece.rotateRight();
      }else
      if (this.checkCollision('left')) {
        this.piece.moveRight();
      }else
      if (this.checkCollision('right')) {
        this.piece.moveLeft();
      }
    } else if (input['KeyW']) {
      this.piece.moveUp();
    } else if (input['KeyE']) {
      this.piece.rotateRight();
      if(this.checkCollision('left') && this.checkCollision('right')){
        this.piece.rotateLeft();
      }else
      if (this.checkCollision('left')) {
        this.piece.moveRight();
      }else
      if (this.checkCollision('right')) {
        this.piece.moveLeft();
      }
    } else if (input['KeyA'] && !this.checkCollision('left')) {
      this.piece.moveLeft();
    } else if (input['KeyS'] && !this.checkCollision('down')) {
      this.piece.moveDown();
    } else if (input['KeyD'] && !this.checkCollision('right')) {
      this.piece.moveRight();
    }

  }

  Tetris.prototype.update = function(dt) {
    this.checkRows();
    var now = performance.now();
    if ((now - this.lastUpdate) < 500) {
      return;
    }
    var collision = this.checkCollision('down');
    if (collision) {
      if (this.nextPiece) {
        for (var n = 0; n < this.piece.cells.length; n++) {
          var c = this.piece.cells[n];
          this.grid[c.i][c.j].color = c.color;
          this.grid[c.i][c.j].value = 1;
        }
        this.nextPiece.activate();
        this.piece = this.nextPiece;
        this.nextPiece = null;
      } else {
        this.nextPiece = this.newPiece();
      }

    } else {
      this.piece.moveDown();
    }

    this.lastUpdate = now;
  }

  Tetris.prototype.render = function(ctx, alpha) {
    g.Grid.prototype.render.call(this, ctx, alpha);
    this.piece.render(ctx, this.dw, this.dh);
  }

  g.Tetris = Tetris;

})(window.gameJs);
