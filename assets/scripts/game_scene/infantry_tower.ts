import { _decorator, SpriteFrame, Component, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('infantry_skin')
export class infantry_skin {
    @property([SpriteFrame])
    public open_anim = [];
    @property
    public anim_duration = 0.2;
}


@ccclass('InfantryTower')
export class InfantryTower extends Component {
    @property
    public tower_level = 1;
    @property([infantry_skin])
    public tower_skin = [];
    @property(Prefab)
    public actor_prefab = null;
    @property
    public actor_root_path = 'UI_ROOT/map_root/bullet_root';

    _set_tower_idle () {
        // var s = this.anim.getComponent(cc.Sprite); 
        // s.spriteFrame = this.tower_skin[this.tower_level - 1].open_anim[0]; 
    }

    onLoad () {
        // this.tower_level = 1; 
        // this.anim = this.node.getChildByName("anim"); 
        // this.anim.addComponent("frame_anim"); 
        // this._set_tower_idle(); 
        // this.actor_root = cc.find(this.actor_root_path);  
    }

    _play_open_door_anim () {
        // var frame_anim = this.anim.getComponent("frame_anim"); 
        // frame_anim.sprite_frames = this.tower_skin[this.tower_level - 1].open_anim; 
        // frame_anim.duration = this.tower_skin[this.tower_level - 1].anim_duration; 
        // frame_anim.play_once(this._set_tower_idle.bind(this)); 
    }

    _gen_actor (w_dst_pos: any) {
        // var delay = cc.delayTime(0.6); 
        // var func = cc.callFunc(function() { 
            // var actor = cc.instantiate(this.actor_prefab); 
            // this.actor_root.addChild(actor); 
            // actor.active = true; 
            // var com = actor.getComponent("infantry_actor"); 
            // com.actor_level = this.tower_level; 
            // com.gen_actor(this.node.convertToWorldSpaceAR(cc.p(0, 0)), w_dst_pos); 
        // }.bind(this), this.node); 
        // var seq = cc.sequence([delay, func]); 
        // this.node.runAction(seq); 
    }

    gen_infantry (w_dst_pos: any) {
        // this._play_open_door_anim(); 
        // this._gen_actor(w_dst_pos); 
    }

    start () {
        // this.schedule(function() { 
            // var R = 60; // 投弹半径 
            // var r = Math.random() * 2 * Math.PI; 
            // var w_dst_pos = this.node.convertToWorldSpaceAR(cc.p(R * Math.cos(r), R * Math.sin(r))); 
            // this.gen_infantry(w_dst_pos); 
        // }.bind(this), 4); 
    }

    upgrade_tower () {
        // if (this.tower_level >= 4) { 
            // return this.tower_level; 
        // } 
        // this.tower_level ++; 
        // this._set_tower_idle(); 
        // return this.tower_level; 
    }

    get_tower_level () {
        // return this.tower_level; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var infantry_skin = cc.Class({
//     name: "infantry_skin",
//     properties: {
//         open_anim: {
//             default: [], // 一组开门的图片
//             type: cc.SpriteFrame,
//         },
//         
//         anim_duration: 0.2, // 播放动画的每帧的时间间隔
//     }
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
//         tower_level: 1,
//         // 4个等级
//         tower_skin: {
//             default: [],
//             type: infantry_skin,
//         },
//         
//         actor_prefab: {
//             type: cc.Prefab,
//             default: null,
//         },
//         
//         actor_root_path: "UI_ROOT/map_root/bullet_root",
//     },
//     
//     // 将这个tower设置成关门的状态
//     _set_tower_idle: function() {
//         var s = this.anim.getComponent(cc.Sprite);
//         s.spriteFrame = this.tower_skin[this.tower_level - 1].open_anim[0];
//     },
//     // use this for initialization
//     onLoad: function () {
//         this.tower_level = 1;
//         this.anim = this.node.getChildByName("anim");
//         this.anim.addComponent("frame_anim");
//         this._set_tower_idle();
//         
//         this.actor_root = cc.find(this.actor_root_path); 
//     },
//     
//     _play_open_door_anim: function() {
//         var frame_anim = this.anim.getComponent("frame_anim");
//         frame_anim.sprite_frames = this.tower_skin[this.tower_level - 1].open_anim;
//         frame_anim.duration = this.tower_skin[this.tower_level - 1].anim_duration;
//         frame_anim.play_once(this._set_tower_idle.bind(this));
//     },
//     
//     _gen_actor: function(w_dst_pos) {
//         var delay = cc.delayTime(0.6);
//         var func = cc.callFunc(function() {
//             var actor = cc.instantiate(this.actor_prefab);
//             this.actor_root.addChild(actor);
//             actor.active = true;
//             
//             var com = actor.getComponent("infantry_actor");
//             com.actor_level = this.tower_level;
//             
//             com.gen_actor(this.node.convertToWorldSpaceAR(cc.p(0, 0)), w_dst_pos);
//         }.bind(this), this.node);
//         
//         var seq = cc.sequence([delay, func]);
//         this.node.runAction(seq);
//     },
//     
//     gen_infantry: function(w_dst_pos) {
//         // 播放放开门的动画
//         this._play_open_door_anim();
//         // end 
//         
//         // 放出多少个兵
//         this._gen_actor(w_dst_pos);
//         // end
//         
//     },
//     
//     start: function() {
//         // 测试使用
//         this.schedule(function() {
//             var R = 60; // 投弹半径
//             var r = Math.random() * 2 * Math.PI;
//             var w_dst_pos = this.node.convertToWorldSpaceAR(cc.p(R * Math.cos(r), R * Math.sin(r)));
//             
//             this.gen_infantry(w_dst_pos);
//         }.bind(this), 4);
//         // end 
//     },
//     
//     upgrade_tower: function() {
//         if (this.tower_level >= 4) {
//             return this.tower_level;
//         }
//         
//         this.tower_level ++;
//         this._set_tower_idle();
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
