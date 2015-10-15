
var PrismaHexagonal = function(){
	
	Cilindro.call(this, this.gridType);
}

PrismaHexagonal.prototype = Object.create(Cilindro.prototype);
PrismaHexagonal.prototype.constructor = PrismaHexagonal;

PrismaHexagonal.prototype.setRows = function(){
	this.rows = 2;
}

PrismaHexagonal.prototype.setCols = function(){
	this.cols = 7;
}