package gravity;

import kha.graphics2.GraphicsExtension;
import kha.Color;
import kha.math.Vector2;
import kha.graphics2.Graphics;

using kha.graphics2.GraphicsExtension;

class TestEnt {

	private var position : Vector2;

	public function new() {
		position = new Vector2(50,50);
	}


	public function update() : Void {

	}

	public function render(g:Graphics):Void {
		g.color = Color.Cyan;
		g.fillCircle(position.x,position.y, 50,90);
	}
}
