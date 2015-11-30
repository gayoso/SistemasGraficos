/****************************************
SILLAS GIRATORIAS
Llamar con new para crear el modelo, y llamar a girar para actualizar la rotacion
****************************************/

function v_MRUV(v0, a, t, t0){
	if(t0 === undefined) t0 = 0;
	return v0 + a * (t-t0);
}

function x_MRUV(x0, v0, a, t, t0){
	if(t0 === undefined) t0 = 0;
	//var v = v_MRUV(v0, a, t);
	var x = x0 + v0 * (t-t0) + a * (t-t0) * (t-t0) / 2;
	return x;
}

function x_MRU(x0, v0, t, t0){
	if(t0 === undefined) t0 = 0;
	x = x0 + v0 * (t-t0);
	return x;
}

var SillasGiratorias = function(){
	Conjunto.call(this);
	
	var v = SillasGiratorias.sillas_giratorias();
	this.sillas = v[0]
	this.tope = v[1];
	this.sillas_giratorias = v[2];
	
	/*****************/
	this.intervalo = 60;
	this.ultima_pos = 0;
	this.ultima_vel = 0.5;
	this.ultimo_t = 0;
	this.ultimo_angulo_sillas = 22;
	this.ultimo_vel_sillas = -16/3;
	
	this.a_giro = 0.5;
	this.a_sillas = 8.0/9.0;
	this.t01 = 0;
	this.t02 = this.intervalo*10/100;
	this.t03 = this.intervalo*90/100;
	
	this.timer = new Timer();
	this.timer.start();
	/*****************/
	
	this.add( this.sillas_giratorias );
}

SillasGiratorias.prototype = Object.create(Conjunto.prototype);
SillasGiratorias.prototype.constructor = SillasGiratorias;

SillasGiratorias.prototype.girar = function(){
	var time = this.timer.elapsed_seconds() % 60;
	// velocidad de rotacion, tiene una velocidad base y aumenta y disminuye
	//console.log(time);
	var vel_giro, vel_sillas, a, a_sillas, pos_giro, angulo_sillas;
	if(time <= this.t02){
		a = this.a_giro;
		a_sillas = this.a_sillas;
		
		if(this.ultimo_t >= time){
			this.ultimo_t = this.intervalo - this.ultimo_t;
			this.ultimo_vel_sillas = -16/3;
		}
		var t = time - this.ultimo_t;
		this.ultimo_t = time;
		
		vel_giro = v_MRUV(this.ultima_vel, a, t);
		this.ultima_vel = vel_giro;
		
		pos_giro = x_MRUV(this.ultima_pos, vel_giro, a, t);
		this.ultima_pos = pos_giro;
		
		
		vel_sillas = v_MRUV(this.ultimo_vel_sillas, a_sillas, t);
		this.ultimo_vel_sillas = vel_sillas;
		
		angulo_sillas = x_MRUV(this.ultimo_angulo_sillas, vel_sillas, a_sillas, t);
		this.ultimo_angulo_sillas = angulo_sillas;
		
		//console.log("1. vel: %s, pos: %s", vel_sillas, angulo_sillas);
	} else if(time >= this.t02 && time < this.t03){
		a = 0;
		a_sillas = 0;
		
		var t = time - this.ultimo_t;
		this.ultimo_t = time;
		
		vel_giro = this.ultima_vel;
		this.ultima_vel = vel_giro;
		
		pos_giro = x_MRU(this.ultima_pos, vel_giro, t);
		this.ultima_pos = pos_giro;
		
		vel_sillas = 0;
		this.ultimo_vel_sillas = vel_sillas;
		
		angulo_sillas = x_MRU(this.ultimo_angulo_sillas, vel_sillas, t);
		this.ultimo_angulo_sillas = angulo_sillas;
		
		//console.log("2. vel: %s, pos: %s", vel_sillas, angulo_sillas);
	} else if(time >= this.t03){
		a = -this.a_giro;
		a_sillas = this.a_sillas;
		
		var t = time - this.ultimo_t;
		this.ultimo_t = time;
		
		vel_giro = v_MRUV(this.ultima_vel, a, t);
		this.ultima_vel = vel_giro;
		
		pos_giro = x_MRUV(this.ultima_pos, vel_giro, a, t);
		this.ultima_pos = pos_giro;
		
		vel_sillas = v_MRUV(this.ultimo_vel_sillas, a_sillas, t);
		this.ultimo_vel_sillas = vel_sillas;
		
		angulo_sillas = x_MRUV(this.ultimo_angulo_sillas, vel_sillas, a_sillas, t);
		this.ultimo_angulo_sillas = angulo_sillas;
		
		//console.log("3. vel: %s, pos: %s", vel_sillas, angulo_sillas);
	}
	
	for(var i = 0; i < 16; i++){
		var mats = mat4.create();
	
		//copio lo de abajo
		
		mat4.rotate(mats, mats, (1+2*i)*Math.PI/16, vec3.fromValues(0, 1, 0));
		mat4.translate(mats, mats, vec3.fromValues(0, 0, 6.5));
		mat4.rotate(mats, mats, -Math.PI/angulo_sillas, vec3.fromValues(1, 0, 0));
		mat4.translate(mats, mats, vec3.fromValues(0, -11, 0));
		mat4.scale(mats, mats, vec3.fromValues(1, 2, 1.5));
		
		this.sillas.children[i].setTransform(mats);
	}
	
	var m1 = mat4.create();
	mat4.rotate(m1, m1, pos_giro, vec3.fromValues(0, 1, 0));
	this.tope.setTransform(m1);
}

SillasGiratorias.pilar = function(){
	var cil1 = new Mesh( new Cilindro() );
	var matr1 = mat4.create();
	mat4.rotate(matr1, matr1, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr1, matr1, vec3.fromValues(1, 1, 3));
	cil1.applyMatrix(matr1);
	
	var cil2 = new Mesh( new Cono(4) );
	var matr2 = mat4.create();
	mat4.translate(matr2, matr2, vec3.fromValues(0, 2, 0));
	mat4.rotate(matr2, matr2, -Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr2, matr2, vec3.fromValues(1, 1, 1));
	cil2.applyMatrix(matr2);
	
	var cil3 = new Mesh( new Cilindro() );
	var matr3 = mat4.create();
	mat4.translate(matr3, matr3, vec3.fromValues(0, 3, 0));
	mat4.rotate(matr3, matr3, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr3, matr3, vec3.fromValues(0.7, 0.7, 2));
	cil3.applyMatrix(matr3);
	
	var cil4 = new Mesh( new Cono(4) );
	var matr4 = mat4.create();
	mat4.translate(matr4, matr4, vec3.fromValues(0, 4.10, 0));
	mat4.rotate(matr4, matr4, -Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr4, matr4, vec3.fromValues(0.7, 0.7, 0.2));
	cil4.applyMatrix(matr4);
	
	var cil5 = new Mesh( new Cilindro() );
	var matr5 = mat4.create();
	mat4.translate(matr5, matr5, vec3.fromValues(0, 5.2, 0));
	mat4.rotate(matr5, matr5, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr5, matr5, vec3.fromValues(0.7*0.7, 0.7*0.7, 4));
	cil5.applyMatrix(matr5);
	
	var pilar = new Conjunto();
	pilar.add(cil1);
	pilar.add(cil2);
	pilar.add(cil3);
	pilar.add(cil4);
	pilar.add(cil5);
	
	var matp = mat4.create();
	//mat4.translate(matp, matp, vec3.fromValues(0, -16, 0));
	mat4.scale(matp, matp, vec3.fromValues(2, 2, 2));
	pilar.applyMatrix(matp);
	
	var pilar_ret = new Conjunto();
	pilar_ret.add(pilar);
	pilar.setColor(Color.CORNFLOWERBLUE);
	
	return pilar_ret;
}

SillasGiratorias.silla = function(){
	var cuadrado1 = new Mesh( new Cuadrado() );
	var matr1 = mat4.create();
	//mat4.rotate(matr1, matr1, Math.PI/20, vec3.fromValues(0, 0, 1));
	mat4.translate(matr1, matr1, vec3.fromValues(0, 0.5, 0));
	mat4.rotate(matr1, matr1, Math.PI/2, vec3.fromValues(0, 1, 0));
	//mat4.scale(matr1, matr1, vec3.fromValues(7, 7, 1.5));
	cuadrado1.applyMatrix(matr1);
	
	var cuadrado2 = new Mesh( new Cuadrado() );
	var matr2 = mat4.create();
	mat4.rotate(matr2, matr2, -Math.PI/2, vec3.fromValues(0, 0, 1));
	mat4.translate(matr2, matr2, vec3.fromValues(0, 0.5, 0));
	mat4.rotate(matr2, matr2, Math.PI/2, vec3.fromValues(0, 1, 0));
	//mat4.scale(matr2, matr2, vec3.fromValues(7, 7, 1.5));
	cuadrado2.applyMatrix(matr2);
	
	var respaldo = new Conjunto();
	respaldo.add(cuadrado1);
	respaldo.add(cuadrado2);
	
	var hilo1 = new Mesh ( new Cuadrado() );
	var matr3 = mat4.create();
	mat4.translate(matr3, matr3, vec3.fromValues(-0.01, 1, 0.5));
	mat4.rotate(matr3, matr3, -Math.PI/6, vec3.fromValues(1, 0, 0));
	mat4.rotate(matr3, matr3, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(matr3, matr3, vec3.fromValues(0.10, 1, 0.5));
	mat4.translate(matr3, matr3, vec3.fromValues(0, 0.5, 0));
	hilo1.applyMatrix(matr3);
	
	var hilo2 = new Mesh ( new Cuadrado() );
	var matr4 = mat4.create();
	mat4.translate(matr4, matr4, vec3.fromValues(-0.01, 1, -0.5));
	mat4.rotate(matr4, matr4, Math.PI/6, vec3.fromValues(1, 0, 0));
	mat4.rotate(matr4, matr4, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(matr4, matr4, vec3.fromValues(0.10, 1, 0.5));
	mat4.translate(matr4, matr4, vec3.fromValues(0, 0.5, 0));
	hilo2.applyMatrix(matr4);
	
	var hilo3 = new Mesh ( new Cuadrado() );
	var matr5 = mat4.create();
	mat4.translate(matr5, matr5, vec3.fromValues(0, 1.75, 0));
	//mat4.rotate(matr5, matr5, Math.PI/6, vec3.fromValues(1, 0, 0));
	mat4.rotate(matr5, matr5, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(matr5, matr5, vec3.fromValues(0.10, 4, 0.5));
	mat4.translate(matr5, matr5, vec3.fromValues(0, 0.5, 0));
	hilo3.applyMatrix(matr5);
	
	var hilos = new Conjunto();
	hilos.add(hilo1);
	hilos.add(hilo2);
	hilos.add(hilo3);
	
	var silla = new Conjunto();
	silla.add(respaldo);
	silla.add(hilos);
	
	/*var matr6 = mat4.create();
	mat4.rotate(matr6, matr6, -Math.PI/8, vec3.fromValues(1, 0, 0));
	silla.applyMatrix(matr6);*/
	
	return [hilos, respaldo, silla];
}

SillasGiratorias.tope = function(){
	var cil1 = new Mesh( new Cilindro() );
	var matr1 = mat4.create();
	mat4.translate(matr1, matr1, vec3.fromValues(0, 1.5, 0));
	mat4.rotate(matr1, matr1, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr1, matr1, vec3.fromValues(7, 7, 1.5));
	cil1.applyMatrix(matr1);
	
	var cil2 = new Mesh( new Cono(90) );
	var matr2 = mat4.create();
	//mat4.translate(matr1, matr1, vec3.fromValues(0, 5.2, 0));
	mat4.rotate(matr2, matr2, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(matr2, matr2, vec3.fromValues(7, 7, 1.5));
	cil2.applyMatrix(matr2);
	
	var sillas = new Conjunto();
	//var colores_sillas = [ ]
	
	for(var i = 0; i < 16; i++){
		var s = SillasGiratorias.silla();
		var h = s[0];
		h.setColor(Color.GREY);
		var r = s[1];
		r.setColor(/*colores_sillas[i]*/Color.RANDOM());
		var _silla = s[2];
		/*var mats = mat4.create();
		mat4.translate(mats, mats, vec3.fromValues(0, 15, 0));
		mat4.rotate(mats, mats, -Math.PI/15, vec3.fromValues(1, 0, 0));
		mat4.scale(mats, mats, vec3.fromValues(1.5, 1, 1.5));
		
		mat4.rotate(mats, mats, (1+2*i)*Math.PI/16, vec3.fromValues(0, 1, 0));
		mat4.rotate(mats, mats, -Math.PI/20, vec3.fromValues(1, 0, 0));
		mat4.translate(mats, mats, vec3.fromValues(0, -11, 6.5));
		mat4.scale(mats, mats, vec3.fromValues(1, 2, 1.5));
		_silla.setTransform(mats);*/
		sillas.add(_silla);
	}
	
	var tope = new Conjunto();
	tope.add(cil1);
	tope.add(cil2);
	tope.setColor(Color.DARKORCHID);
	tope.add(sillas);
	
	var matt = mat4.create();
	mat4.translate(matt, matt, vec3.fromValues(0, 15, 0));
	mat4.rotate(matt, matt, -Math.PI/15, vec3.fromValues(1, 0, 0));
	mat4.scale(matt, matt, vec3.fromValues(1.5, 1, 1.5));
	tope.applyMatrix(matt);
	
	var tope_ret = new Conjunto();
	tope_ret.add(tope);
	
	return [sillas, tope_ret];
}

SillasGiratorias.sillas_giratorias = function(){
	var pilar = SillasGiratorias.pilar();
	var v = SillasGiratorias.tope();
	var sillas = v[0];
	var tope = v[1];
	
	var sillas_giratorias = new Conjunto();
	sillas_giratorias.add(pilar);
	sillas_giratorias.add(tope);
	//sillas_giratorias.add(sillas);
	
	var mats = mat4.create();
	mat4.scale(mats, mats, vec3.fromValues(0.5, 0.5, 0.5));
	sillas_giratorias.applyMatrix(mats);
	
	return [sillas, tope, sillas_giratorias];
}