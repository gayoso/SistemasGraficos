

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
	this.puntos.push(vec3.fromValues(-20, 5, -15));
	this.puntos.push(vec3.fromValues(-15, 0, 0));
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
	puntosArray.push([-20, 5, -15]);
	puntosArray.push([-15, 0, 0]);
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

	//Puntos para formar los tres rieles
	var puntosCentral = [];
	var puntosExterior = [];
	var puntosInterior = [];
	//Tablas que unen los tres rieles
	this.tablas = new Conjunto();
	//Columnas que sostienen los rieles
	this.columnas = new Conjunto();
	this.rieles = new Conjunto();
	this.carrito = new Carrito();
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
		//Armo la tabla
		var puntoInterior = vec3.create();
		vec3.add(puntoInterior, puntoBase, binormal);
		puntosInterior.push(puntoInterior);
		var puntoExterior = vec3.create();
		vec3.subtract(puntoExterior, puntoBase, binormal);
		puntosExterior.push(puntoExterior);
		vec3.add(puntoBase, puntoBase, vec3.fromValues(0, -0.5 ,0));
		var puntosTabla = [puntoInterior, puntoBase, puntoExterior];
		var tablaEntreRieles = new Mesh(new Curva(puntosTabla));
		var matriz = mat4.create();
		var c = curva.getCenter();
		vec3.scale(c, c, -1);
		mat4.translate(matriz, matriz, c);
		tablaEntreRieles.setTransform(matriz);
		if(j == 0){
			this.tablas.add(tablaEntreRieles);
		}
		j = (j+1) % 2;
		//Si estan muy cerca, salteo una tabla
		if(vec3.distance(ultimoPunto, puntoBase) < 0.2){
			j = (j+1)%2;
		}
		//Pongo columna una de cada diez veces
		if((i+1)%10 == 0){
			var puntoPiso = vec3.clone(puntoBase);
			puntoPiso[1] = -5;
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
		ultimoPunto = vec3.clone(puntoBase);
	}
	this.add(this.tablas);
	this.add(this.columnas);
	this.columnas.setColor(Color.Gray90);
	
	var rielCentral = new Mesh(new Curva(this.puntos));
	var centro = rielCentral.getCenter();
	vec3.scale(centro, centro, -1);
	var m3 = mat4.create();
	mat4.translate(m3,m3,centro);
	this.matTraslacion = mat4.clone(m3);
	mat4.translate(m3,m3,vec3.fromValues(0,-0.5,0));
	rielCentral.setTransform(m3);
	this.rieles.add(rielCentral)
	
	puntosInterior[puntosInterior.length - 1] = puntosInterior[0];
	var rielInterior = new Curva(puntosInterior);
	rielInterior.setRadio(0.4);
	var curvaInterior = new Mesh( rielInterior );
	curvaInterior.setTransform(this.matTraslacion);
	this.rieles.add(curvaInterior); 

	puntosExterior[puntosExterior.length - 1] = puntosExterior[0];
	var rielExterior = new Curva(puntosExterior);
	rielExterior.setRadio(0.4);
	var curvaExterior = new Mesh(rielExterior);
	curvaExterior.setTransform(this.matTraslacion);
	this.rieles.add(curvaExterior);
	this.add(this.rieles);
	this.ultimoAngulo = 0;
}

MontaniaRusa.prototype.getTablas = function(){
	return this.tablas;
}
MontaniaRusa.prototype = Object.create(Conjunto.prototype);
MontaniaRusa.prototype.constructor = MontaniaRusa;
MontaniaRusa.prototype.getPosicionCarrito = function(){
	return [this.ultimoPuntoCarrito, this.ultimaPendiente];
}

MontaniaRusa.prototype.avanzar = function(){
	var mat = mat4.create();

	t = this.timer.elapsed_seconds();
	t = t*1.2;
	this.curvaCentral = new Mesh(new Curva(this.puntos));
	var curva = new Curva(this.puntos);
	var m3 = mat4.create();
	var centro = this.curvaCentral.getCenter();

	vec3.scale(centro, centro, -1);
	mat4.translate(m3,m3,centro);
	this.curvaCentral.setTransform(m3);
	var desplazamiento = vec3.create();
	vec3.add(desplazamiento, this.puntos[0], centro);
	var pendiente = vec3.clone(curva.getPendiente(t));
	this.ultimoPuntoCarrito = curva.getPunto(t);
	vec3.transformMat4(this.ultimoPuntoCarrito, this.ultimoPuntoCarrito, this.matTraslacion);
	this.ultimaPendiente = vec3.clone(pendiente);
	mat4.translate(mat,mat,desplazamiento);
	mat4.translate(mat, mat, curva.getPunto(t));
	var x = pendiente[0];
	var y = pendiente[1];
	var z = pendiente[2];
	mat4.rotateY(mat, mat, Math.PI/2);
	var vecPendiente = vec2.fromValues(x, z);
	var vecBase = vec2.fromValues(1, 0);
	var dot = vec2.dot(vecPendiente, vecBase);
	var angulo = Math.acos(dot/vec2.length(vecPendiente));
	var binormal = vec3.create();
	vec3.cross(binormal, pendiente,vec3.fromValues(0,1,0));
	vec3.scale(binormal, binormal, 0.2);
	if(z < 0){
		angulo = -angulo;
	}
	mat4.rotateY(mat, mat,  -angulo);

	var adyacente = Math.pow(x*x+z*z,0.5);
	angulo = -Math.atan((y+0.001)/adyacente);
	if (y < 0){
		angulo = -angulo;
	} 
	mat4.rotate(mat, mat, angulo , binormal);
	this.carrito.setTransform(mat);
	mat = mat4.create();
	mat4.translate(mat, mat, binormal);
	this.carrito.applyMatrix(mat);
	mat = mat4.create();
	mat4.translate(mat, mat, vec3.fromValues(0,2,0));
	this.carrito.applyMatrix(mat);
	this.add(this.carrito);
}
MontaniaRusa.prototype.setReflectionTextureName = function(name){
	ReflectionManager.addReflectionToRenderable(this.rieles, name);
}

MontaniaRusa.prototype.setReflectiveness = function(ref){
	this.rieles.setReflectiveness(ref);
}