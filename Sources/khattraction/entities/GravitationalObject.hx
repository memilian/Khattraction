package khattraction.entities;

import engine.input.Dispatcher;
import kha.graphics2.GraphicsExtension;
import engine.ui.IPlaceable;
import engine.ui.IHoverable;
import kha.Color;
import khattraction.mathutils.Utils;
import engine.physic.AABB;
import engine.world.WorldManager;
import kha.Loader;
import kha.Image;
import kha.graphics2.Graphics;
import kha.math.Vector3;

using khattraction.mathutils.Utils;
using kha.graphics2.GraphicsExtension;

class GravitationalObject extends Entity implements IPlaceable implements IHoverable{

    public var selected:Bool;
    public var dragging:Bool;

    public function onMouseDragged(button:Int, dx:Int, dy:Int):Void {
        if(selected && button == Dispatcher.BUTTON_LEFT){
            position.x += dx;
            position.y += dy;
        }
    }

    public function mouseUp(button:Int, x:Int, y:Int){
        if(selected){
            selected = false;
        }
    }
    public function mouseDown(button:Int, x:Int, y:Int){
        if(hover && button == Dispatcher.BUTTON_LEFT){
           selected = true;
        }
    }

    public var hover:Bool;

    public function onMouseMoved(x:Int, y:Int):Void {
        if(AABB.AabbFromEntity(this).contains(new Vector3(x,y)))
            hover = true;
        else
            hover = false;
    }

    @:isVar public var forceRadius(default, default):Float;
    @:isVar public var forceStrength(default, default):Float;
    var image : Image;
    var maxInfluence = 5;
    var center : Vector3;

    public function new(position : Vector3, forceStrength : Float = 40, forceRadius : Float = 200 ) {
        super(position,new Vector3(60,60,0));
        this.forceRadius = forceRadius;
        this.forceStrength = forceStrength;
        image = Loader.the.getImage("bullet");
        Dispatcher.get().mouseNotify(mouseDown,mouseUp,onMouseDragged,onMouseMoved,null);
    }

    public function applyInfluence(entity : MovingEntity)  {

        var dstSq = center.distanceSq(entity.position);
        var toMe = center.sub(entity.position);
        var steer = toMe.sub(entity.velocity).mult(forceStrength/(dstSq+1));
        if(steer.length>maxInfluence){
            steer.normalize();
            steer = steer.mult(maxInfluence);
        }
        entity.velocity = entity.velocity.add(steer);
    }

    override public function update(){
        super.update();
        center = AABB.AabbFromEntity(this).getCenter();
        var searchArea = new AABB(new Vector3(position.x-forceRadius, position.y-forceRadius,0), new Vector3(forceRadius*2,2*forceRadius,0));
        var ents = WorldManager.the.getEntitiesInAabb(searchArea, Bullet);
        for(ent in ents){
            if(center.distance(ent.position)<=forceRadius){
                applyInfluence(cast(ent,MovingEntity));
            }
        }
    }

    override public function render(g : Graphics){
        g.set_color(Color.Green);
        g.drawScaledImage(image, position.x, position.y, size.x, size.y);
        if(hover)
            g.drawCircle(center.x,center.y, forceRadius);
    }
}
