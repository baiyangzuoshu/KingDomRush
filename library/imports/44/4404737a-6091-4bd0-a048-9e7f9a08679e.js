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
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager_1 = require("../../FrameWork/manager/EventManager");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var GameDataManager_1 = require("../Data/GameDataManager");
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
        _super.prototype.onLoad.call(this);
        this.tower_offset.push(cc.v2(-8, -4));
        this.tower_offset.push(cc.v2(-5, 7));
        this.tower_offset.push(cc.v2(-1, 8));
        this.tower_offset.push(cc.v2(-5, 7));
        this.icon = this.node.getChildByName("icon");
        this.tower_type = 0;
        this.builded_tower = null;
        this.is_builded = false;
        //this.map_root = cc.find("GameUI/map_root");
        // 四种塔索对应的参数
        this.tower_params = [null, null, null, null];
        this.tower_params[0] = GameDataManager_1.default.getInstance().arrow_tower_params;
        this.tower_params[1] = GameDataManager_1.default.getInstance().warlock_tower_params;
        this.tower_params[2] = GameDataManager_1.default.getInstance().cannon_tower_params;
        this.tower_params[3] = GameDataManager_1.default.getInstance().infantry_tower_params;
        //this.game_scene = cc.find("GameUI").getComponent("game_scene");
        this.buttonAddClickEvent("click_mask", this.on_click_mask, this);
    };
    TowerBuilder.prototype.setData = function (index) {
        this.index = index;
    };
    TowerBuilder.prototype.on_click_mask = function (btn) {
        console.log("on_click_mask", this.index);
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
        this.game_scene.show_game_uchip();
        // end 
        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    };
    // 1, 弓箭, 2, 法师, 3,炮塔, 4兵塔
    TowerBuilder.prototype.on_tower_build_click = function (t, tower_type) {
        tower_type = parseInt(tower_type);
        if (tower_type <= 0 || this.tower_type > 4) {
            return;
        }
        if (!this.check_uchip_when_build(tower_type, 1)) {
            return;
        }
        this.tower_type = tower_type;
        this.icon.active = false;
        // 造一个塔
        this.builded_tower = cc.instantiate(this.tower_prefabs[tower_type - 1]);
        this.map_root.addChild(this.builded_tower);
        var center_pos = this.node.getPosition();
        center_pos.x += this.tower_offset[tower_type - 1].x;
        center_pos.y += this.tower_offset[tower_type - 1].y;
        this.builded_tower.setPosition(center_pos);
        this.builded_tower.active = true;
        this.is_builded = true;
        // end 
        // 消耗你的金币
        var build_chip = this.tower_params[tower_type - 1][0].build_chip;
        GameDataManager_1.default.getInstance().add_chip(-build_chip);
        this.game_scene.show_game_uchip();
        // end 
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
        this.game_scene.show_game_uchip();
        // end 
    };
    TowerBuilder = __decorate([
        ccclass
    ], TowerBuilder);
    return TowerBuilder;
}(UIControl_1.UIControl));
exports.default = TowerBuilder;

cc._RF.pop();