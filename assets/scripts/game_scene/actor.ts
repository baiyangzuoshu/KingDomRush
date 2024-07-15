import { _decorator, SpriteFrame, Component } from 'cc';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

let State = {
    IDLE: 0, // 静止状态
    WALK: 1, // 行走状态
    ATTACK: 2, // 攻击
    DEAD: 3, // 死亡状态
    ARRIVED: 4, // 到达目的地
};
let Direction = {
    INVALID_DIR: -1,
    UP_DIR: 0,
    DOWN_DIR: 1,
    LEFT_DIR: 2,
    RIGHT_DIR: 3,
};
@ccclass('walk_anim_params')
export class walk_anim_params {
    @property([SpriteFrame])
    public anim_frames = [];
    @property
    public anim_duration = 0.1;
    @property
    public scale_x = 1;
}


@ccclass('Actor')
export class Actor extends Component {
    @property([walk_anim_params])
    public walk_anim_set = [];

    onLoad () {
        // this.speed = 50; // 从配置文件里面读取。 
        // this.state = State.IDLE; // 开始状态 
        // this.blood_bar = this.node.getChildByName("blood_bar").getComponent(cc.ProgressBar); 
        // this.anim = this.node.getChildByName("anim"); 
        // this.frame_anim = this.anim.addComponent("frame_anim"); 
        // this.anim_dir = Direction.INVALID_DIR; 
        // this.actor_params = null; 
        // this.game_scene = cc.find("UI_ROOT").getComponent("game_scene"); 
        // this.is_paused = false; 
    }

    set_actor_params (actor_params: any) {
        // this.actor_params = actor_params; 
        // this.speed = this.actor_params.speed; 
        // this.health = this.actor_params.health; 
        // this.attack = this.actor_params.attack; 
        // this.player_hurt = this.actor_params.player_hurt; 
    }

    gen_at_road (road_data: any) {
        // if(road_data.length < 2) { 
            // return; 
        // } 
        // this.road_data = road_data; 
        // this.state = State.WALK; // 当前怪物为心走状态。 
        // this.node.setPosition(road_data[0]); // 见我们的角色放在地图开始的地方。 
        // this.next_step = 1; // 走向下一个节点的索引。 
        // this.walk_to_next(); 
    }

    play_walk_anim (dir: any) {
        // var r = Math.atan2(dir.y, dir.x); // 求得我们方向的弧度. [-PI, PI] 
        // var now_dir = Direction.INVALID_DIR; 
        // if (r >= -Math.PI && r < -0.75 * Math.PI) { // 左 
            // now_dir = Direction.LEFT_DIR; 
        // } 
        // else if(r >= -0.75 * Math.PI && r < -0.25 * Math.PI) { // 下 
            // now_dir = Direction.DOWN_DIR; 
        // } 
        // else if(r >= -0.25 * Math.PI && r < 0.25 * Math.PI) { // 右边 
            // now_dir = Direction.RIGHT_DIR; 
        // } 
        // else if(r >= 0.25 * Math.PI && r < 0.75 * Math.PI) { // 上 
            // now_dir = Direction.UP_DIR; 
        // } 
        // else { // 左 
            // now_dir = Direction.LEFT_DIR; 
        // } 
        // if (now_dir == this.anim_dir) { 
            // return; 
        // } 
        // this.anim_dir = now_dir; 
        // this.frame_anim.stop_anim(); 
        // this.frame_anim.sprite_frames = this.walk_anim_set[this.anim_dir].anim_frames; 
        // this.frame_anim.duration = this.walk_anim_set[this.anim_dir].anim_duration; 
        // this.anim.scaleX = this.walk_anim_set[this.anim_dir].scale_x; 
        // this.frame_anim.play_loop(); 
    }

    walk_to_next () {
        // this.state = State.WALK; // 当前物体的状态是行驶状态 
        // var start_pos = this.node.getPosition(); // 获取当前的位置。 
        // var end_pos = this.road_data[this.next_step]; // 这就是我们要走到的下一个地图点的位置。 
        // var dir = end_pos.sub(start_pos); 
        // var len = dir.mag(); 
        // this.walk_time_total = len / this.speed; // 距离 / 时间就是运动到下一个节点的所要的时间 
        // this.vx = this.speed * dir.x / len; // x轴方向的速度。 
        // this.vy = this.speed * dir.y / len; // y轴方向的速度。 
        // this.walk_time = 0; // 表示这个怪物已经行走的时间。 
        // this.play_walk_anim(dir); 
    }

    attack_player () {
        // this.game_scene.on_player_attacked(this.player_hurt); 
        // ugame.remove_ememy(this.node); 
        // this.node.removeFromParent(); 
    }

    position_after_time (dt: any) {
        // if (this.state != State.WALK) { 
            // return this.node.getPosition(); 
        // } 
        // var prev_pos = this.node.getPosition(); 
        // var next_step = this.next_step; 
        // while(dt > 0 && next_step < this.road_data.length) { 
            // var now_pos = this.road_data[next_step]; 
            // var dir = now_pos.sub(prev_pos); 
            // var len = (dir.mag()); 
            // var t = len / this.speed; 
            // if (dt > t) { 
                // dt -= t; 
                // prev_pos = now_pos; 
                // next_step ++; 
            // } 
            // else { 
                // var vx = this.speed * dir.x / len; 
                // var vy = this.speed * dir.y / len; 
                // var sx = vx * dt; 
                // var sy = vy * dt; 
                // prev_pos.x += sx; 
                // prev_pos.y += sy; 
                // return prev_pos; 
            // } 
        // } 
        // return this.road_data[next_step - 1]; 
    }

    walk_update (dt: any) {
        // if (this.state != State.WALK)  { 
            // return; 
        // } 
        // this.walk_time += dt; 
        // if (this.walk_time >= this.walk_time_total) { // 表示已经走到了终点。 
            // dt -= (this.walk_time - this.walk_time_total); // 去掉多于的时间。 
        // } 
        // var sx = this.vx * dt; 
        // var sy = this.vy * dt; 
        // this.node.x += sx; 
        // this.node.y += sy; 
        // if (this.walk_time >= this.walk_time_total) { // 当前已经到达这个节点，走向下一个节点。 
            // this.next_step ++; 
            // if (this.next_step >= this.road_data.length) { // 地图路径全部跑完，这个时候，可以攻击玩家了。 
                // this.state = State.ARRIVED; // 怪物到达了我们的重点。 
                // this.attack_player(); 
            // } 
            // else { 
                // this.walk_to_next(); 
            // } 
        // } 
    }

    update (dt: any) {
        // if (ugame.is_game_started === false) { 
            // this.frame_anim.stop_anim(); 
            // return; 
        // } 
        // if (ugame.is_game_paused) { 
            // this.frame_anim.stop_anim(); 
            // this.is_paused = true; 
            // return; 
        // } 
        // if (this.is_paused) { 
            // this.frame_anim.play_loop(); 
            // this.is_paused = false; 
        // } 
        // if (this.state == State.WALK) { // 如果当前怪物为行走状态，那么我们就按照地图来进行行走。 
            // this.walk_update(dt) 
        // } 
    }

    on_common_bullet_attack (attack_value: any) {
        // this.health -= attack_value; 
        // if (this.health <= 0) { 
            // this.health = 0; 
            // ugame.add_chip(this.actor_params.bonues_chip); 
            // this.game_scene.show_game_uchip(); 
            // this.state = State.DEAD; 
            // ugame.remove_ememy(this.node); 
            // this.node.removeFromParent(); 
        // } 
        // else { // 更新学条 
            // var per = this.health / this.actor_params.health; 
            // this.blood_bar.progress = per; 
        // } 
    }

    on_bomb_bullet_attack (attack_value: any) {
        // this.on_common_bullet_attack(attack_value); 
    }

    on_warlock_bullet_attack (attack_value: any) {
        // this.on_common_bullet_attack(attack_value); 
    }

    on_arrow_bullet_attack (attack_value: any) {
        // this.on_common_bullet_attack(attack_value); 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var ugame = require("ugame");
// 
// var State = {
//     IDLE: 0, // 静止状态
//     WALK: 1, // 行走状态
//     ATTACK: 2, // 攻击
//     DEAD: 3, // 死亡状态
//     ARRIVED: 4, // 到达目的地
// };
// 
// var Direction = {
//     INVALID_DIR: -1,
//     UP_DIR: 0,
//     DOWN_DIR: 1,
//     LEFT_DIR: 2,
//     RIGHT_DIR: 3,
// };
// 
// 
// var walk_anim_params = cc.Class({
//     name: "walk_anim_params",
//     
//     properties: {
//         anim_frames: {
//             type: cc.SpriteFrame,
//             default: [],
//         }, 
//         anim_duration: 0.1,
//         
//         scale_x: 1,
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
//         // 0, 上，1,下， 2， 左， 3 右
//         walk_anim_set: {
//             default: [],
//             type: walk_anim_params,
//         },
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         // console.log("onLoad actor");
// 
//         this.speed = 50; // 从配置文件里面读取。
//         this.state = State.IDLE; // 开始状态
//         this.blood_bar = this.node.getChildByName("blood_bar").getComponent(cc.ProgressBar);
//         this.anim = this.node.getChildByName("anim");
//         this.frame_anim = this.anim.addComponent("frame_anim");
//         
//         this.anim_dir = Direction.INVALID_DIR;
//         
//         this.actor_params = null;
//         
//         this.game_scene = cc.find("UI_ROOT").getComponent("game_scene");
//         
//         this.is_paused = false;
//     },
//     
//     set_actor_params: function(actor_params) {
//         this.actor_params = actor_params;
//         this.speed = this.actor_params.speed;
//         this.health = this.actor_params.health;
//         this.attack = this.actor_params.attack;
//         this.player_hurt = this.actor_params.player_hurt;
//     },
//     
//     //  在某一条地图的路径上面来放一个怪物。
//     gen_at_road: function(road_data) {
//         if(road_data.length < 2) {
//             return;
//         }
//         
//         this.road_data = road_data;
//         this.state = State.WALK; // 当前怪物为心走状态。
//         
//         this.node.setPosition(road_data[0]); // 见我们的角色放在地图开始的地方。
//         this.next_step = 1; // 走向下一个节点的索引。
//         this.walk_to_next();
//     },
//     // end 
//     
//     play_walk_anim: function(dir) {
//         var r = Math.atan2(dir.y, dir.x); // 求得我们方向的弧度. [-PI, PI]
//         // [-PI, -3/4PI)  左, [-3/4PI, -1/4PI) 下, [-1/4PI, 1/4PI) 右边, [1/4PI, 3/4PI) 上 
//         // [3/4PI, PI] 左
//         var now_dir = Direction.INVALID_DIR;
//         
//         if (r >= -Math.PI && r < -0.75 * Math.PI) { // 左
//             now_dir = Direction.LEFT_DIR;
//         }
//         else if(r >= -0.75 * Math.PI && r < -0.25 * Math.PI) { // 下
//             now_dir = Direction.DOWN_DIR;
//         }
//         else if(r >= -0.25 * Math.PI && r < 0.25 * Math.PI) { // 右边
//             now_dir = Direction.RIGHT_DIR;
//         }
//         else if(r >= 0.25 * Math.PI && r < 0.75 * Math.PI) { // 上
//             now_dir = Direction.UP_DIR;
//         }
//         else { // 左
//             now_dir = Direction.LEFT_DIR;
//         }
//         
//         if (now_dir == this.anim_dir) {
//             return;
//         }
//         
//         this.anim_dir = now_dir;
//         this.frame_anim.stop_anim();
//         this.frame_anim.sprite_frames = this.walk_anim_set[this.anim_dir].anim_frames;
//         this.frame_anim.duration = this.walk_anim_set[this.anim_dir].anim_duration;
//         this.anim.scaleX = this.walk_anim_set[this.anim_dir].scale_x;
//         this.frame_anim.play_loop();
//     },
//     
//     walk_to_next: function() {
//         this.state = State.WALK; // 当前物体的状态是行驶状态
//         // 计算我们走到下一个目的地的时间，
//         var start_pos = this.node.getPosition(); // 获取当前的位置。
//         var end_pos = this.road_data[this.next_step]; // 这就是我们要走到的下一个地图点的位置。
//         // var dir = cc.pSub(end_pos, start_pos); //终点 - 起点 得到我们的向量。起点到终点的距离和方向。
//         var dir = end_pos.sub(start_pos);
//         // var len = cc.pLength(dir);
//         var len = dir.mag();
//         this.walk_time_total = len / this.speed; // 距离 / 时间就是运动到下一个节点的所要的时间
//         // 计算速度的方向。
//         this.vx = this.speed * dir.x / len; // x轴方向的速度。
//         this.vy = this.speed * dir.y / len; // y轴方向的速度。
//         this.walk_time = 0; // 表示这个怪物已经行走的时间。
//         // end 
//         
//         // 为这个dir来配合播放一个合适的动画。
//         this.play_walk_anim(dir);
//     },
//     
//     attack_player: function() {
//         this.game_scene.on_player_attacked(this.player_hurt);
//         ugame.remove_ememy(this.node);
//         this.node.removeFromParent();
//     },
//     
//     // 你经过多少时间以后，所在的位置。
//     // 计算我们的提前量的w
//     position_after_time: function(dt) {
//         // 静止的，所以，直接返回当前的pos
//         if (this.state != State.WALK) {
//             return this.node.getPosition();
//         }
// 
//         // 表示物体正在运动
//         var prev_pos = this.node.getPosition();
//         var next_step = this.next_step;
// 
//         while(dt > 0 && next_step < this.road_data.length) {
//             var now_pos = this.road_data[next_step];
//             // var dir = cc.pSub(now_pos, prev_pos);
//             var dir = now_pos.sub(prev_pos);
//             // var len = cc.pLength(dir);
//             var len = (dir.mag());
// 
//             var t = len / this.speed;
//             if (dt > t) {
//                 dt -= t;
//                 prev_pos = now_pos;
//                 next_step ++;
//             }
//             else {
//                 var vx = this.speed * dir.x / len;
//                 var vy = this.speed * dir.y / len;
//                 var sx = vx * dt;
//                 var sy = vy * dt;
// 
//                 prev_pos.x += sx;
//                 prev_pos.y += sy;
//                 return prev_pos;
//             }
//         }
// 
//         // 如果跑完所有的地图，我们的估算时间还没有用完，那么使用最后一个点
//         // 作为我们的目标点
//         return this.road_data[next_step - 1];
//     },
// 
//     // 距离上一次过去的时间
//     walk_update: function(dt) {
//         if (this.state != State.WALK)  {
//             return;
//         }
//         
//         this.walk_time += dt;
//         if (this.walk_time >= this.walk_time_total) { // 表示已经走到了终点。
//             dt -= (this.walk_time - this.walk_time_total); // 去掉多于的时间。
//         }
//         
//         var sx = this.vx * dt;
//         var sy = this.vy * dt;
//         
//         this.node.x += sx;
//         this.node.y += sy;
//         
//         if (this.walk_time >= this.walk_time_total) { // 当前已经到达这个节点，走向下一个节点。
//             this.next_step ++;
//             if (this.next_step >= this.road_data.length) { // 地图路径全部跑完，这个时候，可以攻击玩家了。
//                 this.state = State.ARRIVED; // 怪物到达了我们的重点。
//                 this.attack_player();
//             }
//             else {
//                 this.walk_to_next();
//             }
//         }
//     },
//     
//     // called every frame, uncomment this function to activate update callback
//     update: function (dt) {
//         if (ugame.is_game_started === false) {
//             this.frame_anim.stop_anim();
//             return;
//         }
//         
//         if (ugame.is_game_paused) {
//             this.frame_anim.stop_anim();
//             this.is_paused = true;
//             return;
//         }
//         
//         if (this.is_paused) {
//             this.frame_anim.play_loop();
//             this.is_paused = false;
//         }
//         
//         if (this.state == State.WALK) { // 如果当前怪物为行走状态，那么我们就按照地图来进行行走。
//             this.walk_update(dt)
//         }
//         
//     },
// 
//     on_common_bullet_attack: function(attack_value) {
//         this.health -= attack_value;
//         if (this.health <= 0) {
//             this.health = 0;
//             // this.actor_dead();
//             // 加金币
//             ugame.add_chip(this.actor_params.bonues_chip);
//             this.game_scene.show_game_uchip();
//             // end 
//             this.state = State.DEAD;
//             ugame.remove_ememy(this.node);
//             this.node.removeFromParent();
//         }
//         else { // 更新学条
//             var per = this.health / this.actor_params.health;
//             this.blood_bar.progress = per;
//         }
//     },
// 
//     // 炮弹攻击玩家
//     on_bomb_bullet_attack: function(attack_value) {
//         this.on_common_bullet_attack(attack_value);
//     },
//     
//     // 收到法师的攻击
//     on_warlock_bullet_attack: function(attack_value) {
//         this.on_common_bullet_attack(attack_value);
//     },
//     // end 
// 
//     // 收到弓箭手的攻击
//     on_arrow_bullet_attack: function(attack_value) {
//         this.on_common_bullet_attack(attack_value);
//     },
//     // end 
// });
