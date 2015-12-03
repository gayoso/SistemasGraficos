/****************************************
DIRECTIONAL LIGHT
Esta clase representa una luz direccional, que emana desde en infinito en una direccion en todo punto
Tiene intensidades (especular, difusa) y contribucion a ambiente
Guarda tambien la direccion de la luz en coordenadas de mundo
****************************************/

var DirectionalLight = function(dir, iip, iia) {
	
	this.dir = vec3.create();
	this.ip = vec3.create();
	this.ia = vec3.create();
	this.on = true;
	
	if(dir === undefined)
		dir = vec3.fromValues(0.0, 0.0, 1.0);
	vec3.copy(this.dir, dir);
	
	/*this.lamparita = new Mesh( new Esfera() );
	var m_pos = mat4.create();
	mat4.translate(m_pos, m_pos, this.pos);
	mat4.scale(m_pos, m_pos, vec3.fromValues(2.0, 2.0, 2.0));
	this.lamparita.setTransform(m_pos);*/
	
	if(iip === undefined)
		iip = vec3.fromValues(1.0, 1.0, 1.0);
	vec3.copy(this.ip, iip);
	
	if(iia === undefined)
		iia = vec3.fromValues(1.0, 1.0, 1.0);
	vec3.copy(this.ia, iia);
}

DirectionalLight.prototype = {
	constructor: DirectionalLight
}

DirectionalLight.prototype.render = function(i){
	if(!this.on){
		this.resetUniforms(i);
		return;
	}
	
	var u_location = gl.getUniformLocation(glProgram, "dirLights[" + i + "]." + "direction");
	gl.uniform3fv(u_location, this.dir);
	
	u_location = gl.getUniformLocation(glProgram, "dirLights[" + i + "]." + "ambient");
	gl.uniform3fv(u_location, this.ia);
	
	u_location = gl.getUniformLocation(glProgram, "dirLights[" + i + "]." + "intensity");
	gl.uniform3fv(u_location, this.ip);
	
	//this.lamparita.render();
}

DirectionalLight.prototype.resetUniforms = function(i){
	var u_location = gl.getUniformLocation(glProgram, "dirLights[" + i + "]." + "ambient");
	gl.uniform3fv(u_location, [0, 0, 0]);
	
	u_location = gl.getUniformLocation(glProgram, "dirLights[" + i + "]." + "intensity");
	gl.uniform3fv(u_location, [0, 0, 0]);
}

DirectionalLight.prototype.turnOn = function(){
	this.on = true;
}

DirectionalLight.prototype.turnOff = function(){
	this.on = false;
}