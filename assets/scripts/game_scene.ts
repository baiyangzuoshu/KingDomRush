import { _decorator, Component, Prefab } from 'cc';
import { sound_manager } from 'sound_manager';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('GameScene')
export class GameScene extends Component {
    @property([Prefab])
    public enemy_prefabs = [];
    @property([Prefab])
    public game_map_set = [];

    onLoad () {
        // sound_manager.play_music("resources/sounds/music/game_bg1.mp3", true); 
        // this.door = cc.find("UI_ROOT/loading_door").getComponent("loading_door"); 
        // this.go_back = false; 
        // this.pause_root = cc.find("UI_ROOT/anchor-center/pause_root"); 
        // this.pause_root.active = false; 
        // this.setting_root = cc.find("UI_ROOT/anchor-center/setting_root"); 
        // this.setting_root.active = false; 
        // this.blood_label = cc.find("UI_ROOT/anchor-lt/ugame_root/blood_label").getComponent(cc.Label); 
        // this.uchip_label = cc.find("UI_ROOT/anchor-lt/ugame_root/uchip_label").getComponent(cc.Label); 
        // this.round_label = cc.find("UI_ROOT/anchor-lt/ugame_root/round_label").getComponent(cc.Label); 
        // this.blood = 0; 
        // this.game_started = false; 
        // ugame.is_game_paused = false; 
        // this.map_root = cc.find("UI_ROOT/map_root"); 
        // this.checkout = cc.find("UI_ROOT/checkout").getComponent("checkout"); 
        // var map_level = ugame.get_cur_level(); 
        // if (map_level >= this.game_map_set.length) { 
            // map_level = this.game_map_set.length - 1; 
        // } 
        // this.game_map = cc.instantiate(this.game_map_set[map_level]); 
        // this.node.addChild(this.game_map); 
        // this.game_map.zIndex = -100; 
        // this.map_tag_root = this.game_map.getChildByName("tag_root"); 
    }

    start_game () {
        // if (this.game_started === true) { 
            // return; 
        // } 
        // this.all_enemy_gen = false; 
        // ugame.clear_ememy_set(); 
        // this.unscheduleAllCallbacks(); 
        // for(var i = 0; i < this.map_tag_root.children.length; i ++) { 
            // var tower_builder = this.map_tag_root.children[i].getComponent("tower_builder"); 
            // tower_builder.remove_builder_tower(); 
        // } 
        // this.map_root.removeAllChildren(); 
        // this.game_started = true; 
        // ugame.is_game_started = true; 
        // this.checkout.node.active = false;  
        // var cur_user = ugame.get_cur_user(); 
        // this.blood = cur_user.blood; 
        // this.blood_label.string = "" + this.blood; 
        // this.uchip_label.string = "" + ugame.get_uchip(); 
        // this.round_label.string = "round 0 / 7"; 
        // this.map_level = ugame.get_cur_level(); 
        // var map_level = this.map_level; 
        // if (map_level >= this.game_map_set.length) { 
            // map_level = this.game_map_set.length - 1; 
        // } 
        // console.log("map_level #####", map_level, this.map_level); 
        // this.level_data = require("level" + (map_level + 1)); 
        // this.round_label.string = "round 0 / " + this.level_data.length; 
        // this.cur_round = 0; // 当前要产生的是第几波敌人 
        // this.cur_road_index = 0; // 在非随机模式下，当前的选择路径的索引 
        // this.cur_gen_total = 0; // 当前这波产生的总数 
        // this.cur_gen_now = 0; // 当前已经放出的怪物数量 
        // this.gen_round_enemy(); 
    }

    show_game_uchip () {
        // this.uchip_label.string = "" + ugame.get_uchip(); 
    }

    start () {
        // this.start_game(); 
        // this.door.open_the_door(null); 
    }

    show_game_failed () {
        // this.checkout.show_failed(); 
    }

    on_player_attacked (hurt: any) {
        // if (this.game_started === false) { 
            // return; 
        // } 
        // this.blood -= hurt; 
        // if (this.blood <= 0) { 
            // this.blood = 0; 
            // this.game_started = false; 
            // ugame.is_game_started = false; 
            // this.show_game_failed(); 
        // } 
        // this.blood_label.string = "" + this.blood; // 更新当前的血量 
    }

    gen_one_enemy () {
        // if (this.game_started === false) { 
            // return; 
        // } 
        // if (ugame.is_game_paused) { 
            // this.scheduleOnce(this.gen_one_enemy.bind(this), this.cur_schedule_time); 
            // return; 
        // } 
        // var cur_round_params = this.level_data[this.cur_round]; 
        // var type = cur_round_params.type[this.cur_gen_now]; 
        // var road_set = cur_round_params.road_set; 
        // var map_road_set = ugame.get_map_road_set(); 
        // var enemy = cc.instantiate(this.enemy_prefabs[type]); 
        // enemy.active = true; 
        // this.map_root.addChild(enemy); 
        // ugame.add_ememy(enemy); 
        // var actor = enemy.getComponent("actor"); 
        // var index = 0; // 跑的地图路径的索引 
        // if (cur_round_params.random_road) { 
            // var random_index = Math.random() * road_set.length; // [0, road_set.length] 
            // random_index = Math.floor(random_index); 
            // if (random_index >= road_set.length) { 
                // random_index = road_set.length - 1; 
            // } 
            // index = road_set[random_index]; 
        // } 
        // else { 
            // index = this.cur_road_index; 
            // this.cur_road_index ++; 
            // if (this.cur_road_index > road_set.length) { 
                // this.cur_road_index = 0; 
            // } 
            // index = road_set[index]; 
        // } 
        // if (index >= map_road_set.length) { 
            // index = 0; 
        // }  
        // var road_data = map_road_set[index]; 
        // actor.set_actor_params(cur_round_params.actor_params); 
        // actor.gen_at_road(road_data); 
        // if (this.cur_gen_now === 0) { 
            // this.round_label.string = "round " + (this.cur_round + 1) + " / " + this.level_data.length; 
        // } 
        // this.cur_gen_now ++; 
        // if (this.cur_gen_now == this.cur_gen_total) { // 放下一波敌人 
            // this.cur_round ++; 
            // this.gen_round_enemy(); 
        // } 
        // else { 
            // var time = cur_round_params.gen_time_set[this.cur_gen_now]; 
            // this.cur_schedule_time = time; 
            // this.scheduleOnce(this.gen_one_enemy.bind(this), time); 
        // } 
    }

    think_level_pass () {
        // if (this.game_started === false ||  
            // this.all_enemy_gen === false || 
            // ugame.ememy_set.length > 0) { 
            // this.scheduleOnce(this.think_level_pass.bind(this), 0.5); 
            // return; 
        // } 
        // var cur_user = ugame.get_cur_user(); 
        // this.checkout.show_passed(cur_user.blood, this.blood); 
        // this.game_started = false; 
    }

    gen_round_enemy () {
        // if (this.cur_round >= this.level_data.length) { // 整个敌人已经产生完毕 
            // this.all_enemy_gen = true; // 生成完了。 
            // this.scheduleOnce(this.think_level_pass.bind(this), 0.5); 
            // return; 
        // } 
        // var cur_round_params = this.level_data[this.cur_round]; 
        // var time = cur_round_params.delay; 
        // var num = cur_round_params.num; 
        // this.cur_gen_total = num; 
        // this.cur_gen_now = 0; 
        // this.cur_road_index = 0; 
        // time += cur_round_params.gen_time_set[this.cur_gen_now]; 
        // this.cur_schedule_time = time; 
        // this.scheduleOnce(this.gen_one_enemy.bind(this), time); 
        // return; 
    }

    goto_roadmap_scene () {
        // if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。 
            // return; 
        // } 
        // this.checkout.node.active = false; 
        // sound_manager.play_effect("resources/sounds/click.wav"); 
        // this.go_back = true; 
        // this.door.close_the_door(function(){ 
            // cc.director.loadScene("roadmap_scene", function() { 
            // });     
        // }.bind(this)); 
    }

    on_pause_click () {
        // this.pause_root.active = true; 
        // ugame.is_game_paused = true; 
    }

    on_resume_game_click () {
        // this.pause_root.active = false; 
        // ugame.is_game_paused = false; 
    }

    on_setting_click () {
        // this.setting_root.active = true; 
        // ugame.is_game_paused = true; 
    }

    on_setting_close_click () {
        // this.setting_root.active = false; 
        // ugame.is_game_paused = false; 
    }

    on_setting_replay_click () {
        // this.setting_root.active = false; 
        // this.game_started = false; 
        // ugame.is_game_paused = false; 
        // this.on_replay_game_click(); 
    }

    on_replay_game_click () {
        // this.start_game(); 
    }

    on_start_game_click () {
        // if (this.game_started === true) { 
            // return; 
        // } 
        // this.game_started = true; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var sound_manager = require("sound_manager");
// var ugame = require("ugame");
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
//         enemy_prefabs: {
//             default: [],
//             type: cc.Prefab,
//         },
// 
//         game_map_set: {
//             default: [],
//             type: cc.Prefab,
//         },
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         // 以后随机播放背景音乐;
//         sound_manager.play_music("resources/sounds/music/game_bg1.mp3", true);
//         // end
//         
//         this.door = cc.find("UI_ROOT/loading_door").getComponent("loading_door");
//         this.go_back = false;
//         
//         this.pause_root = cc.find("UI_ROOT/anchor-center/pause_root");
//         this.pause_root.active = false;
//         
//         this.setting_root = cc.find("UI_ROOT/anchor-center/setting_root");
//         this.setting_root.active = false;
//         
//         this.blood_label = cc.find("UI_ROOT/anchor-lt/ugame_root/blood_label").getComponent(cc.Label);
//         this.uchip_label = cc.find("UI_ROOT/anchor-lt/ugame_root/uchip_label").getComponent(cc.Label);
//         this.round_label = cc.find("UI_ROOT/anchor-lt/ugame_root/round_label").getComponent(cc.Label);
//         
//         this.blood = 0;
//         this.game_started = false;
//         ugame.is_game_paused = false;
// 
//         this.map_root = cc.find("UI_ROOT/map_root");
//         
//         this.checkout = cc.find("UI_ROOT/checkout").getComponent("checkout");
//         
//         // this.game_map = cc.find("UI_ROOT/level1_map");
//         var map_level = ugame.get_cur_level();
//         // this.game_map = cc.find("UI_ROOT/level1_map");
//         if (map_level >= this.game_map_set.length) {
//             map_level = this.game_map_set.length - 1;
//         }
//         this.game_map = cc.instantiate(this.game_map_set[map_level]);
//         this.node.addChild(this.game_map);
//         // this.game_map.setLocalZOrder(-100);
//         this.game_map.zIndex = -100;
//         this.map_tag_root = this.game_map.getChildByName("tag_root");
//     },
//     
//     start_game: function() {
//         if (this.game_started === true) {
//             return;
//         }
//         
//         this.all_enemy_gen = false;
//         // 删除掉集合里面所有的敌人
//         ugame.clear_ememy_set();
//         // end 
//         // 取消掉所有的定时器
//         this.unscheduleAllCallbacks();
//         // end 
//         
//         // 取消掉所有的塔
//         for(var i = 0; i < this.map_tag_root.children.length; i ++) {
//             var tower_builder = this.map_tag_root.children[i].getComponent("tower_builder");
//             tower_builder.remove_builder_tower();
//         }
//         // end 
//         
//         // map_root
//         this.map_root.removeAllChildren();
//         // end 
//         
//         this.game_started = true;
//         ugame.is_game_started = true;
//         this.checkout.node.active = false; 
//         
//         var cur_user = ugame.get_cur_user();
//         this.blood = cur_user.blood;
//         // this.blood = 1;
//         // 同步我们的金币和血,当前第几波敌人
//         this.blood_label.string = "" + this.blood;
//         this.uchip_label.string = "" + ugame.get_uchip();
//         this.round_label.string = "round 0 / 7";
//         // end 
//         
// 
//         // 生成我们的第一个波怪物
//         this.map_level = ugame.get_cur_level();
//         var map_level = this.map_level;
//         if (map_level >= this.game_map_set.length) {
//             map_level = this.game_map_set.length - 1;
//         }
//         console.log("map_level #####", map_level, this.map_level);
// 
//         this.level_data = require("level" + (map_level + 1));
//         // this.level_data = require("level1");
//         this.round_label.string = "round 0 / " + this.level_data.length;
//         this.cur_round = 0; // 当前要产生的是第几波敌人
//         this.cur_road_index = 0; // 在非随机模式下，当前的选择路径的索引
//         this.cur_gen_total = 0; // 当前这波产生的总数
//         this.cur_gen_now = 0; // 当前已经放出的怪物数量
//         this.gen_round_enemy();
//         // end 
//     },
// 
//     show_game_uchip: function() {
//         this.uchip_label.string = "" + ugame.get_uchip();
//     },
// 
//     // 打开这个门;
//     start: function() {
//         this.start_game();
//         this.door.open_the_door(null);
//     },
//     
//     // 显示失败的画面
//     show_game_failed: function() {
//         this.checkout.show_failed();
//     },
//     
//     on_player_attacked: function(hurt) {
//         if (this.game_started === false) {
//             return;
//         }
//         
//         this.blood -= hurt;
//         if (this.blood <= 0) {
//             this.blood = 0;
//             // 游戏失败结束
//             this.game_started = false;
//             ugame.is_game_started = false;
//             this.show_game_failed();
//         }
//         this.blood_label.string = "" + this.blood; // 更新当前的血量
//     },
//     
//     gen_one_enemy: function() {
//         if (this.game_started === false) {
//             return;
//         }
//         
//         if (ugame.is_game_paused) {
//             this.scheduleOnce(this.gen_one_enemy.bind(this), this.cur_schedule_time);
//             return;
//         }
//         
//         var cur_round_params = this.level_data[this.cur_round];
//                 
//         var type = cur_round_params.type[this.cur_gen_now];
//         var road_set = cur_round_params.road_set;
// 
//         var map_road_set = ugame.get_map_road_set();
//         
//         var enemy = cc.instantiate(this.enemy_prefabs[type]);
//         enemy.active = true;
//         this.map_root.addChild(enemy);
//         
// 
//         ugame.add_ememy(enemy);
//         var actor = enemy.getComponent("actor");
//         
//         var index = 0; // 跑的地图路径的索引
//         if (cur_round_params.random_road) {
//             var random_index = Math.random() * road_set.length; // [0, road_set.length]
//             random_index = Math.floor(random_index);
//             if (random_index >= road_set.length) {
//                 random_index = road_set.length - 1;
//             }
//             index = road_set[random_index];
//         }
//         else {
//             index = this.cur_road_index;
//             this.cur_road_index ++;
//             if (this.cur_road_index > road_set.length) {
//                 this.cur_road_index = 0;
//             }
//             index = road_set[index];
//         }
//         
//         if (index >= map_road_set.length) {
//             index = 0;
//         } 
//         
//         
//         var road_data = map_road_set[index];
//         actor.set_actor_params(cur_round_params.actor_params);
//         actor.gen_at_road(road_data);
//         
//         if (this.cur_gen_now === 0) {
//             this.round_label.string = "round " + (this.cur_round + 1) + " / " + this.level_data.length;
//         }
//         
//         this.cur_gen_now ++;
//         if (this.cur_gen_now == this.cur_gen_total) { // 放下一波敌人
//             this.cur_round ++;
//             this.gen_round_enemy();
//         }
//         else {
//             var time = cur_round_params.gen_time_set[this.cur_gen_now];
//             this.cur_schedule_time = time;
//             this.scheduleOnce(this.gen_one_enemy.bind(this), time);
//         }
//     },
//     
//     think_level_pass: function() {
//         if (this.game_started === false || 
//             this.all_enemy_gen === false ||
//             ugame.ememy_set.length > 0) {
//             this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
//             return;
//         }
// 
// 
//         // 通关成功
//         var cur_user = ugame.get_cur_user();
//         this.checkout.show_passed(cur_user.blood, this.blood);
//         this.game_started = false;
//         // end 
//     },
// 
//     // 产生一波敌人
//     gen_round_enemy: function() {
//         if (this.cur_round >= this.level_data.length) { // 整个敌人已经产生完毕
//             this.all_enemy_gen = true; // 生成完了。
//             this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
//             return;
//         }
//         
//         var cur_round_params = this.level_data[this.cur_round];
//         var time = cur_round_params.delay;
//         var num = cur_round_params.num;
//         
//         
//         this.cur_gen_total = num;
//         this.cur_gen_now = 0;
//         // 在延时条件下的非随机选路的索引
//         this.cur_road_index = 0;
//         
//         time += cur_round_params.gen_time_set[this.cur_gen_now];
//         this.cur_schedule_time = time;
//         this.scheduleOnce(this.gen_one_enemy.bind(this), time);
//         return;
//     },
//     
//     // 跳转到home场景;
//     goto_roadmap_scene: function() {
//         if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
//             return;
//         }
//         this.checkout.node.active = false;
//         // 播放按钮的音效
//         sound_manager.play_effect("resources/sounds/click.wav");
//         
//         this.go_back = true;
//         this.door.close_the_door(function(){
//             cc.director.loadScene("roadmap_scene", function() {
//                 
//             });    
//         }.bind(this));
//     }, 
//     
//     // 游戏暂停
//     on_pause_click: function() {
//         this.pause_root.active = true;
//         ugame.is_game_paused = true;
//     },
//     // 游戏重新开始
//     on_resume_game_click: function() {
//         this.pause_root.active = false;
//         ugame.is_game_paused = false;
//     },
//     // end 
//     
//     on_setting_click: function() {
//         this.setting_root.active = true;
//         ugame.is_game_paused = true;
//     },
//     
//     on_setting_close_click: function() {
//         this.setting_root.active = false;
//         ugame.is_game_paused = false;
//     },
//     
//     on_setting_replay_click: function() {
//         this.setting_root.active = false;
//         this.game_started = false;
//         ugame.is_game_paused = false;
// 
//         this.on_replay_game_click();
//     },
//     
//     on_replay_game_click: function() {
//         this.start_game();
//     },
//     
//     on_start_game_click: function() {
//         if (this.game_started === true) {
//             return;
//         }
//         
//         
//         this.game_started = true;
//     },
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
