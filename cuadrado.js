
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
	
	// Para cada vértice definimos su posición
	// como coordenada (x, y, z=0)
	/*var x = -1/2;
	var y = -1/2;
	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(0);

	// Para cada vértice definimos su color
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// defino la normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.tangent_buffer.push(-1/2);
	this.tangent_buffer.push(1/2);
	this.tangent_buffer.push(0);
	
	this.binormal_buffer.push(1/2);
	this.binormal_buffer.push(1/2);
	this.binormal_buffer.push(0);
	
	// Para cada vértice definimos su posición
	// como coordenada (x, y, z=0)
	x = -1/2;
	y = 1/2;
	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(0);

	// Para cada vértice definimos su color
	this.color_buffer.push(1.0/this.rows * 0);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 1);
	
	// defino la normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.tangent_buffer.push(1/2);
	this.tangent_buffer.push(1/2);
	this.tangent_buffer.push(0);
	
	this.binormal_buffer.push(1/2);
	this.binormal_buffer.push(-1/2);
	this.binormal_buffer.push(0);
	
	// Para cada vértice definimos su posición
	// como coordenada (x, y, z=0)
	x = 1/2;
	y = -1/2;
	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(0);

	// Para cada vértice definimos su color
	this.color_buffer.push(1.0/this.rows * 1);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 0);
	
	// defino la normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.tangent_buffer.push(1/2);
	this.tangent_buffer.push(-1/2);
	this.tangent_buffer.push(0);
	
	this.binormal_buffer.push(-1/2);
	this.binormal_buffer.push(1/2);
	this.binormal_buffer.push(0);
	
	// Para cada vértice definimos su posición
	// como coordenada (x, y, z=0)
	x = 1/2;
	y = 1/2;
	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(0);

	// Para cada vértice definimos su color
	this.color_buffer.push(1.0/this.rows * 1);
	this.color_buffer.push(0.2);
	this.color_buffer.push(1.0/this.cols * 1);
	
	// defino la normal hacia z positivo
	this.normals_buffer.push(0);
	this.normals_buffer.push(0);
	this.normals_buffer.push(1);
	
	this.tangent_buffer.push(-1/2);
	this.tangent_buffer.push(-1/2);
	this.tangent_buffer.push(0);
	
	this.binormal_buffer.push(-1/2);
	this.binormal_buffer.push(-1/2);
	this.binormal_buffer.push(0);*/
	
	// otro lado del plano
	/*for (var i = 0.0; i < this.rows; i++) { 
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
			
			// defino la normal hacia z positivo
			this.normals_buffer.push(0);
			this.normals_buffer.push(0);
			this.normals_buffer.push(-1);
		};
	};
	
	this.rows++;
	this.rows++;*/
};

/*Cuadrado.prototype.setupWebGLBuffers = function(){

	Geometry.prototype.setupWebGLBuffers.call(this);
	
	// Repetimos los pasos 1. 2. y 3. para la información de las normales
	this.webgl_tangent_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);  
	
	// Repetimos los pasos 1. 2. y 3. para la información de las normales
	this.webgl_binormal_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);  
};*/

// Esta función es la que se encarga de configurar todo lo necesario
// para dibujar el VertexGrid.
/*Cuadrado.prototype.drawVertexGrid = function(m){

	var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
	
	var u_model_matrix = gl.getUniformLocation(glProgram, "uMMatrix");
	var model_matrix_final = mat4.create();
	mat4.multiply(model_matrix_final, m, this.model_matrix);
	gl.uniformMatrix4fv(u_model_matrix, false, model_matrix_final);
	
	var u_normals_matrix = gl.getUniformLocation(glProgram, "uNMatrix");
	var normals_matrix = mat4.create();
	mat4.invert(normals_matrix, model_matrix_final);
	mat4.transpose(normals_matrix, normals_matrix);
	gl.uniformMatrix4fv(u_normals_matrix, false, normals_matrix);

	var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
	gl.enableVertexAttribArray(vertexColorAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
	gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
	
	var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
	gl.enableVertexAttribArray(vertexNormalAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
	gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals_buffer), gl.STATIC_DRAW);
	
	var vertexTangentAttribute = gl.getAttribLocation(glProgram, "aVertexTangent");
	gl.enableVertexAttribArray(vertexTangentAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.vertexAttribPointer(vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
	
	var vertexBinormalAttribute = gl.getAttribLocation(glProgram, "aVertexBinormal");
	gl.enableVertexAttribArray(vertexBinormalAttribute);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.vertexAttribPointer(vertexBinormalAttribute, 3, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

	// Dibujamos.
	gl.drawElements(this.draw_mode, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	gl.disableVertexAttribArray(vertexTangentAttribute);
	gl.disableVertexAttribArray(vertexBinormalAttribute);
	gl.disableVertexAttribArray(vertexPositionAttribute);
	gl.disableVertexAttribArray(vertexColorAttribute);
	gl.disableVertexAttribArray(vertexNormalAttribute);
}*/