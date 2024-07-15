import { _decorator, SpriteFrame, Component, Prefab } from 'cc';
import { ugame } from 'ugame';
import { warlock_tower_params } from 'warlock_tower_params';
const { ccclass, property } = _decorator;

@ccclass('warlock_skin')
export class warlock_skin {
    @property([SpriteFrame])
    public tower_anim = [];
    @property
    public tower_anim_duration = 0.1;
    @property([SpriteFrame])
    public shoot_up_anim = [];
    @property
    public up_anim_duration = 0.1;
    @property([SpriteFrame])
    public shoot_down_anim = [];
    @property
    public down_anim_duration = 0.1;
    @property
    public xpos = -1;
    @property
    public ypos = 19;
}


@ccclass('WarlockTower')
export class WarlockTower extends Component {
    @property
    public tower_level = 1;
    @property([warlock_skin])
    public tower_skin_set = [];
    @property(Prefab)
    public bullet_prefab = null;
    @property
    public bullet_root_path = 'UI_ROOT/map_root/bullet_root';

    onLoad () {
        // this.tower_level = 1; 
        // this.anim = this.node.getChildByName("anim"); 
        // this.anim.addComponent("frame_anim"); 
        // this.man = this.node.getChildByName("man"); 
        // this.man.addComponent("frame_anim"); 
        // this._set_tower_idle(); 
        // this._set_man_idle(true); 
        // this.bullet_root = cc.find(this.bullet_root_path); 
    }

    _set_tower_idle () {
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.tower_skin_set[this.tower_level - 1].tower_anim[0]; 
    }

    _set_man_idle (b_up: any) {
        // this.man.x = this.tower_skin_set[this.tower_level - 1].xpos; 
        // this.man.y = this.tower_skin_set[this.tower_level - 1].ypos; 
        // var s = this.man.getComponent(cc.Sprite); 
        // if (b_up) { 
            // s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_up_anim[0]; 
        // } 
        // else { 
            // s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_down_anim[0]; 
        // } 
    }

    _play_tower_anim () {
        // var frame_anim = this.anim.getComponent("frame_anim"); 
        // frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].tower_anim; 
        // frame_anim.duration = this.tower_skin_set[this.tower_level - 1].tower_anim_duration; 
        // frame_anim.play_once(this._set_tower_idle.bind(this)); 
    }

    _shoot_bullet (w_dst_pos: any, b_up: any) {
        // var delay_set_up = [0.6, 0.6, 0.6, 0.6]; 
        // var delay_set_down = [0.5, 0.5, 0.5, 0.5]; 
        // var start_pos_up = [cc.p(6, 6), cc.p(6, 6), cc.p(6, 6), cc.p(6, 6), cc.p(6, 6)]; 
        // var start_pos_down = [cc.p(-5, 8), cc.p(-5, 8), cc.p(-5, 8), cc.p(-5, 8)]; 
        // var time, start_pos; 
        // if (b_up) { 
            // time = delay_set_up[this.tower_level - 1]; 
            // start_pos = start_pos_up[this.tower_level - 1]; 
        // } 
        // else { 
            // time = delay_set_down[this.tower_level - 1]; 
            // start_pos = start_pos_down[this.tower_level - 1]; 
        // } 
        // var delay = cc.delayTime(time); 
        // var func = cc.callFunc(function(){ 
            // var center_pos = this.tower_center_pos(); 
            // var search_R = warlock_tower_params[this.tower_level - 1].search_R; 
            // var enemy = ugame.search_enemy(center_pos, search_R); 
             // if (enemy) { 
                // w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0)); 
            // } 
            // var w_start_pos = this.man.convertToWorldSpaceAR(start_pos); 
            // var bullet = cc.instantiate(this.bullet_prefab); 
            // this.bullet_root.addChild(bullet); 
            // bullet.active = true; 
            // bullet.getComponent("warlock_bullet").shoot_at(this.tower_level, w_start_pos, w_dst_pos, enemy); 
        // }.bind(this), this.node); 
        // var seq = cc.sequence([delay, func]); 
        // this.node.runAction(seq); 
    }

    _play_shoot_man_anim (w_dst_pos: any) {
        // var frame_anim = this.man.getComponent("frame_anim"); 
        // var w_start_pos = this.man.convertToWorldSpaceAR(cc.p(0, 0)); 
        // var b_up = w_start_pos.y < w_dst_pos.y; 
        // if (b_up) { // 上的动画 
            // frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_up_anim; 
            // frame_anim.duration = this.tower_skin_set[this.tower_level - 1].up_anim_duration; 
        // } 
        // else { // 下的动画 
            // frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_down_anim; 
            // frame_anim.duration = this.tower_skin_set[this.tower_level - 1].down_anim_duration; 
        // } 
        // frame_anim.play_once(function() { 
            // this._set_man_idle(b_up); 
        // }.bind(this)); 
        // this._shoot_bullet(w_dst_pos, b_up); 
    }

    shoot_at (w_dst_pos: any) {
        // this._play_tower_anim(); 
        // this._play_shoot_man_anim(w_dst_pos); 
    }

    tower_center_pos () {
        // var center_pos = this.node.getPosition(); 
        // center_pos.x += -5; 
        // center_pos.y += 7; 
        // return center_pos; 
    }

    tower_think () {
        // var center_pos = this.tower_center_pos(); 
        // var search_R = warlock_tower_params[this.tower_level - 1].search_R; 
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

    upgrade_tower () {
        // if (this.tower_level >= 4) { 
            // return this.tower_level; 
        // } 
        // this.tower_level ++; 
        // this._set_tower_idle(); 
        // this._set_man_idle(true); 
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
// var warlock_tower_params = require("warlock_tower_params");
// 
// var warlock_skin = cc.Class({
//     name: "warlock_skin",
//     properties: {
//         tower_anim: {
//             default: [],
//             type: cc.SpriteFrame, // 塔动画所用到的资源
//         },
//         tower_anim_duration: 0.1,
//         
//         shoot_up_anim: {  // 向上发射的人的动画
//             default: [],
//             type: cc.SpriteFrame, 
//         },
//         up_anim_duration: 0.1,
//         
//         
//         shoot_down_anim: { // 向下发射的人的动画
//             default: [],
//             type: cc.SpriteFrame,
//         },
//         down_anim_duration: 0.1,
//         
//         xpos: -1,
//         ypos: 19,
//     }
// });
// 
// cc.Class({
//     extends: cc.Component,
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
//         
//         tower_level: 1, // 法师塔同样有4个级别
//         tower_skin_set: {
//             default: [],
//             type: warlock_skin,
//         }, 
//         
//         bullet_prefab: {
//             default: null,
//             type: cc.Prefab,
//         },
//         
//         bullet_root_path: "UI_ROOT/map_root/bullet_root",
//     },
//     
//     // use this for initialization
//     onLoad: function () {
//         this.tower_level = 1;
//         
//         this.anim = this.node.getChildByName("anim");
//         this.anim.addComponent("frame_anim");
//         this.man = this.node.getChildByName("man");
//         this.man.addComponent("frame_anim");
//         
//         this._set_tower_idle();
//         this._set_man_idle(true);
//         
//         this.bullet_root = cc.find(this.bullet_root_path);
//     },
//     
//     _set_tower_idle: function() {
//         var s = this.anim.getComponent(cc.Sprite);
//         // 塔动画的 第0张图，作为我们的idle
//         s.spriteFrame = this.tower_skin_set[this.tower_level - 1].tower_anim[0];
//     },
//     
//     _set_man_idle: function(b_up) {
//         this.man.x = this.tower_skin_set[this.tower_level - 1].xpos;
//         this.man.y = this.tower_skin_set[this.tower_level - 1].ypos;
//         var s = this.man.getComponent(cc.Sprite);
//         // 塔动画的 第0张图，作为我们的idle
//         if (b_up) {
//             s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_up_anim[0];
//         }
//         else {
//             s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_down_anim[0];
//         }
//         
//     },
//     
//     _play_tower_anim: function() {
//         var frame_anim = this.anim.getComponent("frame_anim");
//         frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].tower_anim;
//         frame_anim.duration = this.tower_skin_set[this.tower_level - 1].tower_anim_duration;
//         frame_anim.play_once(this._set_tower_idle.bind(this));
//     },
//     
//     
//     // 发射子弹必须要配合动画的时机
//     _shoot_bullet: function(w_dst_pos, b_up) {
//         var delay_set_up = [0.6, 0.6, 0.6, 0.6];
//         var delay_set_down = [0.5, 0.5, 0.5, 0.5];
//         var start_pos_up = [cc.p(6, 6), cc.p(6, 6), cc.p(6, 6), cc.p(6, 6), cc.p(6, 6)];
//         var start_pos_down = [cc.p(-5, 8), cc.p(-5, 8), cc.p(-5, 8), cc.p(-5, 8)];
//         
//         var time, start_pos;
//         if (b_up) {
//             time = delay_set_up[this.tower_level - 1];
//             start_pos = start_pos_up[this.tower_level - 1];
//         }
//         else {
//             time = delay_set_down[this.tower_level - 1];
//             start_pos = start_pos_down[this.tower_level - 1];
//         }
//         
//         var delay = cc.delayTime(time);
//         var func = cc.callFunc(function(){
//             var center_pos = this.tower_center_pos();
//             var search_R = warlock_tower_params[this.tower_level - 1].search_R;
//             var enemy = ugame.search_enemy(center_pos, search_R);
//              if (enemy) {
//                 w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//                 // 计算提前量
//             }
// 
//             var w_start_pos = this.man.convertToWorldSpaceAR(start_pos);
//             var bullet = cc.instantiate(this.bullet_prefab);
//             this.bullet_root.addChild(bullet);
//             bullet.active = true;
//             bullet.getComponent("warlock_bullet").shoot_at(this.tower_level, w_start_pos, w_dst_pos, enemy);
//         }.bind(this), this.node);
//         
//         var seq = cc.sequence([delay, func]);
//         this.node.runAction(seq);
//     },
//     
//     _play_shoot_man_anim: function(w_dst_pos) {
//         var frame_anim = this.man.getComponent("frame_anim");
//         
//         var w_start_pos = this.man.convertToWorldSpaceAR(cc.p(0, 0));
//         var b_up = w_start_pos.y < w_dst_pos.y;
//         
//         if (b_up) { // 上的动画
//             frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_up_anim;
//             frame_anim.duration = this.tower_skin_set[this.tower_level - 1].up_anim_duration;
//         }
//         else { // 下的动画
//             frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_down_anim;
//             frame_anim.duration = this.tower_skin_set[this.tower_level - 1].down_anim_duration;
//         }
//         
//         frame_anim.play_once(function() {
//             this._set_man_idle(b_up);
//         }.bind(this));
//         
//         this._shoot_bullet(w_dst_pos, b_up);
//     },
//     
//     // 发射子弹到目的地
//     shoot_at: function(w_dst_pos) {
//         this._play_tower_anim();
//         this._play_shoot_man_anim(w_dst_pos);
//     },
//     
//     tower_center_pos: function() {
//         var center_pos = this.node.getPosition();
//         // 根据tower_builder里面的tower的位置来调整的
//         center_pos.x += -5;
//         center_pos.y += 7;
//         return center_pos;
//     },
// 
//     tower_think: function() {
//         var center_pos = this.tower_center_pos();
// 
//         var search_R = warlock_tower_params[this.tower_level - 1].search_R;
//         var enemy = ugame.search_enemy(center_pos, search_R);
//         var time = 0.1;
// 
//         if (!ugame.is_game_paused && enemy) {
//             var w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//             this.shoot_at(w_dst_pos);
// 
//             time = 1;
//         }
//         this.scheduleOnce(this.tower_think.bind(this), time);
//     },
// 
//     start: function() {
//         this.scheduleOnce(this.tower_think.bind(this), 0.1);
//     },
//     
//     upgrade_tower: function() {
//         if (this.tower_level >= 4) {
//             return this.tower_level;
//         }
//         this.tower_level ++;
//         this._set_tower_idle();
//         this._set_man_idle(true);
//         return this.tower_level;
//     },
// 
//     get_tower_level: function() {
//         return this.tower_level;
//     },
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
