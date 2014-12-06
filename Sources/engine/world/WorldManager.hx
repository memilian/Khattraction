package engine.world;

import kha.graphics2.Graphics;
import kha.math.Vector3;
import khattraction.entities.Entity;
import engine.utils.Pair;
import khattraction.physic.AABB;

class WorldManager {
    public static var the : WorldManager;

    var worldParts : Map<Pair, WorldPart>;
    var partWidth : Int;
    var partHeight : Int;

    private function new(partCountX : Int, partCountY : Int, partWidth : Int, partHeight : Int) {
        the = this;
        this.partHeight = partHeight;
        this.partWidth = partWidth;

        worldParts = new Map<Pair,WorldPart>();

        var partSize = new Vector3(partWidth,partHeight,0);
        for(x in 0...partCountX){
            for(y in 0...partCountY){
                var coords = new Pair(x,y);
                var bounds = new AABB(new Vector3(x*partWidth,y*partHeight,0), partSize);
                worldParts.set(coords,new WorldPart(bounds,coords));
            }
        }
    }

    public function getEntities(){
        var ents = new Array<Entity>();
        var it = worldParts.keys();
        while(it.hasNext()){
            var part : WorldPart = worldParts.get(it.next());
            ents = ents.concat(part.getEntities());
        }

        return ents;
    }

    public function removeEntity(ent : Entity){
        var part : WorldPart= getPartForEntity(ent);
        if(part != null)
            part.removeEntity(ent);
    }

    public function spawnEntity(ent : Entity){
        var part : WorldPart= getPartForEntity(ent);
        if(part != null)
            part.addEntity(ent);
    }

    public function getCoordFromPos(pos : Vector3){
        var coordX = Math.floor(pos.x/partWidth);
        var coordY = Math.floor(pos.y/partHeight);
        return new Pair(coordX,coordY);
    }

    public static function createInstance(partCountX : Int, partCountY : Int, partWidth : Int, partHeight : Int):Void {
        if(the == null)
            the = new WorldManager(partCountX, partCountY, partWidth, partHeight);
    }

    public function update(){
        var it = worldParts.keys();
        while(it.hasNext()){
            worldParts.get(it.next()).update();
        }
    }

    public function render(g : Graphics){
        var it = worldParts.keys();
        while(it.hasNext()){
            worldParts.get(it.next()).render(g);
        }
    }

    public function getPartForEntity(ent : Entity){
        var coord = getCoordFromPos(AABB.AabbFromEntity(ent).getCenter());
        if(!worldParts.exists(coord))
            return null;
        var part : WorldPart= worldParts.get(coord);
        return part;
    }

    public function placeLater(ent : Entity){
        var part : WorldPart=getPartForEntity(ent);
        if(part != null){
            part.addEntityLater(ent);
            return true;
        }else
            return false;
    }

}
