package khattraction.ui;
import engine.world.WorldManager;
import khattraction.entities.GravitationalObject;
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

        //create children elements
        var helpBtn = Button.create(this).setPosition(gameWidth-60,10,0).setSize(50,20).setText("Help ?");
        children.push(helpBtn);
        var attractorBtn = Button.create(this).setPosition(300,20,0).setSize(100,50).setText("Attractor");
        attractorBtn.onClick = function(mouseDown:Bool){
                if(!mouseDown)
                    return;
                var attr : GravitationalObject = new GravitationalObject(new Vector3(attractorBtn.realPosition.x,attractorBtn.realPosition.y,0));
                attr.selected = true;
                WorldManager.the.spawnEntity(attr);
            };
        children.push(attractorBtn);

        var repulsorBtn = Button.create(this).setPosition(500,20,0).setSize(100,50).setText("Repulsor");
        repulsorBtn.onClick = function(mouseDown:Bool){
            if(!mouseDown)
                return;
            var rep : GravitationalObject = new GravitationalObject(new Vector3(repulsorBtn.realPosition.x,repulsorBtn.realPosition.y,0), true);
            rep.selected = true;
            WorldManager.the.spawnEntity(rep);
        };
        children.push(repulsorBtn);


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
