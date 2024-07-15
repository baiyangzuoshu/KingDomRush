import { _decorator, SpriteFrame, Component } from 'cc';
import { cannon_bul } from 'cannon_bullet_params';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('bullet_skin')
export class bullet_skin {
    @property(SpriteFrame)
    public bullet_icon = null;
    @property([SpriteFrame])
    public bomb_anim_frames = [];
    @property
    public duration = 0.08;
}


@ccclass('CannonBullet')
export class CannonBullet extends Component {
    @property
    public bullet_level = 1;
    @property([bullet_skin])
    public bullet_skin_res = [];

    onLoad () {
        // this.anim = this.node.getChildByName("anim"); 
        // this.anim.addComponent("frame_anim"); 
        // this._set_bullet_idle(); 
    }

    _set_bullet_idle () {
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.bullet_skin_res[this.bullet_level - 1].bullet_icon; 
    }

    shoot_at (level: any, w_start_pos: any, w_dst_pos: any) {
        // if (!this.node.parent) { 
            // return; 
        // } 
        // this._set_bullet_idle(); 
        // this.bullet_level = level; 
        // this.phy_params = cannon_bullet[this.bullet_level - 1]; 
        // var start_pos = this.node.parent.convertToNodeSpaceAR(w_start_pos); 
        // var dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos); 
        // this.node.setPosition(start_pos); 
        // this.anim.rotation = 0; 
        // var dir = w_dst_pos.sub(w_start_pos); 
        // var len = (dir.mag()); 
        // var time = len / this.phy_params.speed; 
        // var ctrl_x; 
        // var ctrl_y; 
        // { 
            // ctrl_x = (start_pos.x + dst_pos.x) * 0.5; 
            // ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y; 
            // ctrl_y += 40; 
        // } 
        // var ctrl_point_set = [cc.p(ctrl_x, ctrl_y), cc.p(ctrl_x, ctrl_y), dst_pos]; 
        // var bto_action = cc.bezierTo(time, ctrl_point_set); 
        // var end_func = cc.callFunc(function(){ 
            // this.on_bullet_bomb(w_dst_pos); 
            // this.play_bullet_bomb_anim(); 
        // }.bind(this), this.node); 
        // var seq = cc.sequence([bto_action, end_func]); 
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

    play_bullet_bomb_anim () {
        // this.anim.rotation = 0; 
        // var frame_com = this.anim.getComponent("frame_anim"); 
        // frame_com.sprite_frames = this.bullet_skin_res[this.bullet_level - 1].bomb_anim_frames; 
        // frame_com.duration = this.bullet_skin_res[this.bullet_level - 1].duration; 
        // frame_com.play_once(function() { 
            // this.node.removeFromParent(); 
        // }.bind(this)); 
    }

    on_bullet_bomb (w_dst_pos: any) {
        // var bomb_R = this.phy_params.bomb_R; 
        // var bomb_pos = this.node.getPosition(); 
        // var enemy_set = ugame.get_enemy_set(); 
        // for(var i = 0; i <　enemy_set.length; i ++) { 
            // var pos = enemy_set[i].getPosition(); 
            // var dir = pos.sub(bomb_pos); 
            // if ((dir.mag()) <= bomb_R) { 
                // var actor = enemy_set[i].getComponent("actor"); 
                // actor.on_bomb_bullet_attack(this.phy_params.attack); 
            // } 
        // } 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var cannon_bullet = require("cannon_bullet_params");
// var ugame = require("ugame");
// 
// var bullet_skin = cc.Class({
//     name: "bullet_skin",
//     properties: {
//         bullet_icon: { // 子弹的spriteFrame
//             type: cc.SpriteFrame,
//             default: null,
//         },
//         
//         bomb_anim_frames: { // 子弹的爆炸的帧SpriteFrame
//             type: cc.SpriteFrame,
//             default: [],
//         },
//         
//         duration: 0.08, // 动画帧的持续间隔
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
//         
//         bullet_level: 1, // 子弹的级别
//         
//         bullet_skin_res: { // 所有子弹的皮肤的集合
//             default: [],
//             type: bullet_skin,
//         },
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.anim = this.node.getChildByName("anim");
//         this.anim.addComponent("frame_anim");
//         this._set_bullet_idle();
//     },
// 
//     _set_bullet_idle: function() {
//         var s = this.anim.getComponent(cc.Sprite);
//         s.spriteFrame = this.bullet_skin_res[this.bullet_level - 1].bullet_icon;
//     },
//     
//     // 涉及到世界转到节点坐标，所以，在调用shoot_at的时候，确保这个节点已经加入场景树;
//     shoot_at: function(level, w_start_pos, w_dst_pos) { 
//         if (!this.node.parent) {
//             return;
//         }
//         this._set_bullet_idle();
//         this.bullet_level = level;
//         
//         this.phy_params = cannon_bullet[this.bullet_level - 1];
//         
//         var start_pos = this.node.parent.convertToNodeSpaceAR(w_start_pos);
//         var dst_pos = this.node.parent.convertToNodeSpaceAR(w_dst_pos);
//         
//         // 发射的时候调整我们角度,设置好位置
//         this.node.setPosition(start_pos);
//         this.anim.rotation = 0;
//         // end  
//         
//         // 创建一个贝塞尔的action来控制我们的子弹的发射
//         // var dir = cc.pSub(w_dst_pos, w_start_pos);
//         var dir = w_dst_pos.sub(w_start_pos);
//         // var len = cc.pLength(dir);
//         var len = (dir.mag());
//         var time = len / this.phy_params.speed;
//         // end 
//         
//         // 求贝塞尔曲线的控制点，中点，然后拉高xxxxx
//         var ctrl_x;
//         var ctrl_y;
//         
//         {
//             ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
//             ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y;
//             ctrl_y += 40;
//         }
//         // end 
//         
//         var ctrl_point_set = [cc.p(ctrl_x, ctrl_y), cc.p(ctrl_x, ctrl_y), dst_pos];
//         var bto_action = cc.bezierTo(time, ctrl_point_set);
//         
//         // 播放爆炸动画，播放完后删除
//         var end_func = cc.callFunc(function(){
//             this.on_bullet_bomb(w_dst_pos);
//             this.play_bullet_bomb_anim();
//         }.bind(this), this.node);
//         var seq = cc.sequence([bto_action, end_func]);
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
//     // 播放子弹的爆炸动画
//     play_bullet_bomb_anim: function() {
//         this.anim.rotation = 0;
//         var frame_com = this.anim.getComponent("frame_anim");
//         frame_com.sprite_frames = this.bullet_skin_res[this.bullet_level - 1].bomb_anim_frames;
//         frame_com.duration = this.bullet_skin_res[this.bullet_level - 1].duration;
//         
//         // 爆炸结束后，删除子弹
//         frame_com.play_once(function() {
//             this.node.removeFromParent();
//         }.bind(this));
//     },
//     // end 
//     
//     // 子弹要造成杀伤的代码入口
//     // 炸弹是砸伤一片
//     on_bullet_bomb: function(w_dst_pos) {
//         var bomb_R = this.phy_params.bomb_R;
//         var bomb_pos = this.node.getPosition();
// 
//         var enemy_set = ugame.get_enemy_set();
//         for(var i = 0; i <　enemy_set.length; i ++) {
//             var pos = enemy_set[i].getPosition();
//             // var dir = cc.pSub(pos, bomb_pos);
//             var dir = pos.sub(bomb_pos);
//             if ((dir.mag()) <= bomb_R) {
//                 var actor = enemy_set[i].getComponent("actor");
//                 actor.on_bomb_bullet_attack(this.phy_params.attack);
//             }
//         }
//     },
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
