package khattraction.entities;
import engine.world.WorldManager;
import engine.input.Dispatcher;
import haxe.Timer;
import engine.physic.AABB;
import khattraction.level.LevelManager;
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
//TODO:EDIT_MODE_ONLY
        #if EDITOR_MODE
            Dispatcher.get().mouseNotify(mouseDown,mouseUp,onMouseDragged,onMouseMoved,null);
        #end
    }

    override public function update(){
        super.update();
        if(life<0)
            if(deadCounter++==maxDeadCounter)
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

//TODO:EDIT_MODE_ONLY
#if EDITOR_MODE

    public var selected:Bool;
    public var hover:Bool;
    public var dragging:Bool;
    public var locked : Bool = false;

    override public function onDestroy(){
        Dispatcher.get().mouseRemove(mouseDown,mouseUp,onMouseDragged,onMouseMoved,null);
    }
    var lastResize = 0.0;
    var xBuf = 0;
    var yBuf = 0;
    public function onMouseDragged(button:Int, dx:Int, dy:Int):Void {
        if(locked)
            return;
        if(hover)
            dragging = true;
        if(selected && button == Dispatcher.BUTTON_LEFT){
            if(!KhattractionGame.gameBounds.contains(new Vector3(position.x+dx, position.y+dy,0)))
                return;
            xBuf += dx;
            yBuf += dy;

            var nx = Math.round((position.x+xBuf)/20)*20;
            var ny = Math.round((position.y+yBuf)/20)*20;
            if(nx != position.x){
                position.x = nx;
                xBuf = 0;
            }
            if(ny != position.y){
                position.y = ny;
                yBuf = 0;
            }
        }else if(selected && button == Dispatcher.BUTTON_RIGHT){
            if(Timer.stamp()-lastResize < 0.2)
                return;
            lastResize = Timer.stamp();
            if(Math.abs(dx)>Math.abs(dy) && size.x + 20*dx > 0)
                size.x += 20*dx;
            else if(size.y +20*dy > 0)
                size.y +=20*dy;
        }
    }

    public function mouseUp(button:Int, x:Int, y:Int){
        if(locked)
            return;

        if(!dragging && selected && button == Dispatcher.BUTTON_RIGHT){
            isDead = true;
            WorldManager.the.removeEntity(this);
        }
        if(selected)
            selected = false;
        if(dragging)
            dragging = false;
    }

    public function mouseDown(button:Int, x:Int, y:Int){
        if(locked)
            return;
        if(hover){
            selected = true;
        }
    }


    public function onMouseMoved(x:Int, y:Int):Void {
        if(locked || dragging)
            return;
        if( AABB.AabbFromEntity(this).contains(new Vector3(x,y)))
            hover = true;
        else
            hover = false;
    }
    #end
}
