// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { ResManagerPro } from "../../FrameWork/manager/ResManagerPro";
import { UIManagerPro } from "../../FrameWork/manager/UIManagerPro";
import { UIControl } from "../../FrameWork/ui/UIControl";
import GameDataManager from "../Data/GameDataManager";
import { ViewUI } from "../Enum";
import { HomeUI } from "../EventName";
import AudioSwich from "../Tools/AudioSwich";
import LoadingDoor from "../Tools/LoadingDoor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeUIControl extends UIControl {
    game_started:boolean = false;
    start_anim_com:cc.Animation = null;
    start_click_animclip:cc.AnimationClip = null;
    uinfo_enter_anim_com:cc.Animation = null;
    outside:boolean = false; // 跳出了场景;
    loading_door:LoadingDoor = null;
    music_switch:AudioSwich=null;
    effect_switch:AudioSwich=null;
    // LIFE-CYCLE CALLBACKS:

    async onLoad () {
        super.onLoad();
        this.registerBtnClickEvent();

        this.loading_door = this.getChildByUrl("anchor-center/loading_door").addComponent(LoadingDoor);
        this.loading_door.setData(1, 0.4);

        this.music_switch = this.getChildByUrl("anchor-center/music_switch").addComponent(AudioSwich);
        let off_spriteframe:cc.SpriteFrame=await ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0001", cc.SpriteFrame) as cc.SpriteFrame;
        let on_spriteframe:cc.SpriteFrame=await ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0002", cc.SpriteFrame) as cc.SpriteFrame;
        this.music_switch.setData(1,off_spriteframe,on_spriteframe);

        this.effect_switch = this.getChildByUrl("anchor-center/effect_switch").addComponent(AudioSwich);
        let off_spriteframe2:cc.SpriteFrame=await ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0003", cc.SpriteFrame) as cc.SpriteFrame;
        let on_spriteframe2:cc.SpriteFrame=await ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0004", cc.SpriteFrame) as cc.SpriteFrame;
        this.effect_switch.setData(1, off_spriteframe2,on_spriteframe2);

        this.game_started = false;
        
        this.start_anim_com = this.getChildByUrl("anchor-center/start_anim_root").getComponent(cc.Animation);
        var clip_array = this.start_anim_com.getClips();
        this.start_click_animclip = clip_array[1];
        this.uinfo_enter_anim_com = this.getChildByUrl("anchor-center/user_game_info_root").getComponent(cc.Animation);
        this.outside = false; // 跳出了场景;
        // 播放背景音乐;
        //sound_manager.play_music("resources/sounds/music/home_scene_bg.mp3", true);
        // end
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        EventManager.getInstance().addEventListener(HomeUI.open_the_door,this.open_the_door,this);
    }

    protected onDestroy(): void {
        EventManager.getInstance().removeEventListener(HomeUI.open_the_door,this.open_the_door,this);
    }

    open_the_door(){
        this.loading_door.open_the_door(()=>{
            this.outside=false;
        });
    }

    registerBtnClickEvent(){
        this.buttonAddClickEvent("anchor-center/start_anim_root/about_btton_root/about_button",this.goto_about,this);
        this.buttonAddClickEvent("anchor-center/start_anim_root/start_button_root/start_button",this.start_game,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/close_uinfo_dlg_bt",this.close_uinfo_dlg,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user1/entry",this.on_user_entry_click1,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry",this.on_user_entry_click2,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry",this.on_user_entry_click3,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry",this.on_user_entry_click3,this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry",this.on_user_entry_click3,this);
        this.buttonAddClickEvent("anchor-center/music_switch",this.onMusicEvent,this);
        this.buttonAddClickEvent("anchor-center/effect_switch",this.onEffectEvent,this);
    }

    onMusicEvent(){
        this.music_switch.on_switch_click();
    }
    onEffectEvent(){
        this.effect_switch.on_switch_click();
    }

    onKeyDown(event) {
        console.log(event.keyCode);
        // 打印出来back,的键值，你就判断就可以了。
    }

    // user_node, 节点， user,是本地的账户的游戏数据
    set_star_score(user_node, user) {
        var star_score_label = user_node.getChildByName("star_score").getComponent(cc.Label);
        star_score_label.string = user.star_num + " / " + user.star_total;
    }
    show_user_data() {
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user1"), GameDataManager.getInstance().user_data[0]);
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user2"), GameDataManager.getInstance().user_data[1]);
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user3"), GameDataManager.getInstance().user_data[2]);
    }
    // 动态打开
    start() {
        // 将我们的用户数据显示到我们的界面上面；
        this.show_user_data();
        // end 
        this.scheduleOnce(function() {
            this.start_anim_com.play("home_scene_start_anim");
        }.bind(this), 0.5);
        
    }
    start_game() {
        if (this.game_started) { // 保证在播放期间，start只调用一次;
            return;
        }
        this.game_started = true;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        // end 
        
        // 播放我们的收起动画;
        // this.start_click_animclip.wrapMode = cc.WrapMode.Normal;
        this.start_anim_com.play("start_button_click_anim");
        // end 
        
        // 播放完成了以后，我们再播放我们玩家信息的入场动画;
        this.scheduleOnce(function(){
            this.uinfo_enter_anim_com.play("uinfo_enter_anim");
        }.bind(this), this.start_anim_com.currentClip.duration);
        // end 
    }
    // 关闭我们用户游戏信息的对话框
    close_uinfo_dlg() {
        // Step1, 播放关闭动画;
        this.uinfo_enter_anim_com.play("reserve_uinfo_enter_anim");
        // end
        // 再将start按钮掉下来;
        this.scheduleOnce(function(){
            // 在代码里面修改wrapMode没有作用;
            /*
            console.log("#####", this.start_click_animclip.wrapMode);
            this.start_click_animclip.wrapMode = cc.WrapMode.Reverse;
            console.log("#####", this.start_click_animclip.wrapMode);
            this.start_anim_com.play("start_button_click_anim");
            console.log("#####", this.start_click_animclip.wrapMode);
            console.log("#####", this.start_anim_com.currentClip.wrapMode);
            */
            this.game_started = false;
            this.start_anim_com.play("reserve_start_button_click_anim");
        }.bind(this), this.uinfo_enter_anim_com.currentClip.duration); // 动画的时间长度;
    }
    close_door() {
        this.loading_door.set_door_state(0);
        this.scheduleOnce(function() {
            this.loading_door.open_the_door();    
        }.bind(this), 0.5);
    }
    goto_about() {
        if (this.outside) { // 使用变量挡住，防止多次跳转;
            return;
        }
        this.outside = true;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        
        this.loading_door.close_the_door(function() {
            this.scheduleOnce(function() {
                let canvas=cc.find("Canvas");
                let uiNode=canvas.getChildByName("uiNode");  
                UIManagerPro.getInstance().showPrefab(ViewUI.AboutUI,"UI",uiNode);  
            }, 0.5);
        }.bind(this));
    }
    // 使用哪个用户进入游戏点击响应
    on_user_entry_click1() {
        this.on_user_entry(0);
    }
    on_user_entry_click2() {
        this.on_user_entry(1);
    }
    on_user_entry_click3() {
        this.on_user_entry(2);
    }
    on_user_entry(user_index) {
        if (this.outside) { // 使用变量挡住，防止多次跳转;
            return;
        }
        this.outside = true;
        
        user_index = parseInt(user_index);
        GameDataManager.getInstance().set_cur_user(user_index);
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        
        this.loading_door.close_the_door(function() {
            this.scheduleOnce(function() {
                let canvas=cc.find("Canvas");
                let uiNode=canvas.getChildByName("uiNode"); 
                UIManagerPro.getInstance().showPrefab(ViewUI.RoadMapUI,"UI",uiNode);   
            }, 0.5);
        }.bind(this));
    }
}
