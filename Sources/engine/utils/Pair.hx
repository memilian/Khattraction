package engine.utils;

@generic
class Pair{
    @:isVar public var x(default,default) : Int;
    @:isVar public var y(default,default) : Int;

    var __id__ : Int;

    public function new(x : Int, y : Int) {
        this.x = x;
        this.y = y;
        __id__ = hashCode();
    }

    public inline function equals(other : Pair){
        return x == other.x && y == other.y;
    }

    public function hashCode():Int{
        var hash = x*127+y*17+1;
        return hash;
    }
}
