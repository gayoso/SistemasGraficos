/****************************************
TEXTURED MESH
Esta clase representa un objeto con textura. Guarda por separado la geometria y la textura
****************************************/

// esto es horrible. ya que js es no tipado, tendria que recibir como unico argumento una estructura 'options' tipo diccionario que se pueda
// chequear que parametros definio el usuario, y los demas usarlos por default.
var TexturedMesh = function(path_to_texture, mapping_function, geometry, cant_tiles, use_lights, ka, kd, ks, shininess, color, color_specular) {
	Mesh.call(this, geometry, use_lights, ka, kd, ks, shininess, color, color_specular);
	
	this.texture_coords_buffer = null;
	this.webgl_texture_coords_buffer = null;
	this.mapping_function = mapping_function;
	this.texture = null;
	this.texture_normals = null;
	//this.texture_height = null;
	
	if(cant_tiles === undefined){
		cant_tiles = 1;
	}
	this.cant_tiles = cant_tiles;
	
	this.loadTexture(path_to_texture);
	this.initBuffers();
	this.has_texture = true;
}

TexturedMesh.mapper_cielo = function (filas, cols){
	var buffer = [];
	for (var i = 0.0; i < filas; i++) {
		for (var j = 0.0; j < cols; j++) {
			
			buffer.push(1-j/cols);
			buffer.push(1-i/filas);
		}
	}
	return buffer;
}

TexturedMesh.mapper_sillas_tope = function(filas, cols, cant_tiles){
	var buffer = [];

	for (var i = 0.0; i < filas; i++) {
		for (var j = 0.0; j < cols; j++) {
			var angulo = j / (cols-1);
			//var x = Math.cos(angulo);
			//var y = Math.sin(angulo);
			//var z = i-(50-1)/2;
			
			buffer.push(angulo);
			buffer.push(i/20);
		}
	}

	return buffer;
}

TexturedMesh.mapper_cuadrado_a_circular = function(filas, cols, cant_tiles){
	var buffer = [];

	for (var i = 0.0; i < filas; i++) {
		for (var j = 0.0; j < cols; j++) {
			var angulo = j / (cols-1);
			//var x = Math.cos(angulo);
			//var y = Math.sin(angulo);
			//var z = i-(50-1)/2;
			
			buffer.push(angulo);
			buffer.push(i/20);
		}
	}

	return buffer;
}

TexturedMesh.mapper_sillas_columna = function(filas, cols, cant_tiles){
	var buffer = [];

	for (var i = 0.0; i < filas; i++) {
		for (var j = 0.0; j < cols; j++) {
			var angulo = j / (cols-1);
			//var x = Math.cos(angulo);
			//var y = Math.sin(angulo);
			//var z = i-(50-1)/2;
			
			buffer.push(i/100);
			buffer.push(angulo);
		}
	}

	return buffer;
}

TexturedMesh.mapper_piso = function(filas, cols, cant_tiles){
	//var cant_tiles = 100;
	var buffer = [];
	
	buffer.push(0);
	buffer.push(0);
	
	buffer.push(cant_tiles);
	buffer.push(0);
	
	buffer.push(0);
	buffer.push(cant_tiles);
	
	buffer.push(cant_tiles);
	buffer.push(cant_tiles);
	
	return buffer;
}

TexturedMesh.mapper_piso_rotado = function(filas, cols, cant_tiles){
	//var cant_tiles = 100;
	var buffer = [];
	
	buffer.push(0);
	buffer.push(cant_tiles);
	
	buffer.push(0);
	buffer.push(0);
	
	buffer.push(cant_tiles);
	buffer.push(cant_tiles);
	
	buffer.push(cant_tiles);
	buffer.push(0);
	
	return buffer;
}

TexturedMesh.mapper_cuadrado_a_triangulo = function(filas, cols, cant_tiles){
	//var cant_tiles = 100;
	var buffer = [];
	
	buffer.push(cant_tiles);
	buffer.push(0);
	
	buffer.push(0);
	buffer.push(0);
	
	buffer.push(cant_tiles/2);
	buffer.push(cant_tiles);
	
	return buffer;
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
		if(repeat > 1){
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
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
TexturedMesh.textures_to_load_repeat = new Array;
TexturedMesh.textures_loaded = new Array;
TexturedMesh.textures_loaded_names = new Array;

TexturedMesh.prototype = Object.create(Mesh.prototype);
TexturedMesh.prototype.constructor = TexturedMesh;

TexturedMesh.handleLoadedTexture = function() {
	var texture = TexturedMesh.textures_to_load.pop();
	var t_name = TexturedMesh.textures_to_load_names.pop();
	var repeat = TexturedMesh.textures_to_load_repeat.pop();
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

TexturedMesh.prototype.loadTexture = function(path_to_texture){
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
	TexturedMesh.textures_to_load_repeat.push(this.cant_tiles);
	this.texture.image.onload = function() {
		TexturedMesh.handleLoadedTexture();
	}
	this.texture.image.src = path_to_texture;
	gl.bindTexture(gl.TEXTURE_2D, null); // esto no se si va
};

TexturedMesh.prototype.loadNormalTexture = function(path_to_normal_texture){
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
	TexturedMesh.textures_to_load_repeat.push(this.cant_tiles);
	this.texture_normals.image.onload = function() {
		TexturedMesh.handleLoadedTexture();
	}
	gl.bindTexture(gl.TEXTURE_2D, null); // esto no se si va
	this.texture_normals.image.src = path_to_normal_texture;
};

TexturedMesh.prototype.initBuffers = function(){
	this.webgl_texture_coords_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coords_buffer);

	this.texture_coords_buffer = this.mapping_function(this.geometry.rows, this.geometry.cols, this.cant_tiles);
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
		gl.uniform1i(gl.getUniformLocation(glProgram, "uNormalSampler"), 1);
		gl.bindTexture(gl.TEXTURE_2D, this.texture_normals);
	}
	
	this.geometry.drawVertexGrid(m_final);
	gl.disableVertexAttribArray(textureCoordAttribute);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, null);
	if(this.texture_normals != null){
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.uniform1i(u_use_normals, false);
	}
	
	Conjunto.prototype.render.call(this);
};