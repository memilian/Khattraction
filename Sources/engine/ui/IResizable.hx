package engine.ui;

interface IResizable {
    var minSize : Float;
    var maxSize : Float;
    public function onMouseWheel(dw : Int):Void;
}
