// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuiTowerBuilder extends UIControl {
    gui_builder: cc.Node = null;
    gui_undo: cc.Node = null;
    tower_builder = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.gui_builder = this.getChildByUrl("gui_builder");
        this.gui_undo = this.getChildByUrl("gui_undo");
        
        this.node.active = false;
        this.tower_builder = null;

        this.buttonAddClickEvent("gui_builder/mask", this.close_gui_builder, this);
        this.buttonAddClickEvent("gui_undo/mask", this.close_gui_builder, this);
    }

    show_tower_builder(tower_buidler) {
        this.tower_builder = tower_buidler;
        if (!this.tower_builder) {
            return;
        }
        
        this.node.active = true;
        this.gui_builder.active = true;
        this.gui_undo.active = false;
        
        
        this.node.x = tower_buidler.node.x;
        this.node.y = tower_buidler.node.y;
    }
    
    show_tower_undo(tower_buidler) {
        this.tower_builder = tower_buidler;
        if (!this.tower_builder) {
            return;
        }
        
        this.node.active = true;
        this.gui_builder.active = false;
        this.gui_undo.active = true;
        
        
        this.node.x = tower_buidler.node.x;
        this.node.y = tower_buidler.node.y;
    }
    
    on_build_tower_click(t, tower_type) {
        if (!this.tower_builder) {
            return;
        }
        
        this.tower_builder.on_tower_build_click(t, tower_type);
        this.close_gui_builder();
    }
    
    on_undo_tower_click() {
        if (!this.tower_builder) {
            return;
        }
        
        this.tower_builder.on_tower_undo_click();
        this.close_gui_builder();
    }
    
    on_upgrade_tower_click() {
        if (!this.tower_builder) {
            return;
        }
        this.tower_builder.on_tower_upgrade_click();
        this.close_gui_builder();
    }
    
    close_gui_builder() {
        this.node.active = false;
    }
}
