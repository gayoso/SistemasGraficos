/****************************************
AGUA
****************************************/

var Agua = function(){
	Conjunto.call(this);
	
	this.agua = new TexturedMesh("water_diffuse2.jpg", TexturedMesh.mapper_piso, 
					new Cuadrado(), 40, true, 0.2, 0.9, 1.0, 64);
	this.agua.loadNormalTexture("water_normal.jpg");
	this.add( this.agua );
}

Agua.prototype = Object.create(Conjunto.prototype);
Agua.prototype.constructor = Agua;

Agua.prototype.render = function(m){
	
	gl.uniform1i(glProgram.uUseWaterEffect, 1);
	Conjunto.prototype.render.call(this, m);
	gl.uniform1i(glProgram.uUseWaterEffect, 0);
}
