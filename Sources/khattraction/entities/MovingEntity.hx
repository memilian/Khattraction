package khattraction.entities;

import kha.math.Vector3;

class MovingEntity extends Entity{

    @:isVar public var velocity(get, set):Vector3;
    @:isVar public var acceleration(get, set):Vector3;

    public function new(position:Vector3, size:Vector3, ?initialVelocity:Vector3) {
        super(position, size);
        this.velocity = initialVelocity != null ? initialVelocity : new Vector3(0,0,0);
        this.acceleration = new Vector3(0,0,0);
    }

    override public function update(){
        super.update();
        velocity = velocity.add(acceleration);
        position = position.add(velocity);
    }

    public function get_acceleration():Vector3 {
        return acceleration;
    }

    public function set_acceleration(value:Vector3) {
        return this.acceleration = value;
    }

    public function get_velocity():Vector3 {
        return velocity;
    }

    public function set_velocity(value:Vector3) {
        return this.velocity = value;
    }


}
