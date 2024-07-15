import { _decorator, Component } from 'cc';
import { sound_manager } from 'sound_manager';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('RoadmapScene')
export class RoadmapScene extends Component {
    @property
    public level_num = 19;

    onLoad () {
        // sound_manager.play_music("resources/sounds/music/roadmap_scene_bg.mp3", true); 
        // this.door = cc.find("UI_ROOT/loading_door").getComponent("loading_door"); 
        // this.outside = false; 
        // this.new_level_entry = cc.find("UI_ROOT/anchor-center/new_level_entry"); 
        // this.new_level_entry.active = false; 
        // this.passed_entry = []; 
        // var map_entry_root = cc.find("UI_ROOT/anchor-center/map_entry_root"); 
        // for(var i = 0; i < this.level_num; i ++) { 
            // var name = "level" + (i + 1); 
            // this.passed_entry.push(map_entry_root.getChildByName(name));     
            // var bt = this.passed_entry[i].getComponent(cc.Button); 
            // var click_event = new cc.Component.EventHandler(); 
            // click_event.target = this.node; 
            // click_event.component = "roadmap_scene"; 
            // click_event.handler = "on_passed_entry_click"; 
            // click_event.customEventData = "" + i; 
            // bt.clickEvents = [click_event]; 
        // } 
        // this.newest_level = -1; 
        // this.upgrade_config = cc.find("UI_ROOT/anchor-center/upgrade_config"); 
        // this.upgrade_config.active = false; 
    }

    _show_user_star_info () {
        // var label = cc.find("UI_ROOT/anchor-rt/game_star_info/star_num").getComponent(cc.Label); 
        // var cur_user = ugame.get_cur_user(); 
        // label.string = cur_user.star_num + " / " + cur_user.star_total; 
    }

    _show_game_level_info () {
        // var cur_user = ugame.get_cur_user(); 
        // var level_info = cur_user.level_info; 
        // var i = 0; 
        // var len = (level_info.length < this.level_num) ? level_info.length : this.level_num; 
        // for(i = 0; i < len; i ++) { 
            // if (level_info[i] === 0) { // 遇到了没有打通的关卡 
                // break; 
            // } 
            // this.passed_entry[i].active = true; 
            // this.passed_entry[i].getComponent("level_entry_info").show_level_star_info(level_info[i]); 
        // } 
        // this.newest_level = i; 
        // if (this.newest_level >= this.level_num) { // 全部挑战成功 
            // this.new_level_entry.active = false; 
            // this.newest_level = this.level_num - 1; 
        // } 
        // else { 
            // this.new_level_entry.active = true; 
            // this.new_level_entry.x = this.passed_entry[this.newest_level].x; 
            // this.new_level_entry.y = this.passed_entry[this.newest_level].y; 
        // } 
        // for(; i < this.level_num; i ++) { 
            // this.passed_entry[i].active = false; 
        // } 
    }

    start () {
        // this._show_game_level_info(); 
        // this._show_user_star_info(); 
        // this.door.open_the_door(null); 
    }

    goto_home () {
        // if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。 
            // return; 
        // } 
        // sound_manager.play_effect("resources/sounds/click.wav"); 
        // this.go_back = true; 
        // this.door.close_the_door(function(){ 
            // cc.director.loadScene("home_scene", function() { 
                // var home_scene = cc.find("UI_ROOT").getComponent("home_scene"); 
                // home_scene.close_door(); 
            // });     
        // }.bind(this)); 
    }

    _goto_game_scene (level: any) {
        // ugame.set_cur_level(level); 
        // console.log("enter game_scene at level:", ugame.get_cur_level()); 
        // this.door.close_the_door(function(){ 
            // cc.director.loadScene("game_scene", function() { 
            // });     
        // }.bind(this)); 
    }

    on_new_entry_click () {
        // if (this.outside === true) { 
            // return; 
        // } 
        // this.outside = true; 
        // this._goto_game_scene(this.newest_level) 
    }

    on_passed_entry_click (t: any, level: any) {
        // level = parseInt(level); // 字符串转成数字 
        // if (this.outside === true) { 
            // return; 
        // } 
        // this.outside = true; 
        // this._goto_game_scene(level); 
    }

    on_skill_upgrade_config_click () {
        // this.upgrade_config.active = true; 
        // this.upgrade_config.getComponent(cc.Animation).play("road_skill_upgrade_config"); 
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
//         level_num: 19,
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         // 播放背景音乐
//         sound_manager.play_music("resources/sounds/music/roadmap_scene_bg.mp3", true);
//         // end
//         
//         this.door = cc.find("UI_ROOT/loading_door").getComponent("loading_door");
//         this.outside = false;
//         
//         this.new_level_entry = cc.find("UI_ROOT/anchor-center/new_level_entry");
//         this.new_level_entry.active = false;
//         
//         this.passed_entry = [];
//         var map_entry_root = cc.find("UI_ROOT/anchor-center/map_entry_root");
//         for(var i = 0; i < this.level_num; i ++) {
//             var name = "level" + (i + 1);
//             this.passed_entry.push(map_entry_root.getChildByName(name));    
//             var bt = this.passed_entry[i].getComponent(cc.Button);
//             var click_event = new cc.Component.EventHandler();
//             click_event.target = this.node;
//             click_event.component = "roadmap_scene";
//             click_event.handler = "on_passed_entry_click";
//             click_event.customEventData = "" + i;
//             bt.clickEvents = [click_event];
//         }
//         
//         this.newest_level = -1;
//         
//         // 装备升级
//         this.upgrade_config = cc.find("UI_ROOT/anchor-center/upgrade_config");
//         this.upgrade_config.active = false;
//         // end 
//     },
//     
//     _show_user_star_info: function() {
//         var label = cc.find("UI_ROOT/anchor-rt/game_star_info/star_num").getComponent(cc.Label);
//         var cur_user = ugame.get_cur_user();
//         label.string = cur_user.star_num + " / " + cur_user.star_total;
//     }, 
//     
//     _show_game_level_info: function() {
//         // 获取当前用户的用户信息，来获得它挑战的关卡的成绩;
//         var cur_user = ugame.get_cur_user();
//         var level_info = cur_user.level_info;
//         // var level_info = [1, 3, 1, 2, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//         // end 
//         var i = 0;
//         var len = (level_info.length < this.level_num) ? level_info.length : this.level_num;
//         // 显示通过了的关的关卡的成绩
//         for(i = 0; i < len; i ++) {
//             if (level_info[i] === 0) { // 遇到了没有打通的关卡
//                 break;
//             }
//             this.passed_entry[i].active = true;
//             this.passed_entry[i].getComponent("level_entry_info").show_level_star_info(level_info[i]);
//         }
//         
//         // 第一个为星星为0的关卡，玩家可以来挑战
//         this.newest_level = i;
//         if (this.newest_level >= this.level_num) { // 全部挑战成功
//             this.new_level_entry.active = false;
//             this.newest_level = this.level_num - 1;
//         }
//         else {
//             this.new_level_entry.active = true;
//             // 把这个棋子插在对应的位置
//             this.new_level_entry.x = this.passed_entry[this.newest_level].x;
//             this.new_level_entry.y = this.passed_entry[this.newest_level].y;
//             // end 
//         }
//         // end 
//         
//         for(; i < this.level_num; i ++) {
//             this.passed_entry[i].active = false;
//         }
//     }, 
//     // 打开这个门;
//     start: function() {
//         this._show_game_level_info();
//         this._show_user_star_info();
//         
// 
//         this.door.open_the_door(null);
//     },
//     
//     // 跳转到home场景;
//     goto_home: function() {
//         if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
//             return;
//         }
//         // 播放按钮的音效
//         sound_manager.play_effect("resources/sounds/click.wav");
//         
//         this.go_back = true;
//         this.door.close_the_door(function(){
//             cc.director.loadScene("home_scene", function() {
//                 var home_scene = cc.find("UI_ROOT").getComponent("home_scene");
//                 home_scene.close_door();
//             });    
//         }.bind(this));
//     },
//     // end 
//     
//     _goto_game_scene: function(level) {
//         // 保存当前可以游戏的关卡,保存到ugame里面，游戏场景就可以直接访问的到；
//         ugame.set_cur_level(level);
//         // end 
//         
//         console.log("enter game_scene at level:", ugame.get_cur_level());
//         // 调转到游戏场景;
//         this.door.close_the_door(function(){
//             cc.director.loadScene("game_scene", function() {
//             });    
//         }.bind(this));
//         // end 
//     },
//     
//     // 新的没有挑战过的关卡点击
//     on_new_entry_click: function () {
//         if (this.outside === true) {
//             return;
//         }
//         this.outside = true;
//         this._goto_game_scene(this.newest_level)
//     },
//     // end 
//     
//     // 已经挑战的关卡点击进入
//     on_passed_entry_click: function(t, level) {
//         level = parseInt(level); // 字符串转成数字
//         if (this.outside === true) {
//             return;
//         }
//         this.outside = true;
//         this._goto_game_scene(level);
//     },
//     // end 
//     
//     // 用户技能配置设置
//     on_skill_upgrade_config_click: function() {
//         this.upgrade_config.active = true;
//         this.upgrade_config.getComponent(cc.Animation).play("road_skill_upgrade_config");
//     },
//     // end 
//     
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
