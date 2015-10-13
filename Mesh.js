var Mesh = function(geometry){
	Conjunto.call(this)
	
	this.geometry = geometry !== undefined ? geometry : new Geometry(2, 2, GridType.PLANE);
}

Mesh.prototype = Object.create(Conjunto.prototype);
Mesh.prototype.constructor = Mesh;

Mesh.prototype.updateMatrix = function(){
	if(this.parent === null){
		mat4.copy(this.matrix_total, this.matrix_local);
	} else {
		// ver si esto esta bien, o la mult es al reves
		mat4.multiply(this.matrix_total, this.parent.matrix_total, this.matrix_total);
	}
	
	this.geometry.setTransform(this.matrix_total);
	
	for ( var i = 0, l = this.children.length; i < l; i ++ ) {
		this.children[i].updateMatrix();
	}
};
