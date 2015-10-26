

var MontaniaRusa = function(){
	Conjunto.call(this);
		/*** ESTOS PUNTOS SE USAN EN LA CREACION DE LAS CURVAS ***/
	// es un posible recorrido de la montaña rusa, puede ser otro da lo mismo
	
	var puntos = [];
	puntos.push(vec3.fromValues(0, 0, 0));
	puntos.push(vec3.fromValues(4, 0, 0));
	puntos.push(vec3.fromValues(4, 0, 4));
	puntos.push(vec3.fromValues(0, 2, 4));
	puntos.push(vec3.fromValues(0, 4, 0));
	puntos.push(vec3.fromValues(0, 6, -4));
	puntos.push(vec3.fromValues(-4, 4, -4));
	puntos.push(vec3.fromValues(-4, 2, -2));
	puntos.push(vec3.fromValues(-4, 0, 0));
	puntos.push(vec3.fromValues(0, 0, 0));
	
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