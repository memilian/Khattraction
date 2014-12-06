package khattraction.mathutils;

class Angles {

    public static function toDegree(angle:Float):Float {
        return 180*angle/3.14159;
    }

    public static function toRadian(angle:Float):Float {
        return 3.14159*angle/180;
    }
}
