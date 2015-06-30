(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Basics01 = function() {
	this.mesh = hxDaedalus_factories_RectMesh.buildRectangle(600,400);
	this.targetCanvas = new wings_jsCanvas_BasicCanvas();
	this.view = new hxDaedalus_view_SimpleView(this.targetCanvas);
	var vertex = this.mesh.insertVertex(550,50);
	var segment = this.mesh.insertConstraintSegment(70,300,530,320);
	var shape = this.mesh.insertConstraintShape([50.0,50.0,100.0,50.0,100.0,50.0,100.0,100.0,100.0,100.0,50.0,100.0,50.0,100.0,50.0,50.0,20.0,50.0,130.0,100.0]);
	var objectCoords = [];
	this.object = new hxDaedalus_data_Object();
	this.object.set_coordinates([-50.0,0.0,50.0,0.0,0.0,-50.0,0.0,50.0,-30.0,-30.0,30.0,30.0,30.0,-30.0,-30.0,30.0]);
	this.mesh.insertObject(this.object);
	this.object.set_x(400);
	this.object.set_y(200);
	this.object.set_scaleX(2);
	this.object.set_scaleY(2);
	this.targetCanvas.onEnterFrame = $bind(this,this.onEnterFrame);
};
Basics01.__name__ = true;
Basics01.main = function() {
	new Basics01();
};
Basics01.prototype = {
	onEnterFrame: function() {
		var _g = this.object;
		_g.set_rotation(_g.get_rotation() + 0.05);
		this.mesh.updateObjects();
		this.view.drawMesh(this.mesh,true);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
};
var hxDaedalus_ai_EntityAI = function() {
	this._radius = 10;
	this.x = this.y = 0;
	this.dirNormX = 1;
	this.dirNormY = 0;
};
hxDaedalus_ai_EntityAI.__name__ = true;
hxDaedalus_ai_EntityAI.prototype = {
	buildApproximation: function() {
		this._approximateObject = new hxDaedalus_data_Object();
		this._approximateObject.get_matrix().translate(this.x,this.y);
		var coordinates = [];
		this._approximateObject.set_coordinates(coordinates);
		if(this._radius == 0) return;
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			coordinates.push(this._radius * Math.cos(2 * Math.PI * i / 6));
			coordinates.push(this._radius * Math.sin(2 * Math.PI * i / 6));
			coordinates.push(this._radius * Math.cos(2 * Math.PI * (i + 1) / 6));
			coordinates.push(this._radius * Math.sin(2 * Math.PI * (i + 1) / 6));
		}
	}
	,get_approximateObject: function() {
		this._approximateObject.get_matrix().identity();
		this._approximateObject.get_matrix().translate(this.x,this.y);
		return this._approximateObject;
	}
	,get_radius: function() {
		return this._radius;
	}
	,get_radiusSquared: function() {
		return this._radiusSquared;
	}
	,set_radius: function(value) {
		this._radius = value;
		this._radiusSquared = this._radius * this._radius;
		return value;
	}
};
var hxDaedalus_data_Constants = function() { };
hxDaedalus_data_Constants.__name__ = true;
var hxDaedalus_data_ConstraintSegment = function() {
	this._id = hxDaedalus_data_ConstraintSegment.INC;
	hxDaedalus_data_ConstraintSegment.INC++;
	this._edges = [];
};
hxDaedalus_data_ConstraintSegment.__name__ = true;
hxDaedalus_data_ConstraintSegment.prototype = {
	get_id: function() {
		return this._id;
	}
	,addEdge: function(edge) {
		if(HxOverrides.indexOf(this._edges,edge,0) == -1 && (function($this) {
			var $r;
			var x = edge.get_oppositeEdge();
			$r = HxOverrides.indexOf($this._edges,x,0);
			return $r;
		}(this)) == -1) this._edges.push(edge);
	}
	,removeEdge: function(edge) {
		var index;
		index = HxOverrides.indexOf(this._edges,edge,0);
		if(index == -1) {
			var x = edge.get_oppositeEdge();
			index = HxOverrides.indexOf(this._edges,x,0);
		}
		if(index != -1) this._edges.splice(index,1);
	}
	,get_edges: function() {
		return this._edges;
	}
	,dispose: function() {
		this._edges = null;
		this.fromShape = null;
	}
	,toString: function() {
		return "seg_id " + this._id;
	}
};
var hxDaedalus_data_ConstraintShape = function() {
	this._id = hxDaedalus_data_ConstraintShape.INC;
	hxDaedalus_data_ConstraintShape.INC++;
	this.segments = [];
};
hxDaedalus_data_ConstraintShape.__name__ = true;
hxDaedalus_data_ConstraintShape.prototype = {
	get_id: function() {
		return this._id;
	}
	,dispose: function() {
		while(this.segments.length > 0) this.segments.pop().dispose();
		this.segments = null;
	}
};
var hxDaedalus_data_Edge = function() {
	this.colorDebug = -1;
	this._id = hxDaedalus_data_Edge.INC;
	hxDaedalus_data_Edge.INC++;
	this.fromConstraintSegments = [];
};
hxDaedalus_data_Edge.__name__ = true;
hxDaedalus_data_Edge.prototype = {
	get_id: function() {
		return this._id;
	}
	,get_isReal: function() {
		return this._isReal;
	}
	,get_isConstrained: function() {
		return this._isConstrained;
	}
	,setDatas: function(originVertex,oppositeEdge,nextLeftEdge,leftFace,isReal,isConstrained) {
		if(isConstrained == null) isConstrained = false;
		if(isReal == null) isReal = true;
		this._isConstrained = isConstrained;
		this._isReal = isReal;
		this._originVertex = originVertex;
		this._oppositeEdge = oppositeEdge;
		this._nextLeftEdge = nextLeftEdge;
		this._leftFace = leftFace;
	}
	,addFromConstraintSegment: function(segment) {
		if(HxOverrides.indexOf(this.fromConstraintSegments,segment,0) == -1) this.fromConstraintSegments.push(segment);
	}
	,removeFromConstraintSegment: function(segment) {
		var index = HxOverrides.indexOf(this.fromConstraintSegments,segment,0);
		if(index != -1) this.fromConstraintSegments.splice(index,1);
	}
	,set_originVertex: function(value) {
		this._originVertex = value;
		return value;
	}
	,set_nextLeftEdge: function(value) {
		this._nextLeftEdge = value;
		return value;
	}
	,set_leftFace: function(value) {
		this._leftFace = value;
		return value;
	}
	,set_isConstrained: function(value) {
		this._isConstrained = value;
		return value;
	}
	,dispose: function() {
		this._originVertex = null;
		this._oppositeEdge = null;
		this._nextLeftEdge = null;
		this._leftFace = null;
		this.fromConstraintSegments = null;
	}
	,get_originVertex: function() {
		return this._originVertex;
	}
	,get_destinationVertex: function() {
		return this.get_oppositeEdge().get_originVertex();
	}
	,get_oppositeEdge: function() {
		return this._oppositeEdge;
	}
	,get_nextLeftEdge: function() {
		return this._nextLeftEdge;
	}
	,get_prevLeftEdge: function() {
		return this._nextLeftEdge.get_nextLeftEdge();
	}
	,get_nextRightEdge: function() {
		return this._oppositeEdge.get_nextLeftEdge().get_nextLeftEdge().get_oppositeEdge();
	}
	,get_prevRightEdge: function() {
		return this._oppositeEdge.get_nextLeftEdge().get_oppositeEdge();
	}
	,get_rotLeftEdge: function() {
		return this._nextLeftEdge.get_nextLeftEdge().get_oppositeEdge();
	}
	,get_rotRightEdge: function() {
		return this._oppositeEdge.get_nextLeftEdge();
	}
	,get_leftFace: function() {
		return this._leftFace;
	}
	,get_rightFace: function() {
		return this._oppositeEdge.get_leftFace();
	}
	,toString: function() {
		return "edge " + this.get_originVertex().get_id() + " - " + this.get_destinationVertex().get_id();
	}
};
var hxDaedalus_data_Face = function() {
	this.colorDebug = -1;
	this._id = hxDaedalus_data_Face.INC;
	hxDaedalus_data_Face.INC++;
};
hxDaedalus_data_Face.__name__ = true;
hxDaedalus_data_Face.prototype = {
	get_id: function() {
		return this._id;
	}
	,get_isReal: function() {
		return this._isReal;
	}
	,set_datas: function(edge) {
		this._isReal = true;
		this._edge = edge;
	}
	,setDatas: function(edge,isReal) {
		if(isReal == null) isReal = true;
		this._isReal = isReal;
		this._edge = edge;
	}
	,dispose: function() {
		this._edge = null;
	}
	,get_edge: function() {
		return this._edge;
	}
};
var hxDaedalus_data_Mesh = function(width,height) {
	this.__objectsUpdateInProgress = false;
	this.__edgesToCheck = null;
	this.__centerVertex = null;
	this._objects = null;
	this._constraintShapes = null;
	this._faces = null;
	this._edges = null;
	this._vertices = null;
	this._clipping = false;
	this._height = 0;
	this._width = 0;
	this._id = hxDaedalus_data_Mesh.INC;
	hxDaedalus_data_Mesh.INC++;
	this._width = width;
	this._height = height;
	this._clipping = true;
	this._vertices = [];
	this._edges = [];
	this._faces = [];
	this._constraintShapes = [];
	this._objects = [];
	this.__edgesToCheck = [];
};
hxDaedalus_data_Mesh.__name__ = true;
hxDaedalus_data_Mesh.prototype = {
	get_height: function() {
		return this._height;
	}
	,get_width: function() {
		return this._width;
	}
	,get_clipping: function() {
		return this._clipping;
	}
	,set_clipping: function(value) {
		this._clipping = value;
		return value;
	}
	,get_id: function() {
		return this._id;
	}
	,dispose: function() {
		while(this._vertices.length > 0) this._vertices.pop().dispose();
		this._vertices = null;
		while(this._edges.length > 0) this._edges.pop().dispose();
		this._edges = null;
		while(this._faces.length > 0) this._faces.pop().dispose();
		this._faces = null;
		while(this._constraintShapes.length > 0) this._constraintShapes.pop().dispose();
		this._constraintShapes = null;
		while(this._objects.length > 0) this._objects.pop().dispose();
		this._objects = null;
		this.__edgesToCheck = null;
		this.__centerVertex = null;
	}
	,get___constraintShapes: function() {
		return this._constraintShapes;
	}
	,buildFromRecord: function(rec) {
		var positions = rec.split(";");
		var i = 0;
		while(i < positions.length) {
			this.insertConstraintSegment(parseFloat(positions[i]),parseFloat(positions[i + 1]),parseFloat(positions[i + 2]),parseFloat(positions[i + 3]));
			i += 4;
		}
	}
	,insertObject: function(object) {
		if(object.get_constraintShape() != null) this.deleteObject(object);
		var shape = new hxDaedalus_data_ConstraintShape();
		var segment;
		var coordinates = object.get_coordinates();
		var m = object.get_matrix();
		object.updateMatrixFromValues();
		var x1;
		var y1;
		var x2;
		var y2;
		var transfx1;
		var transfy1;
		var transfx2;
		var transfy2;
		var i = 0;
		while(i < coordinates.length) {
			x1 = coordinates[i];
			y1 = coordinates[i + 1];
			x2 = coordinates[i + 2];
			y2 = coordinates[i + 3];
			transfx1 = m.transformX(x1,y1);
			transfy1 = m.transformY(x1,y1);
			transfx2 = m.transformX(x2,y2);
			transfy2 = m.transformY(x2,y2);
			segment = this.insertConstraintSegment(transfx1,transfy1,transfx2,transfy2);
			if(segment != null) {
				segment.fromShape = shape;
				shape.segments.push(segment);
			}
			i += 4;
		}
		this._constraintShapes.push(shape);
		object.set_constraintShape(shape);
		if(!this.__objectsUpdateInProgress) this._objects.push(object);
	}
	,deleteObject: function(object) {
		if(object.get_constraintShape() == null) return;
		this.deleteConstraintShape(object.get_constraintShape());
		object.set_constraintShape(null);
		if(!this.__objectsUpdateInProgress) {
			var index = HxOverrides.indexOf(this._objects,object,0);
			this._objects.splice(index,1);
		}
	}
	,updateObjects: function() {
		this.__objectsUpdateInProgress = true;
		var _g1 = 0;
		var _g = this._objects.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._objects[i].get_hasChanged()) {
				this.deleteObject(this._objects[i]);
				this.insertObject(this._objects[i]);
				this._objects[i].set_hasChanged(false);
			}
		}
		this.__objectsUpdateInProgress = false;
	}
	,insertConstraintShape: function(coordinates) {
		var shape = new hxDaedalus_data_ConstraintShape();
		var segment = null;
		var i = 0;
		while(i < coordinates.length) {
			segment = this.insertConstraintSegment(coordinates[i],coordinates[i + 1],coordinates[i + 2],coordinates[i + 3]);
			if(segment != null) {
				segment.fromShape = shape;
				shape.segments.push(segment);
			}
			i += 4;
		}
		this._constraintShapes.push(shape);
		return shape;
	}
	,deleteConstraintShape: function(shape) {
		var _g1 = 0;
		var _g = shape.segments.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.deleteConstraintSegment(shape.segments[i]);
		}
		shape.dispose();
		this._constraintShapes.splice(HxOverrides.indexOf(this._constraintShapes,shape,0),1);
	}
	,insertConstraintSegment: function(x1,y1,x2,y2) {
		var p1pos = this.findPositionFromBounds(x1,y1);
		var p2pos = this.findPositionFromBounds(x2,y2);
		var newX1 = x1;
		var newY1 = y1;
		var newX2 = x2;
		var newY2 = y2;
		if(this._clipping && (p1pos != 0 || p2pos != 0)) {
			var intersectPoint = new hxDaedalus_data_math_Point2D();
			if(p1pos != 0 && p2pos != 0) {
				if(x1 <= 0 && x2 <= 0 || x1 >= this._width && x2 >= this._width || y1 <= 0 && y2 <= 0 || y1 >= this._height && y2 >= this._height) return null;
				if(p1pos == 8 && p2pos == 4 || p1pos == 4 && p2pos == 8) {
					hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint);
					newX1 = intersectPoint.x;
					newY1 = intersectPoint.y;
					hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint);
					newX2 = intersectPoint.x;
					newY2 = intersectPoint.y;
				} else if(p1pos == 2 && p2pos == 6 || p1pos == 6 && p2pos == 2) {
					hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint);
					newX1 = intersectPoint.x;
					newY1 = intersectPoint.y;
					hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint);
					newX2 = intersectPoint.x;
					newY2 = intersectPoint.y;
				} else if(p1pos == 2 && p2pos == 8 || p1pos == 8 && p2pos == 2) {
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint)) {
						newX1 = intersectPoint.x;
						newY1 = intersectPoint.y;
						hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint);
						newX2 = intersectPoint.x;
						newY2 = intersectPoint.y;
					} else return null;
				} else if(p1pos == 2 && p2pos == 4 || p1pos == 4 && p2pos == 2) {
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint)) {
						newX1 = intersectPoint.x;
						newY1 = intersectPoint.y;
						hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint);
						newX2 = intersectPoint.x;
						newY2 = intersectPoint.y;
					} else return null;
				} else if(p1pos == 6 && p2pos == 4 || p1pos == 4 && p2pos == 6) {
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint)) {
						newX1 = intersectPoint.x;
						newY1 = intersectPoint.y;
						hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint);
						newX2 = intersectPoint.x;
						newY2 = intersectPoint.y;
					} else return null;
				} else if(p1pos == 8 && p2pos == 6 || p1pos == 6 && p2pos == 8) {
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint)) {
						newX1 = intersectPoint.x;
						newY1 = intersectPoint.y;
						hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint);
						newX2 = intersectPoint.x;
						newY2 = intersectPoint.y;
					} else return null;
				} else {
					var firstDone = false;
					var secondDone = false;
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint)) {
						newX1 = intersectPoint.x;
						newY1 = intersectPoint.y;
						firstDone = true;
					}
					if(hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint)) {
						if(!firstDone) {
							newX1 = intersectPoint.x;
							newY1 = intersectPoint.y;
							firstDone = true;
						} else {
							newX2 = intersectPoint.x;
							newY2 = intersectPoint.y;
							secondDone = true;
						}
					}
					if(!secondDone && hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint)) {
						if(!firstDone) {
							newX1 = intersectPoint.x;
							newY1 = intersectPoint.y;
							firstDone = true;
						} else {
							newX2 = intersectPoint.x;
							newY2 = intersectPoint.y;
							secondDone = true;
						}
					}
					if(!secondDone && hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint)) {
						newX2 = intersectPoint.x;
						newY2 = intersectPoint.y;
					}
					if(!firstDone) return null;
				}
			} else {
				if(p1pos == 2 || p2pos == 2) hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint); else if(p1pos == 4 || p2pos == 4) hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint); else if(p1pos == 6 || p2pos == 6) hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint); else if(p1pos == 8 || p2pos == 8) hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint); else if(!hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,this._width,0,intersectPoint)) {
					if(!hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,this._width,0,this._width,this._height,intersectPoint)) {
						if(!hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,this._height,this._width,this._height,intersectPoint)) hxDaedalus_data_math_Geom2D.intersections2segments(x1,y1,x2,y2,0,0,0,this._height,intersectPoint);
					}
				}
				if(p1pos == 0) {
					newX1 = x1;
					newY1 = y1;
				} else {
					newX1 = x2;
					newY1 = y2;
				}
				newX2 = intersectPoint.x;
				newY2 = intersectPoint.y;
			}
		}
		var vertexDown = this.insertVertex(newX1,newY1);
		if(vertexDown == null) return null;
		var vertexUp = this.insertVertex(newX2,newY2);
		if(vertexUp == null) return null;
		if(vertexDown == vertexUp) return null;
		var iterVertexToOutEdges = new hxDaedalus_iterators_FromVertexToOutgoingEdges();
		var currVertex;
		var currEdge;
		var i;
		var segment = new hxDaedalus_data_ConstraintSegment();
		var tempEdgeDownUp = new hxDaedalus_data_Edge();
		var tempSdgeUpDown = new hxDaedalus_data_Edge();
		tempEdgeDownUp.setDatas(vertexDown,tempSdgeUpDown,null,null,true,true);
		tempSdgeUpDown.setDatas(vertexUp,tempEdgeDownUp,null,null,true,true);
		var intersectedEdges = [];
		var leftBoundingEdges = [];
		var rightBoundingEdges = [];
		var currObjet;
		var pIntersect = new hxDaedalus_data_math_Point2D();
		var edgeLeft;
		var newEdgeDownUp;
		var newEdgeUpDown;
		var done;
		currVertex = vertexDown;
		currObjet = hxDaedalus_data_math_Intersection.EVertex(currVertex);
		while(true) {
			done = false;
			switch(currObjet[1]) {
			case 0:
				var vertex = currObjet[2];
				currVertex = vertex;
				iterVertexToOutEdges.set_fromVertex(currVertex);
				while((currEdge = iterVertexToOutEdges.next()) != null) {
					if(currEdge.get_destinationVertex() == vertexUp) {
						if(!currEdge.get_isConstrained()) {
							currEdge.set_isConstrained(true);
							currEdge.get_oppositeEdge().set_isConstrained(true);
						}
						currEdge.addFromConstraintSegment(segment);
						currEdge.get_oppositeEdge().fromConstraintSegments = currEdge.fromConstraintSegments;
						vertexDown.addFromConstraintSegment(segment);
						vertexUp.addFromConstraintSegment(segment);
						segment.addEdge(currEdge);
						return segment;
					}
					if(hxDaedalus_data_math_Geom2D.distanceSquaredVertexToEdge(currEdge.get_destinationVertex(),tempEdgeDownUp) <= 0.0001) {
						if(!currEdge.get_isConstrained()) {
							currEdge.set_isConstrained(true);
							currEdge.get_oppositeEdge().set_isConstrained(true);
						}
						currEdge.addFromConstraintSegment(segment);
						currEdge.get_oppositeEdge().fromConstraintSegments = currEdge.fromConstraintSegments;
						vertexDown.addFromConstraintSegment(segment);
						segment.addEdge(currEdge);
						vertexDown = currEdge.get_destinationVertex();
						tempEdgeDownUp.set_originVertex(vertexDown);
						currObjet = hxDaedalus_data_math_Intersection.EVertex(vertexDown);
						done = true;
						break;
					}
				}
				if(done) continue;
				iterVertexToOutEdges.set_fromVertex(currVertex);
				while((currEdge = iterVertexToOutEdges.next()) != null) {
					currEdge = currEdge.get_nextLeftEdge();
					if(hxDaedalus_data_math_Geom2D.intersections2edges(currEdge,tempEdgeDownUp,pIntersect)) {
						if(currEdge.get_isConstrained()) {
							vertexDown = this.splitEdge(currEdge,pIntersect.x,pIntersect.y);
							iterVertexToOutEdges.set_fromVertex(currVertex);
							while((currEdge = iterVertexToOutEdges.next()) != null) if(currEdge.get_destinationVertex() == vertexDown) {
								currEdge.set_isConstrained(true);
								currEdge.get_oppositeEdge().set_isConstrained(true);
								currEdge.addFromConstraintSegment(segment);
								currEdge.get_oppositeEdge().fromConstraintSegments = currEdge.fromConstraintSegments;
								segment.addEdge(currEdge);
								break;
							}
							currVertex.addFromConstraintSegment(segment);
							tempEdgeDownUp.set_originVertex(vertexDown);
							currObjet = hxDaedalus_data_math_Intersection.EVertex(vertexDown);
						} else {
							intersectedEdges.push(currEdge);
							leftBoundingEdges.unshift(currEdge.get_nextLeftEdge());
							rightBoundingEdges.push(currEdge.get_prevLeftEdge());
							currEdge = currEdge.get_oppositeEdge();
							currObjet = hxDaedalus_data_math_Intersection.EEdge(currEdge);
						}
						break;
					}
				}
				break;
			case 1:
				var edge = currObjet[2];
				currEdge = edge;
				edgeLeft = currEdge.get_nextLeftEdge();
				if(edgeLeft.get_destinationVertex() == vertexUp) {
					leftBoundingEdges.unshift(edgeLeft.get_nextLeftEdge());
					rightBoundingEdges.push(edgeLeft);
					newEdgeDownUp = new hxDaedalus_data_Edge();
					newEdgeUpDown = new hxDaedalus_data_Edge();
					newEdgeDownUp.setDatas(vertexDown,newEdgeUpDown,null,null,true,true);
					newEdgeUpDown.setDatas(vertexUp,newEdgeDownUp,null,null,true,true);
					leftBoundingEdges.push(newEdgeDownUp);
					rightBoundingEdges.push(newEdgeUpDown);
					this.insertNewConstrainedEdge(segment,newEdgeDownUp,intersectedEdges,leftBoundingEdges,rightBoundingEdges);
					return segment;
				} else if(hxDaedalus_data_math_Geom2D.distanceSquaredVertexToEdge(edgeLeft.get_destinationVertex(),tempEdgeDownUp) <= 0.0001) {
					leftBoundingEdges.unshift(edgeLeft.get_nextLeftEdge());
					rightBoundingEdges.push(edgeLeft);
					newEdgeDownUp = new hxDaedalus_data_Edge();
					newEdgeUpDown = new hxDaedalus_data_Edge();
					newEdgeDownUp.setDatas(vertexDown,newEdgeUpDown,null,null,true,true);
					newEdgeUpDown.setDatas(edgeLeft.get_destinationVertex(),newEdgeDownUp,null,null,true,true);
					leftBoundingEdges.push(newEdgeDownUp);
					rightBoundingEdges.push(newEdgeUpDown);
					this.insertNewConstrainedEdge(segment,newEdgeDownUp,intersectedEdges,leftBoundingEdges,rightBoundingEdges);
					intersectedEdges.splice(0,intersectedEdges.length);
					leftBoundingEdges.splice(0,leftBoundingEdges.length);
					rightBoundingEdges.splice(0,rightBoundingEdges.length);
					vertexDown = edgeLeft.get_destinationVertex();
					tempEdgeDownUp.set_originVertex(vertexDown);
					currObjet = hxDaedalus_data_math_Intersection.EVertex(vertexDown);
				} else if(hxDaedalus_data_math_Geom2D.intersections2edges(edgeLeft,tempEdgeDownUp,pIntersect)) {
					if(edgeLeft.get_isConstrained()) {
						currVertex = this.splitEdge(edgeLeft,pIntersect.x,pIntersect.y);
						iterVertexToOutEdges.set_fromVertex(currVertex);
						while((currEdge = iterVertexToOutEdges.next()) != null) {
							if(currEdge.get_destinationVertex() == leftBoundingEdges[0].get_originVertex()) leftBoundingEdges.unshift(currEdge);
							if(currEdge.get_destinationVertex() == rightBoundingEdges[rightBoundingEdges.length - 1].get_destinationVertex()) rightBoundingEdges.push(currEdge.get_oppositeEdge());
						}
						newEdgeDownUp = new hxDaedalus_data_Edge();
						newEdgeUpDown = new hxDaedalus_data_Edge();
						newEdgeDownUp.setDatas(vertexDown,newEdgeUpDown,null,null,true,true);
						newEdgeUpDown.setDatas(currVertex,newEdgeDownUp,null,null,true,true);
						leftBoundingEdges.push(newEdgeDownUp);
						rightBoundingEdges.push(newEdgeUpDown);
						this.insertNewConstrainedEdge(segment,newEdgeDownUp,intersectedEdges,leftBoundingEdges,rightBoundingEdges);
						intersectedEdges.splice(0,intersectedEdges.length);
						leftBoundingEdges.splice(0,leftBoundingEdges.length);
						rightBoundingEdges.splice(0,rightBoundingEdges.length);
						vertexDown = currVertex;
						tempEdgeDownUp.set_originVertex(vertexDown);
						currObjet = hxDaedalus_data_math_Intersection.EVertex(vertexDown);
					} else {
						intersectedEdges.push(edgeLeft);
						leftBoundingEdges.unshift(edgeLeft.get_nextLeftEdge());
						currEdge = edgeLeft.get_oppositeEdge();
						currObjet = hxDaedalus_data_math_Intersection.EEdge(currEdge);
					}
				} else {
					edgeLeft = edgeLeft.get_nextLeftEdge();
					hxDaedalus_data_math_Geom2D.intersections2edges(edgeLeft,tempEdgeDownUp,pIntersect);
					if(edgeLeft.get_isConstrained()) {
						currVertex = this.splitEdge(edgeLeft,pIntersect.x,pIntersect.y);
						iterVertexToOutEdges.set_fromVertex(currVertex);
						while((currEdge = iterVertexToOutEdges.next()) != null) {
							if(currEdge.get_destinationVertex() == leftBoundingEdges[0].get_originVertex()) leftBoundingEdges.unshift(currEdge);
							if(currEdge.get_destinationVertex() == rightBoundingEdges[rightBoundingEdges.length - 1].get_destinationVertex()) rightBoundingEdges.push(currEdge.get_oppositeEdge());
						}
						newEdgeDownUp = new hxDaedalus_data_Edge();
						newEdgeUpDown = new hxDaedalus_data_Edge();
						newEdgeDownUp.setDatas(vertexDown,newEdgeUpDown,null,null,true,true);
						newEdgeUpDown.setDatas(currVertex,newEdgeDownUp,null,null,true,true);
						leftBoundingEdges.push(newEdgeDownUp);
						rightBoundingEdges.push(newEdgeUpDown);
						this.insertNewConstrainedEdge(segment,newEdgeDownUp,intersectedEdges,leftBoundingEdges,rightBoundingEdges);
						intersectedEdges.splice(0,intersectedEdges.length);
						leftBoundingEdges.splice(0,leftBoundingEdges.length);
						rightBoundingEdges.splice(0,rightBoundingEdges.length);
						vertexDown = currVertex;
						tempEdgeDownUp.set_originVertex(vertexDown);
						currObjet = hxDaedalus_data_math_Intersection.EVertex(vertexDown);
					} else {
						intersectedEdges.push(edgeLeft);
						rightBoundingEdges.push(edgeLeft.get_prevLeftEdge());
						currEdge = edgeLeft.get_oppositeEdge();
						currObjet = hxDaedalus_data_math_Intersection.EEdge(currEdge);
					}
				}
				break;
			case 2:
				var face = currObjet[2];
				break;
			case 3:
				break;
			}
		}
		return segment;
	}
	,insertNewConstrainedEdge: function(fromSegment,edgeDownUp,intersectedEdges,leftBoundingEdges,rightBoundingEdges) {
		this._edges.push(edgeDownUp);
		this._edges.push(edgeDownUp.get_oppositeEdge());
		edgeDownUp.addFromConstraintSegment(fromSegment);
		edgeDownUp.get_oppositeEdge().fromConstraintSegments = edgeDownUp.fromConstraintSegments;
		fromSegment.addEdge(edgeDownUp);
		edgeDownUp.get_originVertex().addFromConstraintSegment(fromSegment);
		edgeDownUp.get_destinationVertex().addFromConstraintSegment(fromSegment);
		this.untriangulate(intersectedEdges);
		this.triangulate(leftBoundingEdges,true);
		this.triangulate(rightBoundingEdges,true);
	}
	,deleteConstraintSegment: function(segment) {
		var i;
		var vertexToDelete = [];
		var edge = null;
		var vertex;
		var fromConstraintSegment;
		var _g1 = 0;
		var _g = segment.get_edges().length;
		while(_g1 < _g) {
			var i1 = _g1++;
			edge = segment.get_edges()[i1];
			edge.removeFromConstraintSegment(segment);
			if(edge.fromConstraintSegments.length == 0) {
				edge.set_isConstrained(false);
				edge.get_oppositeEdge().set_isConstrained(false);
			}
			vertex = edge.get_originVertex();
			vertex.removeFromConstraintSegment(segment);
			vertexToDelete.push(vertex);
		}
		vertex = edge.get_destinationVertex();
		vertex.removeFromConstraintSegment(segment);
		vertexToDelete.push(vertex);
		var _g11 = 0;
		var _g2 = vertexToDelete.length;
		while(_g11 < _g2) {
			var i2 = _g11++;
			this.deleteVertex(vertexToDelete[i2]);
		}
		segment.dispose();
	}
	,check: function() {
		var _g1 = 0;
		var _g = this._edges.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._edges[i].get_nextLeftEdge() == null) {
				haxe_Log.trace("!!! missing nextLeftEdge",{ fileName : "Mesh.hx", lineNumber : 794, className : "hxDaedalus.data.Mesh", methodName : "check"});
				return;
			}
		}
		haxe_Log.trace("check OK",{ fileName : "Mesh.hx", lineNumber : 798, className : "hxDaedalus.data.Mesh", methodName : "check"});
	}
	,insertVertex: function(x,y) {
		if(x < 0 || y < 0 || x > this._width || y > this._height) return null;
		this.__edgesToCheck.splice(0,this.__edgesToCheck.length);
		var inObject = hxDaedalus_data_math_Geom2D.locatePosition(x,y,this);
		var newVertex = null;
		switch(inObject[1]) {
		case 0:
			var vertex = inObject[2];
			newVertex = vertex;
			break;
		case 1:
			var edge = inObject[2];
			newVertex = this.splitEdge(edge,x,y);
			break;
		case 2:
			var face = inObject[2];
			newVertex = this.splitFace(face,x,y);
			break;
		case 3:
			break;
		}
		this.restoreAsDelaunay();
		return newVertex;
	}
	,flipEdge: function(edge) {
		var eBot_Top = edge;
		var eTop_Bot = edge.get_oppositeEdge();
		var eLeft_Right = new hxDaedalus_data_Edge();
		var eRight_Left = new hxDaedalus_data_Edge();
		var eTop_Left = eBot_Top.get_nextLeftEdge();
		var eLeft_Bot = eTop_Left.get_nextLeftEdge();
		var eBot_Right = eTop_Bot.get_nextLeftEdge();
		var eRight_Top = eBot_Right.get_nextLeftEdge();
		var vBot = eBot_Top.get_originVertex();
		var vTop = eTop_Bot.get_originVertex();
		var vLeft = eLeft_Bot.get_originVertex();
		var vRight = eRight_Top.get_originVertex();
		var fLeft = eBot_Top.get_leftFace();
		var fRight = eTop_Bot.get_leftFace();
		var fBot = new hxDaedalus_data_Face();
		var fTop = new hxDaedalus_data_Face();
		this._edges.push(eLeft_Right);
		this._edges.push(eRight_Left);
		this._faces.push(fTop);
		this._faces.push(fBot);
		eLeft_Right.setDatas(vLeft,eRight_Left,eRight_Top,fTop,edge.get_isReal(),edge.get_isConstrained());
		eRight_Left.setDatas(vRight,eLeft_Right,eLeft_Bot,fBot,edge.get_isReal(),edge.get_isConstrained());
		fTop.setDatas(eLeft_Right);
		fBot.setDatas(eRight_Left);
		if(vTop.get_edge() == eTop_Bot) vTop.setDatas(eTop_Left);
		if(vBot.get_edge() == eBot_Top) vBot.setDatas(eBot_Right);
		eTop_Left.set_nextLeftEdge(eLeft_Right);
		eTop_Left.set_leftFace(fTop);
		eLeft_Bot.set_nextLeftEdge(eBot_Right);
		eLeft_Bot.set_leftFace(fBot);
		eBot_Right.set_nextLeftEdge(eRight_Left);
		eBot_Right.set_leftFace(fBot);
		eRight_Top.set_nextLeftEdge(eTop_Left);
		eRight_Top.set_leftFace(fTop);
		eBot_Top.dispose();
		eTop_Bot.dispose();
		this._edges.splice(HxOverrides.indexOf(this._edges,eBot_Top,0),1);
		this._edges.splice(HxOverrides.indexOf(this._edges,eTop_Bot,0),1);
		fLeft.dispose();
		fRight.dispose();
		this._faces.splice(HxOverrides.indexOf(this._faces,fLeft,0),1);
		this._faces.splice(HxOverrides.indexOf(this._faces,fRight,0),1);
		return eRight_Left;
	}
	,splitEdge: function(edge,x,y) {
		this.__edgesToCheck.splice(0,this.__edgesToCheck.length);
		var eLeft_Right = edge;
		var eRight_Left = eLeft_Right.get_oppositeEdge();
		var eRight_Top = eLeft_Right.get_nextLeftEdge();
		var eTop_Left = eRight_Top.get_nextLeftEdge();
		var eLeft_Bot = eRight_Left.get_nextLeftEdge();
		var eBot_Right = eLeft_Bot.get_nextLeftEdge();
		var vTop = eTop_Left.get_originVertex();
		var vLeft = eLeft_Right.get_originVertex();
		var vBot = eBot_Right.get_originVertex();
		var vRight = eRight_Left.get_originVertex();
		var fTop = eLeft_Right.get_leftFace();
		var fBot = eRight_Left.get_leftFace();
		if((vLeft.get_pos().x - x) * (vLeft.get_pos().x - x) + (vLeft.get_pos().y - y) * (vLeft.get_pos().y - y) <= 0.0001) return vLeft;
		if((vRight.get_pos().x - x) * (vRight.get_pos().x - x) + (vRight.get_pos().y - y) * (vRight.get_pos().y - y) <= 0.0001) return vRight;
		var vCenter = new hxDaedalus_data_Vertex();
		var eTop_Center = new hxDaedalus_data_Edge();
		var eCenter_Top = new hxDaedalus_data_Edge();
		var eBot_Center = new hxDaedalus_data_Edge();
		var eCenter_Bot = new hxDaedalus_data_Edge();
		var eLeft_Center = new hxDaedalus_data_Edge();
		var eCenter_Left = new hxDaedalus_data_Edge();
		var eRight_Center = new hxDaedalus_data_Edge();
		var eCenter_Right = new hxDaedalus_data_Edge();
		var fTopLeft = new hxDaedalus_data_Face();
		var fBotLeft = new hxDaedalus_data_Face();
		var fBotRight = new hxDaedalus_data_Face();
		var fTopRight = new hxDaedalus_data_Face();
		this._vertices.push(vCenter);
		this._edges.push(eCenter_Top);
		this._edges.push(eTop_Center);
		this._edges.push(eCenter_Left);
		this._edges.push(eLeft_Center);
		this._edges.push(eCenter_Bot);
		this._edges.push(eBot_Center);
		this._edges.push(eCenter_Right);
		this._edges.push(eRight_Center);
		this._faces.push(fTopRight);
		this._faces.push(fBotRight);
		this._faces.push(fBotLeft);
		this._faces.push(fTopLeft);
		vCenter.setDatas(fTop.get_isReal()?eCenter_Top:eCenter_Bot);
		vCenter.get_pos().x = x;
		vCenter.get_pos().y = y;
		hxDaedalus_data_math_Geom2D.projectOrthogonaly(vCenter.get_pos(),eLeft_Right);
		eCenter_Top.setDatas(vCenter,eTop_Center,eTop_Left,fTopLeft,fTop.get_isReal());
		eTop_Center.setDatas(vTop,eCenter_Top,eCenter_Right,fTopRight,fTop.get_isReal());
		eCenter_Left.setDatas(vCenter,eLeft_Center,eLeft_Bot,fBotLeft,edge.get_isReal(),edge.get_isConstrained());
		eLeft_Center.setDatas(vLeft,eCenter_Left,eCenter_Top,fTopLeft,edge.get_isReal(),edge.get_isConstrained());
		eCenter_Bot.setDatas(vCenter,eBot_Center,eBot_Right,fBotRight,fBot.get_isReal());
		eBot_Center.setDatas(vBot,eCenter_Bot,eCenter_Left,fBotLeft,fBot.get_isReal());
		eCenter_Right.setDatas(vCenter,eRight_Center,eRight_Top,fTopRight,edge.get_isReal(),edge.get_isConstrained());
		eRight_Center.setDatas(vRight,eCenter_Right,eCenter_Bot,fBotRight,edge.get_isReal(),edge.get_isConstrained());
		fTopLeft.setDatas(eCenter_Top,fTop.get_isReal());
		fBotLeft.setDatas(eCenter_Left,fBot.get_isReal());
		fBotRight.setDatas(eCenter_Bot,fBot.get_isReal());
		fTopRight.setDatas(eCenter_Right,fTop.get_isReal());
		if(vLeft.get_edge() == eLeft_Right) vLeft.setDatas(eLeft_Center);
		if(vRight.get_edge() == eRight_Left) vRight.setDatas(eRight_Center);
		eTop_Left.set_nextLeftEdge(eLeft_Center);
		eTop_Left.set_leftFace(fTopLeft);
		eLeft_Bot.set_nextLeftEdge(eBot_Center);
		eLeft_Bot.set_leftFace(fBotLeft);
		eBot_Right.set_nextLeftEdge(eRight_Center);
		eBot_Right.set_leftFace(fBotRight);
		eRight_Top.set_nextLeftEdge(eTop_Center);
		eRight_Top.set_leftFace(fTopRight);
		if(eLeft_Right.get_isConstrained()) {
			var fromSegments = eLeft_Right.fromConstraintSegments;
			eLeft_Center.fromConstraintSegments = fromSegments.slice(0);
			eCenter_Left.fromConstraintSegments = eLeft_Center.fromConstraintSegments;
			eCenter_Right.fromConstraintSegments = fromSegments.slice(0);
			eRight_Center.fromConstraintSegments = eCenter_Right.fromConstraintSegments;
			var edges;
			var index;
			var _g1 = 0;
			var _g = eLeft_Right.fromConstraintSegments.length;
			while(_g1 < _g) {
				var i = _g1++;
				edges = eLeft_Right.fromConstraintSegments[i].get_edges();
				index = HxOverrides.indexOf(edges,eLeft_Right,0);
				if(index != -1) {
					edges.splice(index,1);
					edges.splice(index,0,eLeft_Center);
					edges.splice(index + 1,0,eCenter_Right);
				} else {
					var index2 = HxOverrides.indexOf(edges,eRight_Left,0);
					edges.splice(index2,1);
					edges.splice(index2,0,eRight_Center);
					edges.splice(index2,0,eCenter_Left);
				}
			}
			vCenter.set_fromConstraintSegments(fromSegments.slice(0));
		}
		eLeft_Right.dispose();
		eRight_Left.dispose();
		this._edges.splice(HxOverrides.indexOf(this._edges,eLeft_Right,0),1);
		this._edges.splice(HxOverrides.indexOf(this._edges,eRight_Left,0),1);
		fTop.dispose();
		fBot.dispose();
		this._faces.splice(HxOverrides.indexOf(this._faces,fTop,0),1);
		this._faces.splice(HxOverrides.indexOf(this._faces,fBot,0),1);
		this.__centerVertex = vCenter;
		this.__edgesToCheck.push(eTop_Left);
		this.__edgesToCheck.push(eLeft_Bot);
		this.__edgesToCheck.push(eBot_Right);
		this.__edgesToCheck.push(eRight_Top);
		return vCenter;
	}
	,splitFace: function(face,x,y) {
		this.__edgesToCheck.splice(0,this.__edgesToCheck.length);
		var eTop_Left = face.get_edge();
		var eLeft_Right = eTop_Left.get_nextLeftEdge();
		var eRight_Top = eLeft_Right.get_nextLeftEdge();
		var vTop = eTop_Left.get_originVertex();
		var vLeft = eLeft_Right.get_originVertex();
		var vRight = eRight_Top.get_originVertex();
		var vCenter = new hxDaedalus_data_Vertex();
		var eTop_Center = new hxDaedalus_data_Edge();
		var eCenter_Top = new hxDaedalus_data_Edge();
		var eLeft_Center = new hxDaedalus_data_Edge();
		var eCenter_Left = new hxDaedalus_data_Edge();
		var eRight_Center = new hxDaedalus_data_Edge();
		var eCenter_Right = new hxDaedalus_data_Edge();
		var fTopLeft = new hxDaedalus_data_Face();
		var fBot = new hxDaedalus_data_Face();
		var fTopRight = new hxDaedalus_data_Face();
		this._vertices.push(vCenter);
		this._edges.push(eTop_Center);
		this._edges.push(eCenter_Top);
		this._edges.push(eLeft_Center);
		this._edges.push(eCenter_Left);
		this._edges.push(eRight_Center);
		this._edges.push(eCenter_Right);
		this._faces.push(fTopLeft);
		this._faces.push(fBot);
		this._faces.push(fTopRight);
		vCenter.setDatas(eCenter_Top);
		vCenter.get_pos().x = x;
		vCenter.get_pos().y = y;
		eTop_Center.setDatas(vTop,eCenter_Top,eCenter_Right,fTopRight);
		eCenter_Top.setDatas(vCenter,eTop_Center,eTop_Left,fTopLeft);
		eLeft_Center.setDatas(vLeft,eCenter_Left,eCenter_Top,fTopLeft);
		eCenter_Left.setDatas(vCenter,eLeft_Center,eLeft_Right,fBot);
		eRight_Center.setDatas(vRight,eCenter_Right,eCenter_Left,fBot);
		eCenter_Right.setDatas(vCenter,eRight_Center,eRight_Top,fTopRight);
		fTopLeft.setDatas(eCenter_Top);
		fBot.setDatas(eCenter_Left);
		fTopRight.setDatas(eCenter_Right);
		eTop_Left.set_nextLeftEdge(eLeft_Center);
		eTop_Left.set_leftFace(fTopLeft);
		eLeft_Right.set_nextLeftEdge(eRight_Center);
		eLeft_Right.set_leftFace(fBot);
		eRight_Top.set_nextLeftEdge(eTop_Center);
		eRight_Top.set_leftFace(fTopRight);
		face.dispose();
		this._faces.splice(HxOverrides.indexOf(this._faces,face,0),1);
		this.__centerVertex = vCenter;
		this.__edgesToCheck.push(eTop_Left);
		this.__edgesToCheck.push(eLeft_Right);
		this.__edgesToCheck.push(eRight_Top);
		return vCenter;
	}
	,restoreAsDelaunay: function() {
		var edge;
		while(this.__edgesToCheck.length > 0) {
			edge = this.__edgesToCheck.shift();
			if(edge.get_isReal() && !edge.get_isConstrained() && !hxDaedalus_data_math_Geom2D.isDelaunay(edge)) {
				if(edge.get_nextLeftEdge().get_destinationVertex() == this.__centerVertex) {
					this.__edgesToCheck.push(edge.get_nextRightEdge());
					this.__edgesToCheck.push(edge.get_prevRightEdge());
				} else {
					this.__edgesToCheck.push(edge.get_nextLeftEdge());
					this.__edgesToCheck.push(edge.get_prevLeftEdge());
				}
				this.flipEdge(edge);
			}
		}
	}
	,deleteVertex: function(vertex) {
		var i;
		var freeOfConstraint;
		var iterEdges = new hxDaedalus_iterators_FromVertexToOutgoingEdges();
		iterEdges.set_fromVertex(vertex);
		iterEdges.realEdgesOnly = false;
		var edge;
		var outgoingEdges = [];
		freeOfConstraint = vertex.get_fromConstraintSegments().length == 0;
		var bound = [];
		var realA = false;
		var realB = false;
		var boundA = [];
		var boundB = [];
		if(freeOfConstraint) while((edge = iterEdges.next()) != null) {
			outgoingEdges.push(edge);
			bound.push(edge.get_nextLeftEdge());
		} else {
			var edges;
			var _g1 = 0;
			var _g = vertex.get_fromConstraintSegments().length;
			while(_g1 < _g) {
				var i1 = _g1++;
				edges = vertex.get_fromConstraintSegments()[i1].get_edges();
				if(edges[0].get_originVertex() == vertex || edges[edges.length - 1].get_destinationVertex() == vertex) return false;
			}
			var count = 0;
			while((edge = iterEdges.next()) != null) {
				outgoingEdges.push(edge);
				if(edge.get_isConstrained()) {
					count++;
					if(count > 2) return false;
				}
			}
			boundA = [];
			boundB = [];
			var constrainedEdgeA = null;
			var constrainedEdgeB = null;
			var edgeA = new hxDaedalus_data_Edge();
			var edgeB = new hxDaedalus_data_Edge();
			this._edges.push(edgeA);
			this._edges.push(edgeB);
			var _g11 = 0;
			var _g2 = outgoingEdges.length;
			while(_g11 < _g2) {
				var i2 = _g11++;
				edge = outgoingEdges[i2];
				if(edge.get_isConstrained()) {
					if(constrainedEdgeA == null) {
						edgeB.setDatas(edge.get_destinationVertex(),edgeA,null,null,true,true);
						boundA.push(edgeA);
						boundA.push(edge.get_nextLeftEdge());
						boundB.push(edgeB);
						constrainedEdgeA = edge;
					} else if(constrainedEdgeB == null) {
						edgeA.setDatas(edge.get_destinationVertex(),edgeB,null,null,true,true);
						boundB.push(edge.get_nextLeftEdge());
						constrainedEdgeB = edge;
					}
				} else if(constrainedEdgeA == null) boundB.push(edge.get_nextLeftEdge()); else if(constrainedEdgeB == null) boundA.push(edge.get_nextLeftEdge()); else boundB.push(edge.get_nextLeftEdge());
			}
			realA = constrainedEdgeA.get_leftFace().get_isReal();
			realB = constrainedEdgeB.get_leftFace().get_isReal();
			edgeA.fromConstraintSegments = constrainedEdgeA.fromConstraintSegments.slice(0);
			edgeB.fromConstraintSegments = edgeA.fromConstraintSegments;
			var index;
			var _g12 = 0;
			var _g3 = vertex.get_fromConstraintSegments().length;
			while(_g12 < _g3) {
				var i3 = _g12++;
				edges = vertex.get_fromConstraintSegments()[i3].get_edges();
				index = HxOverrides.indexOf(edges,constrainedEdgeA,0);
				if(index != -1) {
					edges.splice(index - 1,2);
					edges.splice(index - 1,0,edgeA);
				} else {
					var index2 = HxOverrides.indexOf(edges,constrainedEdgeB,0) - 1;
					edges.splice(index2,2);
					edges.splice(index2,0,edgeB);
				}
			}
		}
		var faceToDelete;
		var _g13 = 0;
		var _g4 = outgoingEdges.length;
		while(_g13 < _g4) {
			var i4 = _g13++;
			edge = outgoingEdges[i4];
			faceToDelete = edge.get_leftFace();
			this._faces.splice(HxOverrides.indexOf(this._faces,faceToDelete,0),1);
			faceToDelete.dispose();
			edge.get_destinationVertex().set_edge(edge.get_nextLeftEdge());
			this._edges.splice((function($this) {
				var $r;
				var x = edge.get_oppositeEdge();
				$r = HxOverrides.indexOf($this._edges,x,0);
				return $r;
			}(this)),1);
			edge.get_oppositeEdge().dispose();
			this._edges.splice(HxOverrides.indexOf(this._edges,edge,0),1);
			edge.dispose();
		}
		this._vertices.splice(HxOverrides.indexOf(this._vertices,vertex,0),1);
		vertex.dispose();
		if(freeOfConstraint) this.triangulate(bound,true); else {
			this.triangulate(boundA,realA);
			this.triangulate(boundB,realB);
		}
		return true;
	}
	,untriangulate: function(edgesList) {
		var i;
		var verticesCleaned = new haxe_ds_ObjectMap();
		var currEdge;
		var outEdge;
		var _g1 = 0;
		var _g = edgesList.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			currEdge = edgesList[i1];
			if((function($this) {
				var $r;
				var key = currEdge.get_originVertex();
				$r = verticesCleaned.h[key.__id__];
				return $r;
			}(this)) == null) {
				currEdge.get_originVertex().set_edge(currEdge.get_prevLeftEdge().get_oppositeEdge());
				var k = currEdge.get_originVertex();
				verticesCleaned.set(k,true);
				true;
			}
			if((function($this) {
				var $r;
				var key1 = currEdge.get_destinationVertex();
				$r = verticesCleaned.h[key1.__id__];
				return $r;
			}(this)) == null) {
				currEdge.get_destinationVertex().set_edge(currEdge.get_nextLeftEdge());
				var k1 = currEdge.get_destinationVertex();
				verticesCleaned.set(k1,true);
				true;
			}
			this._faces.splice((function($this) {
				var $r;
				var x = currEdge.get_leftFace();
				$r = HxOverrides.indexOf($this._faces,x,0);
				return $r;
			}(this)),1);
			currEdge.get_leftFace().dispose();
			if(i1 == edgesList.length - 1) {
				this._faces.splice((function($this) {
					var $r;
					var x1 = currEdge.get_rightFace();
					$r = HxOverrides.indexOf($this._faces,x1,0);
					return $r;
				}(this)),1);
				currEdge.get_rightFace().dispose();
			}
		}
		var _g11 = 0;
		var _g2 = edgesList.length;
		while(_g11 < _g2) {
			var i2 = _g11++;
			currEdge = edgesList[i2];
			this._edges.splice((function($this) {
				var $r;
				var x2 = currEdge.get_oppositeEdge();
				$r = HxOverrides.indexOf($this._edges,x2,0);
				return $r;
			}(this)),1);
			this._edges.splice(HxOverrides.indexOf(this._edges,currEdge,0),1);
			currEdge.get_oppositeEdge().dispose();
			currEdge.dispose();
		}
	}
	,triangulate: function(bound,isReal) {
		if(bound.length < 2) {
			haxe_Log.trace("BREAK ! the hole has less than 2 edges",{ fileName : "Mesh.hx", lineNumber : 1396, className : "hxDaedalus.data.Mesh", methodName : "triangulate"});
			return;
		} else if(bound.length == 2) {
			haxe_Log.trace("BREAK ! the hole has only 2 edges",{ fileName : "Mesh.hx", lineNumber : 1403, className : "hxDaedalus.data.Mesh", methodName : "triangulate"});
			hxDaedalus_debug_Debug.trace("  - edge0: " + bound[0].get_originVertex().get_id() + " -> " + bound[0].get_destinationVertex().get_id(),{ fileName : "Mesh.hx", lineNumber : 1404, className : "hxDaedalus.data.Mesh", methodName : "triangulate"});
			hxDaedalus_debug_Debug.trace("  - edge1: " + bound[1].get_originVertex().get_id() + " -> " + bound[1].get_destinationVertex().get_id(),{ fileName : "Mesh.hx", lineNumber : 1405, className : "hxDaedalus.data.Mesh", methodName : "triangulate"});
			return;
		} else if(bound.length == 3) {
			var f = new hxDaedalus_data_Face();
			f.setDatas(bound[0],isReal);
			this._faces.push(f);
			bound[0].set_leftFace(f);
			bound[1].set_leftFace(f);
			bound[2].set_leftFace(f);
			bound[0].set_nextLeftEdge(bound[1]);
			bound[1].set_nextLeftEdge(bound[2]);
			bound[2].set_nextLeftEdge(bound[0]);
		} else {
			var baseEdge = bound[0];
			var vertexA = baseEdge.get_originVertex();
			var vertexB = baseEdge.get_destinationVertex();
			var vertexC;
			var vertexCheck;
			var circumcenter = new hxDaedalus_data_math_Point2D();
			var radiusSquared;
			var distanceSquared;
			var isDelaunay = false;
			var index = 0;
			var i;
			var _g1 = 2;
			var _g = bound.length;
			while(_g1 < _g) {
				var i1 = _g1++;
				vertexC = bound[i1].get_originVertex();
				if(hxDaedalus_data_math_Geom2D.getRelativePosition2(vertexC.get_pos().x,vertexC.get_pos().y,baseEdge) == 1) {
					index = i1;
					isDelaunay = true;
					hxDaedalus_data_math_Geom2D.getCircumcenter(vertexA.get_pos().x,vertexA.get_pos().y,vertexB.get_pos().x,vertexB.get_pos().y,vertexC.get_pos().x,vertexC.get_pos().y,circumcenter);
					radiusSquared = (vertexA.get_pos().x - circumcenter.x) * (vertexA.get_pos().x - circumcenter.x) + (vertexA.get_pos().y - circumcenter.y) * (vertexA.get_pos().y - circumcenter.y);
					radiusSquared -= 0.0001;
					var _g3 = 2;
					var _g2 = bound.length;
					while(_g3 < _g2) {
						var j = _g3++;
						if(j != i1) {
							vertexCheck = bound[j].get_originVertex();
							distanceSquared = (vertexCheck.get_pos().x - circumcenter.x) * (vertexCheck.get_pos().x - circumcenter.x) + (vertexCheck.get_pos().y - circumcenter.y) * (vertexCheck.get_pos().y - circumcenter.y);
							if(distanceSquared < radiusSquared) {
								isDelaunay = false;
								break;
							}
						}
					}
					if(isDelaunay) break;
				}
			}
			if(!isDelaunay) {
				haxe_Log.trace("NO DELAUNAY FOUND",{ fileName : "Mesh.hx", lineNumber : 1476, className : "hxDaedalus.data.Mesh", methodName : "triangulate"});
				var s = "";
				var _g11 = 0;
				var _g4 = bound.length;
				while(_g11 < _g4) {
					var i2 = _g11++;
					s += bound[i2].get_originVertex().get_pos().x + " , ";
					s += bound[i2].get_originVertex().get_pos().y + " , ";
					s += bound[i2].get_destinationVertex().get_pos().x + " , ";
					s += bound[i2].get_destinationVertex().get_pos().y + " , ";
				}
				index = 2;
			}
			var edgeA = null;
			var edgeAopp = null;
			var edgeB = null;
			var edgeBopp;
			var boundA;
			var boundM;
			var boundB;
			if(index < bound.length - 1) {
				edgeA = new hxDaedalus_data_Edge();
				edgeAopp = new hxDaedalus_data_Edge();
				this._edges.push(edgeA);
				this._edges.push(edgeAopp);
				edgeA.setDatas(vertexA,edgeAopp,null,null,isReal,false);
				edgeAopp.setDatas(bound[index].get_originVertex(),edgeA,null,null,isReal,false);
				boundA = bound.slice(index);
				boundA.push(edgeA);
				this.triangulate(boundA,isReal);
			}
			if(index > 2) {
				edgeB = new hxDaedalus_data_Edge();
				edgeBopp = new hxDaedalus_data_Edge();
				this._edges.push(edgeB);
				this._edges.push(edgeBopp);
				edgeB.setDatas(bound[1].get_originVertex(),edgeBopp,null,null,isReal,false);
				edgeBopp.setDatas(bound[index].get_originVertex(),edgeB,null,null,isReal,false);
				boundB = bound.slice(1,index);
				boundB.push(edgeBopp);
				this.triangulate(boundB,isReal);
			}
			if(index == 2) boundM = [baseEdge,bound[1],edgeAopp]; else if(index == bound.length - 1) boundM = [baseEdge,edgeB,bound[index]]; else boundM = [baseEdge,edgeB,edgeAopp];
			this.triangulate(boundM,isReal);
		}
	}
	,findPositionFromBounds: function(x,y) {
		if(x <= 0) {
			if(y <= 0) return 1; else if(y >= this._height) return 7; else return 8;
		} else if(x >= this._width) {
			if(y <= 0) return 3; else if(y >= this._height) return 5; else return 4;
		} else if(y <= 0) return 2; else if(y >= this._height) return 6; else return 0;
	}
	,debug: function() {
		var i;
		var _g1 = 0;
		var _g = this._vertices.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			hxDaedalus_debug_Debug.trace("-- vertex " + this._vertices[i1].get_id(),{ fileName : "Mesh.hx", lineNumber : 1568, className : "hxDaedalus.data.Mesh", methodName : "debug"});
			hxDaedalus_debug_Debug.trace("  edge " + this._vertices[i1].get_edge().get_id() + " - " + Std.string(this._vertices[i1].get_edge()),{ fileName : "Mesh.hx", lineNumber : 1569, className : "hxDaedalus.data.Mesh", methodName : "debug"});
			hxDaedalus_debug_Debug.trace("  edge isReal: " + Std.string(this._vertices[i1].get_edge().get_isReal()),{ fileName : "Mesh.hx", lineNumber : 1570, className : "hxDaedalus.data.Mesh", methodName : "debug"});
		}
		var _g11 = 0;
		var _g2 = this._edges.length;
		while(_g11 < _g2) {
			var i2 = _g11++;
			haxe_Log.trace("-- edge " + Std.string(this._edges[i2]),{ fileName : "Mesh.hx", lineNumber : 1573, className : "hxDaedalus.data.Mesh", methodName : "debug"});
			hxDaedalus_debug_Debug.trace("  isReal " + this._edges[i2].get_id() + " - " + Std.string(this._edges[i2].get_isReal()),{ fileName : "Mesh.hx", lineNumber : 1574, className : "hxDaedalus.data.Mesh", methodName : "debug"});
			hxDaedalus_debug_Debug.trace("  nextLeftEdge " + Std.string(this._edges[i2].get_nextLeftEdge()),{ fileName : "Mesh.hx", lineNumber : 1575, className : "hxDaedalus.data.Mesh", methodName : "debug"});
			hxDaedalus_debug_Debug.trace("  oppositeEdge " + Std.string(this._edges[i2].get_oppositeEdge()),{ fileName : "Mesh.hx", lineNumber : 1576, className : "hxDaedalus.data.Mesh", methodName : "debug"});
		}
	}
	,traverse: function(onVertex,onEdge) {
		var vertex;
		var incomingEdge;
		var holdingFace;
		var iterVertices;
		iterVertices = new hxDaedalus_iterators_FromMeshToVertices();
		iterVertices.set_fromMesh(this);
		var iterEdges;
		iterEdges = new hxDaedalus_iterators_FromVertexToIncomingEdges();
		var dictVerticesDone = new haxe_ds_ObjectMap();
		while((vertex = iterVertices.next()) != null) {
			{
				dictVerticesDone.set(vertex,true);
				true;
			}
			if(!this.vertexIsInsideAABB(vertex,this)) continue;
			onVertex(vertex);
			iterEdges.set_fromVertex(vertex);
			while((incomingEdge = iterEdges.next()) != null) if(!(function($this) {
				var $r;
				var key = incomingEdge.get_originVertex();
				$r = dictVerticesDone.h[key.__id__];
				return $r;
			}(this))) onEdge(incomingEdge);
		}
	}
	,vertexIsInsideAABB: function(vertex,mesh) {
		if(vertex.get_pos().x < 0 || vertex.get_pos().x > mesh.get_width() || vertex.get_pos().y < 0 || vertex.get_pos().y > mesh.get_height()) return false; else return true;
	}
};
var hxDaedalus_data_Object = function() {
	this._id = hxDaedalus_data_Object.INC;
	hxDaedalus_data_Object.INC++;
	this._pivotX = 0;
	this._pivotY = 0;
	this._matrix = new hxDaedalus_data_math_Matrix2D();
	this._scaleX = 1;
	this._scaleY = 1;
	this._rotation = 0;
	this._x = 0;
	this._y = 0;
	this._coordinates = [];
	this._hasChanged = false;
};
hxDaedalus_data_Object.__name__ = true;
hxDaedalus_data_Object.prototype = {
	get_id: function() {
		return this._id;
	}
	,dispose: function() {
		this._matrix = null;
		this._coordinates = null;
		this._constraintShape = null;
	}
	,updateValuesFromMatrix: function() {
	}
	,updateMatrixFromValues: function() {
		this._matrix.identity();
		this._matrix.translate(-this._pivotX,-this._pivotY);
		this._matrix.scale(this._scaleX,this._scaleY);
		this._matrix.rotate(this._rotation);
		this._matrix.translate(this._x,this._y);
	}
	,get_pivotX: function() {
		return this._pivotX;
	}
	,set_pivotX: function(value) {
		this._pivotX = value;
		this._hasChanged = true;
		return value;
	}
	,get_pivotY: function() {
		return this._pivotY;
	}
	,set_pivotY: function(value) {
		this._pivotY = value;
		this._hasChanged = true;
		return value;
	}
	,get_scaleX: function() {
		return this._scaleX;
	}
	,set_scaleX: function(value) {
		if(this._scaleX != value) {
			this._scaleX = value;
			this._hasChanged = true;
		}
		return value;
	}
	,get_scaleY: function() {
		return this._scaleY;
	}
	,set_scaleY: function(value) {
		if(this._scaleY != value) {
			this._scaleY = value;
			this._hasChanged = true;
		}
		return value;
	}
	,get_rotation: function() {
		return this._rotation;
	}
	,set_rotation: function(value) {
		if(this._rotation != value) {
			this._rotation = value;
			this._hasChanged = true;
		}
		return value;
	}
	,get_x: function() {
		return this._x;
	}
	,set_x: function(value) {
		if(this._x != value) {
			this._x = value;
			this._hasChanged = true;
		}
		return value;
	}
	,get_y: function() {
		return this._y;
	}
	,set_y: function(value) {
		if(this._y != value) {
			this._y = value;
			this._hasChanged = true;
		}
		return value;
	}
	,get_matrix: function() {
		return this._matrix;
	}
	,set_matrix: function(value) {
		this._matrix = value;
		this._hasChanged = true;
		return value;
	}
	,get_coordinates: function() {
		return this._coordinates;
	}
	,set_coordinates: function(value) {
		this._coordinates = value;
		this._hasChanged = true;
		return value;
	}
	,get_constraintShape: function() {
		return this._constraintShape;
	}
	,set_constraintShape: function(value) {
		this._constraintShape = value;
		this._hasChanged = true;
		return value;
	}
	,get_hasChanged: function() {
		return this._hasChanged;
	}
	,set_hasChanged: function(value) {
		this._hasChanged = value;
		return value;
	}
	,get_edges: function() {
		var res = [];
		var seg = this._constraintShape.segments;
		var _g1 = 0;
		var _g = seg.length;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0;
			var _g2 = seg[i].get_edges().length;
			while(_g3 < _g2) {
				var j = _g3++;
				res.push(seg[i].get_edges()[j]);
			}
		}
		return res;
	}
};
var hxDaedalus_data_Vertex = function() {
	this.colorDebug = -1;
	this._id = hxDaedalus_data_Vertex.INC;
	hxDaedalus_data_Vertex.INC++;
	this._pos = new hxDaedalus_data_math_Point2D();
	this._fromConstraintSegments = [];
};
hxDaedalus_data_Vertex.__name__ = true;
hxDaedalus_data_Vertex.prototype = {
	get_id: function() {
		return this._id;
	}
	,get_isReal: function() {
		return this._isReal;
	}
	,get_pos: function() {
		return this._pos;
	}
	,get_fromConstraintSegments: function() {
		return this._fromConstraintSegments;
	}
	,set_fromConstraintSegments: function(value) {
		return this._fromConstraintSegments = value;
	}
	,setDatas: function(edge,isReal) {
		if(isReal == null) isReal = true;
		this._isReal = isReal;
		this._edge = edge;
	}
	,addFromConstraintSegment: function(segment) {
		if(HxOverrides.indexOf(this._fromConstraintSegments,segment,0) == -1) this._fromConstraintSegments.push(segment);
	}
	,removeFromConstraintSegment: function(segment) {
		var index = HxOverrides.indexOf(this._fromConstraintSegments,segment,0);
		if(index != -1) this._fromConstraintSegments.splice(index,1);
	}
	,dispose: function() {
		this._pos = null;
		this._edge = null;
		this._fromConstraintSegments = null;
	}
	,get_edge: function() {
		return this._edge;
	}
	,set_edge: function(value) {
		return this._edge = value;
	}
	,toString: function() {
		return "ver_id " + this._id;
	}
};
var hxDaedalus_data_math_Intersection = { __ename__ : true, __constructs__ : ["EVertex","EEdge","EFace","ENull"] };
hxDaedalus_data_math_Intersection.EVertex = function(vertex) { var $x = ["EVertex",0,vertex]; $x.__enum__ = hxDaedalus_data_math_Intersection; $x.toString = $estr; return $x; };
hxDaedalus_data_math_Intersection.EEdge = function(edge) { var $x = ["EEdge",1,edge]; $x.__enum__ = hxDaedalus_data_math_Intersection; $x.toString = $estr; return $x; };
hxDaedalus_data_math_Intersection.EFace = function(face) { var $x = ["EFace",2,face]; $x.__enum__ = hxDaedalus_data_math_Intersection; $x.toString = $estr; return $x; };
hxDaedalus_data_math_Intersection.ENull = ["ENull",3];
hxDaedalus_data_math_Intersection.ENull.toString = $estr;
hxDaedalus_data_math_Intersection.ENull.__enum__ = hxDaedalus_data_math_Intersection;
var hxDaedalus_data_math_Point2D = function(x_,y_) {
	if(y_ == null) y_ = 0;
	if(x_ == null) x_ = 0;
	this.x = x_;
	this.y = y_;
};
hxDaedalus_data_math_Point2D.__name__ = true;
hxDaedalus_data_math_Point2D.prototype = {
	transform: function(matrix) {
		matrix.tranform(this);
	}
	,setXY: function(x_,y_) {
		this.x = x_;
		this.y = y_;
	}
	,clone: function() {
		return new hxDaedalus_data_math_Point2D(this.x,this.y);
	}
	,substract: function(p) {
		this.x -= p.x;
		this.y -= p.y;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,normalize: function() {
		var norm = this.get_length();
		this.x = this.x / norm;
		this.y = this.y / norm;
	}
	,scale: function(s) {
		this.x = this.x * s;
		this.y = this.y * s;
	}
	,distanceTo: function(p) {
		var diffX = this.x - p.x;
		var diffY = this.y - p.y;
		return Math.sqrt(diffX * diffX + diffY * diffY);
	}
};
var hxDaedalus_data_math_Geom2D = function() {
};
hxDaedalus_data_math_Geom2D.__name__ = true;
hxDaedalus_data_math_Geom2D.locatePosition = function(x,y,mesh) {
	if(hxDaedalus_data_math_Geom2D._randGen == null) hxDaedalus_data_math_Geom2D._randGen = new hxDaedalus_data_math_RandGenerator();
	hxDaedalus_data_math_Geom2D._randGen.set_seed(x * 10 + 4 * y | 0);
	var i;
	hxDaedalus_data_math_Geom2D.__samples.splice(0,hxDaedalus_data_math_Geom2D.__samples.length);
	var numSamples = Std["int"](Math.pow(mesh._vertices.length,0.33333333333333331));
	hxDaedalus_data_math_Geom2D._randGen.rangeMin = 0;
	hxDaedalus_data_math_Geom2D._randGen.rangeMax = mesh._vertices.length - 1;
	var _g = 0;
	while(_g < numSamples) {
		var i1 = _g++;
		var _rnd = hxDaedalus_data_math_Geom2D._randGen.next();
		hxDaedalus_debug_Debug.assertFalse(_rnd < 0 || _rnd > mesh._vertices.length - 1,"_rnd: " + _rnd,{ fileName : "Geom2D.hx", lineNumber : 67, className : "hxDaedalus.data.math.Geom2D", methodName : "locatePosition"});
		hxDaedalus_debug_Debug.assertFalse(mesh._vertices == null,"vertices: " + mesh._vertices.length,{ fileName : "Geom2D.hx", lineNumber : 68, className : "hxDaedalus.data.math.Geom2D", methodName : "locatePosition"});
		hxDaedalus_data_math_Geom2D.__samples.push(mesh._vertices[_rnd]);
	}
	var currVertex;
	var currVertexPos;
	var distSquared;
	var minDistSquared = Infinity;
	var closedVertex = null;
	var _g1 = 0;
	while(_g1 < numSamples) {
		var i2 = _g1++;
		currVertex = hxDaedalus_data_math_Geom2D.__samples[i2];
		currVertexPos = currVertex.get_pos();
		distSquared = (currVertexPos.x - x) * (currVertexPos.x - x) + (currVertexPos.y - y) * (currVertexPos.y - y);
		if(distSquared < minDistSquared) {
			minDistSquared = distSquared;
			closedVertex = currVertex;
		}
	}
	var currFace;
	var iterFace = new hxDaedalus_iterators_FromVertexToHoldingFaces();
	iterFace.set_fromVertex(closedVertex);
	currFace = iterFace.next();
	var faceVisited = new haxe_ds_ObjectMap();
	var currEdge;
	var iterEdge = new hxDaedalus_iterators_FromFaceToInnerEdges();
	var objectContainer = hxDaedalus_data_math_Intersection.ENull;
	var relativPos;
	var numIter = 0;
	while(faceVisited.h[currFace.__id__] || (function($this) {
		var $r;
		var _g2 = objectContainer = hxDaedalus_data_math_Geom2D.isInFace(x,y,currFace);
		$r = (function($this) {
			var $r;
			switch(_g2[1]) {
			case 3:
				$r = true;
				break;
			default:
				$r = false;
			}
			return $r;
		}($this));
		return $r;
	}(this))) {
		faceVisited.h[currFace.__id__];
		numIter++;
		if(numIter == 50) haxe_Log.trace("WALK TAKE MORE THAN 50 LOOP",{ fileName : "Geom2D.hx", lineNumber : 107, className : "hxDaedalus.data.math.Geom2D", methodName : "locatePosition"});
		iterEdge.set_fromFace(currFace);
		do {
			currEdge = iterEdge.next();
			if(currEdge == null) {
				haxe_Log.trace("KILL PATH",{ fileName : "Geom2D.hx", lineNumber : 115, className : "hxDaedalus.data.math.Geom2D", methodName : "locatePosition"});
				return hxDaedalus_data_math_Intersection.ENull;
			}
			relativPos = hxDaedalus_data_math_Geom2D.getRelativePosition(x,y,currEdge);
		} while(relativPos == 1 || relativPos == 0);
		currFace = currEdge.get_rightFace();
	}
	return objectContainer;
};
hxDaedalus_data_math_Geom2D.isCircleIntersectingAnyConstraint = function(x,y,radius,mesh) {
	if(x <= 0 || x >= mesh.get_width() || y <= 0 || y >= mesh.get_height()) return true;
	var loc = hxDaedalus_data_math_Geom2D.locatePosition(x,y,mesh);
	var face;
	switch(loc[1]) {
	case 0:
		var vertex = loc[2];
		face = vertex.get_edge().get_leftFace();
		break;
	case 1:
		var edge1 = loc[2];
		face = edge1.get_leftFace();
		break;
	case 2:
		var face_ = loc[2];
		face = face_;
		break;
	case 3:
		face = null;
		break;
	}
	var radiusSquared = radius * radius;
	var pos;
	var distSquared;
	pos = face.get_edge().get_originVertex().get_pos();
	distSquared = (pos.x - x) * (pos.x - x) + (pos.y - y) * (pos.y - y);
	if(distSquared <= radiusSquared) return true;
	pos = face.get_edge().get_nextLeftEdge().get_originVertex().get_pos();
	distSquared = (pos.x - x) * (pos.x - x) + (pos.y - y) * (pos.y - y);
	if(distSquared <= radiusSquared) return true;
	pos = face.get_edge().get_nextLeftEdge().get_nextLeftEdge().get_originVertex().get_pos();
	distSquared = (pos.x - x) * (pos.x - x) + (pos.y - y) * (pos.y - y);
	if(distSquared <= radiusSquared) return true;
	var edgesToCheck = [];
	edgesToCheck.push(face.get_edge());
	edgesToCheck.push(face.get_edge().get_nextLeftEdge());
	edgesToCheck.push(face.get_edge().get_nextLeftEdge().get_nextLeftEdge());
	var edge;
	var pos1;
	var pos2;
	var checkedEdges = new haxe_ds_ObjectMap();
	var intersecting;
	while(edgesToCheck.length > 0) {
		edge = edgesToCheck.pop();
		{
			checkedEdges.set(edge,true);
			true;
		}
		pos1 = edge.get_originVertex().get_pos();
		pos2 = edge.get_destinationVertex().get_pos();
		intersecting = hxDaedalus_data_math_Geom2D.intersectionsSegmentCircle(pos1.x,pos1.y,pos2.x,pos2.y,x,y,radius);
		if(intersecting) {
			if(edge.get_isConstrained()) return true; else {
				edge = edge.get_oppositeEdge().get_nextLeftEdge();
				if(!checkedEdges.h[edge.__id__] && !(function($this) {
					var $r;
					var key = edge.get_oppositeEdge();
					$r = checkedEdges.h[key.__id__];
					return $r;
				}(this)) && HxOverrides.indexOf(edgesToCheck,edge,0) == -1 && (function($this) {
					var $r;
					var x1 = edge.get_oppositeEdge();
					$r = HxOverrides.indexOf(edgesToCheck,x1,0);
					return $r;
				}(this)) == -1) edgesToCheck.push(edge);
				edge = edge.get_nextLeftEdge();
				if(!checkedEdges.h[edge.__id__] && !(function($this) {
					var $r;
					var key1 = edge.get_oppositeEdge();
					$r = checkedEdges.h[key1.__id__];
					return $r;
				}(this)) && HxOverrides.indexOf(edgesToCheck,edge,0) == -1 && (function($this) {
					var $r;
					var x2 = edge.get_oppositeEdge();
					$r = HxOverrides.indexOf(edgesToCheck,x2,0);
					return $r;
				}(this)) == -1) edgesToCheck.push(edge);
			}
		}
	}
	return false;
};
hxDaedalus_data_math_Geom2D.getDirection = function(x1,y1,x2,y2,x3,y3) {
	var dot = (x3 - x1) * (y2 - y1) + (y3 - y1) * (-x2 + x1);
	if(dot == 0) return 0; else if(dot > 0) return 1; else return -1;
};
hxDaedalus_data_math_Geom2D.getDirection2 = function(x1,y1,x2,y2,x3,y3) {
	var dot = (x3 - x1) * (y2 - y1) + (y3 - y1) * (-x2 + x1);
	if(dot == 0) return 0; else if(dot > 0) {
		if(hxDaedalus_data_math_Geom2D.distanceSquaredPointToLine(x3,y3,x1,y1,x2,y2) <= 0.0001) return 0; else return 1;
	} else if(hxDaedalus_data_math_Geom2D.distanceSquaredPointToLine(x3,y3,x1,y1,x2,y2) <= 0.0001) return 0; else return -1;
	return 0;
};
hxDaedalus_data_math_Geom2D.getRelativePosition = function(x,y,eUp) {
	return hxDaedalus_data_math_Geom2D.getDirection(eUp.get_originVertex().get_pos().x,eUp.get_originVertex().get_pos().y,eUp.get_destinationVertex().get_pos().x,eUp.get_destinationVertex().get_pos().y,x,y);
};
hxDaedalus_data_math_Geom2D.getRelativePosition2 = function(x,y,eUp) {
	return hxDaedalus_data_math_Geom2D.getDirection2(eUp.get_originVertex().get_pos().x,eUp.get_originVertex().get_pos().y,eUp.get_destinationVertex().get_pos().x,eUp.get_destinationVertex().get_pos().y,x,y);
};
hxDaedalus_data_math_Geom2D.isInFace = function(x,y,polygon) {
	var result = hxDaedalus_data_math_Intersection.ENull;
	var e1_2 = polygon.get_edge();
	var e2_3 = e1_2.get_nextLeftEdge();
	var e3_1 = e2_3.get_nextLeftEdge();
	if(hxDaedalus_data_math_Geom2D.getRelativePosition(x,y,e1_2) >= 0 && hxDaedalus_data_math_Geom2D.getRelativePosition(x,y,e2_3) >= 0 && hxDaedalus_data_math_Geom2D.getRelativePosition(x,y,e3_1) >= 0) {
		var v1 = e1_2.get_originVertex();
		var v2 = e2_3.get_originVertex();
		var v3 = e3_1.get_originVertex();
		var x1 = v1.get_pos().x;
		var y1 = v1.get_pos().y;
		var x2 = v2.get_pos().x;
		var y2 = v2.get_pos().y;
		var x3 = v3.get_pos().x;
		var y3 = v3.get_pos().y;
		var v_v1squaredLength = (x1 - x) * (x1 - x) + (y1 - y) * (y1 - y);
		var v_v2squaredLength = (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y);
		var v_v3squaredLength = (x3 - x) * (x3 - x) + (y3 - y) * (y3 - y);
		var v1_v2squaredLength = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
		var v2_v3squaredLength = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
		var v3_v1squaredLength = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
		var dot_v_v1v2 = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
		var dot_v_v2v3 = (x - x2) * (x3 - x2) + (y - y2) * (y3 - y2);
		var dot_v_v3v1 = (x - x3) * (x1 - x3) + (y - y3) * (y1 - y3);
		var v_e1_2squaredLength = v_v1squaredLength - dot_v_v1v2 * dot_v_v1v2 / v1_v2squaredLength;
		var v_e2_3squaredLength = v_v2squaredLength - dot_v_v2v3 * dot_v_v2v3 / v2_v3squaredLength;
		var v_e3_1squaredLength = v_v3squaredLength - dot_v_v3v1 * dot_v_v3v1 / v3_v1squaredLength;
		var closeTo_e1_2 = v_e1_2squaredLength <= 0.0001;
		var closeTo_e2_3 = v_e2_3squaredLength <= 0.0001;
		var closeTo_e3_1 = v_e3_1squaredLength <= 0.0001;
		if(closeTo_e1_2) {
			if(closeTo_e3_1) result = hxDaedalus_data_math_Intersection.EVertex(v1); else if(closeTo_e2_3) result = hxDaedalus_data_math_Intersection.EVertex(v2); else result = hxDaedalus_data_math_Intersection.EEdge(e1_2);
		} else if(closeTo_e2_3) {
			if(closeTo_e3_1) result = hxDaedalus_data_math_Intersection.EVertex(v3); else result = hxDaedalus_data_math_Intersection.EEdge(e2_3);
		} else if(closeTo_e3_1) result = hxDaedalus_data_math_Intersection.EEdge(e3_1); else result = hxDaedalus_data_math_Intersection.EFace(polygon);
	}
	return result;
};
hxDaedalus_data_math_Geom2D.clipSegmentByTriangle = function(s1x,s1y,s2x,s2y,t1x,t1y,t2x,t2y,t3x,t3y,pResult1,pResult2) {
	var side1_1;
	var side1_2;
	side1_1 = hxDaedalus_data_math_Geom2D.getDirection(t1x,t1y,t2x,t2y,s1x,s1y);
	side1_2 = hxDaedalus_data_math_Geom2D.getDirection(t1x,t1y,t2x,t2y,s2x,s2y);
	if(side1_1 <= 0 && side1_2 <= 0) return false;
	var side2_1;
	var side2_2;
	side2_1 = hxDaedalus_data_math_Geom2D.getDirection(t2x,t2y,t3x,t3y,s1x,s1y);
	side2_2 = hxDaedalus_data_math_Geom2D.getDirection(t2x,t2y,t3x,t3y,s2x,s2y);
	if(side2_1 <= 0 && side2_2 <= 0) return false;
	var side3_1;
	var side3_2;
	side3_1 = hxDaedalus_data_math_Geom2D.getDirection(t3x,t3y,t1x,t1y,s1x,s1y);
	side3_2 = hxDaedalus_data_math_Geom2D.getDirection(t3x,t3y,t1x,t1y,s2x,s2y);
	if(side3_1 <= 0 && side3_2 <= 0) return false;
	if(side1_1 >= 0 && side2_1 >= 0 && side3_1 >= 0 && (side1_2 >= 0 && side2_2 >= 0 && side3_2 >= 0)) {
		pResult1.x = s1x;
		pResult1.y = s1y;
		pResult2.x = s2x;
		pResult2.y = s2y;
		return true;
	}
	var n = 0;
	if(hxDaedalus_data_math_Geom2D.intersections2segments(s1x,s1y,s2x,s2y,t1x,t1y,t2x,t2y,pResult1,null)) n++;
	if(n == 0) {
		if(hxDaedalus_data_math_Geom2D.intersections2segments(s1x,s1y,s2x,s2y,t2x,t2y,t3x,t3y,pResult1,null)) n++;
	} else if(hxDaedalus_data_math_Geom2D.intersections2segments(s1x,s1y,s2x,s2y,t2x,t2y,t3x,t3y,pResult2,null)) {
		if(-0.01 > pResult1.x - pResult2.x || pResult1.x - pResult2.x > 0.01 || -0.01 > pResult1.y - pResult2.y || pResult1.y - pResult2.y > 0.01) n++;
	}
	if(n == 0) {
		if(hxDaedalus_data_math_Geom2D.intersections2segments(s1x,s1y,s2x,s2y,t3x,t3y,t1x,t1y,pResult1,null)) n++;
	} else if(n == 1) {
		if(hxDaedalus_data_math_Geom2D.intersections2segments(s1x,s1y,s2x,s2y,t3x,t3y,t1x,t1y,pResult2,null)) {
			if(-0.01 > pResult1.x - pResult2.x || pResult1.x - pResult2.x > 0.01 || -0.01 > pResult1.y - pResult2.y || pResult1.y - pResult2.y > 0.01) n++;
		}
	}
	if(n == 1) {
		if(side1_1 >= 0 && side2_1 >= 0 && side3_1 >= 0) {
			pResult2.x = s1x;
			pResult2.y = s1y;
		} else if(side1_2 >= 0 && side2_2 >= 0 && side3_2 >= 0) {
			pResult2.x = s2x;
			pResult2.y = s2y;
		} else n = 0;
	}
	if(n > 0) return true; else return false;
};
hxDaedalus_data_math_Geom2D.isSegmentIntersectingTriangle = function(s1x,s1y,s2x,s2y,t1x,t1y,t2x,t2y,t3x,t3y) {
	var side1_1;
	var side1_2;
	side1_1 = hxDaedalus_data_math_Geom2D.getDirection(t1x,t1y,t2x,t2y,s1x,s1y);
	side1_2 = hxDaedalus_data_math_Geom2D.getDirection(t1x,t1y,t2x,t2y,s2x,s2y);
	if(side1_1 <= 0 && side1_2 <= 0) return false;
	var side2_1;
	var side2_2;
	side2_1 = hxDaedalus_data_math_Geom2D.getDirection(t2x,t2y,t3x,t3y,s1x,s1y);
	side2_2 = hxDaedalus_data_math_Geom2D.getDirection(t2x,t2y,t3x,t3y,s2x,s2y);
	if(side2_1 <= 0 && side2_2 <= 0) return false;
	var side3_1;
	var side3_2;
	side3_1 = hxDaedalus_data_math_Geom2D.getDirection(t3x,t3y,t1x,t1y,s1x,s1y);
	side3_2 = hxDaedalus_data_math_Geom2D.getDirection(t3x,t3y,t1x,t1y,s2x,s2y);
	if(side3_1 <= 0 && side3_2 <= 0) return false;
	if(side1_1 == 1 && side2_1 == 1 && side3_1 == 1) return true;
	if(side1_1 == 1 && side2_1 == 1 && side3_1 == 1) return true;
	var side1;
	var side2;
	if(side1_1 == 1 && side1_2 <= 0 || side1_1 <= 0 && side1_2 == 1) {
		side1 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t1x,t1y);
		side2 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t2x,t2y);
		if(side1 == 1 && side2 <= 0 || side1 <= 0 && side2 == 1) return true;
	}
	if(side2_1 == 1 && side2_2 <= 0 || side2_1 <= 0 && side2_2 == 1) {
		side1 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t2x,t2y);
		side2 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t3x,t3y);
		if(side1 == 1 && side2 <= 0 || side1 <= 0 && side2 == 1) return true;
	}
	if(side3_1 == 1 && side3_2 <= 0 || side3_1 <= 0 && side3_2 == 1) {
		side1 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t3x,t3y);
		side2 = hxDaedalus_data_math_Geom2D.getDirection(s1x,s1y,s2x,s2y,t1x,t1y);
		if(side1 == 1 && side2 <= 0 || side1 <= 0 && side2 == 1) return true;
	}
	return false;
};
hxDaedalus_data_math_Geom2D.isDelaunay = function(edge) {
	var vLeft = edge.get_originVertex();
	var vRight = edge.get_destinationVertex();
	var vCorner = edge.get_nextLeftEdge().get_destinationVertex();
	var vOpposite = edge.get_nextRightEdge().get_destinationVertex();
	hxDaedalus_data_math_Geom2D.getCircumcenter(vCorner.get_pos().x,vCorner.get_pos().y,vLeft.get_pos().x,vLeft.get_pos().y,vRight.get_pos().x,vRight.get_pos().y,hxDaedalus_data_math_Geom2D.__circumcenter);
	var squaredRadius = (vCorner.get_pos().x - hxDaedalus_data_math_Geom2D.__circumcenter.x) * (vCorner.get_pos().x - hxDaedalus_data_math_Geom2D.__circumcenter.x) + (vCorner.get_pos().y - hxDaedalus_data_math_Geom2D.__circumcenter.y) * (vCorner.get_pos().y - hxDaedalus_data_math_Geom2D.__circumcenter.y);
	var squaredDistance = (vOpposite.get_pos().x - hxDaedalus_data_math_Geom2D.__circumcenter.x) * (vOpposite.get_pos().x - hxDaedalus_data_math_Geom2D.__circumcenter.x) + (vOpposite.get_pos().y - hxDaedalus_data_math_Geom2D.__circumcenter.y) * (vOpposite.get_pos().y - hxDaedalus_data_math_Geom2D.__circumcenter.y);
	return squaredDistance >= squaredRadius;
};
hxDaedalus_data_math_Geom2D.getCircumcenter = function(x1,y1,x2,y2,x3,y3,result) {
	if(result == null) result = new hxDaedalus_data_math_Point2D();
	var m1 = (x1 + x2) / 2;
	var m2 = (y1 + y2) / 2;
	var m3 = (x1 + x3) / 2;
	var m4 = (y1 + y3) / 2;
	var t1 = (m1 * (x1 - x3) + (m2 - m4) * (y1 - y3) + m3 * (x3 - x1)) / (x1 * (y3 - y2) + x2 * (y1 - y3) + x3 * (y2 - y1));
	result.x = m1 + t1 * (y2 - y1);
	result.y = m2 - t1 * (x2 - x1);
	return result;
};
hxDaedalus_data_math_Geom2D.intersections2segments = function(s1p1x,s1p1y,s1p2x,s1p2y,s2p1x,s2p1y,s2p2x,s2p2y,posIntersection,paramIntersection,infiniteLineMode) {
	if(infiniteLineMode == null) infiniteLineMode = false;
	var t1 = 0;
	var t2 = 0;
	var result;
	var divisor = (s1p1x - s1p2x) * (s2p1y - s2p2y) + (s1p2y - s1p1y) * (s2p1x - s2p2x);
	if(divisor == 0) result = false; else {
		result = true;
		if(!infiniteLineMode || posIntersection != null || paramIntersection != null) {
			t1 = (s1p1x * (s2p1y - s2p2y) + s1p1y * (s2p2x - s2p1x) + s2p1x * s2p2y - s2p1y * s2p2x) / divisor;
			t2 = (s1p1x * (s2p1y - s1p2y) + s1p1y * (s1p2x - s2p1x) - s1p2x * s2p1y + s1p2y * s2p1x) / divisor;
			if(!infiniteLineMode && !(0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1)) result = false;
		}
	}
	if(result) {
		if(posIntersection != null) {
			posIntersection.x = s1p1x + t1 * (s1p2x - s1p1x);
			posIntersection.y = s1p1y + t1 * (s1p2y - s1p1y);
		}
		if(paramIntersection != null) {
			paramIntersection.push(t1);
			paramIntersection.push(t2);
		}
	}
	return result;
};
hxDaedalus_data_math_Geom2D.intersections2edges = function(edge1,edge2,posIntersection,paramIntersection,infiniteLineMode) {
	if(infiniteLineMode == null) infiniteLineMode = false;
	return hxDaedalus_data_math_Geom2D.intersections2segments(edge1.get_originVertex().get_pos().x,edge1.get_originVertex().get_pos().y,edge1.get_destinationVertex().get_pos().x,edge1.get_destinationVertex().get_pos().y,edge2.get_originVertex().get_pos().x,edge2.get_originVertex().get_pos().y,edge2.get_destinationVertex().get_pos().x,edge2.get_destinationVertex().get_pos().y,posIntersection,paramIntersection,infiniteLineMode);
};
hxDaedalus_data_math_Geom2D.isConvex = function(edge) {
	var result = true;
	var eLeft;
	var vRight;
	eLeft = edge.get_nextLeftEdge().get_oppositeEdge();
	vRight = edge.get_nextRightEdge().get_destinationVertex();
	if(hxDaedalus_data_math_Geom2D.getRelativePosition(vRight.get_pos().x,vRight.get_pos().y,eLeft) != -1) result = false; else {
		eLeft = edge.get_prevRightEdge();
		vRight = edge.get_prevLeftEdge().get_originVertex();
		if(hxDaedalus_data_math_Geom2D.getRelativePosition(vRight.get_pos().x,vRight.get_pos().y,eLeft) != -1) result = false;
	}
	return result;
};
hxDaedalus_data_math_Geom2D.projectOrthogonaly = function(vertexPos,edge) {
	var a = edge.get_originVertex().get_pos().x;
	var b = edge.get_originVertex().get_pos().y;
	var c = edge.get_destinationVertex().get_pos().x;
	var d = edge.get_destinationVertex().get_pos().y;
	var e = vertexPos.x;
	var f = vertexPos.y;
	var t1 = (a * a - a * c - a * e + b * b - b * d - b * f + c * e + d * f) / (a * a - 2 * a * c + b * b - 2 * b * d + c * c + d * d);
	vertexPos.x = a + t1 * (c - a);
	vertexPos.y = b + t1 * (d - b);
};
hxDaedalus_data_math_Geom2D.intersections2Circles = function(cx1,cy1,r1,cx2,cy2,r2,result) {
	var distRadiusSQRD = (cx2 - cx1) * (cx2 - cx1) + (cy2 - cy1) * (cy2 - cy1);
	if((cx1 != cx2 || cy1 != cy2) && distRadiusSQRD <= (r1 + r2) * (r1 + r2) && distRadiusSQRD >= (r1 - r2) * (r1 - r2)) {
		var transcendPart = Math.sqrt(((r1 + r2) * (r1 + r2) - distRadiusSQRD) * (distRadiusSQRD - (r2 - r1) * (r2 - r1)));
		var xFirstPart = (cx1 + cx2) / 2 + (cx2 - cx1) * (r1 * r1 - r2 * r2) / (2 * distRadiusSQRD);
		var yFirstPart = (cy1 + cy2) / 2 + (cy2 - cy1) * (r1 * r1 - r2 * r2) / (2 * distRadiusSQRD);
		var xFactor = (cy2 - cy1) / (2 * distRadiusSQRD);
		var yFactor = (cx2 - cx1) / (2 * distRadiusSQRD);
		if(result != null) {
			var _g = 0;
			var _g1 = [xFirstPart + xFactor * transcendPart,yFirstPart - yFactor * transcendPart,xFirstPart - xFactor * transcendPart,yFirstPart + yFactor * transcendPart];
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				result.push(f);
			}
		}
		return true;
	} else return false;
};
hxDaedalus_data_math_Geom2D.intersectionsSegmentCircle = function(p0x,p0y,p1x,p1y,cx,cy,r,result) {
	var p0xSQD = p0x * p0x;
	var p0ySQD = p0y * p0y;
	var a = p1y * p1y - 2 * p1y * p0y + p0ySQD + p1x * p1x - 2 * p1x * p0x + p0xSQD;
	var b = 2 * p0y * cy - 2 * p0xSQD + 2 * p1y * p0y - 2 * p0ySQD + 2 * p1x * p0x - 2 * p1x * cx + 2 * p0x * cx - 2 * p1y * cy;
	var c = p0ySQD + cy * cy + cx * cx - 2 * p0y * cy - 2 * p0x * cx + p0xSQD - r * r;
	var delta = b * b - 4 * a * c;
	var deltaSQRT;
	var t0;
	var t1;
	if(delta < 0) return false; else if(delta == 0) {
		t0 = -b / (2 * a);
		if(t0 < 0 || t0 > 1) return false;
		if(result != null) {
			var _g = 0;
			var _g1 = [p0x + t0 * (p1x - p0x),p0y + t0 * (p1y - p0y),t0];
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				result.push(f);
			}
		}
		return true;
	} else {
		deltaSQRT = Math.sqrt(delta);
		t0 = (-b + deltaSQRT) / (2 * a);
		t1 = (-b - deltaSQRT) / (2 * a);
		var intersecting = false;
		if(0 <= t0 && t0 <= 1) {
			if(result != null) {
				var _g2 = 0;
				var _g11 = [p0x + t0 * (p1x - p0x),p0y + t0 * (p1y - p0y),t0];
				while(_g2 < _g11.length) {
					var f1 = _g11[_g2];
					++_g2;
					result.push(f1);
				}
			}
			intersecting = true;
		}
		if(0 <= t1 && t1 <= 1) {
			if(result != null) {
				var _g3 = 0;
				var _g12 = [p0x + t1 * (p1x - p0x),p0y + t1 * (p1y - p0y),t1];
				while(_g3 < _g12.length) {
					var f2 = _g12[_g3];
					++_g3;
					result.push(f2);
				}
			}
			intersecting = true;
		}
		return intersecting;
	}
};
hxDaedalus_data_math_Geom2D.intersectionsLineCircle = function(p0x,p0y,p1x,p1y,cx,cy,r,result) {
	var p0xSQD = p0x * p0x;
	var p0ySQD = p0y * p0y;
	var a = p1y * p1y - 2 * p1y * p0y + p0ySQD + p1x * p1x - 2 * p1x * p0x + p0xSQD;
	var b = 2 * p0y * cy - 2 * p0xSQD + 2 * p1y * p0y - 2 * p0ySQD + 2 * p1x * p0x - 2 * p1x * cx + 2 * p0x * cx - 2 * p1y * cy;
	var c = p0ySQD + cy * cy + cx * cx - 2 * p0y * cy - 2 * p0x * cx + p0xSQD - r * r;
	var delta = b * b - 4 * a * c;
	var deltaSQRT;
	var t0;
	var t1;
	if(delta < 0) return false; else if(delta == 0) {
		t0 = -b / (2 * a);
		var _g = 0;
		var _g1 = [p0x + t0 * (p1x - p0x),p0y + t0 * (p1y - p0y),t0];
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			result.push(f);
		}
	} else if(delta > 0) {
		deltaSQRT = Math.sqrt(delta);
		t0 = (-b + deltaSQRT) / (2 * a);
		t1 = (-b - deltaSQRT) / (2 * a);
		var _g2 = 0;
		var _g11 = [p0x + t0 * (p1x - p0x),p0y + t0 * (p1y - p0y),t0,p0x + t1 * (p1x - p0x),p0y + t1 * (p1y - p0y),t1];
		while(_g2 < _g11.length) {
			var f1 = _g11[_g2];
			++_g2;
			result.push(f1);
		}
	}
	return true;
};
hxDaedalus_data_math_Geom2D.tangentsPointToCircle = function(px,py,cx,cy,r,result) {
	var c2x = (px + cx) / 2;
	var c2y = (py + cy) / 2;
	var r2 = 0.5 * Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
	return hxDaedalus_data_math_Geom2D.intersections2Circles(c2x,c2y,r2,cx,cy,r,result);
};
hxDaedalus_data_math_Geom2D.tangentsCrossCircleToCircle = function(r,c1x,c1y,c2x,c2y,result) {
	var distance = Math.sqrt((c1x - c2x) * (c1x - c2x) + (c1y - c2y) * (c1y - c2y));
	var radius = distance / 4;
	var centerX = c1x + (c2x - c1x) / 4;
	var centerY = c1y + (c2y - c1y) / 4;
	if(hxDaedalus_data_math_Geom2D.intersections2Circles(c1x,c1y,r,centerX,centerY,radius,result)) {
		var t1x = result[0];
		var t1y = result[1];
		var t2x = result[2];
		var t2y = result[3];
		var midX = (c1x + c2x) / 2;
		var midY = (c1y + c2y) / 2;
		var dotProd = (t1x - midX) * (c2y - c1y) + (t1y - midY) * (-c2x + c1x);
		var tproj = dotProd / (distance * distance);
		var projx = midX + tproj * (c2y - c1y);
		var projy = midY - tproj * (c2x - c1x);
		var t4x = 2 * projx - t1x;
		var t4y = 2 * projy - t1y;
		var t3x = t4x + t2x - t1x;
		var t3y = t2y + t4y - t1y;
		var _g = 0;
		var _g1 = [t3x,t3y,t4x,t4y];
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			result.push(f);
		}
		return true;
	} else return false;
};
hxDaedalus_data_math_Geom2D.tangentsParalCircleToCircle = function(r,c1x,c1y,c2x,c2y,result) {
	var distance = Math.sqrt((c1x - c2x) * (c1x - c2x) + (c1y - c2y) * (c1y - c2y));
	var t1x = c1x + r * (c2y - c1y) / distance;
	var t1y = c1y + r * (-c2x + c1x) / distance;
	var t2x = 2 * c1x - t1x;
	var t2y = 2 * c1y - t1y;
	var t3x = t2x + c2x - c1x;
	var t3y = t2y + c2y - c1y;
	var t4x = t1x + c2x - c1x;
	var t4y = t1y + c2y - c1y;
	var _g = 0;
	var _g1 = [t1x,t1y,t2x,t2y,t3x,t3y,t4x,t4y];
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		result.push(f);
	}
};
hxDaedalus_data_math_Geom2D.distanceSquaredPointToLine = function(px,py,ax,ay,bx,by) {
	var a_b_squaredLength = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
	var dotProduct = (px - ax) * (bx - ax) + (py - ay) * (by - ay);
	var p_a_squaredLength = (ax - px) * (ax - px) + (ay - py) * (ay - py);
	return p_a_squaredLength - dotProduct * dotProduct / a_b_squaredLength;
};
hxDaedalus_data_math_Geom2D.distanceSquaredPointToSegment = function(px,py,ax,ay,bx,by) {
	var a_b_squaredLength = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
	var dotProduct = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / a_b_squaredLength;
	if(dotProduct < 0) return (px - ax) * (px - ax) + (py - ay) * (py - ay); else if(dotProduct <= 1) {
		var p_a_squaredLength = (ax - px) * (ax - px) + (ay - py) * (ay - py);
		return p_a_squaredLength - dotProduct * dotProduct * a_b_squaredLength;
	} else return (px - bx) * (px - bx) + (py - by) * (py - by);
};
hxDaedalus_data_math_Geom2D.distanceSquaredVertexToEdge = function(vertex,edge) {
	return hxDaedalus_data_math_Geom2D.distanceSquaredPointToSegment(vertex.get_pos().x,vertex.get_pos().y,edge.get_originVertex().get_pos().x,edge.get_originVertex().get_pos().y,edge.get_destinationVertex().get_pos().x,edge.get_destinationVertex().get_pos().y);
};
hxDaedalus_data_math_Geom2D.pathLength = function(path) {
	var sumDistance = 0.;
	var fromX = path[0];
	var fromY = path[1];
	var nextX;
	var nextY;
	var x;
	var y;
	var distance;
	var i = 2;
	while(i < path.length) {
		nextX = path[i];
		nextY = path[i + 1];
		x = nextX - fromX;
		y = nextY - fromY;
		distance = Math.sqrt(x * x + y * y);
		sumDistance += distance;
		fromX = nextX;
		fromY = nextY;
		i += 2;
	}
	return sumDistance;
};
var hxDaedalus_data_math_Matrix2D = function(a_,b_,c_,d_,e_,f_) {
	if(f_ == null) f_ = 0;
	if(e_ == null) e_ = 0;
	if(d_ == null) d_ = 1;
	if(c_ == null) c_ = 0;
	if(b_ == null) b_ = 0;
	if(a_ == null) a_ = 1;
	this.a = a_;
	this.b = b_;
	this.c = c_;
	this.d = d_;
	this.e = e_;
	this.f = f_;
};
hxDaedalus_data_math_Matrix2D.__name__ = true;
hxDaedalus_data_math_Matrix2D.prototype = {
	identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.e = 0;
		this.f = 0;
	}
	,translate: function(tx,ty) {
		this.e = this.e + tx;
		this.f = this.f + ty;
	}
	,scale: function(sx,sy) {
		this.a = this.a * sx;
		this.b = this.b * sy;
		this.c = this.c * sx;
		this.d = this.d * sy;
		this.e = this.e * sx;
		this.f = this.f * sy;
	}
	,rotate: function(rad) {
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
		var a_ = this.a * cos + this.b * -sin;
		var b_ = this.a * sin + this.b * cos;
		var c_ = this.c * cos + this.d * -sin;
		var d_ = this.c * sin + this.d * cos;
		var e_ = this.e * cos + this.f * -sin;
		var f_ = this.e * sin + this.f * cos;
		this.a = a_;
		this.b = b_;
		this.c = c_;
		this.d = d_;
		this.e = e_;
		this.f = f_;
	}
	,clone: function() {
		return new hxDaedalus_data_math_Matrix2D(this.a,this.b,this.c,this.d,this.e,this.f);
	}
	,tranform: function(point) {
		var x = this.a * point.x + this.c * point.y + this.e;
		var y = this.b * point.x + this.d * point.y + this.f;
		point.x = x;
		point.y = y;
	}
	,transformX: function(x,y) {
		return this.a * x + this.c * y + this.e;
	}
	,transformY: function(x,y) {
		return this.b * x + this.d * y + this.f;
	}
	,concat: function(matrix) {
		var a_ = this.a * matrix.a + this.b * matrix.c;
		var b_ = this.a * matrix.b + this.b * matrix.d;
		var c_ = this.c * matrix.a + this.d * matrix.c;
		var d_ = this.c * matrix.b + this.d * matrix.d;
		var e_ = this.e * matrix.a + this.f * matrix.c + matrix.e;
		var f_ = this.e * matrix.b + this.f * matrix.d + matrix.f;
		this.a = a_;
		this.b = b_;
		this.c = c_;
		this.d = d_;
		this.e = e_;
		this.f = f_;
	}
};
var hxDaedalus_data_math_RandGenerator = function(seed,rangeMin_,rangeMax_) {
	if(rangeMax_ == null) rangeMax_ = 1;
	if(rangeMin_ == null) rangeMin_ = 0;
	if(seed == null) seed = 1234;
	this._originalSeed = this._currSeed = seed;
	this.rangeMin = rangeMin_;
	this.rangeMax = rangeMax_;
	this._numIter = 0;
};
hxDaedalus_data_math_RandGenerator.__name__ = true;
hxDaedalus_data_math_RandGenerator.prototype = {
	set_seed: function(value) {
		this._originalSeed = this._currSeed = value;
		return value;
	}
	,get_seed: function() {
		return this._originalSeed;
	}
	,reset: function() {
		this._currSeed = this._originalSeed;
		this._numIter = 0;
	}
	,next: function() {
		var _floatSeed = this._currSeed * 1.0;
		this._tempString = Std.string(_floatSeed * _floatSeed);
		while(this._tempString.length < 8) this._tempString = "0" + this._tempString;
		this._currSeed = Std.parseInt(HxOverrides.substr(this._tempString,1,5));
		var res = Math.round(this.rangeMin + this._currSeed / 99999 * (this.rangeMax - this.rangeMin));
		if(this._currSeed == 0) this._currSeed = this._originalSeed + this._numIter;
		this._numIter++;
		if(this._numIter == 200) this.reset();
		return res;
	}
	,nextInRange: function(rangeMin,rangeMax) {
		this.rangeMin = rangeMin;
		this.rangeMax = rangeMax;
		return this.next();
	}
	,shuffle: function(array) {
		var currIdx = array.length;
		while(currIdx > 0) {
			var rndIdx = this.nextInRange(0,currIdx - 1);
			currIdx--;
			var tmp = array[currIdx];
			array[currIdx] = array[rndIdx];
			array[rndIdx] = tmp;
		}
	}
};
var hxDaedalus_debug_Debug = function() { };
hxDaedalus_debug_Debug.__name__ = true;
hxDaedalus_debug_Debug.assertTrue = function(cond,message,pos) {
	if(!cond) throw new js__$Boot_HaxeError(pos.fileName + ":" + pos.lineNumber + ": Expected true but was false! " + (message != null?message:""));
};
hxDaedalus_debug_Debug.assertFalse = function(cond,message,pos) {
	if(cond) throw new js__$Boot_HaxeError(pos.fileName + ":" + pos.lineNumber + ": Expected false but was true! " + (message != null?message:""));
};
hxDaedalus_debug_Debug.assertEquals = function(expected,actual,message,pos) {
	if(actual != expected) throw new js__$Boot_HaxeError(pos.fileName + ":" + pos.lineNumber + ": Expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "' " + (message != null?message:""));
};
hxDaedalus_debug_Debug.trace = function(value,pos) {
	haxe_Log.trace(value,pos);
};
var hxDaedalus_factories_RectMesh = function() {
};
hxDaedalus_factories_RectMesh.__name__ = true;
hxDaedalus_factories_RectMesh.buildRectangle = function(width,height) {
	var vTL = new hxDaedalus_data_Vertex();
	var vTR = new hxDaedalus_data_Vertex();
	var vBR = new hxDaedalus_data_Vertex();
	var vBL = new hxDaedalus_data_Vertex();
	var eTL_TR = new hxDaedalus_data_Edge();
	var eTR_TL = new hxDaedalus_data_Edge();
	var eTR_BR = new hxDaedalus_data_Edge();
	var eBR_TR = new hxDaedalus_data_Edge();
	var eBR_BL = new hxDaedalus_data_Edge();
	var eBL_BR = new hxDaedalus_data_Edge();
	var eBL_TL = new hxDaedalus_data_Edge();
	var eTL_BL = new hxDaedalus_data_Edge();
	var eTR_BL = new hxDaedalus_data_Edge();
	var eBL_TR = new hxDaedalus_data_Edge();
	var eTL_BR = new hxDaedalus_data_Edge();
	var eBR_TL = new hxDaedalus_data_Edge();
	var fTL_BL_TR = new hxDaedalus_data_Face();
	var fTR_BL_BR = new hxDaedalus_data_Face();
	var fTL_BR_BL = new hxDaedalus_data_Face();
	var fTL_TR_BR = new hxDaedalus_data_Face();
	var boundShape = new hxDaedalus_data_ConstraintShape();
	var segTop = new hxDaedalus_data_ConstraintSegment();
	var segRight = new hxDaedalus_data_ConstraintSegment();
	var segBot = new hxDaedalus_data_ConstraintSegment();
	var segLeft = new hxDaedalus_data_ConstraintSegment();
	var mesh = new hxDaedalus_data_Mesh(width,height);
	var offset = 10.;
	vTL.get_pos().setXY(0 - offset,0 - offset);
	vTR.get_pos().setXY(width + offset,0 - offset);
	vBR.get_pos().setXY(width + offset,height + offset);
	vBL.get_pos().setXY(0 - offset,height + offset);
	vTL.setDatas(eTL_TR);
	vTR.setDatas(eTR_BR);
	vBR.setDatas(eBR_BL);
	vBL.setDatas(eBL_TL);
	eTL_TR.setDatas(vTL,eTR_TL,eTR_BR,fTL_TR_BR,true,true);
	eTR_TL.setDatas(vTR,eTL_TR,eTL_BL,fTL_BL_TR,true,true);
	eTR_BR.setDatas(vTR,eBR_TR,eBR_TL,fTL_TR_BR,true,true);
	eBR_TR.setDatas(vBR,eTR_BR,eTR_BL,fTR_BL_BR,true,true);
	eBR_BL.setDatas(vBR,eBL_BR,eBL_TL,fTL_BR_BL,true,true);
	eBL_BR.setDatas(vBL,eBR_BL,eBR_TR,fTR_BL_BR,true,true);
	eBL_TL.setDatas(vBL,eTL_BL,eTL_BR,fTL_BR_BL,true,true);
	eTL_BL.setDatas(vTL,eBL_TL,eBL_TR,fTL_BL_TR,true,true);
	eTR_BL.setDatas(vTR,eBL_TR,eBL_BR,fTR_BL_BR,true,false);
	eBL_TR.setDatas(vBL,eTR_BL,eTR_TL,fTL_BL_TR,true,false);
	eTL_BR.setDatas(vTL,eBR_TL,eBR_BL,fTL_BR_BL,false,false);
	eBR_TL.setDatas(vBR,eTL_BR,eTL_TR,fTL_TR_BR,false,false);
	fTL_BL_TR.setDatas(eBL_TR);
	fTR_BL_BR.setDatas(eTR_BL);
	fTL_BR_BL.setDatas(eBR_BL,false);
	fTL_TR_BR.setDatas(eTR_BR,false);
	vTL.set_fromConstraintSegments([segTop,segLeft]);
	vTR.set_fromConstraintSegments([segTop,segRight]);
	vBR.set_fromConstraintSegments([segRight,segBot]);
	vBL.set_fromConstraintSegments([segBot,segLeft]);
	eTL_TR.fromConstraintSegments.push(segTop);
	eTR_TL.fromConstraintSegments.push(segTop);
	eTR_BR.fromConstraintSegments.push(segRight);
	eBR_TR.fromConstraintSegments.push(segRight);
	eBR_BL.fromConstraintSegments.push(segBot);
	eBL_BR.fromConstraintSegments.push(segBot);
	eBL_TL.fromConstraintSegments.push(segLeft);
	eTL_BL.fromConstraintSegments.push(segLeft);
	segTop.get_edges().push(eTL_TR);
	segRight.get_edges().push(eTR_BR);
	segBot.get_edges().push(eBR_BL);
	segLeft.get_edges().push(eBL_TL);
	segTop.fromShape = boundShape;
	segRight.fromShape = boundShape;
	segBot.fromShape = boundShape;
	segLeft.fromShape = boundShape;
	var _g = 0;
	var _g1 = [segTop,segRight,segBot,segLeft];
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		boundShape.segments.push(f);
	}
	var _g2 = 0;
	var _g11 = [vTL,vTR,vBR,vBL];
	while(_g2 < _g11.length) {
		var f1 = _g11[_g2];
		++_g2;
		mesh._vertices.push(f1);
	}
	var _g3 = 0;
	var _g12 = [eTL_TR,eTR_TL,eTR_BR,eBR_TR,eBR_BL,eBL_BR,eBL_TL,eTL_BL,eTR_BL,eBL_TR,eTL_BR,eBR_TL];
	while(_g3 < _g12.length) {
		var f2 = _g12[_g3];
		++_g3;
		mesh._edges.push(f2);
	}
	var _g4 = 0;
	var _g13 = [fTL_BL_TR,fTR_BL_BR,fTL_BR_BL,fTL_TR_BR];
	while(_g4 < _g13.length) {
		var f3 = _g13[_g4];
		++_g4;
		mesh._faces.push(f3);
	}
	mesh.get___constraintShapes().push(boundShape);
	var securityRect = [];
	var _g5 = 0;
	var _g14 = [0,0,width,0];
	while(_g5 < _g14.length) {
		var f4 = _g14[_g5];
		++_g5;
		securityRect.push(f4);
	}
	var _g6 = 0;
	var _g15 = [width,0,width,height];
	while(_g6 < _g15.length) {
		var f5 = _g15[_g6];
		++_g6;
		securityRect.push(f5);
	}
	var _g7 = 0;
	var _g16 = [width,height,0,height];
	while(_g7 < _g16.length) {
		var f6 = _g16[_g7];
		++_g7;
		securityRect.push(f6);
	}
	var _g8 = 0;
	var _g17 = [0,height,0,0];
	while(_g8 < _g17.length) {
		var f7 = _g17[_g8];
		++_g8;
		securityRect.push(f7);
	}
	mesh.set_clipping(false);
	mesh.insertConstraintShape(securityRect);
	mesh.set_clipping(true);
	return mesh;
};
var hxDaedalus_iterators_FromFaceToInnerEdges = function() {
};
hxDaedalus_iterators_FromFaceToInnerEdges.__name__ = true;
hxDaedalus_iterators_FromFaceToInnerEdges.prototype = {
	set_fromFace: function(value) {
		this._fromFace = value;
		this._nextEdge = this._fromFace.get_edge();
		return value;
	}
	,next: function() {
		if(this._nextEdge != null) {
			this._resultEdge = this._nextEdge;
			this._nextEdge = this._nextEdge.get_nextLeftEdge();
			if(this._nextEdge == this._fromFace.get_edge()) this._nextEdge = null;
		} else this._resultEdge = null;
		return this._resultEdge;
	}
};
var hxDaedalus_iterators_FromMeshToVertices = function() {
};
hxDaedalus_iterators_FromMeshToVertices.__name__ = true;
hxDaedalus_iterators_FromMeshToVertices.prototype = {
	set_fromMesh: function(value) {
		this._fromMesh = value;
		this._currIndex = 0;
		return value;
	}
	,next: function() {
		do if(this._currIndex < this._fromMesh._vertices.length) {
			this._resultVertex = this._fromMesh._vertices[this._currIndex];
			this._currIndex++;
		} else {
			this._resultVertex = null;
			break;
		} while(!this._resultVertex.get_isReal());
		return this._resultVertex;
	}
};
var hxDaedalus_iterators_FromVertexToHoldingFaces = function() {
};
hxDaedalus_iterators_FromVertexToHoldingFaces.__name__ = true;
hxDaedalus_iterators_FromVertexToHoldingFaces.prototype = {
	set_fromVertex: function(value) {
		this._fromVertex = value;
		this._nextEdge = this._fromVertex.get_edge();
		return value;
	}
	,next: function() {
		if(this._nextEdge != null) do {
			this._resultFace = this._nextEdge.get_leftFace();
			this._nextEdge = this._nextEdge.get_rotLeftEdge();
			if(this._nextEdge == this._fromVertex.get_edge()) {
				this._nextEdge = null;
				if(!this._resultFace.get_isReal()) this._resultFace = null;
				break;
			}
		} while(!this._resultFace.get_isReal()); else this._resultFace = null;
		return this._resultFace;
	}
};
var hxDaedalus_iterators_FromVertexToIncomingEdges = function() {
};
hxDaedalus_iterators_FromVertexToIncomingEdges.__name__ = true;
hxDaedalus_iterators_FromVertexToIncomingEdges.prototype = {
	set_fromVertex: function(value) {
		this._fromVertex = value;
		this._nextEdge = this._fromVertex.get_edge();
		while(!this._nextEdge.get_isReal()) this._nextEdge = this._nextEdge.get_rotLeftEdge();
		return value;
	}
	,next: function() {
		if(this._nextEdge != null) {
			this._resultEdge = this._nextEdge.get_oppositeEdge();
			do {
				this._nextEdge = this._nextEdge.get_rotLeftEdge();
				if(this._nextEdge == this._fromVertex.get_edge()) {
					this._nextEdge = null;
					break;
				}
			} while(!this._nextEdge.get_isReal());
		} else this._resultEdge = null;
		return this._resultEdge;
	}
};
var hxDaedalus_iterators_FromVertexToOutgoingEdges = function() {
	this.realEdgesOnly = true;
};
hxDaedalus_iterators_FromVertexToOutgoingEdges.__name__ = true;
hxDaedalus_iterators_FromVertexToOutgoingEdges.prototype = {
	set_fromVertex: function(value) {
		this._fromVertex = value;
		this._nextEdge = this._fromVertex.get_edge();
		while(this.realEdgesOnly && !this._nextEdge.get_isReal()) this._nextEdge = this._nextEdge.get_rotLeftEdge();
		return value;
	}
	,next: function() {
		if(this._nextEdge != null) {
			this._resultEdge = this._nextEdge;
			do {
				this._nextEdge = this._nextEdge.get_rotLeftEdge();
				if(this._nextEdge == this._fromVertex.get_edge()) {
					this._nextEdge = null;
					break;
				}
			} while(this.realEdgesOnly && !this._nextEdge.get_isReal());
		} else this._resultEdge = null;
		return this._resultEdge;
	}
};
var hxDaedalus_view_SimpleView = function(targetCanvas) {
	this.entitiesAlpha = .75;
	this.entitiesWidth = 1;
	this.entitiesColor = 65280;
	this.pathsAlpha = .75;
	this.pathsWidth = 1.5;
	this.pathsColor = 16760848;
	this.verticesAlpha = .25;
	this.verticesRadius = .5;
	this.verticesColor = 255;
	this.constraintsAlpha = 1.0;
	this.constraintsWidth = 2;
	this.constraintsColor = 16711680;
	this.edgesAlpha = .25;
	this.edgesWidth = 1;
	this.edgesColor = 10066329;
	this.graphics = new wings_jsCanvas_SimpleDrawingContext(targetCanvas);
};
hxDaedalus_view_SimpleView.__name__ = true;
hxDaedalus_view_SimpleView.prototype = {
	drawVertex: function(vertex) {
		this.graphics.graphics.lineStyle(this.verticesRadius,this.verticesColor,this.verticesAlpha);
		this.graphics.graphics.beginFill(this.verticesColor,this.verticesAlpha);
		this.graphics.drawCircle(vertex.get_pos().x,vertex.get_pos().y,this.verticesRadius);
		this.graphics.graphics.endFill();
	}
	,drawEdge: function(edge) {
		if(edge.get_isConstrained()) {
			this.graphics.graphics.lineStyle(this.constraintsWidth,this.constraintsColor,this.constraintsAlpha);
			this.graphics.moveTo(edge.get_originVertex().get_pos().x,edge.get_originVertex().get_pos().y);
			this.graphics.lineTo(edge.get_destinationVertex().get_pos().x,edge.get_destinationVertex().get_pos().y);
		} else {
			this.graphics.graphics.lineStyle(this.edgesWidth,this.edgesColor,this.edgesAlpha);
			this.graphics.moveTo(edge.get_originVertex().get_pos().x,edge.get_originVertex().get_pos().y);
			this.graphics.lineTo(edge.get_destinationVertex().get_pos().x,edge.get_destinationVertex().get_pos().y);
		}
	}
	,drawMesh: function(mesh,cleanBefore) {
		if(cleanBefore == null) cleanBefore = false;
		if(cleanBefore) this.graphics.graphics.clear();
		mesh.traverse($bind(this,this.drawVertex),$bind(this,this.drawEdge));
	}
	,drawEntity: function(entity,cleanBefore) {
		if(cleanBefore == null) cleanBefore = false;
		if(cleanBefore) this.graphics.graphics.clear();
		this.graphics.graphics.lineStyle(this.entitiesWidth,this.entitiesColor,this.entitiesAlpha);
		this.graphics.graphics.beginFill(this.entitiesColor,this.entitiesAlpha);
		this.graphics.drawCircle(entity.x,entity.y,entity.get_radius());
		this.graphics.graphics.endFill();
	}
	,drawEntities: function(vEntities,cleanBefore) {
		if(cleanBefore == null) cleanBefore = false;
		if(cleanBefore) this.graphics.graphics.clear();
		var _g1 = 0;
		var _g = vEntities.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.drawEntity(vEntities[i],false);
		}
	}
	,drawPath: function(path,cleanBefore) {
		if(cleanBefore == null) cleanBefore = false;
		if(cleanBefore) this.graphics.graphics.clear();
		if(path.length == 0) return;
		this.graphics.graphics.lineStyle(this.pathsWidth,this.pathsColor,this.pathsAlpha);
		this.graphics.graphics.moveTo(path[0],path[1]);
		var i = 2;
		while(i < path.length) {
			this.graphics.graphics.lineTo(path[i],path[i + 1]);
			this.graphics.graphics.moveTo(path[i],path[i + 1]);
			i += 2;
		}
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var wings_core_ISimpleDrawingContext = function() { };
wings_core_ISimpleDrawingContext.__name__ = true;
var wings_jsCanvas_BasicCanvas = function() {
	var _this = window.document;
	this.canvas = _this.createElement("canvas");
	this.dom = this.canvas;
	this.body = window.document.body;
	this.surface = this.canvas.getContext("2d",null);
	this.style = this.dom.style;
	this.header = new wings_jsCanvas_CanvasHeader();
	this.canvas.width = this.header.width;
	this.canvas.height = this.header.height;
	this.style.paddingLeft = "0px";
	this.style.paddingTop = "0px";
	this.style.left = Std.string(0 + "px");
	this.style.top = Std.string(0 + "px");
	this.style.position = "absolute";
	this.style.backgroundColor = this.header.bgColor;
	this.surface.fillStyle = this.header.bgColor;
	this.image = this.dom;
	var s;
	var _this1 = window.document;
	s = _this1.createElement("style");
	s.innerHTML = "@keyframes spin { from { transform:rotate( 0deg ); } to { transform:rotate( 360deg ); } }";
	window.document.getElementsByTagName("head")[0].appendChild(s);
	s.animation = "spin 1s linear infinite";
	this.loop(this.header.frameRate);
	var body = window.document.body;
	body.appendChild(this.dom);
};
wings_jsCanvas_BasicCanvas.__name__ = true;
wings_jsCanvas_BasicCanvas.prototype = {
	loop: function(tim) {
		window.requestAnimationFrame($bind(this,this.loop));
		if(this.onEnterFrame != null) this.onEnterFrame();
		return true;
	}
	,clear: function() {
		this.surface.clearRect(0,0,this.header.width,this.header.height);
	}
	,drawCircle: function(x,y,radius) {
		this.surface.beginPath();
		this.surface.arc(x,y,radius,0,2 * Math.PI,false);
		this.surface.stroke();
		this.surface.closePath();
	}
	,drawRect: function(x,y,width,height) {
		this.surface.beginPath();
		this.surface.moveTo(x,y);
		this.surface.lineTo(x + width,y);
		this.surface.lineTo(x + width,y + height);
		this.surface.lineTo(x,y + height);
		this.surface.stroke();
		this.surface.closePath();
	}
	,drawTri: function(points) {
		this.surface.beginPath();
		var i = 0;
		while(i < points.length) {
			if(i == 0) this.surface.moveTo(points[i],points[i + 1]); else this.surface.lineTo(points[i],points[i + 1]);
			i += 2;
		}
		this.surface.stroke();
		this.surface.closePath();
	}
	,lineStyle: function(wid,col,alpha) {
		this.surface.lineWidth = wid;
		if(alpha != null && alpha != 1.0) {
			var r = col >> 16 & 255;
			var g = col >> 8 & 255;
			var b = col & 255;
			this.surface.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
		} else this.surface.strokeStyle = "#" + StringTools.hex(col,6);
	}
	,moveTo: function(x,y) {
		this.surface.beginPath();
		this.surface.moveTo(x,y);
	}
	,lineTo: function(x,y) {
		this.surface.lineTo(x,y);
		this.surface.closePath();
		this.surface.stroke();
	}
	,quadTo: function(cx,cy,ax,ay) {
		this.surface.quadraticCurveTo(cx,cy,ax,ay);
		this.surface.stroke();
	}
	,beginFill: function(col,alpha) {
		if(alpha != null && alpha != 1.0) {
			var r = col >> 16 & 255;
			var g = col >> 8 & 255;
			var b = col & 255;
			this.surface.fillStyle = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
		} else this.surface.fillStyle = "#" + StringTools.hex(col,6);
		this.surface.beginPath();
	}
	,endFill: function() {
		this.surface.stroke();
		this.surface.closePath();
		this.surface.fill();
	}
};
var wings_jsCanvas_CanvasHeader = function() {
	var canvasHeader = "600:400:60:FFFFFF".split(":");
	this.width = Std.parseInt(canvasHeader[0]);
	this.height = Std.parseInt(canvasHeader[1]);
	this.frameRate = Std.parseInt(canvasHeader[2]);
	this.bgColor = "#" + canvasHeader[3];
};
wings_jsCanvas_CanvasHeader.__name__ = true;
wings_jsCanvas_CanvasHeader.prototype = {
	parseInt: function(e) {
		return Std.parseInt(e);
	}
	,toHashColor: function(e) {
		return "#" + e;
	}
};
var wings_jsCanvas_SimpleDrawingContext = function(graphics) {
	this.graphics = graphics;
};
wings_jsCanvas_SimpleDrawingContext.__name__ = true;
wings_jsCanvas_SimpleDrawingContext.__interfaces__ = [wings_core_ISimpleDrawingContext];
wings_jsCanvas_SimpleDrawingContext.prototype = {
	clear: function() {
		this.graphics.clear();
	}
	,lineStyle: function(thickness,color,alpha) {
		if(alpha == null) alpha = 1;
		this.graphics.lineStyle(thickness,color,alpha);
	}
	,beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		this.graphics.beginFill(color,alpha);
	}
	,endFill: function() {
		this.graphics.endFill();
	}
	,moveTo: function(x,y) {
		this.graphics.moveTo(x,y);
	}
	,lineTo: function(x,y) {
		this.graphics.lineTo(x,y);
	}
	,quadTo: function(cx,cy,ax,ay) {
		this.graphics.quadTo(cx,cy,ax,ay);
	}
	,drawCircle: function(cx,cy,radius) {
		this.graphics.drawCircle(cx,cy,radius);
	}
	,drawRect: function(x,y,width,height) {
		this.graphics.drawRect(x,y,width,height);
	}
	,drawEquilaterialTri: function(x,y,radius,direction) {
		var third = Math.PI * 2 / 3;
		var points = [];
		var x1;
		var y1;
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			x1 = x + radius * Math.cos(direction + i * third);
			y1 = y + radius * Math.sin(direction + i * third);
			points.push(x1);
			points.push(y1);
		}
		this.graphics.drawTri(points);
	}
	,drawTri: function(points) {
		this.graphics.drawTri(points);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
haxe_ds_ObjectMap.count = 0;
hxDaedalus_ai_EntityAI.NUM_SEGMENTS = 6;
hxDaedalus_data_Constants.EPSILON = 0.01;
hxDaedalus_data_Constants.EPSILON_SQUARED = 0.0001;
hxDaedalus_data_ConstraintSegment.INC = 0;
hxDaedalus_data_ConstraintShape.INC = 0;
hxDaedalus_data_Edge.INC = 0;
hxDaedalus_data_Face.INC = 0;
hxDaedalus_data_Mesh.INC = 0;
hxDaedalus_data_Object.INC = 0;
hxDaedalus_data_Vertex.INC = 0;
hxDaedalus_data_math_Geom2D.__samples = [];
hxDaedalus_data_math_Geom2D.__circumcenter = new hxDaedalus_data_math_Point2D();
wings_jsCanvas_CanvasHeader.__meta__ = { fields : { parseInt : { 'static' : null}, toHashColor : { 'static' : null}}};
Basics01.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=daedalusBasic.js.map