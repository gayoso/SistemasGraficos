/****************************************
POINT LIGHT
Esta clase representa una luz puntual, que emana en todas las direcciones
Puse que se dibuje una esfera en donde esta la luz para que sea mas facil ubicarla
Tiene intensidades (especular, difusa) y contribucion a ambiente
Guarda tambien la posicion de la luz en coordenadas de mundo
****************************************/

var PointLight = function(ppos, iip, iia) {
	
	this.pos = vec3.create();
	this.ip = vec3.create();
	this.ia = vec3.create();
	
	if(ppos === undefined)
		ppos = vec3.fromValues(0.0, 0.0, 0.0);
	vec3.copy(this.pos, ppos);
	
	this.lamparita = new Mesh( new Esfera() );
	var m_pos = mat4.create();
	mat4.translate(m_pos, m_pos, this.pos);
	mat4.scale(m_pos, m_pos, vec3.fromValues(2.0, 2.0, 2.0));
	this.lamparita.setTransform(m_pos);
	
	if(iip === undefined)
		iip = vec3.fromValues(1.0, 1.0, 1.0);
	vec3.copy(this.ip, iip);
	
	if(iia === undefined)
		iia = vec3.fromValues(1.0, 1.0, 1.0);
	vec3.copy(this.ia, iia);
}

PointLight.prototype = {
	constructor: PointLight
}

PointLight.prototype.render = function(i){
	var u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "position");
	gl.uniform3fv(u_location, this.pos);
	
	u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "ambient");
	gl.uniform3fv(u_location, this.ia);
	
	u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "intensity");
	gl.uniform3fv(u_location, this.ip);
	
	this.lamparita.render();
}