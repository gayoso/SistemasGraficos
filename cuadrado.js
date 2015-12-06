
var Cuadrado = function(w, h){
	this.setRows(w);
	this.setCols(h);
	
	/*this.tangent_buffer = [];
	this.binormal_buffer = [];
	
	this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;*/
	Geometry.call(this, this.gridType);
	this.tangent_buffer = [];
	this.binormal_buffer = [];
	this.init();
}

Cuadrado.prototype = Object.create(Geometry.prototype);
Cuadrado.prototype.constructor = Cuadrado;

Cuadrado.prototype.createGrid = function(){
	this.createUniformPlaneGrid();
}

Cuadrado.prototype.setRows = function(w){
	if(w === undefined){
		w = 2;
	}
	this.rows = w;
}

Cuadrado.prototype.setCols = function(h){
	if(h === undefined){
		h = 2;
	}
	this.cols = h;
}

// crea los puntos de una malla plana con 'rows' filas y 'cols' columnas
Cuadrado.prototype.createUniformPlaneGrid = function(){
	// un lado del plano
	for (var i = 0.0; i < this.rows; i++) { 
		for (var j = 0.0; j < this.cols; j++) {

			// Para cada vértice definimos su posición
			// como coordenada (x, y, z=0)
			var x = i-(this.rows-1.0)/2.0;
			var y = j-(this.cols-1.0)/2.0;
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(0);

			// Para cada vértice definimos su color
			this.color_buffer.push(1.0/this.rows * i);
			this.color_buffer.push(0.2);
			this.color_buffer.push(1.0/this.cols * j);
			
			// defino la normal hacia z positivo
			this.normals_buffer.push(0);
			this.normals_buffer.push(0);
			this.normals_buffer.push(1);
			
			this.tangent_buffer.push(1);
			this.tangent_buffer.push(0);
			this.tangent_buffer.push(0);
			
			this.binormal_buffer.push(0);
			this.binormal_buffer.push(1);
			this.binormal_buffer.push(0);
		};
	};
};