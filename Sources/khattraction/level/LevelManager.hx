package khattraction.level;

import khattraction.entities.Target;
import khattraction.entities.GravitationalObject;
import khattraction.entities.Wall;
import khattraction.entities.BulletLauncher;
import haxe.Json;
import engine.world.WorldManager;
import kha.Loader;

class LevelManager {
    static var currentLevel : LevelJson;
    static var levelCount = 0;

    static public function loadLevel(nb : Int){
        WorldManager.the.clearAll();
        var lvlData = Loader.the.getBlob("level"+nb).toString();
        currentLevel = Json.parse(lvlData);
        var bulletLauncher = new BulletLauncher(currentLevel.launcherPos);
        WorldManager.the.spawnEntity(bulletLauncher);

        var target = new Target(currentLevel.targetPos);
        WorldManager.the.spawnEntity(target);

        for(walljs in currentLevel.walls){
            var wall = new Wall(walljs.position,walljs.size);
            WorldManager.the.spawnEntity(wall);
        }

        for(attr in currentLevel.attractors){
            var attra = new GravitationalObject(attr.position,false, attr.forceStrength, attr.forceRadius);
            WorldManager.the.spawnEntity(attra);
        }
    }

    static public function loadNext():Void {
    }

    static public function getLevelCount():Int {
        if(levelCount == 0){
            var lvlData = Loader.the.getBlob("levels").toString();
            var tmp = Json.parse(lvlData);
            levelCount = tmp.levelCount;
        }
        return levelCount;
    }

}
