
var CurvedGeometry = function(_puntos, _geometria) {
	Conjunto.call(this);
	
	this.geometria = _geometria;
	this.curva = new Curva(_puntos, this.geometria.getLargo());
	// esto es temporal, lleva la curva al 0,0,0
	var m1 = mat4.create();
	var centro = this.curva.getCenter();
	vec3.scale(centro, centro, -1);
	mat4.translate(m1, m1, centro);
	this.curva.applyMatrix(m1);
	//this.curva.setColor(Color.GREEN);
	
	this.init();
	this.add(new Mesh(this.curva));
}

CurvedGeometry.prototype = Object.create(Conjunto.prototype);
CurvedGeometry.prototype.constructor = CurvedGeometry;

CurvedGeometry.prototype.init = function(){
	
	for(var i = 0; i+5 < this.curva.position_buffer.length-1; i += 3){
		var x1 = this.curva.position_buffer[i];
		var y1 = this.curva.position_buffer[i+1];
		var z1 = this.curva.position_buffer[i+2];
		
		var x2 = this.curva.position_buffer[i+3];
		var y2 = this.curva.position_buffer[i+4];
		var z2 = this.curva.position_buffer[i+5];
		
		var t = this.geometria.clone();
		t.fitToSegment(vec3.fromValues(x1, y1, z1), vec3.fromValues(x2, y2, z2));
		
		this.add(t);
	}
}