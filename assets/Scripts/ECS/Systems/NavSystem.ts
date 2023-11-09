// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../../FrameWork/manager/EventManager";
import { GameUI } from "../../EventName";
import BaseComponent from "../Components/BaseComponent";
import NavComponent from "../Components/NavComponent";
import TransformComponent from "../Components/TransformComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NavSystem extends cc.Component {
    private static _instance:NavSystem=null
    onLoad () {
        if(null===NavSystem._instance){
            NavSystem._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():NavSystem{
        return NavSystem._instance
    }

    onEnemyUpdate(dt:number,navComponent:NavComponent,baseComponent:BaseComponent,transformComponent:TransformComponent){
        if(navComponent.curTime>0){
            navComponent.curTime-=dt;
            baseComponent.gameObject.x=navComponent.vx*dt+transformComponent.x;
            baseComponent.gameObject.y=navComponent.vy*dt+transformComponent.y;
            transformComponent.x=baseComponent.gameObject.x;
            transformComponent.y=baseComponent.gameObject.y;
            return;
        }
        if(navComponent.curIndex>=navComponent.path.length-1){
            return;
        }
        let curPos:cc.Vec2=navComponent.path[navComponent.curIndex];
        let nextPos:cc.Vec2=navComponent.path[navComponent.curIndex+1];
        let dx=nextPos.x-curPos.x;
        let dy=nextPos.y-curPos.y;
        let dis=Math.sqrt(dx*dx+dy*dy);
        navComponent.vx=dx/dis*navComponent.speed;
        navComponent.vy=dy/dis*navComponent.speed;
        navComponent.curTime=dis/navComponent.speed;
        navComponent.curIndex++;
        if(navComponent.curIndex>=navComponent.path.length-1){
            EventManager.getInstance().emit(GameUI.on_player_attacked,{hurt:1})
        }
    }

    onActorUpdate(dt:number,navComponent:NavComponent,baseComponent:BaseComponent,transformComponent:TransformComponent){
        if(navComponent.curTime>0){
            navComponent.curTime-=dt;
            baseComponent.gameObject.x=navComponent.vx*dt+transformComponent.x;
            baseComponent.gameObject.y=navComponent.vy*dt+transformComponent.y;
            transformComponent.x=baseComponent.gameObject.x;
            transformComponent.y=baseComponent.gameObject.y;

            if (navComponent.vx < 0) {
                baseComponent.gameObject.getChildByName("anim").scaleX = -1;
            }
            else {
                baseComponent.gameObject.getChildByName("anim").scaleX = 1;
            }

            return;
        }
        if(navComponent.curIndex>=navComponent.path.length-1){
            return;
        }
        let curPos:cc.Vec2=navComponent.path[navComponent.curIndex];
        let nextPos:cc.Vec2=navComponent.path[navComponent.curIndex+1];
        let dx=nextPos.x-curPos.x;
        let dy=nextPos.y-curPos.y;
        let dis=Math.sqrt(dx*dx+dy*dy);
        navComponent.vx=dx/dis*navComponent.speed;
        navComponent.vy=dy/dis*navComponent.speed;
        navComponent.curTime=dis/navComponent.speed;
        navComponent.curIndex++;
    }
}
