package engine.input;

import kha.Button;
import kha.input.Mouse;
import kha.Key;
import kha.input.Keyboard;


class Dispatcher {

    public static var BUTTON_RIGHT(default, never) = 1;
    public static var BUTTON_LEFT(default, never) = 0;
    private var prevMouseX = 0;
    private var prevMouseY = 0;
    private var keyboard : Keyboard;
    private var mouse : Mouse;
    private var keyStates : Map<Key,Bool>;
    private var keyCharStates : Map<String,Bool>;
    private static var instance: Dispatcher;
    private var downListeners: Array<Key->String->Void>;
    private var upListeners: Array<Key->String->Void>;
    private var pressListeners: Array<Key->String->Void>;

    private var mouseDownListeners: Array<Int->Int->Int->Void>;
    private var mouseUpListeners: Array<Int->Int->Int->Void>;
    private var mouseMoveListeners: Array<Int->Int->Void>;
    private var mouseDragListeners: Array<Int->Int->Int->Void>;
    private var mouseWheelListeners: Array<Int->Void>;

    private var buttonLeftState = false;
    private var buttonRightState = false;

    private function new() {
        this.keyboard = Keyboard.get(0);
        this.mouse = Mouse.get(0);
        keyboard.notify(onKeyDown,onKeyUp);
        pressListeners = new Array<Key->String->Void>();
        downListeners = new Array<Key->String->Void>();
        upListeners = new Array<Key->String->Void>();
        keyStates = new Map<Key,Bool>();
        keyCharStates = new Map<String,Bool>();

        mouse.notify(onMouseDown,onMouseUp,onMouseMove,onMouseWheel);
        mouseDownListeners = new Array<Int->Int->Int->Void>();
        mouseUpListeners = new  Array<Int->Int->Int->Void>();
        mouseDragListeners = new Array<Int->Int->Int->Void>();
        mouseMoveListeners = new Array<Int->Int->Void>();
        mouseWheelListeners = new Array<Int->Void>();
    }

    public function update(){
        for(key in keyStates.keys()){
            if(keyStates.get(key))
                onKeyPress(key,Type.enumConstructor(key));
        }
        for(char in keyCharStates.keys()){
            if(keyCharStates.get(char))
                onKeyPress(Key.CHAR,char);
        }
    }

    public function mouseNotify(downListener: Int->Int->Int->Void, upListener: Int->Int->Int->Void,
                                dragListener: Int->Int->Int->Void, moveListener: Int->Int->Void, wheelListener: Int->Void): Void {
        if (downListener != null) mouseDownListeners.push(downListener);
        if (upListener != null) mouseUpListeners.push(upListener);
        if(dragListener != null) mouseDragListeners.push(dragListener);
        if(moveListener != null) mouseMoveListeners.push(moveListener);
        if(wheelListener != null) mouseWheelListeners.push(wheelListener);
    }
    public function notify(downListener: Key->String->Void, upListener: Key->String->Void, ?pressListener: Key->String->Void): Void {
        if (downListener != null) downListeners.push(downListener);
        if (upListener != null) upListeners.push(upListener);
        if(pressListener != null) pressListeners.push(pressListener);
    }

    public function remove(downListener: Key->String->Void, upListener: Key->String->Void, ?pressListener: Key->String->Void): Void {
        if (downListener != null) downListeners.remove(downListener);
        if (upListener != null) upListeners.remove(upListener);
        if(pressListener != null) pressListeners.remove(pressListener);
    }

    private function onKeyPress(key : Key, char : String){
        for (listener in pressListeners) {
            listener(key, char);
        }
    }

    @:allow(kha.input.Keyboard)
    private function onKeyDown(key : Key, char : String){
        for (listener in downListeners) {
            listener(key, char);
        }
        switch(key){
            case Key.CHAR:
                keyCharStates.set(char,true);
            default:
                keyStates.set(key,true);
        }
    }

    @:allow(kha.input.Keyboard)
    private function onKeyUp(key : Key, char : String){
        for (listener in upListeners) {
            listener(key, char);
        }
        switch(key){
            case Key.CHAR:
                keyCharStates.set(char,false);
            default:
                keyStates.set(key,false);
        }
    }

    @:allow(kha.input.Mouse)
    private function onMouseUp(button:Int, x:Int, y:Int):Void {
        for(listener in mouseUpListeners)
            listener(button,x,y);
        if(button == BUTTON_RIGHT)
            buttonRightState = false;
        else
            buttonLeftState = false;
    }

    @:allow(kha.input.Mouse)
    private function onMouseDown(button:Int, x:Int, y:Int):Void {
        for(listener in mouseDownListeners)
            listener(button,x,y);
        if(button == BUTTON_RIGHT)
            buttonRightState = true;
        else
            buttonLeftState = true;
    }

    @:allow(kha.input.Mouse)
    private function onMouseMove(x:Int, y:Int):Void {
        for(listener in mouseMoveListeners)
            listener(x,y);
        if(buttonLeftState)
            for(listener in mouseDragListeners)
                listener(BUTTON_LEFT,x-prevMouseX,y-prevMouseY);
        if(buttonRightState)
            for(listener in mouseDragListeners)
                listener(BUTTON_RIGHT,x-prevMouseX,y-prevMouseY);
        prevMouseX = x;
        prevMouseY = y;
    }

    @:allow(kha.input.Mouse)
    private function onMouseWheel(dw:Int):Void {
        for(listener in mouseWheelListeners)
            listener(dw);
    }

    public static function get() : Dispatcher{
        if(instance == null)
            instance = new Dispatcher();
        return instance;
    }
}
