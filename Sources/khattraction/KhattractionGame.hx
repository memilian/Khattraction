package khattraction;

import kha.graphics4.BlendingOperation;
import engine.utils.Debug;
import khattraction.level.LevelManager;
import khattraction.ui.IGMenu;
import haxe.Timer;
import engine.world.WorldManager;
import engine.physic.AABB;
import kha.Loader;
import kha.LoadingScreen;
import engine.input.Dispatcher;
import kha.math.Random;
import kha.math.Vector3;
import kha.Scaler;
import kha.Color;
import kha.Framebuffer;
import kha.Configuration;
import kha.Image;
import kha.Game;

class KhattractionGame extends Game {

	public static var instance : KhattractionGame;
	var backBuffer : Image;
	var lastUpdate : Float = 0;
	var lastRender : Float = 0;
	var inidone = false;

	public static var gameBounds : AABB;
	@:isVar public var menu(default,default) : IGMenu;

	public function new() {
		super("Khattraction", false);
		instance = this;
		Random.init(17);
	}

	override public function init(): Void {
		Configuration.setScreen(new LoadingScreen());
		Random.init(Math.floor(Date.now().getTime()));
		WorldManager.createInstance(6,3,200,190);
		Loader.the.loadRoom("main", loadDone);
		backBuffer = Image.createRenderTarget(width, height);
	}

	public function loadDone(){
		Configuration.setScreen(this);
		gameBounds = new AABB(new Vector3(0,0,0),new Vector3(width,height,0));
		//initLevel();
		LevelManager.getLevelCount();
		LevelManager.loadLevel(1);
		menu = new IGMenu();

		inidone = true;
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
		g.setBlendingMode(BlendingOperation.SourceAlpha, BlendingOperation.BlendOne);
		g.set_opacity(1);
		g.begin();
		g.clear(Color.fromBytes(48,48,48,255));
		WorldManager.the.render(g);

		#if DEBUG
		Debug.drawEntitiesBounds(g);
		#end
//	g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.InverseDestinationAlpha);
	//	g.setBlendingMode(BlendingOperation.BlendOne, BlendingOperation.BlendOne);
	//	g.setBlendingMode(BlendingOperation.SourceAlpha, BlendingOperation.InverseSourceAlpha);
	//	g.setBlendingMode(BlendingOperation.DestinationAlpha, BlendingOperation.BlendZero);



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
