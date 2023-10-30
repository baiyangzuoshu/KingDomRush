// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { UIControl } from "../../FrameWork/ui/UIControl";
import GameDataManager from "../Data/GameDataManager";
import { GameUI } from "../EventName";
import GuiTowerBuilder from "./GuiTowerBuilder";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerBuilder extends UIControl {
    gui_tower_builder:GuiTowerBuilder=null;
    icon:cc.Node=null;
    tower_type:number=0;
    builded_tower:cc.Node=null;
    is_builded:boolean=false;
    map_root:cc.Node=null;
    tower_params:any[]=[];
    game_scene:any=null;
    tower_prefabs:cc.Prefab[]=[];
    tower_offset:Array<cc.Vec2>=[];
    index:number=0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.tower_offset.push(cc.v2(-8,-4));
        this.tower_offset.push(cc.v2(-5,7));
        this.tower_offset.push(cc.v2(-1,8));
        this.tower_offset.push(cc.v2(-5,7));
       
        
        this.icon = this.node.getChildByName("icon");
        
        this.tower_type = 0;
        this.builded_tower = null;
        this.is_builded = false;
        //this.map_root = cc.find("GameUI/map_root");

        // 四种塔索对应的参数
        this.tower_params = [null, null, null, null];
        this.tower_params[0] = GameDataManager.getInstance().arrow_tower_params
        this.tower_params[1] = GameDataManager.getInstance().warlock_tower_params
        this.tower_params[2] = GameDataManager.getInstance().cannon_tower_params
        this.tower_params[3] = GameDataManager.getInstance().infantry_tower_params

        //this.game_scene = cc.find("GameUI").getComponent("game_scene");

        this.buttonAddClickEvent("click_mask", this.on_click_mask,this);
    }

    setData(index:number){
        this.index=index;
    }

    on_click_mask(btn:cc.Button) {
        console.log("on_click_mask",this.index);
        this.show_tower_builder();
    }

    check_uchip_when_build(tower_type, level) {
        var build_chip = this.tower_params[tower_type - 1][level - 1].build_chip;

        var uchip = GameDataManager.getInstance().get_uchip();
        if (uchip >= build_chip) {
            return true;
        }

        return false;
    }

    show_tower_builder() {
        EventManager.getInstance().emit(GameUI.show_tower_builder,{is_builded:this.is_builded,tower_builder:this});
    }
    
    remove_builder_tower() {
        if (this.is_builded === false) {
            return;
        }
        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    }
    
    on_tower_undo_click() {
        if (this.is_builded === false) {
            return;
        }
        
        // 回收金币
        var tower_com = this.get_build_tower_com();
        var tower_level = tower_com.get_tower_level();
        var undo_chip = this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
        GameDataManager.getInstance().add_chip(undo_chip);
        this.game_scene.show_game_uchip();
        // end 

        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    }
    
    // 1, 弓箭, 2, 法师, 3,炮塔, 4兵塔
    on_tower_build_click(t, tower_type) {
        tower_type = parseInt(tower_type);
        
        if (tower_type <= 0 || this.tower_type > 4) {
            return;
        }
        
        if (!this.check_uchip_when_build(tower_type, 1)) {
            return;
        }
        
        this.tower_type = tower_type;
        this.icon.active = false;
        
        // 造一个塔
        this.builded_tower = cc.instantiate(this.tower_prefabs[tower_type - 1]);
        this.map_root.addChild(this.builded_tower);
        
        var center_pos = this.node.getPosition();
        center_pos.x  += this.tower_offset[tower_type - 1].x;
        center_pos.y  += this.tower_offset[tower_type - 1].y;
        
        this.builded_tower.setPosition(center_pos);
        this.builded_tower.active = true;
        this.is_builded = true;
        // end 
        
        // 消耗你的金币
        var build_chip = this.tower_params[tower_type - 1][0].build_chip;
        GameDataManager.getInstance().add_chip(-build_chip);
        this.game_scene.show_game_uchip();
        // end 
    }
    
    get_build_tower_com() {
        var tower_com = null;
        switch(this.tower_type) {
            case 1: // 弓箭塔
                tower_com = this.builded_tower.getComponent("arrow_tower");
            break;
            case 2: // 法师塔
                tower_com = this.builded_tower.getComponent("warlock_tower");
            break;
            case 3: // 炮塔
                tower_com = this.builded_tower.getComponent("cannon_tower");
            break;
            case 4: // 兵塔
                tower_com = this.builded_tower.getComponent("infantry_tower");
            break;
        }

        return tower_com;
    }

    on_tower_upgrade_click() {

        if (this.is_builded === false || this.builded_tower === null) {
            return;
        }
        
        // 检查升级所要的金币
        var tower_com = this.get_build_tower_com();

        var tower_level = tower_com.get_tower_level();
        if (tower_level >= 4) {
            return;
        }

        var upgrade_chip = this.tower_params[this.tower_type - 1][tower_level].build_chip - 
                           this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
        if (upgrade_chip > GameDataManager.getInstance().get_uchip()) {
            return;
        }


        // end 
        

        if (tower_com) {
            var tower_level = tower_com.upgrade_tower();
        }

        // 消耗金币
        GameDataManager.getInstance().add_chip(-upgrade_chip);
        this.game_scene.show_game_uchip();
        // end 
    }
}
