
var Dome = function(){
	this.setRows();
	this.setCols();
	
	Geometry.call(this, this.gridType);
	this.init();
}

Dome.prototype = Object.create(Geometry.prototype);
Dome.prototype.constructor = Dome;

Dome.prototype.createGrid = function(){
	this.createDomeGrid();
}

Dome.prototype.setRows = function(){
	this.rows = 50;
}

Dome.prototype.setCols = function(){
	this.cols = 50;
}

// crea los puntos de una malla esferica con 'rows' filas y 'cols' columnas
// rows disminuye que tan 'pixelado' es en un eje, cols disminuye que tan 'pixelado' es en el otro eje
Dome.prototype.createDomeGrid = function(){
	for (var i = 0.0; i < this.rows; i++) { 
	   for (var j = 0.0; j < this.cols; j++) {

		   var angulo1 = j * 2 * Math.PI / ((this.cols-1)*2);
		   var angulo2 = i * 2 * Math.PI / ((this.rows-1)*2);
		   var x = Math.sin(angulo2)*Math.cos(angulo1), y = Math.sin(angulo2)*Math.sin(angulo1), z = Math.cos(angulo2);
		   this.position_buffer.push((x*x+y*y+z*z)*x);
		   this.position_buffer.push((x*x+y*y+z*z)*y);
		   this.position_buffer.push((x*x+y*y+z*z)*z);

		   this.color_buffer.push(1.0/this.rows * i);
		   this.color_buffer.push(0.2);
		   this.color_buffer.push(1.0);
		   
		   this.normals_buffer.push((x*x+y*y+z*z)*x);
		   this.normals_buffer.push((x*x+y*y+z*z)*y);
		   this.normals_buffer.push((x*x+y*y+z*z)*z);
	   }
	}
}