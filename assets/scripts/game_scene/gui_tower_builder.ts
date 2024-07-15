import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GuiTowerBuilder')
export class GuiTowerBuilder extends Component {

    onLoad () {
        // this.gui_builder = this.node.getChildByName("gui_builder"); 
        // this.gui_undo = this.node.getChildByName("gui_undo"); 
        // this.node.active = false; 
        // this.tower_builder = null; 
    }

    show_tower_builder (tower_buidler: any) {
        // this.tower_builder = tower_buidler; 
        // if (!this.tower_builder) { 
            // return; 
        // } 
        // this.node.active = true; 
        // this.gui_builder.active = true; 
        // this.gui_undo.active = false; 
        // this.node.x = tower_buidler.node.x; 
        // this.node.y = tower_buidler.node.y; 
    }

    show_tower_undo (tower_buidler: any) {
        // this.tower_builder = tower_buidler; 
        // if (!this.tower_builder) { 
            // return; 
        // } 
        // this.node.active = true; 
        // this.gui_builder.active = false; 
        // this.gui_undo.active = true; 
        // this.node.x = tower_buidler.node.x; 
        // this.node.y = tower_buidler.node.y; 
    }

    on_build_tower_click (t: any, tower_type: any) {
        // if (!this.tower_builder) { 
            // return; 
        // } 
        // this.tower_builder.on_tower_build_click(t, tower_type); 
        // this.close_gui_builder(); 
    }

    on_undo_tower_click () {
        // if (!this.tower_builder) { 
            // return; 
        // } 
        // this.tower_builder.on_tower_undo_click(); 
        // this.close_gui_builder(); 
    }

    on_upgrade_tower_click () {
        // if (!this.tower_builder) { 
            // return; 
        // } 
        // this.tower_builder.on_tower_upgrade_click(); 
        // this.close_gui_builder(); 
    }

    close_gui_builder () {
        // this.node.active = false; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
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
//     },
// 
//     // use this for initialization
//     onLoad: function () {
//         this.gui_builder = this.node.getChildByName("gui_builder");
//         this.gui_undo = this.node.getChildByName("gui_undo");
//         
//         this.node.active = false;
//         this.tower_builder = null;
//     },
//     
//     show_tower_builder: function(tower_buidler) {
//         this.tower_builder = tower_buidler;
//         if (!this.tower_builder) {
//             return;
//         }
//         
//         this.node.active = true;
//         this.gui_builder.active = true;
//         this.gui_undo.active = false;
//         
//         
//         this.node.x = tower_buidler.node.x;
//         this.node.y = tower_buidler.node.y;
//     },
//     
//     show_tower_undo: function(tower_buidler) {
//         this.tower_builder = tower_buidler;
//         if (!this.tower_builder) {
//             return;
//         }
//         
//         this.node.active = true;
//         this.gui_builder.active = false;
//         this.gui_undo.active = true;
//         
//         
//         this.node.x = tower_buidler.node.x;
//         this.node.y = tower_buidler.node.y;
//     },
//     
//     on_build_tower_click: function(t, tower_type) {
//         if (!this.tower_builder) {
//             return;
//         }
//         
//         this.tower_builder.on_tower_build_click(t, tower_type);
//         this.close_gui_builder();
//     },
//     
//     on_undo_tower_click: function() {
//         if (!this.tower_builder) {
//             return;
//         }
//         
//         this.tower_builder.on_tower_undo_click();
//         this.close_gui_builder();
//     },
//     
//     on_upgrade_tower_click: function() {
//         if (!this.tower_builder) {
//             return;
//         }
//         this.tower_builder.on_tower_upgrade_click();
//         this.close_gui_builder();
//     },
//     
//     close_gui_builder: function() {
//         this.node.active = false;
//     },
//     
//     // called every frame, uncomment this function to activate update callback
//     // update: function (dt) {
// 
//     // },
// });
