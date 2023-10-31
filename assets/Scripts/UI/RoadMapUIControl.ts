// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { UIManagerPro } from "../../FrameWork/manager/UIManagerPro";
import { UIControl } from "../../FrameWork/ui/UIControl";
import GameDataManager from "../Data/GameDataManager";
import { ViewUI } from "../Enum";
import { HomeUI } from "../EventName";
import LevelEntryInfo from "../Tools/LevelEntryInfo";
import LoadingDoor from "../Tools/LoadingDoor";
import UpgradeConfig from "../Tools/UpgradeConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoadMapUIControl extends UIControl {
    door:LoadingDoor=null;
    outside:boolean=false;
    new_level_entry:cc.Node=null;
    passed_entry:cc.Node[]=[];
    level_num:number=19;
    newest_level:number=-1;
    upgrade_config:cc.Node=null;
    go_back:boolean=false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();
        // 播放背景音乐
        //sound_manager.play_music("resources/sounds/music/roadmap_scene_bg.mp3", true);
        // end

        this.door = this.getChildByUrl("loading_door").addComponent(LoadingDoor);
        this.door.setData(0, 0.4);

        this.outside = false;

        this.new_level_entry = this.getChildByUrl("anchor-center/new_level_entry");
        this.new_level_entry.active = false;

        this.passed_entry = [];
        var map_entry_root = this.getChildByUrl("anchor-center/map_entry_root");
        for(var i = 0; i < this.level_num; i ++) {
            var name = "level" + (i + 1);
            let levelNode:cc.Node=map_entry_root.getChildByName(name);
            let ts=levelNode.addComponent(LevelEntryInfo);
            ts.setData(1);

            this.passed_entry.push(levelNode);  
            var bt = this.passed_entry[i].getComponent(cc.Button);
            var click_event = new cc.Component.EventHandler();
            click_event.target = this.node;
            click_event.component = "RoadMapUIControl";
            click_event.handler = "on_passed_entry_click";
            click_event.customEventData = "" + i;
            bt.clickEvents = [click_event];
        }

        this.newest_level = -1;

        // 装备升级
        this.upgrade_config = this.getChildByUrl("anchor-center/upgrade_config");
        this.upgrade_config.addComponent(UpgradeConfig);
        this.upgrade_config.active = false;
        // end 

        this.registerBtnClickEvent();
    }

    registerBtnClickEvent(){
        this.buttonAddClickEvent("anchor-bottom/bottom_button_root/back_bt",this.goto_home,this);
        this.buttonAddClickEvent("anchor-bottom/bottom_button_root/upgrade",this.on_skill_upgrade_config_click,this);
        this.buttonAddClickEvent("anchor-center/upgrade_config/anim_root/reset",this.on_reset_upgrade_config_click,this);
        this.buttonAddClickEvent("anchor-center/upgrade_config/anim_root/done",this.on_done_upgrade_config_click,this);
        this.buttonAddClickEvent("anchor-center/new_level_entry",this.on_new_entry_click,this);
    }

    on_done_upgrade_config_click(){
        this.upgrade_config.active = false;
        this.upgrade_config.getComponent(cc.Animation).play("reserve_road_skill_upgrade_config");
    }

    on_reset_upgrade_config_click(){

    }

    _show_user_star_info() {
        var label = this.getChildByUrl("anchor-rt/game_star_info/star_num").getComponent(cc.Label);
        var cur_user = GameDataManager.getInstance().get_cur_user();
        label.string = cur_user.star_num + " / " + cur_user.star_total;
    } 

    _show_game_level_info() {
        // 获取当前用户的用户信息，来获得它挑战的关卡的成绩;
        var cur_user = GameDataManager.getInstance().get_cur_user();
        var level_info = cur_user.level_info;
        // var level_info = [1, 3, 1, 2, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // end 
        var i = 0;
        var len = (level_info.length < this.level_num) ? level_info.length : this.level_num;
        // 显示通过了的关的关卡的成绩
        for(i = 0; i < len; i ++) {
            if (level_info[i] === 0) { // 遇到了没有打通的关卡
                break;
            }
            this.passed_entry[i].active = true;
            this.passed_entry[i].getComponent(LevelEntryInfo).show_level_star_info(level_info[i]);
        }

        // 第一个为星星为0的关卡，玩家可以来挑战
        this.newest_level = i;
        if (this.newest_level >= this.level_num) { // 全部挑战成功
            this.new_level_entry.active = false;
            this.newest_level = this.level_num - 1;
        }
        else {
            this.new_level_entry.active = true;
            // 把这个棋子插在对应的位置
            this.new_level_entry.x = this.passed_entry[this.newest_level].x;
            this.new_level_entry.y = this.passed_entry[this.newest_level].y;
            // end 
        }
        // end 
        console.log("newest_level = " + this.newest_level);
        for(; i < this.level_num; i ++) {
            this.passed_entry[i].active = false;
        }
    }
    // 打开这个门;
    start() {
        this._show_game_level_info();
        this._show_user_star_info();


        this.door.open_the_door(null);
    }

    // 跳转到home场景;
    goto_home() {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");

        this.go_back = true;
        this.door.close_the_door(function(){
            UIManagerPro.getInstance().closePrefab(ViewUI.RoadMapUI);
            EventManager.getInstance().emit(HomeUI.open_the_door);    
        }.bind(this));
    }
    // end 

    _goto_game_scene(level) {
        console.log("goto game scene at level:", level);
        // 保存当前可以游戏的关卡,保存到GameDataManager.getInstance()里面，游戏场景就可以直接访问的到；
        GameDataManager.getInstance().set_cur_level(level);
        // end 

        console.log("enter game_scene at level:", GameDataManager.getInstance().get_cur_level());
        // 调转到游戏场景;
        this.door.close_the_door(function(){
            let canvas=cc.find("Canvas");
            let uiNode=canvas.getChildByName("uiNode");
            UIManagerPro.getInstance().showPrefab(ViewUI.GameUI,"UI",uiNode);    
        }.bind(this));
        // end 
    }

    // 新的没有挑战过的关卡点击
    on_new_entry_click() {
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        this._goto_game_scene(this.newest_level)
    }
    // end 

    // 已经挑战的关卡点击进入
    on_passed_entry_click(t,data) {
        let level=parseInt(data)
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        this._goto_game_scene(level);
    }
    // end 

    // 用户技能配置设置
    on_skill_upgrade_config_click() {
        this.upgrade_config.active = true;
        this.upgrade_config.getComponent(cc.Animation).play("road_skill_upgrade_config");
    }
}
