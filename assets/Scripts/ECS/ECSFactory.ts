// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ResManagerPro } from "../../FrameWork/manager/ResManagerPro";
import { Enemy, TowerType } from "../Enum";
import ArrowEntity from "./Entities/ArrowEntity";
import CannonEntity from "./Entities/CannonEntity";
import EnemyEntity from "./Entities/EnemyEntity";
import InfantryEntity from "./Entities/InfantryEntity";
import TowerEntity from "./Entities/TowerEntity";
import WarlockEntity from "./Entities/WarlockEntity";

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
        this.enemyNode=canvas.getChildByName("enemyNode");
    }

    public static getInstance():ECSFactory{
        return ECSFactory._instance
    }

    private static entityID:number=0;
    private towerNode:cc.Node=null;
    private enemyNode:cc.Node=null;
    async createEnemyEntity(enemy_type:number,road_data:any,actor_params:any):Promise<EnemyEntity>{
        //console.log(road_data);
        let entity:EnemyEntity=new EnemyEntity();

        let enemy_prefab:cc.Prefab=null;
        if(Enemy.Bear==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_bear",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Forkman==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_forkman",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Small1==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small1",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Gorilla==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_gorilla",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Small2==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small2",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Carry==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_carry",cc.Prefab) as cc.Prefab;
        }
        else if(Enemy.Small3==enemy_type){
            enemy_prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Enemy/ememy_small3",cc.Prefab) as cc.Prefab;
        }
        var enemy = cc.instantiate(enemy_prefab);
        enemy.active = true;
        this.enemyNode.addChild(enemy);
        enemy.setPosition(cc.v2(road_data[0].x, road_data[0].y));

        entity.navComponent.path=road_data;
        entity.navComponent.curTime=0;
        entity.navComponent.curIndex=0;
        entity.navComponent.speed=actor_params.speed;

        entity.transformComponent.x=road_data[0].x;
        entity.transformComponent.y=road_data[0].y;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=enemy;

        entity.unitComponent.speed=actor_params.speed;
        entity.unitComponent.attack=actor_params.attack;
        entity.unitComponent.health=actor_params.health;
        entity.unitComponent.player_hurt=actor_params.player_hurt;
        entity.unitComponent.bonues_chip=actor_params.bonues_chip;

        return entity;
    }

    async createArrowEntity(world_pos:cc.Vec2):Promise<TowerEntity>{
        let entity:ArrowEntity=new ArrowEntity();
        
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/arrow_tower",cc.Prefab) as cc.Prefab;
        
        let builded_tower = cc.instantiate(prefab) as cc.Node;
        this.towerNode.addChild(builded_tower);
        
        var center_pos = this.towerNode.convertToNodeSpaceAR(world_pos);
        builded_tower.setPosition(center_pos);
        builded_tower.active = true;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=builded_tower;

        entity.transformComponent.x=center_pos.x;
        entity.transformComponent.y=center_pos.y;

        entity.roleComponent.type=TowerType.Arrow;

        return entity;
    }

    async createWarlockEntity(world_pos:cc.Vec2):Promise<TowerEntity>{
        let entity:WarlockEntity=new WarlockEntity();
        
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/warlock_tower",cc.Prefab) as cc.Prefab;
        
        let builded_tower = cc.instantiate(prefab) as cc.Node;
        this.towerNode.addChild(builded_tower);
        
        var center_pos = this.towerNode.convertToNodeSpaceAR(world_pos);
        builded_tower.setPosition(center_pos);
        builded_tower.active = true;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=builded_tower;

        entity.transformComponent.x=center_pos.x;
        entity.transformComponent.y=center_pos.y;

        entity.roleComponent.type=TowerType.Warlock;

        return entity;
    }

    async createCannonEntity(world_pos:cc.Vec2):Promise<TowerEntity>{
        let entity:CannonEntity=new CannonEntity();
        
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/cannon_tower",cc.Prefab) as cc.Prefab;
        
        let builded_tower = cc.instantiate(prefab) as cc.Node;
        this.towerNode.addChild(builded_tower);
        
        var center_pos = this.towerNode.convertToNodeSpaceAR(world_pos);
        builded_tower.setPosition(center_pos);
        builded_tower.active = true;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=builded_tower;

        entity.transformComponent.x=center_pos.x;
        entity.transformComponent.y=center_pos.y;

        entity.roleComponent.type=TowerType.Cannon;

        return entity;
    }

    async createInfantryEntity(world_pos:cc.Vec2):Promise<TowerEntity>{
        let entity:InfantryEntity=new InfantryEntity();
        
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","Game/infantry_tower",cc.Prefab) as cc.Prefab;
        
        let builded_tower = cc.instantiate(prefab) as cc.Node;
        this.towerNode.addChild(builded_tower);
        
        var center_pos = this.towerNode.convertToNodeSpaceAR(world_pos);
        builded_tower.setPosition(center_pos);
        builded_tower.active = true;

        entity.baseComponent.entityID=ECSFactory.entityID++;
        entity.baseComponent.gameObject=builded_tower;

        entity.transformComponent.x=center_pos.x;
        entity.transformComponent.y=center_pos.y;

        entity.roleComponent.type=TowerType.Infantry;

        return entity;
    }
}
