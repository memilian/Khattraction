package khattraction.entities;

import motion.easing.Linear;
import motion.Actuate;
import kha.graphics2.Graphics;
import kha.math.Vector3;

class Entity {

    @:isVar public var position(default, default):Vector3;
    @:isVar public var size(default, default):Vector3;
    @:isVar public var zindex(default, default):Int;
    @:isVar public var timeAlive(default, default):Int;
    @:isVar public var isDead(default, default):Bool = false;

    public function new(position:Vector3, size:Vector3) {
        this.position = position;
        this.size = size;
        zindex = 0;
        timeAlive = 0;
    }

    public function update() : Void{
        timeAlive++;
    }

    public function render(g : Graphics) : Void{

    }

    public function onDestroy(){

    }

    public function fadeOut(){
        Actuate.tween(size, 0.5, {x:0}).ease(Linear.easeNone);
        Actuate.tween(size, 0.5, {y:0}).ease(Linear.easeNone);
    }
    public function fadeIn(){
        var normSize = size.mult(1);
        size.x = 0;
        size.y = 0;
        Actuate.tween(size, 0.5, {x:normSize.x}).ease(Linear.easeNone);
        Actuate.tween(size, 0.5, {y:normSize.y}).ease(Linear.easeNone);
    }
}
