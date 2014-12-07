package engine.ui;
import kha.Loader;
import kha.FontStyle;
import kha.math.Vector3;
import kha.Color;
import kha.graphics2.Graphics;
import kha.Font;
class Label extends UIElement implements IDisplayText {

    @:isVar public var font(default, null):Font;
    @:isVar public var text(default, default):String;

    public function new(parent : UIElement, position : Vector3, text : String) {
        this.text = text;
        font = Loader.the.loadFont("Roboto", new FontStyle(false,false,false),18);
        super(parent, position, new Vector3(font.stringWidth(text), font.getHeight(),0));
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
