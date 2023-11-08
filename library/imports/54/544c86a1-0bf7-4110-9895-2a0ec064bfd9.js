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
        var center_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        var enemy_pos = enemyEntity.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        ECSManager_1.default.getInstance().createBulletEntity(towerRoleComponent.type, towerRoleComponent.level, center_pos, enemy_pos, towerAttackComponent.enemyID);
        towerAttackComponent.enemyID = 0;
    };
    AttackSystem.prototype.onInfantryActorUpdate = function (dt, towerAttackComponent, towerBaseComponent, towerRoleComponent) {
        var center_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, -15));
        var R = 60;
        var r = Math.random() * 2 * Math.PI;
        var w_dst_pos = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(R * Math.cos(r), R * Math.sin(r)));
        ECSManager_1.default.getInstance().createBulletEntity(towerRoleComponent.type, towerRoleComponent.level, center_pos, w_dst_pos, towerAttackComponent.enemyID);
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