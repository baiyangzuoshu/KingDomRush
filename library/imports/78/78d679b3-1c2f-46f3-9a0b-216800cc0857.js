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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResManagerPro_1 = require("../../../FrameWork/manager/ResManagerPro");
var GameDataManager_1 = require("../../Data/GameDataManager");
var Enum_1 = require("../../Enum");
var FrameAnimate_1 = require("../../Tools/FrameAnimate");
var ECSUtil_1 = require("../ECSUtil");
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
    AISystem.prototype.onTowerUpdate = function (dt, towerAnimateComponent, towerRoleComponent, towerAttackComponent, towerBaseComponent, enemyTransformComponent, enemyBaseComponent) {
        if (towerRoleComponent.type == Enum_1.TowerType.Infantry) {
            towerAttackComponent.activeTime = 4.0;
            towerAnimateComponent.state = Enum_1.AnimateState.Start;
        }
        else {
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
        }
        return false;
    };
    AISystem.prototype.onInfantryActorUpdate = function (dt, actorAIComponent, actorBaseComponent, actorTransformComponent, actorNavComponent, enemyUnitComponent, enemyBaseComponent, enemyRoleComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var src, attack_R, search_R, dst, dir, anim, frame_anim, walk_anim, i, frame, dx, dy, dis, vx, vy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = actorBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
                        attack_R = actorAIComponent.attack_R;
                        search_R = actorAIComponent.search_R;
                        dst = enemyBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
                        dir = dst.sub(src);
                        if (!(attack_R >= (dir.mag()))) return [3 /*break*/, 5];
                        actorAIComponent.thinkTime = 1;
                        anim = actorBaseComponent.gameObject.getChildByName("anim");
                        frame_anim = anim.addComponent(FrameAnimate_1.default);
                        walk_anim = new Array();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/bing_tower/actor1/attack/attack1_" + i, cc.SpriteFrame)];
                    case 2:
                        frame = _a.sent();
                        walk_anim.push(frame);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        frame_anim.sprite_frames = walk_anim;
                        frame_anim.duration = 0.1;
                        frame_anim.play_once(function () {
                        });
                        ECSUtil_1.default.getInstance().on_arrowBullet_shoot(10, enemyUnitComponent, enemyBaseComponent, enemyRoleComponent);
                        return [3 /*break*/, 6];
                    case 5:
                        if (search_R >= (dir.mag())) { //追击
                            dx = dst.x - src.x;
                            dy = dst.y - src.y;
                            dis = Math.sqrt(dx * dx + dy * dy);
                            vx = dx / dis * actorNavComponent.speed;
                            vy = dy / dis * actorNavComponent.speed;
                            actorBaseComponent.gameObject.x = vx * dt + actorTransformComponent.x;
                            actorBaseComponent.gameObject.y = vy * dt + actorTransformComponent.y;
                            actorTransformComponent.x = actorBaseComponent.gameObject.x;
                            actorTransformComponent.y = actorBaseComponent.gameObject.y;
                            if (vx < 0) {
                                actorBaseComponent.gameObject.getChildByName("anim").scaleX = -1;
                            }
                            else {
                                actorBaseComponent.gameObject.getChildByName("anim").scaleX = 1;
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
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