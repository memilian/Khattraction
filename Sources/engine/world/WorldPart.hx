package engine.world;
import kha.graphics2.Graphics;
import khattraction.entities.Entity;
import engine.utils.Pair;
import engine.physic.AABB;

class WorldPart {
    @:isVar public var bounds(default, null) : AABB;
    @:isVar public var coords(default, null) : Pair;
    var entities : Array<Entity>;
    var entitiesOverlapping : Array<Entity>;
    var entitiesToAdd : Array<Entity>;
    var entitiesToRemove : Array<Entity>;

    public function new(aabb : AABB, coords : Pair) {
        bounds = aabb;
        this.coords = coords;

        entities = new Array<Entity>();
        entitiesToAdd = new Array<Entity>();
        entitiesToRemove = new Array<Entity>();
        entitiesOverlapping = new Array<Entity>();
    }

    public function addEntityLater(ent:Entity):Void {
        entitiesToAdd.push(ent);
    }

    public function addEntity(ent:Entity):Void {
        entities.push(ent);
        entities.sort(sortByZindex);
    }

    public function removeEntity(ent : Entity){
        entities.remove(ent);
    }

    public function getEntities():Array<Entity> {
        return entities;
    }

    private function sortByZindex(ent:Entity, other : Entity) : Int{
        return ent.zindex>other.zindex ? 1 : ent.zindex == other.zindex ? 0 : -1;
    }

    public function update(){
        while(entitiesToRemove.length >0){
            entities.remove(entitiesToRemove.pop());
        }
        while(entitiesToAdd.length >0)
            addEntity(entitiesToAdd.pop());

        for(ent in entities){
            ent.update();
            if(!bounds.contains(AABB.AabbFromEntity(ent).getCenter())){

                entitiesToRemove.push(ent);
                if(!WorldManager.the.placeLater(ent))
                    entitiesToRemove.push(ent);
            }
        }
    }

    public function render(g:Graphics){
        for(ent in entities)
            ent.render(g);
    }

    public function addOverlappingEntity(ent : Entity){
        entitiesOverlapping.push(ent);
    }

    public function removeOverlappingEntity(ent : Entity){
        entitiesOverlapping.remove(ent);
    }

    public function getEntitiesOfType(fake : Entity) : Array<Entity>{
        var res = new Array<Entity>();
        for(ent in entities){
            if(Type.getClass(ent) == Type.getClass(fake)){
                res.push(ent);
            }
        }

        for(ent in entitiesOverlapping){
            if(Type.getClass(ent) == Type.getClass(fake)){
                res.push(ent);
            }
        }

        return res;
    }
}
