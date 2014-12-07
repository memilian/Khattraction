package khattraction.level;

import kha.math.Vector3;

typedef LevelJson = {
    var level : Int;
    var launcherPos : Vector3;
    var targetPos : Vector3;
    var walls : Array<WallJson>;
    var attractors : Array<AttractorJson>;
}

typedef WallJson = {
    var position : Vector3;
    var size : Vector3;
}

typedef AttractorJson = {
    var forceStrength : Int;
    var forceRadius : Int;
    var position : Vector3;
}
