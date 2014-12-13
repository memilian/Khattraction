package engine.utils;
import engine.physic.AABB;
import kha.graphics2.Graphics;
import engine.world.WorldManager;
class Debug {
    static public function drawEntitiesBounds(g : Graphics){
        for(ent in WorldManager.the.getEntities()){
            var aabb : AABB = AABB.AabbFromEntity(ent);
            g.drawRect(aabb.position.x, aabb.position.y, aabb.size.x, aabb.size.y);
        }
    }
}
