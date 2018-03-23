(function(g,undefined){
  var StateData = function(){
    var state = this;
    state.imageData = null;
  };

	var BaseState = function(data){
    var data = data || new StateData();

    g.utils.bindPublicProtoFunctions(this, data);
 }

	BaseState.prototype.preRender = function(data, item){
		data.imageData = g.utils.preRender(item.w, item.h, function(ctx){
			ctx.beginPath();
			ctx.rect(1,1,data.w,data.h);
			ctx.fillStyle = data.color;
			ctx.fill();
			ctx.stroke();
		});
	}

	BaseState.prototype.handleInput = function(data, item, input){

	}

	BaseState.prototype.enter = function(data, item, input){

	}

	BaseState.prototype.update = function(data, item, world, physics){

	}

	BaseState.prototype.render = function(data, item, ctx, alpha){
		alpha = alpha || 1;

		var x = alpha * item.x + (1 - alpha) * item.oldX;
		var y = alpha * item.y + (1 - alpha) * item.oldY;

		ctx.drawImage(data.imageData, x, y);
	}

  g.items.StateData = StateData;
  g.items.BaseState = BaseState;
})(window.gameJs);
