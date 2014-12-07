package engine.world;
import khattraction.entities.Bullet;
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
    }

    public function removeEntity(ent : Entity){
        entities.remove(ent);
    }

    public function getEntities():Array<Entity> {
        return entities;
    }



    public function update(){
        while(entitiesToRemove.length >0){
            entities.remove(entitiesToRemove.pop());
        }
        while(entitiesToAdd.length >0)
            addEntity(entitiesToAdd.pop());

        for(ent in entities){
            ent.update();
            if(Type.getClass(ent) == Bullet && cast(ent,Bullet).shouldBeDead){
                entities.remove(ent);
            }

            if(!bounds.contains(ent.position)){
                entitiesToRemove.push(ent);
                if(!WorldManager.the.placeLater(ent))
                    entitiesToRemove.push(ent);
            }
        }
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

    public function clearAll(){
        entities = new Array<Entity>();
        entitiesToAdd = new Array<Entity>();
        entitiesToRemove = new Array<Entity>();
        entitiesOverlapping = new Array<Entity>();
    }

}
