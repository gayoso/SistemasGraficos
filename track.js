
var Track = function() {
	Conjunto.call(this);
	
	this.cil1 = new Mesh( new Cilindro() );
	var m1 = mat4.create();
	mat4.translate(m1, m1, vec3.fromValues(-2, 0, 0));
	mat4.scale(m1, m1, vec3.fromValues(0.5, 0.5, 4));
	mat4.translate(m1, m1, vec3.fromValues(0, 0, 0.5));
	this.cil1.applyMatrix(m1);
	
	this.cil2 = new Mesh( new Cilindro() );
	var m2 = mat4.create();
	mat4.translate(m2, m2, vec3.fromValues(2, 0, 0));
	mat4.scale(m2, m2, vec3.fromValues(0.5, 0.5, 4));
	mat4.translate(m2, m2, vec3.fromValues(0, 0, 0.5));
	this.cil2.applyMatrix(m2);
	
	this.cilmedio = new Mesh( new Cilindro() );
	var m3 = mat4.create();
	mat4.scale(m3, m3, vec3.fromValues(0.25, 0.25, 4));
	mat4.translate(m3, m3, vec3.fromValues(0, 0, 0.5));
	this.cilmedio.applyMatrix(m3);
	
	this.soporte = new Mesh( new Cubo() );
	var m4 = mat4.create();
	mat4.scale(m4, m4, vec3.fromValues(2.5, 0.5, 1.5));
	mat4.translate(m4, m4, vec3.fromValues(0, 0, 0.5));
	this.soporte.applyMatrix(m4);
	
	this.track = new Conjunto();
	this.track.add(this.cil1);
	this.track.add(this.cil2);
	this.track.add(this.cilmedio);
	this.track.add(this.soporte);
	
	this.add(this.track);
}

Track.prototype = Object.create(Conjunto.prototype);
Track.prototype.constructor = Track;

Track.prototype.getLargo = function(){
	var orig = this.getOrigen();
	var fin = this.getFin();
	return vec3.distance(orig, fin);
}

Track.prototype.getOrigen = function(){
	var orig1 = vec3.fromValues(this.cil1.geometry.position_buffer[0],
								this.cil1.geometry.position_buffer[1],
								this.cil1.geometry.position_buffer[2]);
	var orig2 = vec3.fromValues(this.cil2.geometry.position_buffer[0],
								this.cil2.geometry.position_buffer[1],
								this.cil2.geometry.position_buffer[2]);
	var orig = vec3.fromValues((orig1[0]+orig2[0])/2, (orig1[1]+orig2[1])/2, (orig1[2]+orig2[2])/2);
	return orig;
}

Track.prototype.getFin = function(){
	var fin1 = vec3.fromValues(this.cil1.geometry.position_buffer[this.cil1.geometry.position_buffer.length-3],
								this.cil1.geometry.position_buffer[this.cil1.geometry.position_buffer.length-2],
								this.cil1.geometry.position_buffer[this.cil1.geometry.position_buffer.length-1]);
	var fin2 = vec3.fromValues(this.cil2.geometry.position_buffer[this.cil2.geometry.position_buffer.length-3],
								this.cil2.geometry.position_buffer[this.cil2.geometry.position_buffer.length-2],
								this.cil2.geometry.position_buffer[this.cil2.geometry.position_buffer.length-1]);
	var fin = vec3.fromValues((fin1[0]+fin2[0])/2, (fin1[1]+fin2[1])/2, (fin1[2]+fin2[2])/2);
	return fin;
}

Track.prototype.fitToSegment = function(p0, p1){
	// asumo que estoy en el 0,0,0
	
	var p1_orig = vec3.create();
	vec3.subtract(p1_orig, p0, p1);
	vec3.normalize(p1_orig, p1_orig);
	
	var mi_p_orig = vec3.create();
	vec3.subtract(mi_p_orig, this.getFin(), this.getOrigen());
	vec3.normalize(mi_p_orig, mi_p_orig);
	var u = vec3.clone(mi_p_orig);
	
	var A = vec3.clone(p1_orig);
	var B = vec3.clone(mi_p_orig);
	
	var cross_AB = vec3.create();
	vec3.cross(cross_AB, B, A);
	var cross = vec3.length(cross_AB);
	var dot = vec3.dot(A, B);
	var angulo = Math.acos(dot);
	
	var v = vec3.clone(A);
	var temp = vec3.clone(B);
	vec3.scale(temp, temp, dot);
	vec3.subtract(v, A, temp);
	vec3.normalize(v, v);
	
	var cross_BA = vec3.create();
	vec3.cross(cross_BA, A, B);
	var w = vec3.clone(cross_BA);
	
	var F = mat3.create();
	F[0] = u[0]; 	F[1] = v[0]; 	F[2] = w[0];
	F[3] = u[1]; 	F[4] = v[1]; 	F[5] = w[1];
	F[6] = u[2]; 	F[7] = v[2];	F[8] = w[2];
	
	var G = mat3.create();
	G[0] = dot; 	G[1] = -cross; 	G[2] = 0;
	G[3] = cross; 	G[4] = dot; 	G[5] = 0;
	G[6] = 0; 		G[7] = 0; 		G[8] = 1;
	
	var F_inv = mat3.create();
	mat3.invert(F_inv, F);
	
	var rot = mat3.create();
	mat3.multiply(rot, F, G);
	mat3.multiply(rot, rot, F_inv);
	
	var mfinal = mat4.create();
	mfinal[0]  = rot[0];	mfinal[1]  = rot[1];	mfinal[2]  = rot[2];	mfinal[3] = 0;
	mfinal[4]  = rot[3];	mfinal[5]  = rot[4];	mfinal[6]  = rot[5];	mfinal[7] = 0;
	mfinal[8]  = rot[6];	mfinal[9]  = rot[7];	mfinal[10] = rot[8];	mfinal[11] = 0;
	mfinal[12] = 0; 		mfinal[13] = 0; 		mfinal[14] = 0; 		mfinal[15] = 1;
	this.applyMatrix(mfinal);
	
	var m1 = mat4.create();
	mat4.translate(m1, m1, p0);
	this.applyMatrix(m1);
}