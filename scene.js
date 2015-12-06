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
	
	removeConjunto: function(conj){
		var index = this.conjuntos.indexOf(conj);
		if(index > -1){
			this.conjuntos.splice(index, 1);
		}
	},
	
	addLight: function(light){
		if(this.lights.length == 50){
			throw new Error("Se llego al maximo de luces");
		}
		this.lights.push(light);
	},
	
	removeLight: function(light){
		var index = this.lights.indexOf(light);
		if(index > -1){
			this.lights[index].resetUniforms();
			this.lights.splice(index, 1);
		}
	},
	
	turnOffLight: function(light){
		var index = this.lights.indexOf(light);
		if(index > -1){
			this.lights[index].turnOff();
			/*this.lights[index].resetUniforms(index);
			this.lights.splice(index, 1);*/
		}
	},
	
	turnOnLight: function(light){
		var index = this.lights.indexOf(light);
		if(index > -1){
			this.lights[index].turnOn();
			/*this.lights[index].resetUniforms(index);
			this.lights.splice(index, 1);*/
		}
	},
	
	render: function(){
	
		
		/********* */
	
		gl.uniform1f(glProgram.numLights, this.lights.length);
		
		gl.uniform1f(glProgram.uTime, this.timer.elapsed_miliseconds());
		
		for(var i = 0, l = this.lights.length; i < l; ++i){
			this.lights[i].render();
		}
		
		for(var i = 0, l = this.conjuntos.length; i < l; ++i){
			this.conjuntos[i].render();
		}
	}
}