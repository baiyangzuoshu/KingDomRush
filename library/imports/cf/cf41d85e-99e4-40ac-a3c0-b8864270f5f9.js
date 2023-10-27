"use strict";
cc._RF.push(module, 'cf41dhemeRArKPAuIZCcPX5', 'RoadMapUIControl');
// Scripts/UI/RoadMapUIControl.ts

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
var UIManagerPro_1 = require("../../FrameWork/manager/UIManagerPro");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var GameDataManager_1 = require("../Data/GameDataManager");
var Enum_1 = require("../Enum");
var EventName_1 = require("../EventName");
var LevelEntryInfo_1 = require("../Tools/LevelEntryInfo");
var LoadingDoor_1 = require("../Tools/LoadingDoor");
var UpgradeConfig_1 = require("../Tools/UpgradeConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoadMapUIControl = /** @class */ (function (_super) {
    __extends(RoadMapUIControl, _super);
    function RoadMapUIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.door = null;
        _this.outside = false;
        _this.new_level_entry = null;
        _this.passed_entry = [];
        _this.level_num = 19;
        _this.newest_level = -1;
        _this.upgrade_config = null;
        _this.go_back = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    RoadMapUIControl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // 播放背景音乐
        //sound_manager.play_music("resources/sounds/music/roadmap_scene_bg.mp3", true);
        // end
        this.door = this.getChildByUrl("loading_door").addComponent(LoadingDoor_1.default);
        this.door.setData(0, 0.4);
        this.outside = false;
        this.new_level_entry = this.getChildByUrl("anchor-center/new_level_entry");
        this.new_level_entry.active = false;
        this.passed_entry = [];
        var map_entry_root = this.getChildByUrl("anchor-center/map_entry_root");
        for (var i = 0; i < this.level_num; i++) {
            var name = "level" + (i + 1);
            var levelNode = map_entry_root.getChildByName(name);
            var ts = levelNode.addComponent(LevelEntryInfo_1.default);
            ts.setData(1);
            this.passed_entry.push(levelNode);
            var bt = this.passed_entry[i].getComponent(cc.Button);
            var click_event = new cc.Component.EventHandler();
            click_event.target = this.node;
            click_event.component = "RoadMapUIControl";
            click_event.handler = "on_passed_entry_click";
            click_event.customEventData = "" + i;
            bt.clickEvents = [click_event];
        }
        this.newest_level = -1;
        // 装备升级
        this.upgrade_config = this.getChildByUrl("anchor-center/upgrade_config");
        this.upgrade_config.addComponent(UpgradeConfig_1.default);
        this.upgrade_config.active = false;
        // end 
        this.registerBtnClickEvent();
    };
    RoadMapUIControl.prototype.registerBtnClickEvent = function () {
        this.buttonAddClickEvent("anchor-bottom/bottom_button_root/back_bt", this.goto_home, this);
        this.buttonAddClickEvent("anchor-bottom/bottom_button_root/upgrade", this.on_skill_upgrade_config_click, this);
        this.buttonAddClickEvent("anchor-center/upgrade_config/anim_root/reset", this.on_reset_upgrade_config_click, this);
        this.buttonAddClickEvent("anchor-center/upgrade_config/anim_root/done", this.on_done_upgrade_config_click, this);
        this.buttonAddClickEvent("anchor-center/new_level_entry", this.on_new_entry_click, this);
    };
    RoadMapUIControl.prototype.on_done_upgrade_config_click = function () {
        this.upgrade_config.active = false;
        this.upgrade_config.getComponent(cc.Animation).play("reserve_road_skill_upgrade_config");
    };
    RoadMapUIControl.prototype.on_reset_upgrade_config_click = function () {
    };
    RoadMapUIControl.prototype._show_user_star_info = function () {
        var label = this.getChildByUrl("anchor-rt/game_star_info/star_num").getComponent(cc.Label);
        var cur_user = GameDataManager_1.default.getInstance().get_cur_user();
        label.string = cur_user.star_num + " / " + cur_user.star_total;
    };
    RoadMapUIControl.prototype._show_game_level_info = function () {
        // 获取当前用户的用户信息，来获得它挑战的关卡的成绩;
        var cur_user = GameDataManager_1.default.getInstance().get_cur_user();
        var level_info = cur_user.level_info;
        // var level_info = [1, 3, 1, 2, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // end 
        var i = 0;
        var len = (level_info.length < this.level_num) ? level_info.length : this.level_num;
        // 显示通过了的关的关卡的成绩
        for (i = 0; i < len; i++) {
            if (level_info[i] === 0) { // 遇到了没有打通的关卡
                break;
            }
            this.passed_entry[i].active = true;
            this.passed_entry[i].getComponent(LevelEntryInfo_1.default).show_level_star_info(level_info[i]);
        }
        // 第一个为星星为0的关卡，玩家可以来挑战
        this.newest_level = i;
        if (this.newest_level >= this.level_num) { // 全部挑战成功
            this.new_level_entry.active = false;
            this.newest_level = this.level_num - 1;
        }
        else {
            this.new_level_entry.active = true;
            // 把这个棋子插在对应的位置
            this.new_level_entry.x = this.passed_entry[this.newest_level].x;
            this.new_level_entry.y = this.passed_entry[this.newest_level].y;
            // end 
        }
        // end 
        for (; i < this.level_num; i++) {
            this.passed_entry[i].active = false;
        }
    };
    // 打开这个门;
    RoadMapUIControl.prototype.start = function () {
        this._show_game_level_info();
        this._show_user_star_info();
        this.door.open_the_door(null);
    };
    // 跳转到home场景;
    RoadMapUIControl.prototype.goto_home = function () {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        this.go_back = true;
        this.door.close_the_door(function () {
            UIManagerPro_1.UIManagerPro.getInstance().closePrefab(Enum_1.ViewUI.RoadMapUI);
            EventManager_1.EventManager.getInstance().emit(EventName_1.HomeUI.open_the_door);
        }.bind(this));
    };
    // end 
    RoadMapUIControl.prototype._goto_game_scene = function (level) {
        // 保存当前可以游戏的关卡,保存到GameDataManager.getInstance()里面，游戏场景就可以直接访问的到；
        GameDataManager_1.default.getInstance().set_cur_level(level);
        // end 
        console.log("enter game_scene at level:", GameDataManager_1.default.getInstance().get_cur_level());
        // 调转到游戏场景;
        this.door.close_the_door(function () {
            UIManagerPro_1.UIManagerPro.getInstance().showPrefab("GameUI");
        }.bind(this));
        // end 
    };
    // 新的没有挑战过的关卡点击
    RoadMapUIControl.prototype.on_new_entry_click = function () {
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        this._goto_game_scene(this.newest_level);
    };
    // end 
    // 已经挑战的关卡点击进入
    RoadMapUIControl.prototype.on_passed_entry_click = function (level) {
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        this._goto_game_scene(level);
    };
    // end 
    // 用户技能配置设置
    RoadMapUIControl.prototype.on_skill_upgrade_config_click = function () {
        this.upgrade_config.active = true;
        this.upgrade_config.getComponent(cc.Animation).play("road_skill_upgrade_config");
    };
    RoadMapUIControl = __decorate([
        ccclass
    ], RoadMapUIControl);
    return RoadMapUIControl;
}(UIControl_1.UIControl));
exports.default = RoadMapUIControl;

cc._RF.pop();