package khattraction;

import kha.FontStyle;
import khattraction.ui.IGMenu;
import engine.ui.Menu;
import khattraction.entities.GravitationalObject;
import khattraction.entities.Wall;
import haxe.Timer;
import engine.world.WorldManager;
import engine.physic.AABB;
import kha.Loader;
import kha.LoadingScreen;
import engine.input.Dispatcher;
import kha.math.Random;
import kha.math.Vector3;
import khattraction.entities.BulletLauncher;
import kha.Scaler;
import kha.Color;
import kha.Framebuffer;
import kha.Configuration;
import kha.Image;
import kha.Game;

class KhattractionGame extends Game {

	public static var instance : KhattractionGame;
	var backBuffer : Image;
	var bulletLauncher : BulletLauncher;
	var lastUpdate : Float = 0;
	var lastRender : Float = 0;
	var inidone = false;
	public static var gameBounds : AABB;
	var menu : Menu;

	public function new() {
		super("Khattraction", false);
		instance = this;
	}

	override public function init(): Void {
		Configuration.setScreen(new LoadingScreen());
		Random.init(Math.floor(Date.now().getTime()));
		Loader.the.loadRoom("main", loadDone);
		backBuffer = Image.createRenderTarget(width, height);

		WorldManager.createInstance(6,3,200,190);

	}

	public function loadDone(){
		Configuration.setScreen(this);
		gameBounds = new AABB(new Vector3(0,0,0),new Vector3(width,height,0));
		inidone = true;
		initLevel();
		menu = new IGMenu();
	}

	public function initLevel():Void {
		bulletLauncher = new BulletLauncher(new Vector3(200,200,0), new Vector3(50,20,0));
		WorldManager.the.spawnEntity(bulletLauncher);
		var wall = new Wall(new Vector3(500,0,0), new Vector3(20,800,0));
		WorldManager.the.spawnEntity(wall);
		var attr = new GravitationalObject(new Vector3(500,200,0));
		WorldManager.the.spawnEntity(attr);
	}

	override public function update() : Void {
		if(!inidone)
			return;
		if(Timer.stamp()-lastUpdate<0.033)
			return;
		lastUpdate = Timer.stamp();

		menu.update();
		Dispatcher.get().update();
		WorldManager.the.update();
	}

	override public function render(frame : Framebuffer) : Void {
		if(!inidone)
			return;

		if(Timer.stamp()-lastRender<0.033){
			startRender(frame);
			Scaler.scale(backBuffer, frame, kha.Sys.screenRotation);
			endRender(frame);
			return;
		}

		lastRender = Timer.stamp();

		var g = backBuffer.g2;

		g.begin();
		g.clear(Color.fromBytes(48,48,48,255));
		WorldManager.the.render(g);

//	g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseDestinationAlpha);
	//	g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.BlendOne);
	//	g.setBlendingMode(BlendingOperation.SourceAlpha, BlendingOperation.InverseSourceAlpha);
	//	g.setBlendingMode(BlendingOperation.DestinationAlpha, BlendingOperation.BlendZero);

		for(ent in WorldManager.the.getEntities())
			ent.render(g);

		menu.render(g);
		g.end();




		startRender(frame);
		Scaler.scale(backBuffer, frame, kha.Sys.screenRotation);
		//frame.g2.drawScaledImage(finalBackBuffer,0,0,width,height);
		endRender(frame);
	}

	public function getHeight(){
		return height;
	}
}
