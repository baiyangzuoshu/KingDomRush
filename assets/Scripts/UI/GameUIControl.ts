// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { ResManagerPro } from "../../FrameWork/manager/ResManagerPro";
import { UIControl } from "../../FrameWork/ui/UIControl";
import GameDataManager from "../Data/GameDataManager";
import { GameUI } from "../EventName";
import Checkout from "../Game/Checkout";
import GuiTowerBuilder from "../Game/GuiTowerBuilder";
import TowerBuilder from "../Game/TowerBuilder";
import LoadingDoor from "../Tools/LoadingDoor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameUIControl extends UIControl {
    door:LoadingDoor=null;
    go_back:boolean=false;
    pause_root:cc.Node=null;
    setting_root:cc.Node=null;
    blood_label:cc.Label=null;
    uchip_label:cc.Label=null;
    round_label:cc.Label=null;
    blood:number=0;
    game_started:boolean=false;
    map_root:cc.Node=null;
    checkout:Checkout=null;
    game_map_set:Array<cc.Prefab>=[];
    game_map:cc.Node=null;
    map_tag_root:cc.Node=null;
    all_enemy_gen:boolean=false;
    map_level:number=0;
    level_data:Array<any>=[];
    cur_round:number=0;
    cur_road_index:number=0;
    cur_gen_total:number=0;
    cur_gen_now:number=0;
    cur_schedule_time:number=0;
    enemy_prefabs:Array<cc.Prefab>=[];
    gui_tower_builder:GuiTowerBuilder=null;
    // use this for initialization
    async onLoad () {
        super.onLoad();
        // 以后随机播放背景音乐;
        //sound_manager.play_music("resources/sounds/music/game_bg1.mp3", true);
        // end
        
        await this.loadData();
        
        this.door = this.getChildByUrl("loading_door").addComponent(LoadingDoor);
        this.door.setData(0,0.4);
        this.go_back = false;
        
        this.pause_root = this.getChildByUrl("anchor-center/pause_root");
        this.pause_root.active = false;
        
        this.setting_root = this.getChildByUrl("anchor-center/setting_root");
        this.setting_root.active = false;

        this.gui_tower_builder = this.getChildByUrl("gui_tower_builder").addComponent(GuiTowerBuilder);
        
        this.blood_label = this.getChildByUrl("anchor-lt/ugame_root/blood_label").getComponent(cc.Label);
        this.uchip_label = this.getChildByUrl("anchor-lt/ugame_root/uchip_label").getComponent(cc.Label);
        this.round_label = this.getChildByUrl("anchor-lt/ugame_root/round_label").getComponent(cc.Label);
        
        this.blood = 0;
        this.game_started = false;
        GameDataManager.getInstance().is_game_paused = false;

        this.map_root = this.getChildByUrl("map_root");
        this.checkout = this.getChildByUrl("checkout").addComponent(Checkout);
        
        var map_level = GameDataManager.getInstance().get_cur_level();
        if (map_level >= this.game_map_set.length) {
            map_level = this.game_map_set.length - 1;
        }
        this.game_map = cc.instantiate(this.game_map_set[map_level]);
        this.node.addChild(this.game_map);
        this.game_map.zIndex = -100;

        this.map_tag_root = this.game_map.getChildByName("tag_root");

        EventManager.getInstance().addEventListener(GameUI.show_tower_builder, this.show_tower_builder, this);
    }

    protected onDestroy(): void {
        EventManager.getInstance().removeEventListener(GameUI.show_tower_builder, this.show_tower_builder, this);
    }

    async loadData(){
        for(let i=1;i<=3;i++){
            let mapPrefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Map/levelmap"+i,cc.Prefab) as cc.Prefab;
            this.game_map_set.push(mapPrefab);
        }
        let ememy1=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_bear",cc.Prefab) as cc.Prefab;
        let ememy2=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_forkman",cc.Prefab) as cc.Prefab;
        let ememy3=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small1",cc.Prefab) as cc.Prefab;
        let ememy4=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_gorilla",cc.Prefab) as cc.Prefab;
        let ememy5=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small2",cc.Prefab) as cc.Prefab;
        let ememy6=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_carry",cc.Prefab) as cc.Prefab;
        let ememy7=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small3",cc.Prefab) as cc.Prefab;
        this.enemy_prefabs.push(ememy1);
        this.enemy_prefabs.push(ememy2);
        this.enemy_prefabs.push(ememy3);
        this.enemy_prefabs.push(ememy4);
        this.enemy_prefabs.push(ememy5);
        this.enemy_prefabs.push(ememy6);
        this.enemy_prefabs.push(ememy7);
    }
    
    start_game() {
        if (this.game_started === true) {
            return;
        }
        
        this.all_enemy_gen = false;
        // 删除掉集合里面所有的敌人
        GameDataManager.getInstance().clear_ememy_set();
        // end 
        // 取消掉所有的定时器
        this.unscheduleAllCallbacks();
        // end 
        
        // 取消掉所有的塔
        for(var i = 0; i < this.map_tag_root.children.length; i ++) {
            var tower_builder = this.map_tag_root.children[i].addComponent(TowerBuilder);
            tower_builder.remove_builder_tower();
            tower_builder.setData(i+1);
        }
        // end 
        
        // map_root
        this.map_root.removeAllChildren();
        // end 
        
        this.game_started = true;
        GameDataManager.getInstance().is_game_started = true;
        this.checkout.node.active = false; 
        
        var cur_user = GameDataManager.getInstance().get_cur_user();
        this.blood = cur_user.blood;
        // this.blood = 1;
        // 同步我们的金币和血,当前第几波敌人
        this.blood_label.string = "" + this.blood;
        this.uchip_label.string = "" + GameDataManager.getInstance().get_uchip();
        this.round_label.string = "round 0 / 7";
        // end 
        

        // 生成我们的第一个波怪物
        this.map_level = GameDataManager.getInstance().get_cur_level();
        var map_level = this.map_level;
        if (map_level >= this.game_map_set.length) {
            map_level = this.game_map_set.length - 1;
        }
        console.log("map_level #####", map_level, this.map_level);

        this.level_data = []//require("level" + (map_level + 1));
        // this.level_data = require("level1");
        this.round_label.string = "round 0 / " + this.level_data.length;
        this.cur_round = 0; // 当前要产生的是第几波敌人
        this.cur_road_index = 0; // 在非随机模式下，当前的选择路径的索引
        this.cur_gen_total = 0; // 当前这波产生的总数
        this.cur_gen_now = 0; // 当前已经放出的怪物数量
        //this.gen_round_enemy();
        // end 
    }

    show_tower_builder(data) {
        let is_builded = data.is_builded;
        let tower_builder = data.tower_builder;
        var s = cc.scaleTo(0.3, 1).easing(cc.easeBackOut());
        console.log("show_tower_builder",is_builded)
        if (is_builded === false) { // 还没有塔，所以要show builder
            this.gui_tower_builder.show_tower_builder(tower_builder);
            this.gui_tower_builder.node.scale = 0;
            this.gui_tower_builder.node.runAction(s);
        }
        else { // 已经创建，所以要显示撤销
            this.gui_tower_builder.show_tower_undo(tower_builder);
            this.gui_tower_builder.node.scale = 0;
            this.gui_tower_builder.node.runAction(s);
        }
    }

    show_game_uchip() {
        this.uchip_label.string = "" + GameDataManager.getInstance().get_uchip();
    }

    // 打开这个门;
    start() {
        this.start_game();
        this.door.open_the_door(null);
    }
    
    // 显示失败的画面
    show_game_failed() {
        this.checkout.show_failed();
    }
    
    on_player_attacked(hurt) {
        if (this.game_started === false) {
            return;
        }
        
        this.blood -= hurt;
        if (this.blood <= 0) {
            this.blood = 0;
            // 游戏失败结束
            this.game_started = false;
            GameDataManager.getInstance().is_game_started = false;
            this.show_game_failed();
        }
        this.blood_label.string = "" + this.blood; // 更新当前的血量
    }
    
    gen_one_enemy() {
        if (this.game_started === false) {
            return;
        }
        
        if (GameDataManager.getInstance().is_game_paused) {
            this.scheduleOnce(this.gen_one_enemy.bind(this), this.cur_schedule_time);
            return;
        }
        
        var cur_round_params = this.level_data[this.cur_round];
                
        var type = cur_round_params.type[this.cur_gen_now];
        var road_set = cur_round_params.road_set;

        var map_road_set = GameDataManager.getInstance().get_map_road_set();
        
        var enemy = cc.instantiate(this.enemy_prefabs[type]);
        enemy.active = true;
        this.map_root.addChild(enemy);
        

        GameDataManager.getInstance().add_ememy(enemy);
        var actor = enemy.getComponent("actor");
        
        var index = 0; // 跑的地图路径的索引
        if (cur_round_params.random_road) {
            var random_index = Math.random() * road_set.length; // [0, road_set.length]
            random_index = Math.floor(random_index);
            if (random_index >= road_set.length) {
                random_index = road_set.length - 1;
            }
            index = road_set[random_index];
        }
        else {
            index = this.cur_road_index;
            this.cur_road_index ++;
            if (this.cur_road_index > road_set.length) {
                this.cur_road_index = 0;
            }
            index = road_set[index];
        }
        
        if (index >= map_road_set.length) {
            index = 0;
        } 
        
        
        var road_data = map_road_set[index];
        actor.set_actor_params(cur_round_params.actor_params);
        actor.gen_at_road(road_data);
        
        if (this.cur_gen_now === 0) {
            this.round_label.string = "round " + (this.cur_round + 1) + " / " + this.level_data.length;
        }
        
        this.cur_gen_now ++;
        if (this.cur_gen_now == this.cur_gen_total) { // 放下一波敌人
            this.cur_round ++;
            this.gen_round_enemy();
        }
        else {
            var time = cur_round_params.gen_time_set[this.cur_gen_now];
            this.cur_schedule_time = time;
            this.scheduleOnce(this.gen_one_enemy.bind(this), time);
        }
    }
    
    think_level_pass() {
        if (this.game_started === false || 
            this.all_enemy_gen === false ||
            GameDataManager.getInstance().ememy_set.length > 0) {
            this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
            return;
        }


        // 通关成功
        var cur_user = GameDataManager.getInstance().get_cur_user();
        this.checkout.show_passed(cur_user.blood, this.blood);
        this.game_started = false;
        // end 
    }

    // 产生一波敌人
    gen_round_enemy() {
        if (this.cur_round >= this.level_data.length) { // 整个敌人已经产生完毕
            this.all_enemy_gen = true; // 生成完了。
            this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
            return;
        }
        
        var cur_round_params = this.level_data[this.cur_round];
        var time = cur_round_params.delay;
        var num = cur_round_params.num;
        
        
        this.cur_gen_total = num;
        this.cur_gen_now = 0;
        // 在延时条件下的非随机选路的索引
        this.cur_road_index = 0;
        
        time += cur_round_params.gen_time_set[this.cur_gen_now];
        this.cur_schedule_time = time;
        this.scheduleOnce(this.gen_one_enemy.bind(this), time);
        return;
    }
    
    // 跳转到home场景;
    goto_roadmap_scene() {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        this.checkout.node.active = false;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        
        this.go_back = true;
        this.door.close_the_door(function(){
            cc.director.loadScene("roadmap_scene", function() {
                
            });    
        }.bind(this));
    } 
    
    // 游戏暂停
    on_pause_click() {
        this.pause_root.active = true;
        GameDataManager.getInstance().is_game_paused = true;
    }
    // 游戏重新开始
    on_resume_game_click() {
        this.pause_root.active = false;
        GameDataManager.getInstance().is_game_paused = false;
    }
    // end 
    
    on_setting_click() {
        this.setting_root.active = true;
        GameDataManager.getInstance().is_game_paused = true;
    }
    
    on_setting_close_click() {
        this.setting_root.active = false;
        GameDataManager.getInstance().is_game_paused = false;
    }
    
    on_setting_replay_click() {
        this.setting_root.active = false;
        this.game_started = false;
        GameDataManager.getInstance().is_game_paused = false;

        this.on_replay_game_click();
    }
    
    on_replay_game_click() {
        this.start_game();
    }
    
    on_start_game_click() {
        if (this.game_started === true) {
            return;
        }
        
        
        this.game_started = true;
    }
}
