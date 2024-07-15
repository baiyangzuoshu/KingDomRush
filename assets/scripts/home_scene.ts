/*
console.log("#####", this.start_click_animclip.wrapMode);
this.start_click_animclip.wrapMode = cc.WrapMode.Reverse;
console.log("#####", this.start_click_animclip.wrapMode);
this.start_anim_com.play("start_button_click_anim");
console.log("#####", this.start_click_animclip.wrapMode);
console.log("#####", this.start_anim_com.currentClip.wrapMode);
*/
import { _decorator, Component } from 'cc';
import { sound_manager } from 'sound_manager';
import { ugame } from 'ugame';
const { ccclass } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {

    onLoad () {
        // this.loading_door = cc.find("UI_ROOT/anchor-center/loading_door").getComponent("loading_door"); 
        // this.game_started = false; 
        // this.start_anim_com = cc.find("UI_ROOT/anchor-center/start_anim_root").getComponent(cc.Animation); 
        // var clip_array = this.start_anim_com.getClips(); 
        // this.start_click_animclip = clip_array[1]; 
        // this.uinfo_enter_anim_com = cc.find("UI_ROOT/anchor-center/user_game_info_root").getComponent(cc.Animation); 
        // this.outside = false; // 跳出了场景; 
        // sound_manager.play_music("resources/sounds/music/home_scene_bg.mp3", true); 
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this); 
    }

    onKeyDown (event: any) {
        // console.log(event.keyCode); 
    }

    set_star_score (user_node: any, user: any) {
        // var star_score_label = user_node.getChildByName("star_score").getComponent(cc.Label); 
        // star_score_label.string = user.star_num + " / " + user.star_total; 
    }

    show_user_data () {
        // this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user1"), ugame.user_data[0]); 
        // this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user2"), ugame.user_data[1]); 
        // this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user3"), ugame.user_data[2]); 
    }

    start () {
        // this.show_user_data(); 
        // this.scheduleOnce(function() { 
            // this.start_anim_com.play("home_scene_start_anim"); 
        // }.bind(this), 0.5); 
    }

    start_game () {
        // if (this.game_started) { // 保证在播放期间，start只调用一次; 
            // return; 
        // } 
        // this.game_started = true; 
        // sound_manager.play_effect("resources/sounds/click.wav"); 
        // this.start_anim_com.play("start_button_click_anim"); 
        // this.scheduleOnce(function(){ 
            // this.uinfo_enter_anim_com.play("uinfo_enter_anim"); 
        // }.bind(this), this.start_anim_com.currentClip.duration); 
    }

    close_uinfo_dlg () {
        // this.uinfo_enter_anim_com.play("reserve_uinfo_enter_anim"); 
        // this.scheduleOnce(function(){ 
            // this.game_started = false; 
            // this.start_anim_com.play("reserve_start_button_click_anim"); 
        // }.bind(this), this.uinfo_enter_anim_com.currentClip.duration); // 动画的时间长度; 
    }

    close_door () {
        // this.loading_door.set_door_state(0); 
        // this.scheduleOnce(function() { 
            // this.loading_door.open_the_door();     
        // }.bind(this), 0.5); 
    }

    goto_about () {
        // if (this.outside) { // 使用变量挡住，防止多次跳转; 
            // return; 
        // } 
        // this.outside = true; 
        // sound_manager.play_effect("resources/sounds/click.wav"); 
        // this.loading_door.close_the_door(function() { 
            // this.scheduleOnce(function() { 
                // cc.director.loadScene("abount_scene");     
            // }, 0.5); 
        // }.bind(this)); 
    }

    on_user_entry_click (event: any, user_index: any) {
        // if (this.outside) { // 使用变量挡住，防止多次跳转; 
            // return; 
        // } 
        // this.outside = true; 
        // user_index = parseInt(user_index); 
        // ugame.set_cur_user(user_index); 
        // sound_manager.play_effect("resources/sounds/click.wav"); 
        // this.loading_door.close_the_door(function() { 
            // this.scheduleOnce(function() { 
                // cc.director.loadScene("roadmap_scene");     
            // }, 0.5); 
        // }.bind(this)); 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var sound_manager = require("sound_manager");
// var ugame = require("ugame");
// 
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
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.loading_door = cc.find("UI_ROOT/anchor-center/loading_door").getComponent("loading_door");
//         this.game_started = false;
//         
//         this.start_anim_com = cc.find("UI_ROOT/anchor-center/start_anim_root").getComponent(cc.Animation);
//         var clip_array = this.start_anim_com.getClips();
//         this.start_click_animclip = clip_array[1];
//         this.uinfo_enter_anim_com = cc.find("UI_ROOT/anchor-center/user_game_info_root").getComponent(cc.Animation);
//         this.outside = false; // 跳出了场景;
//         
//         
//         // 播放背景音乐;
//         sound_manager.play_music("resources/sounds/music/home_scene_bg.mp3", true);
//         // end
//         
//         
//         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
//     },
//     
//     onKeyDown: function (event) {
//         console.log(event.keyCode);
//         // 打印出来back,的键值，你就判断就可以了。
//     },
//     
//     // user_node, 节点， user,是本地的账户的游戏数据
//     set_star_score: function(user_node, user) {
//         var star_score_label = user_node.getChildByName("star_score").getComponent(cc.Label);
//         star_score_label.string = user.star_num + " / " + user.star_total;
//     }, 
//     
//     show_user_data: function() {
//         this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user1"), ugame.user_data[0]);
//         this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user2"), ugame.user_data[1]);
//         this.set_star_score(cc.find("UI_ROOT/anchor-center/user_game_info_root/user3"), ugame.user_data[2]);
//     }, 
//     
//     // 动态打开
//     start: function() {
//         // 将我们的用户数据显示到我们的界面上面；
//         this.show_user_data();
//         // end 
//         
//         
//         this.scheduleOnce(function() {
//             this.start_anim_com.play("home_scene_start_anim");
//         }.bind(this), 0.5);
//         
//     }, 
//     
//     start_game: function() {
//         if (this.game_started) { // 保证在播放期间，start只调用一次;
//             return;
//         }
//         this.game_started = true;
//         // 播放按钮的音效
//         sound_manager.play_effect("resources/sounds/click.wav");
//         // end 
//         
//         // 播放我们的收起动画;
//         // this.start_click_animclip.wrapMode = cc.WrapMode.Normal;
//         this.start_anim_com.play("start_button_click_anim");
//         // end 
//         
//         // 播放完成了以后，我们再播放我们玩家信息的入场动画;
//         this.scheduleOnce(function(){
//             this.uinfo_enter_anim_com.play("uinfo_enter_anim");
//         }.bind(this), this.start_anim_com.currentClip.duration);
//         // end 
//     }, 
//     
//     // 关闭我们用户游戏信息的对话框
//     close_uinfo_dlg: function() {
//         // Step1, 播放关闭动画;
//         this.uinfo_enter_anim_com.play("reserve_uinfo_enter_anim");
//         // end
//         // 再将start按钮掉下来;
//         this.scheduleOnce(function(){
//             // 在代码里面修改wrapMode没有作用;
//             /*
//             console.log("#####", this.start_click_animclip.wrapMode);
//             this.start_click_animclip.wrapMode = cc.WrapMode.Reverse;
//             console.log("#####", this.start_click_animclip.wrapMode);
//             this.start_anim_com.play("start_button_click_anim");
//             console.log("#####", this.start_click_animclip.wrapMode);
//             console.log("#####", this.start_anim_com.currentClip.wrapMode);
//             */
//             this.game_started = false;
//             this.start_anim_com.play("reserve_start_button_click_anim");
//         }.bind(this), this.uinfo_enter_anim_com.currentClip.duration); // 动画的时间长度;
//         // end 
//     },
//     
//     close_door: function() {
//         this.loading_door.set_door_state(0);
//         this.scheduleOnce(function() {
//             this.loading_door.open_the_door();    
//         }.bind(this), 0.5);
//     },
//     
//     goto_about: function() {
//         if (this.outside) { // 使用变量挡住，防止多次跳转;
//             return;
//         }
//         this.outside = true;
//         // 播放按钮的音效
//         sound_manager.play_effect("resources/sounds/click.wav");
//         
//         this.loading_door.close_the_door(function() {
//             this.scheduleOnce(function() {
//                 cc.director.loadScene("abount_scene");    
//             }, 0.5);
//         }.bind(this));
//         
//     }, 
//     
//     // 使用哪个用户进入游戏点击响应
//     on_user_entry_click: function(event, user_index) {
//         if (this.outside) { // 使用变量挡住，防止多次跳转;
//             return;
//         }
//         this.outside = true;
//         
//         user_index = parseInt(user_index);
//         ugame.set_cur_user(user_index);
//         // 播放按钮的音效
//         sound_manager.play_effect("resources/sounds/click.wav");
//         
//         
//         this.loading_door.close_the_door(function() {
//             this.scheduleOnce(function() {
//                 cc.director.loadScene("roadmap_scene");    
//             }, 0.5);
//         }.bind(this));
//         
//         
//         
//         
//     }, 
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
