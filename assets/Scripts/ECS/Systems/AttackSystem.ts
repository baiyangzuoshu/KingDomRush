// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameDataManager from "../../Data/GameDataManager";
import { TowerType } from "../../Enum";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";
import ECSManager from "../ECSManager";
import EnemyEntity from "../Entities/EnemyEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AttackSystem extends cc.Component {
    private static _instance:AttackSystem=null
    onLoad () {
        if(null===AttackSystem._instance){
            AttackSystem._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():AttackSystem{
        return AttackSystem._instance;
    }

    onTowerUpdate(dt:number,towerAttackComponent:AttackComponent,towerBaseComponent:BaseComponent,
        towerRoleComponent:RoleComponent){
        
        let enemyEntity:EnemyEntity=ECSManager.getInstance().getEnemyEntityByID(towerAttackComponent.enemyID);
        if(null==enemyEntity){
            return
        }
        
        var center_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        var enemy_pos:cc.Vec2=enemyEntity.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        
        ECSManager.getInstance().createBulletEntity(towerRoleComponent.type,towerRoleComponent.level,center_pos,enemy_pos,towerAttackComponent.enemyID);
        towerAttackComponent.enemyID=0;
    }
    
    createInfantryActorUpdate(dt,towerAttackComponent:AttackComponent,towerBaseComponent:BaseComponent,
        towerRoleComponent:RoleComponent){
        var center_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, -15));
        var R = 60;
        var r = Math.random() * 2 * Math.PI;
        var w_dst_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(R * Math.cos(r), R * Math.sin(r)));
        
        ECSManager.getInstance().createBulletEntity(towerRoleComponent.type,towerRoleComponent.level,center_pos,w_dst_pos,towerAttackComponent.enemyID);
        towerAttackComponent.enemyID=0;
    }
}
