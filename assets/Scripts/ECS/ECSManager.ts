// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { AnimateState, TowerType } from "../Enum";
import ECSFactory from "./ECSFactory";
import BulletEntity from "./Entities/BulletEntity";
import EnemyEntity from "./Entities/EnemyEntity";
import TowerEntity from "./Entities/TowerEntity";
import AISystem from "./Systems/AISystem";
import AnimateSystem from "./Systems/AnimateSystem";
import AttackSystem from "./Systems/AttackSystem";
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
    private bulletEntityList:BulletEntity[]=[];
    //
    async createBulletEntity(tower_type:number,tower_level:number, w_pos:cc.Vec2, w_dst_pos:cc.Vec2, enemyID:number){
        if(TowerType.Arrow==tower_type){
            let entity:BulletEntity=await ECSFactory.getInstance().createArrowBulletEntity(tower_type,tower_level, w_pos, w_dst_pos, enemyID);
            this.bulletEntityList.push(entity);
        }
        else if(TowerType.Cannon==tower_type){
            let entity:BulletEntity=await ECSFactory.getInstance().createCannonBulletEntity(tower_type,tower_level, w_pos, w_dst_pos, enemyID);
            this.bulletEntityList.push(entity);
        }
        else if(TowerType.Infantry==tower_type){
            let entity:BulletEntity=await ECSFactory.getInstance().createInfantryBulletEntity(tower_type,tower_level, w_pos, w_dst_pos, enemyID);
            this.bulletEntityList.push(entity);
        }
        else if(TowerType.Warlock==tower_type){
            let entity:BulletEntity=await ECSFactory.getInstance().createWarlockBulletEntity(tower_type,tower_level, w_pos, w_dst_pos, enemyID);
            this.bulletEntityList.push(entity);
        }
    }

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
    //
    public cleanBulletEntity(){
        for(let i=0;i<this.bulletEntityList.length;++i){
            if(this.bulletEntityList[i].roleComponent.isDead){
                this.bulletEntityList[i].baseComponent.gameObject.destroy();
                this.bulletEntityList.splice(i,1);
                --i;
            }
        }
    }
    public cleanEnemyEntity(){
        for(let i=0;i<this.enemyEntityList.length;++i){
            if(this.enemyEntityList[i].roleComponent.isDead){
                this.enemyEntityList[i].baseComponent.gameObject.destroy();
                this.enemyEntityList.splice(i,1);
                --i;
            }
        }
    }
    //
    public getEnemyEntityByID(id:number):EnemyEntity{
        for(let i=0;i<this.enemyEntityList.length;++i){
            if(this.enemyEntityList[i].baseComponent.entityID==id){
                return this.enemyEntityList[i];
            }
        }
        return null;
    }
    //
    navSystemEnemyUpdate(dt:number){
        for(let i=0;i<this.enemyEntityList.length;++i){
            if(this.enemyEntityList[i].roleComponent.isDead){
                continue;
            }
            NavSystem.getInstance().onUpdate(dt,this.enemyEntityList[i].navComponent,this.enemyEntityList[i].baseComponent,this.enemyEntityList[i].transformComponent);
        }
    }

    AISystemTower(dt:number){
        for(let i=0;i<this.towerEntityList.length;++i){
            let towerAttackComponent=this.towerEntityList[i].attackComponent;
            if(towerAttackComponent.enemyID>0){
                continue;
            }

            towerAttackComponent.activeTime-=dt;
            if(towerAttackComponent.activeTime>0){
                continue;
            }

            for(let j=0;j<this.enemyEntityList.length;++j){
                if(this.enemyEntityList[j].roleComponent.isDead){
                    continue;
                }

                AISystem.getInstance().onUpdate(dt,this.towerEntityList[i].animateComponent,this.towerEntityList[i].roleComponent,
                    towerAttackComponent,this.towerEntityList[i].baseComponent,
                    this.enemyEntityList[j].transformComponent,this.enemyEntityList[j].baseComponent);
            }
        }
    }

    attackSystemTower(dt:number){
        for(let i=0;i<this.towerEntityList.length;++i){
            let tower=this.towerEntityList[i];
            if(tower.attackComponent.enemyID>0){
                let enemy=this.getEnemyEntityByID(tower.attackComponent.enemyID);
                if(!enemy.roleComponent.isDead){
                    AttackSystem.getInstance().onUpdate(dt,tower.attackComponent,tower.baseComponent,tower.roleComponent);
                }
            }
        }
    }

    async animateSystemBullet(dt:number){
        for(let i=0;i<this.bulletEntityList.length;++i){
            let bullet=this.bulletEntityList[i];
            if(bullet.roleComponent.isDead){
                continue;
            }

            if(bullet.animateComponent.state!=AnimateState.Stop){
                await AnimateSystem.getInstance().onBulletUpdate(dt,bullet.roleComponent,bullet.animateComponent,bullet.attackComponent,bullet.baseComponent);
            }
        }
    }

    async animateSystemArrow(dt:number){
        for(let i=0;i<this.towerEntityList.length;++i){
            let tower=this.towerEntityList[i];
            if(tower.roleComponent.isDead){
                continue;
            }
            if(tower.animateComponent.state!=AnimateState.Stop){
                await AnimateSystem.getInstance().onTowerUpdate(dt,tower.roleComponent,tower.animateComponent,tower.baseComponent,tower.attackComponent);
            }
        }
    }

    async update (dt) {
        //敌军导航
        this.navSystemEnemyUpdate(dt);
        //塔的AI
        this.AISystemTower(dt);
        //
        this.attackSystemTower(dt);
        //
        await this.animateSystemBullet(dt);
        await this.animateSystemArrow(dt);
        //
        this.cleanBulletEntity();
        this.cleanEnemyEntity();
    }
}
