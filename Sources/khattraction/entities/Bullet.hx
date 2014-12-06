package khattraction.entities;
import khattraction.physic.AABB;
import engine.world.WorldManager;
import kha.Color;
import kha.Image;
import kha.graphics2.Graphics;
import kha.Loader;
import kha.math.Vector3;

using khattraction.physic.AABB;

class Bullet  extends MovingEntity{

    var image : Image;
    var posBuffer : Array<Vector3>;
    var maxBuffSize = 5;

    var defaultColor = Color.fromBytes(130,240,255,1);
    var speed = 6.0;

    public function new(position:Vector3, size:Vector3, initialVelocity:Vector3) {
        super(position, size, initialVelocity.mult(speed));
        image = Loader.the.getImage("bullet");
        posBuffer = new Array<Vector3>();
    }


    override public function update() : Void{
        super.update();

        if(posBuffer.length > maxBuffSize)
            posBuffer.pop();
        posBuffer.insert(0,position);

        if(!KhattractionGame.gameBounds.collide(AABB.AabbFromEntity(this)))
            WorldManager.the.removeEntity(this);
    }

    override public function render(g : Graphics) : Void{

        g.set_color(defaultColor);

        for(i in 0...posBuffer.length){
            var pos = posBuffer[i];
            g.set_opacity(1-i/maxBuffSize);
            g.drawScaledImage(image,pos.x,pos.y,size.x,size.y);
        }
        g.set_opacity(1);
    }

}
