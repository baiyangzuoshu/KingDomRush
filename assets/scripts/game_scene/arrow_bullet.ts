import { _decorator, Component, SpriteFrame } from 'cc';
import { ugame } from 'ugame';
import { arrow_bul_params } from 'arrow_bullet_params';
const { ccclass, property } = _decorator;

@ccclass('ArrowBullet')
export class ArrowBullet extends Component {
    @property
    public speed = 200;
    @property
    public attack = 10;
    @property
    public bullet_level = 1;
    @property(SpriteFrame)
    public arrow_sprite_frame = null;
    @property(SpriteFrame)
    public decal_arrow_sprite_frame = null;

    onLoad () {
        // this.anim = this.node.getChildByName("anim"); 
    }

    shoot_at (level: any, w_start_pos: any, w_dst_pos: any, enemy: any) {
        // if (!this.node.parent) { 
            // console.log("shoot_at must add to parent first"); 
            // return; 
        // } 
        // this.bullet_level = level; 
        // this.speed = arrow_bullet_params[this.bullet_level - 1].speed; 
        // this.shoot_enemy = enemy; 
        // var start_pos = this.node.parent.convertToNodeSpaceAR(w_start_pos); 
        // var dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos); 
        // this.node.setPosition(start_pos); 
        // this.anim.rotation = 90; 
        // var dir = w_dst_pos.sub(w_start_pos); 
        // var len = (dir.mag()); 
        // var time = len / this.speed; 
        // if (this.shoot_enemy !== null) { 
            // var actor = this.shoot_enemy.getComponent("actor"); 
            // var after_pos = actor.position_after_time(time); 
            // w_dst_pos = this.shoot_enemy.parent.convertToWorldSpace(after_pos); 
            // dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos); 
        // } 
        // var ctrl_x; 
        // var ctrl_y; 
        // if (0) { 
            // ctrl_y = (start_pos.y + dst_pos.y) * 0.5; 
            // if (start_pos.x > dst_pos.x) { 
                // ctrl_x = dst_pos.x; 
            // } 
            // else { 
                // ctrl_x = dst_pos.x; 
            // } 
        // } 
        // else { 
            // ctrl_x = (start_pos.x + dst_pos.x) * 0.5; 
            // ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y; 
            // ctrl_y += 40; 
        // } 
        // var ctrl_point_set = [cc.p(ctrl_x, ctrl_y), cc.p(ctrl_x, ctrl_y), dst_pos]; 
        // var bto_action = cc.bezierTo(time, ctrl_point_set); 
        // var func = cc.callFunc(function(){ 
            // var s = this.anim.getComponent(cc.Sprite); 
            // s.spriteFrame = this.decal_arrow_sprite_frame; 
            // this.on_bullet_shoot(w_dst_pos); 
        // }.bind(this), this.node); 
        // var end_func = cc.callFunc(function(){ 
            // this.node.removeFromParent(); 
        // }.bind(this), this.node); 
        // var seq = cc.sequence([bto_action, func, cc.delayTime(3), cc.fadeOut(0.3), end_func]); 
        // this.node.runAction(seq); 
        // var degree; 
        // if (w_dst_pos.x < w_start_pos.x) { // 在左边 
            // degree = -180 + Math.random() * 10; 
        // } 
        // else { 
            // degree = 180 - Math.random() * 10; 
        // } 
        // var rot = cc.rotateBy(time, degree); 
        // this.anim.runAction(rot); 
    }

    on_bullet_shoot (w_dst_pos: any) {
        // if (this.shoot_enemy === null ||  
            // !ugame.is_enemy_active(this.shoot_enemy)) { 
            // return; 
        // } 
        // var actor = this.shoot_enemy.getComponent("actor"); 
        // actor.on_arrow_bullet_attack(arrow_bullet_params[this.bullet_level - 1].attack); 
        // this.node.removeFromParent(); 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var ugame = require("ugame");
// var arrow_bullet_params = require("arrow_bullet_params");
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
//         speed: 200, // 子弹移动的速度
//         attack: 10, // 子弹的攻击力,
//         
//         bullet_level: 1,
// 
//         arrow_sprite_frame: { // 保存的是弓箭的图片;
//             default: null,
//             type: cc.SpriteFrame, 
//         },
//         
//         decal_arrow_sprite_frame: { // 保存我们的半截弓箭的资源
//             default: null,
//             type: cc.SpriteFrame, 
//         }
//         
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.anim = this.node.getChildByName("anim");
//     },
//     
//     // 子弹发射, 因为涉及的到坐标转换，所以在调用shoot_at之前
//     // 一定要确保这个子弹已经加入到子弹的root里面
//     shoot_at: function(level, w_start_pos, w_dst_pos, enemy) {
//         if (!this.node.parent) {
//             console.log("shoot_at must add to parent first");
//             return;
//         }
// 
//         this.bullet_level = level;
//         
//         this.speed = arrow_bullet_params[this.bullet_level - 1].speed;
//         this.shoot_enemy = enemy;
// 
//         var start_pos = this.node.parent.convertToNodeSpaceAR(w_start_pos);
//         var dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos);
//         
//         // 发射的时候调整我们角度,设置好位置
//         this.node.setPosition(start_pos);
//         this.anim.rotation = 90;
//         // end  
//         
//         // 创建一个贝塞尔的action来控制我们的子弹的发射
//         // var dir = cc.pSub(w_dst_pos, w_start_pos);
//         var dir = w_dst_pos.sub(w_start_pos);
// 
//         // var len = cc.pLength(dir);
//         var len = (dir.mag());
//         var time = len / this.speed;
// 
//         if (this.shoot_enemy !== null) {
//             var actor = this.shoot_enemy.getComponent("actor");
//             var after_pos = actor.position_after_time(time);
//             w_dst_pos = this.shoot_enemy.parent.convertToWorldSpace(after_pos);
//             dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos);
//         }
//         // end 
//         
//         // 求贝塞尔曲线的控制点，中点，然后拉高xxxxx
//         var ctrl_x;
//         var ctrl_y;
//         
//         // if (Math.abs(dir.x) <= 10 && dir.y < 0) {
//         if (0) {
//             ctrl_y = (start_pos.y + dst_pos.y) * 0.5;
//             if (start_pos.x > dst_pos.x) {
//                 ctrl_x = dst_pos.x;
//                 // ctrl_x -= 20;
//             }
//             else {
//                 ctrl_x = dst_pos.x;
//                 // ctrl_x += 20;
//             }
//         }
//         else {
//             ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
//             ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y;
//             ctrl_y += 40;
//         }
//         // end 
//         
//         var ctrl_point_set = [cc.p(ctrl_x, ctrl_y), cc.p(ctrl_x, ctrl_y), dst_pos];
//         var bto_action = cc.bezierTo(time, ctrl_point_set);
//         // this.node.runAction(bto_action); // 发射到目标点;
//         // 换图，把这个完整的键，换成我们的半截键
//         var func = cc.callFunc(function(){
//             var s = this.anim.getComponent(cc.Sprite);
//             s.spriteFrame = this.decal_arrow_sprite_frame;
//             this.on_bullet_shoot(w_dst_pos);
//         }.bind(this), this.node);
//         
//         var end_func = cc.callFunc(function(){
//             this.node.removeFromParent();
//         }.bind(this), this.node);
//         var seq = cc.sequence([bto_action, func, cc.delayTime(3), cc.fadeOut(0.3), end_func]);
//         this.node.runAction(seq);
//         
//         // 逻辑与图像分离
//         var degree;
//         if (w_dst_pos.x < w_start_pos.x) { // 在左边
//             degree = -180 + Math.random() * 10;
//         }
//         else {
//             degree = 180 - Math.random() * 10;
//         }
//         var rot = cc.rotateBy(time, degree);
//         this.anim.runAction(rot);
//     },
// 
//     // 弓箭要判定伤害
//     on_bullet_shoot: function(w_dst_pos) {
//         if (this.shoot_enemy === null || 
//             !ugame.is_enemy_active(this.shoot_enemy)) {
//             return;
//         }
// 
//         // 弓箭射到了人。
//         var actor = this.shoot_enemy.getComponent("actor");
//         actor.on_arrow_bullet_attack(arrow_bullet_params[this.bullet_level - 1].attack);
// 
//         this.node.removeFromParent();
//         // end 
//     },
//     // called every frame, uncomment this function to activate update callback
//     // 检测我们弓箭的碰撞;
//     // update: function (dt) {
// 
//     // },
// });
