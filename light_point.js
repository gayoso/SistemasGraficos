/****************************************
POINT LIGHT
Esta clase representa una luz puntual, que emana en todas las direcciones
Puse que se dibuje una esfera en donde esta la luz para que sea mas facil ubicarla
Tiene intensidades (especular, difusa) y contribucion a ambiente
Guarda tambien la posicion de la luz en coordenadas de mundo
****************************************/

var point_index = 0;

var PointLight = function(ppos, iip, iia) {
	this.index = point_index;
	point_index += 1;
	this.pos = vec3.create();
	this.ip = vec3.create();
	this.ia = vec3.create();
	this.on = true;
	
	if(ppos === undefined)
		ppos = vec3.fromValues(0.0, 0.0, 0.0);
	vec3.copy(this.pos, ppos);
	
	this.lamparita = new Conjunto();
	this.bombilla = new Mesh( new Esfera() );
	this.bombilla.setColor(Color.BLACK);
	this.soporte = new Mesh( new Cilindro() );
	this.lamparita.add(this.bombilla);
	this.lamparita.add(this.soporte);
	var m_sop = mat4.create();
	mat4.translate(m_sop, m_sop, vec3.fromValues(0, -5.5, 0));
	mat4.scale(m_sop, m_sop, vec3.fromValues(0.7, 10.0, 0.7));
	mat4.rotate(m_sop, m_sop, Math.PI/2, vec3.fromValues(1, 0, 0));
	this.soporte.applyMatrix(m_sop);
	this.soporte.setColor(Color.BLACK);
	
	var m_pos = mat4.create();
	mat4.translate(m_pos, m_pos, this.pos);
	mat4.scale(m_pos, m_pos, vec3.fromValues(0.5, 0.5, 0.5));
	this.lamparita.applyMatrix(m_pos);
	
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

PointLight.prototype.render = function(){
	this.lamparita.render();
	
	var i = this.index;

	if(!this.on){
		this.resetUniforms();
		return;
	}
	
	//var u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "position");
	gl.uniform3fv(glProgram.pointLights[i][0], this.pos);
	
	//u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "ambient");
	gl.uniform3fv(glProgram.pointLights[i][1], this.ia);
	
	//u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "intensity");
	gl.uniform3fv(glProgram.pointLights[i][2], this.ip);	
}

PointLight.prototype.resetUniforms = function(){
	var i = this.index;
	
	//var u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "ambient");
	gl.uniform3fv(glProgram.pointLights[i][1], [0, 0, 0]);
	
	//u_location = gl.getUniformLocation(glProgram, "pointLights[" + i + "]." + "intensity");
	gl.uniform3fv(glProgram.pointLights[i][2], [0, 0, 0]);
}

PointLight.prototype.turnOn = function(){
	this.on = true;
	this.bombilla.setColor(Color.WHITE);
}

PointLight.prototype.turnOff = function(){
	this.on = false;
	this.bombilla.setColor(Color.Gray80);
}