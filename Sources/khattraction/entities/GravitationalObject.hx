package khattraction.entities;

import engine.ui.IResizable;
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

class GravitationalObject extends Entity implements IPlaceable implements IHoverable implements IResizable{


    public var selected:Bool;
    public var dragging:Bool;
    public var locked : Bool = false;
    public var minSize:Float = 50;
    public var maxSize:Float = 400;

    //Currently broken
    public function onMouseWheel(dw:Int):Void {
        if(hover && size.x + dw > minSize && size.x + dw < maxSize){
            size.x += dw;
        }
    }
    public function onMouseDragged(button:Int, dx:Int, dy:Int):Void {
        if(locked)
            return;
        if(selected && button == Dispatcher.BUTTON_LEFT){
            position.x += dx;
            position.y += dy;
        }
    }

    public function mouseUp(button:Int, x:Int, y:Int){
        if(locked)
            return;
        if(selected){
            selected = false;
        }
    }

    public function mouseDown(button:Int, x:Int, y:Int){
        if(locked)
            return;
        if(hover && button == Dispatcher.BUTTON_LEFT){
           selected = true;
        }
    }

    public var hover:Bool;

    public function onMouseMoved(x:Int, y:Int):Void {
        if(locked)
            return;
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

    public function new(position : Vector3, inverseStrength : Bool = false, forceStrength : Float = 30, forceRadius : Float = 90 ) {
        super(position,new Vector3(60,60,0));
        zindex = 50;
        this.forceRadius = forceRadius;
        this.forceStrength = inverseStrength?forceStrength*-1:forceStrength;
        image = Loader.the.getImage("bullet");
        Dispatcher.get().mouseNotify(mouseDown,mouseUp,onMouseDragged,onMouseMoved,onMouseWheel);
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
        g.pushOpacity(0.8);
        g.set_color(Color.Green);

        g.drawScaledImage(image, position.x, position.y, size.x, size.y);
        if(hover)
            g.drawCircle(center.x,center.y, forceRadius);
        g.popOpacity();
    }
}
