
var Trapecio = function(_angulo){
	if(_angulo < 0 || _angulo >25){
		throw new Error("El angulo del trapecio debe estar entre 0 y 25");
	} else {
		this.angulo = Math.PI*_angulo/180;
	}
	this.setRows();
	this.setCols();
	
	Geometry.call(this, this.gridType);
	this.tangent_buffer = [];
	this.binormal_buffer = [];
	this.init();
}

Trapecio.prototype = Object.create(Geometry.prototype);
Trapecio.prototype.constructor = Trapecio;

Trapecio.prototype.createGrid = function(){
	this.createTrapecioGrid();
}

Trapecio.prototype.setRows = function(){
	this.rows = 2;
}

Trapecio.prototype.setCols = function(){
	this.cols = 2;
}

// crea los puntos de una malla trapezoidal con 'rows' filas y 'cols' columnas
Trapecio.prototype.createTrapecioGrid = function(){
	//var angulo = Math.PI*10/180;

	for (var i = 0.0; i < this.rows; i++) {
		var dif = i * Math.tan(this.angulo);
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
			
			// normal hacia z positivo
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
	
	
	// otro lado del trapecio
	/*for (var i = 0.0; i < this.rows; i++) {
		var dif = i * Math.tan(this.angulo);
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
			
			// normal hacia z positivo
			this.normals_buffer.push(0);
			this.normals_buffer.push(0);
			this.normals_buffer.push(-1);
		};
	};
	
	this.rows++;
	this.rows++;*/
}