
var Circulo = function(){
	
	Cilindro.call(this, this.gridType);
}

Circulo.prototype = Object.create(Cilindro.prototype);
Circulo.prototype.constructor = Circulo;

Circulo.prototype.createGrid = function(){
	this.createCircleGrid();
}

Circulo.prototype.setRows = function(){
	this.rows = 2;
}

Circulo.prototype.setCols = function(){
	this.cols = 50;
}

Circulo.prototype.createCircleGrid = function(){
	
	// UNA TAPA
	for(var j = 0.0; j < this.cols; j++){
		this.position_buffer.push(0);
		this.position_buffer.push(0);
		this.position_buffer.push(0);
		
		this.color_buffer.push(1.0);
		this.color_buffer.push(0.2);
		this.color_buffer.push(1.0);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(1);
	}
	
	// CUERPO
	for (var j = 0.0; j < this.cols; j++) {

		// duplico los vertices del borde para tener las normales bien de cada cara
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push(Math.cos(angulo));
		this.position_buffer.push(Math.sin(angulo));
		this.position_buffer.push(0);

		this.color_buffer.push(0.5);
		this.color_buffer.push(0.2);
		this.color_buffer.push(0.3);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(1);
	}
}