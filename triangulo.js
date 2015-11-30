
var Triangulo = function(){
	this.setRows();
	this.setCols();
	
	Geometry.call(this, this.gridType);
	this.init();
}

Triangulo.prototype = Object.create(Geometry.prototype);
Triangulo.prototype.constructor = Triangulo;

Triangulo.prototype.createGrid = function(){
	this.createTrianguloGrid();
}

Triangulo.prototype.setRows = function(){
	this.rows = 2;
}

Triangulo.prototype.setCols = function(){
	this.cols = 2;
}

Triangulo.prototype.createIndexBuffer = function(){
	this.index_buffer.push(0);
	this.index_buffer.push(1);
	this.index_buffer.push(2);
}

// crea los puntos de una malla trapezoidal con 'rows' filas y 'cols' columnas
Triangulo.prototype.createTrianguloGrid = function(){
	//var angulo = Math.PI*26.56/180;
	
	this.position_buffer.push(0);
	this.position_buffer.push(-0.5);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.position_buffer.push(0);
	this.position_buffer.push(0.5);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 1);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.position_buffer.push(1);
	this.position_buffer.push(0);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 1);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	
	// otro lado del triangulo
	/*this.position_buffer.push(0);
	this.position_buffer.push(-0.5);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(-1);
	
	this.position_buffer.push(0);
	this.position_buffer.push(0.5);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 1);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(-1);
	
	this.position_buffer.push(1);
	this.position_buffer.push(0);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 1);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(-1);
	
	this.rows++;
	this.rows++;*/
}