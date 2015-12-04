/****************************************
CURVE
Esta clase representa una curva (armada con lineas) que se dibuja en pantalla
Recibe por parametro una lista de vec3 con los puntos por los que tiene que pasar si o si
La interpolacion la hace automaticamente con segmentos enganchados de curvas de bezier cubicas
Esta puesto para que las derivadas primera y segunda sean iguales en la union entre segmentos (incluyendo el fin con el origen si es una curva cerrada)
****************************************/

var Curva = function(_puntos, _largo) {
	this.puntos = _puntos;
	this.paso = _largo;
	this.rows = 0;
	this.cols = 0;
	this.radio = 0.2;
	this.bezier_points = [];
	this.derivadas = [];
	Geometry.call(this, this.gridType);
	this.init();
}

Curva.prototype = Object.create(Geometry.prototype);
Curva.prototype.constructor = Curva;

Curva.prototype.createGrid = function(){
	this.createCurveGrid();
}

Curva.prototype.setRadio = function(unRadio){
	this.radio = unRadio;
	this.init();
}

Curva.prototype.getDerivada = function(){
	return this.derivadas;
}

Curva.prototype.getPunto = function(t){
	t = 10*t;
	var punto1 = vec3.clone(this.bezier_points[(Math.floor(t)%this.derivadas.length)]);
	var punto2 = vec3.clone(this.bezier_points[(Math.ceil(t)%this.derivadas.length)]);
	var decimales = t - Math.floor(t);
	vec3.scale(punto1, punto1, 1-decimales);
	vec3.scale(punto2, punto2, decimales);
	vec3.add(punto2, punto2, punto1);
	return punto2;
}

Curva.prototype.getPendiente = function(t){
	t = 10*t;
	var punto1 = vec3.clone(this.derivadas[(Math.floor(t)%this.derivadas.length)][1]);
	var punto2 = vec3.clone(this.derivadas[(Math.ceil(t)%this.derivadas.length)][1]);
	var decimales = t - Math.floor(t);
	vec3.scale(punto1, punto1, 1-decimales);
	vec3.scale(punto2, punto2, decimales);
	vec3.add(punto2, punto2, punto1);
	var matriz = this.matrix_local;
	//mat4.scale(matriz, matriz, 0.5);
	return punto2;
}

Curva.prototype.createCurveGrid = function(){
	var x = new Array();
	var y = new Array();
	var z = new Array();
	for(var i = 0; i < this.puntos.length; i++){
		x[i] = this.puntos[i][0];
		y[i] = this.puntos[i][1];
		z[i] = this.puntos[i][2];
	}
	var px = null, py = null, pz = null;
	if(x[0] === x[x.length-1] && y[0] === y[y.length-1] && z[0] === z[z.length-1]){
		px = this.computeControlPointsCerrado(x);
		py = this.computeControlPointsCerrado(y);
		pz = this.computeControlPointsCerrado(z);
	} else {
		px = this.computeControlPoints(x);
		py = this.computeControlPoints(y);
		pz = this.computeControlPoints(z);
	}
	
	for(var i = 0; i < this.puntos.length-1; i++){
		var punto0 = vec3.fromValues(x[i], y[i], z[i]);
		var punto1 = vec3.fromValues(px.p1[i], py.p1[i], pz.p1[i]);
		var punto2 = vec3.fromValues(px.p2[i], py.p2[i], pz.p2[i]);
		var punto3 = vec3.fromValues(x[i+1], y[i+1], z[i+1]);
		
		var color = Color.RANDOM();
		
		//var bezier_curve = [];
		var punto_anterior = punto0;
		var largo = 0;

		// recorro una vez con un paso arbitrario chico para obtener el largo de la curva
		for(var s = 0; s < 10; s += 1){
			var t = s/10.0;
			var coef0 = Math.pow(1-t, 3);
			var coef1 = 3*t*Math.pow(1-t, 2);
			var coef2 = 3*t*t*(1-t);
			var coef3 = t*t*t;



			var p0_escalado = vec3.create();
			var p1_escalado = vec3.create();
			var p2_escalado = vec3.create();
			var p3_escalado = vec3.create();
			


			vec3.scale(p0_escalado, punto0, coef0);
			vec3.scale(p1_escalado, punto1, coef1);
			vec3.scale(p2_escalado, punto2, coef2);
			vec3.scale(p3_escalado, punto3, coef3);


			
			var bezier_point = vec3.create();
			vec3.add(bezier_point, p0_escalado, p1_escalado);
			vec3.add(bezier_point, bezier_point, p2_escalado);
			vec3.add(bezier_point, bezier_point, p3_escalado);
			//bezier_curve.push(bezier_point);



			
			largo += vec3.distance(punto_anterior, bezier_point);
			punto_anterior = bezier_point;
		}
		
		// p es el paso que quiero usar, es fijo porque la idea es extender un cuerpo sobre la curva
		// para que el cuerpo no se deforme, se define su largo fijo p
		var p = (this.paso === undefined)? 1 : this.paso;
		//var p =100;
		// veo cuantos segmentos de dicho largo entran en la curva
		var cant = largo / p;
		// agrego el punto representando a cada segmento
		for(var c = 0; c < cant; c++){
			// veo segun el largo de la curva, el paso del cuerpo y el numero de cuerpo en el que estoy
			// cual es el t que deberia usar
			var t = (c*p/largo);
			
			var coef0 = Math.pow(1-t, 3);
			var coef1 = 3*t*Math.pow(1-t, 2);
			var coef2 = 3*t*t*(1-t);
			var coef3 = t*t*t;
			
			var p0_escalado = vec3.create();
			var p1_escalado = vec3.create();
			var p2_escalado = vec3.create();
			var p3_escalado = vec3.create();
			
			vec3.scale(p0_escalado, punto0, coef0);
			vec3.scale(p1_escalado, punto1, coef1);
			vec3.scale(p2_escalado, punto2, coef2);
			vec3.scale(p3_escalado, punto3, coef3);
			
			// calculo el punto sobre la curva de bezier para ese t
			var bezier_point = vec3.create();
			vec3.add(bezier_point, p0_escalado, p1_escalado);
			vec3.add(bezier_point, bezier_point, p2_escalado);
			vec3.add(bezier_point, bezier_point, p3_escalado);
			this.bezier_points.push(bezier_point);
			this.putSlice(bezier_point, color);
			this.rows++;

			var coef0_derivado = -3*Math.pow(1-t,2);
			var coef1_derivado = 3*Math.pow(1-t,2) - 6*t*(1-t);
			var coef2_derivado = 6*t*(1-t) - 3*t*t;
			var coef3_derivado = 3*t*t;
			var p0d_escalado = vec3.create();
			var p1d_escalado = vec3.create();
			var p2d_escalado = vec3.create();
			var p3d_escalado = vec3.create();
			vec3.scale(p0d_escalado, punto0, coef0_derivado);
			vec3.scale(p1d_escalado, punto1, coef1_derivado);
			vec3.scale(p2d_escalado, punto2, coef2_derivado);
			vec3.scale(p3d_escalado, punto3, coef3_derivado);
			var bezier_point_derivado = vec3.create();
			vec3.add(bezier_point_derivado,p0d_escalado, p1d_escalado);
			vec3.add(bezier_point_derivado, bezier_point_derivado, p2d_escalado);
			vec3.add(bezier_point_derivado, bezier_point_derivado, p3d_escalado);
			this.derivadas.push([bezier_point, bezier_point_derivado]);
		}
	}
	// como no es exacto todo esto, fuerzo a agregar el ultimo punto por el que me piden que pase (si dio justo y llego, no cambia nada)
	var ultimo_punto = vec3.fromValues(x[this.puntos.length-1], y[this.puntos.length-1], z[this.puntos.length-1]);
	this.putSlice(ultimo_punto, Color.RANDOM());
	this.rows++;
	
	for(var i = 0; i < this.position_buffer.length; ++i){
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(1);
	}
}

Curva.prototype.putSlice = function(bezier_point, color){
	// por ahora dejo esto asi, si se cambia por putSliceCuadrada o putSliceCircular en vez de poner puntos hace rectangulos o cilindros
	// pero si quisieramos esa funcionalidad habria que hacer clases que hereden de aca y usen la que corresponda
	this.putSliceCircular(bezier_point, color);
}

Curva.prototype.putSlicePunto = function(bezier_point, color){
	this.draw_mode = gl.LINE_STRIP;
	this.cols = 1;
	this.position_buffer.push(bezier_point[0]);
	this.position_buffer.push(bezier_point[1]);
	this.position_buffer.push(bezier_point[2]);
	
	this.color_buffer.push(color[0]);
	this.color_buffer.push(color[1]);
	this.color_buffer.push(color[2]);
}

Curva.prototype.putSliceCuadrada = function(bezier_point, color){
	this.draw_mode = gl.TRIANGLE_STRIP;
	this.cols = 5;
	for(var j = 0; j < this.cols; j++){
		var dif_x = 0.3, dif_y = 0.1;
		if(j == 0) { dif_x = -dif_x; dif_y = dif_y }
		if(j == 1) { dif_x = dif_x; dif_y = dif_y }
		if(j == 2) { dif_x = dif_x; dif_y = -dif_y }
		if(j == 3) { dif_x = -dif_x; dif_y = -dif_y }
		this.position_buffer.push(bezier_point[0]+dif_x);
		this.position_buffer.push(bezier_point[1]+dif_y);
		this.position_buffer.push(bezier_point[2])
		
		this.color_buffer.push(color[0]);
		this.color_buffer.push(color[1]);
		this.color_buffer.push(color[2]);
	}
}

Curva.prototype.putSliceCircular = function(bezier_point, color){
	this.draw_mode = gl.TRIANGLE_STRIP;
	this.cols = 50;
	for(var j = 0; j < this.cols; j++){
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push(bezier_point[0]+this.radio*Math.cos(angulo));
		this.position_buffer.push(bezier_point[1]+this.radio*Math.sin(angulo));
		this.position_buffer.push(bezier_point[2]);

		this.color_buffer.push(color[0]);
		this.color_buffer.push(color[1]);
		this.color_buffer.push(color[2]);
	}
}

// esta funcion calcula todos los p1 y p2 para segmentos de bezier uniendo los 'nudos' dados
// garantiza que tanto la derivada primera como la segunda son continuas (en los puntos inicial y final la segunda derivada es cero, la curva se vuelve lineal)
// el credito es de https://www.particleincell.com/2012/bezier-splines/
Curva.prototype.computeControlPoints = function(K){
	var p1=new Array();
	var p2=new Array();
	n = K.length-1;
	
	/*rhs vector*/
	var a=new Array();
	var b=new Array();
	var c=new Array();
	var r=new Array();
	
	/*left most segment*/
	a[0]=0.0;
	b[0]=2.0;
	c[0]=1.0;
	r[0] = K[0]+2*K[1];
	
	/*internal segments*/
	for (var i = 1; i < n - 1; i++)
	{
		a[i]=1.0;
		b[i]=4.0;
		c[i]=1.0;
		r[i] = 4.0 * K[i] + 2.0 * K[i+1];
	}
			
	/*right segment*/
	a[n-1]=2.0;
	b[n-1]=7.0;
	c[n-1]=0.0;
	r[n-1] = 8.0*K[n-1]+K[n];
	
	/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
	for (var i = 1; i < n; i++)
	{
		var m = a[i]/b[i-1];
		b[i] = b[i] - m * c[i - 1];
		r[i] = r[i] - m*r[i-1];
	}
 
	p1[n-1] = r[n-1]/b[n-1];
	for (var i = n - 2; i >= 0; --i)
		p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
		
	/*we have p1, now compute p2*/
	for (var i=0;i<n-1;i++)
		p2[i]=2*K[i+1]-p1[i+1];
	
	p2[n-1]=0.5*(K[n]+p1[n-1]);
	
	return {p1:p1, p2:p2};
}

// la funcion anterior pedia para los bordes que la derivada segunda sea 0, porque son calculos mas faciles
// pero como una montaña rusa deberia ser cerrada (la de la foto por lo menos, pq hay de las que van y vuelven para atras), pedi que las derivadas sean iguales entre el fin y el principio
// esto complica mas todo, me guie de aca http://nikolavitas.blogspot.com.es/2013/08/three-diagonal-periodic-system-of.html
Curva.prototype.computeControlPointsCerrado = function(K){
	
	
	var p1=new Array();
	var p2=new Array();
	n = K.length-1;
	
	/*rhs vector*/
	var a=new Array();
	var b=new Array();
	var c=new Array();
	var r=new Array();
	
	// M X1 = D
	
	var p1x1=new Array();
	
	/*left most segment*/
	a[0]=0.0;
	b[0]=4.0;
	c[0]=1.0;
	r[0] = 4*K[0]+2*K[1];
	
	/*internal segments*/
	for (var i = 1; i < n - 1; i++)
	{
		a[i]=1.0;
		b[i]=4.0;
		c[i]=1.0;
		r[i] = 4.0 * K[i] + 2.0 * K[i+1];
	}
	c[n-2] = 0;
	
	/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
	for (var i = 1; i < n-1; i++)
	{
		var m = a[i]/b[i-1];
		b[i] = b[i] - m * c[i - 1];
		r[i] = r[i] - m*r[i-1];
	}
	
	// X1
	p1x1[n-2] = r[n-2]/b[n-2];
	for (var i = n - 3; i >= 0; --i)
		p1x1[i] = (r[i] - c[i] * p1x1[i+1]) / b[i];
		
	// M X2 = -d
	
	var p1x2=new Array();
	
	/*left most segment*/
	a[0]=0.0;
	b[0]=4.0;
	c[0]=1.0;
	r[0]=-1.0;
	
	/*internal segments*/
	for (var i = 1; i < n - 1; i++)
	{
		a[i]=1.0;
		b[i]=4.0;
		c[i]=1.0;
		r[i]=0.0;
	}
	c[n-2] = 0;
	r[n-2] = -1.0
	
	/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
	for (var i = 1; i < n-1; i++)
	{
		var m = a[i]/b[i-1];
		b[i] = b[i] - m * c[i - 1];
		r[i] = r[i] - m*r[i-1];
	}
	
	// X2
	p1x2[n-2] = r[n-2]/b[n-2];
	for (var i = n - 3; i >= 0; --i)
		p1x2[i] = (r[i] - c[i] * p1x2[i+1]) / b[i];
	
	// xn
	var xn = (4*K[n-1]+2*K[n] - p1x1[0] - p1x1[n-2]) / (4+p1x2[0]+p1x2[n-2]);
	
	// X = X1 + X2 xn
	p1[n-1] = xn;
	for(var i = n - 2; i >= 0; --i)
		p1[i] = p1x1[i] + p1x2[i] * xn;
	
	/*we have p1, now compute p2*/
	for (var i=0;i<n-1;i++)
		p2[i]=2*K[i+1]-p1[i+1];
	
	p2[n-1]=0.5*(K[n]+p1[n-1]);
	
	return {p1:p1, p2:p2};
}