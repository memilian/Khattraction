package khattraction.entities;

import kha.math.Vector3;

class GravitationalObject extends Entity{

    @:isVar public var forceRadius(get, set):Float;
    @:isVar public var forceStrength(get, set):Float;


    public function new(position:Vector3,size:Vector3, forceRadius : Float, forceStrength:Float) {
        super(position,size);
        this.forceRadius = forceRadius;
        this.forceStrength = forceStrength;
    }

    public function getInfluence(entity : Entity) : Vector3 {

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
