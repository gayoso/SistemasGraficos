/****************************************
MESH
Esta clase es en definitiva un 'Conjunto' que tiene un objeto 'Geometry'
****************************************/

var Mesh = function(geometry, use_lights, ka, kd, ks, shininess, color, color_specular){
	Conjunto.call(this);
	
	this.geometry = geometry;
	// color del objeto
	if(color === undefined)
		color = Color.RED;
	this.color = color;
	// color especular de un material u objeto
	if(color_specular === undefined)
		color_specular = vec3.fromValues(1.0, 1.0, 1.0);
	this.color_specular = color_specular;
	// cte de iluminacion ambiente para cada material
	if(ka === undefined)
		ka = 0.2;
	this.ka = ka;
	// cte de iluminacion difusa para cada material
	if(kd === undefined)
		kd = 0.9;
	this.kd = kd;
	// cte de iluminacion especular para cada material
	if(ks === undefined)
		ks = 0.2;
	this.ks = ks;
	// cte de detalle especular. cuanto mas grande, mas chico el detalle especular
	if(shininess === undefined)
		shininess = 64.0;
	this.shininess = shininess;
	// bool que define si es afectado por luces
	if(use_lights === undefined)
		use_lights = true;
	this.use_lights = use_lights;
	// no tiene textura, para eso es TexturedMesh
	this.has_texture = false;
}

Mesh.prototype = Object.create(Conjunto.prototype);
Mesh.prototype.constructor = Mesh;

Mesh.prototype.setColorSpecular = function(color_specular){
	Conjunto.prototype.setColorSpecular.call(this);
	this.color_specular = color_specular;
}

Mesh.prototype.setKa = function(ka){
	Conjunto.prototype.setKa.call(this);
	this.ka = ka;
}

Mesh.prototype.setKd = function(kd){
	Conjunto.prototype.setKd.call(this);
	this.kd = kd;
}

Mesh.prototype.setKs = function(ks){
	Conjunto.prototype.setKs.call(this);
	this.ks = ks;
}

Mesh.prototype.setShininess = function(shininess){
	Conjunto.prototype.setShininess.call(this);
	this.shininess = shininess;
}

Mesh.prototype.setUseLights = function(u){
	Conjunto.prototype.setUseLights.call(this);
	this.use_lights = u;
}

Mesh.prototype.clone = function(){
	var clon = Conjunto.prototype.clone.call(this);
	clon.geometry = this.geometry.clone();
	return clon;
}

Mesh.prototype.updateMatrix = function(){
	Conjunto.prototype.updateMatrix.call(this);
	
	//this.geometry.setTransform(this.matrix_total);
};

Mesh.prototype.moveVertex = function(i, x, y, z){
	this.geometry.moveVertex(i, x, y, z);
};

Mesh.prototype.render = function(m){
	var m_final = mat4.create();
	if(m === undefined) m = mat4.create();
	mat4.multiply(m_final, m, this.matrix_local);
	
	var u_color_specular = gl.getUniformLocation(glProgram, "uColorSpecular");
	gl.uniform3fv(u_color_specular, this.color_specular);
	
	var u_ka = gl.getUniformLocation(glProgram, "uKa");
	gl.uniform1f(u_ka, this.ka);
	
	var u_kd = gl.getUniformLocation(glProgram, "uKd");
	gl.uniform1f(u_kd, this.kd);
	
	var u_ks = gl.getUniformLocation(glProgram, "uKs");
	gl.uniform1f(u_ks, this.ks);
	
	var u_shininess = gl.getUniformLocation(glProgram, "uShininess");
	gl.uniform1f(u_shininess, this.shininess);
	
	var u_use_lights = gl.getUniformLocation(glProgram, "uUseLights");
	gl.uniform1i(u_use_lights, this.use_lights);
	
	var u_has_texture = gl.getUniformLocation(glProgram, "uHasTexture");
	gl.uniform1i(u_has_texture, this.has_texture);
	
	this.geometry.drawVertexGrid(m_final);
	
	Conjunto.prototype.render.call(this);
};

Mesh.prototype.add = function(object){
	if(object instanceof Geometry){
		this.geometry = object;
	} else {
		Conjunto.prototype.add.call(this, object);
	}
};

// modifica los vertices segun una matriz de escala+rotacion+traslacion
Mesh.prototype.applyMatrix = function(m){
	//this.geometry.applyMatrix(m);
	//mat4.multiply(this.matrix_local, m, this.matrix_local);
	Conjunto.prototype.applyMatrix.call(this, m);
};

Mesh.prototype.getCenter = function(m){
	if(m === undefined) m = mat4.create();
	var m_final = mat4.create();
	mat4.multiply(m_final, m, this.matrix_local);
	var centro = this.geometry.getCenter(m_final);
	if(this.children.length > 0){
		var hijos_centro = Conjunto.prototype.getCenter.call(this);
		vec3.add(centro, centro, hijos_centro);
		vec3.scale(centro, centro, 0.5);
	}
	return centro;
};

Mesh.prototype.setColor = function(color){
	Conjunto.prototype.setColor.call(this);
	this.geometry.setColor(color);
};