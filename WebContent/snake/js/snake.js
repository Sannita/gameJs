(function(g, undefined) {
  var directions = {
    UP : 0,
    DOWN : 1,
    LEFT : 2,
    RIGHT : 3
  };

  var Snake = function(width, height, dw, dh) {
    g.Item.call(this);

    this.dw = dw;
    this.dh = dh;
    this.width = width;
    this.height = height;
    this.cols = Math.floor(width/dw);
    this.rows = Math.floor(height/dh);

    this.body = null;
    this.head = null;
    this.oldTail = null;

    this.direction = null;
    this.food = null;

    this.init();

    this.activate();
  }

  Snake.prototype = Object.create(g.Item.prototype);
  Snake.prototype.constructor = Snake;

  Snake.prototype.init = function() {
    this.body = [];
    var i = Math.floor(this.cols / 2);
    var j = Math.floor(this.rows / 2);

    var t = new g.Cell(i-1, j);
    this.body.push(t);
    this.oldTail = t;
    var h = new g.Cell(i, j);
    this.body.push(h);

    this.direction = directions.RIGHT;
    this.addFood();
  }

  Snake.prototype.addFood = function(){
    var i = g.Utils.getRandomInt(0, this.cols - 1);
    var j = g.Utils.getRandomInt(0, this.rows - 1);
    var c = new g.Cell(i, j);
    c.color = 'black';
    c.border = 'black';
    c.render = function(ctx, dw, dh){
  		ctx.beginPath();
      ctx.ellipse(this.i * dw + dw/2, this.j * dh + dh/2, dw / 4, dh / 4, 0, 0 , 2 * Math.PI);
      ctx.fillStyle = this.color;
  		ctx.fill();
  		ctx.strokeStyle = this.border;
  		ctx.stroke();
  	}
    this.food = c;
  }

  Snake.prototype.outOfBounds = function(head) {
    return head.i < 0 || head.i > this.cols - 1 || head.j < 0 || head.j > this.rows - 1;
  }

  Snake.prototype.collide = function(head) {
    for(var i=0;i<this.body.length - 2; i++){
      if(this.body[i].i == head.i && this.body[i].j == head.j){
        return true;
      }
    }
    return false;
  }

  Snake.prototype.handleInput = function(input) {
    if(input['KeyW'] && this.direction != directions.DOWN){
      this.direction = directions.UP;
    }else if(input['KeyS'] && this.direction != directions.UP){
      this.direction = directions.DOWN;
    }else if(input['KeyA'] && this.direction != directions.RIGHT){
      this.direction = directions.LEFT;
    }else if(input['KeyD'] && this.direction != directions.LEFT){
      this.direction = directions.RIGHT;
    }
  }

  Snake.prototype.update = function(dt) {
    var head = this.body.pop();
    this.body.push(head);

    if(this.collide(head)){
      this.deActivate();
      return;
    }

    var c = new g.Cell(0,0);

    if(this.direction == directions.UP){
      c.i = head.i;
      c.j = head.j - 1;
    }else if(this.direction == directions.DOWN){
      c.i = head.i;
      c.j = head.j + 1;
    }else if(this.direction == directions.LEFT){
      c.i = head.i - 1;
      c.j = head.j;
    }else if(this.direction == directions.RIGHT){
      c.i = head.i + 1;
      c.j = head.j;
    }

    if(this.outOfBounds(c)){
      this.deActivate();
      return;
    }else{
      this.body.push(c);
    }

    var grow = head.i == this.food.i && head.j == this.food.j;
    if(!grow){
      this.oldTail = this.body.shift();
    }else{
      this.addFood();
    }
  }

  Snake.prototype.render = function(ctx, alpha) {

    var dw = this.dw;
    var dh = this.dh;
    this.food.render(ctx,dw,dh);

    var start = this.body[0];
    var old = this.oldTail;
    var head = this.body[this.body.length - 1];

    if(!this.isActive()){
      alpha = 1;
    }
    var x = alpha * (start.i*dw + dw/2) + (1 - alpha) * (old.i*dw + dw/2);
    var y = alpha * (start.j*dh + dh/2) + (1 - alpha) * (old.j*dh + dh/2);

    ctx.save();
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = 15;
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(x , y);
    for(var i=1;i<this.body.length;i++){
       var prev = this.body[i-1];
			 var curr = this.body[i];
       var x1 = alpha * (curr.i*dw + dw/2) + (1 - alpha) * (prev.i*dw + dw/2);
       var y1 = alpha * (curr.j*dh + dh/2) + (1 - alpha) * (prev.j*dh + dh/2);

       ctx.lineTo(x1,y1);
    }
		ctx.stroke();
    ctx.restore();

  }

  g.Snake = Snake;

})(window.gameJs);
