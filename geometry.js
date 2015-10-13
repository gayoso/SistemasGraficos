var GridType = {
	PLANE : 0,
	CILINDER : 1,
	SPHERE : 2
}

var Geometry = function(_rows, _cols, _gridType) {
	// esto deberia cambiar tal vez, y esta clase ser mas general y otra que herede de esta tener esto
	this.cols = _cols;
	this.rows = _rows;
	this.gridType = _gridType;
	
	// hay generacion de indices para TRINANGLE_STRIP y TRIANGLES
	this.draw_mode = gl.TRIANGLE_STRIP;
	
	// buffers
	this.position_buffer = [];
	this.color_buffer = [];
	this.index_buffer = [];
	
	// guardo la inversa de la ultima matriz que aplique para poder recuperar los puntos originales
	this.last_matrix = mat4.create();
	
	// cosas de webgl
	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;
}

Geometry.prototype = {
	constructor: Geometry,
	
	// aplica la matriz que se quiere, y multiplica la ultima inversa por la inversa de la nueva transformacion
	// (chequear, no lo probe asi que no se si anda, o la multiplicacion va al reves)
	applyMatrix: function(matrix) {
		
		for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			var vertex = vec3.fromValues(this.position_buffer[i],
										this.position_buffer[i+1],
										this.position_buffer[i+2]);
			vec3.transformMat4(vertex, vertex, matrix);
			this.position_buffer.splice(i, 3, vertex[0], vertex[1], vertex[2]);
		}
		var matrix_inv = mat4.create();
		mat4.invert(matrix_inv, matrix);
		mat4.multiply(this.last_matrix, this.last_matrix, matrix_inv);
	},
	
	// multiplica los vertices por la inversa de la ultima matriz que se aplico para volver a los vertices originales
	// luego aplica la matriz que se quiere, y se guarda su inversa
	setTransform: function(matrix) {
		for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			var vertex = vec3.fromValues(this.position_buffer[i],
										this.position_buffer[i+1],
										this.position_buffer[i+2]);
			vec3.transformMat4(vertex, vertex, this.last_matrix);
			this.position_buffer.splice(i, 3, vertex[0], vertex[1], vertex[2]);
		}
		
		for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			var vertex = vec3.fromValues(this.position_buffer[i],
										this.position_buffer[i+1],
										this.position_buffer[i+2]);
			vec3.transformMat4(vertex, vertex, matrix);
			this.position_buffer.splice(i, 3, vertex[0], vertex[1], vertex[2]);
		}
		mat4.invert(this.last_matrix, matrix);
	},
	
	// funcion 'publica' que deberian llamar de afuera para crear la malla de puntos, segun la forma deseada
	createGrid: function(){
		if(this.gridType == GridType.PLANE){
			this.createUniformPlaneGrid();
		} else if (this.gridType == GridType.CILINDER){
			this.createCilinderGrid();
		} else if (this.gridType == GridType.SPHERE){
			this.createSphereGrid();
		}
	},
	
	// crea los puntos de una malla plana con 'rows' filas y 'cols' columnas
	createUniformPlaneGrid: function(){		
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
	},
	
	// crea los puntos de una malla cilindrica con 'rows' filas y 'cols' columnas
	// rows aumenta el largo del cilindro, cols disminuye que tan 'pixelado' es
	createCilinderGrid: function(){
		for(var j = 0.0; j < this.cols; j++){
			this.position_buffer.push(0);
			this.position_buffer.push(0);
			this.position_buffer.push(-(this.rows-1)/2);
			
			this.color_buffer.push(1.0);
			this.color_buffer.push(0.2);
			this.color_buffer.push(1.0);
		}
		
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

		   }
		}
		
		for(var j = 0.0; j < this.cols; j++){
			this.position_buffer.push(0);
			this.position_buffer.push(0);
			this.position_buffer.push(this.rows-1-(this.rows-1)/2);
			
			this.color_buffer.push(1.0);
			this.color_buffer.push(0.2);
			this.color_buffer.push(1.0);
		}
		
		this.rows++;
		this.rows++;
	},
	
	// crea los puntos de una malla esferica con 'rows' filas y 'cols' columnas
	// rows disminuye que tan 'pixelado' es en un eje, cols disminuye que tan 'pixelado' es en el otro eje
	createSphereGrid: function(){
		for (var i = 0.0; i < this.rows; i++) { 
		   for (var j = 0.0; j < this.cols; j++) {

			   var angulo1 = j * 2 * Math.PI / (this.cols-1);
			   var angulo2 = i * 2 * Math.PI / ((this.rows-1)*2);
			   var x = Math.sin(angulo2)*Math.cos(angulo1), y = Math.sin(angulo2)*Math.sin(angulo1), z = Math.cos(angulo2);
			   this.position_buffer.push((x*x+y*y+z*z)*x);
			   this.position_buffer.push((x*x+y*y+z*z)*y);
			   this.position_buffer.push((x*x+y*y+z*z)*z);

			   this.color_buffer.push(1.0/this.rows * i);
			   this.color_buffer.push(0.2);
			   this.color_buffer.push(1.0);
		   }
		}
	},
	
	// crea indices para la figura
	createIndexBuffer: function(){
		
		if(this.draw_mode == gl.TRIANGLES){
			for (var i = 0.0; i < this.rows-1; i++) { 
				for (var j = 0.0; j < this.cols-1; j++) {
					v0 = (i * this.cols) + j;
					v1 = (i * this.cols) + j + 1;
					v2 = ((i + 1) * this.cols) + j;
					v3 = ((i + 1) * this.cols) + j + 1;
					
					
					this.index_buffer.push(v0);
					this.index_buffer.push(v1);
					this.index_buffer.push(v2);
					this.index_buffer.push(v1);
					this.index_buffer.push(v2);
					this.index_buffer.push(v3);
				}
			}
		} else if(this.draw_mode == gl.TRIANGLE_STRIP){
			
			var i = 0.0, j = 0.0, j_add = 1.0, j_add_anterior = 0, i_add = 0;
			while(true){
				if((i != 0 && j == 0) || j == this.cols-1){
					j_add = -1 * j_add;
					i++;
				}
				if(i >= this.rows-1){
					break;
				}
				
				var v0, v1, v2, v3, v4;
																		
				if(j_add > 0){
					v0 = (i * this.cols) + j;
					v1 = (i * this.cols) + j + 1;
					v2 = ((i + 1) * this.cols) + j;
					v3 = ((i + 1) * this.cols) + j + 1;
					v4 = v3 + this.rows;
				
					if(j == 0){
						this.index_buffer.push(v0);
						this.index_buffer.push(v2);
					}
					this.index_buffer.push(v1);
					this.index_buffer.push(v3);
				} else if (j_add < 0){	
					v0 = (i * this.cols) + j - 1;
					v1 = (i * this.cols) + j;
					v2 = ((i + 1) * this.cols) + j - 1;
					v3 = ((i + 1) * this.cols) + j;
					v4 = v3 + this.rows;
					
					if(j == this.cols-1){
						this.index_buffer.push(v1);
						this.index_buffer.push(v3);
					}
					this.index_buffer.push(v0);
					this.index_buffer.push(v2);
				}
				i+=i_add;
				j+=j_add;
			}
		}				
	},
	
	// Esta función crea e incializa los buffers dentro del pipeline para luego
	// utlizarlos a la hora de renderizar.
	setupWebGLBuffers: function(){

		// 1. Creamos un buffer para las posicioens dentro del pipeline.
		this.webgl_position_buffer = gl.createBuffer();
		// 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
		// hemos creado.
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		// 3. Cargamos datos de las posiciones en el buffer.
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

		// Repetimos los pasos 1. 2. y 3. para la información del color
		this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);   

		// Repetimos los pasos 1. 2. y 3. para la información de los índices
		// Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
		// Notar también que se usa un array de enteros en lugar de floats.
		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
	},


	// Esta función es la que se encarga de configurar todo lo necesario
	// para dibujar el VertexGrid.
	// En el caso del ejemplo puede observarse que la última línea del método
	// indica dibujar triángulos utilizando los 6 índices cargados en el Index_Buffer
	// ATIVIDAD 3.
	// Reemplazar dicha línea de código por la correspondiente para dibujar el strip
	// de triángulos utilizando el index buffer generado en la ACTIVIDAD 1.
	drawVertexGrid: function(){

		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

		var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
		gl.enableVertexAttribArray(vertexColorAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
		
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		// Dibujamos.
		gl.drawElements(this.draw_mode, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
	}
}