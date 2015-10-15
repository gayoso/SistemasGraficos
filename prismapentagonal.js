
var PrismaPentagonal = function(){
	
	Cilindro.call(this, this.gridType);
}

PrismaPentagonal.prototype = Object.create(Cilindro.prototype);
PrismaPentagonal.prototype.constructor = PrismaPentagonal;

PrismaPentagonal.prototype.setRows = function(){
	this.rows = 2;
}

PrismaPentagonal.prototype.setCols = function(){
	this.cols = 6;
}