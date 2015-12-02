/****************************************
SCENE
Guarda los objetos a dibujar, las luces y podria tener tambien las camaras.
Se encarga de cargar lo necesario a los shaders en cada dibujado.
****************************************/

var Scene = function() {
	
	this.conjuntos = [];
	this.lights = [];
	this.timer = new Timer();
	this.timer.start();
}

Scene.prototype = {
	constructor: Scene,
	
	addConjunto: function(conj){
		this.conjuntos.push(conj);
	},
	
	addLight: function(light){
		if(this.lights.length == 50){
			throw new Error("Se llego al maximo de luces");
		}
		this.lights.push(light);
	},
	
	render: function(){
		
		/*gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), true);
		
		gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, ReflectionManager.getReflectionCubeMap("background"));*/
        gl.uniform1i(gl.getUniformLocation(glProgram, "uCubeSampler"), 2);
		
		/********* */
	
		var u_num_lights = gl.getUniformLocation(glProgram, "numLights");
		gl.uniform1f(u_num_lights, this.lights.length);
		
		var u_time = gl.getUniformLocation(glProgram, "uTime");
		gl.uniform1f(u_time, this.timer.elapsed_miliseconds());
		
		for(var i = 0, l = this.lights.length; i < l; ++i){
			this.lights[i].render(i);
		}
		
		for(var i = 0, l = this.conjuntos.length; i < l; ++i){
			this.conjuntos[i].render();
		}
		
		/*gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		gl.uniform1i(gl.getUniformLocation(glProgram, "uUseReflection"), false);*/
	}
}