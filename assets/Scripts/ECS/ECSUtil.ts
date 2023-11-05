// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import GameDataManager from "../Data/GameDataManager";
import { GameUI } from "../EventName";
import BaseComponent from "./Components/BaseComponent";
import RoleComponent from "./Components/RoleComponent";
import UnitComponent from "./Components/UnitComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ECSUtil extends cc.Component {
    private static _instance:ECSUtil=null
    onLoad () {
        if(null===ECSUtil._instance){
            ECSUtil._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():ECSUtil{
        return ECSUtil._instance
    }

    public on_arrowBullet_shoot(attack_value:number,enemyUnitComponent:UnitComponent,enemyBaseComponent:BaseComponent,enemyRoleComponent:RoleComponent){
        enemyUnitComponent.health -= attack_value;
        if (enemyUnitComponent.health <= 0) {
            enemyUnitComponent.health = 0;
            enemyRoleComponent.isDead=true;
            // 加金币
            GameDataManager.getInstance().add_chip(enemyUnitComponent.bonues_chip);
            EventManager.getInstance().emit(GameUI.show_game_uchip);
            // end 
        }
        
        var per = enemyUnitComponent.health / enemyUnitComponent.maxHp;
        enemyBaseComponent.gameObject.getChildByName("blood_bar").getComponent(cc.ProgressBar).progress = per;
    }
}
