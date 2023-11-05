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
    AnimateSystem.prototype.onTowerUpdate = function (dt, towerRoleComponent, arrowAnimateComponent, arrowBaseComponent, towerAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == towerRoleComponent.type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onArrowUpdate(dt, arrowAnimateComponent, arrowBaseComponent, towerAttackComponent)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onArrowUpdate = function (dt, arrowAnimateComponent, arrowBaseComponent, towerAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var man, f_anim, w_dst_pos, w_pos, dir, up_anim, i, sf, down_anim, i, sf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        man = arrowBaseComponent.gameObject.getChildByName("rhs");
                        f_anim = man.getComponent(FrameAnimate_1.default);
                        if (!f_anim) {
                            f_anim = man.addComponent(FrameAnimate_1.default);
                        }
                        w_dst_pos = arrowAnimateComponent.dstPos;
                        w_pos = man.convertToWorldSpaceAR(cc.v2(0, 0));
                        dir = w_dst_pos.sub(w_pos);
                        if (!(dir.y > 0)) return [3 /*break*/, 5];
                        up_anim = [];
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 4)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/arrow_tower/arrow1/arrow_up_0" + i, cc.SpriteFrame)];
                    case 2:
                        sf = _a.sent();
                        up_anim.push(sf);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        f_anim.sprite_frames = up_anim;
                        f_anim.duration = 0.1;
                        f_anim.play_once(function () {
                            //this._set_anim_idle(man, 0);
                        }.bind(this));
                        return [3 /*break*/, 10];
                    case 5:
                        down_anim = [];
                        i = 1;
                        _a.label = 6;
                    case 6:
                        if (!(i <= 4)) return [3 /*break*/, 9];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/arrow_tower/arrow1/arrow_down_0" + i, cc.SpriteFrame)];
                    case 7:
                        sf = _a.sent();
                        down_anim.push(sf);
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        f_anim.sprite_frames = down_anim;
                        f_anim.duration = 0.1;
                        f_anim.play_once(function () {
                            //this._set_anim_idle(man, 1);
                        }.bind(this));
                        _a.label = 10;
                    case 10:
                        //end 
                        towerAttackComponent.enemyID = arrowAnimateComponent.id;
                        arrowAnimateComponent.state = Enum_1.AnimateState.stop;
                        return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == bulletRoleComponent.type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onArrowBulletUpdate(dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onArrowBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var speed, attack, enemyEntity, shoot_enemy, anim, start_pos, dst_pos, dir, len, time, after_pos, w_dst_pos, ctrl_x, ctrl_y, ctrl_point_set, bto_action, decal_arrow_sprite_frame, func, end_func, seq, degree, rot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        speed = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].speed;
                        attack = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
                        enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
                        shoot_enemy = enemyEntity.baseComponent.gameObject;
                        anim = bulletBaseComponent.gameObject.getChildByName("anim");
                        start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.srcPos);
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.dstPos);
                        // 发射的时候调整我们角度,设置好位置
                        bulletBaseComponent.gameObject.setPosition(start_pos);
                        anim.angle = 270;
                        dir = bulletAnimateComponent.dstPos.sub(bulletAnimateComponent.srcPos);
                        len = (dir.mag());
                        time = len / speed;
                        after_pos = cc.v2(0, -29);
                        w_dst_pos = shoot_enemy.convertToWorldSpaceAR(after_pos);
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
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
                        ctrl_point_set = [cc.v2(ctrl_x, ctrl_y), cc.v2(ctrl_x, ctrl_y), dst_pos];
                        bto_action = cc.bezierTo(time, ctrl_point_set);
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/arrow_tower/bullet/decal_arrow", cc.SpriteFrame)];
                    case 1:
                        decal_arrow_sprite_frame = _a.sent();
                        func = cc.callFunc(function () {
                            var s = anim.getComponent(cc.Sprite);
                            s.spriteFrame = decal_arrow_sprite_frame;
                            ECSUtil_1.default.getInstance().on_arrowBullet_shoot(attack, enemyEntity.unitComponent, enemyEntity.baseComponent, enemyEntity.roleComponent);
                        }.bind(this), bulletBaseComponent.gameObject);
                        end_func = cc.callFunc(function () {
                            bulletRoleComponent.isDead = true;
                            bulletAttackComponent.enemyID = 0;
                            //bulletBaseComponent.gameObject.removeFromParent();
                        }.bind(this), bulletBaseComponent.gameObject);
                        seq = cc.sequence([bto_action, func, cc.delayTime(1), cc.fadeOut(0.3), end_func]);
                        bulletBaseComponent.gameObject.runAction(seq);
                        if (bulletAnimateComponent.dstPos.x < bulletAnimateComponent.srcPos.x) { // 在左边
                            degree = -180 + Math.random() * 10;
                        }
                        else {
                            degree = 180 - Math.random() * 10;
                        }
                        rot = cc.rotateBy(time, degree);
                        anim.runAction(rot);
                        bulletAnimateComponent.state = Enum_1.AnimateState.stop;
                        return [2 /*return*/];
                }
            });
        });
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