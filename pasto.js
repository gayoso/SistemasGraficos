/****************************************
PASTO
****************************************/

var Pasto = function(){
	Conjunto.call(this);
	
	this.pasto = new TexturedMesh( "grass_diffuse2.jpg", TexturedMesh.mapper_piso_terrain, new Cuadrado(150, 150), 10, true, 0.5, 1, 0.5);
	this.pasto.loadNormalTexture("grass_normal2.jpg");
	this.pasto.loadDisplacementTexture("grass_displacement.jpg");
	this.add( this.pasto );
	this.use_grass_effect = false;
}

Pasto.prototype = Object.create(Conjunto.prototype);
Pasto.prototype.constructor = Pasto;

Pasto.prototype.render = function(m){
	if(this.use_grass_effect == true){
		gl.uniform1i(glProgram.uUseGrassEffect, true);
	}
	Conjunto.prototype.render.call(this, m);
	gl.uniform1i(glProgram.uUseGrassEffect, false);
}

Pasto.prototype.toggleGrassEffect = function(){
	this.use_grass_effect = !this.use_grass_effect;
}