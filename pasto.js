/****************************************
PASTO
****************************************/

var Pasto = function(){
	Conjunto.call(this);
	
	this.pasto = new TexturedMesh( "grass_diffuse2.jpg", TexturedMesh.mapper_piso_terrain, new Cuadrado(150, 150), 10, true, 0.5, 1, 0.5);
	this.pasto.loadNormalTexture("grass_normal2.jpg");
	this.pasto.loadDisplacementTexture("grass_displacement.jpg");
	this.add( this.pasto );
}

Pasto.prototype = Object.create(Conjunto.prototype);
Pasto.prototype.constructor = Pasto;

Pasto.prototype.render = function(m){
	
	var u_user_grass = gl.getUniformLocation(glProgram, "uUseGrassEffect");
	gl.uniform1i(u_user_grass, 1);
	Conjunto.prototype.render.call(this, m);
	gl.uniform1i(u_user_grass, 0);
}
