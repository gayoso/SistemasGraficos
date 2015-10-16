
var PrismaTriangular = function(){
	
	Cilindro.call(this);
	
	mat_1 = mat4.create();
	//mat4.scale(mat_1, mat_1, vec3.fromValues(1, 1.41, 1));
	mat4.rotate(mat_1, mat_1, Math.PI/2, vec3.fromValues(0, 0, 1));
	this.applyMatrix(mat_1);
}

PrismaTriangular.prototype = Object.create(Cilindro.prototype);
PrismaTriangular.prototype.constructor = PrismaTriangular;

PrismaTriangular.prototype.setRows = function(){
	this.rows = 2;
}

PrismaTriangular.prototype.setCols = function(){
	this.cols = 4;
}