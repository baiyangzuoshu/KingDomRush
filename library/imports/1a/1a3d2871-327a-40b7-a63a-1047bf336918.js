"use strict";
cc._RF.push(module, '1a3d2hxMnpAt6Y6EEe/M2kY', 'ECSUtil');
// Scripts/ECS/ECSUtil.ts

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
var EventManager_1 = require("../../FrameWork/manager/EventManager");
var GameDataManager_1 = require("../Data/GameDataManager");
var EventName_1 = require("../EventName");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ECSUtil = /** @class */ (function (_super) {
    __extends(ECSUtil, _super);
    function ECSUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ECSUtil_1 = ECSUtil;
    ECSUtil.prototype.onLoad = function () {
        if (null === ECSUtil_1._instance) {
            ECSUtil_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    ECSUtil.getInstance = function () {
        return ECSUtil_1._instance;
    };
    ECSUtil.prototype.on_bullet_shoot = function (attack_value, enemyUnitComponent, enemyBaseComponent, enemyRoleComponent) {
        enemyUnitComponent.health -= attack_value;
        if (enemyUnitComponent.health <= 0) {
            enemyUnitComponent.health = 0;
            enemyRoleComponent.isDead = true;
            // 加金币
            GameDataManager_1.default.getInstance().add_chip(enemyUnitComponent.bonues_chip);
            EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_game_uchip);
            // end 
        }
        else { // 更新学条
            var per = enemyUnitComponent.health / enemyUnitComponent.maxHp;
            enemyBaseComponent.gameObject.getChildByName("blood_bar").getComponent(cc.ProgressBar).progress = per;
        }
    };
    var ECSUtil_1;
    ECSUtil._instance = null;
    ECSUtil = ECSUtil_1 = __decorate([
        ccclass
    ], ECSUtil);
    return ECSUtil;
}(cc.Component));
exports.default = ECSUtil;

cc._RF.pop();