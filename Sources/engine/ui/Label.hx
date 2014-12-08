package engine.ui;
import kha.math.Vector2;
import kha.math.Vector4;
import kha.Loader;
import kha.FontStyle;
import kha.math.Vector3;
import kha.Color;
import kha.graphics2.Graphics;
import kha.Font;
class Label extends UIElement implements IDisplayText {

    @:isVar public var font(default, default):Font;
    @:isVar public var text(default, default):String;
    @:isVar public var padding(default, default):Vector2;

    public function new(parent : UIElement, position : Vector3, text : String) {
        this.text = text;
        padding = new Vector2(5,2);
        font = Loader.the.loadFont("Roboto", new FontStyle(false,false,false),18);
        super(parent, position, new Vector3(font.stringWidth(text), font.getHeight(),0));
    }

    function updateSize(){
        size.x = font.stringWidth(text)+padding.x;
        size.y = font.getHeight()+padding.y;
    }
    static public function create(parent:UIElement) : Label{
        return new Label(parent, new Vector3(0,0,0),"");
    }


    public function setText(txt : String) : Label{
        this.text = txt;
        updateSize();
        return this;
    }

    override public function setPosition(x : Float, y : Float, z : Float) : Label{
        super.setPosition(x,y,z);
        return this;
    }

    override public function setSize(w : Float, h : Float) : Label{
        super.setSize(w,h);
        return this;
    }

    override public function update(){
        bounds.update(realPosition,size);
    }
    override public function render(g:Graphics){
        super.render(g);
        g.set_font(font);
        g.set_color(Color.Cyan);
        g.fillRect(realPosition.x,realPosition.y,size.x,size.y);
        g.set_color(Color.Black);

        var textW = font.stringWidth(text);
        var tX = bounds.getCenter().x - textW/2;
        var tY = bounds.getCenter().y -font.getHeight()/2;
        g.drawString(text,tX,tY);
    }

}
