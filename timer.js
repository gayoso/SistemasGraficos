
var Timer = function(){
	
	this.start_time = 0;
}

Timer.prototype = {
	constructor: Timer,

	start: function(){
		this.start_time = performance.now();
	},

	elapsed_seconds: function(){
		return -(this.start_time - performance.now()) / 1000;
	},

	elapsed_miliseconds: function(){
		return -(this.start_time - performance.now());
	}
}