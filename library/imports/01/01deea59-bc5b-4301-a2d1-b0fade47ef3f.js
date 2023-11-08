"use strict";
cc._RF.push(module, '01deepZvFtDAaLRsPreR+8/', 'NavSystem');
// Scripts/ECS/Systems/NavSystem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NavSystem = /** @class */ (function (_super) {
    __extends(NavSystem, _super);
    function NavSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavSystem_1 = NavSystem;
    NavSystem.prototype.onLoad = function () {
        if (null === NavSystem_1._instance) {
            NavSystem_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    NavSystem.getInstance = function () {
        return NavSystem_1._instance;
    };
    NavSystem.prototype.onEnemyUpdate = function (dt, navComponent, baseComponent, transformComponent) {
        if (navComponent.curTime > 0) {
            navComponent.curTime -= dt;
            baseComponent.gameObject.x = navComponent.vx * dt + transformComponent.x;
            baseComponent.gameObject.y = navComponent.vy * dt + transformComponent.y;
            transformComponent.x = baseComponent.gameObject.x;
            transformComponent.y = baseComponent.gameObject.y;
            return;
        }
        if (navComponent.curIndex >= navComponent.path.length - 1) {
            return;
        }
        var curPos = navComponent.path[navComponent.curIndex];
        var nextPos = navComponent.path[navComponent.curIndex + 1];
        var dx = nextPos.x - curPos.x;
        var dy = nextPos.y - curPos.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        navComponent.vx = dx / dis * navComponent.speed;
        navComponent.vy = dy / dis * navComponent.speed;
        navComponent.curTime = dis / navComponent.speed;
        navComponent.curIndex++;
    };
    NavSystem.prototype.onActorUpdate = function (dt, navComponent, baseComponent, transformComponent) {
        if (navComponent.curTime > 0) {
            navComponent.curTime -= dt;
            baseComponent.gameObject.x = navComponent.vx * dt + transformComponent.x;
            baseComponent.gameObject.y = navComponent.vy * dt + transformComponent.y;
            transformComponent.x = baseComponent.gameObject.x;
            transformComponent.y = baseComponent.gameObject.y;
            if (navComponent.vx < 0) {
                baseComponent.gameObject.getChildByName("anim").scaleX = -1;
            }
            else {
                baseComponent.gameObject.getChildByName("anim").scaleX = 1;
            }
            return;
        }
        if (navComponent.curIndex >= navComponent.path.length - 1) {
            return;
        }
        var curPos = navComponent.path[navComponent.curIndex];
        var nextPos = navComponent.path[navComponent.curIndex + 1];
        var dx = nextPos.x - curPos.x;
        var dy = nextPos.y - curPos.y;
        var dis = Math.sqrt(dx * dx + dy * dy);
        navComponent.vx = dx / dis * navComponent.speed;
        navComponent.vy = dy / dis * navComponent.speed;
        navComponent.curTime = dis / navComponent.speed;
        navComponent.curIndex++;
    };
    var NavSystem_1;
    NavSystem._instance = null;
    NavSystem = NavSystem_1 = __decorate([
        ccclass
    ], NavSystem);
    return NavSystem;
}(cc.Component));
exports.default = NavSystem;

cc._RF.pop();