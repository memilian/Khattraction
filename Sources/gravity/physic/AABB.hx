package gravity.physic;

import kha.math.Vector3;

typedef BoundedEntity = {
    var position:Vector3;
    var size:Vector3;
}

class AABB {
    public static function getCenter(entity : BoundedEntity):Vector3 {

        return new Vector3((entity.position.x+entity.size.x)/2,
                            (entity.position.y+entity.size.y)/2,
                            (entity.position.z+entity.size.z)/2
                    );
    }

    public static function collide(entity1:BoundedEntity, entity2:BoundedEntity):Bool {
        return !(entity1.position.x >= entity2.position.x+entity2.size.x ||
                entity1.position.x+entity1.size.x <= entity2.size.x ||
                entity1.position.y >= entity2.position.y+entity2.size.y ||
                entity1.position.y+entity1.size.y <= entity2.size.y ||
                entity1.position.z >= entity2.position.z+entity2.size.z ||
                entity1.position.z+entity1.size.z <= entity2.size.z
        );
    }

    public static function contains(entity1:BoundedEntity, point:Vector3):Bool {
        return !(entity1.position.x >= point.x ||
                entity1.position.x+entity1.size.x <= point.x ||
                entity1.position.y >= point.y ||
                entity1.position.y+entity1.size.y <= point.y ||
                entity1.position.z >= point.z||
                entity1.position.z+entity1.size.z <= point.z
        );
    }
}
