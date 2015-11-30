
var Cilindro = function(){
	this.setRows();
	this.setCols();
	
	Geometry.call(this);
	this.init();
}

Cilindro.prototype = Object.create(Geometry.prototype);
Cilindro.prototype.constructor = Cilindro;

Cilindro.prototype.createGrid = function(){
	this.createCilinderGrid();
}

Cilindro.prototype.setRows = function(){
	this.rows = 2;
}

Cilindro.prototype.setCols = function(){
	this.cols = 50;
}

// crea los puntos de una malla cilindrica con 'rows' filas y 'cols' columnas
// rows aumenta el largo del cilindro, cols disminuye que tan 'pixelado' es
Cilindro.prototype.createCilinderGrid = function(){
	// UNA TAPA
	for(var j = 0.0; j < this.cols; j++){
		this.position_buffer.push(0);
		this.position_buffer.push(0);
		this.position_buffer.push(-(this.rows-1)/2);
		
		this.color_buffer.push(1.0);
		this.color_buffer.push(0.2);
		this.color_buffer.push(1.0);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(-1);
	}
	
	// UN BORDE
	for (var j = 0.0; j < this.cols; j++) {

		// duplico los vertices del borde para tener las normales bien de cada cara
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push(Math.cos(angulo));
		this.position_buffer.push(Math.sin(angulo));
		this.position_buffer.push(-(this.rows-1)/2);

		this.color_buffer.push(0.5);
		this.color_buffer.push(0.2);
		this.color_buffer.push(0.3);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(-1);
	}
	
	// CUERPO DEL CILINDRO
	for (var i = 0.0; i < this.rows; i++) {
		for (var j = 0.0; j < this.cols; j++) {

			// Para cada vértice definimos su posición
			// como coordenada (x, y, z=0)
			var angulo = j * 2 * Math.PI / (this.cols-1);
			this.position_buffer.push(Math.cos(angulo));
			this.position_buffer.push(Math.sin(angulo));
			this.position_buffer.push(i-(this.rows-1)/2);

			this.color_buffer.push(0.5);
			this.color_buffer.push(0.2);
			this.color_buffer.push(0.3);
			
			this.normals_buffer.push(Math.cos(angulo));
			this.normals_buffer.push(Math.sin(angulo));
			this.normals_buffer.push(0);
		}
	}
	
	// UN BORDE
	for (var j = 0.0; j < this.cols; j++) {

		// duplico los vertices del borde para tener las normales bien de cada cara
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push(Math.cos(angulo));
		this.position_buffer.push(Math.sin(angulo));
		this.position_buffer.push(1/2);

		this.color_buffer.push(0.5);
		this.color_buffer.push(0.2);
		this.color_buffer.push(0.3);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(1);
	}
	
	// UNA TAPA
	for(var j = 0.0; j < this.cols; j++){
		this.position_buffer.push(0);
		this.position_buffer.push(0);
		this.position_buffer.push(this.rows-1-(this.rows-1)/2);
		
		this.color_buffer.push(1.0);
		this.color_buffer.push(0.2);
		this.color_buffer.push(1.0);
		
		this.normals_buffer.push(0);
		this.normals_buffer.push(0);
		this.normals_buffer.push(1);
	}
	
	this.rows++;
	this.rows++;
	this.rows++;
	this.rows++;
};