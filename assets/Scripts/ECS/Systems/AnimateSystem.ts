// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ResManagerPro } from "../../../FrameWork/manager/ResManagerPro";
import GameDataManager from "../../Data/GameDataManager";
import { AnimateState, TowerType } from "../../Enum";
import FrameAnimate from "../../Tools/FrameAnimate";
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
    //
    async onTowerUpdate(dt:number,towerRoleComponent:RoleComponent,arrowAnimateComponent:AnimateComponent,arrowBaseComponent:BaseComponent,towerAttackComponent:AttackComponent){
        if(TowerType.Arrow==towerRoleComponent.type){
            await this.onArrowUpdate(dt,arrowAnimateComponent,arrowBaseComponent,towerAttackComponent);
        }
        else if(TowerType.Warlock==towerRoleComponent.type){
            await this.onWarlockUpdate(dt,arrowAnimateComponent,arrowBaseComponent,towerAttackComponent);
        }
    }

    async onWarlockUpdate(dt:number,warlockAnimateComponent:AnimateComponent,warlockBaseComponent:BaseComponent,towerAttackComponent:AttackComponent){
        //this._play_tower_anim();
        //this._play_shoot_man_anim(w_dst_pos);
        warlockAnimateComponent.time-=dt;
        if(warlockAnimateComponent.state==AnimateState.Start){
            let anim=warlockBaseComponent.gameObject.getChildByName("anim");
            var frame_anim = anim.addComponent(FrameAnimate);
            let tower_anim:cc.SpriteFrame[]=[];
            for(let i=0;i<=4;i++){
                let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/fashi_tower/fashi1/fashi_"+i,cc.SpriteFrame) as cc.SpriteFrame;
                tower_anim.push(sf);
            }
            frame_anim.sprite_frames = tower_anim;
            frame_anim.duration =0.1;
            warlockAnimateComponent.time=0.1;
            warlockAnimateComponent.state=AnimateState.Playing;
        }
        else if(warlockAnimateComponent.state==AnimateState.Playing&&warlockAnimateComponent.time<=0){
            let man=warlockBaseComponent.gameObject.getChildByName("man");
            var frame_anim = man.addComponent(FrameAnimate);
            var w_start_pos = man.convertToWorldSpaceAR(cc.v2(0, 0));
            let w_dst_pos=warlockAnimateComponent.dstPos;
            var b_up = w_start_pos.y < w_dst_pos.y;
            
            if (b_up) { // 上的动画
                let shoot_up_anim:cc.SpriteFrame[]=[];
                for(let i=0;i<=9;i++){
                    let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/fashi_tower/shoot_man_1/up/up_"+i,cc.SpriteFrame) as cc.SpriteFrame;
                    shoot_up_anim.push(sf);
                }
                frame_anim.sprite_frames = shoot_up_anim;
                frame_anim.duration = 0.1;
            }
            else { // 下的动画
                let shoot_down_anim:cc.SpriteFrame[]=[];
                for(let i=0;i<=9;i++){
                    let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/fashi_tower/shoot_man_1/down/down_"+i,cc.SpriteFrame) as cc.SpriteFrame;
                    shoot_down_anim.push(sf);
                }
                frame_anim.sprite_frames = shoot_down_anim;
                frame_anim.duration = 0.1;
            }
            //end
            towerAttackComponent.enemyID = warlockAnimateComponent.id;
            warlockAnimateComponent.state=AnimateState.Stop;
        }
    }

    async onArrowUpdate(dt:number,arrowAnimateComponent:AnimateComponent,arrowBaseComponent:BaseComponent,towerAttackComponent:AttackComponent){
        let man=arrowBaseComponent.gameObject.getChildByName("rhs");

        var f_anim = man.getComponent(FrameAnimate);
        if (!f_anim) {
            f_anim = man.addComponent(FrameAnimate);
        }
        let w_dst_pos=arrowAnimateComponent.dstPos;
        var w_pos = man.convertToWorldSpaceAR(cc.v2(0, 0));
        // var dir = cc.pSub(w_dst_pos, w_pos);
        var dir = w_dst_pos.sub(w_pos);
        // 判断当前是要播放上，还是下
        if (dir.y > 0) { // 上的动画
            let up_anim:cc.SpriteFrame[]=[];
            for(let i=1;i<=4;i++){
                let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/arrow_tower/arrow1/arrow_up_0"+i,cc.SpriteFrame) as cc.SpriteFrame;
                up_anim.push(sf);
            }
            f_anim.sprite_frames = up_anim;
            f_anim.duration = 0.1;
            f_anim.play_once(function(){
                //this._set_anim_idle(man, 0);
            }.bind(this));
        }
        else { // 下的动画
            let down_anim:cc.SpriteFrame[]=[];
            for(let i=1;i<=4;i++){
                let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/arrow_tower/arrow1/arrow_down_0"+i,cc.SpriteFrame) as cc.SpriteFrame;
                down_anim.push(sf);
            }
            f_anim.sprite_frames = down_anim;
            f_anim.duration = 0.1;
            f_anim.play_once(function(){
                //this._set_anim_idle(man, 1);
            }.bind(this));
        }
        //end 
        towerAttackComponent.enemyID = arrowAnimateComponent.id;
        arrowAnimateComponent.state=AnimateState.Stop;
    }
    //
    async onBulletUpdate(dt:number,bulletRoleComponent:RoleComponent,bulletAnimateComponent:AnimateComponent,
        bulletAttackComponent:AttackComponent,bulletBaseComponent:BaseComponent){
        if(TowerType.Arrow==bulletRoleComponent.type){
            await this.onArrowBulletUpdate(dt,bulletRoleComponent,bulletAnimateComponent,bulletAttackComponent,bulletBaseComponent);
        }
        else if(TowerType.Warlock==bulletRoleComponent.type){
            await this.onWarlockBulletUpdate(dt,bulletRoleComponent,bulletAnimateComponent,bulletAttackComponent,bulletBaseComponent);
        }
    }

    async onWarlockBulletUpdate(dt:number,bulletRoleComponent:RoleComponent,bulletAnimateComponent:AnimateComponent,
        bulletAttackComponent:AttackComponent,bulletBaseComponent:BaseComponent){
            let bullet_level = bulletRoleComponent.level;
            let speed = GameDataManager.getInstance().warlock_bullet_params[bullet_level - 1].speed;
            let attack = GameDataManager.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
            let enemyEntity:EnemyEntity=ECSManager.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
            let shoot_enemy = enemyEntity.baseComponent.gameObject;
            let w_start_pos=bulletAnimateComponent.srcPos;
            let w_dst_pos=bulletAnimateComponent.dstPos;
            let anim=bulletBaseComponent.gameObject.getChildByName("anim")
            //this._set_bullet_idle();
            var start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(cc.v2(w_start_pos.x,w_start_pos.y+30));
            var dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
            bulletBaseComponent.gameObject.setPosition(start_pos);
            
            // var dir = cc.pSub(w_dst_pos, w_start_pos);
            var dir = w_dst_pos.sub(w_start_pos);
            // var len = cc.pLength(dir);
            var len = (dir.mag());
            var time = len / speed;
            
            var after_pos = cc.v2(0,-30);//actor.position_after_time(time);
            w_dst_pos = shoot_enemy.convertToWorldSpaceAR(after_pos);
            dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
    
            var m = cc.moveBy(time, w_dst_pos.x - w_start_pos.x, w_dst_pos.y - w_start_pos.y);
            let bomb_anim:cc.SpriteFrame[]=[];
            for(let i=0;i<=8;i++){
                let sf=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/fashi_tower/bomb/bomb_"+i,cc.SpriteFrame) as cc.SpriteFrame;
                bomb_anim.push(sf);
            }
            var func = cc.callFunc(function(){
                ECSUtil.getInstance().on_arrowBullet_shoot(attack,enemyEntity.unitComponent,enemyEntity.baseComponent,enemyEntity.roleComponent);

                var frame_anim = anim.addComponent(FrameAnimate);
                frame_anim.sprite_frames = bomb_anim;
                frame_anim.duration = 0.1;
                frame_anim.play_once(function(){
                    //this.on_bullet_bomb(w_dst_pos);
                    //this.node.removeFromParent();
                }.bind(this));
                // 播放爆炸动画
            }.bind(this),anim);

            var end_func = cc.callFunc(function(){
                bulletRoleComponent.isDead=true;
                bulletAttackComponent.enemyID=0;
            }.bind(this), bulletBaseComponent.gameObject);

            var seq = cc.sequence([m, func,cc.delayTime(0.1),end_func]);
            bulletBaseComponent.gameObject.runAction(seq);

           
            bulletAnimateComponent.state=AnimateState.Stop;
    }

    async onArrowBulletUpdate(dt:number,bulletRoleComponent:RoleComponent,bulletAnimateComponent:AnimateComponent,
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
        anim.angle = 270;
        // end  
        // 创建一个贝塞尔的action来控制我们的子弹的发射
        // var dir = cc.pSub(w_dst_pos, w_start_pos);
        var dir = bulletAnimateComponent.dstPos.sub(bulletAnimateComponent.srcPos);

        // var len = cc.pLength(dir);
        var len = (dir.mag());
        var time = len / speed;

        var after_pos = cc.v2(0,-29);//actor.position_after_time(time);
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
        let decal_arrow_sprite_frame:cc.SpriteFrame=await ResManagerPro.Instance.IE_GetAsset("textures","game_scene/tower/arrow_tower/bullet/decal_arrow",cc.SpriteFrame) as cc.SpriteFrame;
        var func = cc.callFunc(function(){
            var s = anim.getComponent(cc.Sprite);
            s.spriteFrame = decal_arrow_sprite_frame;
            ECSUtil.getInstance().on_arrowBullet_shoot(attack,enemyEntity.unitComponent,enemyEntity.baseComponent,enemyEntity.roleComponent);
        }.bind(this), bulletBaseComponent.gameObject);
        
        var end_func = cc.callFunc(function(){
            bulletRoleComponent.isDead=true;
            bulletAttackComponent.enemyID=0;
            //bulletBaseComponent.gameObject.removeFromParent();
        }.bind(this), bulletBaseComponent.gameObject);
        var seq = cc.sequence([bto_action, func, cc.delayTime(1), cc.fadeOut(0.3), end_func]);
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

        bulletAnimateComponent.state=AnimateState.Stop;
    }
}
