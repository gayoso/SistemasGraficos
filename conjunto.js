/****************************************
CONJUNTO
Esta clase sirve para armar conjuntos logicos de objetos
No representa nada que se dibuje, pero dibuja y aplica transformaciones a todos sus hijos
****************************************/

var Conjunto = function() {
	this.matrix_local = mat4.create();
	this.matrix_total = mat4.create();
	/*this.position = vec3.fromValues(0, 0, 0);
	this.scale = vec3.fromValues(1, 1, 1);
	this.rotation = vec3.fromValues(0, 0, 0);*/
	this.parent = null;
	this.children = [];
	this.type = 'Conjunto';
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
		/*mat4.identity(this.matrix_local);
		this.applyMatrix(m);*/
		mat4.copy(this.matrix_local, m);
		this.updateMatrix();
	},
	
	updateMatrix: function(){
		if(this.parent === null){
			mat4.copy(this.matrix_total, this.matrix_local);
		} else {
			// ver si esto esta bien, o la mult es al reves
			mat4.multiply(this.matrix_total, this.parent.matrix_total, this.matrix_local);
		}
		
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].updateMatrix();
		}
	},
	
	// agrega un hijo (y me agrego como padre en el hijo)
	add: function(object){
		if(object.type === 'Geometry'){
			tempMesh = new Mesh(object);
			this.add(tempMesh);
		} else {
			object.parent = this;
			this.children.push(object);
		}
	},
	
	// borra a un hijo (y se borra como padre en el hijo)
	remove: function(object){
		var index = this.children.indexOf(object);
		if(index !== -1){
			object.parent = null;
			this.children.splice(index, 1);
		}
	},
	
	render: function(){
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].render();
		}
	}
}