
var Cubo = function(){
	
	Cilindro.call(this);
}

Cubo.prototype = Object.create(Cilindro.prototype);
Cubo.prototype.constructor = Cubo;

Cilindro.prototype.setRows = function(){
	this.rows = 2;
}

Cilindro.prototype.setCols = function(){
	this.cols = 5;
}