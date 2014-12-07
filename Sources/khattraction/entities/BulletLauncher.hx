package khattraction.entities;

import engine.world.WorldManager;
import haxe.Timer;
import engine.input.Dispatcher;
import kha.graphics4.BlendingOperation;
import kha.Key;
import khattraction.mathutils.Utils;
import kha.graphics2.GraphicsExtension;
import kha.graphics2.Graphics;
import kha.Color;
import kha.math.Vector3;

using kha.graphics2.GraphicsExtension;
using khattraction.mathutils.Utils;

class BulletLauncher extends Entity {

    var angle:Float;
    var turnSpeed = 3;
    var lastShoot = 0.0;
    @:isVar var freq = 0.005;//shoot frequency (s)

    public function new(position:Vector3) {
        super(position, new Vector3(40,10,0));
        angle = 0;
        Dispatcher.get().notify(null,null,onKeyPress);
        zindex = 100;
    }

    public function onKeyPress(key:Key, str:String):Void {
        if(key == Key.CHAR && (str == 'z' || str == 'w'))
            angle -= turnSpeed;
        if(key == Key.CHAR && str == 's')
            angle += turnSpeed;
        if(key == Key.CHAR && str == ' '){

            launchBullet();
        }
    }

    private function launchBullet():Void {

        if(Timer.stamp()-lastShoot < freq)
            return;
        lastShoot = Timer.stamp();
        var bulletVel = new Vector3(Math.cos(angle.toRadian()),Math.sin(angle.toRadian()),0);
        var b = new Bullet(new Vector3(position.x,position.y,position.z), new Vector3(8,8,0),bulletVel);
        WorldManager.the.spawnEntity(b);
    }

    override public function update():Void {
       // position.x += 1*Math.cos(Random.getUpTo(360));
       // position.y += 1*Math.cos(Random.getUpTo(360));
    }

    override public function render(g:Graphics):Void {
        for(i in 0...1){
        g.set_color(Color.fromBytes(10*i,255-20*i,100));
        g.opacity = 0.5;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseDestinationAlpha);
        g.fillCircle(position.x+5*i, position.y+10*i, size.x/2, 180);
        g.pushTranslation(position.x+15*i,position.y+33*i);
        g.pushRotation(angle.toRadian(),position.x,position.y);
        g.opacity = 0.9;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseSourceAlpha);
        g.set_color(Color.Black);
        g.fillRect(-size.x/2,-size.y/2,size.x,size.y);
        g.popTransformation();
        g.popTransformation();
        g.opacity = 1;
       // g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.BlendOne);
        }

    }

/*
        g.set_color(Color.Cyan);
        g.opacity = 0.5;

        g.fillCircle(position.x, position.y, size.x/2, 180);
        g.pushTranslation(position.x,position.y);
        g.pushRotation(angle.toRadian(),position.x,position.y);
        g.opacity = 0.9;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseDestinationAlpha);

        g.set_color(Color.Black);
        g.fillRect(-size.x/2,-size.y/2,size.x,size.y);
        g.popTransformation();
        g.popTransformation();
        g.opacity = 1;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.BlendOne);
*/
}
