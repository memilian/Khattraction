package khattraction.ui;
import engine.input.Dispatcher;
import engine.ui.Label;
import khattraction.level.LevelManager;
import khattraction.entities.Wall;
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

    var wallWidth : Int = 20;
    var wallHeight : Int = 20;

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

        var nextLvlBtn = Button.create(this).setPosition(gameWidth-160,10,0).setSize(80,20).setText("Next level");
        nextLvlBtn.onClick = function(mouseDown:Bool){
            if(!mouseDown)
                return;
            LevelManager.loadNext();
        };
        children.push(nextLvlBtn);

        var restartLvlBtn = Button.create(this).setPosition(gameWidth-160,40,0).setSize(80,20).setText("Restart level");
        restartLvlBtn.onClick = function(mouseDown:Bool){
            if(!mouseDown)
                return;
            LevelManager.reload();
        };
        children.push(restartLvlBtn);

        ammoCounter = Label.create(this).setPosition(10,0,0).setText("ammo : "+LevelManager.currentLevel.ammo);
        children.push(ammoCounter);


        //TODO:EDIT_MODE_ONLY
#if EDITOR_MODE
        var wallBtn = Button.create(this).setPosition(700,20,0).setSize(100,50).setText("Wall");
        wallBtn.onClick = function(mouseDown:Bool){
            if(!mouseDown)
                return;
            var wa : Wall = new Wall(new Vector3(wallBtn.realPosition.x,wallBtn.realPosition.y,0), new Vector3(20,20,0));
            wa.selected = true;
            WorldManager.the.spawnEntity(wa);
        };
        children.push(wallBtn);

        var exportLvl = Button.create(this).setPosition(900,20,0).setSize(100,50).setText("Export Level");
        exportLvl.onClick = function(mouseDown:Bool){
            if(mouseDown)
                return;
            LevelManager.exportLevel();
        };
        children.push(exportLvl);
        #end
    }

    var ammoCounter : Label;

    public function updateAmmo(ammo : Int){
        ammoCounter.setText("ammo : "+ammo);
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
