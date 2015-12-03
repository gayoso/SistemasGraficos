

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
	var j = 0;
	var ultimoPunto = vec3.create();
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
		var otroPunto = vec3.create();
		vec3.subtract(otroPunto, puntoBase, binormal);
		puntosExterior.push(otroPunto);
		var baseMasDerivada = vec3.create();
		vec3.normalize(derivada, derivada);
		vec3.scale(derivada, derivada, 10);
		var baseMasDerivadaSobreDos = vec3.create();
		vec3.add(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, binormal);
		vec3.scale(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, 0.5);
		vec3.add(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, puntoBase);
		vec3.add(baseMasDerivada, puntoBase, binormal);
		vec3.add(puntoBase, puntoBase, vec3.fromValues(0, -0.5 ,0));
		var puntosDerivada = [puntoNuevo, puntoBase, otroPunto];
		var flechaDerivada = new Mesh(new Curva(puntosDerivada));
		var matriz = mat4.create();
		var c = curva.getCenter();
		vec3.scale(c, c, -1);
		mat4.translate(matriz, matriz, c);
		flechaDerivada.setTransform(matriz);
		if(j == 0){
			this.add(flechaDerivada);
		}
		var baseMasDerivada = vec3.create();
		vec3.normalize(derivada, derivada);
		vec3.scale(derivada, derivada, 10);
		var baseMasDerivadaSobreDos = vec3.create();
		vec3.subtract(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, binormal);
		vec3.scale(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, 0.5);
		vec3.add(baseMasDerivadaSobreDos, baseMasDerivadaSobreDos, puntoBase);
		vec3.subtract(baseMasDerivada, puntoBase, binormal);
		puntosDerivada = [puntoBase, baseMasDerivadaSobreDos, baseMasDerivada];
		flechaDerivada = new Mesh(new Curva(puntosDerivada));
		matriz = mat4.create();
		mat4.translate(matriz, matriz, c);
		flechaDerivada.setTransform(matriz);
		j = (j+1) % 2;
		if(vec3.distance(ultimoPunto, puntoBase) < 0.00005){
			j = (j+1)%2;
		}
		//this.add(flechaDerivada);
		ultimoPunto = vec3.clone(puntoBase);
		
		
	}
	this.curvaCentral = new Mesh(new Curva(puntos));
	var m3 = mat4.create();
	var centro = this.curvaCentral.getCenter();
	vec3.scale(centro, centro, -1);

	mat4.translate(m3,m3,centro);
	mat4.translate(m3,m3,vec3.fromValues(0,-0.5,0));
	this.curvaCentral.setTransform(m3);
	this.add(this.curvaCentral)
	
	puntosInterior[puntosInterior.length - 1] = puntosInterior[0];
	this.curva1 = new Mesh( new Curva(puntosInterior) );
	var m1 = mat4.create();
	//var centro = this.curva1.getCenter();
	//vec3.scale(centro, centro, -1);
	mat4.translate(m1, m1, centro);
	this.curva1.setTransform(m1);
	this.add(this.curva1); 

	puntosExterior[puntosExterior.length - 1] = puntosExterior[0];
	this.curva2 = new Mesh(new Curva(puntosExterior));
	var m2 = mat4.create();
	//var centro = this.curva2.getCenter();
	//vec3.scale(centro, centro, -1);
	mat4.translate(m2, m2, centro);
	//mat4.translate(m2, m2, vec3.fromValues(-1, 0,0));
	this.curva2.setTransform(m2);
	this.add(this.curva2);
	

	
}

MontaniaRusa.prototype = Object.create(Conjunto.prototype);
MontaniaRusa.prototype.constructor = MontaniaRusa;