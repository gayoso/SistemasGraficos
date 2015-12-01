/****************************************
TEXTURED MESH
Esta clase representa un objeto con textura. Guarda por separado la geometria y la textura
****************************************/

var TexturedMesh = function(path_to_texture, mapping_function, geometry/*, repeat*/, use_lights, ka, kd, ks, shininess, color, color_specular) {
	Mesh.call(this, geometry, use_lights, ka, kd, ks, shininess, color, color_specular);
	
	this.texture_coords_buffer = null;
	this.webgl_texture_coords_buffer = null;
	this.mapping_function = mapping_function;
	this.texture = null;
	this.texture_normals = null;
	
	//if(repeat === undefined){
	//	repeat = false;
	//}
	
	this.loadTexture(path_to_texture, false/*repeat*/);
	this.initBuffers();
	this.has_texture = true;
}

TexturedMesh.isPowerOf2 = function(value) {
	return (value & (value - 1)) == 0;
}

TexturedMesh.setupTextureFilteringAndMips = function(width, height, repeat){
	if (TexturedMesh.isPowerOf2(width) && TexturedMesh.isPowerOf2(height)) {
		// the dimensions are power of 2 so generate mips and turn on 
		// tri-linear filtering.
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		if(repeat){
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}
	} else {
		// at least one of the dimensions is not a power of 2 so set the filtering
		// so WebGL will render it.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
}

TexturedMesh.textures_to_load = new Array;
TexturedMesh.textures_to_load_names = new Array;
TexturedMesh.textures_loaded = new Array;
TexturedMesh.textures_loaded_names = new Array;

TexturedMesh.prototype = Object.create(Mesh.prototype);
TexturedMesh.prototype.constructor = TexturedMesh;

TexturedMesh.handleLoadedTexture = function(repeat) {
	var texture = TexturedMesh.textures_to_load.pop();
	var t_name = TexturedMesh.textures_to_load_names.pop();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	/*gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
	TexturedMesh.setupTextureFilteringAndMips(texture.image.width, texture.image.height, repeat);
	gl.bindTexture(gl.TEXTURE_2D, null);
	TexturedMesh.textures_loaded.push(texture);
	TexturedMesh.textures_loaded_names.push(t_name);
};

TexturedMesh.prototype.loadTexture = function(path_to_texture, repeat){
	var i = TexturedMesh.textures_loaded_names.indexOf(path_to_texture);
	if(i != -1){
		this.texture = TexturedMesh.textures_loaded[i];
		return;
	}
	i = TexturedMesh.textures_to_load_names.indexOf(path_to_texture);
	if(i != -1){
		this.texture = TexturedMesh.textures_to_load[i];
		return;
	}
	
	this.texture = gl.createTexture();
	this.texture.image = new Image();
	TexturedMesh.textures_to_load.push(this.texture);
	TexturedMesh.textures_to_load_names.push(path_to_texture);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
	if(repeat){
		this.texture.image.onload = function() {
			TexturedMesh.handleLoadedTexture(true);
		}
	} else {
		this.texture.image.onload = function() {
			TexturedMesh.handleLoadedTexture(false);
		}
	}
	this.texture.image.src = path_to_texture;
};

TexturedMesh.prototype.loadNormalTexture = function(path_to_normal_texture, repeat){
	var i = TexturedMesh.textures_loaded_names.indexOf(path_to_normal_texture);
	if(i != -1){
		this.texture_normals = TexturedMesh.textures_loaded[i];
		return;
	}
	i = TexturedMesh.textures_to_load_names.indexOf(path_to_normal_texture);
	if(i != -1){
		this.texture_normals = TexturedMesh.textures_to_load[i];
		return;
	}
	
	this.texture_normals = gl.createTexture();
	this.texture_normals.image = new Image();
	TexturedMesh.textures_to_load.push(this.texture_normals);
	TexturedMesh.textures_to_load_names.push(path_to_normal_texture);
	gl.bindTexture(gl.TEXTURE_2D, this.texture_normals);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
	if(repeat){
		this.texture_normals.image.onload = function() {
			TexturedMesh.handleLoadedTexture(true);
		}
	} else {
		this.texture_normals.image.onload = function() {
			TexturedMesh.handleLoadedTexture(false);
		}
	}
	this.texture_normals.image.src = path_to_normal_texture;
};

TexturedMesh.prototype.initBuffers = function(){
	this.webgl_texture_coords_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coords_buffer);

	this.texture_coords_buffer = this.mapping_function();
	//console.log("coord buffer: " + this.texture_coords_buffer.length);
	//console.log("vertex buffer: " + this.geometry.position_buffer.length);
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coords_buffer), gl.STATIC_DRAW);
	/*this.webgl_texture_coords_buffer.itemSize = 2;
	this.webgl_texture_coords_buffer.numItems = this.texture_coords_buffer.length / 2;*/
};

TexturedMesh.prototype.render = function(m){
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
	
	var textureCoordAttribute = gl.getAttribLocation(glProgram, "aTextureCoord");
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coords_buffer);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uSampler"), 0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	
	var u_use_normals = gl.getUniformLocation(glProgram, "uUseNormalMap");
	if(this.texture_normals != null){
		gl.uniform1i(u_use_normals, true);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.uniform1i(gl.getUniformLocation(glProgram, "uNormalSampler"), 0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
	}
	
	this.geometry.drawVertexGrid(m_final);
	gl.disableVertexAttribArray(textureCoordAttribute);
	gl.uniform1i(u_use_normals, false);
	
	Conjunto.prototype.render.call(this);
};