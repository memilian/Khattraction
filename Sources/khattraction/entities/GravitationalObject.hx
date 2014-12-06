package khattraction.entities;

import kha.math.Vector3;

class GravitationalObject extends Entity{

    @:isVar public var forceRadius(default, default):Float;
    @:isVar public var forceStrength(default, default):Float;

    public function new(position : Vector3, size : Vector3, forceStrength : Float = 1, forceRadius : Float = 100 ) {
        super(position,size);
        this.forceRadius = forceRadius;
        this.forceStrength = forceStrength;
    }

    public function applyInfluence(entity : Entity) : Vector3 {

    }

    public function set_forceRadius(value:Float) {
        return this.forceRadius = value;
    }

    public function get_forceRadius():Float {
        return forceRadius;
    }

    public function get_forceStrength():Float {
        return forceStrength;
    }

    public function set_forceStrength(value:Float) {
        return this.forceStrength = value;
    }

}
