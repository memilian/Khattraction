package khattraction.entities;
import engine.physic.AABB;
import motion.easing.Linear;
import motion.easing.Linear;
import motion.Actuate;
import haxe.Timer;
import engine.world.WorldManager;
import kha.Color;
import kha.math.Vector3;
import kha.Image;
import kha.Loader;
import kha.graphics2.Graphics;
class GravObjFx extends MovingEntity{

    var image : Image;
    var lifeRatio : Float;
    @:isVar public var ttl(default,default) : Float = 1;
    @:isVar public var lifeTime(default,default) : Float = 0;
    @:isVar public var birthTime(default,default) : Float = 0;
    @:isVar public var color(default,default) : Color;

    public function new(position : Vector3, size : Vector3) {
        super(position,size);
        image = Loader.the.getImage("bullet");
        color = Color.White;
        birthTime = Timer.stamp();
    }

    override public function update() {
        super.update();
        lifeTime = Timer.stamp()-birthTime;
        lifeRatio = Math.min(1, lifeTime/ttl);


        if(lifeTime > ttl){
            isDead = true;
            Actuate.tween(this, 1,{opacity:0}).onComplete(function(){
                WorldManager.the.removeEntity(this);
            });
        }
    }

    override public function fadeOut(){
        Actuate.tween(size, 2, {x:100}).ease(Linear.easeNone);
        Actuate.tween(size, 2, {y:100}).ease(Linear.easeNone);
    }

    override public function render(g:Graphics):Void {
        if(isDead)
            return;
        g.set_color(color);
        g.pushOpacity(lifeRatio);
        g.drawScaledImage(image,position.x,position.y,size.x,size.y);
        g.popOpacity();
    }

}
