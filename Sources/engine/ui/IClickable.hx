package engine.ui;

import engine.input.Dispatcher;
interface IClickable {

    @:isVar var onClick(default,default) : Void->Void;
    @:isVar var active(default,default) : Bool;

    @:allow(engine.input.Dispatcher)
    private function onMouseDown(button : Int, x : Int, y : Int) : Void;

    @:allow(engine.input.Dispatcher)
    private function onMouseUp(button : Int, x : Int, y : Int) : Void ;
}
