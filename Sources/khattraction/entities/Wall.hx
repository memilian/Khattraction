package khattraction.entities;
import haxe.Timer;
import engine.world.WorldManager;
import motion.Actuate;
import engine.physic.AABB;
import engine.input.Dispatcher;
import kha.Color;
import kha.math.Vector3;
import kha.graphics2.Graphics;

class Wall extends Entity{

    public function new(position : Vector3, size : Vector3) {
        super(position, size);
        zindex = -10;
//TODO:EDIT_MODE_ONLY
#if EDITOR_MODE
        Dispatcher.get().mouseNotify(mouseDown,mouseUp,onMouseDragged,onMouseMoved,null);
#end
    }

    override public function update():Void {

    }

    override public function render(g:Graphics):Void {
        g.set_color(Color.fromBytes(48,48,200,255));
        g.fillRect(position.x, position.y, size.x, size.y);
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
        if( AABB.AabbFromEntity(this).contains(new Vector3(x,y,0)))
            hover = true;
        else
            hover = false;
    }
#end
}
