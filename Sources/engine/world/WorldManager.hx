package engine.world;

import khattraction.entities.MovingEntity;
import kha.graphics2.Graphics;
import kha.math.Vector3;
import khattraction.entities.Entity;
import engine.utils.Pair;
import engine.physic.AABB;

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
        if(part != null){
            part.removeEntity(ent);
            var overlapParts = getPartsInAabb(AABB.AabbFromEntity(ent));
            for(p in overlapParts){
                if(p != part)
                    p.removeOverlappingEntity(ent);
            }
        }
    }

    public function spawnEntity(ent : Entity){
        var part : WorldPart= getPartForEntity(ent);
        if(part != null){
            part.addEntity(ent);

            var overlapParts = getPartsInAabb(AABB.AabbFromEntity(ent));
            for(p in overlapParts){
                if(p != part)
                    p.addOverlappingEntity(ent);
            }
        }
    }

    public function getPartsInAabb(aabb : AABB) : Array<WorldPart>{
        var res = new Array<WorldPart>();
        var it = worldParts.keys();
        while(it.hasNext()){
            var part : WorldPart = worldParts.get(it.next());
            if(part.bounds.collide(aabb))
                res.push(part);
        }
        return res;
    }

    public function getCoordFromPos(pos : Vector3){
        var coordX = Math.round(pos.x/partWidth);
        var coordY = Math.round(pos.y/partHeight);
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
        var ents = new Array<Entity>();
        while(it.hasNext()){
            ents = ents.concat(worldParts.get(it.next()).getEntities());
        }
        ents.sort(sortByZindex);
        for(i in 0...ents.length)
            ents[i].render(g);
    }

    private function sortByZindex(ent:Entity, other : Entity) : Int{
        return ent.zindex>other.zindex ? 1 : ent.zindex == other.zindex ? 0 : -1;
    }


    public function getPartForEntity(ent : Entity){
        var coord = getCoordFromPos(ent.position);
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

    public function getEntitiesInAabb(aabb, type : Class<Entity>){
        var it = worldParts.keys();
        var res = new Array();
        while(it.hasNext()){
            var part : WorldPart = worldParts.get(it.next());
            if(!part.bounds.collide(aabb))
                continue;
            var arr = part.getEntitiesOfType(Type.createInstance(type, new Array()));
            res = res.concat(arr);
        }
        return res;
    }

    public function clearAll(){
        var it = worldParts.keys();
        while(it.hasNext()){
            var part : WorldPart = worldParts.get(it.next());
            part.clearAll();
        }
    }


}
