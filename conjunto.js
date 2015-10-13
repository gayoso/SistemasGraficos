var Conjunto = function() {
	this.matrix_local = mat4.create();
	this.matrix_total = mat4.create();
	/*this.position = vec3.fromValues(0, 0, 0);
	this.scale = vec3.fromValues(1, 1, 1);
	this.rotation = vec3.fromValues(0, 0, 0);*/
	this.parent = null;
	this.children = [];
}

Conjunto.prototype = {

	constructor: Conjunto,
	
	// modifica los vertices segun una matriz de escala+rotacion+traslacion
	applyMatrix: function(m){
		// ver si esto esta bien, o la mult es al reves
		mat4.multiply(this.matrix_local, this.matrix_local, m);
	},
	
	// vuelve al estado inicial todos los vertices, aplica la transf y propaga los cambios a sus hijos
	setTransform: function(m){
		/*this.position = vec3.fromValues(0, 0, 0);
		this.scale = vec3.fromValues(1, 1, 1);
		this.rotation = vec3.fromValues(0, 0, 0);*/
		mat4.identity(this.matrix_local);
		this.applyMatrix(m);
		this.updateMatrix();
	},
	
	updateMatrix: function(){
		if(this.parent === null){
			mat4.copy(this.matrix_total, this.matrix_local);
		} else {
			// ver si esto esta bien, o la mult es al reves
			mat4.multiply(this.matrix_total, this.parent.matrix_total, this.matrix_total);
		}
		
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].updateMatrix();
		}
	},
	
	// agrega un hijo (y me agrego como padre en el hijo)
	add: function(object){
		object.parent = this;
		this.children.push(object);
	},
	
	// borra a un hijo (y se borra como padre en el hijo)
	remove: function(object){
		var index = this.children.indexOf(object);
		if(index !== -1){
			object.parent = null;
			this.children.splice(index, 1);
		}
	}
}