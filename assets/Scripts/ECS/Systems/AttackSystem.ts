// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameDataManager from "../../Data/GameDataManager";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";
import ECSManager from "../ECSManager";
import EnemyEntity from "../Entities/EnemyEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AttackSystem extends cc.Component {
    private static _instance:AttackSystem=null
    onLoad () {
        if(null===AttackSystem._instance){
            AttackSystem._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():AttackSystem{
        return AttackSystem._instance;
    }

    onUpdate(dt:number,towerAttackComponent:AttackComponent,towerBaseComponent:BaseComponent,
        towerRoleComponent:RoleComponent){
        let enemyEntity:EnemyEntity=ECSManager.getInstance().getEnemyEntityByID(towerAttackComponent.enemyID);
        if(null==enemyEntity){
            return
        }

        // var f_anim = man.getComponent("frame_anim");
        // if (!f_anim) {
        //     f_anim = man.addComponent("frame_anim");
        // }
        
        // var w_pos = man.convertToWorldSpaceAR(cc.v2(0, 0));
        // // var dir = cc.pSub(w_dst_pos, w_pos);
        // var dir = w_dst_pos.sub(w_pos);
        // // 判断当前是要播放上，还是下
        // if (dir.y > 0) { // 上的动画
        //     f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].up_anim;
        //     f_anim.duration = this.anim_duration;
        //     f_anim.play_once(function(){
        //         this._set_anim_idle(man, 0);
        //     }.bind(this));
        // }
        // else { // 下的动画
        //     f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].down_anim;
        //     f_anim.duration = this.anim_duration;
        //     f_anim.play_once(function(){
        //         this._set_anim_idle(man, 1);
        //     }.bind(this));
        // }
        // end 
        
        var center_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 29));
        var enemy_pos=enemyEntity.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(29, -29));
        // 生成我们的子弹对象，让它发射到目标点
        // var bullet = cc.instantiate(this.arrow_bullet_prefab);
        // this.bullet_root.addChild(bullet);    
        // bullet.active = true;    
        // // end 
        // bullet.getComponent("arrow_bullet").shoot_at(this.tower_level, w_pos, w_dst_pos, enemy);
        ECSManager.getInstance().createBulletEntity(towerRoleComponent.type,towerRoleComponent.level,center_pos,enemy_pos,towerAttackComponent.enemyID);
        towerAttackComponent.enemyID=0;
    } 
}
