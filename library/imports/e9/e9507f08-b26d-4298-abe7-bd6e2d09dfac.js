"use strict";
cc._RF.push(module, 'e95078Ism1CmKvnvW4tCd+s', 'ECSManager');
// Scripts/ECS/ECSManager.ts

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
var Enum_1 = require("../Enum");
var ECSFactory_1 = require("./ECSFactory");
var AISystem_1 = require("./Systems/AISystem");
var AnimateSystem_1 = require("./Systems/AnimateSystem");
var AttackSystem_1 = require("./Systems/AttackSystem");
var NavSystem_1 = require("./Systems/NavSystem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ECSManager = /** @class */ (function (_super) {
    __extends(ECSManager, _super);
    function ECSManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.towerEntityList = [];
        _this.enemyEntityList = [];
        _this.bulletEntityList = [];
        _this.actorEntityList = [];
        return _this;
    }
    ECSManager_1 = ECSManager;
    ECSManager.prototype.onLoad = function () {
        if (null === ECSManager_1._instance) {
            ECSManager_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    ECSManager.getInstance = function () {
        return ECSManager_1._instance;
    };
    //
    ECSManager.prototype.getEnemyTotal = function () {
        return this.enemyEntityList.length;
    };
    ECSManager.prototype.getEnemyEntityByIndex = function (index) {
        for (var i = 0; i < this.enemyEntityList.length; i++) {
            if (i == index) {
                return this.enemyEntityList[i];
            }
        }
        return null;
    };
    //
    ECSManager.prototype.createBulletEntity = function (tower_type, tower_level, w_pos, w_dst_pos, enemyID) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, entity, entity, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == tower_type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createArrowBulletEntity(tower_type, tower_level, w_pos, w_dst_pos, enemyID)];
                    case 1:
                        entity = _a.sent();
                        this.bulletEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(Enum_1.TowerType.Cannon == tower_type)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createCannonBulletEntity(tower_type, tower_level, w_pos, w_dst_pos, enemyID)];
                    case 3:
                        entity = _a.sent();
                        this.bulletEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(Enum_1.TowerType.Infantry == tower_type)) return [3 /*break*/, 6];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createInfantryActor(tower_type, tower_level, w_pos, w_dst_pos, enemyID)];
                    case 5:
                        entity = _a.sent();
                        this.actorEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(Enum_1.TowerType.Warlock == tower_type)) return [3 /*break*/, 8];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createWarlockBulletEntity(tower_type, tower_level, w_pos, w_dst_pos, enemyID)];
                    case 7:
                        entity = _a.sent();
                        this.bulletEntityList.push(entity);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ECSManager.prototype.createTowerEntity = function (tower_type, world_pos) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, entity, entity, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Enum_1.TowerType.Arrow == tower_type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createArrowEntity(world_pos)];
                    case 1:
                        entity = _a.sent();
                        this.towerEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(Enum_1.TowerType.Cannon == tower_type)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createCannonEntity(world_pos)];
                    case 3:
                        entity = _a.sent();
                        this.towerEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(Enum_1.TowerType.Infantry == tower_type)) return [3 /*break*/, 6];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createInfantryEntity(world_pos)];
                    case 5:
                        entity = _a.sent();
                        this.towerEntityList.push(entity);
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(Enum_1.TowerType.Warlock == tower_type)) return [3 /*break*/, 8];
                        return [4 /*yield*/, ECSFactory_1.default.getInstance().createWarlockEntity(world_pos)];
                    case 7:
                        entity = _a.sent();
                        this.towerEntityList.push(entity);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ECSManager.prototype.createEnemyEntity = function (enemy_type, road_data, actor_params) {
        return __awaiter(this, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ECSFactory_1.default.getInstance().createEnemyEntity(enemy_type, road_data, actor_params)];
                    case 1:
                        entity = _a.sent();
                        this.enemyEntityList.push(entity);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    ECSManager.prototype.cleanBulletEntity = function () {
        for (var i = 0; i < this.bulletEntityList.length; ++i) {
            if (this.bulletEntityList[i].roleComponent.isDead) {
                this.bulletEntityList[i].baseComponent.gameObject.destroy();
                this.bulletEntityList.splice(i, 1);
                --i;
            }
        }
    };
    ECSManager.prototype.cleanEnemyEntity = function () {
        for (var i = 0; i < this.enemyEntityList.length; ++i) {
            if (this.enemyEntityList[i].roleComponent.isDead) {
                this.enemyEntityList[i].baseComponent.gameObject.destroy();
                this.enemyEntityList.splice(i, 1);
                --i;
            }
        }
    };
    //
    ECSManager.prototype.getEnemyEntityByID = function (id) {
        for (var i = 0; i < this.enemyEntityList.length; ++i) {
            if (this.enemyEntityList[i].baseComponent.entityID == id) {
                return this.enemyEntityList[i];
            }
        }
        return null;
    };
    //
    ECSManager.prototype.navSystemEnemyUpdate = function (dt) {
        //敌人
        for (var i = 0; i < this.enemyEntityList.length; ++i) {
            if (this.enemyEntityList[i].roleComponent.isDead) {
                continue;
            }
            NavSystem_1.default.getInstance().onEnemyUpdate(dt, this.enemyEntityList[i].navComponent, this.enemyEntityList[i].baseComponent, this.enemyEntityList[i].transformComponent);
        }
        //兵站士兵
        for (var i = 0; i < this.actorEntityList.length; ++i) {
            if (this.actorEntityList[i].roleComponent.isDead) {
                continue;
            }
            NavSystem_1.default.getInstance().onActorUpdate(dt, this.actorEntityList[i].navComponent, this.actorEntityList[i].baseComponent, this.actorEntityList[i].transformComponent);
        }
    };
    ECSManager.prototype.AISystemTower = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            var i, towerAttackComponent, j, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i < this.towerEntityList.length; ++i) {
                            towerAttackComponent = this.towerEntityList[i].attackComponent;
                            if (towerAttackComponent.enemyID > 0) {
                                continue;
                            }
                            towerAttackComponent.activeTime -= dt;
                            if (towerAttackComponent.activeTime > 0) {
                                continue;
                            }
                            for (j = 0; j < this.enemyEntityList.length; ++j) {
                                if (this.enemyEntityList[j].roleComponent.isDead) {
                                    continue;
                                }
                                AISystem_1.default.getInstance().onTowerUpdate(dt, this.towerEntityList[i].animateComponent, this.towerEntityList[i].roleComponent, towerAttackComponent, this.towerEntityList[i].baseComponent, this.enemyEntityList[j].transformComponent, this.enemyEntityList[j].baseComponent);
                            }
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.actorEntityList.length)) return [3 /*break*/, 6];
                        this.actorEntityList[i].aiComponent.thinkTime -= dt;
                        if (this.actorEntityList[i].aiComponent.thinkTime > 0) {
                            return [3 /*break*/, 5];
                        }
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < this.enemyEntityList.length)) return [3 /*break*/, 5];
                        if (this.enemyEntityList[j].roleComponent.isDead) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, AISystem_1.default.getInstance().onInfantryActorUpdate(dt, this.actorEntityList[i].aiComponent, this.actorEntityList[i].baseComponent, this.actorEntityList[i].transformComponent, this.actorEntityList[i].navComponent, this.enemyEntityList[j].unitComponent, this.enemyEntityList[j].baseComponent, this.enemyEntityList[j].roleComponent)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        ++j;
                        return [3 /*break*/, 2];
                    case 5:
                        ++i;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ECSManager.prototype.attackSystemTower = function (dt) {
        for (var i = 0; i < this.towerEntityList.length; ++i) {
            var tower = this.towerEntityList[i];
            if (tower.attackComponent.enemyID > 0) {
                if (6666 == tower.attackComponent.enemyID) {
                    AttackSystem_1.default.getInstance().createInfantryActorUpdate(dt, tower.attackComponent, tower.baseComponent, tower.roleComponent);
                }
                else {
                    var enemy = this.getEnemyEntityByID(tower.attackComponent.enemyID);
                    if (enemy && !enemy.roleComponent.isDead) {
                        AttackSystem_1.default.getInstance().onTowerUpdate(dt, tower.attackComponent, tower.baseComponent, tower.roleComponent);
                    }
                }
            }
        }
    };
    ECSManager.prototype.animateSystemBullet = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            var i, bullet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.bulletEntityList.length)) return [3 /*break*/, 4];
                        bullet = this.bulletEntityList[i];
                        if (bullet.roleComponent.isDead) {
                            return [3 /*break*/, 3];
                        }
                        if (!(bullet.animateComponent.state == Enum_1.AnimateState.Start || bullet.animateComponent.state == Enum_1.AnimateState.Playing)) return [3 /*break*/, 3];
                        return [4 /*yield*/, AnimateSystem_1.default.getInstance().onBulletUpdate(dt, bullet.roleComponent, bullet.animateComponent, bullet.attackComponent, bullet.baseComponent)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ECSManager.prototype.animateSystemArrow = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            var i, tower;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.towerEntityList.length)) return [3 /*break*/, 4];
                        tower = this.towerEntityList[i];
                        if (tower.roleComponent.isDead) {
                            return [3 /*break*/, 3];
                        }
                        if (!(tower.animateComponent.state == Enum_1.AnimateState.Start || tower.animateComponent.state == Enum_1.AnimateState.Playing)) return [3 /*break*/, 3];
                        return [4 /*yield*/, AnimateSystem_1.default.getInstance().onTowerUpdate(dt, tower.roleComponent, tower.animateComponent, tower.baseComponent, tower.attackComponent)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ECSManager.prototype.update = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //敌军导航
                        this.navSystemEnemyUpdate(dt);
                        //塔的AI
                        return [4 /*yield*/, this.AISystemTower(dt)];
                    case 1:
                        //塔的AI
                        _a.sent();
                        //
                        this.attackSystemTower(dt);
                        //
                        return [4 /*yield*/, this.animateSystemBullet(dt)];
                    case 2:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.animateSystemArrow(dt)];
                    case 3:
                        _a.sent();
                        //
                        this.cleanBulletEntity();
                        this.cleanEnemyEntity();
                        return [2 /*return*/];
                }
            });
        });
    };
    var ECSManager_1;
    ECSManager._instance = null;
    ECSManager = ECSManager_1 = __decorate([
        ccclass
    ], ECSManager);
    return ECSManager;
}(cc.Component));
exports.default = ECSManager;

cc._RF.pop();