
var Carrito = function(color){
	Conjunto.call(this);
	
	var ret = Carrito.carrito();
	
	this.sillas = ret[0];
	this.cuerpo = ret[1];
	this.todo = ret[2];
	
	this.cuerpo.setKs(1);
	this.add( this.todo );
	
	this.todo.setKd(0.4);
	this.todo.setKs(1.0);
	this.todo.setShininess(32.0);
	
	/*var mat_c = mat4.create();
	var c = this.getCenter();
	vec3.scale(c, c, -1);
	mat4.translate(mat_c, mat_c, c);
	cab.setTransform(mat_c);*/
}

Carrito.prototype = Object.create(Conjunto.prototype);
Carrito.prototype.constructor = Carrito;

Carrito.carrito = function(){
	var carrito = new Conjunto();

	var tabla1 = new Mesh( new Cuadrado() );
	var t_m1 = mat4.create();
	//mat4.translate(t_m1, t_m1, vec3.fromValues(0, 0, 1));
	mat4.scale(t_m1, t_m1, vec3.fromValues(3, 1.5, 1));
	tabla1.applyMatrix(t_m1);
	tabla1.setColor(Color.RED);
	
	var tabla2 = new Mesh( new Cuadrado() );
	var t_m2 = mat4.create();
	mat4.translate(t_m2, t_m2, vec3.fromValues(0, 0, 2));
	mat4.scale(t_m2, t_m2, vec3.fromValues(3, 1.5, 1));
	tabla2.applyMatrix(t_m2);
	tabla2.setColor(Color.RED);
	
	var tabla3 = new Mesh( new Cuadrado() );
	var t_m3 = mat4.create();
	mat4.translate(t_m3, t_m3, vec3.fromValues(1.5, 0, 1));
	mat4.rotate(t_m3, t_m3, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(t_m3, t_m3, vec3.fromValues(2, 1.5, 1));
	tabla3.applyMatrix(t_m3);
	tabla3.setColor(Color.RED);
	
	var tabla4 = new Mesh( new Cuadrado() );
	var t_m4 = mat4.create();
	mat4.translate(t_m4, t_m4, vec3.fromValues(-1.5, -0.1, 1));
	mat4.rotate(t_m4, t_m4, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(t_m4, t_m4, vec3.fromValues(2, 1.25, 1));
	tabla4.applyMatrix(t_m4);
	tabla4.setColor(Color.RED);
	
	var tabla5 = new Mesh( new Cuadrado() );
	var t_m5 = mat4.create();
	mat4.translate(t_m5, t_m5, vec3.fromValues(0, -0.7, 1));
	mat4.rotate(t_m5, t_m5, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(t_m5, t_m5, vec3.fromValues(3, 2, 1));
	tabla5.applyMatrix(t_m5);
	tabla5.setColor(Color.RED);
	
	var tabla6 = new Mesh( new Cuadrado() );
	var t_m9 = mat4.create();
	mat4.translate(t_m9, t_m9, vec3.fromValues(-1, 0.5, 1));
	mat4.rotate(t_m9, t_m9, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(t_m9, t_m9, vec3.fromValues(1, 2, 1));
	tabla6.applyMatrix(t_m9);
	tabla6.setColor(Color.RED);
	
	var cuerpo = new Conjunto();
	cuerpo.add(tabla1);
	cuerpo.add(tabla2);
	cuerpo.add(tabla3);
	cuerpo.add(tabla4);
	cuerpo.add(tabla5);
	cuerpo.add(tabla6);
	
	var asiento11 = new Mesh( new Cuadrado() );
	var t_m6 = mat4.create();
	mat4.translate(t_m6, t_m6, vec3.fromValues(0.75, -0.6, 1));
	mat4.rotate(t_m6, t_m6, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(t_m6, t_m6, vec3.fromValues(0.5, 1.5, 1));
	asiento11.applyMatrix(t_m6);
	asiento11.setColor(Color.YELLOW);
	
	var asiento12 = new Mesh( new Cuadrado() );
	var t_m7 = mat4.create();
	mat4.translate(t_m7, t_m7, vec3.fromValues(0.5, -0.6, 1));
	mat4.rotate(t_m7, t_m7, -Math.PI/16, vec3.fromValues(0, 0, 1));
	mat4.translate(t_m7, t_m7, vec3.fromValues(0.5, 1, 0));
	mat4.rotate(t_m7, t_m7, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(t_m7, t_m7, vec3.fromValues(1.5, 2, 1));
	asiento12.applyMatrix(t_m7);
	asiento12.setColor(Color.YELLOW);
	
	var asiento21 = new Mesh( new Cuadrado() );
	var t_m7 = mat4.create();
	mat4.translate(t_m7, t_m7, vec3.fromValues(-0.25, -0.6, 1));
	mat4.rotate(t_m7, t_m7, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(t_m7, t_m7, vec3.fromValues(0.5, 1.5, 1));
	asiento21.applyMatrix(t_m7);
	asiento21.setColor(Color.YELLOW);
	
	var asiento22 = new Mesh( new Cuadrado() );
	var t_m8 = mat4.create();
	mat4.translate(t_m8, t_m8, vec3.fromValues(-0.5, -0.6, 1));
	mat4.rotate(t_m8, t_m8, -Math.PI/16, vec3.fromValues(0, 0, 1));
	mat4.translate(t_m8, t_m8, vec3.fromValues(0.5, 1, 0));
	mat4.rotate(t_m8, t_m8, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(t_m8, t_m8, vec3.fromValues(1.5, 2, 1));
	asiento22.applyMatrix(t_m8);
	asiento22.setColor(Color.YELLOW);
	
	var sillas = new Conjunto();
	sillas.add(asiento11);
	sillas.add(asiento12);
	sillas.add(asiento21);
	sillas.add(asiento22);
	
	var todo = new Conjunto();
	todo.add(sillas);
	todo.add(cuerpo);
	
	var m_c = mat4.create();
	mat4.rotate(m_c, m_c, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(m_c, m_c, vec3.fromValues(4, 4, 4));
	todo.applyMatrix(m_c);
	
	return [sillas, cuerpo, todo];
}