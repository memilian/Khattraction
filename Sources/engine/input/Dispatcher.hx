package engine.input;

import kha.input.Mouse;
import kha.Key;
import kha.input.Keyboard;

class Dispatcher {

    private var keyboard : Keyboard;
    private var keyStates : Map<Key,Bool>;
    private var keyCharStates : Map<String,Bool>;
    private static var instance: Dispatcher;
    private var downListeners: Array<Key->String->Void>;
    private var upListeners: Array<Key->String->Void>;
    private var pressListeners: Array<Key->String->Void>;

    private function new() {
        this.keyboard = Keyboard.get(0);
        keyboard.notify(onKeyDown,onKeyUp);
        pressListeners = new Array<Key->String->Void>();
        downListeners = new Array<Key->String->Void>();
        upListeners = new Array<Key->String->Void>();
        keyStates = new Map<Key,Bool>();
        keyCharStates = new Map<String,Bool>();
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

    public static function get() : Dispatcher{
        if(instance == null)
            instance = new Dispatcher();
        return instance;
    }
}
