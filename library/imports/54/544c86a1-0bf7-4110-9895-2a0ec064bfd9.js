"use strict";
cc._RF.push(module, '544c8ahC/dBEJiVKg7AZL/Z', 'AttackSystem');
// Scripts/ECS/Systems/AttackSystem.ts

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
var ECSManager_1 = require("../ECSManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AttackSystem = /** @class */ (function (_super) {
    __extends(AttackSystem, _super);
    function AttackSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttackSystem_1 = AttackSystem;
    AttackSystem.prototype.onLoad = function () {
        if (null === AttackSystem_1._instance) {
            AttackSystem_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    AttackSystem.getInstance = function () {
        return AttackSystem_1._instance;
    };
    AttackSystem.prototype.onUpdate = function (dt, towerAttackComponent, towerBaseComponent, towerRoleComponent) {
        var enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(towerAttackComponent.enemyID);
        if (null == enemyEntity) {
            return;
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
        var enemy_pos = enemyEntity.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(29, -29));
        // 生成我们的子弹对象，让它发射到目标点
        // var bullet = cc.instantiate(this.arrow_bullet_prefab);
        // this.bullet_root.addChild(bullet);    
        // bullet.active = true;    
        // // end 
        // bullet.getComponent("arrow_bullet").shoot_at(this.tower_level, w_pos, w_dst_pos, enemy);
        ECSManager_1.default.getInstance().createBulletEntity(towerRoleComponent.type, towerRoleComponent.level, center_pos, enemy_pos, towerAttackComponent.enemyID);
        towerAttackComponent.enemyID = 0;
    };
    var AttackSystem_1;
    AttackSystem._instance = null;
    AttackSystem = AttackSystem_1 = __decorate([
        ccclass
    ], AttackSystem);
    return AttackSystem;
}(cc.Component));
exports.default = AttackSystem;

cc._RF.pop();