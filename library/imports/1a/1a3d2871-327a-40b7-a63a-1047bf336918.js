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
var Enum_1 = require("../Enum");
var EventName_1 = require("../EventName");
var ECSManager_1 = require("./ECSManager");
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
    ECSUtil.prototype.on_arrowBullet_shoot = function (attack_value, enemyUnitComponent, enemyBaseComponent, enemyRoleComponent) {
        enemyUnitComponent.health -= attack_value;
        if (enemyUnitComponent.health <= 0) {
            enemyUnitComponent.health = 0;
            enemyRoleComponent.state = Enum_1.RoleState.Dead;
            // 加金币
            GameDataManager_1.default.getInstance().add_chip(enemyUnitComponent.bonues_chip);
            EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_game_uchip);
            // end 
        }
        var per = enemyUnitComponent.health / enemyUnitComponent.maxHp;
        enemyBaseComponent.gameObject.getChildByName("blood_bar").getComponent(cc.ProgressBar).progress = per;
    };
    // 炸弹是砸伤一片
    ECSUtil.prototype.on_bullet_bomb = function (bomb_pos, bomb_R, attack_value) {
        var len = ECSManager_1.default.getInstance().getEnemyTotal();
        for (var i = 0; i < len; i++) {
            var enemy = ECSManager_1.default.getInstance().getEnemyEntityByIndex(i);
            if (enemy && enemy.roleComponent.state == Enum_1.RoleState.Active) {
                var pos = enemy.baseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
                var dir = pos.sub(bomb_pos);
                if ((dir.mag()) <= bomb_R) {
                    this.on_arrowBullet_shoot(attack_value, enemy.unitComponent, enemy.baseComponent, enemy.roleComponent);
                }
            }
        }
    };
    ECSUtil.prototype.zorderSortNode = function (node) {
        var child = node.children;
        child.sort(function (lhs, rhs) {
            if (lhs.y > rhs.y) {
                return -1;
            }
            else if (lhs.y < rhs.y) {
                return 1;
            }
            return 0;
        });
        // y大的就会排在前面, y小的就会排在后面
        for (var i = 0; i < child.length; i++) {
            child[i].zIndex = (1000 + i);
        }
        // end 
    };
    ECSUtil.prototype.position_after_time = function (dt, enemyTransformComponent, enemyNavComponent) {
        // 表示物体正在运动
        var prev_pos = cc.v2(enemyTransformComponent.x, enemyTransformComponent.y);
        var next_step = enemyNavComponent.curIndex;
        var road_data = enemyNavComponent.path;
        while (dt > 0 && next_step < road_data.length) {
            var now_pos = road_data[next_step];
            // var dir = cc.pSub(now_pos, prev_pos);
            var dir = now_pos.sub(prev_pos);
            // var len = cc.pLength(dir);
            var len = (dir.mag());
            var t = len / enemyNavComponent.speed;
            if (dt > t) {
                dt -= t;
                prev_pos = now_pos;
                next_step++;
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