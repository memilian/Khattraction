package gravity.entities;

import kha.graphics2.Graphics;
import kha.math.Vector3;

class Entity {
    @:isVar public var position(get, set):Vector3;
    @:isVar public var size(get, set):Vector3;

    public function new(position:Vector3, size:Vector3) {
        this.position = position;
        this.size = size;
    }

    public function update() : Void{

    }

    public function render(g : Graphics) : Void{

    }
    //Getters & setters

    public function get_position():Vector3 {
        return position;
    }

    public function set_position(value:Vector3) {
        return this.position = value;
    }

    public function set_size(value:Vector3) {
        return this.size = value;
    }

    public function get_size():Vector3 {
        return size;
    }


}
