import { _decorator, Component } from 'cc';
import { sound_manager } from 'sound_manager';
const { ccclass, property } = _decorator;

@ccclass('LoadingDoor')
export class LoadingDoor extends Component {
    @property
    public door_state = 0;
    @property
    public anim_duration = 0.1;

    onLoad () {
        // this.l_door = this.node.getChildByName("l_door"); 
        // this.r_door = this.node.getChildByName("r_door"); 
        // this._set_door_state(this.door_state); 
    }

    start () {
    }

    _set_door_state (state: any) {
        // this.door_state = state; 
        // var win_size = cc.director.getWinSize(); 
        // if (this.door_state === 0) { // 关门 
            // this.l_door.x = 2; 
            // this.r_door.x = -2; 
        // } 
        // else if (this.door_state === 1) { // 开门 
            // this.l_door.x = -win_size.width * 0.5; 
            // this.r_door.x = win_size.width * 0.5; 
        // }     
    }

    set_door_state (state: any) {
        // if (this.door_state == state) { 
            // return; 
        // } 
        // this._set_door_state(state); 
    }

    close_the_door (end_func: any) {
        // if (this.door_state === 0) { 
            // return; 
        // }  
        // var win_size = cc.director.getWinSize(); 
        // this.door_state = 0; 
        // this.l_door.x = -win_size.width * 0.5; 
        // this.r_door.x = win_size.width * 0.5; 
        // var m1 = cc.moveBy(this.anim_duration, (win_size.width * 0.5 + 2), 0); 
        // this.l_door.runAction(m1); 
        // var m2 = cc.moveBy(this.anim_duration, -(win_size.width * 0.5 + 2), 0); 
         // var call_back = cc.callFunc(function() { 
            // sound_manager.play_effect("resources/sounds/close_door.mp3"); 
            // if (end_func) { 
                // end_func(); 
            // } 
        // }.bind(this), this.l_door); 
        // var seq = cc.sequence([m2, call_back]); 
        // this.r_door.runAction(seq); 
    }

    open_the_door (end_func: any) {
        // if (this.door_state === 1) { 
            // return; 
        // } 
        // this.door_state = 1; 
        // this.l_door.x = 2; 
        // this.r_door.x = -2; 
        // var win_size = cc.director.getWinSize(); 
        // var m1 = cc.moveBy(this.anim_duration, -win_size.width * 0.5 - 2, 0); 
        // this.l_door.runAction(m1); 
        // var m2 = cc.moveBy(this.anim_duration, win_size.width * 0.5 + 2, 0); 
        // var call_back = cc.callFunc(function() { 
            // if (end_func) { 
                // end_func(); 
            // } 
        // }.bind(this), this.r_door); 
        // var seq = cc.sequence([m2, call_back]); 
        // this.r_door.runAction(seq); 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var sound_manager = require("sound_manager");
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         // foo: {
//         //    default: null,      // The default value will be used only when the component attaching
//         //                           to a node for the first time
//         //    url: cc.Texture2D,  // optional, default is typeof default
//         //    serializable: true, // optional, default is true
//         //    visible: true,      // optional, default is true
//         //    displayName: 'Foo', // optional
//         //    readonly: false,    // optional, default is false
//         // },
//         // ...
//         door_state: 0,
//         anim_duration: 0.1
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.l_door = this.node.getChildByName("l_door");
//         this.r_door = this.node.getChildByName("r_door");
//         // this.door_state = 0; // 0 表示关, 1表示开
//         // this.anim_duration = 0.1;
//         
//         this._set_door_state(this.door_state);
//     },
//     
//     start: function() {
//     }, 
//     
//     _set_door_state: function(state) {
//         this.door_state = state;
//         
//         var win_size = cc.director.getWinSize();
//         
//         if (this.door_state === 0) { // 关门
//             this.l_door.x = 2;
//             this.r_door.x = -2;
//         }
//         else if (this.door_state === 1) { // 开门
//             this.l_door.x = -win_size.width * 0.5;
//             this.r_door.x = win_size.width * 0.5;
//         }    
//     }, 
//     
//     set_door_state: function(state) {
//         if (this.door_state == state) {
//             return;
//         }
//         
//         this._set_door_state(state);
//     }, 
//     
//     close_the_door: function(end_func) {
//         if (this.door_state === 0) {
//             return;
//         } 
//         
//         var win_size = cc.director.getWinSize();
//         this.door_state = 0;
//         this.l_door.x = -win_size.width * 0.5;
//         this.r_door.x = win_size.width * 0.5;
//         
//         var m1 = cc.moveBy(this.anim_duration, (win_size.width * 0.5 + 2), 0);
//         this.l_door.runAction(m1);
//         
//         var m2 = cc.moveBy(this.anim_duration, -(win_size.width * 0.5 + 2), 0);
//          var call_back = cc.callFunc(function() {
//             // 播放关门的音效
//             sound_manager.play_effect("resources/sounds/close_door.mp3");
//             if (end_func) {
//                 end_func();
//             }
//         }.bind(this), this.l_door);
//         var seq = cc.sequence([m2, call_back]);
//         
//         this.r_door.runAction(seq);
//     }, 
//     
//     open_the_door: function(end_func) {
//         
//         if (this.door_state === 1) {
//             return;
//         }
// 
//         this.door_state = 1;
//         this.l_door.x = 2;
//         this.r_door.x = -2;
//         
// 
//         var win_size = cc.director.getWinSize();
//         var m1 = cc.moveBy(this.anim_duration, -win_size.width * 0.5 - 2, 0);
//         this.l_door.runAction(m1);
//         
//         var m2 = cc.moveBy(this.anim_duration, win_size.width * 0.5 + 2, 0);
//         var call_back = cc.callFunc(function() {
//             if (end_func) {
//                 end_func();
//             }
//         }.bind(this), this.r_door);
//         var seq = cc.sequence([m2, call_back]);
//         this.r_door.runAction(seq);
//     },
//     
//     
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
