package engine.ui;
import kha.Font;
import kha.FontStyle;
import kha.Loader;
import kha.Kravur;
import kha.Color;
import kha.graphics2.Graphics;
import engine.ui.UIElement;
import engine.input.Dispatcher;
import engine.ui.IClickable;
import engine.ui.UIElement;
import engine.ui.IHoverable;
import engine.physic.AABB;
import kha.math.Vector3;

class Button extends UIElement implements IHoverable implements IClickable implements IDisplayText{

    @:isVar public var onClick(default,default) : Void->Void;
    @:isVar public var active(default,default) : Bool = false;
    @:isVar public var text(default,default) : String;
    @:isVar public var font(default,default) : Font;

    var hover : Bool;

    public function new(parent:UIElement, pos : Vector3, size : Vector3, ?text : String) {
        super(parent, pos,size);
        this.text = text==null?"Click me !":text;
        Dispatcher.get().mouseNotify(onMouseDown,onMouseUp,null,onMouseMoved,null);
        font = Loader.the.loadFont("Roboto", new FontStyle(false,false,false),18);
        onClick = function(){};
    }

    static public function create(parent:UIElement){
        return new Button(parent, new Vector3(0,0,0), new Vector3(0,0,0));
    }

    public function setOnClick(onclick : Void->Void) : Button {
        this.onClick = onclick;
        return this;
    }

    override public function setPosition(x : Float, y : Float, z : Float) : Button{
        super.setPosition(x,y,z);
        return this;
    }

    override public function setSize(w : Float, h : Float) : Button{
        super.setSize(w,h);
        return this;
    }

    public function setText(text : String) : Button {
        this.text = text;
        return this;
    }

    @:allow(engine.input.Dispatcher)
    public function onMouseMoved(x : Int, y : Int):Void{
        hover = bounds.contains(new Vector3(x,y,0));
    }


    @:allow(engine.input.Dispatcher)
    private function onMouseDown(button : Int, x : Int, y : Int){
        if(bounds.contains(new Vector3(x,y,0)))
            active = true;
    }

    @:allow(engine.input.Dispatcher)
    private function onMouseUp(button : Int, x : Int, y : Int){
        active = false;
        if(bounds.contains(new Vector3(x,y,0))){
            onClick();
        }
    }

    override public function update(){
        bounds.update(realPosition,size);
    }
    override public function render(g:Graphics){
        super.render(g);
        g.set_font(font);
        g.set_color(active?Color.Red:hover?Color.Blue:Color.Green);
        g.fillRect(realPosition.x,realPosition.y,size.x,size.y);
        g.set_color(Color.Black);

        var textW = font.stringWidth(text);
        var tX = bounds.getCenter().x - textW/2;
        var tY = bounds.getCenter().y -font.getHeight()/2;
        g.drawString(text,tX,tY);
    }
}
