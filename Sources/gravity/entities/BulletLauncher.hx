package gravity.entities;

import gravity.GravityGame;
import kha.graphics4.Graphics2;
import kha.graphics4.Usage;
import kha.graphics4.VertexStructure;
import kha.graphics4.VertexData;
import kha.Loader;
import kha.graphics4.IndexBuffer;
import kha.graphics4.VertexBuffer;
import kha.graphics4.Program;
import kha.graphics4.FragmentShader;
import kha.graphics4.VertexShader;
import gravity.input.Dispatcher;
import haxe.io.Input;
import kha.graphics4.BlendingOperation;
import kha.math.Random;
import kha.Key;
import kha.input.Keyboard;
import gravity.mathutils.Angles;
import kha.graphics2.GraphicsExtension;
import kha.graphics2.Graphics;
import kha.Color;
import kha.math.Vector3;

using kha.graphics2.GraphicsExtension;
using gravity.mathutils.Angles;

class BulletLauncher extends Entity {



    private var angle:Float;

    public function new(position:Vector3,size:Vector3) {
        super(position, size);
        angle = 90;
        Dispatcher.get().notify(null,null,onKeyPress);
    }

    public function onKeyPress(key:Key, str:String):Void {
        if(key == Key.CHAR && str == 'z')
            angle += 1.5;
        if(key == Key.CHAR && str == 's')
            angle -= 1.5;
    }

    override public function update():Void {
       // position.x += 1*Math.cos(Random.getUpTo(360));
       // position.y += 1*Math.cos(Random.getUpTo(360));
    }

    override public function render(g:Graphics):Void {

        for(i in 0...10){
        g.set_color(Color.fromBytes(10*i,255-20*i,100));
        g.opacity = 0.5;

        g.fillCircle(position.x+5*i, position.y+10*i, size.x/2, 180);
        g.pushTranslation(position.x+15*i,position.y+33*i);
        g.pushRotation(angle.toRadian(),position.x,position.y);
        g.opacity = 0.9;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseDestinationAlpha);

        g.set_color(Color.Black);
        g.fillRect(-size.x/2,-size.y/2,size.x,size.y);
        g.popTransformation();
        g.popTransformation();
        g.opacity = 1;
        g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.BlendOne);
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
