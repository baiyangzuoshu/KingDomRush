// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ECSFactory from "./ECSFactory";
import TowerEntity from "./Entities/TowerEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ECSManager extends cc.Component {
    private static _instance:ECSManager=null
    onLoad () {
        if(null===ECSManager._instance){
            ECSManager._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():ECSManager{
        return ECSManager._instance
    }

    private towerEntityList:TowerEntity[]=[];

    async createTowerEntity(tower_type:number,world_pos:cc.Vec2){
        let entity:TowerEntity=await ECSFactory.getInstance().createTowerEntity(tower_type,world_pos);

        this.towerEntityList.push(entity);
    }

    update (dt) {

    }
}
