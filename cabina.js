
var Cabina = function(color){
	Conjunto.call(this);
	
	var cab = Cabina.cabina();
	this.add( cab );
	if(color !== undefined){
		this.setColor(color);
	}
	
	var mat_c = mat4.create();
	var c = this.getCenter();
	vec3.scale(c, c, -1);
	mat4.translate(mat_c, mat_c, c);
	cab.setTransform(mat_c);
}

Cabina.prototype = Object.create(Conjunto.prototype);
Cabina.prototype.constructor = Cabina;

// POR SI ALGO NO ANDA, ACA ESTA HARDCODEADO QUE EL CENTRO DE LA CABINA ES EL PUNTO '3' DEL TRIANGULO '1' DEL TECHO (es el punto mas alto del techo)
Cabina.prototype.getCenter = function(m){
	var cabina = this.children[0];
	var m1 = cabina.matrix_local;
	var paredes_techo = cabina.get(0);
	var m2 = paredes_techo.matrix_local;
	var techo = paredes_techo.get(1);
	var m3 = techo.matrix_local;
	var mesh_triang = techo.get(4);
	var m4 = mesh_triang.matrix_local;
	var geom_triang = mesh_triang.geometry;
	var m5 = geom_triang.model_matrix;
	var centro = vec3.fromValues(geom_triang.position_buffer[6], geom_triang.position_buffer[7], geom_triang.position_buffer[8]);
	var m_final = mat4.create();
	mat4.multiply(m_final, m5, m_final);
	mat4.multiply(m_final, m4, m_final);
	mat4.multiply(m_final, m3, m_final);
	mat4.multiply(m_final, m2, m_final);
	mat4.multiply(m_final, m1, m_final);
	mat4.multiply(m_final, this.matrix_local, m_final);
	var centro_mod = vec3.create();
	vec3.transformMat4(centro_mod, centro, m_final);
	return centro_mod;
}

Cabina.cabina = function(paredes_techo, piso){
	if(paredes_techo === undefined) paredes_techo = Cabina.cabinaTechoParedes();

	if(piso === undefined) piso = Cabina.cabinaPiso();
	var mat_piso = mat4.create();
	mat4.translate(mat_piso, mat_piso, vec3.fromValues(0, -2.11, 0));
	mat4.rotate(mat_piso, mat_piso, -Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_piso, mat_piso, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_piso, mat_piso, vec3.fromValues(1, 1.05, 1.25));
	piso.applyMatrix(mat_piso);

	var cabin = new Conjunto();
	cabin.add(paredes_techo);
	cabin.add(piso);

	//centrar (ya esta centrado)

	return cabin;
}

Cabina.cabinaParedAncha = function(){
	var pared_grande_arriba = new Mesh(new Cuadrado());
	var mat_pared_grande_arriba = mat4.create();
	mat4.translate(mat_pared_grande_arriba, mat_pared_grande_arriba, vec3.fromValues(2, 0, -1.75));
	mat4.rotate(mat_pared_grande_arriba, mat_pared_grande_arriba, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_arriba, mat_pared_grande_arriba, vec3.fromValues(0.5, 3, 1));
	pared_grande_arriba.applyMatrix(mat_pared_grande_arriba);
	
	var pared_grande_abajo = new Mesh(new Cuadrado());
	var mat_pared_grande_abajo = mat4.create();
	mat4.translate(mat_pared_grande_abajo, mat_pared_grande_abajo, vec3.fromValues(2, 0, 1.25));
	mat4.rotate(mat_pared_grande_abajo, mat_pared_grande_abajo, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_abajo, mat_pared_grande_abajo, vec3.fromValues(1.5, 3, 1));
	pared_grande_abajo.applyMatrix(mat_pared_grande_abajo);
	
	var pared_grande_izq = new Mesh(new Cuadrado());
	var mat_pared_grande_izq = mat4.create();
	mat4.translate(mat_pared_grande_izq, mat_pared_grande_izq, vec3.fromValues(2, 1.75, 0));
	mat4.rotate(mat_pared_grande_izq, mat_pared_grande_izq, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_izq, mat_pared_grande_izq, vec3.fromValues(4, 0.5, 1));
	pared_grande_izq.applyMatrix(mat_pared_grande_izq);
	
	var pared_grande_der = new Mesh(new Cuadrado());
	var mat_pared_grande_der = mat4.create();
	mat4.translate(mat_pared_grande_der, mat_pared_grande_der, vec3.fromValues(2, -1.75, 0));
	mat4.rotate(mat_pared_grande_der, mat_pared_grande_der, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_der, mat_pared_grande_der, vec3.fromValues(4, 0.5, 1));
	pared_grande_der.applyMatrix(mat_pared_grande_der);
	
	var pared_grande = new Conjunto();
	pared_grande.add(pared_grande_izq);
	pared_grande.add(pared_grande_der);
	pared_grande.add(pared_grande_arriba);
	pared_grande.add(pared_grande_abajo);
	
	var centro = pared_grande.getCenter();
	vec3.scale(centro, centro, -1);
	mat_centrar = mat4.create();
	mat4.translate(mat_centrar, mat_centrar, centro);
	pared_grande.applyMatrix(mat_centrar);
	
	var pared_grande_ret = new Conjunto();
	pared_grande_ret.add(pared_grande);
	
	return pared_grande_ret;
}

Cabina.cabinaParedAngosta = function(){
	var pared_grande_arriba = new Mesh(new Cuadrado());
	var mat_pared_grande_arriba = mat4.create();
	mat4.translate(mat_pared_grande_arriba, mat_pared_grande_arriba, vec3.fromValues(2, 0, -1.75));
	mat4.rotate(mat_pared_grande_arriba, mat_pared_grande_arriba, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_arriba, mat_pared_grande_arriba, vec3.fromValues(0.5, 1.5, 1));
	pared_grande_arriba.applyMatrix(mat_pared_grande_arriba);
	
	var pared_grande_abajo = new Mesh(new Cuadrado());
	var mat_pared_grande_abajo = mat4.create();
	mat4.translate(mat_pared_grande_abajo, mat_pared_grande_abajo, vec3.fromValues(2, 0, 1));
	mat4.rotate(mat_pared_grande_abajo, mat_pared_grande_abajo, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_abajo, mat_pared_grande_abajo, vec3.fromValues(2, 1.5, 1));
	pared_grande_abajo.applyMatrix(mat_pared_grande_abajo);
	
	var pared_grande_izq = new Mesh(new Cuadrado());
	var mat_pared_grande_izq = mat4.create();
	mat4.translate(mat_pared_grande_izq, mat_pared_grande_izq, vec3.fromValues(2, 1, 0));
	mat4.rotate(mat_pared_grande_izq, mat_pared_grande_izq, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_izq, mat_pared_grande_izq, vec3.fromValues(4, 0.5, 1));
	pared_grande_izq.applyMatrix(mat_pared_grande_izq);
	
	var pared_grande_der = new Mesh(new Cuadrado());
	var mat_pared_grande_der = mat4.create();
	mat4.translate(mat_pared_grande_der, mat_pared_grande_der, vec3.fromValues(2, -1.0, 0));
	mat4.rotate(mat_pared_grande_der, mat_pared_grande_der, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_pared_grande_der, mat_pared_grande_der, vec3.fromValues(4, 0.5, 1));
	pared_grande_der.applyMatrix(mat_pared_grande_der);
	
	var pared_grande = new Conjunto();
	pared_grande.add(pared_grande_izq);
	pared_grande.add(pared_grande_der);
	pared_grande.add(pared_grande_arriba);
	pared_grande.add(pared_grande_abajo);
	
	var centro = pared_grande.getCenter();
	vec3.scale(centro, centro, -1);
	mat_centrar = mat4.create();
	mat4.translate(mat_centrar, mat_centrar, centro);
	pared_grande.applyMatrix(mat_centrar);
	
	var pared_grande_ret = new Conjunto();
	pared_grande_ret.add(pared_grande);
	
	return pared_grande_ret;
}

Cabina.cabinaParedes = function(pared_grande1, pared_grande2, pared_chica1, pared_chica2){
	if(pared_grande1 === undefined) pared_grande1 = Cabina.cabinaParedAncha();
	var mat_grande1 = mat4.create();
	mat4.translate(mat_grande1, mat_grande1, vec3.fromValues(0, 1.25, 0));
	mat4.rotate(mat_grande1, mat_grande1, Math.PI/2, vec3.fromValues(0, 0, 1));
	pared_grande1.applyMatrix(mat_grande1);
	
	if(pared_grande2 === undefined) pared_grande2 = Cabina.cabinaParedAncha();
	var mat_grande2 = mat4.create();
	mat4.translate(mat_grande2, mat_grande2, vec3.fromValues(0, -1.25, 0));
	mat4.rotate(mat_grande2, mat_grande2, Math.PI/2, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_grande2, mat_grande2, Math.PI, vec3.fromValues(0, 0, 1));
	pared_grande2.applyMatrix(mat_grande2);
	
	if(pared_chica1 === undefined) pared_chica1 = Cabina.cabinaParedAngosta();
	var mat_chica1 = mat4.create();
	mat4.translate(mat_chica1, mat_chica1, vec3.fromValues(2, 0, 0));
	//mat4.rotate(mat_chica1, mat_chica1, Math.PI, vec3.fromValues(0, 0, 1));
	pared_chica1.applyMatrix(mat_chica1);
	
	if(pared_chica2 === undefined) pared_chica2 = Cabina.cabinaParedAngosta();
	var mat_chica2 = mat4.create();
	mat4.translate(mat_chica2, mat_chica2, vec3.fromValues(-2, 0, 0));
	mat4.rotate(mat_chica2, mat_chica2, Math.PI, vec3.fromValues(0, 0, 1));
	pared_chica2.applyMatrix(mat_chica2);
	
	var paredes = new Conjunto();
	paredes.add(pared_grande1);
	paredes.add(pared_grande2);
	paredes.add(pared_chica1);
	paredes.add(pared_chica2);
	
	var centro = paredes.getCenter();
	vec3.scale(centro, centro, -1);
	mat_centrar = mat4.create();
	mat4.translate(mat_centrar, mat_centrar, centro);
	paredes.applyMatrix(mat_centrar);
	
	var p_conj = new Conjunto();
	p_conj.add(paredes);
	
	return p_conj;
}

Cabina.cabinaTecho = function(){
	var rect_largo_izq = new Mesh( new Cuadrado() );
	var mat_rect_largo_izq = mat4.create();
	mat4.translate(mat_rect_largo_izq, mat_rect_largo_izq, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_rect_largo_izq, mat_rect_largo_izq, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_rect_largo_izq, mat_rect_largo_izq, vec3.fromValues(4, 0.6, 1));
	rect_largo_izq.applyMatrix(mat_rect_largo_izq);
	
	var rect_largo_der = new Mesh( new Cuadrado() );
	var mat_rect_largo_der = mat4.create();
	mat4.translate(mat_rect_largo_der, mat_rect_largo_der, vec3.fromValues(-1, 0, 0));
	mat4.rotate(mat_rect_largo_der, mat_rect_largo_der, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_rect_largo_der, mat_rect_largo_der, vec3.fromValues(4, 0.6, 1));
	mat4.rotate(mat_rect_largo_der, mat_rect_largo_der, Math.PI, vec3.fromValues(1, 0, 0));
	rect_largo_der.applyMatrix(mat_rect_largo_der);
	
	var rect_largo_adelante = new Mesh( new Cuadrado() );
	var mat_rect_largo_adelante = mat4.create();
	mat4.translate(mat_rect_largo_adelante, mat_rect_largo_adelante, vec3.fromValues(0, 0, 2));
	//mat4.rotate(mat_rect_largo_adelante, mat_rect_largo_adelante, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_rect_largo_adelante, mat_rect_largo_adelante, vec3.fromValues(2, 0.6, 1));
	rect_largo_adelante.applyMatrix(mat_rect_largo_adelante);
	
	var rect_largo_atras = new Mesh( new Cuadrado() );
	var mat_rect_largo_atras = mat4.create();
	mat4.translate(mat_rect_largo_atras, mat_rect_largo_atras, vec3.fromValues(0, 0, -2));
	//mat4.rotate(mat_rect_largo_atras, mat_rect_largo_atras, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_rect_largo_atras, mat_rect_largo_atras, vec3.fromValues(2, 0.6, 1));
	mat4.rotate(mat_rect_largo_atras, mat_rect_largo_atras, Math.PI, vec3.fromValues(1, 0, 0));
	rect_largo_atras.applyMatrix(mat_rect_largo_atras);
	
	var triang1 = new Mesh( new Triangulo() );
	var mat_triang1 = mat4.create();
	mat4.translate(mat_triang1, mat_triang1, vec3.fromValues(0, 0.5*0.6, -2));
	mat4.rotate(mat_triang1, mat_triang1, Math.PI/2.85, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_triang1, mat_triang1, Math.PI/2, vec3.fromValues(0, 0, 1));
	mat4.scale(mat_triang1, mat_triang1, vec3.fromValues(2.236, 2, 1));
	mat4.rotate(mat_triang1, mat_triang1, Math.PI, vec3.fromValues(1, 0, 0));
	triang1.applyMatrix(mat_triang1);
	
	var triang2 = new Mesh( new Triangulo() );
	var mat_triang2 = mat4.create();
	mat4.translate(mat_triang2, mat_triang2, vec3.fromValues(0, 0.5*0.6, 2));
	mat4.rotate(mat_triang2, mat_triang2, -Math.PI/2.85, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_triang2, mat_triang2, Math.PI/2, vec3.fromValues(0, 0, 1));
	mat4.scale(mat_triang2, mat_triang2, vec3.fromValues(2.236, 2, 1));
	triang2.applyMatrix(mat_triang2);
	
	var triang3 = new Mesh( new Triangulo() );
	var mat_triang3 = mat4.create();
	mat4.translate(mat_triang3, mat_triang3, vec3.fromValues(-1, 0.5*0.6, 0));
	mat4.rotate(mat_triang3, mat_triang3, -Math.PI/4, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_triang3, mat_triang3, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_triang3, mat_triang3, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_triang3, mat_triang3, vec3.fromValues(1.414, 4, 1));
	mat4.rotate(mat_triang3, mat_triang3, Math.PI, vec3.fromValues(1, 0, 0));
	triang3.applyMatrix(mat_triang3);
	
	var triang4 = new Mesh( new Triangulo() );
	var mat_triang4 = mat4.create();
	mat4.translate(mat_triang4, mat_triang4, vec3.fromValues(1, 0.5*0.6, 0));
	mat4.rotate(mat_triang4, mat_triang4, Math.PI/4, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_triang4, mat_triang4, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_triang4, mat_triang4, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_triang4, mat_triang4, vec3.fromValues(1.414, 4, 1));
	triang4.applyMatrix(mat_triang4);
	
	var techo = new Conjunto();
	techo.add(rect_largo_izq);
	techo.add(rect_largo_der);
	techo.add(rect_largo_adelante);
	techo.add(rect_largo_atras);
	techo.add(triang1);
	techo.add(triang2);
	techo.add(triang3);
	techo.add(triang4);
	
	return techo;
}

Cabina.cabinaTechoParedes = function(paredes, techo){
	if(paredes === undefined) paredes = Cabina.cabinaParedes();
	var mat_p = mat4.create();
	mat4.rotate(mat_p, mat_p, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.rotate(mat_p, mat_p, Math.PI/2, vec3.fromValues(0, 0, 1));
	paredes.applyMatrix(mat_p);
	
	if(techo === undefined) techo = Cabina.cabinaTecho();
	var mat_t = mat4.create();
	mat4.translate(mat_t, mat_t, vec3.fromValues(0, 1.8, 0));
	mat4.scale(mat_t, mat_t, vec3.fromValues(1.3, 0.8, 1.05));
	techo.applyMatrix(mat_t);
	
	var paredes_techo = new Conjunto();
	paredes_techo.add(paredes);
	paredes_techo.add(techo);
	return paredes_techo;
}

Cabina.cabinaPiso = function(piso_izq, piso_der, piso_atras, piso_adelante, piso_plano){
	if(piso_izq === undefined) piso_izq = new Mesh( new Trapecio(7) );
	var mat_izq = mat4.create();
	mat4.translate(mat_izq, mat_izq, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_izq, mat_izq, 0.4646, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_izq, mat_izq, vec3.fromValues(0.558, 4, 1));
	mat4.translate(mat_izq, mat_izq, vec3.fromValues(0.5, 0, 0));
	piso_izq.applyMatrix(mat_izq);

	if(piso_der === undefined) piso_der = new Mesh( new Trapecio(7) );
	var mat_der= mat4.create();
	mat4.translate(mat_der, mat_der, vec3.fromValues(0, 0, -1));
	mat4.rotate(mat_der, mat_der, -0.4646, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_der, mat_der, vec3.fromValues(0.558, 4, 1));
	mat4.translate(mat_der, mat_der, vec3.fromValues(0.5, 0, 0));
	mat4.rotate(mat_der, mat_der, Math.PI, vec3.fromValues(1, 0, 0));
	piso_der.applyMatrix(mat_der);

	if(piso_atras === undefined) piso_atras = new Mesh( new Trapecio(7) );
	var mat_atras = mat4.create();
	mat4.translate(mat_atras, mat_atras, vec3.fromValues(0, 2, 0));
	mat4.rotate(mat_atras, mat_atras, -0.785, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_atras, mat_atras, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_atras, mat_atras, vec3.fromValues(0.7071, 2, 1));
	mat4.translate(mat_atras, mat_atras, vec3.fromValues(0.5, 0, 0));
	mat4.rotate(mat_atras, mat_atras, Math.PI, vec3.fromValues(1, 0, 0));
	piso_atras.applyMatrix(mat_atras);

	if(piso_adelante === undefined) piso_adelante = new Mesh( new Trapecio(7) );
	var mat_adelante = mat4.create();
	mat4.translate(mat_adelante, mat_adelante, vec3.fromValues(0, -2, 0));
	mat4.rotate(mat_adelante, mat_adelante, 0.785, vec3.fromValues(0, 0, 1));
	mat4.rotate(mat_adelante, mat_adelante, Math.PI/2, vec3.fromValues(1, 0, 0));
	mat4.scale(mat_adelante, mat_adelante, vec3.fromValues(0.7071, 2, 1));
	mat4.translate(mat_adelante, mat_adelante, vec3.fromValues(0.5, 0, 0));
	piso_adelante.applyMatrix(mat_adelante);

	if(piso_plano === undefined) piso_plano = new Mesh( new Cuadrado() );
	var mat_plano = mat4.create();
	mat4.translate(mat_plano, mat_plano, vec3.fromValues(0.5, 0, 0));
	mat4.rotate(mat_plano, mat_plano, Math.PI/2, vec3.fromValues(0, 1, 0));
	mat4.scale(mat_plano, mat_plano, vec3.fromValues(1.5, 3, 1));
	piso_plano.applyMatrix(mat_plano);

	piso = new Conjunto();
	piso.add(piso_izq);
	piso.add(piso_der);
	piso.add(piso_atras);
	piso.add(piso_adelante);
	piso.add(piso_plano);

	return piso;
}