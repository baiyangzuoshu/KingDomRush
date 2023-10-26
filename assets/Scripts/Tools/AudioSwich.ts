// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";
import PlayerSoundManager from "../Manager/PlayerSoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioSwich extends UIControl {
    sp:cc.Sprite = null; // 用来显示图片的Sprite组件
    type:number = 0; // 0 表示music的开关，1表示effect的开关；
    off_spriteframe:cc.SpriteFrame = null; // off状态的图片
    on_spriteframe:cc.SpriteFrame = null; // on状态的图片

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        // 获取换状态图片的Sprite组件，
        this.sp = this.node.getComponent(cc.Sprite);
        // end 
    }

    setData(type:number,off_spriteframe:cc.SpriteFrame,on_spriteframe:cc.SpriteFrame) {
        this.type = type;
        this.off_spriteframe = off_spriteframe;
        this.on_spriteframe = on_spriteframe;
    }

    start() { // 根据我们sound_manager的状态，来显示对应的图片
        if (this.type === 0) { // 表示是music的开关；
            if (PlayerSoundManager.getInstance().b_music_mute) {
                this.sp.spriteFrame = this.off_spriteframe; 
            }
            else {
                this.sp.spriteFrame = this.on_spriteframe; 
            }
        }
        else if(this.type === 1) {
            if (PlayerSoundManager.getInstance().b_effect_mute)  {
                this.sp.spriteFrame = this.off_spriteframe; 
            }
            else {
                this.sp.spriteFrame = this.on_spriteframe; 
            }
        }
    }
    // 声音按钮按下，切换状态；
    on_switch_click() {
        var b_mute;
        if (this.type === 0) { // music 的switch;
            b_mute = (PlayerSoundManager.getInstance().b_music_mute) ? 0 : 1;
            PlayerSoundManager.getInstance().set_music_mute(b_mute);
        }
        else if(this.type === 1) {
            b_mute = (PlayerSoundManager.getInstance().b_effect_mute) ? 0 : 1;
            PlayerSoundManager.getInstance().set_effect_mute(b_mute);
        }

        if (b_mute) { // off图片
            this.sp.spriteFrame = this.off_spriteframe; 
        }
        else { // on图片。
            this.sp.spriteFrame = this.on_spriteframe;
        }
    }

    // update (dt) {}
}
