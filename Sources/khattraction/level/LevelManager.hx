package khattraction.level;

import khattraction.ui.IGMenu;
import khattraction.level.LevelJson.WallJson;
import khattraction.level.LevelJson.AttractorJson;
import kha.math.Vector3;
import motion.Actuate;
import khattraction.entities.Target;
import khattraction.entities.GravitationalObject;
import khattraction.entities.Wall;
import khattraction.entities.BulletLauncher;
import haxe.Json;
import engine.world.WorldManager;
import kha.Loader;

class LevelManager {
    public static var currentLevel : LevelJson;
    static var currentLevelNumber : Int;
    static var levelCount = 0;

    static public function loadLevel(nb : Int){
        currentLevelNumber = nb;
        WorldManager.the.clearAll();
        var lvlData = Loader.the.getBlob("level"+nb).toString();
        currentLevel = Json.parse(lvlData);
        var bulletLauncher = new BulletLauncher(parseJsonVector(currentLevel.launcherPos));
        WorldManager.the.spawnEntity(bulletLauncher);

        var target = new Target(parseJsonVector(currentLevel.targetPos));
        WorldManager.the.spawnEntity(target);

        for(walljs in currentLevel.walls){
            var wall = new Wall(parseJsonVector(walljs.position),parseJsonVector(walljs.size));
            WorldManager.the.spawnEntity(wall);
        }

        for(attr in currentLevel.attractors){
            var attra = new GravitationalObject(parseJsonVector(attr.position),false, attr.forceStrength, attr.forceRadius);
            attra.locked = true;
            WorldManager.the.spawnEntity(attra);
        }
        for(ent in WorldManager.the.getEntities()){
            ent.fadeIn();
        }
    }
    static public function reload():Void {
        for(ent in WorldManager.the.getEntities()){
            ent.fadeOut();
        }

        Actuate.timer(0.6).onComplete( function(){
            loadLevel(currentLevelNumber);
            KhattractionGame.instance.menu.updateAmmo(currentLevel.ammo);
        });
    }
    static public function loadNext():Void {
        for(ent in WorldManager.the.getEntities()){
            ent.fadeOut();
        }

        Actuate.timer(0.6).onComplete( function(){
            if(currentLevelNumber +1 <= levelCount)
                loadLevel(currentLevelNumber+1);
            else
                loadLevel(1);
            KhattractionGame.instance.menu.updateAmmo(currentLevel.ammo);
        });
    }

    static public function getLevelCount():Int {
        if(levelCount == 0){
            var lvlData = Loader.the.getBlob("levels").toString();
            var tmp = Json.parse(lvlData);
            levelCount = tmp.levelCount;
        }
        return levelCount;
    }

    static public function decreaseAmmo(){
        KhattractionGame.instance.menu.updateAmmo(--currentLevel.ammo);
    }

    static inline function parseJsonVector(o){
        return new Vector3(o.x,o.y,o.z);
    }

    //TODO:EDIT_MODE_ONLY
    #if EDITOR_MODE
    static inline function getJsonVector(v : Vector3){
        return {x:v.x,y:v.y,z:v.z};
    }
    static public function exportLevel():Void {

        var launcher = WorldManager.the.getEntitiesOfType(BulletLauncher)[0];
        var target = WorldManager.the.getEntitiesOfType(Target)[0];
        var walls = WorldManager.the.getEntitiesOfType(Wall);
        var attrs = WorldManager.the.getEntitiesOfType(GravitationalObject);

        var wallsJson : Array<WallJson>= new Array<WallJson>();
        var attrsJson : Array<AttractorJson>= new Array<AttractorJson>();

        for(wall in walls){
            wallsJson.push({
            position:getJsonVector(wall.position),
            size:getJsonVector(wall.size)
            });
        }
        for(attr in attrs){
            var at : GravitationalObject = cast(attr, GravitationalObject);
            attrsJson.push({
            forceStrength: Math.round(at.forceStrength),
            forceRadius: Math.round(at.forceRadius),
            position:getJsonVector(at.position)
            });
        }
        var level : LevelJson = {
            ammo:100,
            launcherPos:getJsonVector(launcher.position),
            targetPos:getJsonVector(target.position),
            walls:wallsJson,
            attractors:attrsJson
        };
        trace(Json.stringify(level));
    }
    #end
}
