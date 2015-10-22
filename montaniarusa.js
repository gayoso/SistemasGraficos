

var MontaniaRusa = function(){
	Conjunto.call(this);
		/*** ESTOS PUNTOS SE USAN EN LA CREACION DE LAS CURVAS ***/
	// es un posible recorrido de la montaña rusa, puede ser otro da lo mismo
	
	var puntos = [];
	puntos.push(vec3.fromValues(5, 2, 0));
	puntos.push(vec3.fromValues(5, 2, 4));
	puntos.push(vec3.fromValues(5, 3, 5.5));
	puntos.push(vec3.fromValues(5, 4, 7));
	// giros horizontales
	puntos.push(vec3.fromValues(5, 6, 8));
	puntos.push(vec3.fromValues(7, 6.5, 10));
	puntos.push(vec3.fromValues(8, 6.25, 9.5));
	puntos.push(vec3.fromValues(8.5, 6, 9));
	puntos.push(vec3.fromValues(8, 6, 8.5));
	puntos.push(vec3.fromValues(7.5, 6, 9));
	puntos.push(vec3.fromValues(8, 5.75, 9.5));
	puntos.push(vec3.fromValues(8.5, 5.5, 9));
	puntos.push(vec3.fromValues(8, 5.25, 8.5));
	puntos.push(vec3.fromValues(7.5, 5.25, 9));
	puntos.push(vec3.fromValues(8, 5.25, 9.5));
	puntos.push(vec3.fromValues(8.5, 5, 9));
	// end
	puntos.push(vec3.fromValues(8.5, 4.5, 8));
	puntos.push(vec3.fromValues(8.75, 3, 5));
	puntos.push(vec3.fromValues(9, 5, 3));
	puntos.push(vec3.fromValues(8.8, 7, 4));
	puntos.push(vec3.fromValues(8.6, 5, 5));
	puntos.push(vec3.fromValues(8.5, 3, 4));
	puntos.push(vec3.fromValues(8.3, 3, 2));
	puntos.push(vec3.fromValues(8, 2.5, 0.5));
	puntos.push(vec3.fromValues(5, 2, 0));
	
	/*** DESCOMENTAR ESTO PARA CREAR UNA CURVA ***/
	
	this.curva1 = new Mesh( new Curva(puntos) );
	var m1 = mat4.create();
	var centro = this.curva1.getCenter();
	vec3.scale(centro, centro, -1);
	mat4.translate(m1, m1, centro);
	mat4.translate(m1, m1, vec3.fromValues(1, 0,0));
	this.curva1.setTransform(m1);
	this.add(this.curva1);

	this.curva2 = new Mesh(new Curva(puntos));
	var m2 = mat4.create();
	mat4.translate(m2, m2, centro);
	mat4.translate(m2, m2, vec3.fromValues(-1, 0,0));
	this.curva2.setTransform(m2);
	this.add(this.curva2);

	this.curvaCentral = new Mesh(new Curva(puntos));
	var m3 = mat4.create();
	mat4.translate(m3,m3,centro);
	mat4.translate(m3,m3,vec3.fromValues(0,-0.5,0));
	this.curvaCentral.setTransform(m3);
	this.add(this.curvaCentral)
	
}

MontaniaRusa.prototype = Object.create(Conjunto.prototype);
MontaniaRusa.prototype.constructor = MontaniaRusa;