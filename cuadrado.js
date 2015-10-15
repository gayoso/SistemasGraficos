
var Cuadrado = function(){
	this.setRows();
	this.setCols();
	
	Geometry.call(this, this.gridType);
	this.init();
}

Cuadrado.prototype = Object.create(Geometry.prototype);
Cuadrado.prototype.constructor = Cuadrado;

Cuadrado.prototype.createGrid = function(){
	this.createUniformPlaneGrid();
}

Cuadrado.prototype.setRows = function(){
	this.rows = 2;
}

Cuadrado.prototype.setCols = function(){
	this.cols = 2;
}

// crea los puntos de una malla plana con 'rows' filas y 'cols' columnas
Cuadrado.prototype.createUniformPlaneGrid = function(){		
	for (var i = 0.0; i < this.rows; i++) { 
	   for (var j = 0.0; j < this.cols; j++) {

		   // Para cada vértice definimos su posición
		   // como coordenada (x, y, z=0)
		   this.position_buffer.push(i-(this.rows-1.0)/2.0);
		   this.position_buffer.push(j-(this.cols-1.0)/2.0);
		   this.position_buffer.push(0);

		   // Para cada vértice definimos su color
		   this.color_buffer.push(1.0/this.rows * i);
		   this.color_buffer.push(0.2);
		   this.color_buffer.push(1.0/this.cols * j);
								  
	   };
	};
};

/*Cuadrado.prototype.getLargoMayor = function(){
	vert1 = vec3.fromValues(position_buffer[0], position_buffer[1], position_buffer[2]);
	vert2 = vec3.fromValues(position_buffer[3], position_buffer[4], position_buffer[5]);
	vert3 = vec3.fromValues(position_buffer[6], position_buffer[7], position_buffer[8]);
	
	largo1 = vec3.distance(vert1, vert2);
	largo2 = vec3.distance(vert1, vert3);
	largo3 = vec3.distance(vert2, vert3);
	
	return Math.max.apply(Math, [largo1, largo2, largo3]);
}

Cuadrado.prototype.getLargoMenor = function(){
	vert1 = vec3.fromValues(position_buffer[0], position_buffer[1], position_buffer[2]);
	vert2 = vec3.fromValues(position_buffer[3], position_buffer[4], position_buffer[5]);
	vert3 = vec3.fromValues(position_buffer[6], position_buffer[7], position_buffer[8]);
	
	largo1 = vec3.distance(vert1, vert2);
	largo2 = vec3.distance(vert1, vert3);
	largo3 = vec3.distance(vert2, vert3);
	
	return Math.max.apply(Math, [largo1, largo2, largo3]);
}*/