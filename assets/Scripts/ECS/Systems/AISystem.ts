// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameDataManager from "../../Data/GameDataManager";
import { AnimateState } from "../../Enum";
import AnimateComponent from "../Components/AnimateComponent";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AISystem extends cc.Component {

    private static _instance:AISystem=null
    onLoad () {
        if(null===AISystem._instance){
            AISystem._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():AISystem{
        return AISystem._instance;
    }

    onUpdate(dt:number,towerAnimateComponent:AnimateComponent,towerRoleComponent:RoleComponent,towerAttackComponent:AttackComponent,
        towerBaseComponent,enemyTransformComponent:TransformComponent,enemyBaseComponent:BaseComponent){

        var src = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0,0))
        var search_R = GameDataManager.getInstance().arrow_tower_params[towerRoleComponent.level - 1].search_R;
        var dst = enemyBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0,0))
        var dir = dst.sub(src);
        if (search_R >= (dir.mag())) {
            // 攻击
            towerAttackComponent.activeTime=1.0;
            towerAnimateComponent.id=enemyBaseComponent.entityID;
            towerAnimateComponent.dstPos=dst;
            towerAnimateComponent.state=AnimateState.Start;
            return true
        }
        return false
    }
}
