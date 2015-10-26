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

Mesh.prototype.clone = function(){
	var clon = Conjunto.prototype.clone.call(this);
	clon.geometry = this.geometry.clone();
	return clon;
}

Mesh.prototype.updateMatrix = function(){
	Conjunto.prototype.updateMatrix.call(this);
	
	//this.geometry.setTransform(this.matrix_total);
};

Mesh.prototype.moveVertex = function(i, x, y, z){
	this.geometry.moveVertex(i, x, y, z);
};

Mesh.prototype.render = function(m){
	var m_final = mat4.create();
	if(m === undefined) m = mat4.create();
	mat4.multiply(m_final, m, this.matrix_local);
	this.geometry.drawVertexGrid(m_final);
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
	//this.geometry.applyMatrix(m);
	//mat4.multiply(this.matrix_local, m, this.matrix_local);
	Conjunto.prototype.applyMatrix.call(this, m);
};

Mesh.prototype.getCenter = function(m){
	if(m === undefined) m = mat4.create();
	var m_final = mat4.create();
	mat4.multiply(m_final, m, this.matrix_local);
	var centro = this.geometry.getCenter(m_final);
	if(this.children.length > 0){
		var hijos_centro = Conjunto.prototype.getCenter.call(this);
		vec3.add(centro, centro, hijos_centro);
		vec3.scale(centro, centro, 0.5);
	}
	return centro;
};

Mesh.prototype.setColor = function(color){
	//Conjunto.prototype.setColor.call(color);
	this.geometry.setColor(color);
};