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
    //
    AnimateSystem.prototype.onTowerUpdate = function (dt, towerRoleComponent, towerAnimateComponent, towerBaseComponent, towerAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == towerRoleComponent.type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onArrowUpdate(dt, towerAnimateComponent, towerBaseComponent, towerAttackComponent)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(Enum_1.TowerType.Warlock == towerRoleComponent.type)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.onWarlockUpdate(dt, towerAnimateComponent, towerBaseComponent, towerAttackComponent)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(Enum_1.TowerType.Cannon == towerRoleComponent.type)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.onCannonUpdate(dt, towerAnimateComponent, towerBaseComponent, towerAttackComponent)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(Enum_1.TowerType.Infantry == towerRoleComponent.type)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.onInfantryUpdate(dt, towerAnimateComponent, towerBaseComponent, towerAttackComponent)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onInfantryUpdate = function (dt, infantryAnimateComponent, infantryBaseComponent, infantryAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var anim, frame_anim, open_anim, i, sf, i, sf, i, sf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 播放放开门的动画
                        //this._play_open_door_anim();
                        infantryAnimateComponent.time -= dt;
                        if (!(infantryAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 13];
                        anim = infantryBaseComponent.gameObject.getChildByName("anim");
                        frame_anim = anim.getComponent(FrameAnimate_1.default);
                        if (!frame_anim) {
                            frame_anim = anim.addComponent(FrameAnimate_1.default);
                        }
                        open_anim = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/bing_tower/bing1/bing1_" + i, cc.SpriteFrame)];
                    case 2:
                        sf = _a.sent();
                        open_anim.push(sf);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i <= 7)) return [3 /*break*/, 8];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/bing_tower/bing1/bing1_" + 3, cc.SpriteFrame)];
                    case 6:
                        sf = _a.sent();
                        open_anim.push(sf);
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        i = 3;
                        _a.label = 9;
                    case 9:
                        if (!(i > 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/bing_tower/bing1/bing1_" + i, cc.SpriteFrame)];
                    case 10:
                        sf = _a.sent();
                        open_anim.push(sf);
                        _a.label = 11;
                    case 11:
                        i--;
                        return [3 /*break*/, 9];
                    case 12:
                        frame_anim.sprite_frames = open_anim;
                        frame_anim.duration = 0.2;
                        frame_anim.play_once(function () { });
                        infantryAnimateComponent.state = Enum_1.AnimateState.Playing;
                        infantryAnimateComponent.time = 0.8;
                        return [3 /*break*/, 14];
                    case 13:
                        if (infantryAnimateComponent.state == Enum_1.AnimateState.Playing && infantryAnimateComponent.time <= 0) {
                            // 放出多少个兵
                            //this._gen_actor(w_dst_pos);
                            infantryAttackComponent.enemyID = 6666;
                            infantryAnimateComponent.state = Enum_1.AnimateState.Stop;
                        }
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onCannonUpdate = function (dt, cannonAnimateComponent, cannonBaseComponent, towerAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var anim, tower_level, bullet_level, frame_anim, shoot_anim, i, sf_1, start_pos_set, end_pos_set, delay_time_set, rot_degree_set, bullet_icon_1, sf, delay, func, bz_array, bz_action, s, seq, delay_set, start_pos_set, start_w_pos, delay, func, seq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        anim = cannonBaseComponent.gameObject.getChildByName("anim");
                        tower_level = 1;
                        bullet_level = 1;
                        cannonAnimateComponent.time -= dt;
                        if (!(cannonAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 6];
                        frame_anim = anim.getComponent(FrameAnimate_1.default);
                        if (!frame_anim) {
                            frame_anim = anim.addComponent(FrameAnimate_1.default);
                        }
                        shoot_anim = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 8)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/pao_tower/pao1/pao1_" + i, cc.SpriteFrame)];
                    case 2:
                        sf_1 = _a.sent();
                        shoot_anim.push(sf_1);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        frame_anim.sprite_frames = shoot_anim;
                        frame_anim.duration = 0.1;
                        start_pos_set = [cc.v2(-24, 2), cc.v2(-24, 3), cc.v2(-24, 2), cc.v2(-24, 2)];
                        end_pos_set = [cc.v2(3, 20), cc.v2(3, 21), cc.v2(3, 24), cc.v2(3, 24)];
                        delay_time_set = [0.8, 1.5, 1.2];
                        rot_degree_set = [180 + Math.random() * 90, 180 + Math.random() * 90, 45];
                        bullet_icon_1 = cannonBaseComponent.gameObject.getChildByName("anim").getChildByName("bullet_icon");
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/pao_tower/bullet/pao1_bullet", cc.SpriteFrame)];
                    case 5:
                        sf = _a.sent();
                        bullet_icon_1.getComponent(cc.Sprite).spriteFrame = sf;
                        delay = cc.delayTime(delay_time_set[tower_level - 1]);
                        func = cc.callFunc(function () {
                            bullet_icon_1.scale = 1; // 子弹显示出来。
                            bullet_icon_1.x = start_pos_set[tower_level - 1].x;
                            bullet_icon_1.y = start_pos_set[tower_level - 1].y;
                            bullet_icon_1.angle = -45; // 开始的旋转角度
                            // 运行一个旋转
                            var rot = cc.rotateBy(0.4, rot_degree_set[tower_level - 1]);
                            bullet_icon_1.runAction(rot);
                            // end 
                        }.bind(this), bullet_icon_1);
                        bz_array = [cc.v2(-10, 30), cc.v2(-10, 30), end_pos_set[tower_level - 1]];
                        bz_action = cc.bezierTo(0.4, bz_array);
                        s = cc.scaleTo(0.1, 0);
                        seq = cc.sequence([delay, func, bz_action, s]);
                        bullet_icon_1.runAction(seq);
                        cannonAnimateComponent.time = 0.1;
                        cannonAnimateComponent.state = Enum_1.AnimateState.Playing;
                        return [3 /*break*/, 7];
                    case 6:
                        if (cannonAnimateComponent.state == Enum_1.AnimateState.Playing && cannonAnimateComponent.time <= 0) {
                            delay_set = [0.7, 0.8, 0.6, 1.3, 3.5];
                            start_pos_set = [cc.v2(3, 16), cc.v2(3, 16), cc.v2(3, 16), cc.v2(-1, 20), cc.v2(-22, 24)];
                            start_w_pos = anim.convertToWorldSpaceAR(start_pos_set[bullet_level - 1]);
                            delay = cc.delayTime(delay_set[bullet_level - 1]);
                            func = cc.callFunc(function () {
                                //cannon_bullet.shoot_at(bullet_level, start_w_pos, w_dst_pos);
                            }.bind(this), cannonBaseComponent.gameObject);
                            seq = cc.sequence([delay, func]);
                            cannonBaseComponent.gameObject.runAction(seq);
                            towerAttackComponent.enemyID = cannonAnimateComponent.id;
                            cannonAnimateComponent.state = Enum_1.AnimateState.Stop;
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onWarlockUpdate = function (dt, warlockAnimateComponent, warlockBaseComponent, towerAttackComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var anim, frame_anim, tower_anim, i, sf, man, frame_anim, w_start_pos, w_dst_pos, b_up, shoot_up_anim, i, sf, shoot_down_anim, i, sf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this._play_tower_anim();
                        //this._play_shoot_man_anim(w_dst_pos);
                        warlockAnimateComponent.time -= dt;
                        if (!(warlockAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 5];
                        anim = warlockBaseComponent.gameObject.getChildByName("anim");
                        frame_anim = anim.getComponent(FrameAnimate_1.default);
                        if (!frame_anim) {
                            frame_anim = anim.addComponent(FrameAnimate_1.default);
                        }
                        tower_anim = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 4)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/fashi_tower/fashi1/fashi_" + i, cc.SpriteFrame)];
                    case 2:
                        sf = _a.sent();
                        tower_anim.push(sf);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        frame_anim.sprite_frames = tower_anim;
                        frame_anim.duration = 0.1;
                        frame_anim.play_once(function () { });
                        warlockAnimateComponent.time = 0.1;
                        warlockAnimateComponent.state = Enum_1.AnimateState.Playing;
                        return [3 /*break*/, 16];
                    case 5:
                        if (!(warlockAnimateComponent.state == Enum_1.AnimateState.Playing && warlockAnimateComponent.time <= 0)) return [3 /*break*/, 16];
                        man = warlockBaseComponent.gameObject.getChildByName("man");
                        frame_anim = man.getComponent(FrameAnimate_1.default);
                        if (!frame_anim) {
                            frame_anim = man.addComponent(FrameAnimate_1.default);
                        }
                        w_start_pos = man.convertToWorldSpaceAR(cc.v2(0, 0));
                        w_dst_pos = warlockAnimateComponent.dstPos;
                        b_up = w_start_pos.y < w_dst_pos.y;
                        if (!b_up) return [3 /*break*/, 10];
                        shoot_up_anim = [];
                        i = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i <= 9)) return [3 /*break*/, 9];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/fashi_tower/shoot_man_1/up/up_" + i, cc.SpriteFrame)];
                    case 7:
                        sf = _a.sent();
                        shoot_up_anim.push(sf);
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        frame_anim.sprite_frames = shoot_up_anim;
                        frame_anim.duration = 0.1;
                        return [3 /*break*/, 15];
                    case 10:
                        shoot_down_anim = [];
                        i = 0;
                        _a.label = 11;
                    case 11:
                        if (!(i <= 9)) return [3 /*break*/, 14];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/fashi_tower/shoot_man_1/down/down_" + i, cc.SpriteFrame)];
                    case 12:
                        sf = _a.sent();
                        shoot_down_anim.push(sf);
                        _a.label = 13;
                    case 13:
                        i++;
                        return [3 /*break*/, 11];
                    case 14:
                        frame_anim.sprite_frames = shoot_down_anim;
                        frame_anim.duration = 0.1;
                        _a.label = 15;
                    case 15:
                        frame_anim.play_once(function () { });
                        //end
                        towerAttackComponent.enemyID = warlockAnimateComponent.id;
                        warlockAnimateComponent.state = Enum_1.AnimateState.Stop;
                        _a.label = 16;
                    case 16: return [2 /*return*/];
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
                        arrowAnimateComponent.state = Enum_1.AnimateState.Stop;
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    AnimateSystem.prototype.onBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == bulletRoleComponent.type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onArrowBulletUpdate(dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(Enum_1.TowerType.Warlock == bulletRoleComponent.type)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.onWarlockBulletUpdate(dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(Enum_1.TowerType.Cannon == bulletRoleComponent.type)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.onCannonBulletUpdate(dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onCannonBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var bullet_level, phy_params, attack, enemyEntity, shoot_enemy, anim_1, w_start_pos, w_dst_pos_1, start_pos, dst_pos, dir, len, time, after_pos, ctrl_x, ctrl_y, ctrl_point_set, bto_action, bomb_anim_frames_1, i, sf, end_func, seq, degree, rot, bomb_R, w_dst_pos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bullet_level = bulletRoleComponent.level;
                        phy_params = GameDataManager_1.default.getInstance().cannon_bullet[bullet_level - 1];
                        attack = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
                        bulletAnimateComponent.time -= dt;
                        if (!(bulletAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 5];
                        enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
                        shoot_enemy = enemyEntity.baseComponent.gameObject;
                        anim_1 = bulletBaseComponent.gameObject.getChildByName("anim");
                        w_start_pos = bulletAnimateComponent.srcPos;
                        w_dst_pos_1 = bulletAnimateComponent.dstPos;
                        start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(cc.v2(w_start_pos.x, w_start_pos.y + 29));
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.dstPos);
                        // 发射的时候调整我们角度,设置好位置
                        bulletBaseComponent.gameObject.setPosition(start_pos);
                        anim_1.angle = 0;
                        dir = w_dst_pos_1.sub(w_start_pos);
                        len = (dir.mag());
                        time = len / phy_params.speed;
                        after_pos = cc.v2(0, 0);
                        w_dst_pos_1 = shoot_enemy.convertToWorldSpaceAR(after_pos);
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos_1);
                        {
                            ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
                            ctrl_y = (dst_pos.y > start_pos.y) ? dst_pos.y : start_pos.y;
                            ctrl_y += 40;
                        }
                        ctrl_point_set = [cc.v2(ctrl_x, ctrl_y), cc.v2(ctrl_x, ctrl_y), dst_pos];
                        bto_action = cc.bezierTo(time, ctrl_point_set);
                        bomb_anim_frames_1 = [];
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 10)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/pao_tower/bom/bom" + i, cc.SpriteFrame)];
                    case 2:
                        sf = _a.sent();
                        bomb_anim_frames_1.push(sf);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        end_func = cc.callFunc(function () {
                            //this.play_bullet_bomb_anim();
                            anim_1.angle = 0;
                            var frame_com = anim_1.getComponent(FrameAnimate_1.default);
                            if (!frame_com) {
                                frame_com = anim_1.addComponent(FrameAnimate_1.default);
                            }
                            frame_com.sprite_frames = bomb_anim_frames_1;
                            frame_com.duration = 0.1;
                            // 爆炸结束后，删除子弹
                            frame_com.play_once(function () {
                                //this.node.removeFromParent();
                            }.bind(this));
                        }.bind(this), bulletBaseComponent.gameObject);
                        seq = cc.sequence([bto_action, end_func]);
                        bulletBaseComponent.gameObject.runAction(seq);
                        if (w_dst_pos_1.x < w_start_pos.x) { // 在左边
                            degree = -180 + Math.random() * 10;
                        }
                        else {
                            degree = 180 - Math.random() * 10;
                        }
                        rot = cc.rotateBy(time, degree);
                        anim_1.runAction(rot);
                        bulletAnimateComponent.state = Enum_1.AnimateState.Playing;
                        bulletAnimateComponent.time = 0.8;
                        return [3 /*break*/, 6];
                    case 5:
                        if (bulletAnimateComponent.state == Enum_1.AnimateState.Playing && bulletAnimateComponent.time <= 0) {
                            bomb_R = phy_params.bomb_R;
                            w_dst_pos = bulletBaseComponent.gameObject.convertToWorldSpaceAR(cc.v2(0, 0));
                            ECSUtil_1.default.getInstance().on_bullet_bomb(w_dst_pos, bomb_R, attack);
                            bulletRoleComponent.state = Enum_1.RoleState.Dead;
                            bulletAttackComponent.enemyID = 0;
                            bulletAnimateComponent.state = Enum_1.AnimateState.Stop;
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onWarlockBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var enemyEntity, attack, bullet_level, speed, shoot_enemy, w_start_pos, w_dst_pos, anim_2, start_pos, dst_pos, dir, len, time, after_pos, m, bomb_anim_1, i, sf, func, end_func, seq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
                        attack = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
                        bulletAnimateComponent.time -= dt;
                        if (!(bulletAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 5];
                        bullet_level = bulletRoleComponent.level;
                        speed = GameDataManager_1.default.getInstance().warlock_bullet_params[bullet_level - 1].speed;
                        shoot_enemy = enemyEntity.baseComponent.gameObject;
                        w_start_pos = bulletAnimateComponent.srcPos;
                        w_dst_pos = bulletAnimateComponent.dstPos;
                        anim_2 = bulletBaseComponent.gameObject.getChildByName("anim");
                        start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(cc.v2(w_start_pos.x, w_start_pos.y + 30));
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
                        bulletBaseComponent.gameObject.setPosition(start_pos);
                        dir = w_dst_pos.sub(w_start_pos);
                        len = (dir.mag());
                        time = len / speed;
                        after_pos = cc.v2(0, -30);
                        w_dst_pos = shoot_enemy.convertToWorldSpaceAR(after_pos);
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(w_dst_pos);
                        m = cc.moveBy(time, w_dst_pos.x - w_start_pos.x, w_dst_pos.y - w_start_pos.y);
                        bomb_anim_1 = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 8)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "game_scene/tower/fashi_tower/bomb/bomb_" + i, cc.SpriteFrame)];
                    case 2:
                        sf = _a.sent();
                        bomb_anim_1.push(sf);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        func = cc.callFunc(function () {
                            var frame_anim = anim_2.getComponent(FrameAnimate_1.default);
                            if (!frame_anim) {
                                frame_anim = anim_2.addComponent(FrameAnimate_1.default);
                            }
                            frame_anim.sprite_frames = bomb_anim_1;
                            frame_anim.duration = 0.1;
                            frame_anim.play_once(function () {
                                //this.on_bullet_bomb(w_dst_pos);
                                //this.node.removeFromParent();
                            }.bind(this));
                            // 播放爆炸动画
                        }.bind(this), anim_2);
                        end_func = cc.callFunc(function () {
                        }.bind(this), bulletBaseComponent.gameObject);
                        seq = cc.sequence([m, func, cc.delayTime(0.1), end_func]);
                        bulletBaseComponent.gameObject.runAction(seq);
                        bulletAnimateComponent.state = Enum_1.AnimateState.Playing;
                        bulletAnimateComponent.time = 0.8;
                        return [3 /*break*/, 6];
                    case 5:
                        if (bulletAnimateComponent.state == Enum_1.AnimateState.Playing && bulletAnimateComponent.time <= 0) {
                            bulletAnimateComponent.state = Enum_1.AnimateState.Stop;
                            bulletRoleComponent.state = Enum_1.RoleState.Dead;
                            bulletAttackComponent.enemyID = 0;
                            if (enemyEntity) {
                                ECSUtil_1.default.getInstance().on_arrowBullet_shoot(attack, enemyEntity.unitComponent, enemyEntity.baseComponent, enemyEntity.roleComponent);
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AnimateSystem.prototype.onArrowBulletUpdate = function (dt, bulletRoleComponent, bulletAnimateComponent, bulletAttackComponent, bulletBaseComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var enemyEntity, attack, speed, shoot_enemy, anim_3, start_pos, dst_pos, dir, len, time, after_pos, w_dst_pos, ctrl_x, ctrl_y, ctrl_point_set, bto_action, decal_arrow_sprite_frame_1, func, end_func, seq, degree, rot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enemyEntity = ECSManager_1.default.getInstance().getEnemyEntityByID(bulletAttackComponent.enemyID);
                        attack = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].attack;
                        bulletAnimateComponent.time -= dt;
                        if (!(bulletAnimateComponent.state == Enum_1.AnimateState.Start)) return [3 /*break*/, 2];
                        speed = GameDataManager_1.default.getInstance().arrow_bullet_params[bulletRoleComponent.level - 1].speed;
                        shoot_enemy = enemyEntity.baseComponent.gameObject;
                        anim_3 = bulletBaseComponent.gameObject.getChildByName("anim");
                        start_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(cc.v2(bulletAnimateComponent.srcPos.x, bulletAnimateComponent.srcPos.y + 30));
                        dst_pos = bulletBaseComponent.gameObject.parent.convertToNodeSpaceAR(bulletAnimateComponent.dstPos);
                        // 发射的时候调整我们角度,设置好位置
                        bulletBaseComponent.gameObject.setPosition(start_pos);
                        anim_3.angle = 270;
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
                        decal_arrow_sprite_frame_1 = _a.sent();
                        func = cc.callFunc(function () {
                            var s = anim_3.getComponent(cc.Sprite);
                            s.spriteFrame = decal_arrow_sprite_frame_1;
                        }.bind(this), bulletBaseComponent.gameObject);
                        end_func = cc.callFunc(function () {
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
                        anim_3.runAction(rot);
                        bulletAnimateComponent.state = Enum_1.AnimateState.Playing;
                        bulletAnimateComponent.time = 0.8;
                        return [3 /*break*/, 3];
                    case 2:
                        if (bulletAnimateComponent.state == Enum_1.AnimateState.Playing && bulletAnimateComponent.time <= 0) {
                            bulletAnimateComponent.state = Enum_1.AnimateState.Stop;
                            bulletRoleComponent.state = Enum_1.RoleState.Dead;
                            bulletAttackComponent.enemyID = 0;
                            if (enemyEntity) {
                                ECSUtil_1.default.getInstance().on_arrowBullet_shoot(attack, enemyEntity.unitComponent, enemyEntity.baseComponent, enemyEntity.roleComponent);
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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