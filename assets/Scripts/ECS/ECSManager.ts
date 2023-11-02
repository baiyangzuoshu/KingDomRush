// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { TowerType } from "../Enum";
import ECSFactory from "./ECSFactory";
import EnemyEntity from "./Entities/EnemyEntity";
import TowerEntity from "./Entities/TowerEntity";
import NavSystem from "./Systems/NavSystem";

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
    private enemyEntityList:EnemyEntity[]=[];

    async createTowerEntity(tower_type:number,world_pos:cc.Vec2){
        if(TowerType.Arrow==tower_type){
            let entity:TowerEntity=await ECSFactory.getInstance().createArrowEntity(world_pos);

            this.towerEntityList.push(entity);
        }
        else if(TowerType.Cannon==tower_type){
            let entity:TowerEntity=await ECSFactory.getInstance().createCannonEntity(world_pos);

            this.towerEntityList.push(entity);
        }
        else if(TowerType.Infantry==tower_type){
            let entity:TowerEntity=await ECSFactory.getInstance().createInfantryEntity(world_pos);

            this.towerEntityList.push(entity);
        }
        else if(TowerType.Warlock==tower_type){
            let entity:TowerEntity=await ECSFactory.getInstance().createWarlockEntity(world_pos);

            this.towerEntityList.push(entity);
        }
    }

    async createEnemyEntity(enemy_type:number,road_data:any,actor_params:any){
        let entity:EnemyEntity=await ECSFactory.getInstance().createEnemyEntity(enemy_type,road_data,actor_params);

        this.enemyEntityList.push(entity);
    }

    navSystemEnemyUpdate(dt:number){
        for(let i=0;i<this.enemyEntityList.length;++i){
            NavSystem.getInstance().onUpdate(dt,this.enemyEntityList[i].navComponent,this.enemyEntityList[i].baseComponent,this.enemyEntityList[i].transformComponent);
        }
    }

    update (dt) {
        //敌军导航
        this.navSystemEnemyUpdate(dt);
    }
}
