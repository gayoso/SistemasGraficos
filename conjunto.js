/****************************************
CONJUNTO
Esta clase sirve para armar conjuntos logicos de objetos
No representa nada que se dibuje, pero dibuja y aplica transformaciones a todos sus hijos
****************************************/

var Conjunto = function() {
	this.matrix_local = mat4.create();
	this.matrix_total = mat4.create();
	this.parent = null;
	this.children = [];
	//this.type = 'Conjunto';
}

Conjunto.prototype = {

	constructor: Conjunto,
	
	clone: function(){		
		var clon = new this.constructor();
		clon.matrix_local = mat4.clone(this.matrix_local);
		clon.matrix_total = mat4.clone(this.matrix_total);
		if(this.parent !== null)
			this.parent.add(clon);
		for(var i = 0; i < this.children.length; i++){
			clon.add(this.children[i].clone());
		}
		return clon;
	},
	
	// modifica los vertices segun una matriz de escala+rotacion+traslacion
	applyMatrix: function(m){
		mat4.multiply(this.matrix_local, m, this.matrix_local);
		//this.updateMatrix();
		/*for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].applyMatrix(m);
		}*/
	},
	
	// vuelve al estado inicial todos los vertices, aplica la transf y propaga los cambios a sus hijos
	setTransform: function(m){
		/*mat4.identity(this.matrix_local);
		this.applyMatrix(m);*/
		mat4.copy(this.matrix_local, m);
		//this.updateMatrix();
		
		/*for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].setTransform(m);
		}*/
	},
	
	updateMatrix: function(){
		if(this.parent === null){
			mat4.copy(this.matrix_total, this.matrix_local);
		} else {
			// ver si esto esta bien, o la mult es al reves
			mat4.multiply(this.matrix_total, this.parent.matrix_total, this.matrix_local);
		}
		
		/*for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].updateMatrix();
		}*/
	},
	
	get: function(i){
		return this.children[i];
	},
	
	// agrega un hijo (y me agrego como padre en el hijo)
	add: function(object){
		if(object.parent !== null)
			object.parent.remove(object);
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
	},
	
	render: function(m){
		var m_final = mat4.create();
		if(m !== undefined){
			mat4.multiply(m_final, m, this.matrix_local);
		}
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			if(m !== undefined)
				this.children[i].render(m_final);
			else
				this.children[i].render(this.matrix_local);
		}
	},
	
	getCenter: function(m){
		if(m === undefined) m = mat4.create();
		var m_final = mat4.create();
		mat4.multiply(m_final, m, this.matrix_local);
		var centro_hijos = vec3.fromValues(0, 0, 0);
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			var centro_hijo = this.children[i].getCenter(m_final);
			vec3.add(centro_hijos, centro_hijos, centro_hijo);
		}
		vec3.scale(centro_hijos, centro_hijos, 1/this.children.length);
		return centro_hijos;
	},
	
	setColor: function(color){
		for ( var i = 0, l = this.children.length; i < l; i ++ ) {
			this.children[i].setColor(color);
		}
	}
}