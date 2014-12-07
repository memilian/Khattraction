package engine.ui;
import kha.Color;
import engine.ui.UIElement;
import engine.physic.AABB;
import kha.graphics2.Graphics;
import kha.math.Vector3;

class UIElement {

    @:isVar public var position(default,default) : Vector3;
    public var realPosition(get,never) : Vector3;
    @:isVar public var size(default,default) : Vector3;
    @:isVar public var bounds(default,default) : AABB;
    @:isVar public var parent(default,null) : UIElement;
    @:isVar public var bgColor(default,null) : Color;

    public function new(parent : UIElement, pos : Vector3, size : Vector3) {
        this.parent = parent;
        this.position = pos;
        this.size = size;
        this.bgColor = Color.White;
        bounds = new AABB(realPosition,size);
    }

    public function update(){
    }

    public function render(g:Graphics){
        g.set_color(bgColor);
    }

    public function setPosition(x : Float, y : Float, z : Float) : UIElement{
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        return this;
    }

    public function setSize(w : Float, h : Float) : UIElement{
        this.size.x = w;
        this.size.y = h;
        return this;
    }

    public function get_realPosition() : Vector3{
        if(parent == null)
            return position;
        return parent.get_realPosition().add(position);
    }

}
