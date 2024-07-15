import { _decorator, SpriteFrame, Component } from 'cc';
import { ugame } from 'ugame';
import { warlock_bul_params } from 'warlock_bullet_params';
const { ccclass, property } = _decorator;

@ccclass('warlock_bullet_skin')
export class warlock_bullet_skin {
    @property(SpriteFrame)
    public bullet_icon = null;
    @property([SpriteFrame])
    public bomb_anim = [];
    @property
    public bomb_duration = 0.1;
}


@ccclass('WarlockBullet')
export class WarlockBullet extends Component {
    @property
    public bullet_level = 1;
    @property([warlock_bullet_skin])
    public bullet_skin_set = [];

    onLoad () {
        // this.anim = this.node.getChildByName("anim"); 
        // this.anim.addComponent("frame_anim"); 
    }

    _set_bullet_idle () {
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.bullet_skin_set[this.bullet_level - 1].bullet_icon; 
    }

    shoot_at (level: any, w_start_pos: any, w_dst_pos: any, enemy: any) {
        // if (!this.node.parent) { 
            // return; 
        // } 
        // this.bullet_level = level; 
        // this.shoot_enemy = enemy; 
        // this._set_bullet_idle(); 
        // var start_pos = this.node.parent.convertToNodeSpace(w_start_pos); 
        // var dst_pos = this.node.parent.convertToNodeSpace(w_dst_pos); 
        // this.node.setPosition(start_pos); 
        // var dir = w_dst_pos.sub(w_start_pos); 
        // var len = (dir.mag()); 
        // var time = len / warlock_bullet_params[this.bullet_level - 1].speed; 
        // if (this.shoot_enemy !== null) { 
            // var actor = this.shoot_enemy.getComponent("actor"); 
            // var after_pos = actor.position_after_time(time); 
            // w_dst_pos = this.shoot_enemy.parent.convertToWorldSpace(after_pos); 
        // } 
        // var m = cc.moveBy(time, w_dst_pos.x - w_start_pos.x, w_dst_pos.y - w_start_pos.y); 
        // var func = cc.callFunc(function(){ 
            // var frame_anim = this.anim.getComponent("frame_anim"); 
            // frame_anim.sprite_frames = this.bullet_skin_set[this.bullet_level - 1].bomb_anim; 
            // frame_anim.duration = this.bullet_skin_set[this.bullet_level - 1].bomb_duration; 
            // frame_anim.play_once(function(){ 
                // this.on_bullet_bomb(w_dst_pos); 
                // this.node.removeFromParent(); 
            // }.bind(this)); 
        // }.bind(this), this.anim); 
        // var seq = cc.sequence([m, func]); 
        // this.node.runAction(seq); 
    }

    on_bullet_bomb (w_dst_pos: any) {
        // if (this.shoot_enemy === null) { 
            // return; 
        // } 
        // if (ugame.is_enemy_active(this.shoot_enemy)) { 
            // var actor = this.shoot_enemy.getComponent("actor"); 
            // actor.on_warlock_bullet_attack(warlock_bullet_params[this.bullet_level - 1].attack); 
        // } 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var ugame = require("ugame");
// 
// var warlock_bullet_params = require("warlock_bullet_params");
// 
// var warlock_bullet_skin = cc.Class({
//     name: "warlock_bullet_skin",
//     properties: {
//         bullet_icon: {
//             type: cc.SpriteFrame,
//             default: null,
//         },
//         
//         bomb_anim: {
//             type: cc.SpriteFrame,
//             default: [],
//         },
//         
//         bomb_duration: 0.1,
//     },
//     
// });
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
//         bullet_level: 1,
//         bullet_skin_set: {
//             default: [],
//             type: warlock_bullet_skin,
//         },
//         
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.anim = this.node.getChildByName("anim");
//         this.anim.addComponent("frame_anim");
//     },
//     
//     _set_bullet_idle: function() {
//         var s = this.anim.getComponent(cc.Sprite);
//         s.spriteFrame = this.bullet_skin_set[this.bullet_level - 1].bullet_icon;
//     },
//     
//     // 涉及到世界转到节点坐标，所以，在调用shoot_at的时候，确保这个节点已经加入场景树;
//     shoot_at: function(level, w_start_pos, w_dst_pos, enemy) { 
//         if (!this.node.parent) {
//             return;
//         }
// 
//         this.bullet_level = level;
//         this.shoot_enemy = enemy;
// 
//         this._set_bullet_idle();
//         var start_pos = this.node.parent.convertToNodeSpace(w_start_pos);
//         var dst_pos = this.node.parent.convertToNodeSpace(w_dst_pos);
//         this.node.setPosition(start_pos);
//         
//         // var dir = cc.pSub(w_dst_pos, w_start_pos);
//         var dir = w_dst_pos.sub(w_start_pos);
//         // var len = cc.pLength(dir);
//         var len = (dir.mag());
//         var time = len / warlock_bullet_params[this.bullet_level - 1].speed;
//         
//         if (this.shoot_enemy !== null) {
//             var actor = this.shoot_enemy.getComponent("actor");
//             var after_pos = actor.position_after_time(time);
//             w_dst_pos = this.shoot_enemy.parent.convertToWorldSpace(after_pos);
//         }
// 
//         var m = cc.moveBy(time, w_dst_pos.x - w_start_pos.x, w_dst_pos.y - w_start_pos.y);
//         var func = cc.callFunc(function(){
//             var frame_anim = this.anim.getComponent("frame_anim");
//             frame_anim.sprite_frames = this.bullet_skin_set[this.bullet_level - 1].bomb_anim;
//             frame_anim.duration = this.bullet_skin_set[this.bullet_level - 1].bomb_duration;
//             frame_anim.play_once(function(){
//                 this.on_bullet_bomb(w_dst_pos);
//                 this.node.removeFromParent();
//             }.bind(this));
//             
//             // 播放爆炸动画
//         }.bind(this), this.anim);
//         
//         var seq = cc.sequence([m, func]);
//         this.node.runAction(seq);
//     },
//     
//     // 子弹要造成杀伤的代码入口
//     on_bullet_bomb: function(w_dst_pos) {
//         if (this.shoot_enemy === null) {
//             return;
//         }
// 
//         if (ugame.is_enemy_active(this.shoot_enemy)) {
//             var actor = this.shoot_enemy.getComponent("actor");
//             actor.on_warlock_bullet_attack(warlock_bullet_params[this.bullet_level - 1].attack);
//         }
//     },
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
