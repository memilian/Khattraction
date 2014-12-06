package khattraction.entities;
import kha.Color;
import kha.math.Vector3;
import kha.graphics2.Graphics;

class Wall extends Entity{

    public function new(position : Vector3, size : Vector3) {
        super(position, size);
        zindex = 10;
    }

    override public function update():Void {

    }

    override public function render(g:Graphics):Void {
        g.color(Color.fromBytes(48,48,150,1));
        g.fillRect(position.x, position.y, size.x, size.y);
    }
}
