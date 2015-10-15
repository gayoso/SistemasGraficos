/****************************************
MESH
Esta clase es en definitiva un 'Conjunto' que tiene un objeto 'Geometry'
(medio sin sentido ahora, pero cuando haya que aplicar texturas van aca)
****************************************/

var Mesh = function(geometry){
	Conjunto.call(this);
	
	this.geometry = geometry;
	//this.type = 'Mesh';
}

Mesh.prototype = Object.create(Conjunto.prototype);
Mesh.prototype.constructor = Mesh;

Mesh.prototype.updateMatrix = function(){
	Conjunto.prototype.updateMatrix.call(this);
	
	this.geometry.setTransform(this.matrix_total);
};

Mesh.prototype.render = function(){
	this.geometry.drawVertexGrid();
	Conjunto.prototype.render.call(this);
};

Mesh.prototype.add = function(object){
	if(object instanceof Geometry){
		this.geometry = object;
	} else {
		Conjunto.prototype.add.call(this, object);
	}
};

// modifica los vertices segun una matriz de escala+rotacion+traslacion
Mesh.prototype.applyMatrix = function(m){
	this.geometry.applyMatrix(m);
	Conjunto.prototype.applyMatrix.call(this, m);
};

Mesh.prototype.getCenter = function(){
	var centro = this.geometry.getCenter();
	if(this.children.length > 0){
		var hijos_centro = Conjunto.prototype.getCenter.call(this);
		vec3.add(centro, centro, hijos_centro);
		vec3.scale(centro, centro, 0.5);
	}
	return centro;
}
