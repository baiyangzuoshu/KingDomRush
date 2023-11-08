// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ResManagerPro } from "../../../FrameWork/manager/ResManagerPro";
import GameDataManager from "../../Data/GameDataManager";
import { AnimateState, TowerType } from "../../Enum";
import FrameAnimate from "../../Tools/FrameAnimate";
import AIComponent from "../Components/AIComponent";
import AnimateComponent from "../Components/AnimateComponent";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import NavComponent from "../Components/NavComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";
import UnitComponent from "../Components/UnitComponent";
import ECSUtil from "../ECSUtil";

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

    onTowerUpdate(dt:number,towerAnimateComponent:AnimateComponent,towerRoleComponent:RoleComponent,towerAttackComponent:AttackComponent,
        towerBaseComponent,enemyTransformComponent:TransformComponent,enemyBaseComponent:BaseComponent){
        
        if(towerRoleComponent.type==TowerType.Infantry){
            towerAttackComponent.activeTime=4.0;
            towerAnimateComponent.state=AnimateState.Start;
        }
        else{
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
        }
        
        return false
    }

    async onInfantryActorUpdate(dt:number,
        actorAIComponent:AIComponent,actorBaseComponent:BaseComponent,actorTransformComponent:TransformComponent,actorNavComponent:NavComponent,
        enemyUnitComponent:UnitComponent,enemyBaseComponent:BaseComponent,enemyRoleComponent:RoleComponent){
        var src = actorBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0,0))
        var attack_R = actorAIComponent.attack_R;
        let search_R = actorAIComponent.search_R;
        var dst = enemyBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0,0))
        var dir = dst.sub(src);
        if (attack_R >= (dir.mag())) {// 攻击
            actorAIComponent.thinkTime=1;
            // 播放攻击动画
            let anim=actorBaseComponent.gameObject.getChildByName("anim");
            var frame_anim = anim.addComponent(FrameAnimate);
            let walk_anim:cc.SpriteFrame[]=new Array();
            for(let i=0;i<3;i++){
                let frame=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/bing_tower/actor1/attack/attack1_"+i,cc.SpriteFrame) as cc.SpriteFrame;
                walk_anim.push(frame);
            }
            frame_anim.sprite_frames = walk_anim;
            frame_anim.duration = 0.1;
            frame_anim.play_once(function(){
                
            });

            ECSUtil.getInstance().on_arrowBullet_shoot(10,enemyUnitComponent,enemyBaseComponent,enemyRoleComponent);
        }
        else if(search_R>=(dir.mag())){//追击
            let dx=dst.x-src.x;
            let dy=dst.y-src.y;
            let dis=Math.sqrt(dx*dx+dy*dy);
            let vx=dx/dis*actorNavComponent.speed;
            let vy=dy/dis*actorNavComponent.speed;

            actorBaseComponent.gameObject.x=vx*dt+actorTransformComponent.x;
            actorBaseComponent.gameObject.y=vy*dt+actorTransformComponent.y;
            actorTransformComponent.x=actorBaseComponent.gameObject.x;
            actorTransformComponent.y=actorBaseComponent.gameObject.y;

            if (vx < 0) {
                actorBaseComponent.gameObject.getChildByName("anim").scaleX = -1;
            }
            else {
                actorBaseComponent.gameObject.getChildByName("anim").scaleX = 1;
            }
        }
    }
}
