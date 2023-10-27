// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingDoor extends UIControl {
    l_door: cc.Node = null;
    r_door: cc.Node = null;
    door_state: number = 0; // 0 表示关, 1表示开
    anim_duration: number = 0.1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.l_door = this.getChildByUrl("l_door");
        this.r_door = this.getChildByUrl("r_door");
    }

    setData(state:number,duration:number){
        this.door_state = state;
        this.anim_duration = duration;
        this._set_door_state(this.door_state);
    }
    
    _set_door_state(state) {
        this.door_state = state;
        
        var win_size = cc.winSize;
        
        if (this.door_state === 0) { // 关门
            this.l_door.x = 2;
            this.r_door.x = -2;
        }
        else if (this.door_state === 1) { // 开门
            this.l_door.x = -win_size.width * 0.5;
            this.r_door.x = win_size.width * 0.5;
        }    
    }
    
    set_door_state(state) {
        if (this.door_state == state) {
            return;
        }
        
        this._set_door_state(state);
    }
    
    close_the_door(end_func) {
        if (this.door_state === 0) {
            return;
        } 
        
        var win_size = cc.winSize;
        this.door_state = 0;
        this.l_door.x = -win_size.width * 0.5;
        this.r_door.x = win_size.width * 0.5;
        
        var m1 = cc.moveBy(this.anim_duration, (win_size.width * 0.5 + 2), 0);
        this.l_door.runAction(m1);
        
        var m2 = cc.moveBy(this.anim_duration, -(win_size.width * 0.5 + 2), 0);
         var call_back = cc.callFunc(function() {
            // 播放关门的音效
            //sound_manager.play_effect("resources/sounds/close_door.mp3");
            if (end_func) {
                end_func();
            }
        }.bind(this), this.l_door);
        var seq = cc.sequence([m2, call_back]);
        
        this.r_door.runAction(seq);
    }
    
    open_the_door(end_func) {
        
        if (this.door_state === 1) {
            return;
        }

        this.door_state = 1;
        this.l_door.x = 2;
        this.r_door.x = -2;
        

        var win_size = cc.winSize;
        var m1 = cc.moveBy(this.anim_duration, -win_size.width * 0.5 - 2, 0);
        this.l_door.runAction(m1);
        
        var m2 = cc.moveBy(this.anim_duration, win_size.width * 0.5 + 2, 0);
        var call_back = cc.callFunc(function() {
            if (end_func) {
                end_func();
            }
        }.bind(this), this.r_door);
        var seq = cc.sequence([m2, call_back]);
        this.r_door.runAction(seq);
    }
    
}
