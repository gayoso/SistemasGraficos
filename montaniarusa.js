

var MontaniaRusa = function(){
	this.timer = new Timer();
	this.timer.start();
	Conjunto.call(this);
		/*** ESTOS PUNTOS SE USAN EN LA CREACION DE LAS CURVAS ***/
	// es un posible recorrido de la montaña rusa, puede ser otro da lo mismo
	

	this.puntos = [];
	
	this.puntos.push(vec3.fromValues(0, 0, 0));
	this.puntos.push(vec3.fromValues(20, 0, 0));
	this.puntos.push(vec3.fromValues(20, 0, 20));
	this.puntos.push(vec3.fromValues(0, 10, 20));
	this.puntos.push(vec3.fromValues(0, 20, 0));
	this.puntos.push(vec3.fromValues(0, 30, -20));
	this.puntos.push(vec3.fromValues(0, 30, -40));
	this.puntos.push(vec3.fromValues(-15, 25, -45));
	this.puntos.push(vec3.fromValues(-15, 20, -30));
	this.puntos.push(vec3.fromValues(0, 20, -30));
	this.puntos.push(vec3.fromValues(0, 15, -45));
	this.puntos.push(vec3.fromValues(-20, 15, -45));
	this.puntos.push(vec3.fromValues(-20, 10, -20));

	this.puntos.push(vec3.fromValues(-20, 10, -10));
	this.puntos.push(vec3.fromValues(-20, 0, 0));
	this.puntos.push(vec3.fromValues(0, 0, 0));
 
	/*
	var puntos = [];
	puntos.push(vec3.fromValues(20, 8, 0));
	puntos.push(vec3.fromValues(20, 8, 16));
	puntos.push(vec3.fromValues(20, 12, 22));
	puntos.push(vec3.fromValues(20, 16, 28));
	// giros horizontales
	puntos.push(vec3.fromValues(20, 24, 32));
	puntos.push(vec3.fromValues(28, 26, 40));
	puntos.push(vec3.fromValues(32, 25, 38));
	puntos.push(vec3.fromValues(34, 24, 36));
	puntos.push(vec3.fromValues(32, 24, 34));
	puntos.push(vec3.fromValues(30, 24, 36));
	puntos.push(vec3.fromValues(32, 23, 38));
	puntos.push(vec3.fromValues(34, 22, 36));
	puntos.push(vec3.fromValues(32, 21, 34));
	puntos.push(vec3.fromValues(30, 21, 36));
	puntos.push(vec3.fromValues(32, 21, 38));
	puntos.push(vec3.fromValues(34, 20, 36));
	// end
	puntos.push(vec3.fromValues(34, 18, 32));
	puntos.push(vec3.fromValues(35, 12, 20));
	puntos.push(vec3.fromValues(36, 20, 12));
	puntos.push(vec3.fromValues(8.8*4, 28, 16));
	puntos.push(vec3.fromValues(8.6*4, 20, 20));
	puntos.push(vec3.fromValues(34, 12, 16));
	puntos.push(vec3.fromValues(8.3*4, 12, 8));
	puntos.push(vec3.fromValues(32, 10, 8));
	puntos.push(vec3.fromValues(20, 8, 0));*/


	var puntosArray = [];
	
	puntosArray.push([0, 0, 0]);
	puntosArray.push([20, 0, 0]);
	puntosArray.push([20, 0, 20]);
	puntosArray.push([0, 10, 20]);
	puntosArray.push([0, 20, 0]);
	puntosArray.push([0, 30, -20]);	
	puntosArray.push([0, 30, -40]);
	puntosArray.push([-15, 25, -45]);
	puntosArray.push([-15, 20, -30]);
	puntosArray.push([0, 20, -30]);
	puntosArray.push([0, 15, -45]);
	puntosArray.push([-20, 15, -45]);
	puntosArray.push([-20, 10, -20]);
	puntosArray.push([-20, 10, -10]);
	puntosArray.push([-20, 0, 0]);
	puntosArray.push([0, 0, 0]);
/*
	puntosArray.push([20, 8, 0]);
	puntosArray.push([20, 8, 16]);
	puntosArray.push([20, 12, 22]);
	puntosArray.push([20, 16, 28]);
	// giros horizontales
	puntosArray.push([20, 24, 32]);
	puntosArray.push([28, 26, 40]);
	puntosArray.push([32, 25, 38]);
	puntosArray.push([34, 24, 36]);
	puntosArray.push([32, 24, 34]);
	puntosArray.push([30, 24, 36]);
	puntosArray.push([32, 23, 38]);
	puntosArray.push([34, 22, 36]);
	puntosArray.push([32, 21, 34]);
	puntosArray.push([30, 21, 36]);
	puntosArray.push([32, 21, 38]);
	puntosArray.push([34, 20, 36]);
	// end
	puntosArray.push([34, 18, 32]);
	puntosArray.push([35, 12, 20]);
	puntosArray.push([36, 20, 12]);
	puntosArray.push([8.8*4, 28, 16]);
	puntosArray.push([8.6*4, 20, 20]);
	puntosArray.push([34, 12, 16]);
	puntosArray.push([8.3*4, 12, 8]);
	puntosArray.push([32, 10, 8]);
	puntosArray.push([20, 8, 0]);*/






	var puntosCentral = [];
	var puntosExterior = [];
	var puntosInterior = [];
	this.tablas = new Conjunto();
	this.columnas = new Conjunto();
	this.carrito = new Carrito();
	this.add(this.carrito);
	var curva = new Curva(this.puntos);
	var derivadas = curva.getDerivada();
	var j = 1;
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
			this.tablas.add(flechaDerivada);
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
		if(vec3.distance(ultimoPunto, puntoBase) < 0.2){
			j = (j+1)%2;
		}
		if((i+1)%10 == 0){
			var puntoPiso = vec3.clone(puntoBase);
			puntoPiso[1] = -50;
			var puntoMedio = vec3.create();
			vec3.add(puntoMedio, puntoBase, puntoPiso);
			vec3.scale(puntoMedio, puntoMedio, 0.5);
			var puntosColumna = [puntoPiso, puntoMedio, puntoBase];
			var curvaColumna = new Curva(puntosColumna);
			curvaColumna.setRadio(0.3);
			var columna = new Mesh(curvaColumna);
			columna.setTransform(matriz);
			this.columnas.add(columna);

		}
		//this.add(flechaDerivada);
		ultimoPunto = vec3.clone(puntoBase);
		
		
	}
	this.add(this.tablas);
	this.add(this.columnas);
	this.curvaCentral = new Mesh(new Curva(this.puntos));
	var m3 = mat4.create();
	var centro = this.curvaCentral.getCenter();
	vec3.scale(centro, centro, -1);

	mat4.translate(m3,m3,centro);
	mat4.translate(m3,m3,vec3.fromValues(0,-0.5,0));
	this.curvaCentral.setTransform(m3);
	this.add(this.curvaCentral)
	
	puntosInterior[puntosInterior.length - 1] = puntosInterior[0];
	var rielInterior = new Curva(puntosInterior);
	rielInterior.setRadio(0.4);
	this.curva1 = new Mesh( rielInterior );
	
	var m1 = mat4.create();
	//var centro = this.curva1.getCenter();
	//vec3.scale(centro, centro, -1);
	mat4.translate(m1, m1, centro);
	this.curva1.setTransform(m1);
	this.add(this.curva1); 

	puntosExterior[puntosExterior.length - 1] = puntosExterior[0];
	var rielExterior = new Curva(puntosExterior);
	rielExterior.setRadio(0.4);
	this.curva2 = new Mesh(rielExterior);
	var m2 = mat4.create();
	//var centro = this.curva2.getCenter();
	//vec3.scale(centro, centro, -1);
	mat4.translate(m2, m2, centro);
	//mat4.translate(m2, m2, vec3.fromValues(-1, 0,0));
	this.curva2.setTransform(m2);
	this.add(this.curva2);
	

	
}

MontaniaRusa.prototype.getTablas = function(){
	return this.tablas;
}
MontaniaRusa.prototype = Object.create(Conjunto.prototype);
MontaniaRusa.prototype.constructor = MontaniaRusa;

MontaniaRusa.prototype.avanzar = function(){
	var mat = mat4.create();

	t = this.timer.elapsed_seconds();
	this.curvaCentral = new Mesh(new Curva(this.puntos));
	var curva = new Curva(this.puntos);
	var centro = this.curvaCentral.getCenter();
	vec3.scale(centro, centro, -1);
	var desplazamiento = vec3.create();
	vec3.add(desplazamiento, this.puntos[0], centro);
	var pendiente = vec3.clone(curva.getPendiente(t));

	mat4.translate(mat,mat,desplazamiento);
	
	mat4.translate(mat, mat, curva.getPunto(t));
	var x = pendiente[0];
	var y = pendiente[1];
	var z = pendiente[2];
	mat4.rotateY(mat, mat, Math.atan((x+0.001)/(z+0.001)));
	var binormal = vec3.create();
	vec3.cross(binormal, pendiente,vec3.fromValues(0,1,0));
	var adyacente = Math.pow(x*x+z*z,0.5);
	mat4.rotate(mat, mat, Math.atan((y+0.001)/adyacente), binormal);

	this.carrito.setTransform(mat);
	this.add(this.carrito);
	//this.add(this.curvaCentral)
	
}