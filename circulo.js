
var Circulo = function(){
	
	Cilindro.call(this, this.gridType);
}

Circulo.prototype = Object.create(Cilindro.prototype);
Circulo.prototype.constructor = Circulo;

Circulo.prototype.setRows = function(){
	this.rows = 1;
}

Circulo.prototype.setCols = function(){
	this.cols = 50;
}