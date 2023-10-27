// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { UIManager } from "../../FrameWork/manager/UIManager";
import { UIManagerPro } from "../../FrameWork/manager/UIManagerPro";
import { UIControl } from "../../FrameWork/ui/UIControl";
import { ViewUI } from "../Enum";
import { HomeUI } from "../EventName";
import LoadingDoor from "../Tools/LoadingDoor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AboutUIControl extends UIControl {
    loading_door: LoadingDoor = null;
    go_back:boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.loading_door = this.getChildByUrl("anchor-center/loading_door").addComponent(LoadingDoor);
        this.loading_door.setData(0, 0.4);

        this.buttonAddClickEvent("anchor-center/back_bt",this.goto_home,this);
    }

    // 打开这个门;
    start() {
        this.loading_door.open_the_door(null);
    }
    
    // 跳转到home场景;
    goto_home() {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        
        this.go_back = true;
        this.loading_door.close_the_door(function(){
            UIManagerPro.getInstance().closePrefab(ViewUI.AboutUI);
            EventManager.getInstance().emit(HomeUI.open_the_door);
        }.bind(this));
    }
}
