// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ResManagerPro } from "../../FrameWork/manager/ResManagerPro";
import TowerEntity from "./Entities/TowerEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ECSFactory extends cc.Component {
    private static _instance:ECSFactory=null
    onLoad () {
        if(null===ECSFactory._instance){
            ECSFactory._instance=this
        }
        else{
            this.destroy()
            return
        }

        let canvas=cc.find("Canvas");
        this.towerNode=canvas.getChildByName("towerNode");
    }

    public static getInstance():ECSFactory{
        return ECSFactory._instance
    }

    private static entityID:number=0;
    private towerNode:cc.Node=null;

    async createTowerEntity(tower_type:number,world_pos:cc.Vec2):Promise<TowerEntity>{
        console.log("createTowerEntity",tower_type,world_pos);

        let entity:TowerEntity=new TowerEntity();
        
        let prefab=null
        if(1==tower_type){
            prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/arrow_tower",cc.Prefab) as cc.Prefab;
        }
        else if(2==tower_type){
            prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/warlock_tower",cc.Prefab) as cc.Prefab;
        }
        else if(3==tower_type){
            prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/cannon_tower",cc.Prefab) as cc.Prefab;
        }
        else if(4==tower_type){
            prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/infantry_tower",cc.Prefab) as cc.Prefab;
        }
        
        let builded_tower = cc.instantiate(prefab) as cc.Node;
        this.towerNode.addChild(builded_tower);
        
        var center_pos = this.towerNode.convertToNodeSpaceAR(world_pos);
        console.log(center_pos);
        builded_tower.setPosition(center_pos);
        builded_tower.active = true;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=builded_tower;

        entity.transformComponent.x=center_pos.x;
        entity.transformComponent.y=center_pos.y;

        return entity;
    }
}
