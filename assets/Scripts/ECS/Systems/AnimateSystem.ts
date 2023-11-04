// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameDataManager from "../../Data/GameDataManager";
import AnimateComponent from "../Components/AnimateComponent";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import ECSManager from "../ECSManager";
import ECSUtil from "../ECSUtil";
import EnemyEntity from "../Entities/EnemyEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimateSystem extends cc.Component {

    private static _instance:AnimateSystem=null
    onLoad () {
        if(null===AnimateSystem._instance){
            AnimateSystem._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():AnimateSystem{
        return AnimateSystem._instance;
    }

    onBulletUpdate(dt:number,bulletRoleComponent:RoleComponent,bulletAnimateComponent:AnimateComponent,
        bulletAttackComponent:AttackComponent,bulletBaseComponent:BaseComponent){
        let speed = GameDataManager.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].speed;
        let attack = GameDataManager.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
        let enemyEntity:EnemyEntity=ECSManager.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
        let shoot_enemy = enemyEntity.baseComponent.gameObject;//enemy;
        let anim=bulletBaseComponent.gameObject.getChildByName("anim")
        var start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.srcPos);
        var dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.dstPos);
        
        // 发射的时候调整我们角度,设置好位置
        bulletBaseComponent.gameObject.setPosition(start_pos);
        anim.angle = 90;
        // end  
        // 创建一个贝塞尔的action来控制我们的子弹的发射
        // var dir = cc.pSub(w_dst_pos, w_start_pos);
        var dir = bulletAnimateComponent.dstPos.sub(bulletAnimateComponent.srcPos);

        // var len = cc.pLength(dir);
        var len = (dir.mag());
        var time = len / speed;

        var after_pos = cc.v2(29,-29);//actor.position_after_time(time);
        let w_dst_pos = shoot_enemy.convertToWorldSpaceAR(after_pos);
        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
        // end 
        // 求贝塞尔曲线的控制点，中点，然后拉高xxxxx
        var ctrl_x;
        var ctrl_y;
        
        // if (Math.abs(dir.x) <= 10 && dir.y < 0) {
        if (0) {
            ctrl_y = (start_pos.y + dst_pos.y) * 0.5;
            if (start_pos.x > dst_pos.x) {
                ctrl_x = dst_pos.x;
                // ctrl_x -= 20;
            }
            else {
                ctrl_x = dst_pos.x;
                // ctrl_x += 20;
            }
        }
        else {
            ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
            ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y;
            ctrl_y += 40;
        }
        // end 
        var ctrl_point_set = [cc.v2(ctrl_x, ctrl_y), cc.v2(ctrl_x, ctrl_y), dst_pos];
        var bto_action = cc.bezierTo(time, ctrl_point_set);
        // this.node.runAction(bto_action); // 发射到目标点;
        // 换图，把这个完整的键，换成我们的半截键
        var func = cc.callFunc(function(){
            var s = anim.getComponent(cc.Sprite);
            //s.spriteFrame = this.decal_arrow_sprite_frame;
            ECSUtil.getInstance().on_bullet_shoot(attack,enemyEntity.unitComponent,enemyEntity.baseComponent,enemyEntity.roleComponent);
        }.bind(this), bulletBaseComponent.gameObject);
        
        var end_func = cc.callFunc(function(){
            bulletRoleComponent.isDead=true;
            bulletAttackComponent.enemyID=0;
            //bulletBaseComponent.gameObject.removeFromParent();
        }.bind(this), bulletBaseComponent.gameObject);
        var seq = cc.sequence([bto_action, func, cc.delayTime(3), cc.fadeOut(0.3), end_func]);
        bulletBaseComponent.gameObject.runAction(seq);
        // 逻辑与图像分离
        var degree;
        if (bulletAnimateComponent.dstPos.x < bulletAnimateComponent.srcPos.x) { // 在左边
            degree = -180 + Math.random() * 10;
        }
        else {
            degree = 180 - Math.random() * 10;
        }
        var rot = cc.rotateBy(time, degree);
        anim.runAction(rot);
    }
}
