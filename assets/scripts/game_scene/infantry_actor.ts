import { _decorator, SpriteFrame, Component } from 'cc';
import { infantry_actor_params } from 'infantry_actor_params';
const { ccclass, property } = _decorator;

@ccclass('infantry_actor_skin')
export class infantry_actor_skin {
    @property([SpriteFrame])
    public walk_anim = [];
    @property
    public walk_duration = 0.1;
    @property([SpriteFrame])
    public attack_anim = [];
    @property
    public attack_duration = 0.1;
    @property([SpriteFrame])
    public dead_anim = [];
    @property
    public dead_duration = 0.1;
}


@ccclass('InfantryActor')
export class InfantryActor extends Component {
    @property
    public actor_level = 1;
    @property([infantry_actor_skin])
    public actor_skin_set = [];

    _set_actor_idle (b_right: any) {
        // if (b_right) { 
            // this.anim.scaleX = 1; 
        // } 
        // else { 
            // this.anim.scaleX = -1; 
        // } 
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.actor_skin_set[this.actor_level - 1].walk_anim[0]; 
    }

    onLoad () {
        // this.anim = this.node.getChildByName("anim"); 
        // this.anim.addComponent("frame_anim"); 
        // this._set_actor_idle(true);     
        // this.state = 0; // 0 idle, 1, walk, 2, attack, 3 dead状态 
        // this.walk_dst_pos = cc.p(0, 0); 
        // this.walk_time = 0; 
        // this.walk_vx = 0; 
        // this.walk_vy = 0; 
        // this.face_dir = 1; // 1为向右,0为向左 
    }

    gen_actor (w_start_pos: any, w_dst_pos: any) {
        // this._set_actor_idle(true); 
        // this.speed = infantry_actor_params[this.actor_level - 1].speed; 
        // var pos = this.node.parent.convertToNodeSpaceAR(w_start_pos); 
        // this.node.setPosition(pos); 
        // this.walk_to_dst(w_dst_pos); // 守住要到 
    }

    walk_to_dst (w_dst_pos: any) {
        // this.state = 1; // 当前是行走状态 
        // this.walk_dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos); 
        // var start_pos = this.node.getPosition(); 
        // var dir = this.walk_dst_pos.sub(start_pos); 
        // var len = (dir.mag()); 
        // this.walk_time = len / this.speed; 
        // this.walk_vx = this.speed * dir.x / len; 
        // this.walk_vy = this.speed * dir.y / len; 
        // if (this.walk_vx < 0) { 
            // this.face_dir = 0; 
            // this.anim.scaleX = -1; 
        // } 
        // else { 
            // this.face_dir = 1; 
            // this.anim.scaleX = 1; 
        // } 
        // var frame_anim = this.anim.getComponent("frame_anim"); 
        // frame_anim.sprite_frames = this.actor_skin_set[this.actor_level - 1].walk_anim; 
        // frame_anim.duration = this.actor_skin_set[this.actor_level - 1].walk_duration; 
        // frame_anim.play_loop(); 
    }

    actor_ai () {
        // if (this.state === 3) { // 死亡状态 
            // return; 
        // } 
    }

    _walk_update (dt: any) {
        // if (this.walk_time <= 0) { // idle状态 
            // this.state = 0; 
            // var frame_anim = this.anim.getComponent("frame_anim"); 
            // frame_anim.stop_anim(); 
            // this._set_actor_idle(this.face_dir); 
            // this.walk_vx = 0; 
            // this.walk_vy = 0; 
            // return; 
        // } 
        // if (this.walk_time < dt) { 
            // dt = this.walk_time; 
        // } 
        // var sx = this.walk_vx * dt; 
        // var sy = this.walk_vy * dt; 
        // this.node.x += sx; 
        // this.node.y += sy; 
        // this.walk_time -= dt; 
    }

    update (dt: any) {
        // if (this.state === 0) { // idle 
            // return; 
        // } 
        // else if(this.state === 1) { // walk 
            // this._walk_update(dt); 
            // return; 
        // } 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var infantry_actor_params = require("infantry_actor_params");
// 
// var infantry_actor_skin = cc.Class({
//     name: "infantry_actor_skin", 
//     properties: {
//         walk_anim: {
//             type: cc.SpriteFrame,
//             default: [],
//         },
//         walk_duration: 0.1,
//         
//         attack_anim: {
//             type: cc.SpriteFrame,
//             default: [],
//         },
//         attack_duration: 0.1,
//         
//         dead_anim: {
//             type: cc.SpriteFrame,
//             default: [],
//         },
//         dead_duration: 0.1,
//     },
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
//         actor_level: 1, // 兵等级
//         actor_skin_set: {
//             default: [], // 4个等级
//             type: infantry_actor_skin,
//         },
//     },
//     
//     _set_actor_idle: function(b_right) {
//         if (b_right) {
//             this.anim.scaleX = 1;
//         }
//         else {
//             this.anim.scaleX = -1;
//         }
//         var s = this.anim.getComponent(cc.Sprite);
//         s.spriteFrame = this.actor_skin_set[this.actor_level - 1].walk_anim[0];
//     }, 
//     // use this for initialization
//     onLoad: function () {
//         this.anim = this.node.getChildByName("anim");
//         this.anim.addComponent("frame_anim");
//         this._set_actor_idle(true);    
//         
//         // AI 的思考状态
//         this.state = 0; // 0 idle, 1, walk, 2, attack, 3 dead状态
//         this.walk_dst_pos = cc.p(0, 0);
//         this.walk_time = 0;
//         this.walk_vx = 0;
//         this.walk_vy = 0;
//         this.face_dir = 1; // 1为向右,0为向左
//         // end 
//     },
//     
//     // 假设是没有敌人的状态，走到制定的位置等待敌人
//     gen_actor: function(w_start_pos, w_dst_pos) {
//         this._set_actor_idle(true);
//         
//         this.speed = infantry_actor_params[this.actor_level - 1].speed;
//         var pos = this.node.parent.convertToNodeSpaceAR(w_start_pos);
//         this.node.setPosition(pos);
//         
//         this.walk_to_dst(w_dst_pos); // 守住要到
//     }, 
//     
//     walk_to_dst: function(w_dst_pos) {
//         this.state = 1; // 当前是行走状态
//         this.walk_dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos);
//         var start_pos = this.node.getPosition();
//         
//         // var dir = cc.pSub(this.walk_dst_pos, start_pos);
//         var dir = this.walk_dst_pos.sub(start_pos);
//         // var len = cc.pLength(dir);
//         var len = (dir.mag());
//         this.walk_time = len / this.speed;
//         this.walk_vx = this.speed * dir.x / len;
//         this.walk_vy = this.speed * dir.y / len;
//         
//         if (this.walk_vx < 0) {
//             this.face_dir = 0;
//             this.anim.scaleX = -1;
//         }
//         else {
//             this.face_dir = 1;
//             this.anim.scaleX = 1;
//         }
//         
//         // 播放行走动画
//         var frame_anim = this.anim.getComponent("frame_anim");
//         frame_anim.sprite_frames = this.actor_skin_set[this.actor_level - 1].walk_anim;
//         frame_anim.duration = this.actor_skin_set[this.actor_level - 1].walk_duration;
//         frame_anim.play_loop();
//         // end 
//     }, 
//     
//     // 根据敌人来改变决策
//     actor_ai: function() {
//         if (this.state === 3) { // 死亡状态
//             return;
//         }
//         
//         
//     }, 
//     
//     // called every frame, uncomment this function to activate update callback
//     _walk_update: function(dt) {
//         if (this.walk_time <= 0) { // idle状态
//             this.state = 0;
//             
//             var frame_anim = this.anim.getComponent("frame_anim");
//             frame_anim.stop_anim();
//             this._set_actor_idle(this.face_dir);
//             this.walk_vx = 0;
//             this.walk_vy = 0;
//             return;
//         }
//         
//         if (this.walk_time < dt) {
//             dt = this.walk_time;
//         }
//         
//         // 设置玩家的行走
//         var sx = this.walk_vx * dt;
//         var sy = this.walk_vy * dt;
//         
//         this.node.x += sx;
//         this.node.y += sy;
//         // end 
//         
//         this.walk_time -= dt;
//     }, 
//     
//     update: function (dt) {
//         if (this.state === 0) { // idle
//             return;
//         }
//         else if(this.state === 1) { // walk
//             this._walk_update(dt);
//             return;
//         }
//     },
// });
