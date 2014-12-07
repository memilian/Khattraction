package engine.ui;
interface IPlaceable {
    var dragging : Bool;
    public function onMouseDragged( button : Int, dx : Int, dy : Int):Void;
}
