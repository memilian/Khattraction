(function ($hx_exports) { "use strict";
$hx_exports.kha = $hx_exports.kha || {};
$hx_exports.kha.input = $hx_exports.kha.input || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
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
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var starter = new kha.Starter();
	starter.start(new khattraction.KhattractionGame());
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var engine = {};
engine.input = {};
engine.input.Dispatcher = function() {
	this.buttonRightState = false;
	this.buttonLeftState = false;
	this.prevMouseY = 0;
	this.prevMouseX = 0;
	this.keyboard = kha.input.Keyboard.get(0);
	this.mouse = kha.input.Mouse.get(0);
	this.keyboard.notify($bind(this,this.onKeyDown),$bind(this,this.onKeyUp));
	this.pressListeners = new Array();
	this.downListeners = new Array();
	this.upListeners = new Array();
	this.keyStates = new haxe.ds.EnumValueMap();
	this.keyCharStates = new haxe.ds.StringMap();
	this.mouse.notify($bind(this,this.onMouseDown),$bind(this,this.onMouseUp),$bind(this,this.onMouseMove),$bind(this,this.onMouseWheel));
	this.mouseDownListeners = new Array();
	this.mouseUpListeners = new Array();
	this.mouseDragListeners = new Array();
	this.mouseMoveListeners = new Array();
	this.mouseWheelListeners = new Array();
};
$hxClasses["engine.input.Dispatcher"] = engine.input.Dispatcher;
engine.input.Dispatcher.__name__ = ["engine","input","Dispatcher"];
engine.input.Dispatcher.get = function() {
	if(engine.input.Dispatcher.instance == null) engine.input.Dispatcher.instance = new engine.input.Dispatcher();
	return engine.input.Dispatcher.instance;
};
engine.input.Dispatcher.prototype = {
	update: function() {
		var $it0 = this.keyStates.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			if(this.keyStates.get(key)) this.onKeyPress(key,key[0]);
		}
		var $it1 = this.keyCharStates.keys();
		while( $it1.hasNext() ) {
			var $char = $it1.next();
			if(this.keyCharStates.get($char)) this.onKeyPress(kha.Key.CHAR,$char);
		}
	}
	,mouseNotify: function(downListener,upListener,dragListener,moveListener,wheelListener) {
		if(downListener != null) this.mouseDownListeners.push(downListener);
		if(upListener != null) this.mouseUpListeners.push(upListener);
		if(dragListener != null) this.mouseDragListeners.push(dragListener);
		if(moveListener != null) this.mouseMoveListeners.push(moveListener);
		if(wheelListener != null) this.mouseWheelListeners.push(wheelListener);
	}
	,notify: function(downListener,upListener,pressListener) {
		if(downListener != null) this.downListeners.push(downListener);
		if(upListener != null) this.upListeners.push(upListener);
		if(pressListener != null) this.pressListeners.push(pressListener);
	}
	,remove: function(downListener,upListener,pressListener) {
		if(downListener != null) HxOverrides.remove(this.downListeners,downListener);
		if(upListener != null) HxOverrides.remove(this.upListeners,upListener);
		if(pressListener != null) HxOverrides.remove(this.pressListeners,pressListener);
	}
	,onKeyPress: function(key,$char) {
		var _g = 0;
		var _g1 = this.pressListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(key,$char);
		}
	}
	,onKeyDown: function(key,$char) {
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(key,$char);
		}
		switch(key[1]) {
		case 6:
			this.keyCharStates.set($char,true);
			break;
		default:
			this.keyStates.set(key,true);
		}
	}
	,onKeyUp: function(key,$char) {
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(key,$char);
		}
		switch(key[1]) {
		case 6:
			this.keyCharStates.set($char,false);
			break;
		default:
			this.keyStates.set(key,false);
		}
	}
	,onMouseUp: function(button,x,y) {
		var _g = 0;
		var _g1 = this.mouseUpListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,x,y);
		}
		if(button == engine.input.Dispatcher.BUTTON_RIGHT) this.buttonRightState = false; else this.buttonLeftState = false;
	}
	,onMouseDown: function(button,x,y) {
		var _g = 0;
		var _g1 = this.mouseDownListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,x,y);
		}
		if(button == engine.input.Dispatcher.BUTTON_RIGHT) this.buttonRightState = true; else this.buttonLeftState = true;
	}
	,onMouseMove: function(x,y) {
		var _g = 0;
		var _g1 = this.mouseMoveListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(x,y);
		}
		if(this.buttonLeftState) {
			var _g2 = 0;
			var _g11 = this.mouseDragListeners;
			while(_g2 < _g11.length) {
				var listener1 = _g11[_g2];
				++_g2;
				listener1(engine.input.Dispatcher.BUTTON_LEFT,x - this.prevMouseX,y - this.prevMouseY);
			}
		}
		if(this.buttonRightState) {
			var _g3 = 0;
			var _g12 = this.mouseDragListeners;
			while(_g3 < _g12.length) {
				var listener2 = _g12[_g3];
				++_g3;
				listener2(engine.input.Dispatcher.BUTTON_RIGHT,x - this.prevMouseX,y - this.prevMouseY);
			}
		}
		this.prevMouseX = x;
		this.prevMouseY = y;
	}
	,onMouseWheel: function(dw) {
		var _g = 0;
		var _g1 = this.mouseWheelListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(dw);
		}
	}
	,__class__: engine.input.Dispatcher
};
engine.physic = {};
engine.physic.AABB = function(position,size) {
	this.position = position;
	this.size = size;
};
$hxClasses["engine.physic.AABB"] = engine.physic.AABB;
engine.physic.AABB.__name__ = ["engine","physic","AABB"];
engine.physic.AABB.AabbFromEntity = function(ent) {
	return new engine.physic.AABB(ent.position,ent.size);
};
engine.physic.AABB.prototype = {
	update: function(pos,size) {
		this.position = pos;
		this.size = size;
	}
	,expand: function(amount) {
		return new engine.physic.AABB(new kha.math.Vector3(this.position.x - amount / 2,this.position.y - amount / 2,0),new kha.math.Vector3(this.size.x + amount / 2,this.size.y + amount / 2));
	}
	,getCenter: function() {
		return new kha.math.Vector3(this.position.x + this.size.x / 2,this.position.y + this.size.y / 2,this.position.z + this.size.z / 2);
	}
	,collide: function(other) {
		return !(this.position.x > other.position.x + other.size.x || this.position.x + this.size.x < other.position.x || this.position.y > other.position.y + other.size.y || this.position.y + this.size.y < other.position.y || this.position.z > other.position.z + other.size.z || this.position.z + this.size.z < other.position.z);
	}
	,contains: function(point) {
		return !(this.position.x > point.x || this.position.x + this.size.x < point.x || this.position.y > point.y || this.position.y + this.size.y < point.y || this.position.z > point.z || this.position.z + this.size.z < point.z);
	}
	,__class__: engine.physic.AABB
};
engine.ui = {};
engine.ui.UIElement = function(parent,pos,size) {
	this.parent = parent;
	this.position = pos;
	this.size = size;
	this.bgColor = kha._Color.Color_Impl_.White;
	this.bounds = new engine.physic.AABB(this.get_realPosition(),size);
};
$hxClasses["engine.ui.UIElement"] = engine.ui.UIElement;
engine.ui.UIElement.__name__ = ["engine","ui","UIElement"];
engine.ui.UIElement.prototype = {
	update: function() {
	}
	,render: function(g) {
		g.set_color(this.bgColor);
	}
	,setPosition: function(x,y,z) {
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
		return this;
	}
	,setSize: function(w,h) {
		this.size.x = w;
		this.size.y = h;
		return this;
	}
	,get_realPosition: function() {
		if(this.parent == null) return this.position;
		return this.parent.get_realPosition().add(this.position);
	}
	,__class__: engine.ui.UIElement
	,__properties__: {get_realPosition:"get_realPosition"}
};
engine.ui.IDisplayText = function() { };
$hxClasses["engine.ui.IDisplayText"] = engine.ui.IDisplayText;
engine.ui.IDisplayText.__name__ = ["engine","ui","IDisplayText"];
engine.ui.IDisplayText.prototype = {
	__class__: engine.ui.IDisplayText
};
engine.ui.IClickable = function() { };
$hxClasses["engine.ui.IClickable"] = engine.ui.IClickable;
engine.ui.IClickable.__name__ = ["engine","ui","IClickable"];
engine.ui.IClickable.prototype = {
	__class__: engine.ui.IClickable
};
engine.ui.IHoverable = function() { };
$hxClasses["engine.ui.IHoverable"] = engine.ui.IHoverable;
engine.ui.IHoverable.__name__ = ["engine","ui","IHoverable"];
engine.ui.IHoverable.prototype = {
	__class__: engine.ui.IHoverable
};
engine.ui.Button = function(parent,pos,size,text) {
	this.active = false;
	engine.ui.UIElement.call(this,parent,pos,size);
	if(text == null) this.text = "Click me !"; else this.text = text;
	engine.input.Dispatcher.get().mouseNotify($bind(this,this.onMouseDown),$bind(this,this.onMouseUp),null,$bind(this,this.onMouseMoved),null);
	this.font = kha.Loader.the.loadFont("Roboto",new kha.FontStyle(false,false,false),18);
	this.onClick = function(mouseDown) {
	};
};
$hxClasses["engine.ui.Button"] = engine.ui.Button;
engine.ui.Button.__name__ = ["engine","ui","Button"];
engine.ui.Button.__interfaces__ = [engine.ui.IDisplayText,engine.ui.IClickable,engine.ui.IHoverable];
engine.ui.Button.create = function(parent) {
	return new engine.ui.Button(parent,new kha.math.Vector3(0,0,0),new kha.math.Vector3(0,0,0));
};
engine.ui.Button.__super__ = engine.ui.UIElement;
engine.ui.Button.prototype = $extend(engine.ui.UIElement.prototype,{
	setOnClick: function(onclick) {
		this.onClick = onclick;
		return this;
	}
	,setPosition: function(x,y,z) {
		engine.ui.UIElement.prototype.setPosition.call(this,x,y,z);
		return this;
	}
	,setSize: function(w,h) {
		engine.ui.UIElement.prototype.setSize.call(this,w,h);
		return this;
	}
	,setText: function(text) {
		this.text = text;
		return this;
	}
	,onMouseMoved: function(x,y) {
		this.hover = this.bounds.contains(new kha.math.Vector3(x,y,0));
	}
	,onMouseDown: function(button,x,y) {
		if(this.bounds.contains(new kha.math.Vector3(x,y,0))) {
			this.active = true;
			this.onClick(true);
		}
	}
	,onMouseUp: function(button,x,y) {
		this.active = false;
		if(this.bounds.contains(new kha.math.Vector3(x,y,0))) this.onClick(false);
	}
	,update: function() {
		this.bounds.update(this.get_realPosition(),this.size);
	}
	,render: function(g) {
		engine.ui.UIElement.prototype.render.call(this,g);
		g.set_font(this.font);
		g.set_color(this.active?kha._Color.Color_Impl_.Red:this.hover?kha._Color.Color_Impl_.Blue:kha._Color.Color_Impl_.Green);
		g.fillRect(this.get_realPosition().x,this.get_realPosition().y,this.size.x,this.size.y);
		g.set_color(kha._Color.Color_Impl_.Black);
		var textW = this.font.stringWidth(this.text);
		var tX = this.bounds.getCenter().x - textW / 2;
		var tY = this.bounds.getCenter().y - this.font.getHeight() / 2;
		g.drawString(this.text,tX,tY);
	}
	,__class__: engine.ui.Button
});
engine.ui.IPlaceable = function() { };
$hxClasses["engine.ui.IPlaceable"] = engine.ui.IPlaceable;
engine.ui.IPlaceable.__name__ = ["engine","ui","IPlaceable"];
engine.ui.IPlaceable.prototype = {
	__class__: engine.ui.IPlaceable
};
engine.ui.IResizable = function() { };
$hxClasses["engine.ui.IResizable"] = engine.ui.IResizable;
engine.ui.IResizable.__name__ = ["engine","ui","IResizable"];
engine.ui.IResizable.prototype = {
	__class__: engine.ui.IResizable
};
engine.ui.Menu = function(parent,pos,size) {
	engine.ui.UIElement.call(this,parent,pos,size);
	this.children = new Array();
	this.bgColor = kha._Color.Color_Impl_.fromBytes(96,96,96,128);
	engine.input.Dispatcher.get().mouseNotify(null,null,null,$bind(this,this.onMouseMoved),null);
};
$hxClasses["engine.ui.Menu"] = engine.ui.Menu;
engine.ui.Menu.__name__ = ["engine","ui","Menu"];
engine.ui.Menu.__interfaces__ = [engine.ui.IHoverable];
engine.ui.Menu.__super__ = engine.ui.UIElement;
engine.ui.Menu.prototype = $extend(engine.ui.UIElement.prototype,{
	update: function() {
		this.bounds.update(this.position,this.size);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var elm = _g1[_g];
			++_g;
			elm.update();
		}
	}
	,render: function(g) {
		engine.ui.UIElement.prototype.render.call(this,g);
		g.set_opacity(this.hover?1:0.5);
		g.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var elm = _g1[_g];
			++_g;
			elm.render(g);
		}
	}
	,onMouseMoved: function(x,y) {
	}
	,__class__: engine.ui.Menu
});
engine.utils = {};
engine.utils.Pair = function(x,y) {
	this.x = x;
	this.y = y;
	this.__id__ = this.hashCode();
};
$hxClasses["engine.utils.Pair"] = engine.utils.Pair;
engine.utils.Pair.__name__ = ["engine","utils","Pair"];
engine.utils.Pair.prototype = {
	equals: function(other) {
		return this.x == other.x && this.y == other.y;
	}
	,hashCode: function() {
		var hash = this.x * 127 + this.y * 17 + 1;
		return hash;
	}
	,__class__: engine.utils.Pair
};
engine.world = {};
engine.world.WorldManager = function(partCountX,partCountY,partWidth,partHeight) {
	engine.world.WorldManager.the = this;
	this.partHeight = partHeight;
	this.partWidth = partWidth;
	this.worldParts = new haxe.ds.ObjectMap();
	var partSize = new kha.math.Vector3(partWidth,partHeight,0);
	var _g = 0;
	while(_g < partCountX) {
		var x = _g++;
		var _g1 = 0;
		while(_g1 < partCountY) {
			var y = _g1++;
			var coords = new engine.utils.Pair(x,y);
			var bounds = new engine.physic.AABB(new kha.math.Vector3(x * partWidth,y * partHeight,0),partSize);
			var value = new engine.world.WorldPart(bounds,coords);
			this.worldParts.set(coords,value);
		}
	}
};
$hxClasses["engine.world.WorldManager"] = engine.world.WorldManager;
engine.world.WorldManager.__name__ = ["engine","world","WorldManager"];
engine.world.WorldManager.createInstance = function(partCountX,partCountY,partWidth,partHeight) {
	if(engine.world.WorldManager.the == null) engine.world.WorldManager.the = new engine.world.WorldManager(partCountX,partCountY,partWidth,partHeight);
};
engine.world.WorldManager.prototype = {
	getEntities: function() {
		var ents = new Array();
		var it = this.worldParts.keys();
		while(it.hasNext()) {
			var part;
			var key = it.next();
			part = this.worldParts.h[key.__id__];
			ents = ents.concat(part.getEntities());
		}
		return ents;
	}
	,removeEntity: function(ent) {
		var part = this.getPartForEntity(ent);
		if(part != null) {
			part.removeEntity(ent);
			var overlapParts = this.getPartsInAabb(engine.physic.AABB.AabbFromEntity(ent));
			var _g = 0;
			while(_g < overlapParts.length) {
				var p = overlapParts[_g];
				++_g;
				if(p != part) p.removeOverlappingEntity(ent);
			}
		}
	}
	,spawnEntity: function(ent) {
		var part = this.getPartForEntity(ent);
		if(part != null) {
			part.addEntity(ent);
			var overlapParts = this.getPartsInAabb(engine.physic.AABB.AabbFromEntity(ent));
			var _g = 0;
			while(_g < overlapParts.length) {
				var p = overlapParts[_g];
				++_g;
				if(p != part) p.addOverlappingEntity(ent);
			}
		}
	}
	,getPartsInAabb: function(aabb) {
		var res = new Array();
		var it = this.worldParts.keys();
		while(it.hasNext()) {
			var part;
			var key = it.next();
			part = this.worldParts.h[key.__id__];
			if(part.bounds.collide(aabb)) res.push(part);
		}
		return res;
	}
	,getCoordFromPos: function(pos) {
		var coordX = Math.round(pos.x / this.partWidth);
		var coordY = Math.round(pos.y / this.partHeight);
		return new engine.utils.Pair(coordX,coordY);
	}
	,update: function() {
		var it = this.worldParts.keys();
		while(it.hasNext()) ((function($this) {
			var $r;
			var key = it.next();
			$r = $this.worldParts.h[key.__id__];
			return $r;
		}(this))).update();
	}
	,render: function(g) {
		var it = this.worldParts.keys();
		var ents = new Array();
		while(it.hasNext()) ents = ents.concat(((function($this) {
			var $r;
			var key = it.next();
			$r = $this.worldParts.h[key.__id__];
			return $r;
		}(this))).getEntities());
		ents.sort($bind(this,this.sortByZindex));
		var _g1 = 0;
		var _g = ents.length;
		while(_g1 < _g) {
			var i = _g1++;
			ents[i].render(g);
		}
	}
	,sortByZindex: function(ent,other) {
		if(ent.zindex > other.zindex) return 1; else if(ent.zindex == other.zindex) return 0; else return -1;
	}
	,getPartForEntity: function(ent) {
		var coord = this.getCoordFromPos(ent.position);
		if(!(this.worldParts.h.__keys__[coord.__id__] != null)) return null;
		var part = this.worldParts.h[coord.__id__];
		return part;
	}
	,placeLater: function(ent) {
		var part = this.getPartForEntity(ent);
		if(part != null) {
			part.addEntityLater(ent);
			return true;
		} else return false;
	}
	,getEntitiesInAabb: function(aabb,type) {
		var it = this.worldParts.keys();
		var res = new Array();
		while(it.hasNext()) {
			var part;
			var key = it.next();
			part = this.worldParts.h[key.__id__];
			if(!part.bounds.collide(aabb)) continue;
			var arr = part.getEntitiesOfType(Type.createInstance(type,new Array()));
			res = res.concat(arr);
		}
		return res;
	}
	,clearAll: function() {
		var it = this.worldParts.keys();
		while(it.hasNext()) {
			var part;
			var key = it.next();
			part = this.worldParts.h[key.__id__];
			part.clearAll();
		}
	}
	,__class__: engine.world.WorldManager
};
engine.world.WorldPart = function(aabb,coords) {
	this.bounds = aabb;
	this.coords = coords;
	this.entities = new Array();
	this.entitiesToAdd = new Array();
	this.entitiesToRemove = new Array();
	this.entitiesOverlapping = new Array();
};
$hxClasses["engine.world.WorldPart"] = engine.world.WorldPart;
engine.world.WorldPart.__name__ = ["engine","world","WorldPart"];
engine.world.WorldPart.prototype = {
	addEntityLater: function(ent) {
		this.entitiesToAdd.push(ent);
	}
	,addEntity: function(ent) {
		this.entities.push(ent);
	}
	,removeEntity: function(ent) {
		HxOverrides.remove(this.entities,ent);
	}
	,getEntities: function() {
		return this.entities;
	}
	,update: function() {
		while(this.entitiesToRemove.length > 0) {
			var x = this.entitiesToRemove.pop();
			HxOverrides.remove(this.entities,x);
		}
		while(this.entitiesToAdd.length > 0) this.addEntity(this.entitiesToAdd.pop());
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var ent = _g1[_g];
			++_g;
			ent.update();
			if(Type.getClass(ent) == khattraction.entities.Bullet && (js.Boot.__cast(ent , khattraction.entities.Bullet)).shouldBeDead) HxOverrides.remove(this.entities,ent);
			if(!this.bounds.contains(ent.position)) {
				this.entitiesToRemove.push(ent);
				if(!engine.world.WorldManager.the.placeLater(ent)) this.entitiesToRemove.push(ent);
			}
		}
	}
	,addOverlappingEntity: function(ent) {
		this.entitiesOverlapping.push(ent);
	}
	,removeOverlappingEntity: function(ent) {
		HxOverrides.remove(this.entitiesOverlapping,ent);
	}
	,getEntitiesOfType: function(fake) {
		var res = new Array();
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var ent = _g1[_g];
			++_g;
			if(Type.getClass(ent) == Type.getClass(fake)) res.push(ent);
		}
		var _g2 = 0;
		var _g11 = this.entitiesOverlapping;
		while(_g2 < _g11.length) {
			var ent1 = _g11[_g2];
			++_g2;
			if(Type.getClass(ent1) == Type.getClass(fake)) res.push(ent1);
		}
		return res;
	}
	,clearAll: function() {
		this.entities = new Array();
		this.entitiesToAdd = new Array();
		this.entitiesToRemove = new Array();
		this.entitiesOverlapping = new Array();
	}
	,__class__: engine.world.WorldPart
};
var haxe = {};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.ds = {};
haxe.ds.ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe.ds.ArraySort;
haxe.ds.ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe.ds.ArraySort.sort = function(a,cmp) {
	haxe.ds.ArraySort.rec(a,cmp,0,a.length);
};
haxe.ds.ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe.ds.ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe.ds.ArraySort.rec(a,cmp,from,middle);
	haxe.ds.ArraySort.rec(a,cmp,middle,to);
	haxe.ds.ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe.ds.ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe.ds.ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe.ds.ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe.ds.ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe.ds.ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe.ds.ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe.ds.ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe.ds.ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe.ds.ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe.ds.ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe.ds.ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe.ds.ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe.ds.ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; return $x; };
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Lib = function() { };
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
var kha = {};
kha.Animation = $hx_exports.kha.Animation = function(indices,speeddiv) {
	this.indices = indices;
	this.index = 0;
	this.speeddiv = speeddiv;
};
$hxClasses["kha.Animation"] = kha.Animation;
kha.Animation.__name__ = ["kha","Animation"];
kha.Animation.create = function(index) {
	var indices = [index];
	return new kha.Animation(indices,1);
};
kha.Animation.createRange = function(minindex,maxindex,speeddiv) {
	var indices = new Array();
	var _g1 = 0;
	var _g = maxindex - minindex + 1;
	while(_g1 < _g) {
		var i = _g1++;
		indices.push(minindex + i);
	}
	return new kha.Animation(indices,speeddiv);
};
kha.Animation.prototype = {
	take: function(animation) {
		if(this.indices == animation.indices) return;
		this.indices = animation.indices;
		this.speeddiv = animation.speeddiv;
		this.reset();
	}
	,get: function() {
		return this.indices[this.index];
	}
	,getIndex: function() {
		return this.index;
	}
	,setIndex: function(index) {
		if(index < this.indices.length) this.index = index;
	}
	,next: function() {
		++this.count;
		if(this.count % this.speeddiv == 0) {
			++this.index;
			if(this.index >= this.indices.length) {
				this.index = 0;
				return false;
			}
		}
		return true;
	}
	,reset: function() {
		this.count = 0;
		this.index = 0;
	}
	,__class__: kha.Animation
};
kha.Resource = function() { };
$hxClasses["kha.Resource"] = kha.Resource;
kha.Resource.__name__ = ["kha","Resource"];
kha.Resource.prototype = {
	__class__: kha.Resource
};
kha.Blob = function(bytes) {
	this.myFirstLine = true;
	this.bytes = bytes;
	this.buffer = new Array();
	this.position = 0;
};
$hxClasses["kha.Blob"] = kha.Blob;
kha.Blob.__name__ = ["kha","Blob"];
kha.Blob.__interfaces__ = [kha.Resource];
kha.Blob.prototype = {
	length: function() {
		return this.bytes.length;
	}
	,reset: function() {
		this.position = 0;
	}
	,seek: function(pos) {
		this.position = pos;
	}
	,readU8: function() {
		var $byte = this.bytes.b[this.position];
		++this.position;
		return $byte;
	}
	,readS8: function() {
		var $byte = this.bytes.b[this.position];
		++this.position;
		var sign;
		if(($byte & 128) == 0) sign = 1; else sign = -1;
		$byte = $byte & 127;
		return sign * $byte;
	}
	,readU16BE: function() {
		var first = this.bytes.b[this.position];
		var second = this.bytes.b[this.position + 1];
		this.position += 2;
		return first * 256 + second;
	}
	,readU16LE: function() {
		var first = this.bytes.b[this.position];
		var second = this.bytes.b[this.position + 1];
		this.position += 2;
		return second * 256 + first;
	}
	,readS16BE: function() {
		var first = this.bytes.b[this.position];
		var second = this.bytes.b[this.position + 1];
		this.position += 2;
		var sign;
		if((first & 128) == 0) sign = 1; else sign = -1;
		first = first & 127;
		if(sign == -1) return -32767 + first * 256 + second; else return first * 256 + second;
	}
	,readS16LE: function() {
		var first = this.bytes.b[this.position];
		var second = this.bytes.b[this.position + 1];
		var sign;
		if((second & 128) == 0) sign = 1; else sign = -1;
		second = second & 127;
		this.position += 2;
		if(sign == -1) return -32767 + second * 256 + first; else return second * 256 + first;
	}
	,readS32LE: function() {
		var fourth = this.bytes.b[this.position];
		var third = this.bytes.b[this.position + 1];
		var second = this.bytes.b[this.position + 2];
		var first = this.bytes.b[this.position + 3];
		var sign;
		if((first & 128) == 0) sign = 1; else sign = -1;
		first = first & 127;
		this.position += 4;
		if(sign == -1) return -2147483647 + fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256; else return fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
	}
	,readS32BE: function() {
		var fourth = this.bytes.b[this.position];
		var third = this.bytes.b[this.position + 1];
		var second = this.bytes.b[this.position + 2];
		var first = this.bytes.b[this.position + 3];
		var sign;
		if((fourth & 128) == 0) sign = 1; else sign = -1;
		fourth = fourth & 127;
		this.position += 4;
		if(sign == -1) return -2147483647 + first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
		return first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
	}
	,readF32LE: function() {
		return this.readF32(this.readS32LE());
	}
	,readF32BE: function() {
		return this.readF32(this.readS32BE());
	}
	,readF32: function(i) {
		var sign;
		if((i & -2147483648) == 0) sign = 1; else sign = -1;
		var exp = i >> 23 & 255;
		var man = i & 8388607;
		switch(exp) {
		case 0:
			return 0.0;
		case 255:
			if(man != 0) return Math.NaN; else if(sign > 0) return Math.POSITIVE_INFINITY; else return Math.NEGATIVE_INFINITY;
			break;
		default:
			return sign * ((man + 8388608) / 8388608.0) * Math.pow(2,exp - 127);
		}
	}
	,toString: function() {
		return this.bytes.toString();
	}
	,bit: function(value,position) {
		var b = (value >>> position & 1) == 1;
		if(b) {
			var a = 3;
			++a;
			return true;
		} else {
			var c = 4;
			--c;
			return false;
		}
	}
	,readUtf8Char: function() {
		if(this.position >= this.length()) return -1;
		var c = this.readU8();
		var value = 0;
		if(!this.bit(c,7)) value = c; else if(this.bit(c,7) && this.bit(c,6) && !this.bit(c,5)) {
			var a = c & 31;
			var c2 = this.readU8();
			var b = c2 & 63;
			value = a << 6 | b;
		} else if(this.bit(c,7) && this.bit(c,6) && this.bit(c,5) && !this.bit(c,4)) {
			var _g = 0;
			while(_g < 2) {
				var i = _g++;
				this.readU8();
			}
		} else if(this.bit(c,7) && this.bit(c,6) && this.bit(c,5) && this.bit(c,4) && !this.bit(c,3)) {
			var _g1 = 0;
			while(_g1 < 3) {
				var i1 = _g1++;
				this.readU8();
			}
		}
		return value;
	}
	,readUtf8Line: function() {
		var bufferindex = 0;
		var c = this.readUtf8Char();
		if(c < 0) return "";
		while(c != HxOverrides.cca("\n",0) && bufferindex < 2000) {
			this.buffer[bufferindex] = c;
			++bufferindex;
			c = this.readUtf8Char();
			if(this.position >= this.length()) {
				this.buffer[bufferindex] = c;
				++bufferindex;
				break;
			}
		}
		if(this.myFirstLine) {
			this.myFirstLine = false;
			if(bufferindex > 2 && this.buffer[0] == 239 && this.buffer[1] == 187 && this.buffer[2] == 191) {
				var chars = new Array();
				var _g1 = 3;
				var _g = bufferindex - 3;
				while(_g1 < _g) {
					var i = _g1++;
					chars[i - 3] = this.buffer[i];
				}
				return this.toText(chars,bufferindex - 3);
			}
		}
		var chars1 = new Array();
		var _g2 = 0;
		while(_g2 < bufferindex) {
			var i1 = _g2++;
			chars1[i1] = this.buffer[i1];
		}
		return this.toText(chars1,bufferindex);
	}
	,toText: function(chars,length) {
		var value = "";
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			value += String.fromCharCode(chars[i]);
		}
		return value;
	}
	,readUtf8String: function() {
		var text = "";
		while(this.position < this.length()) text += this.readUtf8Line() + "\n";
		return text;
	}
	,toBytes: function() {
		return this.bytes;
	}
	,unload: function() {
		this.bytes = null;
	}
	,__class__: kha.Blob
};
kha.Button = $hxClasses["kha.Button"] = { __ename__ : ["kha","Button"], __constructs__ : ["NONE","UP","RIGHT","DOWN","LEFT","BUTTON_1","BUTTON_2"] };
kha.Button.NONE = ["NONE",0];
kha.Button.NONE.__enum__ = kha.Button;
kha.Button.UP = ["UP",1];
kha.Button.UP.__enum__ = kha.Button;
kha.Button.RIGHT = ["RIGHT",2];
kha.Button.RIGHT.__enum__ = kha.Button;
kha.Button.DOWN = ["DOWN",3];
kha.Button.DOWN.__enum__ = kha.Button;
kha.Button.LEFT = ["LEFT",4];
kha.Button.LEFT.__enum__ = kha.Button;
kha.Button.BUTTON_1 = ["BUTTON_1",5];
kha.Button.BUTTON_1.__enum__ = kha.Button;
kha.Button.BUTTON_2 = ["BUTTON_2",6];
kha.Button.BUTTON_2.__enum__ = kha.Button;
kha.Canvas = function() { };
$hxClasses["kha.Canvas"] = kha.Canvas;
kha.Canvas.__name__ = ["kha","Canvas"];
kha.Canvas.prototype = {
	__class__: kha.Canvas
};
kha.Image = function() { };
$hxClasses["kha.Image"] = kha.Image;
kha.Image.__name__ = ["kha","Image"];
kha.Image.__interfaces__ = [kha.Resource,kha.Canvas];
kha.Image.__properties__ = {get_nonPow2Supported:"get_nonPow2Supported",get_maxSize:"get_maxSize"}
kha.Image.create = function(width,height,format,usage,levels) {
	if(levels == null) levels = 1;
	if(format == null) format = kha.graphics4.TextureFormat.RGBA32;
	if(usage == null) usage = kha.graphics4.Usage.StaticUsage;
	if(kha.Sys.gl == null) return new kha.CanvasImage(width,height,format,false); else return new kha.WebGLImage(width,height,format,false);
};
kha.Image.createRenderTarget = function(width,height,format,depthStencil,antiAliasingSamples) {
	if(antiAliasingSamples == null) antiAliasingSamples = 1;
	if(depthStencil == null) depthStencil = false;
	if(format == null) format = kha.graphics4.TextureFormat.RGBA32;
	if(kha.Sys.gl == null) return new kha.CanvasImage(width,height,format,true); else return new kha.WebGLImage(width,height,format,true);
};
kha.Image.fromImage = function(image,readable) {
	if(kha.Sys.gl == null) {
		var img = new kha.CanvasImage(image.width,image.height,kha.graphics4.TextureFormat.RGBA32,false);
		img.image = image;
		img.createTexture();
		return img;
	} else {
		var img1 = new kha.WebGLImage(image.width,image.height,kha.graphics4.TextureFormat.RGBA32,false);
		img1.image = image;
		img1.createTexture();
		return img1;
	}
};
kha.Image.fromVideo = function(video) {
	if(kha.Sys.gl == null) {
		var img = new kha.CanvasImage(video.element.videoWidth,video.element.videoHeight,kha.graphics4.TextureFormat.RGBA32,false);
		img.video = video.element;
		img.createTexture();
		return img;
	} else {
		var img1 = new kha.WebGLImage(video.element.videoWidth,video.element.videoHeight,kha.graphics4.TextureFormat.RGBA32,false);
		img1.video = video.element;
		img1.createTexture();
		return img1;
	}
};
kha.Image.get_maxSize = function() {
	if(kha.Sys.gl == null) return 8192; else return kha.Sys.gl.getParameter(kha.Sys.gl.MAX_TEXTURE_SIZE);
};
kha.Image.get_nonPow2Supported = function() {
	return kha.Sys.gl != null;
};
kha.Image.prototype = {
	isOpaque: function(x,y) {
		return false;
	}
	,unload: function() {
	}
	,lock: function(level) {
		if(level == null) level = 0;
		return null;
	}
	,unlock: function() {
	}
	,get_width: function() {
		return 0;
	}
	,get_height: function() {
		return 0;
	}
	,get_realWidth: function() {
		return 0;
	}
	,get_realHeight: function() {
		return 0;
	}
	,get_g2: function() {
		return null;
	}
	,get_g4: function() {
		return null;
	}
	,__class__: kha.Image
	,__properties__: {get_g4:"get_g4",get_g2:"get_g2",get_realHeight:"get_realHeight",get_realWidth:"get_realWidth",get_height:"get_height",get_width:"get_width"}
};
kha.CanvasImage = function(width,height,format,renderTarget) {
	this.g2canvas = null;
	this.myWidth = width;
	this.myHeight = height;
	this.format = format;
	this.renderTarget = renderTarget;
	this.image = null;
	this.video = null;
	if(renderTarget) this.createTexture();
};
$hxClasses["kha.CanvasImage"] = kha.CanvasImage;
kha.CanvasImage.__name__ = ["kha","CanvasImage"];
kha.CanvasImage.init = function() {
	var canvas = window.document.createElement("canvas");
	if(canvas != null) {
		kha.CanvasImage.context = canvas.getContext("2d");
		canvas.width = 2048;
		canvas.height = 2048;
		kha.CanvasImage.context.globalCompositeOperation = "copy";
	}
};
kha.CanvasImage.upperPowerOfTwo = function(v) {
	v--;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	v++;
	return v;
};
kha.CanvasImage.__super__ = kha.Image;
kha.CanvasImage.prototype = $extend(kha.Image.prototype,{
	get_g2: function() {
		if(this.g2canvas == null) {
			var canvas = window.document.createElement("canvas");
			this.image = canvas;
			var context = canvas.getContext("2d");
			canvas.width = this.get_width();
			canvas.height = this.get_height();
			this.g2canvas = new kha.js.CanvasGraphics(context,this.get_width(),this.get_height());
		}
		return this.g2canvas;
	}
	,get_g4: function() {
		return null;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,isOpaque: function(x,y) {
		if(this.data == null) {
			if(kha.CanvasImage.context == null) return true; else this.createImageData();
		}
		return this.data.data[y * Std["int"](this.image.width) * 4 + x * 4 + 3] != 0;
	}
	,createImageData: function() {
		kha.CanvasImage.context.strokeStyle = "rgba(0,0,0,0)";
		kha.CanvasImage.context.fillStyle = "rgba(0,0,0,0)";
		kha.CanvasImage.context.fillRect(0,0,this.image.width,this.image.height);
		kha.CanvasImage.context.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height);
		this.data = kha.CanvasImage.context.getImageData(0,0,this.image.width,this.image.height);
	}
	,createTexture: function() {
		if(kha.Sys.gl == null) return;
		this.texture = kha.Sys.gl.createTexture();
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.LINEAR);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.CLAMP_TO_EDGE);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.CLAMP_TO_EDGE);
		if(this.renderTarget) {
			this.frameBuffer = kha.Sys.gl.createFramebuffer();
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,this.frameBuffer);
			kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,this.get_realWidth(),this.get_realHeight(),0,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,null);
			kha.Sys.gl.framebufferTexture2D(kha.Sys.gl.FRAMEBUFFER,kha.Sys.gl.COLOR_ATTACHMENT0,kha.Sys.gl.TEXTURE_2D,this.texture,0);
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,null);
		} else if(this.video != null) kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.video); else kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.image);
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,null);
	}
	,set: function(stage) {
		kha.Sys.gl.activeTexture(kha.Sys.gl.TEXTURE0 + stage);
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
		if(this.video != null) kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.video);
	}
	,lock: function(level) {
		if(level == null) level = 0;
		this.bytes = haxe.io.Bytes.alloc(this.format == kha.graphics4.TextureFormat.RGBA32?4 * this.get_width() * this.get_height():this.get_width() * this.get_height());
		return this.bytes;
	}
	,unlock: function() {
		if(kha.Sys.gl != null) {
			this.texture = kha.Sys.gl.createTexture();
			kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.LINEAR);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.CLAMP_TO_EDGE);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.CLAMP_TO_EDGE);
			kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.LUMINANCE,this.get_width(),this.get_height(),0,kha.Sys.gl.LUMINANCE,kha.Sys.gl.UNSIGNED_BYTE,new Uint8Array(this.bytes.b));
			if(kha.Sys.gl.getError() == 1282) {
				var rgbaBytes = haxe.io.Bytes.alloc(this.get_width() * this.get_height() * 4);
				var _g1 = 0;
				var _g = this.get_height();
				while(_g1 < _g) {
					var y = _g1++;
					var _g3 = 0;
					var _g2 = this.get_width();
					while(_g3 < _g2) {
						var x = _g3++;
						var value = this.bytes.get(y * this.get_width() + x);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 1,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 2,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 3,255);
					}
				}
				kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,this.get_width(),this.get_height(),0,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,new Uint8Array(rgbaBytes.b));
			}
			kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,null);
			this.bytes = null;
		}
	}
	,unload: function() {
	}
	,__class__: kha.CanvasImage
});
kha.CollisionLayer = function(map) {
	this.map = map;
	this.heroes = new Array();
	this.enemies = new Array();
	this.projectiles = new Array();
	this.others = new Array();
};
$hxClasses["kha.CollisionLayer"] = kha.CollisionLayer;
kha.CollisionLayer.__name__ = ["kha","CollisionLayer"];
kha.CollisionLayer.prototype = {
	getMap: function() {
		return this.map;
	}
	,addHero: function(sprite) {
		this.heroes.push(sprite);
	}
	,addEnemy: function(sprite) {
		this.enemies.push(sprite);
	}
	,addProjectile: function(sprite) {
		this.projectiles.push(sprite);
	}
	,addOther: function(sprite) {
		this.others.push(sprite);
	}
	,removeHero: function(sprite) {
		HxOverrides.remove(this.heroes,sprite);
	}
	,removeEnemy: function(sprite) {
		HxOverrides.remove(this.enemies,sprite);
	}
	,removeProjectile: function(sprite) {
		HxOverrides.remove(this.projectiles,sprite);
	}
	,removeOther: function(sprite) {
		HxOverrides.remove(this.others,sprite);
	}
	,getHero: function(index) {
		return this.heroes[index];
	}
	,getEnemy: function(index) {
		return this.enemies[index];
	}
	,getProjectile: function(index) {
		return this.projectiles[index];
	}
	,getOther: function(index) {
		return this.others[index];
	}
	,countHeroes: function() {
		return this.heroes.length;
	}
	,countEnemies: function() {
		return this.enemies.length;
	}
	,countProjectiles: function() {
		return this.projectiles.length;
	}
	,countOthers: function() {
		return this.others.length;
	}
	,sort: function(sprites) {
		if(sprites.length == 0) return;
		sprites.sort(function(arg0,arg1) {
			if(arg0.x < arg1.x) return -1; else if(arg0.x == arg1.x) return 0; else return 1;
		});
	}
	,sortAllSprites: function() {
		this.sort(this.heroes);
		this.sort(this.enemies);
		this.sort(this.projectiles);
		this.sort(this.others);
	}
	,collidesPoint: function(point) {
		return this.map.collidesPoint(point);
	}
	,collidesSprite: function(sprite) {
		return this.map.collides(sprite);
	}
	,line: function(xstart,ystart,xend,yend,sprite) {
		var x0 = Math.round(xstart);
		var y0 = Math.round(ystart);
		var x1 = Math.round(xend);
		var y1 = Math.round(yend);
		sprite.x = x0;
		sprite.y = y0;
		var dx = Math.abs(x1 - x0);
		var dy = Math.abs(y1 - y0);
		var sx;
		var sy;
		if(x0 < x1) sx = 1; else sx = -1;
		if(y0 < y1) sy = 1; else sy = -1;
		var err = dx - dy;
		while(true) {
			if(x0 == x1 && y0 == y1) {
				sprite.x = xend;
				sprite.y = yend;
				break;
			}
			var e2 = 2 * err;
			if(e2 > -dy) {
				err -= dy;
				x0 += sx;
				sprite.x = x0;
				if(this.map.collides(sprite)) {
					sprite.y -= 1;
					if(!this.map.collides(sprite)) continue; else {
						sprite.y -= 1;
						if(!this.map.collides(sprite)) continue; else {
							sprite.y -= 1;
							if(!this.map.collides(sprite)) continue;
							sprite.y += 1;
						}
						sprite.y += 1;
					}
					sprite.y += 1;
					sprite.x -= sx;
					if(sx < 0) sprite.hitFrom(kha.Direction.RIGHT); else sprite.hitFrom(kha.Direction.LEFT);
					while(true) {
						if(y0 == y1) {
							sprite.y = yend;
							return;
						}
						y0 += sy;
						sprite.y = y0;
						if(this.map.collides(sprite)) {
							sprite.y -= sy;
							if(sy < 0) sprite.hitFrom(kha.Direction.DOWN); else sprite.hitFrom(kha.Direction.UP);
							return;
						}
					}
					return;
				}
			}
			if(e2 < dx) {
				err += dx;
				y0 += sy;
				sprite.y = y0;
				if(this.map.collides(sprite)) {
					sprite.y -= sy;
					if(sy < 0) sprite.hitFrom(kha.Direction.DOWN); else sprite.hitFrom(kha.Direction.UP);
					while(true) {
						if(x0 == x1) {
							sprite.x = xend;
							return;
						}
						x0 += sx;
						sprite.x = x0;
						if(this.map.collides(sprite)) {
							sprite.y -= 1;
							if(!this.map.collides(sprite)) continue; else {
								sprite.y -= 1;
								if(!this.map.collides(sprite)) continue; else {
									sprite.y -= 1;
									if(!this.map.collides(sprite)) continue;
									sprite.y += 1;
								}
								sprite.y += 1;
							}
							sprite.y += 1;
							sprite.x -= sx;
							if(sx < 0) sprite.hitFrom(kha.Direction.RIGHT); else sprite.hitFrom(kha.Direction.LEFT);
							return;
						}
					}
					return;
				}
			}
		}
	}
	,moveSprite: function(sprite) {
		sprite.speedx += sprite.accx;
		sprite.speedy += sprite.accy;
		if(sprite.speedy > sprite.maxspeedy) sprite.speedy = sprite.maxspeedy;
		if(sprite.collides) {
			var xaim = sprite.x + sprite.speedx;
			var yaim = sprite.y + sprite.speedy;
			var xstart = sprite.x;
			var ystart = sprite.y;
			sprite.x = xaim;
			sprite.y = yaim;
			if(this.map.collides(sprite)) this.line(xstart,ystart,xaim,yaim,sprite);
		} else {
			sprite.x += sprite.speedx;
			sprite.y += sprite.speedy;
		}
	}
	,moveSprites: function(sprites,xleft,xright) {
		var _g = 0;
		while(_g < sprites.length) {
			var sprite = sprites[_g];
			++_g;
			this.moveSprite(sprite);
		}
	}
	,moveAllSprites: function(xleft,xright) {
		this.moveSprites(this.heroes,xleft,xright);
		this.moveSprites(this.enemies,xleft,xright);
		this.moveSprites(this.projectiles,xleft,xright);
		this.moveSprites(this.others,xleft,xright);
	}
	,advance: function(xleft,xright) {
		this.sortAllSprites();
		this.moveAllSprites(xleft,xright);
		var _g = 0;
		var _g1 = this.enemies;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			var rect = enemy.collisionRect();
			var _g2 = 0;
			var _g3 = this.heroes;
			while(_g2 < _g3.length) {
				var hero = _g3[_g2];
				++_g2;
				if(rect.collision(hero.collisionRect())) {
					hero.hit(enemy);
					enemy.hit(hero);
				}
			}
			var _g21 = 0;
			var _g31 = this.projectiles;
			while(_g21 < _g31.length) {
				var projectile = _g31[_g21];
				++_g21;
				if(rect.collision(projectile.collisionRect())) {
					projectile.hit(enemy);
					enemy.hit(projectile);
				}
			}
		}
		var _g4 = 0;
		var _g11 = this.projectiles;
		while(_g4 < _g11.length) {
			var projectile1 = _g11[_g4];
			++_g4;
			var rect1 = projectile1.collisionRect();
			var _g22 = 0;
			var _g32 = this.heroes;
			while(_g22 < _g32.length) {
				var hero1 = _g32[_g22];
				++_g22;
				if(rect1.collision(hero1.collisionRect())) {
					hero1.hit(projectile1);
					projectile1.hit(hero1);
				}
			}
		}
		var _g5 = 0;
		var _g12 = this.others;
		while(_g5 < _g12.length) {
			var other = _g12[_g5];
			++_g5;
			var rect2 = other.collisionRect();
			var _g23 = 0;
			var _g33 = this.heroes;
			while(_g23 < _g33.length) {
				var hero2 = _g33[_g23];
				++_g23;
				if(rect2.collision(hero2.collisionRect())) {
					hero2.hit(other);
					other.hit(hero2);
				}
			}
			var _g24 = 0;
			var _g34 = this.enemies;
			while(_g24 < _g34.length) {
				var enemy1 = _g34[_g24];
				++_g24;
				if(rect2.collision(enemy1.collisionRect())) {
					enemy1.hit(other);
					other.hit(enemy1);
				}
			}
			var _g25 = 0;
			var _g35 = this.projectiles;
			while(_g25 < _g35.length) {
				var projectile2 = _g35[_g25];
				++_g25;
				if(rect2.collision(projectile2.collisionRect())) {
					projectile2.hit(other);
					other.hit(projectile2);
				}
			}
			var _g26 = 0;
			var _g36 = this.others;
			while(_g26 < _g36.length) {
				var other2 = _g36[_g26];
				++_g26;
				if(other != other2) {
					if(rect2.collision(other2.collisionRect())) {
						other2.hit(other);
						other.hit(other2);
					}
				}
			}
		}
	}
	,cleanSprites: function() {
		var found = true;
		while(found) {
			found = false;
			var _g = 0;
			var _g1 = this.heroes;
			while(_g < _g1.length) {
				var sprite = _g1[_g];
				++_g;
				if(sprite.removed) {
					HxOverrides.remove(this.heroes,sprite);
					found = true;
				}
			}
		}
		found = true;
		while(found) {
			found = false;
			var _g2 = 0;
			var _g11 = this.enemies;
			while(_g2 < _g11.length) {
				var sprite1 = _g11[_g2];
				++_g2;
				if(sprite1.removed) {
					HxOverrides.remove(this.enemies,sprite1);
					found = true;
				}
			}
		}
		found = true;
		while(found) {
			found = false;
			var _g3 = 0;
			var _g12 = this.projectiles;
			while(_g3 < _g12.length) {
				var sprite2 = _g12[_g3];
				++_g3;
				if(sprite2.removed) {
					HxOverrides.remove(this.projectiles,sprite2);
					found = true;
				}
			}
		}
		found = true;
		while(found) {
			found = false;
			var _g4 = 0;
			var _g13 = this.others;
			while(_g4 < _g13.length) {
				var sprite3 = _g13[_g4];
				++_g4;
				if(sprite3.removed) {
					HxOverrides.remove(this.others,sprite3);
					found = true;
				}
			}
		}
	}
	,__class__: kha.CollisionLayer
};
kha._Color = {};
kha._Color.Color_Impl_ = function() { };
$hxClasses["kha._Color.Color_Impl_"] = kha._Color.Color_Impl_;
kha._Color.Color_Impl_.__name__ = ["kha","_Color","Color_Impl_"];
kha._Color.Color_Impl_.__properties__ = {set_value:"set_value",get_value:"get_value",set_A:"set_A",get_A:"get_A",set_B:"set_B",get_B:"get_B",set_G:"set_G",get_G:"get_G",set_R:"set_R",get_R:"get_R",set_Ab:"set_Ab",get_Ab:"get_Ab",set_Bb:"set_Bb",get_Bb:"get_Bb",set_Gb:"set_Gb",get_Gb:"get_Gb",set_Rb:"set_Rb",get_Rb:"get_Rb"}
kha._Color.Color_Impl_.fromValue = function(value) {
	return kha._Color.Color_Impl_._new(value);
};
kha._Color.Color_Impl_.fromBytes = function(r,g,b,a) {
	if(a == null) a = 255;
	return kha._Color.Color_Impl_._new(a << 24 | r << 16 | g << 8 | b);
};
kha._Color.Color_Impl_.fromFloats = function(r,g,b,a) {
	if(a == null) a = 1;
	return kha._Color.Color_Impl_._new((a * 255 | 0) << 24 | (r * 255 | 0) << 16 | (g * 255 | 0) << 8 | (b * 255 | 0));
};
kha._Color.Color_Impl_.fromString = function(value) {
	if((value.length == 7 || value.length == 9) && value.charCodeAt(0) == 35) {
		var colorValue = Std.parseInt("0x" + HxOverrides.substr(value,1,null));
		if(value.length == 7) colorValue += -16777216;
		return kha._Color.Color_Impl_._new(colorValue);
	} else throw "Invalid Color string: '" + value + "'";
};
kha._Color.Color_Impl_._new = function(value) {
	return value;
};
kha._Color.Color_Impl_.get_value = function(this1) {
	return this1;
};
kha._Color.Color_Impl_.set_value = function(this1,value) {
	this1 = value;
	return this1;
};
kha._Color.Color_Impl_.get_Rb = function(this1) {
	return (this1 & 16711680) >>> 16;
};
kha._Color.Color_Impl_.get_Gb = function(this1) {
	return (this1 & 65280) >>> 8;
};
kha._Color.Color_Impl_.get_Bb = function(this1) {
	return this1 & 255;
};
kha._Color.Color_Impl_.get_Ab = function(this1) {
	return this1 >>> 24;
};
kha._Color.Color_Impl_.set_Rb = function(this1,i) {
	this1 = kha._Color.Color_Impl_.get_Ab(this1) << 24 | i << 16 | kha._Color.Color_Impl_.get_Gb(this1) << 8 | kha._Color.Color_Impl_.get_Bb(this1);
	return i;
};
kha._Color.Color_Impl_.set_Gb = function(this1,i) {
	this1 = kha._Color.Color_Impl_.get_Ab(this1) << 24 | kha._Color.Color_Impl_.get_Rb(this1) << 16 | i << 8 | kha._Color.Color_Impl_.get_Bb(this1);
	return i;
};
kha._Color.Color_Impl_.set_Bb = function(this1,i) {
	this1 = kha._Color.Color_Impl_.get_Ab(this1) << 24 | kha._Color.Color_Impl_.get_Rb(this1) << 16 | kha._Color.Color_Impl_.get_Gb(this1) << 8 | i;
	return i;
};
kha._Color.Color_Impl_.set_Ab = function(this1,i) {
	this1 = i << 24 | kha._Color.Color_Impl_.get_Rb(this1) << 16 | kha._Color.Color_Impl_.get_Gb(this1) << 8 | kha._Color.Color_Impl_.get_Bb(this1);
	return i;
};
kha._Color.Color_Impl_.get_R = function(this1) {
	return kha._Color.Color_Impl_.get_Rb(this1) / 255;
};
kha._Color.Color_Impl_.get_G = function(this1) {
	return kha._Color.Color_Impl_.get_Gb(this1) / 255;
};
kha._Color.Color_Impl_.get_B = function(this1) {
	return kha._Color.Color_Impl_.get_Bb(this1) / 255;
};
kha._Color.Color_Impl_.get_A = function(this1) {
	return kha._Color.Color_Impl_.get_Ab(this1) / 255;
};
kha._Color.Color_Impl_.set_R = function(this1,f) {
	this1 = Std["int"](kha._Color.Color_Impl_.get_Ab(this1) / 255 * 255) << 24 | (f * 255 | 0) << 16 | Std["int"](kha._Color.Color_Impl_.get_Gb(this1) / 255 * 255) << 8 | Std["int"](kha._Color.Color_Impl_.get_Bb(this1) / 255 * 255);
	return f;
};
kha._Color.Color_Impl_.set_G = function(this1,f) {
	this1 = Std["int"](kha._Color.Color_Impl_.get_Ab(this1) / 255 * 255) << 24 | Std["int"](kha._Color.Color_Impl_.get_Rb(this1) / 255 * 255) << 16 | (f * 255 | 0) << 8 | Std["int"](kha._Color.Color_Impl_.get_Bb(this1) / 255 * 255);
	return f;
};
kha._Color.Color_Impl_.set_B = function(this1,f) {
	this1 = Std["int"](kha._Color.Color_Impl_.get_Ab(this1) / 255 * 255) << 24 | Std["int"](kha._Color.Color_Impl_.get_Rb(this1) / 255 * 255) << 16 | Std["int"](kha._Color.Color_Impl_.get_Gb(this1) / 255 * 255) << 8 | (f * 255 | 0);
	return f;
};
kha._Color.Color_Impl_.set_A = function(this1,f) {
	this1 = (f * 255 | 0) << 24 | Std["int"](kha._Color.Color_Impl_.get_Rb(this1) / 255 * 255) << 16 | Std["int"](kha._Color.Color_Impl_.get_Gb(this1) / 255 * 255) << 8 | Std["int"](kha._Color.Color_Impl_.get_Bb(this1) / 255 * 255);
	return f;
};
kha.Configuration = function() { };
$hxClasses["kha.Configuration"] = kha.Configuration;
kha.Configuration.__name__ = ["kha","Configuration"];
kha.Configuration.screen = function() {
	return kha.Configuration.theScreen;
};
kha.Configuration.schedulerInitialized = function() {
	kha.Configuration.id = -1;
};
kha.Configuration.setScreen = function(screen) {
	kha.Configuration.theScreen = screen;
	kha.Configuration.theScreen.setInstance();
	if(kha.Configuration.id < 0) kha.Configuration.id = kha.Scheduler.addTimeTask(kha.Configuration.update,0,0.0166666666666666664);
};
kha.Configuration.update = function() {
	kha.Configuration.theScreen.update();
};
kha.Cursor = function() { };
$hxClasses["kha.Cursor"] = kha.Cursor;
kha.Cursor.__name__ = ["kha","Cursor"];
kha.Cursor.prototype = {
	__class__: kha.Cursor
};
kha.Direction = $hxClasses["kha.Direction"] = { __ename__ : ["kha","Direction"], __constructs__ : ["UP","DOWN","LEFT","RIGHT"] };
kha.Direction.UP = ["UP",0];
kha.Direction.UP.__enum__ = kha.Direction;
kha.Direction.DOWN = ["DOWN",1];
kha.Direction.DOWN.__enum__ = kha.Direction;
kha.Direction.LEFT = ["LEFT",2];
kha.Direction.LEFT.__enum__ = kha.Direction;
kha.Direction.RIGHT = ["RIGHT",3];
kha.Direction.RIGHT.__enum__ = kha.Direction;
kha.Game = function(name,hasHighscores) {
	if(hasHighscores == null) hasHighscores = false;
	this.deprecatedImage = null;
	this.setInstance();
	this.name = name;
	if(hasHighscores) this.highscores = new kha.HighscoreList();
	this.scene = kha.Scene.get_the();
	this.width = kha.Loader.the.width | 0;
	this.height = kha.Loader.the.height | 0;
};
$hxClasses["kha.Game"] = kha.Game;
kha.Game.__name__ = ["kha","Game"];
kha.Game.prototype = {
	setInstance: function() {
		kha.Game.the = this;
	}
	,loadFinished: function() {
		var w = kha.Loader.the.width;
		if(w > 0) this.width = w;
		var h = kha.Loader.the.height;
		if(h > 0) this.height = h;
		this.init();
	}
	,init: function() {
	}
	,update: function() {
		this.scene.update();
	}
	,startRender: function(frame) {
		frame.get_g2().begin();
	}
	,endRender: function(frame) {
		frame.get_g2().end();
	}
	,render: function(frame) {
		this.startRender(frame);
		this.scene.render(frame.get_g2());
		this.endRender(frame);
	}
	,getHighscores: function() {
		return this.highscores;
	}
	,initDeprecatedImage: function() {
		if(this.deprecatedImage != null) return;
		this.deprecatedImage = kha.Image.create(this.width,this.height,kha.graphics4.TextureFormat.L8);
	}
	,painterTransformMouseX: function(x,y) {
		this.initDeprecatedImage();
		return kha.Scaler.transformX(x,y,this.deprecatedImage,kha.ScreenCanvas.get_the(),kha.Sys.screenRotation);
	}
	,painterTransformMouseY: function(x,y) {
		this.initDeprecatedImage();
		return kha.Scaler.transformY(x,y,this.deprecatedImage,kha.ScreenCanvas.get_the(),kha.Sys.screenRotation);
	}
	,buttonDown: function(button) {
	}
	,buttonUp: function(button) {
	}
	,keyDown: function(key,$char) {
	}
	,keyUp: function(key,$char) {
	}
	,mouseDown: function(x,y) {
	}
	,mouseUp: function(x,y) {
	}
	,rightMouseDown: function(x,y) {
	}
	,rightMouseUp: function(x,y) {
	}
	,middleMouseDown: function(x,y) {
	}
	,middleMouseUp: function(x,y) {
	}
	,mouseMove: function(x,y) {
	}
	,mouseWheel: function(delta) {
	}
	,onForeground: function() {
	}
	,onResume: function() {
	}
	,onPause: function() {
	}
	,onBackground: function() {
	}
	,onShutdown: function() {
	}
	,onClose: function() {
	}
	,__class__: kha.Game
};
kha.EmptyScreen = function(color) {
	kha.Game.call(this,"Nothing",false);
	this.color = color;
};
$hxClasses["kha.EmptyScreen"] = kha.EmptyScreen;
kha.EmptyScreen.__name__ = ["kha","EmptyScreen"];
kha.EmptyScreen.__super__ = kha.Game;
kha.EmptyScreen.prototype = $extend(kha.Game.prototype,{
	render: function(frame) {
		this.startRender(frame);
		frame.get_g2().set_color(this.color);
		frame.get_g2().fillRect(0,0,10000,10000);
		this.endRender(frame);
	}
	,update: function() {
	}
	,__class__: kha.EmptyScreen
});
kha.EnvironmentVariables = function() {
};
$hxClasses["kha.EnvironmentVariables"] = kha.EnvironmentVariables;
kha.EnvironmentVariables.__name__ = ["kha","EnvironmentVariables"];
kha.EnvironmentVariables.prototype = {
	getVariable: function(name) {
		return "";
	}
	,__class__: kha.EnvironmentVariables
};
kha.Font = function() { };
$hxClasses["kha.Font"] = kha.Font;
kha.Font.__name__ = ["kha","Font"];
kha.Font.prototype = {
	__class__: kha.Font
};
kha.FontStyle = function(bold,italic,underlined) {
	this.bold = bold;
	this.italic = italic;
	this.underlined = underlined;
};
$hxClasses["kha.FontStyle"] = kha.FontStyle;
kha.FontStyle.__name__ = ["kha","FontStyle"];
kha.FontStyle.prototype = {
	getBold: function() {
		return this.bold;
	}
	,getItalic: function() {
		return this.italic;
	}
	,getUnderlined: function() {
		return this.underlined;
	}
	,__class__: kha.FontStyle
};
kha.Framebuffer = function(g2,g4) {
	this.graphics2 = g2;
	this.graphics4 = g4;
};
$hxClasses["kha.Framebuffer"] = kha.Framebuffer;
kha.Framebuffer.__name__ = ["kha","Framebuffer"];
kha.Framebuffer.__interfaces__ = [kha.Canvas];
kha.Framebuffer.prototype = {
	init: function(g2,g4) {
		this.graphics2 = g2;
		this.graphics4 = g4;
	}
	,get_g2: function() {
		return this.graphics2;
	}
	,get_g4: function() {
		return this.graphics4;
	}
	,get_width: function() {
		return kha.Sys.get_pixelWidth();
	}
	,get_height: function() {
		return kha.Sys.get_pixelHeight();
	}
	,__class__: kha.Framebuffer
	,__properties__: {get_height:"get_height",get_width:"get_width",get_g4:"get_g4",get_g2:"get_g2"}
};
kha.HighscoreList = function() {
	this.scores = [];
};
$hxClasses["kha.HighscoreList"] = kha.HighscoreList;
kha.HighscoreList.__name__ = ["kha","HighscoreList"];
kha.HighscoreList.prototype = {
	getScores: function() {
		return this.scores;
	}
	,addScore: function(name,score) {
		this.scores.push(new kha.Score(name,score));
		this.scores.sort(function(score1,score2) {
			return score2.getScore() - score1.getScore();
		});
	}
	,load: function(file) {
		if(file == null) return;
		var loaded = file.readObject();
		this.scores = [];
		if(loaded != null) {
			var _g1 = 0;
			var _g = loaded.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.scores[i] = new kha.Score(loaded[i].name,loaded[i].score);
			}
		}
	}
	,save: function(file) {
		file.writeObject(this.scores);
	}
	,__class__: kha.HighscoreList
};
kha.Key = $hxClasses["kha.Key"] = { __ename__ : ["kha","Key"], __constructs__ : ["BACKSPACE","TAB","ENTER","SHIFT","CTRL","ALT","CHAR","ESC","DEL","UP","DOWN","LEFT","RIGHT"] };
kha.Key.BACKSPACE = ["BACKSPACE",0];
kha.Key.BACKSPACE.__enum__ = kha.Key;
kha.Key.TAB = ["TAB",1];
kha.Key.TAB.__enum__ = kha.Key;
kha.Key.ENTER = ["ENTER",2];
kha.Key.ENTER.__enum__ = kha.Key;
kha.Key.SHIFT = ["SHIFT",3];
kha.Key.SHIFT.__enum__ = kha.Key;
kha.Key.CTRL = ["CTRL",4];
kha.Key.CTRL.__enum__ = kha.Key;
kha.Key.ALT = ["ALT",5];
kha.Key.ALT.__enum__ = kha.Key;
kha.Key.CHAR = ["CHAR",6];
kha.Key.CHAR.__enum__ = kha.Key;
kha.Key.ESC = ["ESC",7];
kha.Key.ESC.__enum__ = kha.Key;
kha.Key.DEL = ["DEL",8];
kha.Key.DEL.__enum__ = kha.Key;
kha.Key.UP = ["UP",9];
kha.Key.UP.__enum__ = kha.Key;
kha.Key.DOWN = ["DOWN",10];
kha.Key.DOWN.__enum__ = kha.Key;
kha.Key.LEFT = ["LEFT",11];
kha.Key.LEFT.__enum__ = kha.Key;
kha.Key.RIGHT = ["RIGHT",12];
kha.Key.RIGHT.__enum__ = kha.Key;
kha.BakedChar = function() {
};
$hxClasses["kha.BakedChar"] = kha.BakedChar;
kha.BakedChar.__name__ = ["kha","BakedChar"];
kha.BakedChar.prototype = {
	__class__: kha.BakedChar
};
kha.AlignedQuad = function() {
};
$hxClasses["kha.AlignedQuad"] = kha.AlignedQuad;
kha.AlignedQuad.__name__ = ["kha","AlignedQuad"];
kha.AlignedQuad.prototype = {
	__class__: kha.AlignedQuad
};
kha.Kravur = function(name) {
	var blob = kha.Loader.the.getBlob(name);
	var size = blob.readS32LE();
	var ascent = blob.readS32LE();
	var descent = blob.readS32LE();
	var lineGap = blob.readS32LE();
	this.baseline = ascent;
	this.chars = new Array();
	var _g1 = 0;
	var _g = 224;
	while(_g1 < _g) {
		var i = _g1++;
		var $char = new kha.BakedChar();
		$char.x0 = blob.readS16LE();
		$char.y0 = blob.readS16LE();
		$char.x1 = blob.readS16LE();
		$char.y1 = blob.readS16LE();
		$char.xoff = blob.readF32LE();
		$char.yoff = blob.readF32LE() + this.baseline;
		$char.xadvance = blob.readF32LE();
		this.chars.push($char);
	}
	this.width = blob.readS32LE();
	this.height = blob.readS32LE();
	var w = this.width;
	var h = this.height;
	while(w > kha.Image.get_maxSize() || h > kha.Image.get_maxSize()) {
		blob.seek(blob.position + h * w);
		w = w / 2 | 0;
		h = h / 2 | 0;
	}
	this.texture = kha.Image.create(w,h,kha.graphics4.TextureFormat.L8);
	var bytes = this.texture.lock();
	var pos = 0;
	var _g2 = 0;
	while(_g2 < h) {
		var y = _g2++;
		var _g11 = 0;
		while(_g11 < w) {
			var x = _g11++;
			bytes.set(pos,blob.readU8());
			++pos;
		}
	}
	this.texture.unlock();
	blob.reset();
};
$hxClasses["kha.Kravur"] = kha.Kravur;
kha.Kravur.__name__ = ["kha","Kravur"];
kha.Kravur.__interfaces__ = [kha.Font];
kha.Kravur.get = function(name,style,size) {
	var key = name;
	if(style.getBold()) key += "#Bold";
	if(style.getItalic()) key += "#Italic";
	key += size + ".kravur";
	var kravur = kha.Kravur.fontCache.get(key);
	if(kravur == null) {
		kravur = new kha.Kravur(key);
		kravur.myName = name;
		kravur.myStyle = style;
		kravur.mySize = size;
		kha.Kravur.fontCache.set(key,kravur);
	}
	return kravur;
};
kha.Kravur.prototype = {
	getTexture: function() {
		return this.texture;
	}
	,getBakedQuad: function(char_index,xpos,ypos) {
		if(char_index >= this.chars.length) return null;
		var ipw = 1.0 / this.width;
		var iph = 1.0 / this.height;
		var b = this.chars[char_index];
		if(b == null) return null;
		var round_x = Math.round(xpos + b.xoff);
		var round_y = Math.round(ypos + b.yoff);
		var q = new kha.AlignedQuad();
		q.x0 = round_x;
		q.y0 = round_y;
		q.x1 = round_x + b.x1 - b.x0;
		q.y1 = round_y + b.y1 - b.y0;
		q.s0 = b.x0 * ipw;
		q.t0 = b.y0 * iph;
		q.s1 = b.x1 * ipw;
		q.t1 = b.y1 * iph;
		q.xadvance = b.xadvance;
		return q;
	}
	,getCharWidth: function(charIndex) {
		if(charIndex - 32 >= this.chars.length) return 0;
		return this.chars[charIndex - 32].xadvance;
	}
	,get_name: function() {
		return this.myName;
	}
	,get_style: function() {
		return this.myStyle;
	}
	,get_size: function() {
		return this.mySize;
	}
	,getHeight: function() {
		return this.mySize;
	}
	,charWidth: function(ch) {
		return this.getCharWidth(HxOverrides.cca(ch,0));
	}
	,charsWidth: function(ch,offset,length) {
		return this.stringWidth(HxOverrides.substr(ch,offset,length));
	}
	,stringWidth: function(str) {
		var width = 0;
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var c = _g1++;
			width += this.getCharWidth(HxOverrides.cca(str,c));
		}
		return width;
	}
	,getBaselinePosition: function() {
		return this.baseline;
	}
	,__class__: kha.Kravur
	,__properties__: {get_size:"get_size",get_style:"get_style",get_name:"get_name"}
};
kha.Loader = $hx_exports.kha.Loader = function() {
	this.basePath = ".";
	this.autoCleanupAssets = true;
	this.isQuitable = false;
	this.blobs = new haxe.ds.StringMap();
	this.images = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.musics = new haxe.ds.StringMap();
	this.videos = new haxe.ds.StringMap();
	this.assets = new haxe.ds.StringMap();
	this.shaders = new haxe.ds.StringMap();
	this.rooms = new haxe.ds.StringMap();
	this.enqueued = new Array();
	this.loadcount = 100;
	this.numberOfFiles = 100;
	this.width = -1;
	this.height = -1;
};
$hxClasses["kha.Loader"] = kha.Loader;
kha.Loader.__name__ = ["kha","Loader"];
kha.Loader.init = function(loader) {
	kha.Loader.the = loader;
};
kha.Loader.containsAsset = function(assetName,assetType,map) {
	var _g = 0;
	while(_g < map.length) {
		var asset = map[_g];
		++_g;
		if(asset.type == assetType && asset.name == assetName) return true;
	}
	return false;
};
kha.Loader.prototype = {
	getLoadPercentage: function() {
		return (this.loadcount - this.numberOfFiles) / this.loadcount * 100 | 0;
	}
	,getBlob: function(name) {
		return this.blobs.get(name);
	}
	,getImage: function(name) {
		if(!this.images.exists(name) && name != "") haxe.Log.trace("Could not find image " + name + ".",{ fileName : "Loader.hx", lineNumber : 59, className : "kha.Loader", methodName : "getImage"});
		return this.images.get(name);
	}
	,getMusic: function(name) {
		return this.musics.get(name);
	}
	,getSound: function(name) {
		if(name != "" && !this.sounds.exists(name)) haxe.Log.trace("Sound '" + name + "' not found",{ fileName : "Loader.hx", lineNumber : 70, className : "kha.Loader", methodName : "getSound"});
		return this.sounds.get(name);
	}
	,getVideo: function(name) {
		return this.videos.get(name);
	}
	,getShader: function(name) {
		return this.shaders.get(name);
	}
	,getAvailableBlobs: function() {
		return this.blobs.keys();
	}
	,isBlobAvailable: function(name) {
		return this.blobs.exists(name);
	}
	,getAvailableImages: function() {
		return this.images.keys();
	}
	,isImageAvailable: function(name) {
		return this.images.exists(name);
	}
	,getAvailableMusic: function() {
		return this.musics.keys();
	}
	,isMusicAvailable: function(name) {
		return this.musics.exists(name);
	}
	,getAvailableSounds: function() {
		return this.sounds.keys();
	}
	,isSoundAvailable: function(name) {
		return this.sounds.exists(name);
	}
	,getAvailableVideos: function() {
		return this.videos.keys();
	}
	,isVideoAvailable: function(name) {
		return this.videos.exists(name);
	}
	,enqueue: function(asset) {
		if(!Lambda.has(this.enqueued,asset)) this.enqueued.push(asset);
	}
	,removeImage: function(resources,resourceName) {
		var resource = resources.get(resourceName);
		resource.unload();
		resources.remove(resourceName);
	}
	,removeBlob: function(resources,resourceName) {
		var resource = resources.get(resourceName);
		resource.unload();
		resources.remove(resourceName);
	}
	,removeMusic: function(resources,resourceName) {
		var resource = resources.get(resourceName);
		resource.unload();
		resources.remove(resourceName);
	}
	,removeSound: function(resources,resourceName) {
		var resource = resources.get(resourceName);
		resource.unload();
		resources.remove(resourceName);
	}
	,removeVideo: function(resources,resourceName) {
		var resource = resources.get(resourceName);
		resource.unload();
		resources.remove(resourceName);
	}
	,cleanup: function() {
		var $it0 = this.images.keys();
		while( $it0.hasNext() ) {
			var imagename = $it0.next();
			if(!kha.Loader.containsAsset(imagename,"image",this.enqueued)) this.removeImage(this.images,imagename);
		}
		var $it1 = this.musics.keys();
		while( $it1.hasNext() ) {
			var musicname = $it1.next();
			if(!kha.Loader.containsAsset(musicname,"music",this.enqueued)) this.removeMusic(this.musics,musicname);
		}
		var $it2 = this.sounds.keys();
		while( $it2.hasNext() ) {
			var soundname = $it2.next();
			if(!kha.Loader.containsAsset(soundname,"sound",this.enqueued)) this.removeSound(this.sounds,soundname);
		}
		var $it3 = this.videos.keys();
		while( $it3.hasNext() ) {
			var videoname = $it3.next();
			if(!kha.Loader.containsAsset(videoname,"video",this.enqueued)) this.removeVideo(this.videos,videoname);
		}
		var $it4 = this.blobs.keys();
		while( $it4.hasNext() ) {
			var blobname = $it4.next();
			if(!kha.Loader.containsAsset(blobname,"blob",this.enqueued)) this.removeBlob(this.blobs,blobname);
		}
		this.enqueued = new Array();
	}
	,loadFiles: function(call,autoCleanup) {
		var _g3 = this;
		this.loadFinished = call;
		this.loadStarted(this.enqueued.length);
		if(this.enqueued.length > 0) {
			var _g1 = 0;
			var _g = this.enqueued.length;
			while(_g1 < _g) {
				var i = _g1++;
				var _g2 = this.enqueued[i].type;
				switch(_g2) {
				case "image":
					if(!this.images.exists(this.enqueued[i].name)) {
						var imageName = [this.enqueued[i].name];
						this.loadImage(this.enqueued[i],(function(imageName) {
							return function(image) {
								if(!_g3.images.exists(imageName[0])) {
									_g3.images.set(imageName[0],image);
									--_g3.numberOfFiles;
									_g3.checkComplete();
								}
							};
						})(imageName));
					} else this.loadDummyFile();
					break;
				case "music":
					if(!this.musics.exists(this.enqueued[i].name)) {
						var musicName = [this.enqueued[i].name];
						this.loadMusic(this.enqueued[i],(function(musicName) {
							return function(music) {
								if(!_g3.musics.exists(musicName[0])) {
									_g3.musics.set(musicName[0],music);
									--_g3.numberOfFiles;
									_g3.checkComplete();
								}
							};
						})(musicName));
					} else this.loadDummyFile();
					break;
				case "sound":
					if(!this.sounds.exists(this.enqueued[i].name)) {
						var soundName = [this.enqueued[i].name];
						this.loadSound(this.enqueued[i],(function(soundName) {
							return function(sound) {
								if(!_g3.sounds.exists(soundName[0])) {
									_g3.sounds.set(soundName[0],sound);
									--_g3.numberOfFiles;
									_g3.checkComplete();
								}
							};
						})(soundName));
					} else this.loadDummyFile();
					break;
				case "video":
					if(!this.videos.exists(this.enqueued[i].name)) {
						var videoName = [this.enqueued[i].name];
						this.loadVideo(this.enqueued[i],(function(videoName) {
							return function(video) {
								if(!_g3.videos.exists(videoName[0])) {
									_g3.videos.set(videoName[0],video);
									--_g3.numberOfFiles;
									_g3.checkComplete();
								}
							};
						})(videoName));
					} else this.loadDummyFile();
					break;
				case "blob":
					if(!this.blobs.exists(this.enqueued[i].name)) {
						var blobName = [this.enqueued[i].name];
						this.loadBlob(this.enqueued[i],(function(blobName) {
							return function(blob) {
								if(!_g3.blobs.exists(blobName[0])) {
									_g3.blobs.set(blobName[0],blob);
									--_g3.numberOfFiles;
									_g3.checkComplete();
								}
							};
						})(blobName));
					} else this.loadDummyFile();
					break;
				}
			}
		} else this.checkComplete();
		if(autoCleanup) this.cleanup();
	}
	,loadProject: function(call) {
		var _g = this;
		this.enqueue({ name : "project.kha", file : this.basePath + "/project.kha", type : "blob"});
		this.loadFiles(function() {
			_g.loadShaders(call);
		},false);
	}
	,loadShaders: function(call) {
		var _g2 = this;
		var $it0 = this.shaders.iterator();
		while( $it0.hasNext() ) {
			var shader = $it0.next();
			shader.unload();
		}
		this.shaders = new haxe.ds.StringMap();
		var project = this.parseProject();
		if(project.shaders != null && project.shaders.length > 0) {
			var shaders = project.shaders;
			var shaderCount = shaders.length;
			var _g1 = 0;
			var _g = shaders.length;
			while(_g1 < _g) {
				var i = _g1++;
				var shader1 = [shaders[i]];
				this.loadBlob(shader1[0],(function(shader1) {
					return function(blob) {
						if(!_g2.shaders.exists(shader1[0].name)) {
							_g2.shaders.set(shader1[0].name,blob);
							--shaderCount;
							if(shaderCount == 0) call();
						}
					};
				})(shader1));
			}
		} else call();
	}
	,loadRoomAssets: function(room) {
		var _g1 = 0;
		var _g = room.assets.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.enqueue(room.assets[i]);
		}
		if(room.parent != null) this.loadRoomAssets(room.parent);
	}
	,loadRoom: function(name,call) {
		this.loadRoomAssets(this.rooms.get(name));
		this.loadFiles(call,this.autoCleanupAssets);
	}
	,initProject: function() {
		var project = this.parseProject();
		this.name = project.game.name;
		this.width = project.game.width;
		this.height = project.game.height;
		var assets = project.assets;
		var _g1 = 0;
		var _g = assets.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.basePath != ".") assets[i].file = this.basePath + "/" + assets[i].file;
			this.assets.set(assets[i].id,assets[i]);
		}
		var rooms = project.rooms;
		var _g11 = 0;
		var _g2 = rooms.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var room = new kha.loader.Room(rooms[i1].id);
			var roomAssets = rooms[i1].assets;
			var _g3 = 0;
			var _g21 = roomAssets.length;
			while(_g3 < _g21) {
				var i2 = _g3++;
				room.assets.push(this.assets.get(roomAssets[i2]));
			}
			if(rooms[i1].parent != null) room.parent = new kha.loader.Room(rooms[i1].parent);
			this.rooms.set(rooms[i1].name,room);
		}
		var $it0 = this.rooms.iterator();
		while( $it0.hasNext() ) {
			var room1 = $it0.next();
			if(room1.parent != null) {
				var $it1 = this.rooms.iterator();
				while( $it1.hasNext() ) {
					var room2 = $it1.next();
					if(room2.id == room1.parent.id) {
						room1.parent = room2;
						break;
					}
				}
			}
		}
	}
	,parseProject: function() {
		return JSON.parse(this.getBlob("project.kha").toString());
	}
	,checkComplete: function() {
		if(this.numberOfFiles <= 0) {
			if(this.loadFinished != null) this.loadFinished();
		}
	}
	,loadDummyFile: function() {
		--this.numberOfFiles;
		this.checkComplete();
	}
	,loadStarted: function(numberOfFiles) {
		if(numberOfFiles > 0) {
			this.loadcount = numberOfFiles;
			this.numberOfFiles = numberOfFiles;
		} else {
			this.loadcount = 1;
			this.numberOfFiles = 0;
		}
	}
	,loadImage: function(desc,done) {
	}
	,loadBlob: function(desc,done) {
	}
	,loadSound: function(desc,done) {
	}
	,loadMusic: function(desc,done) {
	}
	,loadVideo: function(desc,done) {
	}
	,loadFont: function(name,style,size) {
		return null;
	}
	,loadURL: function(url) {
	}
	,setNormalCursor: function() {
	}
	,setHandCursor: function() {
	}
	,setCursorBusy: function(busy) {
	}
	,showKeyboard: function() {
	}
	,hideKeyboard: function() {
	}
	,quit: function() {
	}
	,__class__: kha.Loader
};
kha.LoadingScreen = function() {
	kha.Game.call(this,"Loading",false);
};
$hxClasses["kha.LoadingScreen"] = kha.LoadingScreen;
kha.LoadingScreen.__name__ = ["kha","LoadingScreen"];
kha.LoadingScreen.__super__ = kha.Game;
kha.LoadingScreen.prototype = $extend(kha.Game.prototype,{
	render: function(frame) {
		this.startRender(frame);
		if(kha.Loader.the != null) {
			frame.get_g2().set_color(kha._Color.Color_Impl_.fromBytes(0,0,255));
			frame.get_g2().fillRect(frame.get_width() / 4,frame.get_height() / 2 - 10,kha.Loader.the.getLoadPercentage() * frame.get_width() / 2 / 100,20);
			frame.get_g2().set_color(kha._Color.Color_Impl_.fromBytes(28,28,28));
			frame.get_g2().drawRect(frame.get_width() / 4,frame.get_height() / 2 - 10,frame.get_width() / 2,20);
		}
		this.endRender(frame);
	}
	,update: function() {
	}
	,__class__: kha.LoadingScreen
});
kha.Media = function() {
};
$hxClasses["kha.Media"] = kha.Media;
kha.Media.__name__ = ["kha","Media"];
kha.Media.__interfaces__ = [kha.Resource];
kha.Media.prototype = {
	play: function(loop) {
		if(loop == null) loop = false;
	}
	,pause: function() {
	}
	,stop: function() {
	}
	,getLength: function() {
		return 0;
	}
	,getCurrentPos: function() {
		return 0;
	}
	,getVolume: function() {
		return 0;
	}
	,setVolume: function(volume) {
	}
	,isFinished: function() {
		return this.getCurrentPos() >= this.getLength();
	}
	,unload: function() {
	}
	,__class__: kha.Media
};
kha.Mouse = function() {
	this.forceSystem = false;
	this.hidden = false;
	this.cursors = new Array();
	this.cursorIndex = -1;
};
$hxClasses["kha.Mouse"] = kha.Mouse;
kha.Mouse.__name__ = ["kha","Mouse"];
kha.Mouse.prototype = {
	show: function() {
		this.hidden = false;
		if(this.cursorIndex < 0 || this.forceSystem) this.showSystemCursor();
	}
	,hide: function() {
		this.hidden = true;
		this.hideSystemCursor();
	}
	,hideSystemCursor: function() {
		throw "Not implemented";
	}
	,showSystemCursor: function() {
		throw "Not implemented";
	}
	,forceSystemCursor: function(force) {
		this.forceSystem = force;
		if(this.forceSystem) {
			if(!this.hidden) this.showSystemCursor();
		} else if(this.cursorIndex >= 0) this.hideSystemCursor();
	}
	,pushCursor: function(cursorImage) {
		++this.cursorIndex;
		this.cursors[this.cursorIndex] = cursorImage;
		if(!this.forceSystem) this.hideSystemCursor();
	}
	,popCursor: function() {
		--this.cursorIndex;
		if(this.cursorIndex <= -1) {
			this.cursorIndex = -1;
			if(!this.hidden) this.showSystemCursor();
		}
	}
	,render: function(g) {
		if(this.cursorIndex >= 0 && !this.hidden) this.cursors[this.cursorIndex].render(g,kha.Starter.mouseX,kha.Starter.mouseY);
	}
	,update: function() {
		if(this.cursorIndex >= 0) this.cursors[this.cursorIndex].update(kha.Starter.mouseX,kha.Starter.mouseY);
	}
	,__class__: kha.Mouse
};
kha.Music = function() {
	kha.Media.call(this);
};
$hxClasses["kha.Music"] = kha.Music;
kha.Music.__name__ = ["kha","Music"];
kha.Music.__super__ = kha.Media;
kha.Music.prototype = $extend(kha.Media.prototype,{
	__class__: kha.Music
});
kha.Rectangle = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["kha.Rectangle"] = kha.Rectangle;
kha.Rectangle.__name__ = ["kha","Rectangle"];
kha.Rectangle.prototype = {
	setPos: function(x,y) {
		this.x = x;
		this.y = y;
	}
	,moveX: function(xdelta) {
		this.x += xdelta;
	}
	,moveY: function(ydelta) {
		this.y += ydelta;
	}
	,collision: function(r) {
		var a;
		var b;
		if(this.x < r.x) a = r.x < this.x + this.width; else a = this.x < r.x + r.width;
		if(this.y < r.y) b = r.y < this.y + this.height; else b = this.y < r.y + r.height;
		return a && b;
	}
	,__class__: kha.Rectangle
};
kha.Rotation = function(center,angle) {
	this.center = center;
	this.angle = angle;
};
$hxClasses["kha.Rotation"] = kha.Rotation;
kha.Rotation.__name__ = ["kha","Rotation"];
kha.Rotation.prototype = {
	__class__: kha.Rotation
};
kha.Scaler = function() { };
$hxClasses["kha.Scaler"] = kha.Scaler;
kha.Scaler.__name__ = ["kha","Scaler"];
kha.Scaler.scaleFactor = function(source,destination,rotation) {
	if(rotation == kha.ScreenRotation.RotationNone || rotation == kha.ScreenRotation.Rotation180) {
		if(source.get_width() / source.get_height() > destination.get_width() / destination.get_height()) return destination.get_width() / source.get_width(); else return destination.get_height() / source.get_height();
	} else if(rotation == kha.ScreenRotation.Rotation90) {
		if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) return destination.get_height() / source.get_width(); else return destination.get_width() / source.get_height();
	} else if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) return destination.get_height() / source.get_width(); else return destination.get_width() / source.get_height();
};
kha.Scaler.targetRect = function(source,destination,rotation) {
	var scalex;
	var scaley;
	var scalew;
	var scaleh;
	if(rotation == kha.ScreenRotation.RotationNone || rotation == kha.ScreenRotation.Rotation180) {
		if(source.get_width() / source.get_height() > destination.get_width() / destination.get_height()) {
			var scale = destination.get_width() / source.get_width();
			scalew = source.get_width() * scale;
			scaleh = source.get_height() * scale;
			scalex = 0;
			scaley = (destination.get_height() - scaleh) * 0.5;
		} else {
			var scale1 = destination.get_height() / source.get_height();
			scalew = source.get_width() * scale1;
			scaleh = source.get_height() * scale1;
			scalex = (destination.get_width() - scalew) * 0.5;
			scaley = 0;
		}
	} else if(rotation == kha.ScreenRotation.Rotation90) {
		if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) {
			var scale2 = destination.get_height() / source.get_width();
			scalew = source.get_width() * scale2;
			scaleh = source.get_height() * scale2;
			scalex = (destination.get_width() - scaleh) * 0.5 + scaleh;
			scaley = 0;
		} else {
			var scale3 = destination.get_width() / source.get_height();
			scalew = source.get_width() * scale3;
			scaleh = source.get_height() * scale3;
			scalex = scaleh;
			scaley = (destination.get_height() - scalew) * 0.5;
		}
	} else if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) {
		var scale4 = destination.get_height() / source.get_width();
		scalew = source.get_width() * scale4;
		scaleh = source.get_height() * scale4;
		scalex = (destination.get_width() - scaleh) * 0.5;
		scaley = scalew;
	} else {
		var scale5 = destination.get_width() / source.get_height();
		scalew = source.get_width() * scale5;
		scaleh = source.get_height() * scale5;
		scalex = 0;
		scaley = (destination.get_height() - scalew) * 0.5 + scalew;
	}
	return new kha.Rectangle(scalex,scaley,scalew,scaleh);
};
kha.Scaler.transformX = function(x,y,source,destination,rotation) {
	switch(rotation[1]) {
	case 0:
		return Std["int"]((x - kha.Scaler.targetRect(source,destination,rotation).x) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 1:
		return Std["int"]((y - kha.Scaler.targetRect(source,destination,rotation).y) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 2:
		return Std["int"]((kha.Sys.get_pixelWidth() - x - kha.Scaler.targetRect(source,destination,rotation).x) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 3:
		return Std["int"]((kha.Sys.get_pixelHeight() - y - (kha.Sys.get_pixelHeight() - kha.Scaler.targetRect(source,destination,rotation).y)) / kha.Scaler.scaleFactor(source,destination,rotation));
	}
};
kha.Scaler.transformY = function(x,y,source,destination,rotation) {
	var _g = kha.Sys.screenRotation;
	switch(_g[1]) {
	case 0:
		return Std["int"]((y - kha.Scaler.targetRect(source,destination,rotation).y) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 1:
		return Std["int"]((kha.Scaler.targetRect(source,destination,rotation).x - x) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 2:
		return Std["int"]((kha.Scaler.targetRect(source,destination,rotation).y + kha.Scaler.targetRect(source,destination,rotation).height - y) / kha.Scaler.scaleFactor(source,destination,rotation));
	case 3:
		return Std["int"]((x - kha.Scaler.targetRect(source,destination,rotation).x) / kha.Scaler.scaleFactor(source,destination,rotation));
	}
};
kha.Scaler.scale = function(source,destination,rotation) {
	var scalex;
	var scaley;
	var scalew;
	var scaleh;
	if(rotation == kha.ScreenRotation.RotationNone || rotation == kha.ScreenRotation.Rotation180) {
		if(source.get_width() / source.get_height() > destination.get_width() / destination.get_height()) {
			var scale = destination.get_width() / source.get_width();
			scalew = source.get_width() * scale;
			scaleh = source.get_height() * scale;
			scalex = 0;
			scaley = (destination.get_height() - scaleh) * 0.5;
		} else {
			var scale1 = destination.get_height() / source.get_height();
			scalew = source.get_width() * scale1;
			scaleh = source.get_height() * scale1;
			scalex = (destination.get_width() - scalew) * 0.5;
			scaley = 0;
		}
	} else if(rotation == kha.ScreenRotation.Rotation90) {
		if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) {
			var scale2 = destination.get_height() / source.get_width();
			scalew = source.get_width() * scale2;
			scaleh = source.get_height() * scale2;
			scalex = (destination.get_width() - scaleh) * 0.5 + scaleh;
			scaley = 0;
		} else {
			var scale3 = destination.get_width() / source.get_height();
			scalew = source.get_width() * scale3;
			scaleh = source.get_height() * scale3;
			scalex = scaleh;
			scaley = (destination.get_height() - scalew) * 0.5;
		}
	} else if(source.get_width() / source.get_height() > destination.get_height() / destination.get_width()) {
		var scale4 = destination.get_height() / source.get_width();
		scalew = source.get_width() * scale4;
		scaleh = source.get_height() * scale4;
		scalex = (destination.get_width() - scaleh) * 0.5;
		scaley = scalew;
	} else {
		var scale5 = destination.get_width() / source.get_height();
		scalew = source.get_width() * scale5;
		scaleh = source.get_height() * scale5;
		scalex = 0;
		scaley = (destination.get_height() - scalew) * 0.5 + scalew;
	}
	destination.get_g2().set_color(kha._Color.Color_Impl_.White);
	destination.get_g2().set_opacity(1);
	switch(rotation[1]) {
	case 0:
		if(Std["is"](destination.get_g2(),kha.graphics4.Graphics2)) {
			var imagePainter = (js.Boot.__cast(destination.get_g2() , kha.graphics4.Graphics2)).imagePainter;
			if(destination.get_g4().renderTargetsInvertedY()) {
				imagePainter.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),0,kha.Sys.get_pixelHeight(),0.1,1000));
				destination.get_g2().drawScaledSubImage(source,0,source.get_realHeight() - source.get_height(),source.get_width(),source.get_height(),scalex,scaley,scalew,scaleh);
			} else {
				imagePainter.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
			}
			imagePainter.end();
			imagePainter.setProjection(kha.math.Matrix4.orthogonalProjection(0,source.get_realWidth(),source.get_realHeight(),0,0.1,1000));
		} else destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
		break;
	case 1:
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,scalex,0,1,scaley,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(Math.PI / 2)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-scalex,0,1,-scaley,0,0,1])));
		if(Std["is"](destination.get_g2(),kha.graphics4.Graphics2)) {
			var imagePainter1 = (js.Boot.__cast(destination.get_g2() , kha.graphics4.Graphics2)).imagePainter;
			if(destination.get_g4().renderTargetsInvertedY()) {
				imagePainter1.setProjection(kha.math.Matrix4.orthogonalProjection(kha.Sys.get_pixelWidth(),0,kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledSubImage(source,0,source.get_realHeight() - source.get_height(),source.get_width(),source.get_height(),scalex,scaley,scalew,scaleh);
			} else {
				imagePainter1.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
			}
			imagePainter1.end();
			imagePainter1.setProjection(kha.math.Matrix4.orthogonalProjection(0,source.get_realWidth(),source.get_realHeight(),0,0.1,1000));
		} else destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]));
		break;
	case 2:
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,scalex + scalew / 2,0,1,scaley + scaleh / 2,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(Math.PI)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-scalex - scalew / 2,0,1,-scaley - scaleh / 2,0,0,1])));
		if(Std["is"](destination.get_g2(),kha.graphics4.Graphics2)) {
			var imagePainter2 = (js.Boot.__cast(destination.get_g2() , kha.graphics4.Graphics2)).imagePainter;
			if(destination.get_g4().renderTargetsInvertedY()) {
				imagePainter2.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),0,kha.Sys.get_pixelHeight(),0.1,1000));
				destination.get_g2().drawScaledSubImage(source,0,source.get_realHeight() - source.get_height(),source.get_width(),source.get_height(),scalex,scaley,scalew,scaleh);
			} else {
				imagePainter2.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
			}
			imagePainter2.end();
			imagePainter2.setProjection(kha.math.Matrix4.orthogonalProjection(0,source.get_realWidth(),source.get_realHeight(),0,0.1,1000));
		} else destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]));
		break;
	case 3:
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,scalex,0,1,scaley,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(Math.PI * 3 / 2)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-scalex,0,1,-scaley,0,0,1])));
		if(Std["is"](destination.get_g2(),kha.graphics4.Graphics2)) {
			var imagePainter3 = (js.Boot.__cast(destination.get_g2() , kha.graphics4.Graphics2)).imagePainter;
			if(destination.get_g4().renderTargetsInvertedY()) {
				imagePainter3.setProjection(kha.math.Matrix4.orthogonalProjection(kha.Sys.get_pixelWidth(),0,kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledSubImage(source,0,source.get_realHeight() - source.get_height(),source.get_width(),source.get_height(),scalex,scaley,scalew,scaleh);
			} else {
				imagePainter3.setProjection(kha.math.Matrix4.orthogonalProjection(0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight(),0,0.1,1000));
				destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
			}
			imagePainter3.end();
			imagePainter3.setProjection(kha.math.Matrix4.orthogonalProjection(0,source.get_realWidth(),source.get_realHeight(),0,0.1,1000));
		} else destination.get_g2().drawScaledImage(source,scalex,scaley,scalew,scaleh);
		destination.get_g2().set_transformation(kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]));
		break;
	}
};
kha.Scene = function() {
	this.dirtySprites = false;
	this.sprites = new Array();
	this.backgrounds = new Array();
	this.foregrounds = new Array();
	this.backgroundSpeeds = new Array();
	this.foregroundSpeeds = new Array();
	this.backgroundColor = kha._Color.Color_Impl_.fromBytes(0,0,0);
	this.set_camx(0);
	this.set_camy(0);
};
$hxClasses["kha.Scene"] = kha.Scene;
kha.Scene.__name__ = ["kha","Scene"];
kha.Scene.__properties__ = {get_the:"get_the"}
kha.Scene.get_the = function() {
	if(kha.Scene.instance == null) kha.Scene.instance = new kha.Scene();
	return kha.Scene.instance;
};
kha.Scene.prototype = {
	clear: function() {
		this.collisionLayer = null;
		this.clearTilemaps();
		this.sprites = new Array();
	}
	,clearTilemaps: function() {
		this.backgrounds = new Array();
		this.foregrounds = new Array();
		this.backgroundSpeeds = new Array();
		this.foregroundSpeeds = new Array();
	}
	,setBackgroundColor: function(color) {
		this.backgroundColor = color;
	}
	,addBackgroundTilemap: function(tilemap,speed) {
		this.backgrounds.push(tilemap);
		this.backgroundSpeeds.push(speed);
	}
	,addForegroundTilemap: function(tilemap,speed) {
		this.foregrounds.push(tilemap);
		this.foregroundSpeeds.push(speed);
	}
	,setColissionMap: function(tilemap) {
		this.collisionLayer = new kha.CollisionLayer(tilemap);
	}
	,addHero: function(sprite) {
		sprite.removed = false;
		if(this.collisionLayer != null) this.collisionLayer.addHero(sprite);
		this.sprites.push(sprite);
	}
	,addEnemy: function(sprite) {
		sprite.removed = false;
		if(this.collisionLayer != null) this.collisionLayer.addEnemy(sprite);
		this.sprites.push(sprite);
	}
	,addProjectile: function(sprite) {
		sprite.removed = false;
		if(this.collisionLayer != null) this.collisionLayer.addProjectile(sprite);
		this.sprites.push(sprite);
	}
	,addOther: function(sprite) {
		sprite.removed = false;
		if(this.collisionLayer != null) this.collisionLayer.addOther(sprite);
		this.sprites.push(sprite);
	}
	,removeHero: function(sprite) {
		sprite.removed = true;
		this.dirtySprites = true;
	}
	,removeEnemy: function(sprite) {
		sprite.removed = true;
		this.dirtySprites = true;
	}
	,removeProjectile: function(sprite) {
		sprite.removed = true;
		this.dirtySprites = true;
	}
	,removeOther: function(sprite) {
		sprite.removed = true;
		this.dirtySprites = true;
	}
	,getHero: function(index) {
		if(this.collisionLayer == null) return null; else return this.collisionLayer.getHero(index);
	}
	,getEnemy: function(index) {
		if(this.collisionLayer == null) return null; else return this.collisionLayer.getEnemy(index);
	}
	,getProjectile: function(index) {
		if(this.collisionLayer == null) return null; else return this.collisionLayer.getProjectile(index);
	}
	,getOther: function(index) {
		if(this.collisionLayer == null) return null; else return this.collisionLayer.getOther(index);
	}
	,countHeroes: function() {
		if(this.collisionLayer == null) return 0; else return this.collisionLayer.countHeroes();
	}
	,countEnemies: function() {
		if(this.collisionLayer == null) return 0; else return this.collisionLayer.countEnemies();
	}
	,countProjectiles: function() {
		if(this.collisionLayer == null) return 0; else return this.collisionLayer.countProjectiles();
	}
	,countOthers: function() {
		if(this.collisionLayer == null) return 0; else return this.collisionLayer.countOthers();
	}
	,set_camx: function(newcamx) {
		this.camx = newcamx;
		if(this.collisionLayer != null) {
			this.screenOffsetX = Std["int"](Math.min(Math.max(0,this.camx - kha.Game.the.width / 2),this.collisionLayer.getMap().getWidth() * this.collisionLayer.getMap().getTileset().TILE_WIDTH - kha.Game.the.width));
			if(this.getWidth() < kha.Game.the.width) this.screenOffsetX = 0;
		} else this.screenOffsetX = this.camx;
		return this.camx;
	}
	,set_camy: function(newcamy) {
		this.camy = newcamy;
		if(this.collisionLayer != null) {
			this.screenOffsetY = Std["int"](Math.min(Math.max(0,this.camy - kha.Game.the.height / 2),this.collisionLayer.getMap().getHeight() * this.collisionLayer.getMap().getTileset().TILE_HEIGHT - kha.Game.the.height));
			if(this.getHeight() < kha.Game.the.height) this.screenOffsetY = 0;
		} else this.screenOffsetY = this.camy;
		return this.camy;
	}
	,sort: function(sprites) {
		if(sprites.length == 0) return;
		haxe.ds.ArraySort.sort(sprites,function(arg0,arg1) {
			if(arg0.x < arg1.x) return -1; else if(arg0.x == arg1.x) return 0; else return 1;
		});
	}
	,collidesPoint: function(point) {
		return this.collisionLayer != null && this.collisionLayer.collidesPoint(point);
	}
	,collidesSprite: function(sprite) {
		return this.collisionLayer != null && this.collisionLayer.collidesSprite(sprite);
	}
	,cleanSprites: function() {
		if(!this.dirtySprites) return;
		var found = true;
		while(found) {
			found = false;
			var _g = 0;
			var _g1 = this.sprites;
			while(_g < _g1.length) {
				var sprite = _g1[_g];
				++_g;
				if(sprite.removed) {
					HxOverrides.remove(this.sprites,sprite);
					found = true;
				}
			}
		}
		if(this.collisionLayer != null) this.collisionLayer.cleanSprites();
	}
	,update: function() {
		this.cleanSprites();
		if(this.collisionLayer != null) this.collisionLayer.advance(this.screenOffsetX,this.screenOffsetX + kha.Game.the.width);
		this.cleanSprites();
		var _g = 0;
		var _g1 = this.sprites;
		while(_g < _g1.length) {
			var sprite = _g1[_g];
			++_g;
			sprite.update();
		}
		this.cleanSprites();
	}
	,render: function(g) {
		g.set_transformation(kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]));
		g.set_color(this.backgroundColor);
		g.clear();
		var _g1 = 0;
		var _g = this.backgrounds.length;
		while(_g1 < _g) {
			var i = _g1++;
			g.set_transformation((function($this) {
				var $r;
				var x = Math.round(-$this.screenOffsetX * $this.backgroundSpeeds[i]);
				var y = Math.round(-$this.screenOffsetY * $this.backgroundSpeeds[i]);
				$r = kha.math._Matrix3.Matrix3_Impl_._new([1,0,x,0,1,y,0,0,1]);
				return $r;
			}(this)));
			this.backgrounds[i].render(g,this.screenOffsetX * this.backgroundSpeeds[i] | 0,this.screenOffsetY * this.backgroundSpeeds[i] | 0,kha.Game.the.width,kha.Game.the.height);
		}
		g.set_transformation(kha.math._Matrix3.Matrix3_Impl_._new([1,0,-this.screenOffsetX,0,1,-this.screenOffsetY,0,0,1]));
		this.sort(this.sprites);
		var _g2 = 0;
		while(_g2 < 10) {
			var z = _g2++;
			var i1 = 0;
			while(i1 < this.sprites.length) {
				if(this.sprites[i1].x + this.sprites[i1].get_width() > this.screenOffsetX) break;
				++i1;
			}
			while(i1 < this.sprites.length) {
				if(this.sprites[i1].x > this.screenOffsetX + kha.Game.the.width) break;
				if(i1 < this.sprites.length && this.sprites[i1].z == z) this.sprites[i1].render(g);
				++i1;
			}
		}
		var _g11 = 0;
		var _g3 = this.foregrounds.length;
		while(_g11 < _g3) {
			var i2 = _g11++;
			g.set_transformation((function($this) {
				var $r;
				var x1 = Math.round(-$this.screenOffsetX * $this.foregroundSpeeds[i2]);
				var y1 = Math.round(-$this.screenOffsetY * $this.foregroundSpeeds[i2]);
				$r = kha.math._Matrix3.Matrix3_Impl_._new([1,0,x1,0,1,y1,0,0,1]);
				return $r;
			}(this)));
			this.foregrounds[i2].render(g,this.screenOffsetX * this.foregroundSpeeds[i2] | 0,this.screenOffsetY * this.foregroundSpeeds[i2] | 0,kha.Game.the.width,kha.Game.the.height);
		}
	}
	,getWidth: function() {
		if(this.collisionLayer != null) return this.collisionLayer.getMap().getWidth() * this.collisionLayer.getMap().getTileset().TILE_WIDTH; else return 0;
	}
	,getHeight: function() {
		if(this.collisionLayer != null) return this.collisionLayer.getMap().getHeight() * this.collisionLayer.getMap().getTileset().TILE_HEIGHT; else return 0;
	}
	,getHeroesBelowPoint: function(px,py) {
		var heroes = new Array();
		var count = this.collisionLayer.countHeroes();
		var _g1 = 1;
		var _g = count + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var hero = this.collisionLayer.getHero(count - i);
			if(hero.x < px && px < hero.x + hero.get_width() && hero.y < py && py < hero.y + hero.get_height()) heroes.push(hero);
		}
		haxe.ds.ArraySort.sort(heroes,function(h1,h2) {
			if(h1.z == h2.z) return 0; else if(h1.z < h2.z) return 1; else return -1;
		});
		return heroes;
	}
	,getSpritesBelowPoint: function(px,py) {
		var sprites = new Array();
		var _g1 = 0;
		var _g = this.sprites.length;
		while(_g1 < _g) {
			var i = _g1++;
			var sprite = this.sprites[i];
			if(sprite.x + sprite.get_width() < px) continue;
			if(sprite.x > px) break;
			var rect = sprite.collisionRect();
			if(rect.x < px && px < rect.x + rect.width && rect.y < py && py < rect.y + rect.height) sprites.push(sprite);
		}
		haxe.ds.ArraySort.sort(sprites,function(h1,h2) {
			if(h1.z == h2.z) return 0; else if(h1.z < h2.z) return 1; else return -1;
		});
		return sprites;
	}
	,__class__: kha.Scene
	,__properties__: {set_camy:"set_camy",set_camx:"set_camx"}
};
kha.TimeTask = function() {
};
$hxClasses["kha.TimeTask"] = kha.TimeTask;
kha.TimeTask.__name__ = ["kha","TimeTask"];
kha.TimeTask.prototype = {
	elapsed: function() {
		return kha.Scheduler.time() - this.last;
	}
	,remaining: function() {
		return this.next - kha.Scheduler.time();
	}
	,__class__: kha.TimeTask
};
kha.FrameTask = function(task,priority,id) {
	this.task = task;
	this.priority = priority;
	this.id = id;
	this.active = true;
};
$hxClasses["kha.FrameTask"] = kha.FrameTask;
kha.FrameTask.__name__ = ["kha","FrameTask"];
kha.FrameTask.prototype = {
	__class__: kha.FrameTask
};
kha.Scheduler = function() { };
$hxClasses["kha.Scheduler"] = kha.Scheduler;
kha.Scheduler.__name__ = ["kha","Scheduler"];
kha.Scheduler.__properties__ = {set_deltaScale:"set_deltaScale",get_deltaScale:"get_deltaScale",get_deltaTime:"get_deltaTime"}
kha.Scheduler.init = function() {
	kha.Scheduler.difs = new Array();
	var _g1 = 0;
	var _g = kha.Scheduler.DIF_COUNT - 1;
	while(_g1 < _g) {
		var i = _g1++;
		kha.Scheduler.difs[i] = 0;
	}
	kha.Scheduler.stopped = true;
	kha.Scheduler.halted_count = 0;
	kha.Scheduler.frame_tasks_sorted = true;
	kha.Scheduler.current = 0;
	kha.Scheduler.lastTime = 0;
	kha.Scheduler.currentFrameTaskId = 0;
	kha.Scheduler.currentTimeTaskId = 0;
	kha.Scheduler.currentGroupId = 0;
	kha.Scheduler.timeTasks = new Array();
	kha.Scheduler.frameTasks = new Array();
	kha.Configuration.schedulerInitialized();
};
kha.Scheduler.start = function() {
	kha.Scheduler.vsync = kha.Sys.vsynced();
	var hz = kha.Sys.refreshRate();
	if(hz >= 57 && hz <= 63) hz = 60;
	kha.Scheduler.onedifhz = 1.0 / hz;
	kha.Scheduler.stopped = false;
	kha.Scheduler.lastTime = kha.Sys.getTime();
	var _g1 = 0;
	var _g = kha.Scheduler.DIF_COUNT - 1;
	while(_g1 < _g) {
		var i = _g1++;
		kha.Scheduler.difs[i] = 0;
	}
};
kha.Scheduler.stop = function() {
	kha.Scheduler.stopped = true;
};
kha.Scheduler.isStopped = function() {
	return kha.Scheduler.stopped;
};
kha.Scheduler.executeFrame = function() {
	kha.Sys.get_mouse().update();
	var now = kha.Sys.getTime();
	kha.Scheduler.delta = now - kha.Scheduler.lastTime;
	kha.Scheduler.lastTime = now;
	var frameEnd = kha.Scheduler.current;
	if(kha.Scheduler.delta < 0 || kha.Scheduler.stopped) return;
	if(kha.Scheduler.halted_count > 0) {
	} else if(kha.Scheduler.delta > kha.Scheduler.maxframetime) frameEnd += kha.Scheduler.maxframetime; else if(kha.Scheduler.vsync) {
		var realdif = kha.Scheduler.onedifhz;
		while(realdif < kha.Scheduler.delta - kha.Scheduler.onedifhz) realdif += kha.Scheduler.onedifhz;
		kha.Scheduler.delta = realdif;
		var _g1 = 0;
		var _g = kha.Scheduler.DIF_COUNT - 2;
		while(_g1 < _g) {
			var i = _g1++;
			kha.Scheduler.delta += kha.Scheduler.difs[i];
			kha.Scheduler.difs[i] = kha.Scheduler.difs[i + 1];
		}
		kha.Scheduler.delta += kha.Scheduler.difs[kha.Scheduler.DIF_COUNT - 2];
		kha.Scheduler.delta /= kha.Scheduler.DIF_COUNT;
		kha.Scheduler.difs[kha.Scheduler.DIF_COUNT - 2] = realdif;
		frameEnd += kha.Scheduler.delta;
	} else {
		var interpolated_delta = kha.Scheduler.delta;
		var _g11 = 0;
		var _g2 = kha.Scheduler.DIF_COUNT - 2;
		while(_g11 < _g2) {
			var i1 = _g11++;
			interpolated_delta += kha.Scheduler.difs[i1];
			kha.Scheduler.difs[i1] = kha.Scheduler.difs[i1 + 1];
		}
		interpolated_delta += kha.Scheduler.difs[kha.Scheduler.DIF_COUNT - 2];
		interpolated_delta /= kha.Scheduler.DIF_COUNT;
		kha.Scheduler.difs[kha.Scheduler.DIF_COUNT - 2] = kha.Scheduler.delta;
		frameEnd += interpolated_delta;
	}
	while(kha.Scheduler.timeTasks.length > 0 && kha.Scheduler.timeTasks[0].next <= frameEnd) {
		var t = kha.Scheduler.timeTasks[0];
		kha.Scheduler.current = t.next;
		t.last = t.next;
		t.next += t.period;
		HxOverrides.remove(kha.Scheduler.timeTasks,t);
		if(t.active && t.task()) {
			if(t.period > 0 && (t.duration == 0 || t.duration >= t.start + t.next)) kha.Scheduler.insertSorted(kha.Scheduler.timeTasks,t);
		} else t.active = false;
	}
	kha.Scheduler.current = frameEnd;
	while(true) {
		var _g3 = 0;
		var _g12 = kha.Scheduler.timeTasks;
		while(_g3 < _g12.length) {
			var timeTask = _g12[_g3];
			++_g3;
			if(!timeTask.active) {
				HxOverrides.remove(kha.Scheduler.timeTasks,timeTask);
				break;
			}
		}
		break;
	}
	kha.Scheduler.sortFrameTasks();
	var _g4 = 0;
	var _g13 = kha.Scheduler.frameTasks;
	while(_g4 < _g13.length) {
		var frameTask = _g13[_g4];
		++_g4;
		if(!frameTask.task()) frameTask.active = false;
	}
	while(true) {
		var _g5 = 0;
		var _g14 = kha.Scheduler.frameTasks;
		while(_g5 < _g14.length) {
			var frameTask1 = _g14[_g5];
			++_g5;
			if(!frameTask1.active) {
				HxOverrides.remove(kha.Scheduler.frameTasks,frameTask1);
				break;
			}
		}
		break;
	}
};
kha.Scheduler.time = function() {
	return kha.Scheduler.current;
};
kha.Scheduler.addBreakableFrameTask = function(task,priority) {
	kha.Scheduler.frameTasks.push(new kha.FrameTask(task,priority,++kha.Scheduler.currentFrameTaskId));
	kha.Scheduler.frame_tasks_sorted = false;
	return kha.Scheduler.currentFrameTaskId;
};
kha.Scheduler.addFrameTask = function(task,priority) {
	return kha.Scheduler.addBreakableFrameTask(function() {
		task();
		return true;
	},priority);
};
kha.Scheduler.removeFrameTask = function(id) {
	var _g = 0;
	var _g1 = kha.Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(frameTask.id == id) {
			frameTask.active = false;
			HxOverrides.remove(kha.Scheduler.frameTasks,frameTask);
			break;
		}
	}
};
kha.Scheduler.generateGroupId = function() {
	return ++kha.Scheduler.currentGroupId;
};
kha.Scheduler.addBreakableTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) duration = 0;
	if(period == null) period = 0;
	var t = new kha.TimeTask();
	t.active = true;
	t.task = task;
	t.id = ++kha.Scheduler.currentTimeTaskId;
	t.groupId = groupId;
	t.start = kha.Scheduler.current + start;
	t.period = 0;
	if(period != 0) t.period = period;
	t.duration = 0;
	if(duration != 0) t.duration = t.start + duration;
	t.next = t.start;
	t.last = kha.Scheduler.current;
	kha.Scheduler.insertSorted(kha.Scheduler.timeTasks,t);
	return t.id;
};
kha.Scheduler.addTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) duration = 0;
	if(period == null) period = 0;
	return kha.Scheduler.addBreakableTimeTaskToGroup(groupId,function() {
		task();
		return true;
	},start,period,duration);
};
kha.Scheduler.addBreakableTimeTask = function(task,start,period,duration) {
	if(duration == null) duration = 0;
	if(period == null) period = 0;
	return kha.Scheduler.addBreakableTimeTaskToGroup(0,task,start,period,duration);
};
kha.Scheduler.addTimeTask = function(task,start,period,duration) {
	if(duration == null) duration = 0;
	if(period == null) period = 0;
	return kha.Scheduler.addTimeTaskToGroup(0,task,start,period,duration);
};
kha.Scheduler.getTimeTask = function(id) {
	var _g = 0;
	var _g1 = kha.Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.id == id) return timeTask;
	}
	return null;
};
kha.Scheduler.removeTimeTask = function(id) {
	var timeTask = kha.Scheduler.getTimeTask(id);
	if(timeTask != null) {
		timeTask.active = false;
		HxOverrides.remove(kha.Scheduler.timeTasks,timeTask);
	}
};
kha.Scheduler.removeTimeTasks = function(groupId) {
	while(true) {
		var _g = 0;
		var _g1 = kha.Scheduler.timeTasks;
		while(_g < _g1.length) {
			var timeTask = _g1[_g];
			++_g;
			if(timeTask.groupId == groupId) {
				timeTask.active = false;
				HxOverrides.remove(kha.Scheduler.timeTasks,timeTask);
				break;
			}
		}
		break;
	}
};
kha.Scheduler.numTasksInSchedule = function() {
	return kha.Scheduler.timeTasks.length + kha.Scheduler.frameTasks.length;
};
kha.Scheduler.insertSorted = function(list,task) {
	var _g1 = 0;
	var _g = list.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(list[i].next > task.next) {
			list.splice(i,0,task);
			return;
		}
	}
	list.push(task);
};
kha.Scheduler.sortFrameTasks = function() {
	if(kha.Scheduler.frame_tasks_sorted) return;
	kha.Scheduler.frameTasks.sort(function(a,b) {
		if(a.priority > b.priority) return 1; else if(a.priority < b.priority) return -1; else return 0;
	});
	kha.Scheduler.frame_tasks_sorted = true;
};
kha.Scheduler.get_deltaTime = function() {
	return kha.Scheduler.delta * kha.Scheduler.dScale;
};
kha.Scheduler.get_deltaScale = function() {
	return kha.Scheduler.dScale;
};
kha.Scheduler.set_deltaScale = function(value) {
	return kha.Scheduler.dScale = value;
};
kha.Score = function(name,score) {
	this.name = name;
	this.score = score;
};
$hxClasses["kha.Score"] = kha.Score;
kha.Score.__name__ = ["kha","Score"];
kha.Score.prototype = {
	getName: function() {
		return this.name;
	}
	,getScore: function() {
		return this.score;
	}
	,increase: function(amount) {
		this.score += amount;
	}
	,__class__: kha.Score
};
kha.ScreenCanvas = function() {
};
$hxClasses["kha.ScreenCanvas"] = kha.ScreenCanvas;
kha.ScreenCanvas.__name__ = ["kha","ScreenCanvas"];
kha.ScreenCanvas.__interfaces__ = [kha.Canvas];
kha.ScreenCanvas.__properties__ = {get_the:"get_the"}
kha.ScreenCanvas.get_the = function() {
	if(kha.ScreenCanvas.instance == null) kha.ScreenCanvas.instance = new kha.ScreenCanvas();
	return kha.ScreenCanvas.instance;
};
kha.ScreenCanvas.prototype = {
	get_width: function() {
		return kha.Sys.get_pixelWidth();
	}
	,get_height: function() {
		return kha.Sys.get_pixelHeight();
	}
	,get_g2: function() {
		return null;
	}
	,get_g4: function() {
		return null;
	}
	,__class__: kha.ScreenCanvas
	,__properties__: {get_g4:"get_g4",get_g2:"get_g2",get_height:"get_height",get_width:"get_width"}
};
kha.ScreenRotation = $hxClasses["kha.ScreenRotation"] = { __ename__ : ["kha","ScreenRotation"], __constructs__ : ["RotationNone","Rotation90","Rotation180","Rotation270"] };
kha.ScreenRotation.RotationNone = ["RotationNone",0];
kha.ScreenRotation.RotationNone.__enum__ = kha.ScreenRotation;
kha.ScreenRotation.Rotation90 = ["Rotation90",1];
kha.ScreenRotation.Rotation90.__enum__ = kha.ScreenRotation;
kha.ScreenRotation.Rotation180 = ["Rotation180",2];
kha.ScreenRotation.Rotation180.__enum__ = kha.ScreenRotation;
kha.ScreenRotation.Rotation270 = ["Rotation270",3];
kha.ScreenRotation.Rotation270.__enum__ = kha.ScreenRotation;
kha.Sound = function() {
};
$hxClasses["kha.Sound"] = kha.Sound;
kha.Sound.__name__ = ["kha","Sound"];
kha.Sound.__interfaces__ = [kha.Resource];
kha.Sound.prototype = {
	play: function() {
		return null;
	}
	,unload: function() {
	}
	,__class__: kha.Sound
};
kha.SoundChannel = function() {
};
$hxClasses["kha.SoundChannel"] = kha.SoundChannel;
kha.SoundChannel.__name__ = ["kha","SoundChannel"];
kha.SoundChannel.prototype = {
	play: function() {
		this.wasStopped = false;
	}
	,pause: function() {
	}
	,stop: function() {
		this.wasStopped = true;
	}
	,getLength: function() {
		return 0;
	}
	,getCurrentPos: function() {
		return 0;
	}
	,getVolume: function() {
		return 0;
	}
	,setVolume: function(volume) {
	}
	,setPan: function(pan) {
	}
	,getPan: function() {
		return 0;
	}
	,isFinished: function() {
		return this.getCurrentPos() >= this.getLength() || this.wasStopped;
	}
	,__class__: kha.SoundChannel
};
kha.Sprite = $hx_exports.kha.Sprite = function(image,width,height,z) {
	if(z == null) z = 1;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.originY = 0.0;
	this.originX = 0.0;
	this.angle = 0.0;
	this.removed = false;
	this.image = image;
	this.x = 0;
	this.y = 0;
	this.h = height;
	this.w = width;
	if(this.get_width() == 0 && image != null) this.set_width(image.get_width());
	if(this.get_height() == 0 && image != null) this.set_height(image.get_height());
	this.z = z;
	this.collider = new kha.Rectangle(0,0,this.get_width(),this.get_height());
	this.speedx = this.speedy = 0;
	this.accx = 0;
	this.accy = 0.2;
	this.animation = kha.Animation.create(0);
	this.maxspeedy = 5.0;
	this.collides = true;
	this.tempcollider = new kha.Rectangle(0,0,0,0);
};
$hxClasses["kha.Sprite"] = kha.Sprite;
kha.Sprite.__name__ = ["kha","Sprite"];
kha.Sprite.prototype = {
	collisionRect: function() {
		this.tempcollider.x = this.x;
		this.tempcollider.y = this.y;
		this.tempcollider.width = this.collider.width * this.scaleX;
		this.tempcollider.height = this.collider.height * this.scaleY;
		return this.tempcollider;
	}
	,setAnimation: function(animation) {
		this.animation.take(animation);
	}
	,update: function() {
		this.animation.next();
	}
	,render: function(g) {
		if(this.image != null) {
			g.set_color(kha._Color.Color_Impl_.White);
			if(this.angle != 0) g.pushTransformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(g.get_transformation(),kha.math._Matrix3.Matrix3_Impl_._new([1,0,this.x + this.originX,0,1,this.y + this.originY,0,0,1])),kha.math._Matrix3.Matrix3_Impl_.rotation(this.angle)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-this.x - this.originX,0,1,-this.y - this.originY,0,0,1])));
			g.drawScaledSubImage(this.image,Std["int"](this.animation.get() * this.w) % this.image.get_width(),Math.floor(this.animation.get() * this.w / this.image.get_width()) * this.h,this.w,this.h,Math.round(this.x - this.collider.x * this.scaleX),Math.round(this.y - this.collider.y * this.scaleY),this.get_width(),this.get_height());
			if(this.angle != 0) g.popTransformation();
		}
	}
	,hitFrom: function(dir) {
	}
	,hit: function(sprite) {
	}
	,setImage: function(image) {
		this.image = image;
	}
	,outOfView: function() {
	}
	,get_width: function() {
		return this.w * this.scaleX;
	}
	,set_width: function(value) {
		return this.w = value;
	}
	,get_height: function() {
		return this.h * this.scaleY;
	}
	,set_height: function(value) {
		return this.h = value;
	}
	,__class__: kha.Sprite
	,__properties__: {set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
};
kha.GamepadStates = function() {
	this.axes = new Array();
	this.buttons = new Array();
};
$hxClasses["kha.GamepadStates"] = kha.GamepadStates;
kha.GamepadStates.__name__ = ["kha","GamepadStates"];
kha.GamepadStates.prototype = {
	__class__: kha.GamepadStates
};
kha.Starter = function() {
	haxe.Log.trace = js.Boot.__trace;
	kha.Starter.keyboard = new kha.input.Keyboard();
	kha.Starter.mouse = new kha.input.Mouse();
	kha.Starter.gamepad = new kha.input.Gamepad();
	kha.Starter.gamepadStates = new Array();
	kha.Starter.gamepadStates.push(new kha.GamepadStates());
	kha.Starter.pressedKeys = new Array();
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		kha.Starter.pressedKeys.push(false);
	}
	kha.Starter.lastPressedKey = null;
	kha.Starter.pressedKeyToChar = new Array();
	var _g1 = 0;
	while(_g1 < 256) {
		var i1 = _g1++;
		kha.Starter.pressedKeys.push(null);
	}
	kha.Starter.buttonspressed = new Array();
	var _g2 = 0;
	while(_g2 < 10) {
		var i2 = _g2++;
		kha.Starter.buttonspressed.push(false);
	}
	kha.CanvasImage.init();
	kha.Loader.init(new kha.js.Loader());
	kha.Scheduler.init();
	kha.EnvironmentVariables.instance = new kha.js.EnvironmentVariables();
};
$hxClasses["kha.Starter"] = kha.Starter;
kha.Starter.__name__ = ["kha","Starter"];
kha.Starter.checkGamepadButton = function(pad,num,button) {
	if(kha.Starter.buttonspressed[num]) {
		if(pad.buttons[num] < 0.5) {
			kha.Game.the.buttonUp(button);
			kha.Starter.buttonspressed[num] = false;
		}
	} else if(pad.buttons[num] > 0.5) {
		kha.Game.the.buttonDown(button);
		kha.Starter.buttonspressed[num] = true;
	}
};
kha.Starter.checkGamepad = function(pad) {
	var _g1 = 0;
	var _g = pad.axes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(pad.axes[i] != null) {
			if(kha.Starter.gamepadStates[0].axes[i] != pad.axes[i]) {
				kha.Starter.gamepadStates[0].axes[i] = pad.axes[i];
				kha.Starter.gamepad.sendAxisEvent(i,pad.axes[i]);
			}
		}
	}
	var _g11 = 0;
	var _g2 = pad.buttons.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		if(pad.buttons[i1] != null) {
			if(kha.Starter.gamepadStates[0].buttons[i1] != pad.buttons[i1].value) {
				kha.Starter.gamepadStates[0].buttons[i1] = pad.buttons[i1].value;
				kha.Starter.gamepad.sendButtonEvent(i1,pad.buttons[i1].value);
			}
		}
	}
};
kha.Starter.unload = function(_) {
	kha.Game.the.onClose();
};
kha.Starter.setMouseXY = function(event) {
	var rect = kha.Sys.khanvas.getBoundingClientRect();
	var borderWidth = kha.Sys.khanvas.clientLeft;
	var borderHeight = kha.Sys.khanvas.clientTop;
	kha.Starter.mouseX = (event.clientX - rect.left - borderWidth) * kha.Sys.khanvas.width / (rect.width - 2 * borderWidth) | 0;
	kha.Starter.mouseY = (event.clientY - rect.top - borderHeight) * kha.Sys.khanvas.height / (rect.height - 2 * borderHeight) | 0;
};
kha.Starter.mouseDown = function(event) {
	window.document.addEventListener("mouseup",kha.Starter.mouseUp);
	kha.Starter.checkMouseShift(event);
	kha.Starter.setMouseXY(event);
	if(event.button == 0) {
		if(event.ctrlKey) {
			kha.Starter.leftMouseCtrlDown = true;
			kha.Game.the.rightMouseDown(kha.Starter.mouseX,kha.Starter.mouseY);
			kha.Starter.mouse.sendDownEvent(1,kha.Starter.mouseX,kha.Starter.mouseY);
		} else {
			kha.Starter.leftMouseCtrlDown = false;
			kha.Game.the.mouseDown(kha.Starter.mouseX,kha.Starter.mouseY);
			kha.Starter.mouse.sendDownEvent(0,kha.Starter.mouseX,kha.Starter.mouseY);
		}
	} else {
		kha.Game.the.rightMouseDown(kha.Starter.mouseX,kha.Starter.mouseY);
		kha.Starter.mouse.sendDownEvent(1,kha.Starter.mouseX,kha.Starter.mouseY);
	}
};
kha.Starter.mouseUp = function(event) {
	window.document.removeEventListener("mouseup",kha.Starter.mouseUp);
	kha.Starter.checkMouseShift(event);
	kha.Starter.setMouseXY(event);
	if(event.button == 0) {
		if(kha.Starter.leftMouseCtrlDown) {
			kha.Game.the.rightMouseUp(kha.Starter.mouseX,kha.Starter.mouseY);
			kha.Starter.mouse.sendUpEvent(1,kha.Starter.mouseX,kha.Starter.mouseY);
		} else {
			kha.Game.the.mouseUp(kha.Starter.mouseX,kha.Starter.mouseY);
			kha.Starter.mouse.sendUpEvent(0,kha.Starter.mouseX,kha.Starter.mouseY);
		}
		kha.Starter.leftMouseCtrlDown = false;
	} else {
		kha.Game.the.rightMouseUp(kha.Starter.mouseX,kha.Starter.mouseY);
		kha.Starter.mouse.sendUpEvent(1,kha.Starter.mouseX,kha.Starter.mouseY);
	}
};
kha.Starter.mouseMove = function(event) {
	kha.Starter.checkMouseShift(event);
	kha.Starter.setMouseXY(event);
	kha.Game.the.mouseMove(kha.Starter.mouseX,kha.Starter.mouseY);
	kha.Starter.mouse.sendMoveEvent(kha.Starter.mouseX,kha.Starter.mouseY);
};
kha.Starter.checkMouseShift = function(event) {
	if(event.shiftKey && !kha.Starter.pressedKeys[16]) {
		kha.Starter.pressedKeys[16] = true;
		kha.Game.the.keyDown(kha.Key.SHIFT,"");
	} else if(kha.Starter.pressedKeys[16] && !event.shiftKey) {
		kha.Starter.pressedKeys[16] = false;
		kha.Game.the.keyUp(kha.Key.SHIFT,"");
	}
};
kha.Starter.checkKeyShift = function(event) {
	if(event.shiftKey && !kha.Starter.pressedKeys[16]) {
		kha.Starter.pressedKeys[16] = true;
		kha.Game.the.keyDown(kha.Key.SHIFT,"");
	} else if(kha.Starter.pressedKeys[16] && event.keyCode != 16 && !event.shiftKey) {
		kha.Starter.pressedKeys[16] = false;
		kha.Game.the.keyUp(kha.Key.SHIFT,"");
	}
};
kha.Starter.keyDown = function(event) {
	event.stopPropagation();
	if(kha.Starter.pressedKeys[event.keyCode]) {
		kha.Starter.lastPressedKey = 0;
		event.preventDefault();
		return;
	}
	kha.Starter.lastPressedKey = event.keyCode;
	kha.Starter.pressedKeys[event.keyCode] = true;
	var _g = kha.Starter.lastPressedKey;
	switch(_g) {
	case 8:
		kha.Game.the.keyDown(kha.Key.BACKSPACE,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.BACKSPACE,"");
		event.preventDefault();
		break;
	case 9:
		kha.Game.the.keyDown(kha.Key.TAB,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.TAB,"");
		event.preventDefault();
		break;
	case 13:
		kha.Game.the.keyDown(kha.Key.ENTER,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.ENTER,"");
		event.preventDefault();
		break;
	case 16:
		kha.Game.the.keyDown(kha.Key.SHIFT,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.SHIFT,"");
		event.preventDefault();
		break;
	case 17:
		kha.Game.the.keyDown(kha.Key.CTRL,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.CTRL,"");
		event.preventDefault();
		break;
	case 18:
		kha.Game.the.keyDown(kha.Key.ALT,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.ALT,"");
		event.preventDefault();
		break;
	case 27:
		kha.Game.the.keyDown(kha.Key.ESC,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.ESC,"");
		event.preventDefault();
		break;
	case 32:
		kha.Game.the.keyDown(kha.Key.CHAR," ");
		kha.Starter.keyboard.sendDownEvent(kha.Key.CHAR," ");
		kha.Starter.lastPressedKey = 0;
		event.preventDefault();
		break;
	case 46:
		kha.Game.the.keyDown(kha.Key.DEL,"");
		kha.Starter.keyboard.sendDownEvent(kha.Key.DEL,"");
		event.preventDefault();
		break;
	case 38:
		kha.Game.the.buttonDown(kha.Button.UP);
		kha.Starter.keyboard.sendDownEvent(kha.Key.UP,"");
		event.preventDefault();
		break;
	case 40:
		kha.Game.the.buttonDown(kha.Button.DOWN);
		kha.Starter.keyboard.sendDownEvent(kha.Key.DOWN,"");
		event.preventDefault();
		break;
	case 37:
		kha.Game.the.buttonDown(kha.Button.LEFT);
		kha.Starter.keyboard.sendDownEvent(kha.Key.LEFT,"");
		event.preventDefault();
		break;
	case 39:
		kha.Game.the.buttonDown(kha.Button.RIGHT);
		kha.Starter.keyboard.sendDownEvent(kha.Key.RIGHT,"");
		event.preventDefault();
		break;
	default:
		if(!event.altKey) {
			var $char = String.fromCharCode(kha.Starter.lastPressedKey);
			if(kha.Starter.lastPressedKey >= 96 && kha.Starter.lastPressedKey <= 105) $char = String.fromCharCode(-48 + kha.Starter.lastPressedKey);
			if(kha.Starter.lastPressedKey >= 65 && kha.Starter.lastPressedKey <= 90) {
				if(event.shiftKey) $char = String.fromCharCode(kha.Starter.lastPressedKey); else $char = String.fromCharCode(kha.Starter.lastPressedKey - 65 + 97);
			}
			kha.Starter.pressedKeyToChar[kha.Starter.lastPressedKey] = $char;
			kha.Game.the.keyDown(kha.Key.CHAR,$char);
			kha.Starter.keyboard.sendDownEvent(kha.Key.CHAR,$char);
			kha.Starter.lastPressedKey = 0;
		}
	}
};
kha.Starter.keyPress = function(event) {
	event.preventDefault();
	event.stopPropagation();
	if(kha.Starter.lastPressedKey == 0) return;
	if(event.keyCode == 0) {
		var $char = String.fromCharCode(event.charCode);
		kha.Starter.checkKeyShift(event);
		kha.Game.the.keyDown(kha.Key.CHAR,$char);
		kha.Starter.keyboard.sendDownEvent(kha.Key.CHAR,$char);
		kha.Starter.pressedKeyToChar[kha.Starter.lastPressedKey] = $char;
	} else if(event["char"] != null) {
		if(event["char"] != "") {
			kha.Game.the.keyDown(kha.Key.CHAR,event["char"]);
			kha.Starter.keyboard.sendDownEvent(kha.Key.CHAR,event["char"]);
			kha.Starter.pressedKeyToChar[kha.Starter.lastPressedKey] = event["char"];
		}
	}
	kha.Starter.lastPressedKey = 0;
};
kha.Starter.keyUp = function(event) {
	event.preventDefault();
	event.stopPropagation();
	kha.Starter.checkKeyShift(event);
	kha.Starter.pressedKeys[event.keyCode] = false;
	var _g = event.keyCode;
	switch(_g) {
	case 8:
		kha.Game.the.keyUp(kha.Key.BACKSPACE,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.BACKSPACE,"");
		break;
	case 9:
		kha.Game.the.keyUp(kha.Key.TAB,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.TAB,"");
		break;
	case 13:
		kha.Game.the.keyUp(kha.Key.ENTER,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.ENTER,"");
		break;
	case 16:
		kha.Game.the.keyUp(kha.Key.SHIFT,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.SHIFT,"");
		break;
	case 17:
		kha.Game.the.keyUp(kha.Key.CTRL,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.CTRL,"");
		break;
	case 18:
		kha.Game.the.keyUp(kha.Key.ALT,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.ALT,"");
		break;
	case 27:
		kha.Game.the.keyUp(kha.Key.ESC,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.ESC,"");
		break;
	case 32:
		kha.Game.the.keyUp(kha.Key.CHAR," ");
		kha.Starter.keyboard.sendUpEvent(kha.Key.CHAR," ");
		break;
	case 46:
		kha.Game.the.keyUp(kha.Key.DEL,"");
		kha.Starter.keyboard.sendUpEvent(kha.Key.DEL,"");
		break;
	case 38:
		kha.Game.the.buttonUp(kha.Button.UP);
		kha.Starter.keyboard.sendUpEvent(kha.Key.UP,"");
		break;
	case 40:
		kha.Game.the.buttonUp(kha.Button.DOWN);
		kha.Starter.keyboard.sendUpEvent(kha.Key.DOWN,"");
		break;
	case 37:
		kha.Game.the.buttonUp(kha.Button.LEFT);
		kha.Starter.keyboard.sendUpEvent(kha.Key.LEFT,"");
		break;
	case 39:
		kha.Game.the.buttonUp(kha.Button.RIGHT);
		kha.Starter.keyboard.sendUpEvent(kha.Key.RIGHT,"");
		break;
	}
	if(kha.Starter.pressedKeyToChar[event.keyCode] != null) {
		kha.Game.the.keyUp(kha.Key.CHAR,kha.Starter.pressedKeyToChar[event.keyCode]);
		kha.Starter.keyboard.sendUpEvent(kha.Key.CHAR,kha.Starter.pressedKeyToChar[event.keyCode]);
		kha.Starter.pressedKeyToChar[event.keyCode] = null;
	}
};
kha.Starter.quit = function() {
	var $window = window;
	$window.close();
};
kha.Starter.prototype = {
	start: function(game) {
		this.gameToStart = game;
		kha.Configuration.setScreen(new kha.EmptyScreen(kha._Color.Color_Impl_.fromBytes(0,0,0)));
		kha.Loader.the.loadProject($bind(this,this.loadFinished));
	}
	,loadFinished: function() {
		kha.Loader.the.initProject();
		var canvas = window.document.getElementById("khanvas");
		this.gameToStart.width = kha.Loader.the.width;
		this.gameToStart.height = kha.Loader.the.height;
		var gl = false;
		try {
			kha.Sys.gl = canvas.getContext("experimental-webgl",{ alpha : false});
			if(kha.Sys.gl != null) {
				kha.Sys.gl.pixelStorei(kha.Sys.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
				gl = true;
			}
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Starter.hx", lineNumber : 128, className : "kha.Starter", methodName : "loadFinished"});
		}
		kha.Sys.init(canvas);
		var widthTransform = canvas.width / kha.Loader.the.width;
		var heightTransform = canvas.height / kha.Loader.the.height;
		var transform = Math.min(widthTransform,heightTransform);
		if(gl) {
			var g4;
			if(gl) g4 = new kha.js.graphics4.Graphics(true); else g4 = null;
			kha.Starter.frame = new kha.Framebuffer(null,g4);
			kha.Starter.frame.init(new kha.js.graphics4.Graphics2(kha.Starter.frame),g4);
		} else kha.Starter.frame = new kha.Framebuffer(new kha.js.CanvasGraphics(canvas.getContext("2d"),Math.round(kha.Loader.the.width * transform),Math.round(kha.Loader.the.height * transform)),null);
		try {
			kha.Sys.audio = null;
			kha.Sys.audio = new AudioContext();
		} catch( e1 ) {
		}
		if(kha.Sys.audio == null) try {
			kha.Sys.audio = new webkitAudioContext();
		} catch( e2 ) {
		}
		kha.Scheduler.start();
		var $window = window;
		var requestAnimationFrame = $window.requestAnimationFrame;
		if(requestAnimationFrame == null) requestAnimationFrame = $window.mozRequestAnimationFrame;
		if(requestAnimationFrame == null) requestAnimationFrame = $window.webkitRequestAnimationFrame;
		if(requestAnimationFrame == null) requestAnimationFrame = $window.msRequestAnimationFrame;
		var animate;
		var animate1 = null;
		animate1 = function(timestamp) {
			var window1 = window;
			if(requestAnimationFrame == null) window1.setTimeout(animate1,16.6666666666666679); else requestAnimationFrame(animate1);
			var gamepads = navigator.getGamepads && navigator.getGamepads();
			if(gamepads == null) gamepads = navigator.webkitGetGamepads && navigator.webkitGetGamepads();
			if(gamepads != null) {
				var _g1 = 0;
				var _g = gamepads.length;
				while(_g1 < _g) {
					var i = _g1++;
					var pad = gamepads[i];
					if(pad != null) {
						kha.Starter.checkGamepadButton(pad,0,kha.Button.BUTTON_1);
						kha.Starter.checkGamepadButton(pad,1,kha.Button.BUTTON_2);
						kha.Starter.checkGamepadButton(pad,12,kha.Button.UP);
						kha.Starter.checkGamepadButton(pad,13,kha.Button.DOWN);
						kha.Starter.checkGamepadButton(pad,14,kha.Button.LEFT);
						kha.Starter.checkGamepadButton(pad,15,kha.Button.RIGHT);
						if(pad.index == 0) kha.Starter.checkGamepad(pad);
					}
				}
			}
			kha.Scheduler.executeFrame();
			if(canvas.getContext) {
				kha.Configuration.theScreen.render(kha.Starter.frame);
				if(kha.Sys.gl != null) {
					kha.Sys.gl.clearColor(1,1,1,1);
					kha.Sys.gl.colorMask(false,false,false,true);
					kha.Sys.gl.clear(kha.Sys.gl.COLOR_BUFFER_BIT);
					kha.Sys.gl.colorMask(true,true,true,true);
				}
			}
		};
		animate = animate1;
		if(requestAnimationFrame == null) $window.setTimeout(animate,16.6666666666666679); else requestAnimationFrame(animate);
		if(canvas.getAttribute("tabindex") == null) canvas.setAttribute("tabindex","0");
		canvas.focus();
		canvas.oncontextmenu = function(event) {
			event.stopPropagation();
			event.preventDefault();
		};
		canvas.onmousedown = kha.Starter.mouseDown;
		canvas.onmousemove = kha.Starter.mouseMove;
		canvas.onkeydown = kha.Starter.keyDown;
		canvas.onkeypress = kha.Starter.keyPress;
		canvas.onkeyup = kha.Starter.keyUp;
		window.addEventListener("onunload",kha.Starter.unload);
		kha.Configuration.setScreen(this.gameToStart);
		this.gameToStart.loadFinished();
	}
	,__class__: kha.Starter
};
kha.StorageFile = function() { };
$hxClasses["kha.StorageFile"] = kha.StorageFile;
kha.StorageFile.__name__ = ["kha","StorageFile"];
kha.StorageFile.prototype = {
	read: function() {
		return null;
	}
	,write: function(data) {
	}
	,append: function(data) {
	}
	,canAppend: function() {
		return false;
	}
	,maxSize: function() {
		return -1;
	}
	,writeString: function(data) {
		var bytes = haxe.io.Bytes.alloc(data.length);
		var _g1 = 0;
		var _g = data.length;
		while(_g1 < _g) {
			var i = _g1++;
			bytes.set(i,HxOverrides.cca(data,i));
		}
		this.write(new kha.Blob(bytes));
	}
	,appendString: function(data) {
		var bytes = haxe.io.Bytes.alloc(data.length);
		var _g1 = 0;
		var _g = data.length;
		while(_g1 < _g) {
			var i = _g1++;
			bytes.set(i,HxOverrides.cca(data,i));
		}
		this.append(new kha.Blob(bytes));
	}
	,readString: function() {
		var blob = this.read();
		if(blob == null) return null; else return blob.toString();
	}
	,writeObject: function(object) {
		this.writeString(haxe.Serializer.run(object));
	}
	,readObject: function() {
		var s = this.readString();
		if(s == null) return null; else return haxe.Unserializer.run(s);
	}
	,__class__: kha.StorageFile
};
kha.Sys = function() { };
$hxClasses["kha.Sys"] = kha.Sys;
kha.Sys.__name__ = ["kha","Sys"];
kha.Sys.__properties__ = {get_pixelHeight:"get_pixelHeight",get_pixelWidth:"get_pixelWidth",get_mouse:"get_mouse"}
kha.Sys.init = function(canvas) {
	kha.Sys.khanvas = canvas;
	kha.Sys.theMouse = new kha.js.Mouse();
};
kha.Sys.getTime = function() {
	return Date.now() / 1000;
};
kha.Sys.get_mouse = function() {
	return kha.Sys.theMouse;
};
kha.Sys.get_pixelWidth = function() {
	return kha.Sys.khanvas.width;
};
kha.Sys.get_pixelHeight = function() {
	return kha.Sys.khanvas.height;
};
kha.Sys.vsynced = function() {
	return true;
};
kha.Sys.refreshRate = function() {
	return 60;
};
kha.Tile = $hx_exports.kha.Tile = function(imageIndex,collides) {
	this.imageIndex = imageIndex;
	this.collides = collides;
	this.visible = true;
};
$hxClasses["kha.Tile"] = kha.Tile;
kha.Tile.__name__ = ["kha","Tile"];
kha.Tile.prototype = {
	collision: function(rect) {
		return this.collides;
	}
	,__class__: kha.Tile
};
kha.Tilemap = $hx_exports.kha.Tilemap = function(imagename,tileWidth,tileHeight,map,tiles,repeat) {
	if(repeat == null) repeat = false;
	this.tileset = new kha.Tileset(imagename,tileWidth,tileHeight,tiles);
	this.map = map;
	this.levelWidth = map.length;
	this.levelHeight = map[0].length;
	this.collisionRectCache = new kha.Rectangle(0,0,32,32);
	this.repeat = repeat;
};
$hxClasses["kha.Tilemap"] = kha.Tilemap;
kha.Tilemap.__name__ = ["kha","Tilemap"];
kha.Tilemap.mod = function(a,b) {
	var r = a % b;
	if(r < 0) return r + b; else return r;
};
kha.Tilemap.round = function(value) {
	return Math.round(value);
};
kha.Tilemap.prototype = {
	index: function(xpos,ypos) {
		var xtile = xpos / this.tileset.TILE_WIDTH | 0;
		var ytile = ypos / this.tileset.TILE_HEIGHT | 0;
		return new kha.math.Vector2i(xtile,ytile);
	}
	,get: function(x,y) {
		return this.map[x][y];
	}
	,set: function(x,y,value) {
		this.map[x][y] = value;
	}
	,render: function(g,xleft,ytop,width,height) {
		g.set_color(kha._Color.Color_Impl_.White);
		if(this.repeat) {
			var xstart = (xleft / this.tileset.TILE_WIDTH | 0) - 1;
			var xend = (xleft + width) / this.tileset.TILE_WIDTH + 1 | 0;
			var ystart = (ytop / this.tileset.TILE_HEIGHT | 0) - 1;
			var yend = (ytop + height) / this.tileset.TILE_HEIGHT + 2 | 0;
			var _g = xstart;
			while(_g < xend) {
				var x = _g++;
				var _g1 = ystart;
				while(_g1 < yend) {
					var y = _g1++;
					this.tileset.render(g,this.map[kha.Tilemap.mod(x,this.levelWidth)][kha.Tilemap.mod(y,this.levelHeight)],x * this.tileset.TILE_WIDTH,y * this.tileset.TILE_HEIGHT);
				}
			}
		} else {
			var xstart1 = Std["int"](Math.max(xleft / this.tileset.TILE_WIDTH - 1,0));
			var xend1 = Std["int"](Math.min((xleft + width) / this.tileset.TILE_WIDTH + 1,this.levelWidth));
			var ystart1 = Std["int"](Math.max(ytop / this.tileset.TILE_HEIGHT - 1,0));
			var yend1 = Std["int"](Math.min((ytop + height) / this.tileset.TILE_HEIGHT + 2,this.levelHeight));
			var _g2 = xstart1;
			while(_g2 < xend1) {
				var x1 = _g2++;
				var _g11 = ystart1;
				while(_g11 < yend1) {
					var y1 = _g11++;
					this.tileset.render(g,this.map[x1][y1],x1 * this.tileset.TILE_WIDTH,y1 * this.tileset.TILE_HEIGHT);
				}
			}
		}
	}
	,collidesPoint: function(point) {
		var xtile = point.x / this.tileset.TILE_WIDTH | 0;
		var ytile = point.y / this.tileset.TILE_HEIGHT | 0;
		return this.tileset.tile(this.map[xtile][ytile]).collides;
	}
	,collides: function(sprite) {
		var rect = sprite.collisionRect();
		if(rect.x <= 0 || rect.y <= 0 || rect.x + rect.width >= this.getWidth() * this.tileset.TILE_WIDTH || rect.y + rect.height >= this.getHeight() * this.tileset.TILE_HEIGHT) return true;
		var delta = 0.001;
		var xtilestart = (rect.x + delta) / this.tileset.TILE_WIDTH | 0;
		var xtileend = (rect.x + rect.width - delta) / this.tileset.TILE_WIDTH | 0;
		var ytilestart = (rect.y + delta) / this.tileset.TILE_HEIGHT | 0;
		var ytileend = (rect.y + rect.height - delta) / this.tileset.TILE_HEIGHT | 0;
		var _g1 = ytilestart;
		var _g = ytileend + 1;
		while(_g1 < _g) {
			var ytile = _g1++;
			var _g3 = xtilestart;
			var _g2 = xtileend + 1;
			while(_g3 < _g2) {
				var xtile = _g3++;
				this.collisionRectCache.x = rect.x - xtile * this.tileset.TILE_WIDTH;
				this.collisionRectCache.y = rect.y - ytile * this.tileset.TILE_HEIGHT;
				this.collisionRectCache.width = rect.width;
				this.collisionRectCache.height = rect.height;
				if(xtile > 0 && ytile > 0 && xtile < this.map.length && ytile < this.map[xtile].length && this.tileset.tile(this.map[xtile][ytile]) != null) {
					if(this.tileset.tile(this.map[xtile][ytile]).collision(this.collisionRectCache)) return true;
				}
			}
		}
		return false;
	}
	,collidesupdown: function(x1,x2,y,rect) {
		if(y < 0 || y / this.tileset.TILE_HEIGHT >= this.levelHeight) return false;
		var xtilestart = x1 / this.tileset.TILE_WIDTH | 0;
		var xtileend = x2 / this.tileset.TILE_WIDTH | 0;
		var ytile = y / this.tileset.TILE_HEIGHT | 0;
		var _g1 = xtilestart;
		var _g = xtileend + 1;
		while(_g1 < _g) {
			var xtile = _g1++;
			this.collisionRectCache.x = rect.x - xtile * this.tileset.TILE_WIDTH;
			this.collisionRectCache.y = rect.y - ytile * this.tileset.TILE_HEIGHT;
			this.collisionRectCache.width = rect.width;
			this.collisionRectCache.height = rect.height;
			if(this.tileset.tile(this.map[xtile][ytile]).collision(this.collisionRectCache)) return true;
		}
		return false;
	}
	,collidesrightleft: function(x,y1,y2,rect) {
		if(x < 0 || x / this.tileset.TILE_WIDTH >= this.levelWidth) return true;
		var ytilestart = y1 / this.tileset.TILE_HEIGHT | 0;
		var ytileend = y2 / this.tileset.TILE_HEIGHT | 0;
		var xtile = x / this.tileset.TILE_WIDTH | 0;
		var _g1 = ytilestart;
		var _g = ytileend + 1;
		while(_g1 < _g) {
			var ytile = _g1++;
			if(ytile < 0 || ytile >= this.levelHeight) continue;
			this.collisionRectCache.x = rect.x - xtile * this.tileset.TILE_WIDTH;
			this.collisionRectCache.y = rect.y - ytile * this.tileset.TILE_HEIGHT;
			this.collisionRectCache.width = rect.width;
			this.collisionRectCache.height = rect.height;
			if(this.tileset.tile(this.map[xtile][ytile]).collision(this.collisionRectCache)) return true;
		}
		return false;
	}
	,collideright: function(sprite) {
		var rect = sprite.collisionRect();
		var collided = false;
		while(this.collidesrightleft(rect.x + rect.width | 0,kha.Tilemap.round(rect.y + 1),kha.Tilemap.round(rect.y + rect.height - 1),rect)) {
			--sprite.x;
			collided = true;
			rect = sprite.collisionRect();
		}
		return collided;
	}
	,collideleft: function(sprite) {
		var rect = sprite.collisionRect();
		var collided = false;
		while(this.collidesrightleft(rect.x | 0,kha.Tilemap.round(rect.y + 1),kha.Tilemap.round(rect.y + rect.height - 1),rect)) {
			++sprite.x;
			collided = true;
			rect = sprite.collisionRect();
		}
		return collided;
	}
	,collidedown: function(sprite) {
		var rect = sprite.collisionRect();
		var collided = false;
		while(this.collidesupdown(kha.Tilemap.round(rect.x + 1),kha.Tilemap.round(rect.x + rect.width - 1),rect.y + rect.height | 0,rect)) {
			--sprite.y;
			collided = true;
			rect = sprite.collisionRect();
		}
		return collided;
	}
	,collideup: function(sprite) {
		var rect = sprite.collisionRect();
		var collided = false;
		while(this.collidesupdown(kha.Tilemap.round(rect.x + 1),kha.Tilemap.round(rect.x + rect.width - 1),rect.y | 0,rect)) {
			++sprite.y;
			collided = true;
			rect = sprite.collisionRect();
		}
		return collided;
	}
	,getWidth: function() {
		return this.levelWidth;
	}
	,getHeight: function() {
		return this.levelHeight;
	}
	,getTileset: function() {
		return this.tileset;
	}
	,__class__: kha.Tilemap
};
kha.Tileset = function(imagename,tileWidth,tileHeight,tiles) {
	this.TILE_WIDTH = 32;
	this.TILE_HEIGHT = 32;
	this.image = kha.Loader.the.getImage(imagename);
	this.TILE_WIDTH = tileWidth;
	this.TILE_HEIGHT = tileHeight;
	this.xmax = Std["int"](this.image.get_width() / this.TILE_WIDTH);
	this.ymax = Std["int"](this.image.get_height() / this.TILE_HEIGHT);
	if(tiles == null) {
		this.tiles = new Array();
		var _g1 = 0;
		var _g = this.getLength();
		while(_g1 < _g) {
			var i = _g1++;
			this.tiles.push(new kha.Tile(i,false));
		}
	} else this.tiles = tiles;
};
$hxClasses["kha.Tileset"] = kha.Tileset;
kha.Tileset.__name__ = ["kha","Tileset"];
kha.Tileset.prototype = {
	render: function(g,tile,x,y) {
		if(tile < 0) return;
		var index = this.tiles[tile].imageIndex;
		var ytile = index / this.xmax | 0;
		var xtile = index - ytile * this.xmax;
		g.drawScaledSubImage(this.image,xtile * this.TILE_WIDTH,ytile * this.TILE_HEIGHT,this.TILE_WIDTH,this.TILE_HEIGHT,x,y,this.TILE_WIDTH,this.TILE_HEIGHT);
	}
	,tile: function(index) {
		return this.tiles[index];
	}
	,getLength: function() {
		return this.xmax * this.ymax;
	}
	,__class__: kha.Tileset
};
kha.Video = function() {
	kha.Media.call(this);
};
$hxClasses["kha.Video"] = kha.Video;
kha.Video.__name__ = ["kha","Video"];
kha.Video.__super__ = kha.Media;
kha.Video.prototype = $extend(kha.Media.prototype,{
	__class__: kha.Video
});
kha.WebGLImage = function(width,height,format,renderTarget) {
	this.myWidth = width;
	this.myHeight = height;
	this.format = format;
	this.renderTarget = renderTarget;
	this.image = null;
	this.video = null;
	if(renderTarget) this.createTexture();
};
$hxClasses["kha.WebGLImage"] = kha.WebGLImage;
kha.WebGLImage.__name__ = ["kha","WebGLImage"];
kha.WebGLImage.init = function() {
	var canvas = window.document.createElement("canvas");
	if(canvas != null) {
		kha.WebGLImage.context = canvas.getContext("2d");
		canvas.width = 2048;
		canvas.height = 2048;
		kha.WebGLImage.context.globalCompositeOperation = "copy";
	}
};
kha.WebGLImage.upperPowerOfTwo = function(v) {
	v--;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	v++;
	return v;
};
kha.WebGLImage.__super__ = kha.Image;
kha.WebGLImage.prototype = $extend(kha.Image.prototype,{
	get_g2: function() {
		if(this.graphics2 == null) this.graphics2 = new kha.js.graphics4.Graphics2(this);
		return this.graphics2;
	}
	,get_g4: function() {
		if(this.graphics4 == null) this.graphics4 = new kha.js.graphics4.Graphics(true,this);
		return this.graphics4;
	}
	,get_width: function() {
		return this.myWidth;
	}
	,get_height: function() {
		return this.myHeight;
	}
	,get_realWidth: function() {
		return this.myWidth;
	}
	,get_realHeight: function() {
		return this.myHeight;
	}
	,isOpaque: function(x,y) {
		if(this.data == null) {
			if(kha.WebGLImage.context == null) return true; else this.createImageData();
		}
		return this.data.data[y * Std["int"](this.image.width) * 4 + x * 4 + 3] != 0;
	}
	,createImageData: function() {
		kha.WebGLImage.context.strokeStyle = "rgba(0,0,0,0)";
		kha.WebGLImage.context.fillStyle = "rgba(0,0,0,0)";
		kha.WebGLImage.context.fillRect(0,0,this.image.width,this.image.height);
		kha.WebGLImage.context.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,this.image.width,this.image.height);
		this.data = kha.WebGLImage.context.getImageData(0,0,this.image.width,this.image.height);
	}
	,createTexture: function() {
		if(kha.Sys.gl == null) return;
		this.texture = kha.Sys.gl.createTexture();
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.LINEAR);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.CLAMP_TO_EDGE);
		kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.CLAMP_TO_EDGE);
		if(this.renderTarget) {
			this.frameBuffer = kha.Sys.gl.createFramebuffer();
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,this.frameBuffer);
			kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,this.get_realWidth(),this.get_realHeight(),0,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,null);
			kha.Sys.gl.framebufferTexture2D(kha.Sys.gl.FRAMEBUFFER,kha.Sys.gl.COLOR_ATTACHMENT0,kha.Sys.gl.TEXTURE_2D,this.texture,0);
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,null);
		} else if(this.video != null) kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.video); else kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.image);
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,null);
	}
	,set: function(stage) {
		kha.Sys.gl.activeTexture(kha.Sys.gl.TEXTURE0 + stage);
		kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
		if(this.video != null) kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,this.video);
	}
	,lock: function(level) {
		if(level == null) level = 0;
		this.bytes = haxe.io.Bytes.alloc(this.format == kha.graphics4.TextureFormat.RGBA32?4 * this.get_width() * this.get_height():this.get_width() * this.get_height());
		return this.bytes;
	}
	,unlock: function() {
		if(kha.Sys.gl != null) {
			this.texture = kha.Sys.gl.createTexture();
			kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,this.texture);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.LINEAR);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.CLAMP_TO_EDGE);
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.CLAMP_TO_EDGE);
			kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.LUMINANCE,this.get_width(),this.get_height(),0,kha.Sys.gl.LUMINANCE,kha.Sys.gl.UNSIGNED_BYTE,new Uint8Array(this.bytes.b));
			if(kha.Sys.gl.getError() == 1282) {
				var rgbaBytes = haxe.io.Bytes.alloc(this.get_width() * this.get_height() * 4);
				var _g1 = 0;
				var _g = this.get_height();
				while(_g1 < _g) {
					var y = _g1++;
					var _g3 = 0;
					var _g2 = this.get_width();
					while(_g3 < _g2) {
						var x = _g3++;
						var value = this.bytes.get(y * this.get_width() + x);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 1,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 2,value);
						rgbaBytes.set(y * this.get_width() * 4 + x * 4 + 3,255);
					}
				}
				kha.Sys.gl.texImage2D(kha.Sys.gl.TEXTURE_2D,0,kha.Sys.gl.RGBA,this.get_width(),this.get_height(),0,kha.Sys.gl.RGBA,kha.Sys.gl.UNSIGNED_BYTE,new Uint8Array(rgbaBytes.b));
			}
			kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,null);
			this.bytes = null;
		}
	}
	,unload: function() {
	}
	,__class__: kha.WebGLImage
});
kha.graphics2 = {};
kha.graphics2.Graphics = function() {
	this.transformations = new Array();
	this.transformations.push(kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]));
	this.opacities = new Array();
	this.opacities.push(1);
	this.prog = null;
};
$hxClasses["kha.graphics2.Graphics"] = kha.graphics2.Graphics;
kha.graphics2.Graphics.__name__ = ["kha","graphics2","Graphics"];
kha.graphics2.Graphics.prototype = {
	begin: function(clear,clearColor) {
		if(clear == null) clear = true;
	}
	,end: function() {
	}
	,clear: function(color) {
	}
	,drawImage: function(img,x,y) {
		this.drawSubImage(img,x,y,0,0,img.get_width(),img.get_height());
	}
	,drawSubImage: function(img,x,y,sx,sy,sw,sh) {
		this.drawScaledSubImage(img,sx,sy,sw,sh,x,y,img.get_width(),img.get_height());
	}
	,drawScaledImage: function(img,dx,dy,dw,dh) {
		this.drawScaledSubImage(img,0,0,img.get_width(),img.get_height(),dx,dy,dw,dh);
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) strength = 1.0;
	}
	,fillRect: function(x,y,width,height) {
	}
	,drawString: function(text,x,y) {
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) strength = 1.0;
	}
	,drawVideo: function(video,x,y,width,height) {
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
	}
	,get_color: function() {
		return kha._Color.Color_Impl_.Black;
	}
	,set_color: function(color) {
		return kha._Color.Color_Impl_.Black;
	}
	,get_font: function() {
		return null;
	}
	,set_font: function(font) {
		return null;
	}
	,pushTransformation: function(transformation) {
		this.setTransformation(transformation);
		this.transformations.push(transformation);
	}
	,popTransformation: function() {
		var ret = this.transformations.pop();
		this.setTransformation(this.get_transformation());
		return ret;
	}
	,get_transformation: function() {
		return this.transformations[this.transformations.length - 1];
	}
	,set_transformation: function(transformation) {
		this.setTransformation(transformation);
		return this.transformations[this.transformations.length - 1] = transformation;
	}
	,translation: function(tx,ty) {
		return kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,tx,0,1,ty,0,0,1]),this.get_transformation());
	}
	,translate: function(tx,ty) {
		this.set_transformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,tx,0,1,ty,0,0,1]),this.get_transformation()));
	}
	,pushTranslation: function(tx,ty) {
		this.pushTransformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,tx,0,1,ty,0,0,1]),this.get_transformation()));
	}
	,rotation: function(angle,centerx,centery) {
		return kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,centerx,0,1,centery,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(angle)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-centerx,0,1,-centery,0,0,1])),this.get_transformation());
	}
	,rotate: function(angle,centerx,centery) {
		this.set_transformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,centerx,0,1,centery,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(angle)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-centerx,0,1,-centery,0,0,1])),this.get_transformation()));
	}
	,pushRotation: function(angle,centerx,centery) {
		this.pushTransformation(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_.multmat(kha.math._Matrix3.Matrix3_Impl_._new([1,0,centerx,0,1,centery,0,0,1]),kha.math._Matrix3.Matrix3_Impl_.rotation(angle)),kha.math._Matrix3.Matrix3_Impl_._new([1,0,-centerx,0,1,-centery,0,0,1])),this.get_transformation()));
	}
	,pushOpacity: function(opacity) {
		this.setOpacity(opacity);
		this.opacities.push(opacity);
	}
	,popOpacity: function() {
		var ret = this.opacities.pop();
		this.setOpacity(this.get_opacity());
		return ret;
	}
	,get_opacity: function() {
		return this.opacities[this.opacities.length - 1];
	}
	,set_opacity: function(opacity) {
		this.setOpacity(opacity);
		return this.opacities[this.opacities.length - 1] = opacity;
	}
	,get_program: function() {
		return this.prog;
	}
	,set_program: function(program) {
		this.setProgram(program);
		return this.prog = program;
	}
	,setBlendingMode: function(source,destination) {
	}
	,setTransformation: function(transformation) {
	}
	,setOpacity: function(opacity) {
	}
	,setProgram: function(program) {
	}
	,__class__: kha.graphics2.Graphics
	,__properties__: {set_program:"set_program",get_program:"get_program",set_opacity:"set_opacity",get_opacity:"get_opacity",set_transformation:"set_transformation",get_transformation:"get_transformation",set_font:"set_font",get_font:"get_font",set_color:"set_color",get_color:"get_color"}
};
kha.graphics2.GraphicsExtension = function() { };
$hxClasses["kha.graphics2.GraphicsExtension"] = kha.graphics2.GraphicsExtension;
kha.graphics2.GraphicsExtension.__name__ = ["kha","graphics2","GraphicsExtension"];
kha.graphics2.GraphicsExtension.drawCircle = function(g2,cx,cy,radius,strength,segments) {
	if(segments == null) segments = 0;
	if(strength == null) strength = 1;
	if(segments <= 0) segments = Math.floor(10 * Math.sqrt(radius));
	var theta = 2 * Math.PI / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = radius;
	var y = 0.0;
	var _g = 0;
	while(_g < segments) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		g2.drawLine(px,py,x + cx,y + cy,strength);
	}
};
kha.graphics2.GraphicsExtension.fillCircle = function(g2,cx,cy,radius,segments) {
	if(segments == null) segments = 0;
	if(segments <= 0) segments = Math.floor(10 * Math.sqrt(radius));
	var theta = 2 * Math.PI / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = radius;
	var y = 0.0;
	var _g = 0;
	while(_g < segments) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		g2.fillTriangle(px,py,x + cx,y + cy,cx,cy);
	}
};
kha.graphics2.GraphicsExtension.drawPolygon = function(g2,x,y,vertices,strength) {
	if(strength == null) strength = 1;
	var iterator = HxOverrides.iter(vertices);
	var v0 = iterator.next();
	var v1 = v0;
	while(iterator.hasNext()) {
		var v2 = iterator.next();
		g2.drawLine(v1.x + x,v1.y + y,v2.x + x,v2.y + y,strength);
		v1 = v2;
	}
	g2.drawLine(v1.x + x,v1.y + y,v0.x + x,v0.y + y,strength);
};
kha.graphics2.GraphicsExtension.fillPolygon = function(g2,x,y,vertices) {
	var iterator = HxOverrides.iter(vertices);
	var v0 = iterator.next();
	var v1 = v0;
	while(iterator.hasNext()) {
		var v2 = iterator.next();
		g2.fillTriangle(v1.x + x,v1.y + y,v2.x + x,v2.y + y,x,y);
		v1 = v2;
	}
	g2.fillTriangle(v1.x + x,v1.y + y,v0.x + x,v0.y + y,x,y);
};
kha.graphics4 = {};
kha.graphics4.BlendingOperation = $hxClasses["kha.graphics4.BlendingOperation"] = { __ename__ : ["kha","graphics4","BlendingOperation"], __constructs__ : ["Undefined","BlendOne","BlendZero","SourceAlpha","DestinationAlpha","InverseSourceAlpha","InverseDestinationAlpha"] };
kha.graphics4.BlendingOperation.Undefined = ["Undefined",0];
kha.graphics4.BlendingOperation.Undefined.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.BlendOne = ["BlendOne",1];
kha.graphics4.BlendingOperation.BlendOne.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.BlendZero = ["BlendZero",2];
kha.graphics4.BlendingOperation.BlendZero.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.SourceAlpha = ["SourceAlpha",3];
kha.graphics4.BlendingOperation.SourceAlpha.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.DestinationAlpha = ["DestinationAlpha",4];
kha.graphics4.BlendingOperation.DestinationAlpha.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.InverseSourceAlpha = ["InverseSourceAlpha",5];
kha.graphics4.BlendingOperation.InverseSourceAlpha.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.BlendingOperation.InverseDestinationAlpha = ["InverseDestinationAlpha",6];
kha.graphics4.BlendingOperation.InverseDestinationAlpha.__enum__ = kha.graphics4.BlendingOperation;
kha.graphics4.CompareMode = $hxClasses["kha.graphics4.CompareMode"] = { __ename__ : ["kha","graphics4","CompareMode"], __constructs__ : ["Always","Never","Equal","NotEqual","Less","LessEqual","Greater","GreaterEqual"] };
kha.graphics4.CompareMode.Always = ["Always",0];
kha.graphics4.CompareMode.Always.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.Never = ["Never",1];
kha.graphics4.CompareMode.Never.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.Equal = ["Equal",2];
kha.graphics4.CompareMode.Equal.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.NotEqual = ["NotEqual",3];
kha.graphics4.CompareMode.NotEqual.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.Less = ["Less",4];
kha.graphics4.CompareMode.Less.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.LessEqual = ["LessEqual",5];
kha.graphics4.CompareMode.LessEqual.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.Greater = ["Greater",6];
kha.graphics4.CompareMode.Greater.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.CompareMode.GreaterEqual = ["GreaterEqual",7];
kha.graphics4.CompareMode.GreaterEqual.__enum__ = kha.graphics4.CompareMode;
kha.graphics4.ConstantLocation = function() { };
$hxClasses["kha.graphics4.ConstantLocation"] = kha.graphics4.ConstantLocation;
kha.graphics4.ConstantLocation.__name__ = ["kha","graphics4","ConstantLocation"];
kha.graphics4.CubeMap = function() { };
$hxClasses["kha.graphics4.CubeMap"] = kha.graphics4.CubeMap;
kha.graphics4.CubeMap.__name__ = ["kha","graphics4","CubeMap"];
kha.graphics4.CubeMap.prototype = {
	__class__: kha.graphics4.CubeMap
};
kha.graphics4.CullMode = $hxClasses["kha.graphics4.CullMode"] = { __ename__ : ["kha","graphics4","CullMode"], __constructs__ : ["Clockwise","CounterClockwise","None"] };
kha.graphics4.CullMode.Clockwise = ["Clockwise",0];
kha.graphics4.CullMode.Clockwise.__enum__ = kha.graphics4.CullMode;
kha.graphics4.CullMode.CounterClockwise = ["CounterClockwise",1];
kha.graphics4.CullMode.CounterClockwise.__enum__ = kha.graphics4.CullMode;
kha.graphics4.CullMode.None = ["None",2];
kha.graphics4.CullMode.None.__enum__ = kha.graphics4.CullMode;
kha.graphics4.FragmentShader = function(source) {
	this.source = source.toString();
	this.type = kha.Sys.gl.FRAGMENT_SHADER;
	this.shader = null;
};
$hxClasses["kha.graphics4.FragmentShader"] = kha.graphics4.FragmentShader;
kha.graphics4.FragmentShader.__name__ = ["kha","graphics4","FragmentShader"];
kha.graphics4.FragmentShader.prototype = {
	__class__: kha.graphics4.FragmentShader
};
kha.graphics4.Graphics = function() { };
$hxClasses["kha.graphics4.Graphics"] = kha.graphics4.Graphics;
kha.graphics4.Graphics.__name__ = ["kha","graphics4","Graphics"];
kha.graphics4.Graphics.prototype = {
	__class__: kha.graphics4.Graphics
};
kha.graphics4.ImageShaderPainter = function(g4) {
	this.destinationBlend = kha.graphics4.BlendingOperation.Undefined;
	this.sourceBlend = kha.graphics4.BlendingOperation.Undefined;
	this.myProgram = null;
	this.bilinear = false;
	this.g = g4;
	this.bufferIndex = 0;
	this.initShaders();
	this.initBuffers();
	this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix");
	this.textureLocation = this.shaderProgram.getTextureUnit("tex");
};
$hxClasses["kha.graphics4.ImageShaderPainter"] = kha.graphics4.ImageShaderPainter;
kha.graphics4.ImageShaderPainter.__name__ = ["kha","graphics4","ImageShaderPainter"];
kha.graphics4.ImageShaderPainter.prototype = {
	get_program: function() {
		return this.myProgram;
	}
	,set_program: function(prog) {
		if(prog == null) {
			this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix");
			this.textureLocation = this.shaderProgram.getTextureUnit("tex");
		} else {
			this.projectionLocation = prog.getConstantLocation("projectionMatrix");
			this.textureLocation = prog.getTextureUnit("tex");
		}
		return this.myProgram = prog;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initShaders: function() {
		var fragmentShader = new kha.graphics4.FragmentShader(kha.Loader.the.getShader("painter-image.frag"));
		var vertexShader = new kha.graphics4.VertexShader(kha.Loader.the.getShader("painter-image.vert"));
		this.shaderProgram = new kha.graphics4.Program();
		this.shaderProgram.setFragmentShader(fragmentShader);
		this.shaderProgram.setVertexShader(vertexShader);
		this.structure = new kha.graphics4.VertexStructure();
		this.structure.add("vertexPosition",kha.graphics4.VertexData.Float3);
		this.structure.add("texPosition",kha.graphics4.VertexData.Float2);
		this.structure.add("vertexColor",kha.graphics4.VertexData.Float4);
		this.shaderProgram.link(this.structure);
	}
	,initBuffers: function() {
		this.rectVertexBuffer = new kha.graphics4.VertexBuffer(kha.graphics4.ImageShaderPainter.bufferSize * 4,this.structure,kha.graphics4.Usage.DynamicUsage);
		this.rectVertices = this.rectVertexBuffer.lock();
		this.indexBuffer = new kha.graphics4.IndexBuffer(kha.graphics4.ImageShaderPainter.bufferSize * 3 * 2,kha.graphics4.Usage.StaticUsage);
		var indices = this.indexBuffer.lock();
		var _g1 = 0;
		var _g = kha.graphics4.ImageShaderPainter.bufferSize;
		while(_g1 < _g) {
			var i = _g1++;
			indices[i * 3 * 2] = i * 4;
			indices[i * 3 * 2 + 1] = i * 4 + 1;
			indices[i * 3 * 2 + 2] = i * 4 + 2;
			indices[i * 3 * 2 + 3] = i * 4;
			indices[i * 3 * 2 + 4] = i * 4 + 2;
			indices[i * 3 * 2 + 5] = i * 4 + 3;
		}
		this.indexBuffer.unlock();
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = this.bufferIndex * kha.graphics4.ImageShaderPainter.vertexSize * 4;
		this.rectVertices[baseIndex] = bottomleftx;
		this.rectVertices[baseIndex + 1] = bottomlefty;
		this.rectVertices[baseIndex + 2] = -5.0;
		this.rectVertices[baseIndex + 9] = topleftx;
		this.rectVertices[baseIndex + 10] = toplefty;
		this.rectVertices[baseIndex + 11] = -5.0;
		this.rectVertices[baseIndex + 18] = toprightx;
		this.rectVertices[baseIndex + 19] = toprighty;
		this.rectVertices[baseIndex + 20] = -5.0;
		this.rectVertices[baseIndex + 27] = bottomrightx;
		this.rectVertices[baseIndex + 28] = bottomrighty;
		this.rectVertices[baseIndex + 29] = -5.0;
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = this.bufferIndex * kha.graphics4.ImageShaderPainter.vertexSize * 4;
		this.rectVertices[baseIndex + 3] = left;
		this.rectVertices[baseIndex + 4] = bottom;
		this.rectVertices[baseIndex + 12] = left;
		this.rectVertices[baseIndex + 13] = top;
		this.rectVertices[baseIndex + 21] = right;
		this.rectVertices[baseIndex + 22] = top;
		this.rectVertices[baseIndex + 30] = right;
		this.rectVertices[baseIndex + 31] = bottom;
	}
	,setRectColor: function(r,g,b,a) {
		var baseIndex = this.bufferIndex * kha.graphics4.ImageShaderPainter.vertexSize * 4;
		this.rectVertices[baseIndex + 5] = r;
		this.rectVertices[baseIndex + 6] = g;
		this.rectVertices[baseIndex + 7] = b;
		this.rectVertices[baseIndex + 8] = a;
		this.rectVertices[baseIndex + 14] = r;
		this.rectVertices[baseIndex + 15] = g;
		this.rectVertices[baseIndex + 16] = b;
		this.rectVertices[baseIndex + 17] = a;
		this.rectVertices[baseIndex + 23] = r;
		this.rectVertices[baseIndex + 24] = g;
		this.rectVertices[baseIndex + 25] = b;
		this.rectVertices[baseIndex + 26] = a;
		this.rectVertices[baseIndex + 32] = r;
		this.rectVertices[baseIndex + 33] = g;
		this.rectVertices[baseIndex + 34] = b;
		this.rectVertices[baseIndex + 35] = a;
	}
	,drawBuffer: function() {
		this.rectVertexBuffer.unlock();
		this.g.setVertexBuffer(this.rectVertexBuffer);
		this.g.setIndexBuffer(this.indexBuffer);
		this.g.setProgram(this.get_program() == null?this.shaderProgram:this.get_program());
		this.g.setTexture(this.textureLocation,this.lastTexture);
		this.g.setTextureParameters(this.textureLocation,kha.graphics4.TextureAddressing.Clamp,kha.graphics4.TextureAddressing.Clamp,this.bilinear?kha.graphics4.TextureFilter.LinearFilter:kha.graphics4.TextureFilter.PointFilter,this.bilinear?kha.graphics4.TextureFilter.LinearFilter:kha.graphics4.TextureFilter.PointFilter,kha.graphics4.MipMapFilter.NoMipFilter);
		this.g.setMatrix(this.projectionLocation,this.projectionMatrix);
		if(this.sourceBlend == kha.graphics4.BlendingOperation.Undefined || this.destinationBlend == kha.graphics4.BlendingOperation.Undefined) this.g.setBlendingMode(kha.graphics4.BlendingOperation.BlendOne,kha.graphics4.BlendingOperation.InverseSourceAlpha); else this.g.setBlendingMode(this.sourceBlend,this.destinationBlend);
		this.g.drawIndexedVertices(0,this.bufferIndex * 2 * 3);
		this.g.setTexture(this.textureLocation,null);
		this.bufferIndex = 0;
	}
	,setBilinearFilter: function(bilinear) {
		this.end();
		this.bilinear = bilinear;
	}
	,drawImage: function(img,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(this.bufferIndex + 1 >= kha.graphics4.ImageShaderPainter.bufferSize || this.lastTexture != null && tex != this.lastTexture) this.drawBuffer();
		this.setRectColor(kha._Color.Color_Impl_.get_Rb(color) / 255,kha._Color.Color_Impl_.get_Gb(color) / 255,kha._Color.Color_Impl_.get_Bb(color) / 255,opacity);
		this.setRectTexCoords(0,0,tex.get_width() / tex.get_realWidth(),tex.get_height() / tex.get_realHeight());
		this.setRectVertices(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty);
		++this.bufferIndex;
		this.lastTexture = tex;
	}
	,drawImage2: function(img,sx,sy,sw,sh,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(this.bufferIndex + 1 >= kha.graphics4.ImageShaderPainter.bufferSize || this.lastTexture != null && tex != this.lastTexture) this.drawBuffer();
		this.setRectTexCoords(sx / tex.get_realWidth(),sy / tex.get_realHeight(),(sx + sw) / tex.get_realWidth(),(sy + sh) / tex.get_realHeight());
		this.setRectColor(kha._Color.Color_Impl_.get_Rb(color) / 255,kha._Color.Color_Impl_.get_Gb(color) / 255,kha._Color.Color_Impl_.get_Bb(color) / 255,opacity);
		this.setRectVertices(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty);
		++this.bufferIndex;
		this.lastTexture = tex;
	}
	,drawImageScale: function(img,sx,sy,sw,sh,left,top,right,bottom,opacity,color) {
		var tex = img;
		if(this.bufferIndex + 1 >= kha.graphics4.ImageShaderPainter.bufferSize || this.lastTexture != null && tex != this.lastTexture) this.drawBuffer();
		this.setRectTexCoords(sx / tex.get_realWidth(),sy / tex.get_realHeight(),(sx + sw) / tex.get_realWidth(),(sy + sh) / tex.get_realHeight());
		this.setRectColor(kha._Color.Color_Impl_.get_Rb(color) / 255,kha._Color.Color_Impl_.get_Gb(color) / 255,kha._Color.Color_Impl_.get_Bb(color) / 255,opacity);
		this.setRectVertices(left,bottom,left,top,right,top,right,bottom);
		++this.bufferIndex;
		this.lastTexture = tex;
	}
	,end: function() {
		if(this.bufferIndex > 0) this.drawBuffer();
		this.lastTexture = null;
	}
	,__class__: kha.graphics4.ImageShaderPainter
	,__properties__: {set_program:"set_program",get_program:"get_program"}
};
kha.graphics4.ColoredShaderPainter = function(g4) {
	this.destinationBlend = kha.graphics4.BlendingOperation.Undefined;
	this.sourceBlend = kha.graphics4.BlendingOperation.Undefined;
	this.myProgram = null;
	this.g = g4;
	this.bufferIndex = 0;
	this.triangleBufferIndex = 0;
	this.initShaders();
	this.initBuffers();
	this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix");
};
$hxClasses["kha.graphics4.ColoredShaderPainter"] = kha.graphics4.ColoredShaderPainter;
kha.graphics4.ColoredShaderPainter.__name__ = ["kha","graphics4","ColoredShaderPainter"];
kha.graphics4.ColoredShaderPainter.prototype = {
	get_program: function() {
		return this.myProgram;
	}
	,set_program: function(prog) {
		if(prog == null) this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix"); else this.projectionLocation = prog.getConstantLocation("projectionMatrix");
		return this.myProgram = prog;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initShaders: function() {
		var fragmentShader = new kha.graphics4.FragmentShader(kha.Loader.the.getShader("painter-colored.frag"));
		var vertexShader = new kha.graphics4.VertexShader(kha.Loader.the.getShader("painter-colored.vert"));
		this.shaderProgram = new kha.graphics4.Program();
		this.shaderProgram.setFragmentShader(fragmentShader);
		this.shaderProgram.setVertexShader(vertexShader);
		this.structure = new kha.graphics4.VertexStructure();
		this.structure.add("vertexPosition",kha.graphics4.VertexData.Float3);
		this.structure.add("vertexColor",kha.graphics4.VertexData.Float4);
		this.shaderProgram.link(this.structure);
	}
	,initBuffers: function() {
		this.rectVertexBuffer = new kha.graphics4.VertexBuffer(kha.graphics4.ColoredShaderPainter.bufferSize * 4,this.structure,kha.graphics4.Usage.DynamicUsage);
		this.rectVertices = this.rectVertexBuffer.lock();
		this.indexBuffer = new kha.graphics4.IndexBuffer(kha.graphics4.ColoredShaderPainter.bufferSize * 3 * 2,kha.graphics4.Usage.StaticUsage);
		var indices = this.indexBuffer.lock();
		var _g1 = 0;
		var _g = kha.graphics4.ColoredShaderPainter.bufferSize;
		while(_g1 < _g) {
			var i = _g1++;
			indices[i * 3 * 2] = i * 4;
			indices[i * 3 * 2 + 1] = i * 4 + 1;
			indices[i * 3 * 2 + 2] = i * 4 + 2;
			indices[i * 3 * 2 + 3] = i * 4;
			indices[i * 3 * 2 + 4] = i * 4 + 2;
			indices[i * 3 * 2 + 5] = i * 4 + 3;
		}
		this.indexBuffer.unlock();
		this.triangleVertexBuffer = new kha.graphics4.VertexBuffer(kha.graphics4.ColoredShaderPainter.triangleBufferSize * 3,this.structure,kha.graphics4.Usage.DynamicUsage);
		this.triangleVertices = this.triangleVertexBuffer.lock();
		this.triangleIndexBuffer = new kha.graphics4.IndexBuffer(kha.graphics4.ColoredShaderPainter.triangleBufferSize * 3,kha.graphics4.Usage.StaticUsage);
		var triIndices = this.triangleIndexBuffer.lock();
		var _g11 = 0;
		var _g2 = kha.graphics4.ColoredShaderPainter.bufferSize;
		while(_g11 < _g2) {
			var i1 = _g11++;
			triIndices[i1 * 3] = i1 * 3;
			triIndices[i1 * 3 + 1] = i1 * 3 + 1;
			triIndices[i1 * 3 + 2] = i1 * 3 + 2;
		}
		this.triangleIndexBuffer.unlock();
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = this.bufferIndex * 7 * 4;
		this.rectVertices[baseIndex] = bottomleftx;
		this.rectVertices[baseIndex + 1] = bottomlefty;
		this.rectVertices[baseIndex + 2] = -5.0;
		this.rectVertices[baseIndex + 7] = topleftx;
		this.rectVertices[baseIndex + 8] = toplefty;
		this.rectVertices[baseIndex + 9] = -5.0;
		this.rectVertices[baseIndex + 14] = toprightx;
		this.rectVertices[baseIndex + 15] = toprighty;
		this.rectVertices[baseIndex + 16] = -5.0;
		this.rectVertices[baseIndex + 21] = bottomrightx;
		this.rectVertices[baseIndex + 22] = bottomrighty;
		this.rectVertices[baseIndex + 23] = -5.0;
	}
	,setRectColors: function(color) {
		var baseIndex = this.bufferIndex * 7 * 4;
		this.rectVertices[baseIndex + 3] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 4] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 5] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 6] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 10] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 11] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 12] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 13] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 17] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 18] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 19] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 20] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 24] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 25] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 26] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 27] = kha._Color.Color_Impl_.get_Ab(color) / 255;
	}
	,setTriVertices: function(x1,y1,x2,y2,x3,y3) {
		var baseIndex = this.triangleBufferIndex * 7 * 3;
		this.triangleVertices[baseIndex] = x1;
		this.triangleVertices[baseIndex + 1] = y1;
		this.triangleVertices[baseIndex + 2] = -5.0;
		this.triangleVertices[baseIndex + 7] = x2;
		this.triangleVertices[baseIndex + 8] = y2;
		this.triangleVertices[baseIndex + 9] = -5.0;
		this.triangleVertices[baseIndex + 14] = x3;
		this.triangleVertices[baseIndex + 15] = y3;
		this.triangleVertices[baseIndex + 16] = -5.0;
	}
	,setTriColors: function(color) {
		var baseIndex = this.triangleBufferIndex * 7 * 3;
		this.triangleVertices[baseIndex + 3] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.triangleVertices[baseIndex + 4] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.triangleVertices[baseIndex + 5] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.triangleVertices[baseIndex + 6] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.triangleVertices[baseIndex + 10] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.triangleVertices[baseIndex + 11] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.triangleVertices[baseIndex + 12] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.triangleVertices[baseIndex + 13] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.triangleVertices[baseIndex + 17] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.triangleVertices[baseIndex + 18] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.triangleVertices[baseIndex + 19] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.triangleVertices[baseIndex + 20] = kha._Color.Color_Impl_.get_Ab(color) / 255;
	}
	,drawBuffer: function(trisDone) {
		if(!trisDone) this.endTris(true);
		this.rectVertexBuffer.unlock();
		this.g.setVertexBuffer(this.rectVertexBuffer);
		this.g.setIndexBuffer(this.indexBuffer);
		this.g.setProgram(this.get_program() == null?this.shaderProgram:this.get_program());
		this.g.setMatrix(this.projectionLocation,this.projectionMatrix);
		if(this.sourceBlend == kha.graphics4.BlendingOperation.Undefined || this.destinationBlend == kha.graphics4.BlendingOperation.Undefined) this.g.setBlendingMode(kha.graphics4.BlendingOperation.SourceAlpha,kha.graphics4.BlendingOperation.InverseSourceAlpha); else this.g.setBlendingMode(this.sourceBlend,this.destinationBlend);
		this.g.drawIndexedVertices(0,this.bufferIndex * 2 * 3);
		this.bufferIndex = 0;
	}
	,drawTriBuffer: function(rectsDone) {
		if(!rectsDone) this.endRects(true);
		this.triangleVertexBuffer.unlock();
		this.g.setVertexBuffer(this.triangleVertexBuffer);
		this.g.setIndexBuffer(this.triangleIndexBuffer);
		this.g.setProgram(this.get_program() == null?this.shaderProgram:this.get_program());
		this.g.setMatrix(this.projectionLocation,this.projectionMatrix);
		if(this.sourceBlend == kha.graphics4.BlendingOperation.Undefined || this.destinationBlend == kha.graphics4.BlendingOperation.Undefined) this.g.setBlendingMode(kha.graphics4.BlendingOperation.SourceAlpha,kha.graphics4.BlendingOperation.InverseSourceAlpha); else this.g.setBlendingMode(this.sourceBlend,this.destinationBlend);
		this.g.drawIndexedVertices(0,this.triangleBufferIndex * 3);
		this.triangleBufferIndex = 0;
	}
	,fillRect: function(color,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		if(this.bufferIndex + 1 >= kha.graphics4.ColoredShaderPainter.bufferSize) this.drawBuffer(false);
		this.setRectColors(color);
		this.setRectVertices(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty);
		++this.bufferIndex;
	}
	,fillTriangle: function(color,x1,y1,x2,y2,x3,y3) {
		if(this.triangleBufferIndex + 1 >= kha.graphics4.ColoredShaderPainter.triangleBufferSize) this.drawTriBuffer(false);
		this.setTriColors(color);
		this.setTriVertices(x1,y1,x2,y2,x3,y3);
		++this.triangleBufferIndex;
	}
	,endTris: function(rectsDone) {
		if(this.triangleBufferIndex > 0) this.drawTriBuffer(rectsDone);
	}
	,endRects: function(trisDone) {
		if(this.bufferIndex > 0) this.drawBuffer(trisDone);
	}
	,end: function() {
		this.endTris(false);
		this.endRects(false);
	}
	,__class__: kha.graphics4.ColoredShaderPainter
	,__properties__: {set_program:"set_program",get_program:"get_program"}
};
kha.graphics4.TextShaderPainter = function(g4) {
	this.destinationBlend = kha.graphics4.BlendingOperation.Undefined;
	this.sourceBlend = kha.graphics4.BlendingOperation.Undefined;
	this.myProgram = null;
	this.g = g4;
	this.bufferIndex = 0;
	this.initShaders();
	this.initBuffers();
	this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix");
	this.textureLocation = this.shaderProgram.getTextureUnit("tex");
};
$hxClasses["kha.graphics4.TextShaderPainter"] = kha.graphics4.TextShaderPainter;
kha.graphics4.TextShaderPainter.__name__ = ["kha","graphics4","TextShaderPainter"];
kha.graphics4.TextShaderPainter.prototype = {
	get_program: function() {
		return this.myProgram;
	}
	,set_program: function(prog) {
		if(prog == null) {
			this.projectionLocation = this.shaderProgram.getConstantLocation("projectionMatrix");
			this.textureLocation = this.shaderProgram.getTextureUnit("tex");
		} else {
			this.projectionLocation = prog.getConstantLocation("projectionMatrix");
			this.textureLocation = prog.getTextureUnit("tex");
		}
		return this.myProgram = prog;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initShaders: function() {
		var fragmentShader = new kha.graphics4.FragmentShader(kha.Loader.the.getShader("painter-text.frag"));
		var vertexShader = new kha.graphics4.VertexShader(kha.Loader.the.getShader("painter-text.vert"));
		this.shaderProgram = new kha.graphics4.Program();
		this.shaderProgram.setFragmentShader(fragmentShader);
		this.shaderProgram.setVertexShader(vertexShader);
		this.structure = new kha.graphics4.VertexStructure();
		this.structure.add("vertexPosition",kha.graphics4.VertexData.Float3);
		this.structure.add("texPosition",kha.graphics4.VertexData.Float2);
		this.structure.add("vertexColor",kha.graphics4.VertexData.Float4);
		this.shaderProgram.link(this.structure);
	}
	,initBuffers: function() {
		this.rectVertexBuffer = new kha.graphics4.VertexBuffer(kha.graphics4.TextShaderPainter.bufferSize * 4,this.structure,kha.graphics4.Usage.DynamicUsage);
		this.rectVertices = this.rectVertexBuffer.lock();
		this.indexBuffer = new kha.graphics4.IndexBuffer(kha.graphics4.TextShaderPainter.bufferSize * 3 * 2,kha.graphics4.Usage.StaticUsage);
		var indices = this.indexBuffer.lock();
		var _g1 = 0;
		var _g = kha.graphics4.TextShaderPainter.bufferSize;
		while(_g1 < _g) {
			var i = _g1++;
			indices[i * 3 * 2] = i * 4;
			indices[i * 3 * 2 + 1] = i * 4 + 1;
			indices[i * 3 * 2 + 2] = i * 4 + 2;
			indices[i * 3 * 2 + 3] = i * 4;
			indices[i * 3 * 2 + 4] = i * 4 + 2;
			indices[i * 3 * 2 + 5] = i * 4 + 3;
		}
		this.indexBuffer.unlock();
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = this.bufferIndex * 9 * 4;
		this.rectVertices[baseIndex] = bottomleftx;
		this.rectVertices[baseIndex + 1] = bottomlefty;
		this.rectVertices[baseIndex + 2] = -5.0;
		this.rectVertices[baseIndex + 9] = topleftx;
		this.rectVertices[baseIndex + 10] = toplefty;
		this.rectVertices[baseIndex + 11] = -5.0;
		this.rectVertices[baseIndex + 18] = toprightx;
		this.rectVertices[baseIndex + 19] = toprighty;
		this.rectVertices[baseIndex + 20] = -5.0;
		this.rectVertices[baseIndex + 27] = bottomrightx;
		this.rectVertices[baseIndex + 28] = bottomrighty;
		this.rectVertices[baseIndex + 29] = -5.0;
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = this.bufferIndex * 9 * 4;
		this.rectVertices[baseIndex + 3] = left;
		this.rectVertices[baseIndex + 4] = bottom;
		this.rectVertices[baseIndex + 12] = left;
		this.rectVertices[baseIndex + 13] = top;
		this.rectVertices[baseIndex + 21] = right;
		this.rectVertices[baseIndex + 22] = top;
		this.rectVertices[baseIndex + 30] = right;
		this.rectVertices[baseIndex + 31] = bottom;
	}
	,setRectColors: function(color) {
		var baseIndex = this.bufferIndex * 9 * 4;
		this.rectVertices[baseIndex + 5] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 6] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 7] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 8] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 14] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 15] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 16] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 17] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 23] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 24] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 25] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 26] = kha._Color.Color_Impl_.get_Ab(color) / 255;
		this.rectVertices[baseIndex + 32] = kha._Color.Color_Impl_.get_Rb(color) / 255;
		this.rectVertices[baseIndex + 33] = kha._Color.Color_Impl_.get_Gb(color) / 255;
		this.rectVertices[baseIndex + 34] = kha._Color.Color_Impl_.get_Bb(color) / 255;
		this.rectVertices[baseIndex + 35] = kha._Color.Color_Impl_.get_Ab(color) / 255;
	}
	,drawBuffer: function() {
		this.rectVertexBuffer.unlock();
		this.g.setVertexBuffer(this.rectVertexBuffer);
		this.g.setIndexBuffer(this.indexBuffer);
		this.g.setProgram(this.get_program() == null?this.shaderProgram:this.get_program());
		this.g.setTexture(this.textureLocation,this.lastTexture);
		this.g.setMatrix(this.projectionLocation,this.projectionMatrix);
		if(this.sourceBlend == kha.graphics4.BlendingOperation.Undefined || this.destinationBlend == kha.graphics4.BlendingOperation.Undefined) this.g.setBlendingMode(kha.graphics4.BlendingOperation.SourceAlpha,kha.graphics4.BlendingOperation.InverseSourceAlpha); else this.g.setBlendingMode(this.sourceBlend,this.destinationBlend);
		this.g.drawIndexedVertices(0,this.bufferIndex * 2 * 3);
		this.g.setTexture(this.textureLocation,null);
		this.bufferIndex = 0;
	}
	,setFont: function(font) {
		this.font = js.Boot.__cast(font , kha.Kravur);
	}
	,startString: function(text) {
		this.text = text;
	}
	,charCodeAt: function(position) {
		return HxOverrides.cca(this.text,position);
	}
	,stringLength: function() {
		return this.text.length;
	}
	,endString: function() {
		this.text = null;
	}
	,drawString: function(text,color,x,y,transformation) {
		var tex = this.font.getTexture();
		if(this.lastTexture != null && tex != this.lastTexture) this.drawBuffer();
		this.lastTexture = tex;
		var xpos = x;
		var ypos = y;
		this.startString(text);
		var _g1 = 0;
		var _g = this.stringLength();
		while(_g1 < _g) {
			var i = _g1++;
			var q = this.font.getBakedQuad(this.charCodeAt(i) - 32,xpos,ypos);
			if(q != null) {
				if(this.bufferIndex + 1 >= kha.graphics4.TextShaderPainter.bufferSize) this.drawBuffer();
				this.setRectColors(color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var p0;
				var value_x = q.x0;
				var value_y = q.y1;
				var product = new kha.math.Vector2();
				var f = 0;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
				var w = f;
				f = 0;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
				product.x = f / w;
				f = 0;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
				f += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
				product.y = f / w;
				p0 = product;
				var p1;
				var value_x1 = q.x0;
				var value_y1 = q.y0;
				var product1 = new kha.math.Vector2();
				var f1 = 0;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
				var w1 = f1;
				f1 = 0;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
				product1.x = f1 / w1;
				f1 = 0;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y1;
				f1 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
				product1.y = f1 / w1;
				p1 = product1;
				var p2;
				var value_x2 = q.x1;
				var value_y2 = q.y0;
				var product2 = new kha.math.Vector2();
				var f2 = 0;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
				var w2 = f2;
				f2 = 0;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
				product2.x = f2 / w2;
				f2 = 0;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y2;
				f2 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
				product2.y = f2 / w2;
				p2 = product2;
				var p3;
				var value_x3 = q.x1;
				var value_y3 = q.y1;
				var product3 = new kha.math.Vector2();
				var f3 = 0;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
				var w3 = f3;
				f3 = 0;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
				product3.x = f3 / w3;
				f3 = 0;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y3;
				f3 += transformation[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
				product3.y = f3 / w3;
				p3 = product3;
				this.setRectVertices(p0.x,p0.y,p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
				xpos += q.xadvance;
				++this.bufferIndex;
			}
		}
		this.endString();
	}
	,end: function() {
		if(this.bufferIndex > 0) this.drawBuffer();
		this.lastTexture = null;
	}
	,__class__: kha.graphics4.TextShaderPainter
	,__properties__: {set_program:"set_program",get_program:"get_program"}
};
kha.graphics4.Graphics2 = function(canvas) {
	kha.graphics2.Graphics.call(this);
	this.set_color(kha._Color.Color_Impl_.White);
	this.canvas = canvas;
	this.g = canvas.get_g4();
	this.imagePainter = new kha.graphics4.ImageShaderPainter(this.g);
	this.coloredPainter = new kha.graphics4.ColoredShaderPainter(this.g);
	this.textPainter = new kha.graphics4.TextShaderPainter(this.g);
	this.setProjection();
};
$hxClasses["kha.graphics4.Graphics2"] = kha.graphics4.Graphics2;
kha.graphics4.Graphics2.__name__ = ["kha","graphics4","Graphics2"];
kha.graphics4.Graphics2.upperPowerOfTwo = function(v) {
	v--;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	v++;
	return v;
};
kha.graphics4.Graphics2.__super__ = kha.graphics2.Graphics;
kha.graphics4.Graphics2.prototype = $extend(kha.graphics2.Graphics.prototype,{
	setProjection: function() {
		if(js.Boot.__instanceof(this.canvas,kha.Framebuffer)) this.projectionMatrix = kha.math.Matrix4.orthogonalProjection(0,this.canvas.get_width(),this.canvas.get_height(),0,0.1,1000); else this.projectionMatrix = kha.math.Matrix4.orthogonalProjection(0,kha.Image.get_nonPow2Supported()?this.canvas.get_width():kha.graphics4.Graphics2.upperPowerOfTwo(this.canvas.get_width()),kha.Image.get_nonPow2Supported()?this.canvas.get_height():kha.graphics4.Graphics2.upperPowerOfTwo(this.canvas.get_height()),0,0.1,1000);
		this.imagePainter.setProjection(this.projectionMatrix);
		this.coloredPainter.setProjection(this.projectionMatrix);
		this.textPainter.setProjection(this.projectionMatrix);
	}
	,drawImage: function(img,x,y) {
		this.coloredPainter.end();
		this.textPainter.end();
		var p1;
		var this1 = this.get_transformation();
		var value = new kha.math.Vector2(x,y + img.get_height());
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var p2;
		var this2 = this.get_transformation();
		var value_x = x;
		var value_y = y;
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var p3;
		var this3 = this.get_transformation();
		var value1 = new kha.math.Vector2(x + img.get_width(),y);
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value1.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value1.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value1.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value1.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value1.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value1.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		var p4;
		var this4 = this.get_transformation();
		var value2 = new kha.math.Vector2(x + img.get_width(),y + img.get_height());
		var product3 = new kha.math.Vector2();
		var f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value2.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value2.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w3 = f3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value2.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value2.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product3.x = f3 / w3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value2.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value2.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product3.y = f3 / w3;
		p4 = product3;
		this.imagePainter.drawImage(img,p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y,this.get_opacity(),this.get_color());
	}
	,drawScaledSubImage: function(img,sx,sy,sw,sh,dx,dy,dw,dh) {
		this.coloredPainter.end();
		this.textPainter.end();
		var p1;
		var this1 = this.get_transformation();
		var value_x = dx;
		var value_y = dy + dh;
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var p2;
		var this2 = this.get_transformation();
		var value_x1 = dx;
		var value_y1 = dy;
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var p3;
		var this3 = this.get_transformation();
		var value_x2 = dx + dw;
		var value_y2 = dy;
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		var p4;
		var this4 = this.get_transformation();
		var value_x3 = dx + dw;
		var value_y3 = dy + dh;
		var product3 = new kha.math.Vector2();
		var f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w3 = f3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product3.x = f3 / w3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product3.y = f3 / w3;
		p4 = product3;
		this.imagePainter.drawImage2(img,sx,sy,sw,sh,p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y,this.get_opacity(),this.get_color());
	}
	,get_color: function() {
		return this.myColor;
	}
	,set_color: function(color) {
		return this.myColor = color;
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) strength = 1.0;
		this.imagePainter.end();
		this.textPainter.end();
		var p1;
		var this1 = this.get_transformation();
		var value_x = x - strength / 2;
		var value_y = y + strength / 2;
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var p2;
		var this2 = this.get_transformation();
		var value_x1 = x - strength / 2;
		var value_y1 = y - strength / 2;
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var p3;
		var this3 = this.get_transformation();
		var value_x2 = x + width + strength / 2;
		var value_y2 = y - strength / 2;
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		var p4;
		var this4 = this.get_transformation();
		var value_x3 = x + width + strength / 2;
		var value_y3 = y + strength / 2;
		var product3 = new kha.math.Vector2();
		var f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w3 = f3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product3.x = f3 / w3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product3.y = f3 / w3;
		p4 = product3;
		this.coloredPainter.fillRect(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
		var this5 = this.get_transformation();
		var value_x4 = x - strength / 2;
		var value_y4 = y + height + strength / 2;
		var product4 = new kha.math.Vector2();
		var f4 = 0;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w4 = f4;
		f4 = 0;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product4.x = f4 / w4;
		f4 = 0;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y4;
		f4 += this5[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product4.y = f4 / w4;
		p1 = product4;
		var this6 = this.get_transformation();
		var value_x5 = x + strength / 2;
		var value_y5 = y - strength / 2;
		var product5 = new kha.math.Vector2();
		var f5 = 0;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w5 = f5;
		f5 = 0;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product5.x = f5 / w5;
		f5 = 0;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y5;
		f5 += this6[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product5.y = f5 / w5;
		p3 = product5;
		var this7 = this.get_transformation();
		var value_x6 = x + strength / 2;
		var value_y6 = y + height + strength / 2;
		var product6 = new kha.math.Vector2();
		var f6 = 0;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w6 = f6;
		f6 = 0;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product6.x = f6 / w6;
		f6 = 0;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y6;
		f6 += this7[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product6.y = f6 / w6;
		p4 = product6;
		this.coloredPainter.fillRect(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
		var this8 = this.get_transformation();
		var value_x7 = x - strength / 2;
		var value_y7 = y + height - strength / 2;
		var product7 = new kha.math.Vector2();
		var f7 = 0;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w7 = f7;
		f7 = 0;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product7.x = f7 / w7;
		f7 = 0;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y7;
		f7 += this8[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product7.y = f7 / w7;
		p2 = product7;
		var this9 = this.get_transformation();
		var value_x8 = x + width + strength / 2;
		var value_y8 = y + height - strength / 2;
		var product8 = new kha.math.Vector2();
		var f8 = 0;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w8 = f8;
		f8 = 0;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product8.x = f8 / w8;
		f8 = 0;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y8;
		f8 += this9[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product8.y = f8 / w8;
		p3 = product8;
		var this10 = this.get_transformation();
		var value_x9 = x + width + strength / 2;
		var value_y9 = y + height + strength / 2;
		var product9 = new kha.math.Vector2();
		var f9 = 0;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w9 = f9;
		f9 = 0;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product9.x = f9 / w9;
		f9 = 0;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y9;
		f9 += this10[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product9.y = f9 / w9;
		p4 = product9;
		this.coloredPainter.fillRect(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
		var this11 = this.get_transformation();
		var value_x10 = x + width - strength / 2;
		var value_y10 = y + height + strength / 2;
		var product10 = new kha.math.Vector2();
		var f10 = 0;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w10 = f10;
		f10 = 0;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product10.x = f10 / w10;
		f10 = 0;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y10;
		f10 += this11[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product10.y = f10 / w10;
		p1 = product10;
		var this12 = this.get_transformation();
		var value_x11 = x + width - strength / 2;
		var value_y11 = y - strength / 2;
		var product11 = new kha.math.Vector2();
		var f11 = 0;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w11 = f11;
		f11 = 0;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product11.x = f11 / w11;
		f11 = 0;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y11;
		f11 += this12[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product11.y = f11 / w11;
		p2 = product11;
		var this13 = this.get_transformation();
		var value_x12 = x + width + strength / 2;
		var value_y12 = y - strength / 2;
		var product12 = new kha.math.Vector2();
		var f12 = 0;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w12 = f12;
		f12 = 0;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product12.x = f12 / w12;
		f12 = 0;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y12;
		f12 += this13[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product12.y = f12 / w12;
		p3 = product12;
		var this14 = this.get_transformation();
		var value_x13 = x + width + strength / 2;
		var value_y13 = y + height + strength / 2;
		var product13 = new kha.math.Vector2();
		var f13 = 0;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w13 = f13;
		f13 = 0;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product13.x = f13 / w13;
		f13 = 0;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y13;
		f13 += this14[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product13.y = f13 / w13;
		p4 = product13;
		this.coloredPainter.fillRect(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
	}
	,fillRect: function(x,y,width,height) {
		this.imagePainter.end();
		this.textPainter.end();
		var p1;
		var this1 = this.get_transformation();
		var value_x = x;
		var value_y = y + height;
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var p2;
		var this2 = this.get_transformation();
		var value_x1 = x;
		var value_y1 = y;
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var p3;
		var this3 = this.get_transformation();
		var value_x2 = x + width;
		var value_y2 = y;
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		var p4;
		var this4 = this.get_transformation();
		var value_x3 = x + width;
		var value_y3 = y + height;
		var product3 = new kha.math.Vector2();
		var f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w3 = f3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product3.x = f3 / w3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y3;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product3.y = f3 / w3;
		p4 = product3;
		this.coloredPainter.fillRect(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
	}
	,drawString: function(text,x,y) {
		this.imagePainter.end();
		this.coloredPainter.end();
		this.textPainter.drawString(text,this.get_color(),x,y,this.get_transformation());
	}
	,get_font: function() {
		return this.myFont;
	}
	,set_font: function(font) {
		this.textPainter.setFont(font);
		return this.myFont = font;
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) strength = 1.0;
		this.imagePainter.end();
		this.textPainter.end();
		var vec;
		if(y2 == y1) vec = new kha.math.Vector2(0,-1); else vec = new kha.math.Vector2(1,-(x2 - x1) / (y2 - y1));
		vec.set_length(strength);
		var p1 = new kha.math.Vector2(x1 + 0.5 * vec.x,y1 + 0.5 * vec.y);
		var p2 = new kha.math.Vector2(x2 + 0.5 * vec.x,y2 + 0.5 * vec.y);
		var p3 = p1.sub(vec);
		var p4 = p2.sub(vec);
		var this1 = this.get_transformation();
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * p1.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * p1.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * p1.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * p1.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * p1.x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * p1.y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var this2 = this.get_transformation();
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * p2.x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * p2.y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * p2.x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * p2.y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * p2.x;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * p2.y;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var this3 = this.get_transformation();
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * p3.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * p3.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * p3.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * p3.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * p3.x;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * p3.y;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		var this4 = this.get_transformation();
		var product3 = new kha.math.Vector2();
		var f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * p4.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * p4.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w3 = f3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * p4.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * p4.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product3.x = f3 / w3;
		f3 = 0;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * p4.x;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * p4.y;
		f3 += this4[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product3.y = f3 / w3;
		p4 = product3;
		this.coloredPainter.fillTriangle(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
		this.coloredPainter.fillTriangle(this.get_color(),p3.x,p3.y,p2.x,p2.y,p4.x,p4.y);
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
		this.imagePainter.end();
		this.textPainter.end();
		var p1;
		var this1 = this.get_transformation();
		var value_x = x1;
		var value_y = y1;
		var product = new kha.math.Vector2();
		var f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w = f;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product.x = f / w;
		f = 0;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y;
		f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product.y = f / w;
		p1 = product;
		var p2;
		var this2 = this.get_transformation();
		var value_x1 = x2;
		var value_y1 = y2;
		var product1 = new kha.math.Vector2();
		var f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w1 = f1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product1.x = f1 / w1;
		f1 = 0;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y1;
		f1 += this2[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product1.y = f1 / w1;
		p2 = product1;
		var p3;
		var this3 = this.get_transformation();
		var value_x2 = x3;
		var value_y2 = y3;
		var product2 = new kha.math.Vector2();
		var f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
		var w2 = f2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
		product2.x = f2 / w2;
		f2 = 0;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value_x2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value_y2;
		f2 += this3[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
		product2.y = f2 / w2;
		p3 = product2;
		this.coloredPainter.fillTriangle(this.get_color(),p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
	}
	,setBilinearFiltering: function(bilinear) {
		this.imagePainter.setBilinearFilter(bilinear);
	}
	,setProgram: function(program) {
		this.endDrawing();
		this.imagePainter.set_program(program);
		this.coloredPainter.set_program(program);
		this.textPainter.set_program(program);
		if(program != null) this.g.setProgram(program);
	}
	,setBlendingMode: function(source,destination) {
		this.endDrawing();
		this.imagePainter.sourceBlend = source;
		this.imagePainter.destinationBlend = destination;
		this.coloredPainter.sourceBlend = source;
		this.coloredPainter.destinationBlend = destination;
		this.textPainter.sourceBlend = source;
		this.textPainter.destinationBlend = destination;
	}
	,begin: function(clear,clearColor) {
		if(clear == null) clear = true;
		this.g.begin();
		if(clear) this.clear(clearColor);
		this.setProjection();
	}
	,clear: function(color) {
		this.g.clear(color == null?kha._Color.Color_Impl_.Black:color);
	}
	,endDrawing: function() {
		this.imagePainter.end();
		this.textPainter.end();
		this.coloredPainter.end();
	}
	,end: function() {
		this.endDrawing();
		this.g.end();
	}
	,__class__: kha.graphics4.Graphics2
});
kha.graphics4.IndexBuffer = function(indexCount,usage,canRead) {
	if(canRead == null) canRead = false;
	this.usage = usage;
	this.mySize = indexCount;
	this.buffer = kha.Sys.gl.createBuffer();
	this.data = new Array();
	this.data[indexCount - 1] = 0;
};
$hxClasses["kha.graphics4.IndexBuffer"] = kha.graphics4.IndexBuffer;
kha.graphics4.IndexBuffer.__name__ = ["kha","graphics4","IndexBuffer"];
kha.graphics4.IndexBuffer.prototype = {
	lock: function() {
		return this.data;
	}
	,unlock: function() {
		kha.Sys.gl.bindBuffer(kha.Sys.gl.ELEMENT_ARRAY_BUFFER,this.buffer);
		kha.Sys.gl.bufferData(kha.Sys.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.data),this.usage == kha.graphics4.Usage.DynamicUsage?kha.Sys.gl.DYNAMIC_DRAW:kha.Sys.gl.STATIC_DRAW);
	}
	,set: function() {
		kha.Sys.gl.bindBuffer(kha.Sys.gl.ELEMENT_ARRAY_BUFFER,this.buffer);
	}
	,count: function() {
		return this.mySize;
	}
	,__class__: kha.graphics4.IndexBuffer
};
kha.graphics4.MipMapFilter = $hxClasses["kha.graphics4.MipMapFilter"] = { __ename__ : ["kha","graphics4","MipMapFilter"], __constructs__ : ["NoMipFilter","PointMipFilter","LinearMipFilter"] };
kha.graphics4.MipMapFilter.NoMipFilter = ["NoMipFilter",0];
kha.graphics4.MipMapFilter.NoMipFilter.__enum__ = kha.graphics4.MipMapFilter;
kha.graphics4.MipMapFilter.PointMipFilter = ["PointMipFilter",1];
kha.graphics4.MipMapFilter.PointMipFilter.__enum__ = kha.graphics4.MipMapFilter;
kha.graphics4.MipMapFilter.LinearMipFilter = ["LinearMipFilter",2];
kha.graphics4.MipMapFilter.LinearMipFilter.__enum__ = kha.graphics4.MipMapFilter;
kha.graphics4.Program = function() {
	this.program = kha.Sys.gl.createProgram();
	this.textures = new Array();
	this.textureValues = new Array();
};
$hxClasses["kha.graphics4.Program"] = kha.graphics4.Program;
kha.graphics4.Program.__name__ = ["kha","graphics4","Program"];
kha.graphics4.Program.prototype = {
	setVertexShader: function(vertexShader) {
		this.vertexShader = vertexShader;
	}
	,setFragmentShader: function(fragmentShader) {
		this.fragmentShader = fragmentShader;
	}
	,link: function(structure) {
		this.compileShader(this.vertexShader);
		this.compileShader(this.fragmentShader);
		kha.Sys.gl.attachShader(this.program,this.vertexShader.shader);
		kha.Sys.gl.attachShader(this.program,this.fragmentShader.shader);
		var index = 0;
		var _g = 0;
		var _g1 = structure.elements;
		while(_g < _g1.length) {
			var element = _g1[_g];
			++_g;
			kha.Sys.gl.bindAttribLocation(this.program,index,element.name);
			++index;
		}
		kha.Sys.gl.linkProgram(this.program);
		if(!kha.Sys.gl.getProgramParameter(this.program,kha.Sys.gl.LINK_STATUS)) throw "Could not link the shader program.";
	}
	,set: function() {
		kha.Sys.gl.useProgram(this.program);
		var _g1 = 0;
		var _g = this.textureValues.length;
		while(_g1 < _g) {
			var index = _g1++;
			kha.Sys.gl.uniform1i(this.textureValues[index],index);
		}
	}
	,compileShader: function(shader) {
		if(shader.shader != null) return;
		var s = kha.Sys.gl.createShader(shader.type);
		kha.Sys.gl.shaderSource(s,shader.source);
		kha.Sys.gl.compileShader(s);
		if(!kha.Sys.gl.getShaderParameter(s,kha.Sys.gl.COMPILE_STATUS)) throw "Could not compile shader:\n" + Std.string(kha.Sys.gl.getShaderInfoLog(s));
		shader.shader = s;
	}
	,getConstantLocation: function(name) {
		return new kha.js.graphics4.ConstantLocation(kha.Sys.gl.getUniformLocation(this.program,name));
	}
	,getTextureUnit: function(name) {
		var index = this.findTexture(name);
		if(index < 0) {
			var location = kha.Sys.gl.getUniformLocation(this.program,name);
			index = this.textures.length;
			this.textureValues.push(location);
			this.textures.push(name);
		}
		return new kha.js.graphics4.TextureUnit(index);
	}
	,findTexture: function(name) {
		var _g1 = 0;
		var _g = this.textures.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.textures[index] == name) return index;
		}
		return -1;
	}
	,__class__: kha.graphics4.Program
};
kha.graphics4.StencilAction = $hxClasses["kha.graphics4.StencilAction"] = { __ename__ : ["kha","graphics4","StencilAction"], __constructs__ : ["Keep","Zero","Replace","Increment","IncrementWrap","Decrement","DecrementWrap","Invert"] };
kha.graphics4.StencilAction.Keep = ["Keep",0];
kha.graphics4.StencilAction.Keep.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.Zero = ["Zero",1];
kha.graphics4.StencilAction.Zero.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.Replace = ["Replace",2];
kha.graphics4.StencilAction.Replace.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.Increment = ["Increment",3];
kha.graphics4.StencilAction.Increment.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.IncrementWrap = ["IncrementWrap",4];
kha.graphics4.StencilAction.IncrementWrap.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.Decrement = ["Decrement",5];
kha.graphics4.StencilAction.Decrement.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.DecrementWrap = ["DecrementWrap",6];
kha.graphics4.StencilAction.DecrementWrap.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.StencilAction.Invert = ["Invert",7];
kha.graphics4.StencilAction.Invert.__enum__ = kha.graphics4.StencilAction;
kha.graphics4.TexDir = $hxClasses["kha.graphics4.TexDir"] = { __ename__ : ["kha","graphics4","TexDir"], __constructs__ : ["U","V"] };
kha.graphics4.TexDir.U = ["U",0];
kha.graphics4.TexDir.U.__enum__ = kha.graphics4.TexDir;
kha.graphics4.TexDir.V = ["V",1];
kha.graphics4.TexDir.V.__enum__ = kha.graphics4.TexDir;
kha.graphics4.TextureAddressing = $hxClasses["kha.graphics4.TextureAddressing"] = { __ename__ : ["kha","graphics4","TextureAddressing"], __constructs__ : ["Repeat","Mirror","Clamp"] };
kha.graphics4.TextureAddressing.Repeat = ["Repeat",0];
kha.graphics4.TextureAddressing.Repeat.__enum__ = kha.graphics4.TextureAddressing;
kha.graphics4.TextureAddressing.Mirror = ["Mirror",1];
kha.graphics4.TextureAddressing.Mirror.__enum__ = kha.graphics4.TextureAddressing;
kha.graphics4.TextureAddressing.Clamp = ["Clamp",2];
kha.graphics4.TextureAddressing.Clamp.__enum__ = kha.graphics4.TextureAddressing;
kha.graphics4.TextureFilter = $hxClasses["kha.graphics4.TextureFilter"] = { __ename__ : ["kha","graphics4","TextureFilter"], __constructs__ : ["PointFilter","LinearFilter","AnisotropicFilter"] };
kha.graphics4.TextureFilter.PointFilter = ["PointFilter",0];
kha.graphics4.TextureFilter.PointFilter.__enum__ = kha.graphics4.TextureFilter;
kha.graphics4.TextureFilter.LinearFilter = ["LinearFilter",1];
kha.graphics4.TextureFilter.LinearFilter.__enum__ = kha.graphics4.TextureFilter;
kha.graphics4.TextureFilter.AnisotropicFilter = ["AnisotropicFilter",2];
kha.graphics4.TextureFilter.AnisotropicFilter.__enum__ = kha.graphics4.TextureFilter;
kha.graphics4.TextureFormat = $hxClasses["kha.graphics4.TextureFormat"] = { __ename__ : ["kha","graphics4","TextureFormat"], __constructs__ : ["RGBA32","L8"] };
kha.graphics4.TextureFormat.RGBA32 = ["RGBA32",0];
kha.graphics4.TextureFormat.RGBA32.__enum__ = kha.graphics4.TextureFormat;
kha.graphics4.TextureFormat.L8 = ["L8",1];
kha.graphics4.TextureFormat.L8.__enum__ = kha.graphics4.TextureFormat;
kha.graphics4.TextureUnit = function() { };
$hxClasses["kha.graphics4.TextureUnit"] = kha.graphics4.TextureUnit;
kha.graphics4.TextureUnit.__name__ = ["kha","graphics4","TextureUnit"];
kha.graphics4.Usage = $hxClasses["kha.graphics4.Usage"] = { __ename__ : ["kha","graphics4","Usage"], __constructs__ : ["StaticUsage","DynamicUsage","ReadableUsage"] };
kha.graphics4.Usage.StaticUsage = ["StaticUsage",0];
kha.graphics4.Usage.StaticUsage.__enum__ = kha.graphics4.Usage;
kha.graphics4.Usage.DynamicUsage = ["DynamicUsage",1];
kha.graphics4.Usage.DynamicUsage.__enum__ = kha.graphics4.Usage;
kha.graphics4.Usage.ReadableUsage = ["ReadableUsage",2];
kha.graphics4.Usage.ReadableUsage.__enum__ = kha.graphics4.Usage;
kha.graphics4.VertexBuffer = function(vertexCount,structure,usage,canRead) {
	if(canRead == null) canRead = false;
	this.usage = usage;
	this.mySize = vertexCount;
	this.myStride = 0;
	var _g = 0;
	var _g1 = structure.elements;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		var _g2 = element.data;
		switch(_g2[1]) {
		case 0:
			this.myStride += 4;
			break;
		case 1:
			this.myStride += 8;
			break;
		case 2:
			this.myStride += 12;
			break;
		case 3:
			this.myStride += 16;
			break;
		}
	}
	this.buffer = kha.Sys.gl.createBuffer();
	this.data = new Array();
	this.data[(vertexCount * this.myStride / 4 | 0) - 1] = 0;
	this.sizes = new Array();
	this.offsets = new Array();
	this.sizes[structure.elements.length - 1] = 0;
	this.offsets[structure.elements.length - 1] = 0;
	var offset = 0;
	var index = 0;
	var _g3 = 0;
	var _g11 = structure.elements;
	while(_g3 < _g11.length) {
		var element1 = _g11[_g3];
		++_g3;
		var size;
		var _g21 = element1.data;
		switch(_g21[1]) {
		case 0:
			size = 1;
			break;
		case 1:
			size = 2;
			break;
		case 2:
			size = 3;
			break;
		case 3:
			size = 4;
			break;
		}
		this.sizes[index] = size;
		this.offsets[index] = offset;
		var _g22 = element1.data;
		switch(_g22[1]) {
		case 0:
			offset += 4;
			break;
		case 1:
			offset += 8;
			break;
		case 2:
			offset += 12;
			break;
		case 3:
			offset += 16;
			break;
		}
		++index;
	}
	this.array = new Float32Array(this.data);
};
$hxClasses["kha.graphics4.VertexBuffer"] = kha.graphics4.VertexBuffer;
kha.graphics4.VertexBuffer.__name__ = ["kha","graphics4","VertexBuffer"];
kha.graphics4.VertexBuffer.prototype = {
	lock: function(start,count) {
		return this.data;
	}
	,unlock: function() {
		this.array.set(this.data,0);
		kha.Sys.gl.bindBuffer(kha.Sys.gl.ARRAY_BUFFER,this.buffer);
		kha.Sys.gl.bufferData(kha.Sys.gl.ARRAY_BUFFER,this.array,this.usage == kha.graphics4.Usage.DynamicUsage?kha.Sys.gl.DYNAMIC_DRAW:kha.Sys.gl.STATIC_DRAW);
	}
	,stride: function() {
		return this.myStride;
	}
	,count: function() {
		return this.mySize;
	}
	,set: function() {
		kha.Sys.gl.bindBuffer(kha.Sys.gl.ARRAY_BUFFER,this.buffer);
		var _g1 = 0;
		var _g = this.sizes.length;
		while(_g1 < _g) {
			var i = _g1++;
			kha.Sys.gl.enableVertexAttribArray(i);
			kha.Sys.gl.vertexAttribPointer(i,this.sizes[i],kha.Sys.gl.FLOAT,false,this.myStride,this.offsets[i]);
		}
	}
	,__class__: kha.graphics4.VertexBuffer
};
kha.graphics4.VertexData = $hxClasses["kha.graphics4.VertexData"] = { __ename__ : ["kha","graphics4","VertexData"], __constructs__ : ["Float1","Float2","Float3","Float4"] };
kha.graphics4.VertexData.Float1 = ["Float1",0];
kha.graphics4.VertexData.Float1.__enum__ = kha.graphics4.VertexData;
kha.graphics4.VertexData.Float2 = ["Float2",1];
kha.graphics4.VertexData.Float2.__enum__ = kha.graphics4.VertexData;
kha.graphics4.VertexData.Float3 = ["Float3",2];
kha.graphics4.VertexData.Float3.__enum__ = kha.graphics4.VertexData;
kha.graphics4.VertexData.Float4 = ["Float4",3];
kha.graphics4.VertexData.Float4.__enum__ = kha.graphics4.VertexData;
kha.graphics4.VertexElement = function(name,data) {
	this.name = name;
	this.data = data;
};
$hxClasses["kha.graphics4.VertexElement"] = kha.graphics4.VertexElement;
kha.graphics4.VertexElement.__name__ = ["kha","graphics4","VertexElement"];
kha.graphics4.VertexElement.prototype = {
	__class__: kha.graphics4.VertexElement
};
kha.graphics4.VertexShader = function(source) {
	this.source = source.toString();
	this.type = kha.Sys.gl.VERTEX_SHADER;
	this.shader = null;
};
$hxClasses["kha.graphics4.VertexShader"] = kha.graphics4.VertexShader;
kha.graphics4.VertexShader.__name__ = ["kha","graphics4","VertexShader"];
kha.graphics4.VertexShader.prototype = {
	__class__: kha.graphics4.VertexShader
};
kha.graphics4.VertexStructure = function() {
	this.elements = new Array();
};
$hxClasses["kha.graphics4.VertexStructure"] = kha.graphics4.VertexStructure;
kha.graphics4.VertexStructure.__name__ = ["kha","graphics4","VertexStructure"];
kha.graphics4.VertexStructure.prototype = {
	add: function(name,data) {
		this.elements.push(new kha.graphics4.VertexElement(name,data));
	}
	,size: function() {
		return this.elements.length;
	}
	,get: function(index) {
		return this.elements[index];
	}
	,__class__: kha.graphics4.VertexStructure
};
kha.input = {};
kha.input.Gamepad = $hx_exports.kha.input.Gamepad = function() {
	this.axisListeners = new Array();
	this.buttonListeners = new Array();
	kha.input.Gamepad.instance = this;
};
$hxClasses["kha.input.Gamepad"] = kha.input.Gamepad;
kha.input.Gamepad.__name__ = ["kha","input","Gamepad"];
kha.input.Gamepad.get = function(num) {
	if(num == null) num = 0;
	if(num != 0) return null;
	return kha.input.Gamepad.instance;
};
kha.input.Gamepad.prototype = {
	notify: function(axisListener,buttonListener) {
		if(axisListener != null) this.axisListeners.push(axisListener);
		if(buttonListener != null) this.buttonListeners.push(buttonListener);
	}
	,remove: function(axisListener,buttonListener) {
		if(axisListener != null) HxOverrides.remove(this.axisListeners,axisListener);
		if(buttonListener != null) HxOverrides.remove(this.buttonListeners,buttonListener);
	}
	,sendAxisEvent: function(axis,value) {
		var _g = 0;
		var _g1 = this.axisListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(axis,value);
		}
	}
	,sendButtonEvent: function(button,value) {
		var _g = 0;
		var _g1 = this.buttonListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,value);
		}
	}
	,__class__: kha.input.Gamepad
};
kha.input.Keyboard = $hx_exports.kha.input.Keyboard = function() {
	this.downListeners = new Array();
	this.upListeners = new Array();
	kha.input.Keyboard.instance = this;
};
$hxClasses["kha.input.Keyboard"] = kha.input.Keyboard;
kha.input.Keyboard.__name__ = ["kha","input","Keyboard"];
kha.input.Keyboard.get = function(num) {
	if(num == null) num = 0;
	if(num != 0) return null;
	return kha.input.Keyboard.instance;
};
kha.input.Keyboard.prototype = {
	notify: function(downListener,upListener) {
		if(downListener != null) this.downListeners.push(downListener);
		if(upListener != null) this.upListeners.push(upListener);
	}
	,remove: function(downListener,upListener) {
		if(downListener != null) HxOverrides.remove(this.downListeners,downListener);
		if(upListener != null) HxOverrides.remove(this.upListeners,upListener);
	}
	,sendDownEvent: function(key,$char) {
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(key,$char);
		}
	}
	,sendUpEvent: function(key,$char) {
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(key,$char);
		}
	}
	,__class__: kha.input.Keyboard
};
kha.input.Mouse = $hx_exports.kha.input.Mouse = function() {
	this.downListeners = new Array();
	this.upListeners = new Array();
	this.moveListeners = new Array();
	this.wheelListeners = new Array();
	kha.input.Mouse.instance = this;
};
$hxClasses["kha.input.Mouse"] = kha.input.Mouse;
kha.input.Mouse.__name__ = ["kha","input","Mouse"];
kha.input.Mouse.get = function(num) {
	if(num == null) num = 0;
	if(num != 0) return null;
	return kha.input.Mouse.instance;
};
kha.input.Mouse.prototype = {
	notify: function(downListener,upListener,moveListener,wheelListener) {
		if(downListener != null) this.downListeners.push(downListener);
		if(upListener != null) this.upListeners.push(upListener);
		if(moveListener != null) this.moveListeners.push(moveListener);
		if(wheelListener != null) this.wheelListeners.push(wheelListener);
	}
	,remove: function(downListener,upListener,moveListener,wheelListener) {
		if(downListener != null) HxOverrides.remove(this.downListeners,downListener);
		if(upListener != null) HxOverrides.remove(this.upListeners,upListener);
		if(moveListener != null) this.moveListeners.push(moveListener);
		if(wheelListener != null) this.wheelListeners.push(wheelListener);
	}
	,sendDownEvent: function(button,x,y) {
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,x,y);
		}
	}
	,sendUpEvent: function(button,x,y) {
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,x,y);
		}
	}
	,sendMoveEvent: function(x,y) {
		var _g = 0;
		var _g1 = this.moveListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(x,y);
		}
	}
	,sendWheelEvent: function(delta) {
		var _g = 0;
		var _g1 = this.wheelListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(delta);
		}
	}
	,__class__: kha.input.Mouse
};
kha.js = {};
kha.js.CanvasGraphics = function(canvas,width,height) {
	kha.graphics2.Graphics.call(this);
	this.canvas = canvas;
	this.width = width;
	this.height = height;
	kha.js.CanvasGraphics.instance = this;
	this.myColor = kha._Color.Color_Impl_.fromBytes(0,0,0);
};
$hxClasses["kha.js.CanvasGraphics"] = kha.js.CanvasGraphics;
kha.js.CanvasGraphics.__name__ = ["kha","js","CanvasGraphics"];
kha.js.CanvasGraphics.stringWidth = function(font,text) {
	if(kha.js.CanvasGraphics.instance == null) return 5 * text.length; else {
		kha.js.CanvasGraphics.instance.set_font(font);
		return kha.js.CanvasGraphics.instance.canvas.measureText(text).width;
	}
};
kha.js.CanvasGraphics.__super__ = kha.graphics2.Graphics;
kha.js.CanvasGraphics.prototype = $extend(kha.graphics2.Graphics.prototype,{
	begin: function(clear,clearColor) {
		if(clear == null) clear = true;
		if(clear) this.clear(clearColor);
	}
	,clear: function(color) {
		if(color == null) color = kha._Color.Color_Impl_.Black;
		this.canvas.strokeStyle = "rgb(" + kha._Color.Color_Impl_.get_Rb(color) + "," + kha._Color.Color_Impl_.get_Gb(color) + "," + kha._Color.Color_Impl_.get_Bb(color) + ")";
		this.canvas.fillStyle = "rgb(" + kha._Color.Color_Impl_.get_Rb(color) + "," + kha._Color.Color_Impl_.get_Gb(color) + "," + kha._Color.Color_Impl_.get_Bb(color) + ")";
		this.canvas.fillRect(0,0,this.width,this.height);
		this.set_color(this.myColor);
	}
	,end: function() {
	}
	,drawImage: function(img,x,y) {
		this.canvas.globalAlpha = this.get_opacity();
		this.canvas.drawImage((js.Boot.__cast(img , kha.CanvasImage)).image,x,y);
		this.canvas.globalAlpha = 1;
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
		this.canvas.globalAlpha = this.get_opacity();
		try {
			if(dw < 0 || dh < 0) {
				this.canvas.save();
				this.canvas.translate(dx,dy);
				var x = 0.0;
				var y = 0.0;
				if(dw < 0) {
					this.canvas.scale(-1,1);
					x = -dw;
				}
				if(dh < 0) {
					this.canvas.scale(1,-1);
					y = -dh;
				}
				this.canvas.drawImage((js.Boot.__cast(image , kha.CanvasImage)).image,sx,sy,sw,sh,x,y,dw,dh);
				this.canvas.restore();
			} else this.canvas.drawImage((js.Boot.__cast(image , kha.CanvasImage)).image,sx,sy,sw,sh,dx,dy,dw,dh);
		} catch( ex ) {
		}
		this.canvas.globalAlpha = 1;
	}
	,set_color: function(color) {
		this.myColor = color;
		this.canvas.strokeStyle = "rgb(" + kha._Color.Color_Impl_.get_Rb(color) + "," + kha._Color.Color_Impl_.get_Gb(color) + "," + kha._Color.Color_Impl_.get_Bb(color) + ")";
		this.canvas.fillStyle = "rgb(" + kha._Color.Color_Impl_.get_Rb(color) + "," + kha._Color.Color_Impl_.get_Gb(color) + "," + kha._Color.Color_Impl_.get_Bb(color) + ")";
		return color;
	}
	,get_color: function() {
		return this.myColor;
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) strength = 1.0;
		this.canvas.beginPath();
		var oldStrength = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.rect(x,y,width,height);
		this.canvas.stroke();
		this.canvas.lineWidth = oldStrength;
	}
	,fillRect: function(x,y,width,height) {
		this.canvas.globalAlpha = this.get_opacity() * (kha._Color.Color_Impl_.get_Ab(this.myColor) / 255);
		this.canvas.fillRect(x,y,width,height);
		this.canvas.globalAlpha = this.get_opacity();
	}
	,drawString: function(text,x,y) {
		var image = this.webfont.getImage(this.myColor);
		if(image.width > 0) {
			var xpos = x;
			var ypos = y;
			var _g1 = 0;
			var _g = text.length;
			while(_g1 < _g) {
				var i = _g1++;
				var q = this.webfont.kravur.getBakedQuad(HxOverrides.cca(text,i) - 32,xpos,ypos);
				if(q != null) {
					if(q.s1 - q.s0 > 0 && q.t1 - q.t0 > 0 && q.x1 - q.x0 > 0 && q.y1 - q.y0 > 0) this.canvas.drawImage(image,q.s0 * image.width,q.t0 * image.height,(q.s1 - q.s0) * image.width,(q.t1 - q.t0) * image.height,q.x0,q.y0,q.x1 - q.x0,q.y1 - q.y0);
					xpos += q.xadvance;
				}
			}
		}
	}
	,set_font: function(font) {
		this.webfont = js.Boot.__cast(font , kha.js.Font);
		return this.webfont;
	}
	,get_font: function() {
		return this.webfont;
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) strength = 1.0;
		this.canvas.beginPath();
		var oldWith = this.canvas.lineWidth;
		this.canvas.lineWidth = Math.round(strength);
		this.canvas.moveTo(x1,y1);
		this.canvas.lineTo(x2,y2);
		this.canvas.moveTo(0,0);
		this.canvas.stroke();
		this.canvas.lineWidth = oldWith;
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
		this.canvas.beginPath();
		this.canvas.closePath();
		this.canvas.fill();
	}
	,drawVideo: function(video,x,y,width,height) {
		this.canvas.drawImage((js.Boot.__cast(video , kha.js.Video)).element,x,y,width,height);
	}
	,setTransformation: function(transformation) {
		this.canvas.setTransform(transformation[0],transformation[3],transformation[1],transformation[4],transformation[2],transformation[5]);
	}
	,__class__: kha.js.CanvasGraphics
});
kha.js.URLParser = function(url) {
	this._parts = null;
	this._parts = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];
	this.url = url;
	var r = new EReg("^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?)(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))(?:\\?([^#]*))?(?:#(.*))?)","");
	r.match(url);
	var _g1 = 0;
	var _g = this._parts.length;
	while(_g1 < _g) {
		var i = _g1++;
		Reflect.setField(this,this._parts[i],r.matched(i));
	}
};
$hxClasses["kha.js.URLParser"] = kha.js.URLParser;
kha.js.URLParser.__name__ = ["kha","js","URLParser"];
kha.js.URLParser.parse = function(url) {
	return new kha.js.URLParser(url);
};
kha.js.URLParser.prototype = {
	toString: function() {
		var s = "For Url -> " + this.url + "\n";
		var _g1 = 0;
		var _g = this._parts.length;
		while(_g1 < _g) {
			var i = _g1++;
			s += this._parts[i] + ": " + Std.string(Reflect.field(this,this._parts[i])) + (i == this._parts.length - 1?"":"\n");
		}
		return s;
	}
	,__class__: kha.js.URLParser
};
kha.js.EnvironmentVariables = function() {
	kha.EnvironmentVariables.call(this);
};
$hxClasses["kha.js.EnvironmentVariables"] = kha.js.EnvironmentVariables;
kha.js.EnvironmentVariables.__name__ = ["kha","js","EnvironmentVariables"];
kha.js.EnvironmentVariables.__super__ = kha.EnvironmentVariables;
kha.js.EnvironmentVariables.prototype = $extend(kha.EnvironmentVariables.prototype,{
	getVariable: function(name) {
		var parser = new kha.js.URLParser(window.location.toString());
		var query = parser.query;
		var parts = query.split("&");
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			var subparts = part.split("=");
			if(subparts[0] == name) return subparts[1];
		}
		haxe.Log.trace("Environment variables requested.",{ fileName : "EnvironmentVariables.hx", lineNumber : 90, className : "kha.js.EnvironmentVariables", methodName : "getVariable"});
		return "";
	}
	,__class__: kha.js.EnvironmentVariables
});
kha.js.Font = function(name,style,size) {
	this.myName = name;
	this.myStyle = style;
	this.mySize = size;
	this.kravur = kha.Kravur.get(name,style,size);
	this.images = new haxe.ds.IntMap();
};
$hxClasses["kha.js.Font"] = kha.js.Font;
kha.js.Font.__name__ = ["kha","js","Font"];
kha.js.Font.__interfaces__ = [kha.Font];
kha.js.Font.prototype = {
	get_name: function() {
		return this.kravur.get_name();
	}
	,get_style: function() {
		return this.kravur.get_style();
	}
	,get_size: function() {
		return this.kravur.get_size();
	}
	,getHeight: function() {
		return this.kravur.getHeight();
	}
	,charWidth: function(ch) {
		return this.kravur.charWidth(ch);
	}
	,charsWidth: function(ch,offset,length) {
		return this.kravur.charsWidth(ch,offset,length);
	}
	,stringWidth: function(str) {
		return this.kravur.stringWidth(str);
	}
	,getBaselinePosition: function() {
		return this.kravur.getBaselinePosition();
	}
	,getImage: function(color) {
		if(!this.images.exists(color)) {
			var canvas = window.document.createElement("canvas");
			canvas.width = this.kravur.width;
			canvas.height = this.kravur.height;
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,this.kravur.width,this.kravur.height);
			var imageData = ctx.getImageData(0,0,this.kravur.width,this.kravur.height);
			var bytes = (js.Boot.__cast(this.kravur.getTexture() , kha.CanvasImage)).bytes;
			var _g1 = 0;
			var _g = bytes.length;
			while(_g1 < _g) {
				var i = _g1++;
				imageData.data[i * 4] = kha._Color.Color_Impl_.get_Rb(color);
				imageData.data[i * 4 + 1] = kha._Color.Color_Impl_.get_Gb(color);
				imageData.data[i * 4 + 2] = kha._Color.Color_Impl_.get_Bb(color);
				imageData.data[i * 4 + 3] = bytes.b[i];
			}
			ctx.putImageData(imageData,0,0);
			var img = window.document.createElement("img");
			img.src = canvas.toDataURL("image/png");
			this.images.set(color,img);
		}
		return this.images.get(color);
	}
	,__class__: kha.js.Font
	,__properties__: {get_size:"get_size",get_style:"get_style",get_name:"get_name"}
};
kha.js.Loader = function() {
	kha.Loader.call(this);
};
$hxClasses["kha.js.Loader"] = kha.js.Loader;
kha.js.Loader.__name__ = ["kha","js","Loader"];
kha.js.Loader.__super__ = kha.Loader;
kha.js.Loader.prototype = $extend(kha.Loader.prototype,{
	loadMusic: function(desc,done) {
		new kha.js.Music(desc.file,done);
	}
	,loadSound: function(desc,done) {
		if(kha.Sys.audio != null) new kha.js.WebAudioSound(desc.file,done); else new kha.js.Sound(desc.file,done);
	}
	,loadImage: function(desc,done) {
		var img = window.document.createElement("img");
		img.src = desc.file;
		var readable;
		if(Object.prototype.hasOwnProperty.call(desc,"readable")) readable = desc.readable; else readable = false;
		img.onload = function(event) {
			done(kha.Image.fromImage(img,readable));
		};
	}
	,loadVideo: function(desc,done) {
		var video = new kha.js.Video(desc.file,done);
	}
	,loadBlob: function(desc,done) {
		var request = new XMLHttpRequest();
		request.open("GET",desc.file,true);
		request.responseType = "arraybuffer";
		request.onreadystatechange = function() {
			if(request.readyState != 4) return;
			if(request.status >= 200 && request.status < 400) {
				var bytes = null;
				var arrayBuffer = request.response;
				if(arrayBuffer != null) {
					var byteArray = new Uint8Array(arrayBuffer);
					bytes = haxe.io.Bytes.alloc(byteArray.byteLength);
					var _g1 = 0;
					var _g = byteArray.byteLength;
					while(_g1 < _g) {
						var i = _g1++;
						bytes.b[i] = byteArray[i] & 255;
					}
				} else if(request.responseBody != null) {
					var data = VBArray(request.responseBody).toArray();
					bytes = haxe.io.Bytes.alloc(data.length);
					var _g11 = 0;
					var _g2 = data.length;
					while(_g11 < _g2) {
						var i1 = _g11++;
						bytes.b[i1] = data[i1] & 255;
					}
				} else js.Lib.alert("loadBlob failed");
				done(new kha.Blob(bytes));
			} else js.Lib.alert("loadBlob failed");
		};
		request.send(null);
	}
	,loadFont: function(name,style,size) {
		if(kha.Sys.gl != null) return kha.Kravur.get(name,style,size); else return new kha.js.Font(name,style,size);
	}
	,loadURL: function(url) {
		if(HxOverrides.substr(url,0,1) == "#") window.location.hash = HxOverrides.substr(url,1,url.length - 1); else window.open(url,"Kha");
	}
	,setNormalCursor: function() {
		kha.js.Mouse.SystemCursor = "default";
		kha.js.Mouse.UpdateSystemCursor();
	}
	,setHandCursor: function() {
		kha.js.Mouse.SystemCursor = "pointer";
		kha.js.Mouse.UpdateSystemCursor();
	}
	,__class__: kha.js.Loader
});
kha.js.Mouse = function() {
	kha.Mouse.call(this);
	kha.Sys.khanvas.style.cursor = kha.js.Mouse.SystemCursor;
};
$hxClasses["kha.js.Mouse"] = kha.js.Mouse;
kha.js.Mouse.__name__ = ["kha","js","Mouse"];
kha.js.Mouse.UpdateSystemCursor = function() {
	kha.Sys.khanvas.style.cursor = kha.js.Mouse.SystemCursor;
};
kha.js.Mouse.__super__ = kha.Mouse;
kha.js.Mouse.prototype = $extend(kha.Mouse.prototype,{
	hideSystemCursor: function() {
		kha.Sys.khanvas.style.cursor = "none";
	}
	,showSystemCursor: function() {
		kha.Sys.khanvas.style.cursor = kha.js.Mouse.SystemCursor;
	}
	,__class__: kha.js.Mouse
});
kha.js.Music = function(filename,done) {
	kha.Music.call(this);
	this.done = done;
	kha.js.Music.loading.add(this);
	this.element = window.document.createElement("audio");
	if(kha.js.Music.extensions == null) {
		kha.js.Music.extensions = new Array();
		if(this.element.canPlayType("audio/ogg") != "") kha.js.Music.extensions.push(".ogg");
		if(this.element.canPlayType("audio/mp4") != "") kha.js.Music.extensions.push(".mp4");
	}
	this.element.addEventListener("error",$bind(this,this.errorListener),false);
	this.element.addEventListener("canplay",$bind(this,this.canPlayThroughListener),false);
	this.element.src = filename + kha.js.Music.extensions[0];
	this.element.preload = "auto";
	this.element.load();
};
$hxClasses["kha.js.Music"] = kha.js.Music;
kha.js.Music.__name__ = ["kha","js","Music"];
kha.js.Music.extractName = function(filename) {
	var len = filename.lastIndexOf(".");
	return HxOverrides.substr(filename,0,len);
};
kha.js.Music.concatExtensions = function() {
	var value = kha.js.Music.extensions[0];
	var _g1 = 1;
	var _g = kha.js.Music.extensions.length;
	while(_g1 < _g) {
		var i = _g1++;
		value += "|" + kha.js.Music.extensions[i];
	}
	return value;
};
kha.js.Music.__super__ = kha.Music;
kha.js.Music.prototype = $extend(kha.Music.prototype,{
	play: function(loop) {
		if(loop == null) loop = false;
		kha.Music.prototype.play.call(this);
		this.element.loop = loop;
		this.element.play();
	}
	,pause: function() {
		try {
			this.element.pause();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Music.hx", lineNumber : 51, className : "kha.js.Music", methodName : "pause"});
		}
	}
	,stop: function() {
		try {
			this.element.pause();
			this.element.currentTime = 0;
			kha.Music.prototype.stop.call(this);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Music.hx", lineNumber : 62, className : "kha.js.Music", methodName : "stop"});
		}
	}
	,getCurrentPos: function() {
		return Math.ceil(this.element.currentTime * 1000);
	}
	,getLength: function() {
		if(Math.isFinite(this.element.duration)) return Math.floor(this.element.duration * 1000); else return -1;
	}
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g1 = 0;
			var _g = kha.js.Music.extensions.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				if(StringTools.endsWith(this.element.src,kha.js.Music.extensions[i])) {
					this.element.src = kha.js.Music.extractName(this.element.src) + kha.js.Music.extensions[i + 1];
					return;
				}
			}
		}
		haxe.Log.trace("Error loading " + kha.js.Music.extractName(this.element.src) + kha.js.Music.concatExtensions(),{ fileName : "Music.hx", lineNumber : 90, className : "kha.js.Music", methodName : "errorListener"});
		js.Lib.alert("loadSound failed");
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		this.done(this);
		kha.js.Music.loading.remove(this);
	}
	,__class__: kha.js.Music
});
kha.js.SoundChannel = function(element) {
	kha.SoundChannel.call(this);
	this.element = element;
};
$hxClasses["kha.js.SoundChannel"] = kha.js.SoundChannel;
kha.js.SoundChannel.__name__ = ["kha","js","SoundChannel"];
kha.js.SoundChannel.__super__ = kha.SoundChannel;
kha.js.SoundChannel.prototype = $extend(kha.SoundChannel.prototype,{
	play: function() {
		kha.SoundChannel.prototype.play.call(this);
		this.element.play();
	}
	,pause: function() {
		try {
			this.element.pause();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Sound.hx", lineNumber : 30, className : "kha.js.SoundChannel", methodName : "pause"});
		}
	}
	,stop: function() {
		try {
			this.element.pause();
			this.element.currentTime = 0;
			kha.SoundChannel.prototype.stop.call(this);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Sound.hx", lineNumber : 41, className : "kha.js.SoundChannel", methodName : "stop"});
		}
	}
	,getCurrentPos: function() {
		return Math.ceil(this.element.currentTime * 1000);
	}
	,getLength: function() {
		if(Math.isFinite(this.element.duration)) return Math.floor(this.element.duration * 1000); else return -1;
	}
	,__class__: kha.js.SoundChannel
});
kha.js.Sound = function(filename,done) {
	kha.Sound.call(this);
	this.done = done;
	kha.js.Sound.loading.add(this);
	this.element = window.document.createElement("audio");
	if(kha.js.Sound.extensions == null) {
		kha.js.Sound.extensions = new Array();
		if(this.element.canPlayType("audio/ogg") != "") kha.js.Sound.extensions.push(".ogg");
		if(this.element.canPlayType("audio/mp4") != "") kha.js.Sound.extensions.push(".mp4");
	}
	this.element.addEventListener("error",$bind(this,this.errorListener),false);
	this.element.addEventListener("canplay",$bind(this,this.canPlayThroughListener),false);
	this.element.src = filename + kha.js.Sound.extensions[0];
	this.element.preload = "auto";
	this.element.load();
};
$hxClasses["kha.js.Sound"] = kha.js.Sound;
kha.js.Sound.__name__ = ["kha","js","Sound"];
kha.js.Sound.extractName = function(filename) {
	var len = filename.lastIndexOf(".");
	return HxOverrides.substr(filename,0,len);
};
kha.js.Sound.concatExtensions = function() {
	var value = kha.js.Sound.extensions[0];
	var _g1 = 1;
	var _g = kha.js.Sound.extensions.length;
	while(_g1 < _g) {
		var i = _g1++;
		value += "|" + kha.js.Sound.extensions[i];
	}
	return value;
};
kha.js.Sound.__super__ = kha.Sound;
kha.js.Sound.prototype = $extend(kha.Sound.prototype,{
	play: function() {
		try {
			this.element.play();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Sound.hx", lineNumber : 92, className : "kha.js.Sound", methodName : "play"});
		}
		return new kha.js.SoundChannel(this.element);
	}
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g1 = 0;
			var _g = kha.js.Sound.extensions.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				if(StringTools.endsWith(this.element.src,kha.js.Sound.extensions[i])) {
					this.element.src = kha.js.Sound.extractName(this.element.src) + kha.js.Sound.extensions[i + 1];
					return;
				}
			}
		}
		haxe.Log.trace("Error loading " + kha.js.Sound.extractName(this.element.src) + kha.js.Sound.concatExtensions(),{ fileName : "Sound.hx", lineNumber : 108, className : "kha.js.Sound", methodName : "errorListener"});
		js.Lib.alert("loadSound failed");
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		this.done(this);
		kha.js.Sound.loading.remove(this);
	}
	,__class__: kha.js.Sound
});
kha.js.Video = function(filename,done) {
	kha.Video.call(this);
	this.done = done;
	kha.js.Video.loading.add(this);
	this.element = window.document.createElement("video");
	if(kha.js.Video.extensions == null) {
		kha.js.Video.extensions = new Array();
		if(this.element.canPlayType("video/webm") != "") kha.js.Video.extensions.push(".webm");
		if(this.element.canPlayType("video/mp4") != "") kha.js.Video.extensions.push(".mp4");
	}
	this.element.addEventListener("error",$bind(this,this.errorListener),false);
	this.element.addEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
	this.element.preload = "auto";
	this.element.src = filename + kha.js.Video.extensions[0];
};
$hxClasses["kha.js.Video"] = kha.js.Video;
kha.js.Video.__name__ = ["kha","js","Video"];
kha.js.Video.__super__ = kha.Video;
kha.js.Video.prototype = $extend(kha.Video.prototype,{
	play: function(loop) {
		if(loop == null) loop = false;
		try {
			this.element.loop = loop;
			this.element.play();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Video.hx", lineNumber : 48, className : "kha.js.Video", methodName : "play"});
		}
	}
	,pause: function() {
		try {
			this.element.pause();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Video.hx", lineNumber : 56, className : "kha.js.Video", methodName : "pause"});
		}
	}
	,stop: function() {
		try {
			this.element.pause();
			this.element.currentTime = 0;
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "Video.hx", lineNumber : 65, className : "kha.js.Video", methodName : "stop"});
		}
	}
	,getCurrentPos: function() {
		return Math.ceil(this.element.currentTime * 1000);
	}
	,getLength: function() {
		if(Math.isFinite(this.element.duration)) return Math.floor(this.element.duration * 1000); else return -1;
	}
	,errorListener: function(eventInfo) {
		if(this.element.error.code == 4) {
			var _g1 = 0;
			var _g = kha.js.Video.extensions.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var ext = kha.js.Video.extensions[i];
				if(StringTools.endsWith(this.element.src,kha.js.Video.extensions[i])) {
					this.element.src = HxOverrides.substr(this.element.src,0,this.element.src.length - kha.js.Video.extensions[i].length) + kha.js.Video.extensions[i + 1];
					return;
				}
			}
		}
		var str = "";
		var i1 = kha.js.Video.extensions.length - 2;
		while(i1 >= 0) str = "|" + kha.js.Video.extensions[i1];
		haxe.Log.trace("Error loading " + this.element.src + str,{ fileName : "Video.hx", lineNumber : 100, className : "kha.js.Video", methodName : "errorListener"});
		this.finishAsset();
	}
	,canPlayThroughListener: function(eventInfo) {
		this.finishAsset();
	}
	,finishAsset: function() {
		this.element.removeEventListener("error",$bind(this,this.errorListener),false);
		this.element.removeEventListener("canplaythrough",$bind(this,this.canPlayThroughListener),false);
		if(kha.Sys.gl != null) this.texture = kha.Image.fromVideo(this);
		this.done(this);
		kha.js.Video.loading.remove(this);
	}
	,__class__: kha.js.Video
});
kha.js.WebAudioChannel = function(buffer) {
	kha.SoundChannel.call(this);
	this.offset = 0;
	this.buffer = buffer;
	this.startTime = kha.Sys.audio.currentTime;
	this.source = kha.Sys.audio.createBufferSource();
	this.source.buffer = this.buffer;
	this.source.connect(kha.Sys.audio.destination);
	this.source.start(0);
};
$hxClasses["kha.js.WebAudioChannel"] = kha.js.WebAudioChannel;
kha.js.WebAudioChannel.__name__ = ["kha","js","WebAudioChannel"];
kha.js.WebAudioChannel.__super__ = kha.SoundChannel;
kha.js.WebAudioChannel.prototype = $extend(kha.SoundChannel.prototype,{
	play: function() {
		if(this.source != null) return;
		kha.SoundChannel.prototype.play.call(this);
		this.startTime = kha.Sys.audio.currentTime - this.offset;
		this.source.start(0,this.offset);
	}
	,pause: function() {
		this.source.stop();
		this.offset = kha.Sys.audio.currentTime - this.startTime;
		this.startTime = -1;
		this.source = null;
	}
	,stop: function() {
		this.source.stop();
		this.source = null;
		this.offset = 0;
		this.startTime = -1;
		kha.SoundChannel.prototype.stop.call(this);
	}
	,getCurrentPos: function() {
		if(this.startTime < 0) return Math.ceil(this.offset * 1000); else return Math.ceil((kha.Sys.audio.currentTime - this.startTime) * 1000);
	}
	,getLength: function() {
		return Math.floor(this.buffer.duration * 1000);
	}
	,__class__: kha.js.WebAudioChannel
});
kha.js.WebAudioSound = function(filename,done) {
	var _g = this;
	kha.Sound.call(this);
	this.done = done;
	kha.js.WebAudioSound.init();
	var request = new XMLHttpRequest();
	request.open("GET",filename + (kha.js.WebAudioSound.playsOgg?".ogg":".mp4"),true);
	request.responseType = "arraybuffer";
	request.onerror = function() {
		js.Lib.alert("loadSound failed");
	};
	request.onload = function() {
		var arrayBuffer = request.response;
		kha.Sys.audio.decodeAudioData(request.response,function(buf) {
			_g.buffer = buf;
			done(_g);
		},function() {
			js.Lib.alert("loadSound failed");
		});
	};
	request.send(null);
};
$hxClasses["kha.js.WebAudioSound"] = kha.js.WebAudioSound;
kha.js.WebAudioSound.__name__ = ["kha","js","WebAudioSound"];
kha.js.WebAudioSound.init = function() {
	if(kha.js.WebAudioSound.initialized) return;
	var element = window.document.createElement("audio");
	kha.js.WebAudioSound.playsOgg = element.canPlayType("audio/ogg") != "";
	kha.js.WebAudioSound.initialized = true;
};
kha.js.WebAudioSound.__super__ = kha.Sound;
kha.js.WebAudioSound.prototype = $extend(kha.Sound.prototype,{
	play: function() {
		return new kha.js.WebAudioChannel(this.buffer);
	}
	,__class__: kha.js.WebAudioSound
});
kha.js.graphics4 = {};
kha.js.graphics4.ConstantLocation = function(value) {
	this.value = value;
};
$hxClasses["kha.js.graphics4.ConstantLocation"] = kha.js.graphics4.ConstantLocation;
kha.js.graphics4.ConstantLocation.__name__ = ["kha","js","graphics4","ConstantLocation"];
kha.js.graphics4.ConstantLocation.__interfaces__ = [kha.graphics4.ConstantLocation];
kha.js.graphics4.ConstantLocation.prototype = {
	__class__: kha.js.graphics4.ConstantLocation
};
kha.js.graphics4.Graphics = function(webgl,renderTarget) {
	this.renderTarget = renderTarget;
	if(webgl) {
		kha.Sys.gl.enable(kha.Sys.gl.BLEND);
		kha.Sys.gl.blendFunc(kha.Sys.gl.SRC_ALPHA,kha.Sys.gl.ONE_MINUS_SRC_ALPHA);
		kha.Sys.gl.viewport(0,0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight());
	}
};
$hxClasses["kha.js.graphics4.Graphics"] = kha.js.graphics4.Graphics;
kha.js.graphics4.Graphics.__name__ = ["kha","js","graphics4","Graphics"];
kha.js.graphics4.Graphics.__interfaces__ = [kha.graphics4.Graphics];
kha.js.graphics4.Graphics.prototype = {
	init: function(backbufferFormat,antiAliasingSamples) {
		if(antiAliasingSamples == null) antiAliasingSamples = 1;
	}
	,begin: function() {
		if(this.renderTarget == null) {
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,null);
			kha.Sys.gl.viewport(0,0,kha.Sys.get_pixelWidth(),kha.Sys.get_pixelHeight());
		} else {
			kha.Sys.gl.bindFramebuffer(kha.Sys.gl.FRAMEBUFFER,this.renderTarget.frameBuffer);
			kha.Sys.gl.viewport(0,0,this.renderTarget.get_width(),this.renderTarget.get_height());
		}
	}
	,end: function() {
	}
	,vsynced: function() {
		return true;
	}
	,refreshRate: function() {
		return 60;
	}
	,clear: function(color,depth,stencil) {
		var clearMask = 0;
		if(color != null) {
			clearMask |= kha.Sys.gl.COLOR_BUFFER_BIT;
			kha.Sys.gl.clearColor(kha._Color.Color_Impl_.get_Rb(color) / 255,kha._Color.Color_Impl_.get_Gb(color) / 255,kha._Color.Color_Impl_.get_Bb(color) / 255,kha._Color.Color_Impl_.get_Ab(color) / 255);
		}
		if(depth != null) {
			clearMask |= kha.Sys.gl.DEPTH_BUFFER_BIT;
			kha.Sys.gl.clearDepth(depth);
		}
		if(stencil != null) clearMask |= kha.Sys.gl.STENCIL_BUFFER_BIT;
		kha.Sys.gl.clear(clearMask);
	}
	,setDepthMode: function(write,mode) {
		switch(mode[1]) {
		case 0:
			kha.Sys.gl.disable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.ALWAYS);
			break;
		case 1:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.NEVER);
			break;
		case 2:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.EQUAL);
			break;
		case 3:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.NOTEQUAL);
			break;
		case 4:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.LESS);
			break;
		case 5:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.LEQUAL);
			break;
		case 6:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.GREATER);
			break;
		case 7:
			kha.Sys.gl.enable(kha.Sys.gl.DEPTH_TEST);
			kha.Sys.gl.depthFunc(kha.Sys.gl.GEQUAL);
			break;
		}
		kha.Sys.gl.depthMask(write);
	}
	,getBlendFunc: function(op) {
		switch(op[1]) {
		case 2:case 0:
			return kha.Sys.gl.ZERO;
		case 1:
			return kha.Sys.gl.ONE;
		case 3:
			return kha.Sys.gl.SRC_ALPHA;
		case 4:
			return kha.Sys.gl.DST_ALPHA;
		case 5:
			return kha.Sys.gl.ONE_MINUS_SRC_ALPHA;
		case 6:
			return kha.Sys.gl.ONE_MINUS_DST_ALPHA;
		}
	}
	,setBlendingMode: function(source,destination) {
		if(source == kha.graphics4.BlendingOperation.BlendOne && destination == kha.graphics4.BlendingOperation.BlendZero) kha.Sys.gl.disable(kha.Sys.gl.BLEND); else {
			kha.Sys.gl.enable(kha.Sys.gl.BLEND);
			kha.Sys.gl.blendFunc(this.getBlendFunc(source),this.getBlendFunc(destination));
		}
	}
	,createVertexBuffer: function(vertexCount,structure,usage,canRead) {
		if(canRead == null) canRead = false;
		return new kha.graphics4.VertexBuffer(vertexCount,structure,usage);
	}
	,setVertexBuffer: function(vertexBuffer) {
		(js.Boot.__cast(vertexBuffer , kha.graphics4.VertexBuffer)).set();
	}
	,createIndexBuffer: function(indexCount,usage,canRead) {
		if(canRead == null) canRead = false;
		return new kha.graphics4.IndexBuffer(indexCount,usage);
	}
	,setIndexBuffer: function(indexBuffer) {
		this.indicesCount = indexBuffer.count();
		(js.Boot.__cast(indexBuffer , kha.graphics4.IndexBuffer)).set();
	}
	,createCubeMap: function(size,format,usage,canRead) {
		if(canRead == null) canRead = false;
		return null;
	}
	,setTexture: function(stage,texture) {
		if(texture == null) {
			kha.Sys.gl.activeTexture(kha.Sys.gl.TEXTURE0 + (js.Boot.__cast(stage , kha.js.graphics4.TextureUnit)).value);
			kha.Sys.gl.bindTexture(kha.Sys.gl.TEXTURE_2D,null);
		} else (js.Boot.__cast(texture , kha.WebGLImage)).set((js.Boot.__cast(stage , kha.js.graphics4.TextureUnit)).value);
	}
	,setTextureParameters: function(texunit,uAddressing,vAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
		kha.Sys.gl.activeTexture(kha.Sys.gl.TEXTURE0 + (js.Boot.__cast(texunit , kha.js.graphics4.TextureUnit)).value);
		switch(uAddressing[1]) {
		case 2:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.CLAMP_TO_EDGE);
			break;
		case 0:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.REPEAT);
			break;
		case 1:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_S,kha.Sys.gl.MIRRORED_REPEAT);
			break;
		}
		switch(vAddressing[1]) {
		case 2:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.CLAMP_TO_EDGE);
			break;
		case 0:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.REPEAT);
			break;
		case 1:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_WRAP_T,kha.Sys.gl.MIRRORED_REPEAT);
			break;
		}
		switch(minificationFilter[1]) {
		case 0:
			switch(mipmapFilter[1]) {
			case 0:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.NEAREST);
				break;
			case 1:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.NEAREST_MIPMAP_NEAREST);
				break;
			case 2:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.NEAREST_MIPMAP_LINEAR);
				break;
			}
			break;
		case 1:case 2:
			switch(mipmapFilter[1]) {
			case 0:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR);
				break;
			case 1:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR_MIPMAP_NEAREST);
				break;
			case 2:
				kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MIN_FILTER,kha.Sys.gl.LINEAR_MIPMAP_LINEAR);
				break;
			}
			break;
		}
		switch(magnificationFilter[1]) {
		case 0:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.NEAREST);
			break;
		case 1:case 2:
			kha.Sys.gl.texParameteri(kha.Sys.gl.TEXTURE_2D,kha.Sys.gl.TEXTURE_MAG_FILTER,kha.Sys.gl.LINEAR);
			break;
		}
	}
	,setCullMode: function(mode) {
		switch(mode[1]) {
		case 2:
			kha.Sys.gl.disable(kha.Sys.gl.CULL_FACE);
			break;
		case 0:
			kha.Sys.gl.enable(kha.Sys.gl.CULL_FACE);
			kha.Sys.gl.cullFace(kha.Sys.gl.FRONT);
			break;
		case 1:
			kha.Sys.gl.enable(kha.Sys.gl.CULL_FACE);
			kha.Sys.gl.cullFace(kha.Sys.gl.BACK);
			break;
		}
	}
	,setProgram: function(program) {
		program.set();
	}
	,setBool: function(location,value) {
		kha.Sys.gl.uniform1i((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value?1:0);
	}
	,setInt: function(location,value) {
		kha.Sys.gl.uniform1i((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value);
	}
	,setFloat: function(location,value) {
		kha.Sys.gl.uniform1f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value);
	}
	,setFloat2: function(location,value1,value2) {
		kha.Sys.gl.uniform2f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value1,value2);
	}
	,setFloat3: function(location,value1,value2,value3) {
		kha.Sys.gl.uniform3f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value1,value2,value3);
	}
	,setFloat4: function(location,value1,value2,value3,value4) {
		kha.Sys.gl.uniform4f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value1,value2,value3,value4);
	}
	,setFloats: function(location,values) {
		kha.Sys.gl.uniform1fv((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,values);
	}
	,setVector2: function(location,value) {
		kha.Sys.gl.uniform2f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value.x,value.y);
	}
	,setVector3: function(location,value) {
		kha.Sys.gl.uniform3f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value.x,value.y,value.z);
	}
	,setVector4: function(location,value) {
		kha.Sys.gl.uniform4f((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,value.get_x(),value.get_y(),value.get_z(),value.get_w());
	}
	,setMatrix: function(location,matrix) {
		kha.Sys.gl.uniformMatrix4fv((js.Boot.__cast(location , kha.js.graphics4.ConstantLocation)).value,false,matrix.matrix);
	}
	,drawIndexedVertices: function(start,count) {
		if(count == null) count = -1;
		if(start == null) start = 0;
		kha.Sys.gl.drawElements(kha.Sys.gl.TRIANGLES,count == -1?this.indicesCount:count,kha.Sys.gl.UNSIGNED_SHORT,start * 2);
	}
	,setStencilParameters: function(compareMode,bothPass,depthFail,stencilFail,referenceValue,readMask,writeMask) {
		if(writeMask == null) writeMask = 255;
		if(readMask == null) readMask = 255;
	}
	,setScissor: function(rect) {
	}
	,renderTargetsInvertedY: function() {
		return true;
	}
	,__class__: kha.js.graphics4.Graphics
};
kha.js.graphics4.Graphics2 = function(canvas) {
	kha.graphics4.Graphics2.call(this,canvas);
};
$hxClasses["kha.js.graphics4.Graphics2"] = kha.js.graphics4.Graphics2;
kha.js.graphics4.Graphics2.__name__ = ["kha","js","graphics4","Graphics2"];
kha.js.graphics4.Graphics2.__super__ = kha.graphics4.Graphics2;
kha.js.graphics4.Graphics2.prototype = $extend(kha.graphics4.Graphics2.prototype,{
	drawVideo: function(video,x,y,width,height) {
		var v;
		v = js.Boot.__cast(video , kha.js.Video);
		this.drawScaledSubImage(v.texture,0,0,v.texture.get_width(),v.texture.get_height(),x,y,width,height);
	}
	,begin: function(clear,clearColor) {
		if(clear == null) clear = true;
		kha.Sys.gl.colorMask(true,true,true,true);
		kha.graphics4.Graphics2.prototype.begin.call(this,clear,clearColor);
	}
	,__class__: kha.js.graphics4.Graphics2
});
kha.js.graphics4.TextureUnit = function(value) {
	this.value = value;
};
$hxClasses["kha.js.graphics4.TextureUnit"] = kha.js.graphics4.TextureUnit;
kha.js.graphics4.TextureUnit.__name__ = ["kha","js","graphics4","TextureUnit"];
kha.js.graphics4.TextureUnit.__interfaces__ = [kha.graphics4.TextureUnit];
kha.js.graphics4.TextureUnit.prototype = {
	__class__: kha.js.graphics4.TextureUnit
};
kha.loader = {};
kha.loader.Room = function(id) {
	this.id = id;
	this.assets = new Array();
	this.parent = null;
};
$hxClasses["kha.loader.Room"] = kha.loader.Room;
kha.loader.Room.__name__ = ["kha","loader","Room"];
kha.loader.Room.prototype = {
	__class__: kha.loader.Room
};
kha.math = {};
kha.math._Matrix3 = {};
kha.math._Matrix3.Matrix3_Impl_ = function() { };
$hxClasses["kha.math._Matrix3.Matrix3_Impl_"] = kha.math._Matrix3.Matrix3_Impl_;
kha.math._Matrix3.Matrix3_Impl_.__name__ = ["kha","math","_Matrix3","Matrix3_Impl_"];
kha.math._Matrix3.Matrix3_Impl_._new = function(values) {
	return values;
};
kha.math._Matrix3.Matrix3_Impl_.get = function(this1,index) {
	return this1[index];
};
kha.math._Matrix3.Matrix3_Impl_.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
kha.math._Matrix3.Matrix3_Impl_.index = function(x,y) {
	return y * 3 + x;
};
kha.math._Matrix3.Matrix3_Impl_.translation = function(x,y) {
	return kha.math._Matrix3.Matrix3_Impl_._new([1,0,x,0,1,y,0,0,1]);
};
kha.math._Matrix3.Matrix3_Impl_.empty = function() {
	return kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
};
kha.math._Matrix3.Matrix3_Impl_.identity = function() {
	return kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]);
};
kha.math._Matrix3.Matrix3_Impl_.scale = function(x,y) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([1,0,0,0,1,0,0,0,1]);
	var index = kha.math._Matrix3.Matrix3_Impl_.index(0,0);
	m[index] = x;
	x;
	var index1 = kha.math._Matrix3.Matrix3_Impl_.index(1,1);
	m[index1] = y;
	y;
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.rotation = function(alpha) {
	return kha.math._Matrix3.Matrix3_Impl_._new([Math.cos(alpha),-Math.sin(alpha),0,Math.sin(alpha),Math.cos(alpha),0,0,0,1]);
};
kha.math._Matrix3.Matrix3_Impl_.add = function(this1,value) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
	var _g1 = 0;
	var _g = 9;
	while(_g1 < _g) {
		var i = _g1++;
		var value1 = this1[i] + value[i];
		m[i] = value1;
		value1;
	}
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.sub = function(this1,value) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
	var _g1 = 0;
	var _g = 9;
	while(_g1 < _g) {
		var i = _g1++;
		var value1 = this1[i] - value[i];
		m[i] = value1;
		value1;
	}
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.mult = function(this1,value) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
	var _g1 = 0;
	var _g = 9;
	while(_g1 < _g) {
		var i = _g1++;
		var value1 = this1[i] * value;
		m[i] = value1;
		value1;
	}
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.transpose = function(this1) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
	var _g = 0;
	while(_g < 3) {
		var x = _g++;
		var _g1 = 0;
		while(_g1 < 3) {
			var y = _g1++;
			var index = kha.math._Matrix3.Matrix3_Impl_.index(y,x);
			var value = this1[kha.math._Matrix3.Matrix3_Impl_.index(x,y)];
			m[index] = value;
			value;
		}
	}
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.trace = function(this1) {
	var value = 0;
	var _g = 0;
	while(_g < 3) {
		var x = _g++;
		value += this1[kha.math._Matrix3.Matrix3_Impl_.index(x,x)];
	}
	return value;
};
kha.math._Matrix3.Matrix3_Impl_.multmat = function(this1,value) {
	var m = kha.math._Matrix3.Matrix3_Impl_._new([0,0,0,0,0,0,0,0,0]);
	var _g = 0;
	while(_g < 3) {
		var x = _g++;
		var _g1 = 0;
		while(_g1 < 3) {
			var y = _g1++;
			var f = 0;
			var _g2 = 0;
			while(_g2 < 3) {
				var i = _g2++;
				f += this1[kha.math._Matrix3.Matrix3_Impl_.index(i,y)] * (function($this) {
					var $r;
					var index = kha.math._Matrix3.Matrix3_Impl_.index(x,i);
					$r = value[index];
					return $r;
				}(this));
			}
			var index1 = kha.math._Matrix3.Matrix3_Impl_.index(x,y);
			m[index1] = f;
			f;
		}
	}
	return m;
};
kha.math._Matrix3.Matrix3_Impl_.multvec = function(this1,value) {
	var product = new kha.math.Vector2();
	var f = 0;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,2)] * value.x;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,2)] * value.y;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,2)];
	var w = f;
	f = 0;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,0)] * value.x;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,0)] * value.y;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,0)];
	product.x = f / w;
	f = 0;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(0,1)] * value.x;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(1,1)] * value.y;
	f += this1[kha.math._Matrix3.Matrix3_Impl_.index(2,1)];
	product.y = f / w;
	return product;
};
kha.math.Matrix4 = function(values) {
	this.matrix = values;
};
$hxClasses["kha.math.Matrix4"] = kha.math.Matrix4;
kha.math.Matrix4.__name__ = ["kha","math","Matrix4"];
kha.math.Matrix4.translation = function(x,y,z) {
	var m = kha.math.Matrix4.identity();
	m.set(3,0,x);
	m.set(3,1,y);
	m.set(3,2,z);
	return m;
};
kha.math.Matrix4.empty = function() {
	return new kha.math.Matrix4([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
};
kha.math.Matrix4.identity = function() {
	return new kha.math.Matrix4([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
};
kha.math.Matrix4.scale = function(x,y,z) {
	var m = kha.math.Matrix4.identity();
	m.set(0,0,x);
	m.set(1,1,y);
	m.set(2,2,z);
	return m;
};
kha.math.Matrix4.rotationX = function(alpha) {
	var m = kha.math.Matrix4.identity();
	m.set(1,1,Math.cos(alpha));
	m.set(2,1,-Math.sin(alpha));
	m.set(1,2,Math.sin(alpha));
	m.set(2,2,Math.cos(alpha));
	return m;
};
kha.math.Matrix4.rotationY = function(alpha) {
	var m = kha.math.Matrix4.identity();
	m.set(0,0,Math.cos(alpha));
	m.set(2,0,Math.sin(alpha));
	m.set(0,2,-Math.sin(alpha));
	m.set(2,2,Math.cos(alpha));
	return m;
};
kha.math.Matrix4.rotationZ = function(alpha) {
	var m = kha.math.Matrix4.identity();
	m.set(0,0,Math.cos(alpha));
	m.set(1,0,-Math.sin(alpha));
	m.set(0,1,Math.sin(alpha));
	m.set(1,1,Math.cos(alpha));
	return m;
};
kha.math.Matrix4.orthogonalProjection = function(left,right,bottom,top,zn,zf) {
	var tx = -(right + left) / (right - left);
	var ty = -(top + bottom) / (top - bottom);
	var tz = -(zf + zn) / (zf - zn);
	return new kha.math.Matrix4([2 / (right - left),0,0,0,0,2 / (top - bottom),0,0,0,0,-2 / (zf - zn),0,tx,ty,tz,1]);
};
kha.math.Matrix4.perspectiveProjection = function(fovY,aspect,zn,zf) {
	var f = Math.cos(2 / fovY);
	return new kha.math.Matrix4([-f / aspect,0,0,0,0,f,0,0,0,0,(zf + zn) / (zn - zf),-1,0,0,2 * zf * zn / (zn - zf),0]);
};
kha.math.Matrix4.lookAt = function(eye,at,up) {
	var zaxis = at.sub(eye);
	zaxis.normalize();
	var xaxis = zaxis.cross(up);
	xaxis.normalize();
	var yaxis = xaxis.cross(zaxis);
	var view = new kha.math.Matrix4([xaxis.x,yaxis.y,-zaxis.z,0,xaxis.x,yaxis.y,-zaxis.z,0,xaxis.x,yaxis.y,-zaxis.z,0,0,0,0,1]);
	return view.multmat(kha.math.Matrix4.translation(-eye.x,-eye.y,-eye.z));
};
kha.math.Matrix4.prototype = {
	set: function(x,y,value) {
		this.matrix[y * 4 + x] = value;
	}
	,get: function(x,y) {
		return this.matrix[y * 4 + x];
	}
	,add: function(value) {
		var m = kha.math.Matrix4.empty();
		var _g1 = 0;
		var _g = 16;
		while(_g1 < _g) {
			var i = _g1++;
			m.matrix[i] = this.matrix[i] + value.matrix[i];
		}
		return m;
	}
	,sub: function(value) {
		var m = kha.math.Matrix4.empty();
		var _g1 = 0;
		var _g = 16;
		while(_g1 < _g) {
			var i = _g1++;
			m.matrix[i] = this.matrix[i] - value.matrix[i];
		}
		return m;
	}
	,mult: function(value) {
		var m = kha.math.Matrix4.empty();
		var _g1 = 0;
		var _g = 16;
		while(_g1 < _g) {
			var i = _g1++;
			m.matrix[i] = this.matrix[i] * value;
		}
		return m;
	}
	,transpose: function() {
		var m = kha.math.Matrix4.empty();
		var _g = 0;
		while(_g < 4) {
			var x = _g++;
			var _g1 = 0;
			while(_g1 < 4) {
				var y = _g1++;
				m.set(y,x,this.get(x,y));
			}
		}
		return m;
	}
	,transpose3x3: function() {
		var m = kha.math.Matrix4.empty();
		var _g = 0;
		while(_g < 3) {
			var x = _g++;
			var _g1 = 0;
			while(_g1 < 3) {
				var y = _g1++;
				m.set(y,x,this.get(x,y));
			}
		}
		var _g2 = 3;
		while(_g2 < 4) {
			var x1 = _g2++;
			var _g11 = 3;
			while(_g11 < 4) {
				var y1 = _g11++;
				m.set(x1,y1,this.get(x1,y1));
			}
		}
		return m;
	}
	,trace: function() {
		var value = 0;
		var _g = 0;
		while(_g < 4) {
			var x = _g++;
			value += this.get(x,x);
		}
		return value;
	}
	,multmat: function(value) {
		var m = kha.math.Matrix4.empty();
		var _g = 0;
		while(_g < 4) {
			var x = _g++;
			var _g1 = 0;
			while(_g1 < 4) {
				var y = _g1++;
				var f = 0;
				var _g2 = 0;
				while(_g2 < 4) {
					var i = _g2++;
					f += this.get(i,y) * value.get(x,i);
				}
				m.set(x,y,f);
			}
		}
		return m;
	}
	,multvec: function(value) {
		var product = new kha.math.Vector4();
		var _g = 0;
		while(_g < 4) {
			var y = _g++;
			var f = 0;
			var _g1 = 0;
			while(_g1 < 4) {
				var i = _g1++;
				f += this.get(i,y) * value.get(i);
			}
			product.set(y,f);
		}
		return product;
	}
	,determinant: function() {
		return this.get(0,0) * (this.get(1,1) * (this.get(2,2) * this.get(3,3) - this.get(3,2) * this.get(2,3)) + this.get(2,1) * (this.get(3,2) * this.get(1,3) - this.get(1,2) * this.get(3,3)) + this.get(3,1) * (this.get(1,2) * this.get(2,3) - this.get(2,2) * this.get(1,3))) - this.get(1,0) * (this.get(0,1) * (this.get(2,2) * this.get(3,3) - this.get(3,2) * this.get(2,3)) + this.get(2,1) * (this.get(3,2) * this.get(0,3) - this.get(0,2) * this.get(3,3)) + this.get(3,1) * (this.get(0,2) * this.get(2,3) - this.get(2,2) * this.get(0,3))) + this.get(2,0) * (this.get(0,1) * (this.get(1,2) * this.get(3,3) - this.get(3,2) * this.get(1,3)) + this.get(1,1) * (this.get(3,2) * this.get(0,3) - this.get(0,2) * this.get(3,3)) + this.get(3,1) * (this.get(0,2) * this.get(1,3) - this.get(1,2) * this.get(0,3))) - this.get(3,0) * (this.get(0,1) * (this.get(1,2) * this.get(2,3) - this.get(2,2) * this.get(1,3)) + this.get(1,1) * (this.get(2,2) * this.get(0,3) - this.get(0,2) * this.get(2,3)) + this.get(2,1) * (this.get(0,2) * this.get(1,3) - this.get(1,2) * this.get(0,3)));
	}
	,inverse: function() {
		if(this.determinant() == 0) throw "No Inverse";
		var q;
		var inv = kha.math.Matrix4.identity();
		var _g = 0;
		while(_g < 4) {
			var j = _g++;
			q = this.get(j,j);
			if(q == 0) {
				var _g1 = j + 1;
				while(_g1 < 4) {
					var i = _g1++;
					if(this.get(j,i) != 0) {
						var _g2 = 0;
						while(_g2 < 4) {
							var k = _g2++;
							inv.set(k,j,this.get(k,j) + this.get(k,i));
						}
						q = this.get(j,j);
						break;
					}
				}
			}
			if(q != 0) {
				var _g11 = 0;
				while(_g11 < 4) {
					var k1 = _g11++;
					inv.set(k1,j,this.get(k1,j) / q);
				}
			}
			var _g12 = 0;
			while(_g12 < 4) {
				var i1 = _g12++;
				if(i1 != j) {
					q = this.get(j,i1);
					var _g21 = 0;
					while(_g21 < 4) {
						var k2 = _g21++;
						inv.set(k2,i1,this.get(k2,i1) - q * this.get(k2,j));
					}
				}
			}
		}
		var _g3 = 0;
		while(_g3 < 4) {
			var i2 = _g3++;
			var _g13 = 0;
			while(_g13 < 4) {
				var j1 = _g13++;
				if(this.get(j1,i2) != (i2 == j1?1:0)) throw "Matrix inversion error";
			}
		}
		return inv;
	}
	,__class__: kha.math.Matrix4
};
kha.math.Random = function() { };
$hxClasses["kha.math.Random"] = kha.math.Random;
kha.math.Random.__name__ = ["kha","math","Random"];
kha.math.Random.init = function(seed) {
	kha.math.Random.MT = new Array();
	kha.math.Random.MT[623] = 0;
	kha.math.Random.MT[0] = seed;
	var _g = 1;
	while(_g < 624) {
		var i = _g++;
		kha.math.Random.MT[i] = 1812433253 * (kha.math.Random.MT[i - 1] ^ kha.math.Random.MT[i - 1] >> 30) + i;
	}
};
kha.math.Random.get = function() {
	if(kha.math.Random.index == 0) kha.math.Random.generateNumbers();
	var y = kha.math.Random.MT[kha.math.Random.index];
	y = y ^ y >> 11;
	y = y ^ y << 7 & -1658038656;
	y = y ^ y << 15 & -272236544;
	y = y ^ y >> 18;
	kha.math.Random.index = (kha.math.Random.index + 1) % 624;
	return y;
};
kha.math.Random.getUpTo = function(max) {
	return kha.math.Random.get() % (max + 1);
};
kha.math.Random.getIn = function(min,max) {
	return kha.math.Random.get() % (max + 1 - min) + min;
};
kha.math.Random.generateNumbers = function() {
	var _g = 0;
	while(_g < 624) {
		var i = _g++;
		var y = (kha.math.Random.MT[i] & 1) + kha.math.Random.MT[(i + 1) % 624] & 2147483647;
		kha.math.Random.MT[i] = kha.math.Random.MT[(i + 397) % 624] ^ y >> 1;
		if(y % 2 != 0) kha.math.Random.MT[i] = kha.math.Random.MT[i] ^ -1727483681;
	}
};
kha.math.Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.Vector2"] = kha.math.Vector2;
kha.math.Vector2.__name__ = ["kha","math","Vector2"];
kha.math.Vector2.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,set_length: function(length) {
		if(this.get_length() == 0) return 0;
		var mul = length / this.get_length();
		this.x *= mul;
		this.y *= mul;
		return length;
	}
	,add: function(vec) {
		return new kha.math.Vector2(this.x + vec.x,this.y + vec.y);
	}
	,sub: function(vec) {
		return new kha.math.Vector2(this.x - vec.x,this.y - vec.y);
	}
	,mult: function(value) {
		return new kha.math.Vector2(this.x * value,this.y * value);
	}
	,div: function(value) {
		return this.mult(1 / value);
	}
	,dot: function(v) {
		return this.x * v.x + this.y * v.y;
	}
	,normalize: function() {
		var l = 1 / this.get_length();
		this.x *= l;
		this.y *= l;
	}
	,__class__: kha.math.Vector2
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
kha.math.Vector2i = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.Vector2i"] = kha.math.Vector2i;
kha.math.Vector2i.__name__ = ["kha","math","Vector2i"];
kha.math.Vector2i.prototype = {
	__class__: kha.math.Vector2i
};
kha.math.Vector3 = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["kha.math.Vector3"] = kha.math.Vector3;
kha.math.Vector3.__name__ = ["kha","math","Vector3"];
kha.math.Vector3.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,set_length: function(length) {
		if(this.get_length() == 0) return 0;
		var mul = length / this.get_length();
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		return length;
	}
	,add: function(vec) {
		return new kha.math.Vector3(this.x + vec.x,this.y + vec.y,this.z + vec.z);
	}
	,sub: function(vec) {
		return new kha.math.Vector3(this.x - vec.x,this.y - vec.y,this.z - vec.z);
	}
	,mult: function(value) {
		return new kha.math.Vector3(this.x * value,this.y * value,this.z * value);
	}
	,dot: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	,cross: function(v) {
		var _x = this.y * v.z - this.z * v.y;
		var _y = this.z * v.x - this.x * v.z;
		var _z = this.x * v.y - this.y * v.x;
		return new kha.math.Vector3(_x,_y,_z);
	}
	,normalize: function() {
		var l = 1 / this.get_length();
		this.x *= l;
		this.y *= l;
		this.z *= l;
	}
	,__class__: kha.math.Vector3
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
kha.math.Vector4 = function(x,y,z,w) {
	if(w == null) w = 1;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.values = new Array();
	this.values.push(x);
	this.values.push(y);
	this.values.push(z);
	this.values.push(w);
};
$hxClasses["kha.math.Vector4"] = kha.math.Vector4;
kha.math.Vector4.__name__ = ["kha","math","Vector4"];
kha.math.Vector4.prototype = {
	get: function(index) {
		return this.values[index];
	}
	,set: function(index,value) {
		this.values[index] = value;
	}
	,get_x: function() {
		return this.values[0];
	}
	,set_x: function(value) {
		return this.values[0] = value;
	}
	,get_y: function() {
		return this.values[1];
	}
	,set_y: function(value) {
		return this.values[1] = value;
	}
	,get_z: function() {
		return this.values[2];
	}
	,set_z: function(value) {
		return this.values[2] = value;
	}
	,get_w: function() {
		return this.values[3];
	}
	,set_w: function(value) {
		return this.values[3] = value;
	}
	,get_length: function() {
		return Math.sqrt(this.get_x() * this.get_x() + this.get_y() * this.get_y() + this.get_z() * this.get_z());
	}
	,set_length: function(length) {
		if(this.get_length() == 0) return 0;
		var mul = length / this.get_length();
		var _g = this;
		_g.set_x(_g.get_x() * mul);
		var _g1 = this;
		_g1.set_y(_g1.get_y() * mul);
		var _g2 = this;
		_g2.set_z(_g2.get_z() * mul);
		return length;
	}
	,add: function(vec) {
		return new kha.math.Vector4(this.get_x() + vec.get_x(),this.get_y() + vec.get_y(),this.get_z() + vec.get_z());
	}
	,sub: function(vec) {
		return new kha.math.Vector4(this.get_x() - vec.get_x(),this.get_y() - vec.get_y(),this.get_z() - vec.get_z());
	}
	,mult: function(value) {
		return new kha.math.Vector4(this.get_x() * value,this.get_y() * value,this.get_z() * value);
	}
	,__class__: kha.math.Vector4
	,__properties__: {set_length:"set_length",get_length:"get_length",set_w:"set_w",get_w:"get_w",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var khattraction = {};
khattraction.KhattractionGame = function() {
	this.inidone = false;
	this.lastRender = 0;
	this.lastUpdate = 0;
	kha.Game.call(this,"Khattraction",false);
	khattraction.KhattractionGame.instance = this;
};
$hxClasses["khattraction.KhattractionGame"] = khattraction.KhattractionGame;
khattraction.KhattractionGame.__name__ = ["khattraction","KhattractionGame"];
khattraction.KhattractionGame.__super__ = kha.Game;
khattraction.KhattractionGame.prototype = $extend(kha.Game.prototype,{
	init: function() {
		kha.Configuration.setScreen(new kha.LoadingScreen());
		kha.math.Random.init(Math.floor(new Date().getTime()));
		kha.Loader.the.loadRoom("main",$bind(this,this.loadDone));
		this.backBuffer = kha.Image.createRenderTarget(this.width,this.height);
		engine.world.WorldManager.createInstance(6,3,200,190);
	}
	,loadDone: function() {
		kha.Configuration.setScreen(this);
		khattraction.KhattractionGame.gameBounds = new engine.physic.AABB(new kha.math.Vector3(0,0,0),new kha.math.Vector3(this.width,this.height,0));
		khattraction.level.LevelManager.loadLevel(1);
		this.menu = new khattraction.ui.IGMenu();
		this.blackHole = new khattraction.entities.GravitationalObject(new kha.math.Vector3(20,20,0),true,40,50);
		this.blackHole.locked = true;
		this.inidone = true;
	}
	,update: function() {
		if(!this.inidone) return;
		if(haxe.Timer.stamp() - this.lastUpdate < 0.033) return;
		this.lastUpdate = haxe.Timer.stamp();
		this.menu.update();
		engine.input.Dispatcher.get().update();
		engine.world.WorldManager.the.update();
		this.blackHole.update();
	}
	,render: function(frame) {
		if(!this.inidone) return;
		if(haxe.Timer.stamp() - this.lastRender < 0.033) {
			this.startRender(frame);
			kha.Scaler.scale(this.backBuffer,frame,kha.Sys.screenRotation);
			this.endRender(frame);
			return;
		}
		this.lastRender = haxe.Timer.stamp();
		var g = this.backBuffer.get_g2();
		g.begin();
		g.clear(kha._Color.Color_Impl_.fromBytes(48,48,48,255));
		engine.world.WorldManager.the.render(g);
		this.blackHole.render(g);
		this.menu.render(g);
		g.end();
		this.startRender(frame);
		kha.Scaler.scale(this.backBuffer,frame,kha.Sys.screenRotation);
		this.endRender(frame);
	}
	,getHeight: function() {
		return this.height;
	}
	,__class__: khattraction.KhattractionGame
});
khattraction.entities = {};
khattraction.entities.Entity = function(position,size) {
	this.isDead = false;
	this.position = position;
	this.size = size;
	this.zindex = 0;
	this.timeAlive = 0;
};
$hxClasses["khattraction.entities.Entity"] = khattraction.entities.Entity;
khattraction.entities.Entity.__name__ = ["khattraction","entities","Entity"];
khattraction.entities.Entity.prototype = {
	update: function() {
		this.timeAlive++;
	}
	,render: function(g) {
	}
	,__class__: khattraction.entities.Entity
};
khattraction.entities.MovingEntity = function(position,size,initialVelocity) {
	khattraction.entities.Entity.call(this,position,size);
	this.set_velocity(initialVelocity != null?initialVelocity:new kha.math.Vector3(0,0,0));
	this.set_acceleration(new kha.math.Vector3(0,0,0));
};
$hxClasses["khattraction.entities.MovingEntity"] = khattraction.entities.MovingEntity;
khattraction.entities.MovingEntity.__name__ = ["khattraction","entities","MovingEntity"];
khattraction.entities.MovingEntity.__super__ = khattraction.entities.Entity;
khattraction.entities.MovingEntity.prototype = $extend(khattraction.entities.Entity.prototype,{
	update: function() {
		khattraction.entities.Entity.prototype.update.call(this);
		this.set_velocity(this.get_velocity().add(this.get_acceleration()));
		this.position = this.position.add(this.get_velocity());
	}
	,get_acceleration: function() {
		return this.acceleration;
	}
	,set_acceleration: function(value) {
		return this.acceleration = value;
	}
	,get_velocity: function() {
		return this.velocity;
	}
	,set_velocity: function(value) {
		return this.velocity = value;
	}
	,__class__: khattraction.entities.MovingEntity
	,__properties__: {set_acceleration:"set_acceleration",get_acceleration:"get_acceleration",set_velocity:"set_velocity",get_velocity:"get_velocity"}
});
khattraction.entities.Bullet = function(position,size,initialVelocity) {
	this.shouldBeDead = false;
	this.damage = 1.0;
	this.speed = 6.0;
	this.defaultColor = 25358591;
	this.maxTimeAlive = 600;
	this.maxDeadCounter = 60;
	this.deadCounter = 0;
	this.maxBuffSize = 5;
	khattraction.entities.MovingEntity.call(this,position,size,initialVelocity == null?new kha.math.Vector3(0,0,0):initialVelocity.mult(this.speed));
	this.image = kha.Loader.the.getImage("bullet");
	this.posBuffer = new Array();
};
$hxClasses["khattraction.entities.Bullet"] = khattraction.entities.Bullet;
khattraction.entities.Bullet.__name__ = ["khattraction","entities","Bullet"];
khattraction.entities.Bullet.__super__ = khattraction.entities.MovingEntity;
khattraction.entities.Bullet.prototype = $extend(khattraction.entities.MovingEntity.prototype,{
	equal: function(o) {
		if(o.timeAlive == this.timeAlive) return true;
		return false;
	}
	,update: function() {
		if(this.isDead) {
			if(this.posBuffer.length > this.maxBuffSize) this.posBuffer.pop();
			this.posBuffer.splice(0,0,this.position);
			if(this.deadCounter++ > this.maxDeadCounter) {
				engine.world.WorldManager.the.removeEntity(this);
				this.shouldBeDead = true;
			}
			return;
		}
		khattraction.entities.MovingEntity.prototype.update.call(this);
		if(this.timeAlive > this.maxTimeAlive) this.isDead = true;
		if(this.posBuffer.length > this.maxBuffSize) this.posBuffer.pop();
		this.posBuffer.splice(0,0,this.position);
		if(!khattraction.KhattractionGame.gameBounds.contains(engine.physic.AABB.AabbFromEntity(this).getCenter())) {
			this.isDead = true;
			while(engine.world.WorldManager.the.getPartForEntity(this) == null) this.position = this.position.sub(this.get_velocity());
		}
		var walls = engine.world.WorldManager.the.getEntitiesInAabb(engine.physic.AABB.AabbFromEntity(this).expand(50),khattraction.entities.Wall);
		var _g = 0;
		while(_g < walls.length) {
			var wall = walls[_g];
			++_g;
			if(engine.physic.AABB.AabbFromEntity(this).collide(engine.physic.AABB.AabbFromEntity(wall))) this.isDead = true;
		}
		var targets = engine.world.WorldManager.the.getEntitiesInAabb(engine.physic.AABB.AabbFromEntity(this).expand(50),khattraction.entities.Target);
		var _g1 = 0;
		while(_g1 < targets.length) {
			var t = targets[_g1];
			++_g1;
			if(engine.physic.AABB.AabbFromEntity(this).collide(engine.physic.AABB.AabbFromEntity(t))) {
				if(khattraction.mathutils.Utils.distance(this.position,t.position) < (t.size.x * 2 + this.size.x * 2) / 2) {
					(js.Boot.__cast(t , khattraction.entities.Target)).takeDamage(this.damage);
					this.isDead = true;
				}
			}
		}
	}
	,render: function(g) {
		if(this.isDead) {
			this.playDeathAnimation(g);
			return;
		}
		g.set_color(this.defaultColor);
		var _g1 = 0;
		var _g = this.posBuffer.length;
		while(_g1 < _g) {
			var i = _g1++;
			var pos = this.posBuffer[i];
			g.set_opacity(1 - i / this.maxBuffSize);
			g.drawScaledImage(this.image,pos.x,pos.y,this.size.x,this.size.y);
		}
		g.set_opacity(1);
	}
	,playDeathAnimation: function(g) {
		var deathRatio = 1.0 * this.deadCounter / (1.0 * this.maxDeadCounter);
		var _g1 = 0;
		var _g = this.posBuffer.length;
		while(_g1 < _g) {
			var i = _g1++;
			var pos = this.posBuffer[i];
			g.set_opacity(1 - i / this.maxBuffSize);
			g.drawScaledImage(this.image,pos.x,pos.y,this.size.x * (1 - deathRatio),this.size.y * (1 - deathRatio));
		}
		g.pushOpacity(1);
		g.set_color(kha._Color.Color_Impl_.fromBytes(100 + (deathRatio * 155 | 0),255 - (deathRatio * 150 | 0),100 - (deathRatio * 100 | 0),255 - (255 * deathRatio | 0)));
		var _g2 = 0;
		while(_g2 < 10) {
			var i1 = _g2++;
			var dAngle = i1 * Math.PI * 0.05 * deathRatio + Math.PI / 5;
			g.drawScaledImage(this.image,this.position.x + deathRatio * Math.cos(dAngle * i1) * 50,this.position.y + deathRatio * Math.sin(dAngle * i1) * 50,this.size.x - this.size.x * deathRatio,this.size.y - this.size.y * deathRatio);
		}
		g.popOpacity();
	}
	,__class__: khattraction.entities.Bullet
});
khattraction.entities.BulletLauncher = function(position) {
	this.freq = 0.005;
	this.lastShoot = 0.0;
	this.turnSpeed = 3;
	khattraction.entities.Entity.call(this,position,new kha.math.Vector3(40,10,0));
	this.angle = 0;
	engine.input.Dispatcher.get().notify(null,null,$bind(this,this.onKeyPress));
	this.zindex = 100;
};
$hxClasses["khattraction.entities.BulletLauncher"] = khattraction.entities.BulletLauncher;
khattraction.entities.BulletLauncher.__name__ = ["khattraction","entities","BulletLauncher"];
khattraction.entities.BulletLauncher.__super__ = khattraction.entities.Entity;
khattraction.entities.BulletLauncher.prototype = $extend(khattraction.entities.Entity.prototype,{
	onKeyPress: function(key,str) {
		if(key == kha.Key.CHAR && (str == "z" || str == "w")) this.angle -= this.turnSpeed;
		if(key == kha.Key.CHAR && str == "s") this.angle += this.turnSpeed;
		if(key == kha.Key.CHAR && str == " ") this.launchBullet();
	}
	,launchBullet: function() {
		if(haxe.Timer.stamp() - this.lastShoot < this.freq) return;
		this.lastShoot = haxe.Timer.stamp();
		var bulletVel = new kha.math.Vector3(Math.cos(khattraction.mathutils.Utils.toRadian(this.angle)),Math.sin(khattraction.mathutils.Utils.toRadian(this.angle)),0);
		var b = new khattraction.entities.Bullet(new kha.math.Vector3(this.position.x,this.position.y,this.position.z),new kha.math.Vector3(8,8,0),bulletVel);
		engine.world.WorldManager.the.spawnEntity(b);
	}
	,update: function() {
	}
	,render: function(g) {
		var _g = 0;
		while(_g < 1) {
			var i = _g++;
			g.set_color(kha._Color.Color_Impl_.fromBytes(10 * i,255 - 20 * i,100));
			g.set_opacity(0.5);
			g.setBlendingMode(kha.graphics4.BlendingOperation.BlendOne,kha.graphics4.BlendingOperation.InverseDestinationAlpha);
			kha.graphics2.GraphicsExtension.fillCircle(g,this.position.x + 5 * i,this.position.y + 10 * i,this.size.x / 2,180);
			g.pushTranslation(this.position.x + 15 * i,this.position.y + 33 * i);
			g.pushRotation(khattraction.mathutils.Utils.toRadian(this.angle),this.position.x,this.position.y);
			g.set_opacity(0.9);
			g.setBlendingMode(kha.graphics4.BlendingOperation.BlendOne,kha.graphics4.BlendingOperation.InverseSourceAlpha);
			g.set_color(kha._Color.Color_Impl_.Black);
			g.fillRect(-this.size.x / 2,-this.size.y / 2,this.size.x,this.size.y);
			g.popTransformation();
			g.popTransformation();
			g.set_opacity(1);
		}
	}
	,__class__: khattraction.entities.BulletLauncher
});
khattraction.entities.GravitationalObject = function(position,inverseStrength,forceStrength,forceRadius) {
	if(forceRadius == null) forceRadius = 90;
	if(forceStrength == null) forceStrength = 30;
	if(inverseStrength == null) inverseStrength = false;
	this.maxInfluence = 5;
	this.maxSize = 400;
	this.minSize = 50;
	this.locked = false;
	khattraction.entities.Entity.call(this,position,new kha.math.Vector3(60,60,0));
	this.zindex = 50;
	this.forceRadius = forceRadius;
	if(inverseStrength) this.forceStrength = forceStrength * -1; else this.forceStrength = forceStrength;
	this.image = kha.Loader.the.getImage("bullet");
	engine.input.Dispatcher.get().mouseNotify($bind(this,this.mouseDown),$bind(this,this.mouseUp),$bind(this,this.onMouseDragged),$bind(this,this.onMouseMoved),$bind(this,this.onMouseWheel));
};
$hxClasses["khattraction.entities.GravitationalObject"] = khattraction.entities.GravitationalObject;
khattraction.entities.GravitationalObject.__name__ = ["khattraction","entities","GravitationalObject"];
khattraction.entities.GravitationalObject.__interfaces__ = [engine.ui.IResizable,engine.ui.IHoverable,engine.ui.IPlaceable];
khattraction.entities.GravitationalObject.__super__ = khattraction.entities.Entity;
khattraction.entities.GravitationalObject.prototype = $extend(khattraction.entities.Entity.prototype,{
	onMouseWheel: function(dw) {
		if(this.hover && this.size.x + dw > this.minSize && this.size.x + dw < this.maxSize) this.size.x += dw;
	}
	,onMouseDragged: function(button,dx,dy) {
		if(this.locked) return;
		if(this.selected && button == engine.input.Dispatcher.BUTTON_LEFT) {
			this.position.x += dx;
			this.position.y += dy;
		}
	}
	,mouseUp: function(button,x,y) {
		if(this.locked) return;
		if(this.selected) this.selected = false;
	}
	,mouseDown: function(button,x,y) {
		if(this.locked) return;
		if(this.hover && button == engine.input.Dispatcher.BUTTON_LEFT) this.selected = true;
	}
	,onMouseMoved: function(x,y) {
		if(this.locked) return;
		if(engine.physic.AABB.AabbFromEntity(this).contains(new kha.math.Vector3(x,y))) this.hover = true; else this.hover = false;
	}
	,applyInfluence: function(entity) {
		var dstSq = khattraction.mathutils.Utils.distanceSq(this.center,entity.position);
		var toMe = this.center.sub(entity.position);
		var steer = toMe.sub(entity.get_velocity()).mult(this.forceStrength / (dstSq + 1));
		if(steer.get_length() > this.maxInfluence) {
			steer.normalize();
			steer = steer.mult(this.maxInfluence);
		}
		entity.set_velocity(entity.get_velocity().add(steer));
	}
	,update: function() {
		khattraction.entities.Entity.prototype.update.call(this);
		this.center = engine.physic.AABB.AabbFromEntity(this).getCenter();
		var searchArea = new engine.physic.AABB(new kha.math.Vector3(this.position.x - this.forceRadius,this.position.y - this.forceRadius,0),new kha.math.Vector3(this.forceRadius * 2,2 * this.forceRadius,0));
		var ents = engine.world.WorldManager.the.getEntitiesInAabb(searchArea,khattraction.entities.Bullet);
		var _g = 0;
		while(_g < ents.length) {
			var ent = ents[_g];
			++_g;
			if(khattraction.mathutils.Utils.distance(this.center,ent.position) <= this.forceRadius) this.applyInfluence(js.Boot.__cast(ent , khattraction.entities.MovingEntity));
		}
	}
	,render: function(g) {
		g.pushOpacity(0.8);
		g.set_color(kha._Color.Color_Impl_.Green);
		g.drawScaledImage(this.image,this.position.x,this.position.y,this.size.x,this.size.y);
		if(this.hover) kha.graphics2.GraphicsExtension.drawCircle(g,this.center.x,this.center.y,this.forceRadius);
		g.popOpacity();
	}
	,__class__: khattraction.entities.GravitationalObject
});
khattraction.entities.Target = function(position) {
	this.maxDeadCounter = 60;
	this.deadCounter = 0;
	this.life = 50;
	khattraction.entities.Entity.call(this,position,new kha.math.Vector3(40,40,0));
};
$hxClasses["khattraction.entities.Target"] = khattraction.entities.Target;
khattraction.entities.Target.__name__ = ["khattraction","entities","Target"];
khattraction.entities.Target.__super__ = khattraction.entities.Entity;
khattraction.entities.Target.prototype = $extend(khattraction.entities.Entity.prototype,{
	update: function() {
		khattraction.entities.Entity.prototype.update.call(this);
		if(this.life < 0) {
			if(this.deadCounter++ > this.maxDeadCounter) khattraction.level.LevelManager.loadNext();
		}
	}
	,render: function(g) {
		if(this.life < 0) {
			var deathRatio = 1.0 * this.deadCounter / (1.0 * this.maxDeadCounter);
			g.set_color(kha._Color.Color_Impl_.fromBytes(100 + (deathRatio * 155 | 0),255 - (deathRatio * 150 | 0),100 - (deathRatio * 100 | 0),255 - (255 * deathRatio | 0)));
			var _g = 0;
			while(_g < 10) {
				var i = _g++;
				var dAngle = i * Math.PI * 0.05 * deathRatio + Math.PI / 5;
				kha.graphics2.GraphicsExtension.fillCircle(g,this.position.x + deathRatio * Math.cos(dAngle * i) * 50,this.position.y + deathRatio * Math.sin(dAngle * i) * 50,this.size.x - this.size.x * deathRatio);
			}
		} else {
			g.set_color(kha._Color.Color_Impl_.Purple);
			kha.graphics2.GraphicsExtension.fillCircle(g,this.position.x,this.position.y,this.size.x);
		}
	}
	,takeDamage: function(amount) {
		this.life -= amount;
	}
	,__class__: khattraction.entities.Target
});
khattraction.entities.Wall = function(position,size) {
	khattraction.entities.Entity.call(this,position,size);
	this.zindex = -10;
};
$hxClasses["khattraction.entities.Wall"] = khattraction.entities.Wall;
khattraction.entities.Wall.__name__ = ["khattraction","entities","Wall"];
khattraction.entities.Wall.__super__ = khattraction.entities.Entity;
khattraction.entities.Wall.prototype = $extend(khattraction.entities.Entity.prototype,{
	update: function() {
	}
	,render: function(g) {
		g.set_color(kha._Color.Color_Impl_.fromBytes(48,48,200,255));
		g.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
	}
	,__class__: khattraction.entities.Wall
});
khattraction.level = {};
khattraction.level.LevelManager = function() { };
$hxClasses["khattraction.level.LevelManager"] = khattraction.level.LevelManager;
khattraction.level.LevelManager.__name__ = ["khattraction","level","LevelManager"];
khattraction.level.LevelManager.loadLevel = function(nb) {
	engine.world.WorldManager.the.clearAll();
	var lvlData = kha.Loader.the.getBlob("level" + nb).toString();
	khattraction.level.LevelManager.currentLevel = JSON.parse(lvlData);
	var bulletLauncher = new khattraction.entities.BulletLauncher(khattraction.level.LevelManager.currentLevel.launcherPos);
	engine.world.WorldManager.the.spawnEntity(bulletLauncher);
	var target = new khattraction.entities.Target(khattraction.level.LevelManager.currentLevel.targetPos);
	engine.world.WorldManager.the.spawnEntity(target);
	var _g = 0;
	var _g1 = khattraction.level.LevelManager.currentLevel.walls;
	while(_g < _g1.length) {
		var walljs = _g1[_g];
		++_g;
		var wall = new khattraction.entities.Wall(walljs.position,walljs.size);
		engine.world.WorldManager.the.spawnEntity(wall);
	}
	var _g2 = 0;
	var _g11 = khattraction.level.LevelManager.currentLevel.attractors;
	while(_g2 < _g11.length) {
		var attr = _g11[_g2];
		++_g2;
		var attra = new khattraction.entities.GravitationalObject(attr.position,false,attr.forceStrength,attr.forceRadius);
		engine.world.WorldManager.the.spawnEntity(attra);
	}
};
khattraction.level.LevelManager.loadNext = function() {
};
khattraction.level.LevelManager.getLevelCount = function() {
	if(khattraction.level.LevelManager.levelCount == 0) {
		var lvlData = kha.Loader.the.getBlob("levels").toString();
		var tmp = JSON.parse(lvlData);
		khattraction.level.LevelManager.levelCount = tmp.levelCount;
	}
	return khattraction.level.LevelManager.levelCount;
};
khattraction.mathutils = {};
khattraction.mathutils.Utils = function() { };
$hxClasses["khattraction.mathutils.Utils"] = khattraction.mathutils.Utils;
khattraction.mathutils.Utils.__name__ = ["khattraction","mathutils","Utils"];
khattraction.mathutils.Utils.toDegree = function(angle) {
	return 180 * angle / 3.14159;
};
khattraction.mathutils.Utils.toRadian = function(angle) {
	return 3.14159 * angle / 180;
};
khattraction.mathutils.Utils.distance = function(v,v2) {
	var vec = v.sub(v2);
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
};
khattraction.mathutils.Utils.distanceSq = function(v,v2) {
	var vec = v.sub(v2);
	return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
};
khattraction.ui = {};
khattraction.ui.IGMenu = function() {
	this.gameHeight = khattraction.KhattractionGame.instance.height;
	this.gameWidth = khattraction.KhattractionGame.instance.width;
	engine.ui.Menu.call(this,null,new kha.math.Vector3(0,this.gameHeight - 100,0),new kha.math.Vector3(this.gameWidth,100,0));
	var helpBtn = engine.ui.Button.create(this).setPosition(this.gameWidth - 60,10,0).setSize(50,20).setText("Help ?");
	this.children.push(helpBtn);
	var attractorBtn = engine.ui.Button.create(this).setPosition(300,20,0).setSize(100,50).setText("Attractor");
	attractorBtn.onClick = function(mouseDown) {
		if(!mouseDown) return;
		var attr = new khattraction.entities.GravitationalObject(new kha.math.Vector3(attractorBtn.get_realPosition().x,attractorBtn.get_realPosition().y,0));
		attr.selected = true;
		engine.world.WorldManager.the.spawnEntity(attr);
	};
	this.children.push(attractorBtn);
	var repulsorBtn = engine.ui.Button.create(this).setPosition(500,20,0).setSize(100,50).setText("Repulsor");
	repulsorBtn.onClick = function(mouseDown1) {
		if(!mouseDown1) return;
		var rep = new khattraction.entities.GravitationalObject(new kha.math.Vector3(repulsorBtn.get_realPosition().x,repulsorBtn.get_realPosition().y,0),true);
		rep.selected = true;
		engine.world.WorldManager.the.spawnEntity(rep);
	};
	this.children.push(repulsorBtn);
};
$hxClasses["khattraction.ui.IGMenu"] = khattraction.ui.IGMenu;
khattraction.ui.IGMenu.__name__ = ["khattraction","ui","IGMenu"];
khattraction.ui.IGMenu.__super__ = engine.ui.Menu;
khattraction.ui.IGMenu.prototype = $extend(engine.ui.Menu.prototype,{
	update: function() {
		engine.ui.Menu.prototype.update.call(this);
	}
	,render: function(g) {
		engine.ui.Menu.prototype.render.call(this,g);
	}
	,onMouseMoved: function(x,y) {
		this.hover = this.bounds.contains(new kha.math.Vector3(x,y,0));
		motion.Actuate.tween(this.position,0.5,{ y : this.hover?khattraction.KhattractionGame.instance.height - 100:khattraction.KhattractionGame.instance.height - 20}).ease(motion.easing.Linear.get_easeNone());
	}
	,__class__: khattraction.ui.IGMenu
});
var motion = {};
motion.actuators = {};
motion.actuators.IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion.actuators.IGenericActuator;
motion.actuators.IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion.actuators.IGenericActuator.prototype = {
	__class__: motion.actuators.IGenericActuator
};
motion.actuators.GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion.Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion.actuators.GenericActuator;
motion.actuators.GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion.actuators.GenericActuator.__interfaces__ = [motion.actuators.IGenericActuator];
motion.actuators.GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return method.apply(method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion.Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,pause: function() {
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion.actuators.GenericActuator
};
motion.actuators.SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = new Array();
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe.Timer.stamp();
	motion.actuators.GenericActuator.call(this,target,duration,properties);
	if(!motion.actuators.SimpleActuator.addedEvent) {
		motion.actuators.SimpleActuator.addedEvent = true;
		motion.actuators.SimpleActuator.timer = new haxe.Timer(33);
		motion.actuators.SimpleActuator.timer.run = motion.actuators.SimpleActuator.stage_onEnterFrame;
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion.actuators.SimpleActuator;
motion.actuators.SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion.actuators.SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe.Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion.actuators.SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion.actuators.SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime > actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion.actuators.SimpleActuator.actuators.splice(j,1);
			--motion.actuators.SimpleActuator.actuatorsLength;
		}
	}
};
motion.actuators.SimpleActuator.__super__ = motion.actuators.GenericActuator;
motion.actuators.SimpleActuator.prototype = $extend(motion.actuators.GenericActuator.prototype,{
	autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				details = new motion.actuators.PropertyDetails(this.target,i,start,this.getField(this.properties,i) - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion.actuators.SimpleActuator.actuators.push(this);
		++motion.actuators.SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		this.paused = true;
		this.pauseTime = haxe.Timer.stamp();
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (haxe.Timer.stamp() - this.pauseTime) / 1000;
		}
	}
	,setField: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion.actuators.SimpleActuator
});
motion.easing = {};
motion.easing.Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion.easing.Expo;
motion.easing.Expo.__name__ = ["motion","easing","Expo"];
motion.easing.Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion.easing.Expo.get_easeIn = function() {
	return new motion.easing.ExpoEaseIn();
};
motion.easing.Expo.get_easeInOut = function() {
	return new motion.easing.ExpoEaseInOut();
};
motion.easing.Expo.get_easeOut = function() {
	return new motion.easing.ExpoEaseOut();
};
motion.easing.IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion.easing.IEasing;
motion.easing.IEasing.__name__ = ["motion","easing","IEasing"];
motion.easing.IEasing.prototype = {
	__class__: motion.easing.IEasing
};
motion.easing.ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion.easing.ExpoEaseOut;
motion.easing.ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion.easing.ExpoEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		if(t == d) return b + c; else return c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion.easing.ExpoEaseOut
};
motion.Actuate = function() { };
$hxClasses["motion.Actuate"] = motion.Actuate;
motion.Actuate.__name__ = ["motion","Actuate"];
motion.Actuate.apply = function(target,properties,customActuator) {
	motion.Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion.Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!motion.Actuate.targetLibraries.exists(target) && allowCreation) motion.Actuate.targetLibraries.set(target,new Array());
	return motion.Actuate.targetLibraries.get(target);
};
motion.Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MotionPathActuator);
};
motion.Actuate.pause = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).pause(); else {
		var library = motion.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.pause();
			}
		}
	}
};
motion.Actuate.pauseAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion.Actuate.reset = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
};
motion.Actuate.resume = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).resume(); else {
		var library = motion.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.resume();
			}
		}
	}
};
motion.Actuate.resumeAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion.Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js.Boot.__instanceof(target,motion.actuators.GenericActuator)) (js.Boot.__cast(target , motion.actuators.GenericActuator)).stop(null,complete,sendEvent); else {
			var library = motion.Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js.Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion.Actuate.timer = function(duration,customActuator) {
	return motion.Actuate.tween(new motion._Actuate.TweenTimer(0),duration,new motion._Actuate.TweenTimer(1),false,customActuator);
};
motion.Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion.Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion.Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion.Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion.Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion.Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion.Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion.Actuate.targetLibraries.h[target.__id__].length == 0) motion.Actuate.targetLibraries.remove(target);
	}
};
motion.Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MethodActuator);
};
motion._Actuate = {};
motion._Actuate.TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["motion._Actuate.TweenTimer"] = motion._Actuate.TweenTimer;
motion._Actuate.TweenTimer.__name__ = ["motion","_Actuate","TweenTimer"];
motion._Actuate.TweenTimer.prototype = {
	__class__: motion._Actuate.TweenTimer
};
motion.MotionPath = function() {
	this._x = new motion.ComponentPath();
	this._y = new motion.ComponentPath();
	this._rotation = null;
};
$hxClasses["motion.MotionPath"] = motion.MotionPath;
motion.MotionPath.__name__ = ["motion","MotionPath"];
motion.MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.BezierPath(x,controlX,strength));
		this._y.addPath(new motion.BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.LinearPath(x,strength));
		this._y.addPath(new motion.LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion.RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion.MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
motion.IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion.IComponentPath;
motion.IComponentPath.__name__ = ["motion","IComponentPath"];
motion.IComponentPath.prototype = {
	__class__: motion.IComponentPath
};
motion.ComponentPath = function() {
	this.paths = new Array();
	this.start = 0;
	this.totalStrength = 0;
};
$hxClasses["motion.ComponentPath"] = motion.ComponentPath;
motion.ComponentPath.__name__ = ["motion","ComponentPath"];
motion.ComponentPath.__interfaces__ = [motion.IComponentPath];
motion.ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion.ComponentPath
	,__properties__: {get_end:"get_end"}
};
motion.BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["motion.BezierPath"] = motion.BezierPath;
motion.BezierPath.__name__ = ["motion","BezierPath"];
motion.BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion.BezierPath
};
motion.LinearPath = function(end,strength) {
	motion.BezierPath.call(this,end,0,strength);
};
$hxClasses["motion.LinearPath"] = motion.LinearPath;
motion.LinearPath.__name__ = ["motion","LinearPath"];
motion.LinearPath.__super__ = motion.BezierPath;
motion.LinearPath.prototype = $extend(motion.BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion.LinearPath
});
motion.RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
$hxClasses["motion.RotationPath"] = motion.RotationPath;
motion.RotationPath.__name__ = ["motion","RotationPath"];
motion.RotationPath.__interfaces__ = [motion.IComponentPath];
motion.RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion.RotationPath
	,__properties__: {get_end:"get_end"}
};
motion.actuators.MethodActuator = function(target,duration,properties) {
	this.currentParameters = new Array();
	this.tweenProperties = { };
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = new Array();
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(null);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion.actuators.MethodActuator;
motion.actuators.MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion.actuators.MethodActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MethodActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion.actuators.SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion.actuators.PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion.actuators.MethodActuator
});
motion.actuators.MotionPathActuator = function(target,duration,properties) {
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion.actuators.MotionPathActuator;
motion.actuators.MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion.actuators.MotionPathActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MotionPathActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion.actuators.PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion.actuators.MotionPathActuator
});
motion.actuators.PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion.actuators.PropertyDetails;
motion.actuators.PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion.actuators.PropertyDetails.prototype = {
	__class__: motion.actuators.PropertyDetails
};
motion.actuators.PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion.actuators.PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion.actuators.PropertyPathDetails;
motion.actuators.PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion.actuators.PropertyPathDetails.__super__ = motion.actuators.PropertyDetails;
motion.actuators.PropertyPathDetails.prototype = $extend(motion.actuators.PropertyDetails.prototype,{
	__class__: motion.actuators.PropertyPathDetails
});
motion.easing.ExpoEaseIn = function() {
};
$hxClasses["motion.easing.ExpoEaseIn"] = motion.easing.ExpoEaseIn;
motion.easing.ExpoEaseIn.__name__ = ["motion","easing","ExpoEaseIn"];
motion.easing.ExpoEaseIn.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0; else return Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b; else return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion.easing.ExpoEaseIn
};
motion.easing.ExpoEaseInOut = function() {
};
$hxClasses["motion.easing.ExpoEaseInOut"] = motion.easing.ExpoEaseInOut;
motion.easing.ExpoEaseInOut.__name__ = ["motion","easing","ExpoEaseInOut"];
motion.easing.ExpoEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion.easing.ExpoEaseInOut
};
motion.easing.Linear = function() { };
$hxClasses["motion.easing.Linear"] = motion.easing.Linear;
motion.easing.Linear.__name__ = ["motion","easing","Linear"];
motion.easing.Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion.easing.Linear.get_easeNone = function() {
	return new motion.easing.LinearEaseNone();
};
motion.easing.LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion.easing.LinearEaseNone;
motion.easing.LinearEaseNone.__name__ = ["motion","easing","LinearEaseNone"];
motion.easing.LinearEaseNone.__interfaces__ = [motion.easing.IEasing];
motion.easing.LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,ease: function(t,b,c,d) {
		return c * t / d + b;
	}
	,__class__: motion.easing.LinearEaseNone
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
engine.input.Dispatcher.BUTTON_RIGHT = 1;
engine.input.Dispatcher.BUTTON_LEFT = 0;
engine.utils.Pair.__meta__ = { obj : { generic : null}};
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
kha._Color.Color_Impl_.Black = kha._Color.Color_Impl_._new(-16777216);
kha._Color.Color_Impl_.White = kha._Color.Color_Impl_._new(-1);
kha._Color.Color_Impl_.Red = kha._Color.Color_Impl_._new(-65536);
kha._Color.Color_Impl_.Blue = kha._Color.Color_Impl_._new(-16776961);
kha._Color.Color_Impl_.Green = kha._Color.Color_Impl_._new(-16711936);
kha._Color.Color_Impl_.Magenta = kha._Color.Color_Impl_._new(-65281);
kha._Color.Color_Impl_.Yellow = kha._Color.Color_Impl_._new(-256);
kha._Color.Color_Impl_.Cyan = kha._Color.Color_Impl_._new(-16711681);
kha._Color.Color_Impl_.Purple = kha._Color.Color_Impl_._new(-8388480);
kha._Color.Color_Impl_.Pink = kha._Color.Color_Impl_._new(-16181);
kha._Color.Color_Impl_.Orange = kha._Color.Color_Impl_._new(-23296);
kha.Configuration.id = -1;
kha.Game.FPS = 60;
kha.FontStyle.Default = new kha.FontStyle(false,false,false);
kha.Kravur.fontCache = new haxe.ds.StringMap();
kha.Scheduler.DIF_COUNT = 3;
kha.Scheduler.maxframetime = 0.1;
kha.Scheduler.delta = 0;
kha.Scheduler.dScale = 1;
kha.Starter.leftMouseCtrlDown = false;
kha.Sys.screenRotation = kha.ScreenRotation.RotationNone;
kha.graphics4.ImageShaderPainter.bufferSize = 100;
kha.graphics4.ImageShaderPainter.vertexSize = 9;
kha.graphics4.ColoredShaderPainter.bufferSize = 100;
kha.graphics4.ColoredShaderPainter.triangleBufferSize = 100;
kha.graphics4.TextShaderPainter.bufferSize = 100;
kha.js.Mouse.SystemCursor = "default";
kha.js.Music.loading = new List();
kha.js.Sound.loading = new List();
kha.js.Video.loading = new List();
kha.js.WebAudioSound.initialized = false;
kha.js.WebAudioSound.playsOgg = false;
kha.math._Matrix3.Matrix3_Impl_.width = 3;
kha.math._Matrix3.Matrix3_Impl_.height = 3;
kha.math.Matrix4.width = 4;
kha.math.Matrix4.height = 4;
kha.math.Random.index = 0;
khattraction.level.LevelManager.levelCount = 0;
motion.actuators.SimpleActuator.actuators = new Array();
motion.actuators.SimpleActuator.actuatorsLength = 0;
motion.actuators.SimpleActuator.addedEvent = false;
motion.Actuate.defaultActuator = motion.actuators.SimpleActuator;
motion.Actuate.defaultEase = motion.easing.Expo.get_easeOut();
motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
Main.main();
})(typeof window != "undefined" ? window : exports);
