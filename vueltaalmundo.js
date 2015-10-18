
var VueltaAlMundo = function(){
	Conjunto.call(this);
	
	var v = VueltaAlMundo.vuelta_al_mundo();
	this.cabinas = v[0];
	this.lo_que_gira = v[1];
	this.vuelta_al_mundo = v[2];

	this.timer = new Timer();
	this.timer.start();

	//this.eje_de_rotacion = vec3.fromValues(1, 0, 0);

	this.add( this.vuelta_al_mundo );
}

VueltaAlMundo.prototype = Object.create(Conjunto.prototype);
VueltaAlMundo.prototype.constructor = VueltaAlMundo;

// rotacion de la rueda y cabinas (esta hardcodeado sobre que eje gira, tal vez trae problemas eso)
VueltaAlMundo.prototype.girar = function(){

	var m1 = mat4.create();
	mat4.rotate(m1, m1, this.timer.elapsed_seconds()/3, vec3.fromValues(1, 0, 0));
	
	var m1_inv = mat4.create();
	mat4.rotate(m1_inv, m1_inv, -this.timer.elapsed_seconds()/4, vec3.fromValues(1, 0, 0));
	for(var i = 0; i < 8; ++i){
		var cabina = this.cabinas.get(i);
		mat_cab = mat4.create();
		
		var centro = cabina.getCenter();
		mat4.translate(mat_cab, mat_cab, vec3.fromValues(0, 4.9*Math.sin((1+2*i)*Math.PI/8-this.timer.elapsed_seconds()/3), 4.9*Math.cos((1+2*i)*Math.PI/8-this.timer.elapsed_seconds()/3)));
		var diff = 0.15*Math.sin(centro[2]);
		mat4.rotate(mat_cab, mat_cab, diff, vec3.fromValues(1, 0, 0));
		cabina.setTransform(mat_cab);
	}
	this.lo_que_gira.setTransform(m1);
}

VueltaAlMundo.rueda_vigas = function(){
	factor_escala = 0.10;
	
	viga1 = new Mesh( new Cubo() );
	mat_1 = mat4.create();
	mat4.scale(mat_1, mat_1, vec3.fromValues(factor_escala, factor_escala, 10));
	viga1.applyMatrix(mat_1);
	
	viga2 = new Mesh( new Cubo() );
	mat_2 = mat4.create();
	mat4.rotate(mat_2, mat_2, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_2, mat_2, vec3.fromValues(factor_escala, factor_escala, 10));
	viga2.applyMatrix(mat_2);
	
	viga3 = new Mesh( new Cubo() );
	mat_3 = mat4.create();
	mat4.rotate(mat_3, mat_3, Math.PI/4, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_3, mat_3, vec3.fromValues(factor_escala, factor_escala, 10));
	viga3.applyMatrix(mat_3);
	
	viga4 = new Mesh( new Cubo() );
	mat_4 = mat4.create();
	mat4.rotate(mat_4, mat_4, -Math.PI/4, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_4, mat_4, vec3.fromValues(factor_escala, factor_escala, 10));
	viga4.applyMatrix(mat_4);
	
	viga5 = new Mesh( new Cubo() );
	mat_5 = mat4.create();
	mat4.rotate(mat_5, mat_5, -Math.PI/8, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_5, mat_5, vec3.fromValues(factor_escala, factor_escala, 10));
	viga5.applyMatrix(mat_5);
	
	viga6 = new Mesh( new Cubo() );
	mat_6 = mat4.create();
	mat4.rotate(mat_6, mat_6, Math.PI/8, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_6, mat_6, vec3.fromValues(factor_escala, factor_escala, 10));
	viga6.applyMatrix(mat_6);
	
	viga7 = new Mesh( new Cubo() );
	mat_7 = mat4.create();
	mat4.rotate(mat_7, mat_7, 3*Math.PI/8, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_7, mat_7, vec3.fromValues(factor_escala, factor_escala, 10));
	viga7.applyMatrix(mat_7);
	
	viga8 = new Mesh( new Cubo() );
	mat_8 = mat4.create();
	mat4.rotate(mat_8, mat_8, -3*Math.PI/8, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_8, mat_8, vec3.fromValues(factor_escala, factor_escala, 10));
	viga8.applyMatrix(mat_8);
	
	//vigas_hor = [];
	var vigas = new Conjunto();
	vigas.add(viga1);
	vigas.add(viga2);
	vigas.add(viga3);
	vigas.add(viga4);
	vigas.add(viga5);
	vigas.add(viga6);
	vigas.add(viga7);
	vigas.add(viga8);
	
	for(i = 0; i < 16; ++i){
		viga_temp = new Mesh( new Cubo() );
		mat_hor_1 = mat4.create();
		mat4.rotate(mat_hor_1, mat_hor_1, (1+2*i)*Math.PI/16, vec3.fromValues(1, 0, 0));
		mat4.translate(mat_hor_1, mat_hor_1, vec3.fromValues(0, 0, -4.9));
		mat4.rotate(mat_hor_1, mat_hor_1, Math.PI/2, vec3.fromValues(1, 0, 0));
		mat4.scale(mat_hor_1, mat_hor_1, vec3.fromValues(factor_escala, factor_escala, 2));
		viga_temp.applyMatrix(mat_hor_1);
		vigas.add(viga_temp);
		
		viga_temp2 = new Mesh( new Cubo() );
		mat_hor_2 = mat4.create();
		mat4.rotate(mat_hor_2, mat_hor_2, (1+2*i)*Math.PI/16, vec3.fromValues(1, 0, 0));
		mat4.translate(mat_hor_2, mat_hor_2, vec3.fromValues(0, 0, -2.8));
		mat4.rotate(mat_hor_2, mat_hor_2, Math.PI/2, vec3.fromValues(1, 0, 0));
		mat4.scale(mat_hor_2, mat_hor_2, vec3.fromValues(factor_escala, factor_escala, 1.3));
		viga_temp2.applyMatrix(mat_hor_2);
		vigas.add(viga_temp2);
	}
	
	return vigas;
}

VueltaAlMundo.soporte = function(){
	s = new Mesh( new PrismaTriangular() );
	mat_soporte = mat4.create();
	mat4.translate(mat_soporte, mat_soporte, vec3.fromValues(-0.25, -4.5, 0));
	mat4.rotate(mat_soporte, mat_soporte, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_soporte, mat_soporte, vec3.fromValues(2, 7, 0.25));
	s.applyMatrix(mat_soporte);
	return s;
}

VueltaAlMundo.vuelta_al_mundo = function(){
	// corro rueda y soporte a izq
	rueda_izq = VueltaAlMundo.rueda_vigas();
	soporte_izq = VueltaAlMundo.soporte();
	rueda_y_soporte_izq = new Conjunto();
	rueda_y_soporte_izq.add(rueda_izq);
	rueda_y_soporte_izq.add(soporte_izq);
	rueda_y_soporte_izq.setColor(Color.WHITE);
	
	mat_izq = mat4.create();
	mat4.translate(mat_izq, mat_izq, vec3.fromValues(-1, 0, 0));
	rueda_y_soporte_izq.applyMatrix(mat_izq);
	
	// corro rueda y soporte a der
	rueda_der = VueltaAlMundo.rueda_vigas();
	soporte_der = VueltaAlMundo.soporte();
	rueda_y_soporte_der = new Conjunto();
	rueda_y_soporte_der.add(rueda_der);
	rueda_y_soporte_der.add(soporte_der);
	rueda_y_soporte_der.setColor(Color.WHITE);
	
	mat_der = mat4.create();
	mat4.translate(mat_der, mat_der, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_der, mat_der, Math.PI, vec3.fromValues(0, 1, 0));
	rueda_y_soporte_der.applyMatrix(mat_der);
	
	// conjunto de lo que va a girar
	ruedas = new Conjunto();
	ruedas.add(rueda_izq);
	ruedas.add(rueda_der);
	
	// vuelta al mundo
	ruedas_y_soportes = new Conjunto();
	ruedas_y_soportes.add(ruedas);
	ruedas_y_soportes.add(soporte_izq);
	ruedas_y_soportes.add(soporte_der);				
	
	// cabinas y soportes horizontales
	cabinas = new Conjunto();
	//ruedas.add(cabinas);
	
	var colores_cabinas = [ Color.RED, Color.ORANGE, Color.YELLOW, Color.GREEN, 
							Color.CYAN, Color.BLUE, Color.MED_PURPLE, Color.PINK]
	
	for(i = 0; i < 8; ++i){
		var viga_temp = new Mesh( new Cubo() );
		var mat_hor_1 = mat4.create();
		mat4.rotate(mat_hor_1, mat_hor_1, (1+2*i)*Math.PI/8, vec3.fromValues(1, 0, 0));
		mat4.translate(mat_hor_1, mat_hor_1, vec3.fromValues(0, 0, -4.9));
		mat4.rotate(mat_hor_1, mat_hor_1, Math.PI/2, vec3.fromValues(0, 0, 1));
		mat4.rotate(mat_hor_1, mat_hor_1, Math.PI/2, vec3.fromValues(1, 0, 0));
		mat4.scale(mat_hor_1, mat_hor_1, vec3.fromValues(factor_escala, factor_escala, 2));
		viga_temp.applyMatrix(mat_hor_1);
		viga_temp.setColor(Color.WHITE);
		ruedas.add(viga_temp);
		
		var cabin = new Cabina(colores_cabinas[i]);
		var mat_cab = mat4.create();
		
		// las cabinas quedan en el medio, las voy rotando despues en girar
		mat4.scale(mat_cab, mat_cab, vec3.fromValues(0.5, 0.5, 0.5));
		cabin.applyMatrix(mat_cab);
		
		cabinas.add(cabin);
	}
	
	
	bolt = new Mesh( new Cilindro() );
	mat_bolt = mat4.create();
	mat4.translate(mat_bolt, mat_bolt, vec3.fromValues(0, 0, 0));
	mat4.rotate(mat_bolt, mat_bolt, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_bolt, mat_bolt, vec3.fromValues(0.35, 0.35, 3.5));
	bolt.applyMatrix(mat_bolt);
	bolt.setColor(Color.WHITE);
	ruedas.add(bolt);
	ruedas_y_soportes.add(cabinas);
	
	return [cabinas, ruedas, ruedas_y_soportes];
}