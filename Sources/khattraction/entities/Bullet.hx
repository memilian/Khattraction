package khattraction.entities;
import khattraction.mathutils.Angles;
import khattraction.physic.AABB;
import engine.world.WorldManager;
import kha.Color;
import kha.Image;
import kha.graphics2.Graphics;
import kha.Loader;
import kha.math.Vector3;

using khattraction.physic.AABB;
using khattraction.mathutils.Angles;

class Bullet  extends MovingEntity{

    var image : Image;
    var posBuffer : Array<Vector3>;
    var maxBuffSize = 5;
    var deadCounter = 0;
    var maxDeadCounter = 60;
    var isDead = false;

    var defaultColor = Color.fromBytes(130,240,255,1);
    var speed = 6.0;

    public function new(position:Vector3, size:Vector3, initialVelocity:Vector3) {
        super(position, size, initialVelocity.mult(speed));
        image = Loader.the.getImage("bullet");
        posBuffer = new Array<Vector3>();
    }


    override public function update() : Void{
        if(isDead){
            if(posBuffer.length > maxBuffSize)
                posBuffer.pop();
            posBuffer.insert(0,position);
            if(deadCounter++>maxDeadCounter)
                WorldManager.the.removeEntity(this);
            return;
        }

        super.update();

        if(posBuffer.length > maxBuffSize)
            posBuffer.pop();
        posBuffer.insert(0,position);

        if(!KhattractionGame.gameBounds.collide(AABB.AabbFromEntity(this))){
            isDead = true;
            position = position.sub(velocity); //Stay in world part
        }

        var walls = WorldManager.the.getEntitiesInAabb(AABB.AabbFromEntity(this).expand(50), Wall);
        for(wall in walls){
            if(AABB.AabbFromEntity(this).collide(AABB.AabbFromEntity(wall)))
                isDead = true;
        }
    }

    override public function render(g : Graphics) : Void{
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
        g.set_opacity(1);


        g.set_color(Color.fromBytes(100+Std.int(deathRatio*155), 255-Std.int(deathRatio*150), 100-Std.int(deathRatio*100),255-Std.int(255*deathRatio)));
        for(i in 0...10){
            var dAngle  = i*Math.PI*0.05*deathRatio+(Math.PI/5);
            g.drawScaledImage(image,position.x+deathRatio*Math.cos(dAngle * i) * 50,
                                    position.y+deathRatio*Math.sin(dAngle * i) * 50,
                                    size.x-size.x*deathRatio,
                                    size.y-size.y*deathRatio);

        }
    }


}
