package khattraction.level;


typedef LevelJson = {
    var ammo : Int;
    var launcherPos : Vector3Json;
    var targetPos : Vector3Json;
    var walls : Array<WallJson>;
    var attractors : Array<AttractorJson>;
}

typedef WallJson = {
    var position : Vector3Json;
    var size : Vector3Json;
}

typedef AttractorJson = {
    var forceStrength : Int;
    var forceRadius : Int;
    var position : Vector3Json;
}

typedef Vector3Json = {
    var x : Float;
    var y : Float;
    var z : Float;
}
