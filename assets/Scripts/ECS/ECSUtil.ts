// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import GameDataManager from "../Data/GameDataManager";
import { RoleState } from "../Enum";
import { GameUI } from "../EventName";
import BaseComponent from "./Components/BaseComponent";
import NavComponent from "./Components/NavComponent";
import RoleComponent from "./Components/RoleComponent";
import TransformComponent from "./Components/TransformComponent";
import UnitComponent from "./Components/UnitComponent";
import ECSManager from "./ECSManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ECSUtil extends cc.Component {
    private static _instance:ECSUtil=null
    onLoad () {
        if(null===ECSUtil._instance){
            ECSUtil._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():ECSUtil{
        return ECSUtil._instance
    }

    public on_arrowBullet_shoot(attack_value:number,enemyUnitComponent:UnitComponent,enemyBaseComponent:BaseComponent,enemyRoleComponent:RoleComponent){
        enemyUnitComponent.health -= attack_value;
        if (enemyUnitComponent.health <= 0) {
            enemyUnitComponent.health = 0;
            enemyRoleComponent.state=RoleState.Dead;
            // 加金币
            GameDataManager.getInstance().add_chip(enemyUnitComponent.bonues_chip);
            EventManager.getInstance().emit(GameUI.show_game_uchip);
            // end 
        }
        
        var per = enemyUnitComponent.health / enemyUnitComponent.maxHp;
        enemyBaseComponent.gameObject.getChildByName("blood_bar").getComponent(cc.ProgressBar).progress = per;
    }
    // 炸弹是砸伤一片
    public on_bullet_bomb(bomb_pos,bomb_R,attack_value) {
        let len=ECSManager.getInstance().getEnemyTotal();
        for(var i = 0; i < len; i ++) {
            let enemy= ECSManager.getInstance().getEnemyEntityByIndex(i);
            if(enemy&&enemy.roleComponent.state==RoleState.Active){
                var pos = enemy.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0,0));
                var dir = pos.sub(bomb_pos);
                if ((dir.mag()) <= bomb_R) {
                    this.on_arrowBullet_shoot(attack_value,enemy.unitComponent,enemy.baseComponent,enemy.roleComponent);
                }
            }
        }
    }

    public zorderSortNode(node:cc.Node) {
        var child = node.children;
        child.sort(function(lhs, rhs) {
            if (lhs.y > rhs.y) {
                return -1;
            }
            else if(lhs.y < rhs.y) {
                return 1;
            }
            
            return 0;
        });
        
        // y大的就会排在前面, y小的就会排在后面
        for(var i = 0; i < child.length; i ++) {
            child[i].zIndex = (1000 + i);
        }
        // end 
    }

    public position_after_time(dt,enemyTransformComponent:TransformComponent,enemyNavComponent:NavComponent) {
        // 表示物体正在运动
        var prev_pos = cc.v2(enemyTransformComponent.x, enemyTransformComponent.y);
        var next_step = enemyNavComponent.curIndex;
        let road_data=enemyNavComponent.path;

        while(dt > 0 && next_step <road_data.length) {
            var now_pos = road_data[next_step];
            // var dir = cc.pSub(now_pos, prev_pos);
            var dir = now_pos.sub(prev_pos);
            // var len = cc.pLength(dir);
            var len = (dir.mag());

            var t = len / enemyNavComponent.speed;
            if (dt > t) {
                dt -= t;
                prev_pos = now_pos;
                next_step ++;
            }
            else {
                var vx = enemyNavComponent.speed * dir.x / len;
                var vy = enemyNavComponent.speed * dir.y / len;
                var sx = vx * dt;
                var sy = vy * dt;

                prev_pos.x += sx;
                prev_pos.y += sy;
                return prev_pos;
            }
        }

        // 如果跑完所有的地图，我们的估算时间还没有用完，那么使用最后一个点
        // 作为我们的目标点
        return road_data[next_step - 1];
    }
}
