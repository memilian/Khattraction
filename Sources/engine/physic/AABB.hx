package engine.physic;

import khattraction.entities.Entity;
import kha.math.Vector3;

class AABB {

    @:isVar var position:Vector3;
    @:isVar var size:Vector3;

    public function new(position : Vector3, size : Vector3){
        this.position = position;
        this.size = size;
    }

    public function update(pos : Vector3, size : Vector3){
        this.position = pos;
        this.size = size;
    }
    public static function AabbFromEntity(ent : Entity) {
        return new AABB(ent.position,ent.size);
    }

    public function expand(amount : Float) {
        return new AABB(new Vector3(position.x-amount/2,position.y-amount/2,0),new Vector3(size.x+amount/2, size.y+amount/2));
    }

    public function getCenter():Vector3 {

        return new Vector3(position.x+size.x/2,
                            position.y+size.y/2,
                            position.z+size.z/2
                    );
    }

    public function collide(other:AABB):Bool {
        return !(position.x > other.position.x+other.size.x ||
                position.x+size.x < other.position.x ||
                position.y > other.position.y+other.size.y ||
                position.y+size.y < other.position.y ||
                position.z > other.position.z+other.size.z ||
                position.z+size.z < other.position.z
        );
    }

    public function contains( point:Vector3):Bool {


        return !(position.x > point.x ||
                position.x+size.x < point.x ||
                position.y > point.y ||
                position.y+size.y < point.y ||
                position.z > point.z||
                position.z+size.z < point.z
        );
    }
}
