/****************************************
GEOMETRY
Esta clase representa un objeto que se dibuja en pantalla
****************************************/

var Geometry = function() {
	
	if(this.constructor == Geometry){
		throw new Error("Geometry es abstracta, instanciar una figura particular");
	}
	
	// hay generacion de indices para TRINANGLE_STRIP y TRIANGLES
	this.draw_mode = gl.TRIANGLE_STRIP;
	
	// buffers
	this.position_buffer = [];
	this.color_buffer = [];
	this.index_buffer = [];
	this.normals_buffer = [];
	
	this.model_matrix = mat4.create();
	
	// cosas de webgl
	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;
	this.webgl_normals_buffer = null;
	
	// para mapa de normales
	this.tangent_buffer = null;
	this.binormal_buffer = null;
	
	this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;
}

Geometry.prototype = {
	constructor: Geometry,
	
	clone: function(geom){
		if(this.constructor == Geometry){
			throw new Error("Geometry es abstracta, no se puede clonar");
		}
		var clon = new this.constructor();
		clon.position_buffer = this.position_buffer.slice(0);
		clon.color_buffer = this.color_buffer.slice(0);
		//clon.index_buffer = this.index_buffer.slice(0);
		return clon;
	},
	
	init: function(){
		this.createGrid();
		this.createIndexBuffer();
		this.setupWebGLBuffers();
	},
	
	moveVertex: function(i, x, y, z){
		this.position_buffer.splice(i, 3, x, y, z);
	},

	// aplica la matriz que se quiere, y multiplica la ultima inversa por la inversa de la nueva transformacion
	// (chequear, no lo probe asi que no se si anda, o la multiplicacion va al reves)
	applyMatrix: function(matrix) {
		
		/*for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			var vertex = vec3.fromValues(this.position_buffer[i],
										this.position_buffer[i+1],
										this.position_buffer[i+2]);
			vec3.transformMat4(vertex, vertex, matrix);
			this.position_buffer.splice(i, 3, vertex[0], vertex[1], vertex[2]);
		}*/
		mat4.multiply(this.model_matrix, matrix, this.model_matrix);
	},
	
	getCenter: function(m) {
		var cant_vert = this.position_buffer.length/3.0;
		var x_centro = 0, y_centro = 0, z_centro = 0;
		for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			x_centro += this.position_buffer[i];
			y_centro += this.position_buffer[i+1];
			z_centro += this.position_buffer[i+2];
		}
		x_centro = x_centro / cant_vert;
		y_centro = y_centro / cant_vert;
		z_centro = z_centro / cant_vert;
		var centro = vec3.fromValues(x_centro, y_centro, z_centro);
		var centro_mod = vec3.create();
		if(m === undefined) m = mat4.create();
		var m_final = mat4.create();
		mat4.multiply(m_final, m, this.model_matrix);
		vec3.transformMat4(centro_mod, centro, m_final);
		return centro_mod;
	},
	
	// multiplica los vertices por la inversa de la ultima matriz que se aplico para volver a los vertices originales
	// luego aplica la matriz que se quiere, y se guarda su inversa
	setTransform: function(matrix) {
		/*for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
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
		mat4.invert(this.last_matrix, matrix);*/
		mat4.copy(this.model_matrix, matrix);
	},
	
	// las clases derivadas deben redefinir esta funcion
	createGrid: function(){	},
	
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
		} else if(this.draw_mode == gl.LINE_STRIP){
			/*for(var i = 0; i < this.position_buffer.length; i+=3){
				this.index_buffer.push(i/3);
			}*/
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.index_buffer.push(i);
				}
			}
		}
	},
	
	setColor: function(color){
		for(var i = 0; i < this.color_buffer.length; i+=3){
			this.color_buffer.splice(i, 3, color[0], color[1], color[2]);
		}
		//this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
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
		
		// Repetimos los pasos 1. 2. y 3. para la información de las normales
		this.webgl_normals_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals_buffer), gl.STATIC_DRAW); 
		
		// Repetimos los pasos 1. 2. y 3. para la información de las normales
		if(this.tangent_buffer != null){
			this.webgl_tangent_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);
		}
		
		// Repetimos los pasos 1. 2. y 3. para la información de las normales
		if(this.binormal_buffer != null){
			this.webgl_binormal_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
		}
	},


	// Esta función es la que se encarga de configurar todo lo necesario
	// para dibujar el VertexGrid.
	drawVertexGrid: function(m){

		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
		
		var model_matrix_final = mat4.create();
		mat4.multiply(model_matrix_final, m, this.model_matrix);
		gl.uniformMatrix4fv(glProgram.uMMatrix, false, model_matrix_final);
		
		var normals_matrix = mat4.create();
		mat4.invert(normals_matrix, model_matrix_final);
		mat4.transpose(normals_matrix, normals_matrix);
		gl.uniformMatrix4fv(glProgram.uNMatrix, false, normals_matrix);

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
		
		if(this.webgl_tangent_buffer != null){
			var vertexTangentAttribute = gl.getAttribLocation(glProgram, "aVertexTangent");
			gl.enableVertexAttribArray(vertexTangentAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.vertexAttribPointer(vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		if(this.webgl_binormal_buffer != null){
			var vertexBinormalAttribute = gl.getAttribLocation(glProgram, "aVertexBinormal");
			gl.enableVertexAttribArray(vertexBinormalAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.vertexAttribPointer(vertexBinormalAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		// Dibujamos.
		gl.drawElements(this.draw_mode, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(vertexPositionAttribute);
		gl.disableVertexAttribArray(vertexColorAttribute);
		gl.disableVertexAttribArray(vertexNormalAttribute);
		gl.disableVertexAttribArray(vertexTangentAttribute);
		gl.disableVertexAttribArray(vertexBinormalAttribute);
	}
}