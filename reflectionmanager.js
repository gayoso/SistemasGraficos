/****************************************
REFLECTION MANAGER
Crea cubemaps para reflexion de una lista de archivos e ids como la que aparece aca comentada
Tambien permite agregarle reflexion a un objeto que tenga la funcionalidad 'render', modificando este metodo en tiempo real
****************************************/

var reflectionCubes = new Array;
var objectsOriginalRender = new Array;


var ReflectionManager = function(){
	
}

ReflectionManager.prototype = {
	constructor: ReflectionManager,
	
}

ReflectionManager.addReflectionCubeMap = function(sources, texture_name){
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	/*var cubeFaces = [
		["xpos.png", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
		["xneg.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
		["ypos.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
		["yneg.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
		["zpos.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
		["zneg.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
	];*/

	for (var i = 0; i < sources.length; i++) {

		var image = new Image();
		image.src = sources[i][0];
		gl.texImage2D(sources[i][1], 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
		image.onload = function(texture, face, image) {

			return function() {
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
				gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
			}
		} (texture, sources[i][1], image);
	}
	
	reflectionCubes[texture_name] = texture;
}

ReflectionManager.getReflectionCubeMap = function(name){
	return reflectionCubes[name];
}

ReflectionManager.addReflectionToRenderable = function(object, reflection_name){	
	var originalRender = object["render"];
	objectsOriginalRender[object];
	
	object["render"] = function() {
		gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), true);
		
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, ReflectionManager.getReflectionCubeMap(reflection_name));
		gl.uniform1i(gl.getUniformLocation(glProgram, "uCubeSampler"), 2);
		
		originalRender.apply(object, arguments);
		
		gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), false);
	};
}