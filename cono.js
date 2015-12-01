
var Cono = function(_factor){
	this.setRows();
	this.setCols();
	_factor === undefined? this.factor = 0 : this.factor = _factor/10;
	
	Geometry.call(this, this.gridType);
	this.init();
}

Cono.prototype = Object.create(Geometry.prototype);
Cono.prototype.constructor = Cono;

Cono.prototype.createGrid = function(){
	this.createConeGrid();
}

Cono.prototype.setRows = function(){
	this.rows = 2;
}

Cono.prototype.setCols = function(){
	this.cols = 50;
}

Cono.prototype.createGrid = function(){
	this.createConeGrid();
}

// crea los puntos de una malla cilindrica con 'rows' filas y 'cols' columnas
// rows aumenta el largo del cono, cols disminuye que tan 'pixelado' es
Cono.prototype.createConeGrid = function(){
	// tapa
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
	
	//borde
	for (var j = 0.0; j < this.cols; j++) {

		// Para cada vértice definimos su posición
		// como coordenada (x, y, z=0)
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push((1/(this.factor*i+1))*Math.cos(angulo));
		this.position_buffer.push((1/(this.factor*i+1))*Math.sin(angulo));
		this.position_buffer.push(-(this.rows-1)/2);

		this.color_buffer.push(0.5);
		this.color_buffer.push(0.2);
		this.color_buffer.push(0.3);
		
		// normales (arreglar)
		this.normals_buffer.push(Math.cos(angulo));
		this.normals_buffer.push(Math.sin(angulo));
		this.normals_buffer.push(0);
	}
	
	for (var i = 0.0; i < this.rows; i++) {
		for (var j = 0.0; j < this.cols; j++) {

			// Para cada vértice definimos su posición
			// como coordenada (x, y, z=0)
			var angulo = j * 2 * Math.PI / (this.cols-1);
			this.position_buffer.push((1/(this.factor*i+1))*Math.cos(angulo));
			this.position_buffer.push((1/(this.factor*i+1))*Math.sin(angulo));
			this.position_buffer.push(i-(this.rows-1)/2);

			this.color_buffer.push(0.5);
			this.color_buffer.push(0.2);
			this.color_buffer.push(0.3);
			
			// normales (arreglar)
			this.normals_buffer.push((1/(this.factor*i+1))*Math.cos(angulo));
			this.normals_buffer.push((1/(this.factor*i+1))*Math.sin(angulo));
			this.normals_buffer.push(0);
		}
	}
	
	// borde
	for (var j = 0.0; j < this.cols; j++) {

		// Para cada vértice definimos su posición
		// como coordenada (x, y, z=0)
		var angulo = j * 2 * Math.PI / (this.cols-1);
		this.position_buffer.push((1/(this.factor*(this.rows-1)+1))*Math.cos(angulo));
		this.position_buffer.push((1/(this.factor*(this.rows-1)+1))*Math.sin(angulo));
		this.position_buffer.push(this.rows-1-(this.rows-1)/2);

		this.color_buffer.push(0.5);
		this.color_buffer.push(0.2);
		this.color_buffer.push(0.3);
		
		// normales (arreglar)
		this.normals_buffer.push((1/(this.factor*(this.rows-1)+1))*Math.cos(angulo));
		this.normals_buffer.push((1/(this.factor*(this.rows-1)+1))*Math.sin(angulo));
		this.normals_buffer.push(0);
	}
	
	// tapa
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