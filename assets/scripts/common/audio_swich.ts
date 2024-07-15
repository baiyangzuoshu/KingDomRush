import { _decorator, Component, SpriteFrame } from 'cc';
import { sound_manager } from 'sound_manager';
const { ccclass, property } = _decorator;

@ccclass('AudioSwich')
export class AudioSwich extends Component {
    @property
    public type = 0;
    @property(SpriteFrame)
    public off_spriteframe = null;
    @property(SpriteFrame)
    public on_spriteframe = null;

    onLoad () {
        // this.sp = this.node.getComponent(cc.Sprite); 
    }

    start () {
        // if (this.type === 0) { // 表示是music的开关； 
            // if (sound_manager.b_music_mute) { 
                // this.sp.spriteFrame = this.off_spriteframe;  
            // } 
            // else { 
                // this.sp.spriteFrame = this.on_spriteframe;  
            // } 
        // } 
        // else if(this.type === 1) { 
            // if (sound_manager.b_effect_mute)  { 
                // this.sp.spriteFrame = this.off_spriteframe;  
            // } 
            // else { 
                // this.sp.spriteFrame = this.on_spriteframe;  
            // } 
        // } 
    }

    on_switch_click () {
        // var b_mute; 
        // if (this.type === 0) { // music 的switch; 
            // b_mute = (sound_manager.b_music_mute) ? 0 : 1; 
            // sound_manager.set_music_mute(b_mute); 
        // } 
        // else if(this.type === 1) { 
            // b_mute = (sound_manager.b_effect_mute) ? 0 : 1; 
            // sound_manager.set_effect_mute(b_mute); 
        // } 
        // if (b_mute) { // off图片 
            // this.sp.spriteFrame = this.off_spriteframe;  
        // } 
        // else { // on图片。 
            // this.sp.spriteFrame = this.on_spriteframe; 
        // } 
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
//         type: 0, // type == 0 ,表示我们当前为music的开关, type == 1,表示当前为音效的开关;
//         
//         off_spriteframe: { // 当处于关闭状态的时候，要显示的图片。
//             default: null, 
//             type: cc.SpriteFrame,
//         }, 
//         
//         on_spriteframe: { // 处于打开状态时候要显示的图片
//             default: null, 
//             type: cc.SpriteFrame, 
//         },
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         // 获取换状态图片的Sprite组件，
//         this.sp = this.node.getComponent(cc.Sprite);
//         // end 
//     },
//     
//     start: function() { // 根据我们sound_manager的状态，来显示对应的图片
//         if (this.type === 0) { // 表示是music的开关；
//             if (sound_manager.b_music_mute) {
//                 this.sp.spriteFrame = this.off_spriteframe; 
//             }
//             else {
//                 this.sp.spriteFrame = this.on_spriteframe; 
//             }
//         }
//         else if(this.type === 1) {
//             if (sound_manager.b_effect_mute)  {
//                 this.sp.spriteFrame = this.off_spriteframe; 
//             }
//             else {
//                 this.sp.spriteFrame = this.on_spriteframe; 
//             }
//         }
//     }, 
//     
//     // 声音按钮按下，切换状态；
//     on_switch_click: function() {
//         
//         var b_mute;
//         if (this.type === 0) { // music 的switch;
//             b_mute = (sound_manager.b_music_mute) ? 0 : 1;
//             sound_manager.set_music_mute(b_mute);
//         }
//         else if(this.type === 1) {
//             b_mute = (sound_manager.b_effect_mute) ? 0 : 1;
//             sound_manager.set_effect_mute(b_mute);
//         }
//     
//         if (b_mute) { // off图片
//             this.sp.spriteFrame = this.off_spriteframe; 
//         }
//         else { // on图片。
//             this.sp.spriteFrame = this.on_spriteframe;
//         }
//     }, 
// });
