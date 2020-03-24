(function(g,undefined){

	var InputData = function(){
		this.keys = {};
	};

  var InputListener = function()
	{
	  var data = data || new InputData;

    window.addEventListener('keydown', function(key){
      data.keys[key.code] = true;
      //console.log(data);
    });

    window.addEventListener('keyup', function(key){
        data.keys[key.code] = false;
      //console.log(data);
    });

    g.utils.bindPublicProtoFunctions(this, data);
	}
/*
  InputListener.prototype.setKey_ = function(data, key){
    if(!(data instanceof InputData))
      throw new Error('Trying to call private method');
    data[key] = true;
    console.log(data);
  }

  InputListener.prototype.unsetKey_  = function(data, key){
    if(!(data instanceof InputData))
      throw new Error('Trying to call private method');
    data[key] = false;
    console.log(data);
  }
*/
  InputListener.prototype.getInput = function(data){
    return data.keys;
  }

	g.InputListener = InputListener;
})(window.gameJs);
