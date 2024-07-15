import { _decorator, Component, String } from 'cc';
import { utils } from 'utils';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('Checkout')
export class Checkout extends Component {
    @property([String])
    public game_tips = [];

    onLoad () {
        // this.failed_root = this.node.getChildByName("failed_root"); 
        // this.passed_root = this.node.getChildByName("passed_root"); 
        // this.tip = this.failed_root.getChildByName("tip").getComponent(cc.Label); 
        // this.star1 = this.passed_root.getChildByName("star1"); 
        // this.star2 = this.passed_root.getChildByName("star2"); 
        // this.star3 = this.passed_root.getChildByName("star3"); 
    }

    show_failed () {
        // this.node.active = true; 
        // if (this.game_tips.length > 0) { 
            // var index = utils.random_int(0, this.game_tips.length - 1); 
            // this.tip.string = this.game_tips[index]; 
        // } 
        // this.failed_root.active = true; 
        // this.passed_root.active = false; 
    }

    show_passed (total: any, last: any) {
        // this.node.active = true; 
        // this.failed_root.active = false; 
        // this.passed_root.active = true; 
        // var score = 1; 
        // this.star1.active = true; 
        // if (last > 2 * total / 3) { 
            // score = 3; 
            // this.star2.active = true; 
            // this.star3.active = true; 
        // } 
        // else if (last > total / 3) { 
            // score = 2; 
            // this.star2.active = true; 
            // this.star3.active = false; 
        // } 
        // else { 
            // this.star2.active = false; 
            // this.star3.active = false; 
        // } 
        // var cur_user = ugame.get_cur_user(); 
        // var cur_level = ugame.get_cur_level(); 
        // if (score > cur_user.level_info[cur_level]) { 
            // var add_value = score - cur_user.level_info[cur_level]; 
            // cur_user.level_info[cur_level] = score; 
            // cur_user.star_num += add_value; 
            // ugame.sync_user_data(); 
        // } 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var utils = require("utils");
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
//         game_tips: {
//             default: [],
//             type: cc.String,
//         },
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.failed_root = this.node.getChildByName("failed_root");
//         this.passed_root = this.node.getChildByName("passed_root");
//         
//         this.tip = this.failed_root.getChildByName("tip").getComponent(cc.Label);
// 
//         this.star1 = this.passed_root.getChildByName("star1");
//         this.star2 = this.passed_root.getChildByName("star2");
//         this.star3 = this.passed_root.getChildByName("star3");
//     },
//     
//     show_failed: function() {
//         this.node.active = true;
//         if (this.game_tips.length > 0) {
//             var index = utils.random_int(0, this.game_tips.length - 1);
//             this.tip.string = this.game_tips[index];
//         }
//         this.failed_root.active = true;
//         this.passed_root.active = false;
//     },
//     
//     
//     show_passed: function(total, last) {
//         this.node.active = true;
//         this.failed_root.active = false;
//         this.passed_root.active = true;
// 
//         var score = 1;
//         this.star1.active = true;
//         // 评价得分
//         if (last > 2 * total / 3) {
//             score = 3;
//             this.star2.active = true;
//             this.star3.active = true;
//         }
//         else if (last > total / 3) {
//             score = 2;
//             this.star2.active = true;
//             this.star3.active = false;
//         }
//         else {
//             this.star2.active = false;
//             this.star3.active = false;
//         }
// 
//         var cur_user = ugame.get_cur_user();
//         var cur_level = ugame.get_cur_level();
// 
//         if (score > cur_user.level_info[cur_level]) {
//             var add_value = score - cur_user.level_info[cur_level];
//             cur_user.level_info[cur_level] = score;
//             cur_user.star_num += add_value;
//             ugame.sync_user_data();
//         }
//     },
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
