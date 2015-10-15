
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
	
	this.position_buffer.push(0);
	this.position_buffer.push(0.5);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 1);
	
	this.position_buffer.push(1);
	this.position_buffer.push(0);
	this.position_buffer.push(0);
	
	this.color_buffer.push(1.0/this.rows * 1);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	/*for (var i = 0.0; i < this.rows; i++) {
		var dif = i * Math.tan(angulo);
	   for (var j = 0.0; j < this.cols; j++) {
		   
		   // x
		   this.position_buffer.push(i-(this.rows-1.0)/2.0);
		   // y
		   //this.position_buffer.push(j-(this.cols-1.0)/2.0);
		   var centrar_en_cols = -(this.cols-1.0)/2.0;
		   if(j+centrar_en_cols > 0) centrar_en_cols -= dif;
		   else if (j+centrar_en_cols < 0) centrar_en_cols += dif;
		   this.position_buffer.push(j+centrar_en_cols);
		   // z
		   this.position_buffer.push(0);

		   // Para cada vértice definimos su color
		   this.color_buffer.push(1.0/this.rows * i);
		   this.color_buffer.push(0.2);
		   this.color_buffer.push(1.0/this.cols * j);
								  
	   };
	};*/
}