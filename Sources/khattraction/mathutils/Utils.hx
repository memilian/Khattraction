package khattraction.mathutils;

import kha.math.Vector3;

class Utils {

    public static function toDegree(angle:Float):Float {
        return 180*angle/3.14159;
    }

    public static function toRadian(angle:Float):Float {
        return 3.14159*angle/180;
    }

    public static function distance( v : Vector3, v2 : Vector3){
        var vec = v.sub(v2);

        return Math.sqrt(vec.x*vec.x+vec.y*vec.y+vec.z*vec.z);
    }

    public static function distanceSq( v : Vector3, v2 : Vector3){
        var vec = v.sub(v2);

        return (vec.x*vec.x+vec.y*vec.y+vec.z*vec.z);
    }


}
