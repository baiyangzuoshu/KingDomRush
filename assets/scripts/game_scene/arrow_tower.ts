/*
this.test_shoot_time += dt;
if (this.test_shoot_time < 2.5) {
return;
}
this.test_shoot_time -= 2.5;

// 反射 (350, 300), (350, -300)
if (Math.random() < 0.5) {
this.shoot_at(cc.p(350, 300));
}
else {
this.shoot_at(cc.p(350, -300));
}*/
import { _decorator, SpriteFrame, Component, Prefab } from 'cc';
import { ugame } from 'ugame';
import { arrow_tower_params } from 'arrow_tower_params';
const { ccclass, property } = _decorator;

@ccclass('arrow_tower_skin')
export class arrow_tower_skin {
    @property(SpriteFrame)
    public tower_bg = null;
    @property(SpriteFrame)
    public up_idle = null;
    @property(SpriteFrame)
    public down_idle = null;
    @property([SpriteFrame])
    public up_anim = [];
    @property([SpriteFrame])
    public down_anim = [];
    @property
    public man_ypos = 29;
}


@ccclass('ArrowTower')
export class ArrowTower extends Component {
    @property
    public tower_level = 1;
    @property([arrow_tower_skin])
    public level_tower_skin_res = [];
    @property
    public anim_duration = 0.1;
    @property(Prefab)
    public arrow_bullet_prefab = null;
    @property
    public boot_root_path = 'UI_ROOT/map_root';

    _set_tower_skin_by_level () {
        // this.rhs.y = this.level_tower_skin_res[this.tower_level - 1].man_ypos; 
        // this.lhs.y = this.level_tower_skin_res[this.tower_level - 1].man_ypos; 
        // var s = this.node.getComponent(cc.Sprite); 
        // s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].tower_bg; 
        // if (Math.random() < 0.5) { 
            // this._set_anim_idle(this.lhs, 0);     
            // this._set_anim_idle(this.rhs, 0); 
        // } 
        // else { 
            // this._set_anim_idle(this.lhs, 1); 
            // this._set_anim_idle(this.rhs, 1); 
        // } 
    }

    _set_anim_idle (man: any, dir: any) {
        // var s = man.getComponent(cc.Sprite); 
        // if (dir === 0) { // up idle 
            // s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].up_idle; 
        // } 
        // else { 
            // s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].down_idle; 
        // } 
    }

    onLoad () {
        // this.tower_level = 1; 
        // this.cur_anchor_index = 0; // 0表示 lhs, 发射， 1, 表示的是rhs发射 
        // this.lhs = this.node.getChildByName("lhs"); 
        // this.rhs = this.node.getChildByName("rhs"); 
        // this._set_tower_skin_by_level(); 
        // this.bullet_root = cc.find(this.boot_root_path); 
    }

    _shoot_anim_at (man: any, w_dst_pos: any) {
        // var f_anim = man.getComponent("frame_anim"); 
        // if (!f_anim) { 
            // f_anim = man.addComponent("frame_anim"); 
        // } 
        // var w_pos = man.convertToWorldSpaceAR(cc.p(0, 0)); 
        // var dir = w_dst_pos.sub(w_pos); 
        // if (dir.y > 0) { // 上的动画 
            // f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].up_anim; 
            // f_anim.duration = this.anim_duration; 
            // f_anim.play_once(function(){ 
                // this._set_anim_idle(man, 0); 
            // }.bind(this)); 
        // } 
        // else { // 下的动画 
            // f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].down_anim; 
            // f_anim.duration = this.anim_duration; 
            // f_anim.play_once(function(){ 
                // this._set_anim_idle(man, 1); 
            // }.bind(this)); 
        // } 
        // var center_pos = this.tower_center_pos(); 
        // var search_R = arrow_tower_params[this.tower_level - 1].search_R; 
        // var enemy = ugame.search_enemy(center_pos, search_R); 
        // if (enemy) { 
            // w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0)); 
        // } 
        // var bullet = cc.instantiate(this.arrow_bullet_prefab); 
        // this.bullet_root.addChild(bullet);     
        // bullet.active = true;     
        // bullet.getComponent("arrow_bullet").shoot_at(this.tower_level, w_pos, w_dst_pos, enemy); 
    }

    shoot_at (w_dst_pos: any) {
        // if (this.cur_anchor_index === 0) { 
            // this._shoot_anim_at(this.lhs, w_dst_pos); 
        // } 
        // else { 
            // this._shoot_anim_at(this.rhs, w_dst_pos); 
        // } 
        // this.cur_anchor_index ++; 
        // if (this.cur_anchor_index >= 2) { 
            // this.cur_anchor_index = 0; 
        // } 
    }

    tower_center_pos () {
        // var center_pos = this.node.getPosition(); 
        // center_pos.x += -8; 
        // center_pos.y += -4; 
        // return center_pos; 
    }

    tower_think () {
        // var center_pos = this.tower_center_pos(); 
        // var search_R = arrow_tower_params[this.tower_level - 1].search_R; 
        // var enemy = ugame.search_enemy(center_pos, search_R); 
        // var time = 0.1; 
        // if (!ugame.is_game_paused && enemy) { 
            // var w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0)); 
            // this.shoot_at(w_dst_pos); 
            // time = 1; 
        // } 
        // this.scheduleOnce(this.tower_think.bind(this), time); 
    }

    start () {
        // this.scheduleOnce(this.tower_think.bind(this), 0.1); 
    }

    update (dt: any) {
    }

    upgrade_tower () {
        // if(this.tower_level >= 4) { // 表示全部升级完成 
            // return this.tower_level; 
        // } 
        // this.tower_level ++; 
        // this._set_tower_skin_by_level(); 
        // return this.tower_level; 
    }

    get_tower_level () {
        // return this.tower_level; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var ugame = require("ugame");
// var arrow_tower_params = require("arrow_tower_params");
// 
// var arrow_tower_skin = cc.Class({
//     name: "arrow_tower_skin", 
//     
//     properties: {
//         tower_bg: {
//             type: cc.SpriteFrame,
//             default: null,
//         }, 
//         
//         up_idle: {
//             type: cc.SpriteFrame,
//             default: null,
//         }, 
//         
//         down_idle: {
//             type: cc.SpriteFrame,
//             default: null,
//         }, 
//         
//         up_anim: {
//             default: [],
//             type: cc.SpriteFrame,
//         }, 
//         
//         down_anim: {
//             default: [],
//             type: cc.SpriteFrame,
//         },
//         
//         
//         man_ypos: 29,
//     }
// })
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
//         tower_level: 1, // 表示我们弓箭塔的级别; 1, 2, 3, 4, 5
//         
//         level_tower_skin_res: {
//             default: [],
//             type: arrow_tower_skin, 
//             
//         },
//         
//         anim_duration: 0.1, // 弓箭手播放的动画时间间隔
//         
//         arrow_bullet_prefab: {
//             default: null,
//             type: cc.Prefab, // 保存的是子弹的预制体对象
//         },
//         boot_root_path: "UI_ROOT/map_root",
//     },
//     
//     _set_tower_skin_by_level: function() {
//         // 调整人物的位置
//         this.rhs.y = this.level_tower_skin_res[this.tower_level - 1].man_ypos;
//         this.lhs.y = this.level_tower_skin_res[this.tower_level - 1].man_ypos;
//         // end 
//         
//         // 修改塔的背景
//         var s = this.node.getComponent(cc.Sprite);
//         s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].tower_bg;
//         // end 
//         
//         if (Math.random() < 0.5) {
//         // if (1) {
//             this._set_anim_idle(this.lhs, 0);    
//             this._set_anim_idle(this.rhs, 0);
//         }
//         else {
//             this._set_anim_idle(this.lhs, 1);
//             this._set_anim_idle(this.rhs, 1);
//         }
//     },
//     
//     // dir 为0，表示弓箭手向上idle, 否则，dir 表示向下的idle
//     _set_anim_idle: function(man, dir) {
//         var s = man.getComponent(cc.Sprite);
//         if (dir === 0) { // up idle
//             s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].up_idle;
//         }
//         else {
//             s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].down_idle;
//         }
//     }, 
//     
//     // use this for initialization
//     onLoad: function () {
//         this.tower_level = 1;
//         this.cur_anchor_index = 0; // 0表示 lhs, 发射， 1, 表示的是rhs发射
//         this.lhs = this.node.getChildByName("lhs");
//         this.rhs = this.node.getChildByName("rhs");
//         
// 
//         this._set_tower_skin_by_level();
//         
//         this.bullet_root = cc.find(this.boot_root_path);
//     },
//     
//     // w_dst_pos 目标的世界坐标, man是哪个弓箭手播放动画，射出弓箭
//     _shoot_anim_at: function(man, w_dst_pos) {
//         var f_anim = man.getComponent("frame_anim");
//         if (!f_anim) {
//             f_anim = man.addComponent("frame_anim");
//         }
//         
//         var w_pos = man.convertToWorldSpaceAR(cc.p(0, 0));
//         // var dir = cc.pSub(w_dst_pos, w_pos);
//         var dir = w_dst_pos.sub(w_pos);
//         // 判断当前是要播放上，还是下
//         if (dir.y > 0) { // 上的动画
//             f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].up_anim;
//             f_anim.duration = this.anim_duration;
//             f_anim.play_once(function(){
//                 this._set_anim_idle(man, 0);
//             }.bind(this));
//         }
//         else { // 下的动画
//             f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].down_anim;
//             f_anim.duration = this.anim_duration;
//             f_anim.play_once(function(){
//                 this._set_anim_idle(man, 1);
//             }.bind(this));
//         }
//         // end 
//         
//         var center_pos = this.tower_center_pos();
//         var search_R = arrow_tower_params[this.tower_level - 1].search_R;
//         var enemy = ugame.search_enemy(center_pos, search_R);
//         if (enemy) {
//             w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//         }
//         // 生成我们的子弹对象，让它发射到目标点
//         var bullet = cc.instantiate(this.arrow_bullet_prefab);
//         this.bullet_root.addChild(bullet);    
//         bullet.active = true;    
//         // end 
//         bullet.getComponent("arrow_bullet").shoot_at(this.tower_level, w_pos, w_dst_pos, enemy);
//         // end 
//     },
//     
//     shoot_at: function(w_dst_pos) {
//         // 交叉两个弓箭手来发射弓箭
//         if (this.cur_anchor_index === 0) {
//             this._shoot_anim_at(this.lhs, w_dst_pos);
//         }
//         else {
//             this._shoot_anim_at(this.rhs, w_dst_pos);
//         }
//         // end 
//         
//         this.cur_anchor_index ++;
//         if (this.cur_anchor_index >= 2) {
//             this.cur_anchor_index = 0;
//         }
//     }, 
//     
//     tower_center_pos: function() {
//         var center_pos = this.node.getPosition();
//         // 根据tower_builder里面的tower的位置来调整的
//         center_pos.x += -8;
//         center_pos.y += -4;
//         return center_pos;
//     },
// 
//     tower_think: function() {
//         var center_pos = this.tower_center_pos();
//         var search_R = arrow_tower_params[this.tower_level - 1].search_R;
//         var enemy = ugame.search_enemy(center_pos, search_R);
//         var time = 0.1;
// 
//         if (!ugame.is_game_paused && enemy) {
//             var w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//             this.shoot_at(w_dst_pos);
//             time = 1;
//         }
//         this.scheduleOnce(this.tower_think.bind(this), time);
//     },
// 
//     start: function() {
//         this.scheduleOnce(this.tower_think.bind(this), 0.1);
//     },
// 
//     // called every frame, uncomment this function to activate update callback
//     update: function (dt) {
//         /*
//         this.test_shoot_time += dt;
//         if (this.test_shoot_time < 2.5) {
//             return;
//         }
//         this.test_shoot_time -= 2.5;
//         
//         // 反射 (350, 300), (350, -300)
//         if (Math.random() < 0.5) {
//             this.shoot_at(cc.p(350, 300));
//         }
//         else {
//             this.shoot_at(cc.p(350, -300));
//         }*/
//         // end 
//     },
//     
//     upgrade_tower: function() {
//         if(this.tower_level >= 4) { // 表示全部升级完成
//             return this.tower_level;
//         }
//         
//         this.tower_level ++;
//         this._set_tower_skin_by_level();
//         return this.tower_level;
//     },
//     
//     get_tower_level: function() {
//         return this.tower_level;
//     },
// });
