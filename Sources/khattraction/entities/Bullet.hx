package khattraction.entities;
import kha.graphics4.BlendingOperation;
import motion.Actuate;
import engine.physic.AABB;
import khattraction.mathutils.Utils;
import engine.physic.AABB;
import engine.world.WorldManager;
import kha.Color;
import kha.Image;
import kha.graphics2.Graphics;
import kha.Loader;
import kha.math.Vector3;

using engine.physic.AABB;
using khattraction.mathutils.Utils;

class Bullet  extends MovingEntity{

    var image : Image;
    var posBuffer : Array<Vector3>;
    var maxBuffSize = 5;
    var deadCounter = 0;
    var maxDeadCounter = 60;
    var maxTimeAlive : Int = 800;
    var defaultColor = Color.fromBytes(130,240,255,1);
    var speed = 6.0;
    var damage = 10.0;
    static var sine = 0.0;
    public var shouldBeDead = false;

    public function new(position:Vector3, size:Vector3, initialVelocity:Vector3) {
        super(position, size, initialVelocity == null?new Vector3(0,0,0):initialVelocity.mult(speed));
        image = Loader.the.getImage("bullet");
        posBuffer = new Array<Vector3>();
        Actuate.tween(this,3,{sine:360}).repeat().reflect().smartRotation();
    }

    public function equal(o){
        if(o.timeAlive == this.timeAlive)
            return true;
        return false;
    }


    override public function update() : Void{
        if(isDead){
            if(posBuffer.length > maxBuffSize)
                posBuffer.pop();
            posBuffer.insert(0,position);
            if(deadCounter++>maxDeadCounter){
                WorldManager.the.removeEntity(this);
                shouldBeDead = true;
            }
            return;
        }

        super.update();
        if(timeAlive > maxTimeAlive)
            isDead = true;
        if(posBuffer.length > maxBuffSize)
            posBuffer.pop();
        posBuffer.insert(0,position);

        if(!KhattractionGame.gameBounds.contains(position)){
            isDead = true;
            while(WorldManager.the.getPartForEntity(this) == null){
                position = position.sub(velocity); //Stay in world part
            }
        }

        var walls = WorldManager.the.getEntitiesInAabb(AABB.AabbFromEntity(this).expand(50), Wall, true);
        for(wall in walls){
            if(AABB.AabbFromEntity(this).collide(AABB.AabbFromEntity(wall)))
                isDead = true;
        }

        var targets = WorldManager.the.getEntitiesInAabb(AABB.AabbFromEntity(this).expand(50), Target, true);
        for(t in targets){
            var tAabb = AABB.AabbFromEntity(t);

            if(position.distance(tAabb.getCenter())<(t.size.x/2)){
                cast(t,Target).takeDamage(damage);
                isDead = true;
            }
        }
    }

    override public function render(g : Graphics) : Void{
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.Undefined);

        if(isDead){
            playDeathAnimation(g);
            return;
        }
        g.set_color(defaultColor);

        for(i in 0...posBuffer.length){
            var pos = posBuffer[i];
            g.set_opacity(1-i/maxBuffSize);
            g.drawScaledImage(image,pos.x,pos.y,size.x,size.y);
        }
        g.set_opacity(1);
    }

    private function playDeathAnimation(g : Graphics){
        var deathRatio : Float = (1.0*deadCounter)/(1.0*maxDeadCounter);

        for(i in 0...posBuffer.length){
            var pos = posBuffer[i];
            g.set_opacity(1-i/maxBuffSize);
            g.drawScaledImage(image,pos.x,pos.y,size.x*(1-deathRatio),size.y*(1-deathRatio));
        }
        g.pushOpacity(1);


        g.set_color(Color.fromBytes(100+Std.int(deathRatio*155), 255-Std.int(deathRatio*150), 100-Std.int(deathRatio*100),255-Std.int(255*deathRatio)));
        for(i in 0...10){
            var dAngle  = i*Math.PI*0.05*deathRatio+(sine/5);
            g.drawScaledImage(image,position.x+deathRatio*Math.cos(dAngle * i) * 50,
                                    position.y+deathRatio*Math.sin(dAngle * i) * 50,
                                    size.x-size.x*deathRatio,
                                    size.y-size.y*deathRatio);

        }
        g.popOpacity();
    }


}
