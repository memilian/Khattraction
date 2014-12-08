package engine.ui;

import engine.ui.UIElement;
import engine.ui.Button;
import engine.ui.UIElement;
import khattraction.KhattractionGame;
import motion.easing.Linear;
import motion.Actuate;
import engine.physic.AABB;
import engine.input.Dispatcher;
import kha.Color;
import kha.math.Vector3;
import kha.graphics2.Graphics;

class Menu extends UIElement implements IHoverable{

    var hover:Bool;
    var children : Array<UIElement>;


    public function new(parent : UIElement = null, pos : Vector3, size : Vector3) {
        super(parent, pos, size);
        children = new Array<UIElement>();
        bgColor = Color.fromBytes(96,96,96,128);
        Dispatcher.get().mouseNotify(null, null, null, onMouseMoved, null);
    }

    override public function update(){
        bounds.update(position,size);
        for(elm in children)
            elm.update();
    }

    override public function render(g :Graphics){
        super.render(g);
        g.set_opacity(hover?1:0.5);
        g.fillRect(position.x, position.y,size.x,size.y);
        for(elm in children)
            elm.render(g);
    }

    public function onMouseMoved(x:Int, y:Int):Void {}


}
