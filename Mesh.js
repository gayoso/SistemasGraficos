/****************************************
MESH
Esta clase es en definitiva un 'Conjunto' que tiene un objeto 'Geometry'
(medio sin sentido ahora, pero cuando haya que aplicar texturas van aca)
****************************************/

var Mesh = function(geometry){
	Conjunto.call(this)
	
	this.geometry = geometry !== undefined ? geometry : new Geometry(2, 2, GridType.PLANE);
	this.type = 'Mesh';
}

Mesh.prototype = Object.create(Conjunto.prototype);
Mesh.prototype.constructor = Mesh;

Mesh.prototype.updateMatrix = function(){
	/*if(this.parent === null){
		mat4.copy(this.matrix_total, this.matrix_local);
	} else {
		// ver si esto esta bien, o la mult es al reves
		mat4.multiply(this.matrix_total, this.parent.matrix_total, this.matrix_local);
	}
	
	for ( var i = 0, l = this.children.length; i < l; i ++ ) {
		this.children[i].updateMatrix();
	}*/
	Conjunto.prototype.updateMatrix.call(this);
	
	this.geometry.setTransform(this.matrix_total);
};

Mesh.prototype.render = function(){
	this.geometry.drawVertexGrid();
	Conjunto.prototype.render.call(this);
};

Mesh.prototype.add = function(object){
	if(object.type === 'Geometry'){
		this.geometry = object;
	} else {
		/*object.parent = this;
		this.children.push(object);*/
		Conjunto.prototype.add.call(this, object);
	}
};
