package khattraction.ui;
import engine.ui.Button;
import motion.easing.Linear;
import motion.easing.Linear;
import kha.graphics2.Graphics;
import motion.Actuate;
import khattraction.KhattractionGame;
import kha.math.Vector3;
import engine.ui.Menu;

class IGMenu extends Menu{
    var gameWidth : Int;
    var gameHeight : Int;

    public function new() {
        gameHeight = KhattractionGame.instance.height;
        gameWidth = KhattractionGame.instance.width;
        super(new Vector3(0,gameHeight-100,0), new Vector3(gameWidth,100,0));
        var helpBtn = Button.create(this).setPosition(gameWidth-60,10,0).setSize(50,20).setText("Help ?");
        children.push(helpBtn);
    }

    override public function update(){
        super.update();
    }

    override public function render(g :Graphics){
        super.render(g);
    }

    override public function onMouseMoved(x:Int, y:Int):Void {
        hover = bounds.contains(new Vector3(x,y,0));
        Actuate.tween(position,0.5,{y: hover?KhattractionGame.instance.height-100:KhattractionGame.instance.height-20}).ease(Linear.easeNone);
    }
}
