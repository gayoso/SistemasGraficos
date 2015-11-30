

var MontaniaRusa = function(){
	Conjunto.call(this);
		/*** ESTOS PUNTOS SE USAN EN LA CREACION DE LAS CURVAS ***/
	// es un posible recorrido de la montaña rusa, puede ser otro da lo mismo
	
	var puntos = [];
	puntos.push(vec3.fromValues(0, 0, 0));
	puntos.push(vec3.fromValues(20, 0, 0));
	puntos.push(vec3.fromValues(20, 0, 20));
	puntos.push(vec3.fromValues(0, 10, 20));
	puntos.push(vec3.fromValues(0, 20, 0));
	puntos.push(vec3.fromValues(0, 30, -20));
	puntos.push(vec3.fromValues(-20, 20, -20));
	puntos.push(vec3.fromValues(-20, 10, -10));
	puntos.push(vec3.fromValues(-20, 0, 0));
	puntos.push(vec3.fromValues(0, 0, 0));

	var puntosArray = [];
	puntosArray.push([0, 0, 0]);
	puntosArray.push([20, 0, 0]);
	puntosArray.push([20, 0, 20]);
	puntosArray.push([0, 10, 20]);
	puntosArray.push([0, 20, 0]);
	puntosArray.push([0, 30, -20]);
	puntosArray.push([-20, 20, -20]);
	puntosArray.push([-20, 10, -10]);
	puntosArray.push([-20, 0, 0]);
	puntosArray.push([0, 0, 0]);

	var puntosCentral = [];
	var puntosExterior = [];
	var puntosInterior = [];



	var curva = new Curva(puntos);
	var derivadas = curva.getDerivada();
	for (var i = 0; i < derivadas.length; i++){
		var puntoDerivado = derivadas[i];
		var puntoBase = puntoDerivado[0];
		var derivada = puntoDerivado[1];
		var binormal = vec3.create();
		vec3.normalize(derivada, derivada);
		vec3.cross(binormal, derivada, vec3.fromValues(0,1,0));
		vec3.scale(binormal, binormal, 2);
		var puntoNuevo = vec3.create();
		vec3.add(puntoNuevo, puntoBase, binormal);
		puntosInterior.push(puntoNuevo);
		var puntoNuevo = vec3.create();
		vec3.subtract(puntoNuevo, puntoBase, binormal);
		puntosExterior.push(puntoNuevo);
	}
	
	this.curva1 = new Mesh( new Curva(puntosInterior) );
	var m1 = mat4.create();
	var centro = this.curva1.getCenter();
	vec3.scale(centro, centro, -1);
	mat4.translate(m1, m1, centro);
	this.curva1.setTransform(m1);
	this.add(this.curva1); 

	this.curva2 = new Mesh(new Curva(puntosExterior));
	var m2 = mat4.create();
	var centro = this.curva2.getCenter();
	vec3.scale(centro, centro, -1);
	mat4.translate(m2, m2, centro);
	//mat4.translate(m2, m2, vec3.fromValues(-1, 0,0));
	this.curva2.setTransform(m2);
	this.add(this.curva2);
	
	this.curvaCentral = new Mesh(new Curva(puntos));
	var m3 = mat4.create();
	var centro = this.curvaCentral.getCenter();
	vec3.scale(centro, centro, -1);

	mat4.translate(m3,m3,centro);
	//mat4.translate(m3,m3,vec3.fromValues(0,-0.5,0));
	this.curvaCentral.setTransform(m3);
	this.add(this.curvaCentral)
	
}

MontaniaRusa.prototype = Object.create(Conjunto.prototype);
MontaniaRusa.prototype.constructor = MontaniaRusa;