package khattraction.entities;

import motion.easing.Linear;
import kha.math.Random;
import motion.Actuate;
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
    public var hover:Bool;
    public var dragging:Bool;
    public var locked : Bool = false;
    public var minSize:Float = 40;
    public var maxSize:Float = 400;
    public var maxStrength:Float = 100;
    public var minStrength:Float = 5;
    @:isVar public var forceRadius(default, default):Float;
    @:isVar public var forceStrength(default, default):Float;
    public var inverseStrength : Bool;

    var sine = 0.0;

    var circle : Image;
    var maxInfluence = 5;
    var center : Vector3;
    var fxArr : Array<GravObjFx>;

    public function new(position : Vector3, inverseStrength : Bool = false, forceStrength : Float = 30, forceRadius : Float = 90 ) {
        super(position,new Vector3(60,60,0));
        zindex = 50;
        this.forceRadius = forceRadius;
        this.forceStrength = inverseStrength?forceStrength*-1:forceStrength;
        this.inverseStrength = (this.forceStrength<0);

        if(inverseStrength){
            var tmp = minStrength;
            minStrength = -1*maxStrength;
            maxStrength = -1*tmp;
        }
        circle = Loader.the.getImage("circle");
        Dispatcher.get().mouseNotify(mouseDown,mouseUp,onMouseDragged,onMouseMoved,onMouseWheel);
        fxArr = new Array<GravObjFx>();
        Actuate.tween(this, 3,{sine:360}).repeat().reflect().smartRotation();
    }

    override public function onDestroy(){
        Dispatcher.get().mouseRemove(mouseDown,mouseUp,onMouseDragged,onMouseMoved,onMouseWheel);
    }

    //Currently broken
    public function onMouseWheel(dw:Int):Void {
        if(hover && size.x + dw > minSize && size.x + dw < maxSize){
            size.x += dw;
        }
    }
    public function onMouseDragged(button:Int, dx:Int, dy:Int):Void {
        if(locked)
            return;
        if(hover)
            dragging = true;
        if(selected && button == Dispatcher.BUTTON_LEFT){
            if(!KhattractionGame.gameBounds.contains(new Vector3(position.x+dx, position.y+dy,0)))
                return;
            position.x += dx;
            position.y += dy;
        }else if(selected && button == Dispatcher.BUTTON_RIGHT){
            if(Math.abs(dx)>Math.abs(dy))
                resizeStrength(dx);
           /* else
                resizeRadius(dy);*/
        }
    }

    public function mouseUp(button:Int, x:Int, y:Int){
        if(locked)
            return;

        if(!dragging && selected && button == Dispatcher.BUTTON_RIGHT){
            isDead = true;
            for(fx in fxArr){
                fx.ttl = 0;
                WorldManager.the.removeEntity(fx);
            }
            var tmp = new Vector3(0,0,0);
            Actuate.tween(this, 1, {minSize:1}).onComplete(function(){
                WorldManager.the.removeEntity(this);
            });
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

    public function applyInfluence(entity : MovingEntity)  {
        if(isDead)
            return;
        var dstSq = center.distanceSq(entity.position);
        var toMe = center.sub(entity.position);
        var steer = toMe.sub(entity.velocity).mult(forceStrength/(dstSq+1));
        if(steer.length>maxInfluence){
            steer.normalize();
            steer = steer.mult(maxInfluence);
        }
        if(Type.getClass(entity)==GravObjFx)
            entity.velocity = entity.velocity.add(steer.mult(inverseStrength?0.1:0.3));
        else
            entity.velocity = entity.velocity.add(steer);
    }

    override public function fadeOut(){
        inverseStrength = true;

        Actuate.tween(this, 2, {forceStrength:-100*forceStrength}).ease(Linear.easeNone);
    }

    public function resizeStrength(ds : Int):Void {
        if(forceStrength+ds < maxStrength && forceStrength+ds > minStrength)
            forceStrength += ds;
    }

    public function resizeRadius(dr : Int):Void {
       /* if(forceRadius+dr < maxSize && forceRadius+dr > minSize)
            forceRadius += dr;*/
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
        for(fx in fxArr){
            if(fx.isDead){
                fxArr.remove(fx);
                WorldManager.the.removeEntity(fx);
            }
            applyInfluence(fx);
        }
        if(isDead)
            return;
        var radius = inverseStrength?5:forceRadius;
        var angle = sine/5;
        var sineRatio = sine/360;
        for(i in 0...3){

            var pos = center.add(new Vector3(
                (Math.cos(angle*(i+1)) * radius),
                (Math.sin(angle*(i+1)) * radius),
                0
            ));
            var baseSize = inverseStrength?15:1;
            var nfx = new GravObjFx(pos,new Vector3(baseSize,baseSize,0));

            if(inverseStrength)

                nfx.color = Color.fromBytes(Std.int(255-100*sineRatio),Std.int(155+100*sineRatio),0);
            else
                nfx.color = Color.fromBytes(0,Std.int(255-100*sineRatio),Std.int(155+100*sineRatio));

            nfx.ttl = 1.0;
            WorldManager.the.spawnEntity(nfx);
            fxArr.push(nfx);
            Actuate.tween(nfx.size,4,{x:inverseStrength?1:15});
            Actuate.tween(nfx.size,4,{y:inverseStrength?1:15});
        }
    }

    override public function render(g : Graphics){
        if(isDead)
            return;
        if(hover)
        {
            g.pushOpacity(0.8);
            g.set_color(Color.fromBytes(40,200,50,128));
            g.drawCircle(center.x,center.y, forceRadius);
            //g.set_color(Color.fromBytes(40,200,50,50));
            //g.drawCircle(center.x,center.y, forceRadius-1);
            //g.drawCircle(center.x,center.y, forceRadius+1);
            //g.drawScaledImage(circle, position.x-45, position.y-45,180, 180);
//g.drawScaledImage(image, position.x, position.y, size.x, size.y);


    /*
            g.drawScaledImage(image, position.x, position.y, size.x, size.y);
            if(hover)
                g.drawCircle(center.x,center.y, forceRadius);
                */
            g.popOpacity();
        }
    }
}
