"use strict";
cc._RF.push(module, '44047N6YJFL0KBInn+aCGee', 'TowerBuilder');
// Scripts/Game/TowerBuilder.ts

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
var EventManager_1 = require("../../FrameWork/manager/EventManager");
var ResManagerPro_1 = require("../../FrameWork/manager/ResManagerPro");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var GameDataManager_1 = require("../Data/GameDataManager");
var ECSManager_1 = require("../ECS/ECSManager");
var EventName_1 = require("../EventName");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerBuilder = /** @class */ (function (_super) {
    __extends(TowerBuilder, _super);
    function TowerBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gui_tower_builder = null;
        _this.icon = null;
        _this.tower_type = 0;
        _this.builded_tower = null;
        _this.is_builded = false;
        _this.map_root = null;
        _this.tower_params = [];
        _this.game_scene = null;
        _this.tower_prefabs = [];
        _this.tower_offset = [];
        _this.index = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TowerBuilder.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arrow_tower, cannon_tower, infantry_tower, warlock_tower;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.onLoad.call(this);
                        this.tower_offset.push(cc.v2(-8, -4));
                        this.tower_offset.push(cc.v2(-5, 7));
                        this.tower_offset.push(cc.v2(-1, 8));
                        this.tower_offset.push(cc.v2(-5, 7));
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "Game/arrow_tower", cc.Prefab)];
                    case 1:
                        arrow_tower = _a.sent();
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "Game/cannon_tower", cc.Prefab)];
                    case 2:
                        cannon_tower = _a.sent();
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "Game/infantry_tower", cc.Prefab)];
                    case 3:
                        infantry_tower = _a.sent();
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "Game/warlock_tower", cc.Prefab)];
                    case 4:
                        warlock_tower = _a.sent();
                        this.tower_prefabs.push(arrow_tower);
                        this.tower_prefabs.push(cannon_tower);
                        this.tower_prefabs.push(infantry_tower);
                        this.tower_prefabs.push(warlock_tower);
                        this.icon = this.node.getChildByName("icon");
                        this.tower_type = 0;
                        this.builded_tower = null;
                        this.is_builded = false;
                        // 四种塔索对应的参数
                        this.tower_params = [null, null, null, null];
                        this.tower_params[0] = GameDataManager_1.default.getInstance().arrow_tower_params;
                        this.tower_params[1] = GameDataManager_1.default.getInstance().warlock_tower_params;
                        this.tower_params[2] = GameDataManager_1.default.getInstance().cannon_tower_params;
                        this.tower_params[3] = GameDataManager_1.default.getInstance().infantry_tower_params;
                        //this.game_scene = cc.find("GameUI").getComponent("game_scene");
                        this.buttonAddClickEvent("click_mask", this.on_click_mask, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    TowerBuilder.prototype.setData = function (index) {
        this.index = index;
    };
    TowerBuilder.prototype.on_click_mask = function (btn) {
        //console.log("on_click_mask",this.index);
        this.show_tower_builder();
    };
    TowerBuilder.prototype.check_uchip_when_build = function (tower_type, level) {
        var build_chip = this.tower_params[tower_type - 1][level - 1].build_chip;
        var uchip = GameDataManager_1.default.getInstance().get_uchip();
        if (uchip >= build_chip) {
            return true;
        }
        return false;
    };
    TowerBuilder.prototype.show_tower_builder = function () {
        EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_tower_builder, { is_builded: this.is_builded, tower_builder: this });
    };
    TowerBuilder.prototype.remove_builder_tower = function () {
        if (this.is_builded === false) {
            return;
        }
        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    };
    TowerBuilder.prototype.on_tower_undo_click = function () {
        if (this.is_builded === false) {
            return;
        }
        // 回收金币
        var tower_com = this.get_build_tower_com();
        var tower_level = tower_com.get_tower_level();
        var undo_chip = this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
        GameDataManager_1.default.getInstance().add_chip(undo_chip);
        EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_game_uchip);
        // end 
        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    };
    // 1, 弓箭, 2, 法师, 3,炮塔, 4兵塔
    TowerBuilder.prototype.on_tower_build_click = function (t, tower_type) {
        return __awaiter(this, void 0, void 0, function () {
            var world_pos, build_chip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tower_type = parseInt(tower_type);
                        if (tower_type <= 0 || this.tower_type > 4) {
                            console.log(tower_type, this.tower_type);
                            return [2 /*return*/];
                        }
                        if (!this.check_uchip_when_build(tower_type, 1)) {
                            console.log("uchip is not enough");
                            return [2 /*return*/];
                        }
                        this.tower_type = tower_type;
                        this.icon.active = false;
                        world_pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                        return [4 /*yield*/, ECSManager_1.default.getInstance().createTowerEntity(tower_type, world_pos)];
                    case 1:
                        _a.sent();
                        this.is_builded = true;
                        build_chip = this.tower_params[tower_type - 1][0].build_chip;
                        GameDataManager_1.default.getInstance().add_chip(-build_chip);
                        EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_game_uchip);
                        return [2 /*return*/];
                }
            });
        });
    };
    TowerBuilder.prototype.get_build_tower_com = function () {
        var tower_com = null;
        switch (this.tower_type) {
            case 1: // 弓箭塔
                tower_com = this.builded_tower.getComponent("arrow_tower");
                break;
            case 2: // 法师塔
                tower_com = this.builded_tower.getComponent("warlock_tower");
                break;
            case 3: // 炮塔
                tower_com = this.builded_tower.getComponent("cannon_tower");
                break;
            case 4: // 兵塔
                tower_com = this.builded_tower.getComponent("infantry_tower");
                break;
        }
        return tower_com;
    };
    TowerBuilder.prototype.on_tower_upgrade_click = function () {
        if (this.is_builded === false || this.builded_tower === null) {
            return;
        }
        // 检查升级所要的金币
        var tower_com = this.get_build_tower_com();
        var tower_level = tower_com.get_tower_level();
        if (tower_level >= 4) {
            return;
        }
        var upgrade_chip = this.tower_params[this.tower_type - 1][tower_level].build_chip -
            this.tower_params[this.tower_type - 1][tower_level - 1].build_chip;
        if (upgrade_chip > GameDataManager_1.default.getInstance().get_uchip()) {
            return;
        }
        // end 
        if (tower_com) {
            var tower_level = tower_com.upgrade_tower();
        }
        // 消耗金币
        GameDataManager_1.default.getInstance().add_chip(-upgrade_chip);
        EventManager_1.EventManager.getInstance().emit(EventName_1.GameUI.show_game_uchip);
        // end 
    };
    TowerBuilder = __decorate([
        ccclass
    ], TowerBuilder);
    return TowerBuilder;
}(UIControl_1.UIControl));
exports.default = TowerBuilder;

cc._RF.pop();