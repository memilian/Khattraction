package gravity;

import kha.graphics4.VertexStructure;
import kha.graphics4.VertexStructure;
import kha.graphics4.VertexData;
import kha.graphics4.Usage;
import kha.graphics4.Program;
import kha.graphics4.VertexBuffer;
import kha.graphics4.IndexBuffer;
import kha.graphics4.VertexShader;
import kha.graphics4.FragmentShader;
import kha.Loader;
import kha.LoadingScreen;
import gravity.input.Dispatcher;
import kha.math.Random;
import kha.math.Vector3;
import gravity.entities.BulletLauncher;
import kha.Scaler;
import kha.Color;
import kha.Framebuffer;
import kha.Configuration;
import kha.Image;
import kha.Game;

class GravityGame extends Game {
	public static var instance : GravityGame;
	var backBuffer : Image;
	var test : TestEnt;
	var bulletLauncher : BulletLauncher;

	public var vShader : VertexShader;
	public var fShader : FragmentShader;
	public var program : Program;
	var vertices : VertexBuffer;
	var indices : IndexBuffer;

	public function new() {
		super("Empty", false);
		instance = this;
		Random.init(Math.floor(Date.now().getTime()));
		test = new TestEnt();
		bulletLauncher = new BulletLauncher(new Vector3(200,200,0), new Vector3(50,20,0));

	}

	override public function init(): Void {
		backBuffer = Image.createRenderTarget(width, height);
		vShader = new VertexShader(Loader.the.getShader("shader.vert"));
		fShader = new FragmentShader(Loader.the.getShader("shader.frag"));
		var structure = new VertexStructure();
		structure.add("pos", VertexData.Float3);
		program = new Program();
		program.setVertexShader(GravityGame.instance.vShader);
		program.setFragmentShader(GravityGame.instance.fShader);
		program.link(structure);
		vertices = new VertexBuffer(3, structure, Usage.StaticUsage);
		var v = vertices.lock();
		v[0] = -1; v[1] = -1; v[2] = 0.5;
		v[3] = 1; v[4] = -1; v[5] = 0.5;
		v[6] = -1; v[7] = 1; v[8] = 0.5;
		vertices.unlock();
		indices = new IndexBuffer(3, Usage.StaticUsage);
		var i = indices.lock();
		i[0] = 0; i[1] = 1; i[2] = 2;
		indices.unlock();
		//Configuration.setScreen(new LoadingScreen(), loadDone);
		loadDone();
	}

	public function loadDone(){
		Configuration.setScreen(this);
	}

	override public function update() : Void {
		Dispatcher.get().update();
		bulletLauncher.update();
	}


	override public function render(frame : Framebuffer) : Void {

		var g = backBuffer.g2;

		g.begin();
		g.clear(Color.fromBytes(48,48,48,255));
		bulletLauncher.render(g);
		g.end();
		trace(width+"  "+height);
		startRender(frame);
		Scaler.scale(backBuffer, frame, kha.Sys.screenRotation);
		endRender(frame);


		/*var g = frame.g4;
		bulletLauncher.render4(g);
		g.begin();
		g.setProgram(program);
		g.setVertexBuffer(vertices);
		g.setIndexBuffer(indices);
		g.drawIndexedVertices();
		g.end();*/
	}
}
