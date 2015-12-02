function loadCubemapFace(target, texture, src) {
	var image = new Image();
	image.onload = function() {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
		gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	};
	image.src = src;
}; 


function initCubemapTexture(srcs) {
	var cubeTexture = gl.createTexture();
	
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	//gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
	
	for (var property in srcs) {
		if (srcs.hasOwnProperty(property)) {
			TextureHandler.loadCubemapFace(property, cubeTexture, srcs[property]);
		}
	}
	
	return cubeTexture;
};

var Skybox = function() {
	this.texture = initCubemapTexture(this.initTextureSources());
	this.cube = new Mesh( new Cubo() );
};

Skybox.prototype.initTextureSources = function() {
	var sources = {};
	
	sources[gl.TEXTURE_CUBE_MAP_POSITIVE_X] = "positive_x.png";
	sources[gl.TEXTURE_CUBE_MAP_NEGATIVE_X] = "negative_x.png";
	sources[gl.TEXTURE_CUBE_MAP_POSITIVE_Y] = "positive_y.png";
	sources[gl.TEXTURE_CUBE_MAP_NEGATIVE_Y] = "negative_y.png";
	sources[gl.TEXTURE_CUBE_MAP_POSITIVE_Z] = "positive_z.png";
	sources[gl.TEXTURE_CUBE_MAP_NEGATIVE_Z] = "negative_z.png";
	
	return sources;
};

Skybox.prototype.render = function(m) {
	gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), true);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uDrawSkyBox"), true);
	
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uCubeSampler"), 2);
	
	this.cube.render(m);
	
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), false);
	gl.uniform1i(gl.getUniformLocation(glProgram, "uDrawSkyBox"), false);
};