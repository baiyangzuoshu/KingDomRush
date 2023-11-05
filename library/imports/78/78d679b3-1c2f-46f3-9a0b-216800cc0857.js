"use strict";
cc._RF.push(module, '78d67mzHC9G85oLIWgAzAhX', 'AISystem');
// Scripts/ECS/Systems/AISystem.ts

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
var Enum_1 = require("../../Enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AISystem = /** @class */ (function (_super) {
    __extends(AISystem, _super);
    function AISystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AISystem_1 = AISystem;
    AISystem.prototype.onLoad = function () {
        if (null === AISystem_1._instance) {
            AISystem_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    AISystem.getInstance = function () {
        return AISystem_1._instance;
    };
    AISystem.prototype.onUpdate = function (dt, towerAnimateComponent, towerRoleComponent, towerAttackComponent, towerBaseComponent, enemyTransformComponent, enemyBaseComponent) {
        var src = towerBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        var search_R = GameDataManager_1.default.getInstance().arrow_tower_params[towerRoleComponent.level - 1].search_R;
        var dst = enemyBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
        var dir = dst.sub(src);
        if (search_R >= (dir.mag())) {
            // 攻击
            towerAttackComponent.activeTime = 1.0;
            towerAnimateComponent.id = enemyBaseComponent.entityID;
            towerAnimateComponent.dstPos = dst;
            towerAnimateComponent.state = Enum_1.AnimateState.Start;
            return true;
        }
        return false;
    };
    var AISystem_1;
    AISystem._instance = null;
    AISystem = AISystem_1 = __decorate([
        ccclass
    ], AISystem);
    return AISystem;
}(cc.Component));
exports.default = AISystem;

cc._RF.pop();