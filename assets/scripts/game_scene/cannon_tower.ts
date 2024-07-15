import { _decorator, SpriteFrame, Component, Prefab } from 'cc';
import { cannon_tower_params } from 'cannon_tower_params';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('tower_skin')
export class tower_skin {
    @property([SpriteFrame])
    public shoot_anim = [];
    @property
    public shoot_anim_duration = 0.1;
    @property([SpriteFrame])
    public shoot_bullet = [];
}


@ccclass('CannonTower')
export class CannonTower extends Component {
    @property
    public tower_level = 1;
    @property([tower_skin])
    public tower_skin_set = [];
    @property(Prefab)
    public bullet_prefab = null;
    @property
    public bullet_root_path = 'UI_ROOT/map_root/bullet_root';

    onLoad () {
        // this.tower_level = 1; 
        // this.anim = this.node.getChildByName("anim"); 
        // this.bullet_icon = this.anim.getChildByName("bullet_icon"); 
        // this.bullet_icon.scale = 0; // 后面运行这个Action的时候，必须要激活太，且有一段时间开始是看不到的； 
        // this.set_tower_idle(); // 对应等级的idle图片 
        // this.bullet_root = cc.find(this.bullet_root_path); 
    }

    set_tower_idle () {
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_anim[0]; 
    }

    _play_preload_bullet_anim () {
        // if (this.tower_level === 4) { 
            // return; 
        // } 
        // var start_pos_set = [cc.p(-24, 2), cc.p(-24, 3), cc.p(-24, 2), cc.p(-24, 2)]; 
        // var end_pos_set = [cc.p(3, 20), cc.p(3, 21), cc.p(3, 24), cc.p(3, 24)]; 
        // var delay_time_set = [0.8, 1.5, 1.2]; 
        // var rot_degree_set = [180 + Math.random() * 90, 180 + Math.random() * 90, 45]; 
        // this.bullet_icon.getComponent(cc.Sprite).spriteFrame =  
                // this.tower_skin_set[this.tower_level - 1].shoot_bullet[0]; 
        // var delay = cc.delayTime(delay_time_set[this.tower_level - 1]); 
        // var func = cc.callFunc(function() { 
            // this.bullet_icon.scale = 1; // 子弹显示出来。 
            // this.bullet_icon.x = start_pos_set[this.tower_level - 1].x; 
            // this.bullet_icon.y = start_pos_set[this.tower_level - 1].y; 
            // this.bullet_icon.rotation = -45; // 开始的旋转角度 
            // var rot = cc.rotateBy(0.4, rot_degree_set[this.tower_level - 1]); 
            // this.bullet_icon.runAction(rot); 
        // }.bind(this), this.bullet_icon); 
        // var bz_array = [cc.p(-10, 30), cc.p(-10, 30), end_pos_set[this.tower_level - 1]]; 
        // var bz_action = cc.bezierTo(0.4, bz_array); 
        // var s = cc.scaleTo(0.1, 0); 
        // var seq = cc.sequence([delay, func, bz_action, s]); 
        // this.bullet_icon.runAction(seq); 
    }

    _shoot_bullet (w_dst_pos: any, bullet_level: any) {
        // var delay_set = [0.7, 0.8, 0.6, 1.3, 3.5]; 
        // var start_pos_set = [cc.p(3, 16), cc.p(3, 16), cc.p(3, 16), cc.p(-1, 20), cc.p(-22, 24)]; 
        // var start_w_pos = this.anim.convertToWorldSpaceAR(start_pos_set[bullet_level - 1]); 
        // var delay = cc.delayTime(delay_set[bullet_level - 1]); 
        // var func = cc.callFunc(function(){ 
            // var center_pos = this.tower_center_pos(); 
            // var search_R = cannon_tower_params[this.tower_level - 1].search_R; 
            // var enemy = ugame.search_enemy(center_pos, search_R); 
            // if (enemy) { 
                // w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0)); 
            // } 
            // var bullet = cc.instantiate(this.bullet_prefab); 
            // this.bullet_root.addChild(bullet); 
            // var cannon_bullet = bullet.getComponent("cannon_bullet"); 
            // cannon_bullet.bullet_level = bullet_level; 
            // cannon_bullet.shoot_at(bullet_level, start_w_pos, w_dst_pos); 
        // }.bind(this), this.node); 
        // var seq = cc.sequence([delay, func]); 
        // this.node.runAction(seq); 
    }

    shoot_at (w_dst_pos: any) {
        // var frame_anim = this.anim.getComponent("frame_anim"); 
        // frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_anim; 
        // frame_anim.duration = this.tower_skin_set[this.tower_level - 1].shoot_anim_duration; 
        // frame_anim.play_once(this.set_tower_idle.bind(this)); 
        // this._play_preload_bullet_anim(); 
        // this._shoot_bullet(w_dst_pos, this.tower_level); 
        // if (this.tower_level === 4) { 
            // this._shoot_bullet(w_dst_pos, this.tower_level + 1); 
        // } 
    }

    tower_center_pos () {
        // var center_pos = this.node.getPosition(); 
        // center_pos.x += -1; 
        // center_pos.y += 8; 
        // return center_pos; 
    }

    tower_think () {
        // var center_pos = this.tower_center_pos(); 
        // var search_R = cannon_tower_params[this.tower_level - 1].search_R; 
        // var enemy = ugame.search_enemy(center_pos, search_R); 
        // var time = 0.1; 
        // if (!ugame.is_game_paused && enemy) { 
            // var w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0)); 
            // this.shoot_at(w_dst_pos); 
            // time = 1; 
            // if (this.tower_level === 4) { 
                // time = 3.5; 
            // } 
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
        // this.set_tower_idle(); // 对应等级的idle图片 
        // return this.tower_level; 
    }

    get_tower_level () {
        // return this.tower_level; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var tower_skin = cc.Class({
//     name: "tower_skin", 
//     properties: {
//         shoot_anim: {
//             default: [],
//             type: cc.SpriteFrame,
//         },
//         
//         shoot_anim_duration: 0.1, // 发送动画持续的时间
//         
//         shoot_bullet: { // 填弹的子弹资源
//             default: [],
//             type: cc.SpriteFrame, 
//         }
//     },
// });
// 
// 
// var cannon_tower_params = require("cannon_tower_params");
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
//         
//         tower_level:  1, // 炮塔的级别
//         
//         tower_skin_set: {
//             default: [],
//             type: tower_skin,
//         },
//         
//         // 炮弹的预制体
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
//         this.anim = this.node.getChildByName("anim");
//         this.bullet_icon = this.anim.getChildByName("bullet_icon");
//         this.bullet_icon.scale = 0; // 后面运行这个Action的时候，必须要激活太，且有一段时间开始是看不到的；
//         this.set_tower_idle(); // 对应等级的idle图片
//         
//         this.bullet_root = cc.find(this.bullet_root_path);
//     },
//     
//     set_tower_idle: function() {
//         var s = this.anim.getComponent(cc.Sprite);
//         s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_anim[0];
//     }, 
//     
//     _play_preload_bullet_anim: function() {
//         if (this.tower_level === 4) {
//             return;
//         }
//         
//         var start_pos_set = [cc.p(-24, 2), cc.p(-24, 3), cc.p(-24, 2), cc.p(-24, 2)];
//         var end_pos_set = [cc.p(3, 20), cc.p(3, 21), cc.p(3, 24), cc.p(3, 24)];
//         var delay_time_set = [0.8, 1.5, 1.2];
//         var rot_degree_set = [180 + Math.random() * 90, 180 + Math.random() * 90, 45];
//     
//         this.bullet_icon.getComponent(cc.Sprite).spriteFrame = 
//                 this.tower_skin_set[this.tower_level - 1].shoot_bullet[0];
//         var delay = cc.delayTime(delay_time_set[this.tower_level - 1]);
//         var func = cc.callFunc(function() {
//             this.bullet_icon.scale = 1; // 子弹显示出来。
//             this.bullet_icon.x = start_pos_set[this.tower_level - 1].x;
//             this.bullet_icon.y = start_pos_set[this.tower_level - 1].y;
//             this.bullet_icon.rotation = -45; // 开始的旋转角度
//             // 运行一个旋转
//             var rot = cc.rotateBy(0.4, rot_degree_set[this.tower_level - 1]);
//             this.bullet_icon.runAction(rot);
//             // end 
//         }.bind(this), this.bullet_icon);
//         
//         var bz_array = [cc.p(-10, 30), cc.p(-10, 30), end_pos_set[this.tower_level - 1]];
//         var bz_action = cc.bezierTo(0.4, bz_array);
//         
//         var s = cc.scaleTo(0.1, 0);
//         var seq = cc.sequence([delay, func, bz_action, s]);
//         this.bullet_icon.runAction(seq);
//     },
//     
//     _shoot_bullet: function(w_dst_pos, bullet_level) {
//         // var bullet_level = this.tower_level;
//         
//         // 炮塔根据自己的等级来生成对应的子弹,配合炮塔动画来发射
//         var delay_set = [0.7, 0.8, 0.6, 1.3, 3.5];
//         var start_pos_set = [cc.p(3, 16), cc.p(3, 16), cc.p(3, 16), cc.p(-1, 20), cc.p(-22, 24)];
//         // end 
//         
//         var start_w_pos = this.anim.convertToWorldSpaceAR(start_pos_set[bullet_level - 1]);
//         var delay = cc.delayTime(delay_set[bullet_level - 1]);
//         var func = cc.callFunc(function(){
//             var center_pos = this.tower_center_pos();
//             var search_R = cannon_tower_params[this.tower_level - 1].search_R;
//             var enemy = ugame.search_enemy(center_pos, search_R);
//             if (enemy) {
//                 w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//             }
//             // 发射子弹
//             var bullet = cc.instantiate(this.bullet_prefab);
//             this.bullet_root.addChild(bullet);
//             var cannon_bullet = bullet.getComponent("cannon_bullet");
//             cannon_bullet.bullet_level = bullet_level;
//             cannon_bullet.shoot_at(bullet_level, start_w_pos, w_dst_pos);
//             // end 
//         }.bind(this), this.node);
//         
//         var seq = cc.sequence([delay, func]);
//         this.node.runAction(seq);
//         // end 
//     },
//     
//     shoot_at: function(w_dst_pos) {
//         var frame_anim = this.anim.getComponent("frame_anim");
//         frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_anim;
//         frame_anim.duration = this.tower_skin_set[this.tower_level - 1].shoot_anim_duration;
//         frame_anim.play_once(this.set_tower_idle.bind(this));
//         this._play_preload_bullet_anim();
//         this._shoot_bullet(w_dst_pos, this.tower_level);
//         
//         if (this.tower_level === 4) {
//             this._shoot_bullet(w_dst_pos, this.tower_level + 1);
//         }
//     }, 
//     
//     tower_center_pos: function() {
//         var center_pos = this.node.getPosition();
//         // 根据tower_builder里面的tower的位置来调整的
//         center_pos.x += -1;
//         center_pos.y += 8;
//         return center_pos;
//     },
// 
//     tower_think: function() {
//         var center_pos = this.tower_center_pos();
// 
//         var search_R = cannon_tower_params[this.tower_level - 1].search_R;
//         var enemy = ugame.search_enemy(center_pos, search_R);
//         var time = 0.1;
// 
//         if (!ugame.is_game_paused && enemy) {
//             var w_dst_pos = enemy.convertToWorldSpaceAR(cc.p(0, 0));
//             this.shoot_at(w_dst_pos);
// 
//             time = 1;
//             if (this.tower_level === 4) {
//                 time = 3.5;
//             }
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
//         
//         this.tower_level ++;
//         this.set_tower_idle(); // 对应等级的idle图片
//         return this.tower_level;
//     },
//     
//     get_tower_level: function() {
//         return this.tower_level;
//     },
// 
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
