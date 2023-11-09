// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { AnimateState, RoleState, TowerType } from "../Enum";
import ECSFactory from "./ECSFactory";
import BulletEntity from "./Entities/BulletEntity";
import EnemyEntity from "./Entities/EnemyEntity";
import { InfantryActor } from "./Entities/InfantryActor";
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
    private actorEntityList:InfantryActor[]=[];
    //
    public getEnemyTotal(){
        return this.enemyEntityList.length;
    }
    public getEnemyEntityByIndex(index:number):EnemyEntity{
        for(let i=0;i<this.enemyEntityList.length;i++){
            if(i==index){
                return this.enemyEntityList[i];
            }
        }
        return null;
    }
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
            let entity:InfantryActor=await ECSFactory.getInstance().createInfantryActor(tower_type,tower_level, w_pos, w_dst_pos, enemyID);
            this.actorEntityList.push(entity);
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
    public cleanBulletEntity(dt:number){
        for(let i=0;i<this.bulletEntityList.length;++i){
            if(this.bulletEntityList[i].roleComponent.state==RoleState.Dead){
                this.bulletEntityList[i].baseComponent.gameObject.destroy();
                this.bulletEntityList.splice(i,1);
                --i;
            }
        }
    }
    public cleanEnemyEntity(dt:number){
        for(let i=0;i<this.enemyEntityList.length;++i){
            if(this.enemyEntityList[i].roleComponent.state==RoleState.Dead){
                this.enemyEntityList[i].baseComponent.cleanTime-=dt;
                if(this.enemyEntityList[i].baseComponent.cleanTime<0){
                    this.enemyEntityList[i].baseComponent.gameObject.destroy();
                    this.enemyEntityList.splice(i,1);
                    --i;
                }
            }
        }
    }
    public cleanActorEntity(dt:number){
        for(let i=0;i<this.actorEntityList.length;++i){
            if(this.actorEntityList[i].roleComponent.state==RoleState.Dead){
                this.actorEntityList[i].baseComponent.cleanTime-=dt;
                if(this.actorEntityList[i].baseComponent.cleanTime<0){
                    this.actorEntityList[i].baseComponent.gameObject.destroy();
                    this.actorEntityList.splice(i,1);
                    --i;
                }
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
        //敌人
        for(let i=0;i<this.enemyEntityList.length;++i){
            if(this.enemyEntityList[i].roleComponent.state==RoleState.Dead){
                continue;
            }
            NavSystem.getInstance().onEnemyUpdate(dt,this.enemyEntityList[i].navComponent,this.enemyEntityList[i].baseComponent,this.enemyEntityList[i].transformComponent);
        }
    }

    navSystemActorUpdate(dt:number){
        //兵站士兵
        for(let i=0;i<this.actorEntityList.length;++i){
            if(this.actorEntityList[i].roleComponent.state==RoleState.Dead){
                continue;
            }
            NavSystem.getInstance().onActorUpdate(dt,this.actorEntityList[i].navComponent,this.actorEntityList[i].baseComponent,this.actorEntityList[i].transformComponent);
        }
    }

    async AISystemTower(dt:number){
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
                if(this.enemyEntityList[j].roleComponent.state==RoleState.Dead){
                    continue;
                }

                AISystem.getInstance().onTowerUpdate(dt,this.towerEntityList[i].animateComponent,this.towerEntityList[i].roleComponent,
                    towerAttackComponent,this.towerEntityList[i].baseComponent,
                    this.enemyEntityList[j].transformComponent,this.enemyEntityList[j].baseComponent);
            }
        }

        for(let i=0;i<this.actorEntityList.length;++i){
            this.actorEntityList[i].aiComponent.thinkTime-=dt;
            if(this.actorEntityList[i].aiComponent.thinkTime>0&&this.actorEntityList[i].roleComponent.state==RoleState.Dead){
                continue;
            }

            for(let j=0;j<this.enemyEntityList.length;++j){
                if(this.enemyEntityList[j].roleComponent.state==RoleState.Dead){
                    continue;
                }

                await AISystem.getInstance().onInfantryActorUpdate(dt,
                    this.actorEntityList[i].aiComponent,this.actorEntityList[i].baseComponent,this.actorEntityList[i].transformComponent,
                    this.actorEntityList[i].navComponent,this.actorEntityList[i].roleComponent,
                    this.enemyEntityList[j].unitComponent,this.enemyEntityList[j].baseComponent,this.enemyEntityList[j].roleComponent);
            }
        }
    }

    attackSystemTower(dt:number){
        for(let i=0;i<this.towerEntityList.length;++i){
            let tower=this.towerEntityList[i];
            if(tower.attackComponent.enemyID>0){
                if(6666==tower.attackComponent.enemyID){
                    AttackSystem.getInstance().createInfantryActorUpdate(dt,tower.attackComponent,tower.baseComponent,tower.roleComponent);
                }
                else{
                    let enemy=this.getEnemyEntityByID(tower.attackComponent.enemyID);
                    if(enemy&&enemy.roleComponent.state==RoleState.Active){
                        AttackSystem.getInstance().onTowerUpdate(dt,tower.attackComponent,tower.baseComponent,tower.roleComponent);
                    }
                }
            }
        }
    }

    async animateSystemBullet(dt:number){
        for(let i=0;i<this.bulletEntityList.length;++i){
            let bullet=this.bulletEntityList[i];
            if(bullet.roleComponent.state==RoleState.Dead){
                continue;
            }

            if(bullet.animateComponent.state==AnimateState.Start||bullet.animateComponent.state==AnimateState.Playing){
                await AnimateSystem.getInstance().onBulletUpdate(dt,bullet.roleComponent,bullet.animateComponent,bullet.attackComponent,bullet.baseComponent);
            }
        }
    }

    async animateSystemArrow(dt:number){
        for(let i=0;i<this.towerEntityList.length;++i){
            let tower=this.towerEntityList[i];
            if(tower.roleComponent.state==RoleState.Dead){
                continue;
            }
            if(tower.animateComponent.state==AnimateState.Start||tower.animateComponent.state==AnimateState.Playing){
                await AnimateSystem.getInstance().onTowerUpdate(dt,tower.roleComponent,tower.animateComponent,tower.baseComponent,tower.attackComponent);
            }
        }
    }

    async update (dt) {
        //敌军导航
        this.navSystemEnemyUpdate(dt);
        //
        this.navSystemActorUpdate(dt);
        //塔的AI
        await this.AISystemTower(dt);
        //
        this.attackSystemTower(dt);
        //
        await this.animateSystemBullet(dt);
        await this.animateSystemArrow(dt);
        //
        this.cleanBulletEntity(dt);
        this.cleanEnemyEntity(dt);
        this.cleanActorEntity(dt);
    }
}
