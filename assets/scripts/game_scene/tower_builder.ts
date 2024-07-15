import { _decorator, Component, Prefab, Vec2 } from 'cc';
import { ugame } from 'ugame';
const { ccclass, property } = _decorator;

@ccclass('TowerBuilder')
export class TowerBuilder extends Component {
    @property([Prefab])
    public tower_prefabs = [];
    @property([Vec2])
    public tower_offset = [];

    onLoad () {
        // this.gui_tower_builder = cc.find("UI_ROOT/gui_tower_builder").getComponent("gui_tower_builder"); 
        // this.icon = this.node.getChildByName("icon"); 
        // this.tower_type = 0; 
        // this.builded_tower = null; 
        // this.is_builded = false; 
        // this.map_root = cc.find("UI_ROOT/map_root"); 
        // this.tower_params = [null, null, null, null]; 
        // this.tower_params[0] = require("arrow_tower_params"); 
        // this.tower_params[1] = require("warlock_tower_params"); 
        // this.tower_params[2] = require("cannon_tower_params"); 
        // this.tower_params[3] = require("infantry_tower_params"); 
        // this.game_scene = cc.find("UI_ROOT").getComponent("game_scene"); 
    }

    check_uchip_when_build (tower_type: any, level: any) {
        // var build_chip = this.tower_params[tower_type - 1][level - 1].build_chip; 
        // var uchip = ugame.get_uchip(); 
        // if (uchip >= build_chip) { 
            // return true; 
        // } 
        // return false; 
    }

    show_tower_builder () {
        // var s = cc.scaleTo(0.3, 1).easing(cc.easeBackOut()); 
        // if (this.is_builded === false) { // 还没有塔，所以要show builder 
            // this.gui_tower_builder.show_tower_builder(this); 
            // this.gui_tower_builder.node.scale = 0; 
            // this.gui_tower_builder.node.runAction(s); 
        // } 
        // else { // 已经创建，所以要显示撤销 
            // this.gui_tower_builder.show_tower_undo(this); 
            // this.gui_tower_builder.node.scale = 0; 
            // this.gui_tower_builder.node.runAction(s); 
        // } 
    }

    remove_builder_tower () {
        // if (this.is_builded === false) { 
            // return; 
        // } 
        // this.builded_tower.removeFromParent(); 
        // this.builded_tower = null; 
        // this.is_builded = false; 
        // this.tower_type = 0; 
        // this.icon.active = true; 
    }

    on_tower_undo_click () {
        // if (this.is_builded === false) { 
            // return; 
        // } 
        // var tower_com = this.get_build_tower_com(); 
        // var tower_level = tower_com.get_tower_level(); 
        // var undo_chip = this.tower_params[this.tower_type - 1][tower_level - 1].build_chip; 
        // ugame.add_chip(undo_chip); 
        // this.game_scene.show_game_uchip(); 
        // this.builded_tower.removeFromParent(); 
        // this.builded_tower = null; 
        // this.is_builded = false; 
        // this.tower_type = 0; 
        // this.icon.active = true; 
    }

    on_tower_build_click (t: any, tower_type: any) {
        // tower_type = parseInt(tower_type); 
        // if (tower_type <= 0 || this.tower_type > 4) { 
            // return; 
        // } 
        // if (!this.check_uchip_when_build(tower_type, 1)) { 
            // return; 
        // } 
        // this.tower_type = tower_type; 
        // this.icon.active = false; 
        // this.builded_tower = cc.instantiate(this.tower_prefabs[tower_type - 1]); 
        // this.map_root.addChild(this.builded_tower); 
        // var center_pos = this.node.getPosition(); 
        // center_pos.x  += this.tower_offset[tower_type - 1].x; 
        // center_pos.y  += this.tower_offset[tower_type - 1].y; 
        // this.builded_tower.setPosition(center_pos); 
        // this.builded_tower.active = true; 
        // this.is_builded = true; 
        // var build_chip = this.tower_params[tower_type - 1][0].build_chip; 
        // ugame.add_chip(-build_chip); 
        // this.game_scene.show_game_uchip(); 
    }

    get_build_tower_com () {
        // var tower_com = null; 
        // switch(this.tower_type) { 
            // case 1: // 弓箭塔 
                // tower_com = this.builded_tower.getComponent("arrow_tower"); 
            // break; 
            // case 2: // 法师塔 
                // tower_com = this.builded_tower.getComponent("warlock_tower"); 
            // break; 
            // case 3: // 炮塔 
                // tower_com = this.builded_tower.getComponent("cannon_tower"); 
            // break; 
            // case 4: // 兵塔 
                // tower_com = this.builded_tower.getComponent("infantry_tower"); 
            // break; 
        // } 
        // return tower_com; 
    }

    on_tower_upgrade_click () {
        // if (this.is_builded === false || this.builded_tower === null) { 
            // return; 
        // } 
        // var tower_com = this.get_build_tower_com(); 
        // var tower_level = tower_com.get_tower_level(); 
        // if (tower_level >= 4) { 
            // return; 
        // } 
        // var upgrade_chip = this.tower_params[this.tower_type - 1][tower_level].build_chip -  
                           // this.tower_params[this.tower_type - 1][tower_level - 1].build_chip; 
        // if (upgrade_chip > ugame.get_uchip()) { 
            // return; 
        // } 
        // if (tower_com) { 
            // var tower_level = tower_com.upgrade_tower(); 
        // } 
        // ugame.add_chip(-upgrade_chip); 
        // this.game_scene.show_game_uchip(); 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var ugame = require("ugame");
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
//         // 弓箭塔，法师塔, 炮塔, 兵塔
//         tower_prefabs: {
//             type: cc.Prefab,
//             default: [],
//         },
//         
//         tower_offset: {
//             type: cc.Vec2,
//             default: [],
//         },
//     },
// 
//     // use this for initialization
//     // 1, 弓箭, 2, 法师, 3,炮塔, 4兵塔
//     onLoad: function () {
//         this.gui_tower_builder = cc.find("UI_ROOT/gui_tower_builder").getComponent("gui_tower_builder");
//        
//         
//         this.icon = this.node.getChildByName("icon");
//         
//         this.tower_type = 0;
//         this.builded_tower = null;
//         this.is_builded = false;
//         this.map_root = cc.find("UI_ROOT/map_root");
// 
//         // 四种塔索对应的参数
//         this.tower_params = [null, null, null, null];
//         this.tower_params[0] = require("arrow_tower_params");
//         this.tower_params[1] = require("warlock_tower_params");
//         this.tower_params[2] = require("cannon_tower_params");
//         this.tower_params[3] = require("infantry_tower_params");
// 
//         this.game_scene = cc.find("UI_ROOT").getComponent("game_scene");
//     },
//     
//     check_uchip_when_build: function(tower_type, level) {
//         var build_chip = this.tower_params[tower_type - 1][level - 1].build_chip;
// 
//         var uchip = ugame.get_uchip();
//         if (uchip >= build_chip) {
//             return true;
//         }
// 
//         return false;
//     },
// 
//     show_tower_builder: function() {
//         var s = cc.scaleTo(0.3, 1).easing(cc.easeBackOut());
//         if (this.is_builded === false) { // 还没有塔，所以要show builder
//             this.gui_tower_builder.show_tower_builder(this);
//             this.gui_tower_builder.node.scale = 0;
//             this.gui_tower_builder.node.runAction(s);
//         }
//         else { // 已经创建，所以要显示撤销
//             this.gui_tower_builder.show_tower_undo(this);
//             this.gui_tower_builder.node.scale = 0;
//             this.gui_tower_builder.node.runAction(s);
//         }
//     },
//     
//     remove_builder_tower: function() {
//         if (this.is_builded === false) {
//             return;
//         }
//         this.builded_tower.removeFromParent();
//         this.builded_tower = null;
//         this.is_builded = false;
//         this.tower_type = 0;
//         this.icon.active = true;
//     },
//     
//     on_tower_undo_click: function() {
//         if (this.is_builded === false) {
//             return;
//         }
//         
//         // 回收金币
//         var tower_com = this.get_build_tower_com();
//         var tower_level = tower_com.get_tower_level();
//         var undo_chip = this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
//         ugame.add_chip(undo_chip);
//         this.game_scene.show_game_uchip();
//         // end 
// 
//         this.builded_tower.removeFromParent();
//         this.builded_tower = null;
//         this.is_builded = false;
//         this.tower_type = 0;
//         this.icon.active = true;
//     },
//     
//     // 1, 弓箭, 2, 法师, 3,炮塔, 4兵塔
//     on_tower_build_click: function(t, tower_type) {
//         tower_type = parseInt(tower_type);
//         
//         if (tower_type <= 0 || this.tower_type > 4) {
//             return;
//         }
//         
//         if (!this.check_uchip_when_build(tower_type, 1)) {
//             return;
//         }
//         
//         this.tower_type = tower_type;
//         this.icon.active = false;
//         
//         // 造一个塔
//         this.builded_tower = cc.instantiate(this.tower_prefabs[tower_type - 1]);
//         this.map_root.addChild(this.builded_tower);
//         
//         var center_pos = this.node.getPosition();
//         center_pos.x  += this.tower_offset[tower_type - 1].x;
//         center_pos.y  += this.tower_offset[tower_type - 1].y;
//         
//         this.builded_tower.setPosition(center_pos);
//         this.builded_tower.active = true;
//         this.is_builded = true;
//         // end 
//         
//         // 消耗你的金币
//         var build_chip = this.tower_params[tower_type - 1][0].build_chip;
//         ugame.add_chip(-build_chip);
//         this.game_scene.show_game_uchip();
//         // end 
//     },
//     
//     get_build_tower_com: function() {
//         var tower_com = null;
//         switch(this.tower_type) {
//             case 1: // 弓箭塔
//                 tower_com = this.builded_tower.getComponent("arrow_tower");
//             break;
//             case 2: // 法师塔
//                 tower_com = this.builded_tower.getComponent("warlock_tower");
//             break;
//             case 3: // 炮塔
//                 tower_com = this.builded_tower.getComponent("cannon_tower");
//             break;
//             case 4: // 兵塔
//                 tower_com = this.builded_tower.getComponent("infantry_tower");
//             break;
//         }
// 
//         return tower_com;
//     },
// 
//     on_tower_upgrade_click: function() {
// 
//         if (this.is_builded === false || this.builded_tower === null) {
//             return;
//         }
//         
//         // 检查升级所要的金币
//         var tower_com = this.get_build_tower_com();
// 
//         var tower_level = tower_com.get_tower_level();
//         if (tower_level >= 4) {
//             return;
//         }
// 
//         var upgrade_chip = this.tower_params[this.tower_type - 1][tower_level].build_chip - 
//                            this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
//         if (upgrade_chip > ugame.get_uchip()) {
//             return;
//         }
// 
// 
//         // end 
//         
// 
//         if (tower_com) {
//             var tower_level = tower_com.upgrade_tower();
//         }
// 
//         // 消耗金币
//         ugame.add_chip(-upgrade_chip);
//         this.game_scene.show_game_uchip();
//         // end 
//     },
//     
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
