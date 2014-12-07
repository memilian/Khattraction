package khattraction.entities;
import engine.physic.AABB;
import khattraction.level.LevelManager;
import engine.world.WorldManager;
import kha.graphics2.GraphicsExtension;
import kha.Color;
import kha.graphics2.Graphics;
import kha.math.Vector3;

using kha.graphics2.GraphicsExtension;

class Target extends Entity{

    @:isVar public var life(default,default) : Float = 50;
    var deadCounter = 0;
    var maxDeadCounter = 60;

    public function new(position : Vector3) {
        super(position, new Vector3(40,40,0));
    }

    override public function update(){
        super.update();
        if(life<0)
            if(deadCounter++>maxDeadCounter)
                LevelManager.loadNext();
    }

    override public function render(g:Graphics){
        var center = AABB.AabbFromEntity(this).getCenter();

        if(life<0){
            var deathRatio : Float = (1.0*deadCounter)/(1.0*maxDeadCounter);


            g.set_color(Color.fromBytes(100+Std.int(deathRatio*155), 255-Std.int(deathRatio*150), 100-Std.int(deathRatio*100),255-Std.int(255*deathRatio)));
            for(i in 0...50){
                var dAngle  = i*Math.PI*0.01*deathRatio+(Math.PI/5);
                g.fillCircle(center.x+deathRatio*Math.cos(dAngle * i) * 150,
                center.y+deathRatio*Math.sin(dAngle * i) * 150,
                size.x/2-size.x/2*deathRatio);

            }
        }else{
            g.set_color(Color.Purple);
            g.fillCircle(center.x,center.y,size.x/2);
        }
    }

    public function takeDamage(amount:Float):Void {
        life -= amount;
    }
}
