"use strict";
cc._RF.push(module, 'fa0c3NyH/FJP5IVcLo/qWt2', 'AnimateSystem');
// Scripts/ECS/Systems/AnimateSystem.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataManager_1 = require("../../Data/GameDataManager");
var ECSManager_1 = require("../ECSManager");
var ECSUtil_1 = require("../ECSUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AnimateSystem = /** @class */ (function (_super) {
    __extends(AnimateSystem, _super);
    function AnimateSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimateSystem_1 = AnimateSystem;
    AnimateSystem.prototype.onLoad = function () {
        if (null === AnimateSystem_1._instance) {
            AnimateSystem_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    AnimateSystem.getInstance = function () {
        return AnimateSystem_1._instance;
    };
    AnimateSystem.prototype.onBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        var speed = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].speed;
        var attack = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
        var enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
        var shoot_enemy = enemyEntity.baseComponent.gameObject; //enemy;
        var anim = bulletBaseComponent.gameObject.getChildByName("anim");
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
        var after_pos = cc.v2(29, -29); //actor.position_after_time(time);
        var w_dst_pos = shoot_enemy.convertToWorldSpaceAR(after_pos);
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
        var func = cc.callFunc(function () {
            var s = anim.getComponent(cc.Sprite);
            //s.spriteFrame = this.decal_arrow_sprite_frame;
            ECSUtil_1.default.getInstance().on_bullet_shoot(attack, enemyEntity.unitComponent, enemyEntity.baseComponent, enemyEntity.roleComponent);
        }.bind(this), bulletBaseComponent.gameObject);
        var end_func = cc.callFunc(function () {
            bulletRoleComponent.isDead = true;
            bulletAttackComponent.enemyID = 0;
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
    };
    var AnimateSystem_1;
    AnimateSystem._instance = null;
    AnimateSystem = AnimateSystem_1 = __decorate([
        ccclass
    ], AnimateSystem);
    return AnimateSystem;
}(cc.Component));
exports.default = AnimateSystem;

cc._RF.pop();