"use strict";
cc._RF.push(module, 'dba06/2YaJFMZcJ/KavFGIp', 'GameUIControl');
// Scripts/UI/GameUIControl.ts

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
var MapDataManager_1 = require("../Data/MapDataManager");
var ECSManager_1 = require("../ECS/ECSManager");
var EventName_1 = require("../EventName");
var Checkout_1 = require("../Game/Checkout");
var GenMapPath_1 = require("../Game/GenMapPath");
var GuiTowerBuilder_1 = require("../Game/GuiTowerBuilder");
var TowerBuilder_1 = require("../Game/TowerBuilder");
var LoadingDoor_1 = require("../Tools/LoadingDoor");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameUIControl = /** @class */ (function (_super) {
    __extends(GameUIControl, _super);
    function GameUIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.door = null;
        _this.go_back = false;
        _this.pause_root = null;
        _this.setting_root = null;
        _this.blood_label = null;
        _this.uchip_label = null;
        _this.round_label = null;
        _this.blood = 0;
        _this.game_started = false;
        _this.map_root = null;
        _this.checkout = null;
        _this.game_map_set = [];
        _this.game_map = null;
        _this.map_tag_root = null;
        _this.all_enemy_gen = false;
        _this.map_level = 0;
        _this.level_data = [];
        _this.cur_round = 0;
        _this.cur_road_index = 0;
        _this.cur_gen_total = 0;
        _this.cur_gen_now = 0;
        _this.cur_schedule_time = 0;
        _this.enemy_prefabs = [];
        _this.gui_tower_builder = null;
        return _this;
    }
    // use this for initialization
    GameUIControl.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var map_level;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.onLoad.call(this);
                        // 以后随机播放背景音乐;
                        //sound_manager.play_music("resources/sounds/music/game_bg1.mp3", true);
                        // end
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        // 以后随机播放背景音乐;
                        //sound_manager.play_music("resources/sounds/music/game_bg1.mp3", true);
                        // end
                        _a.sent();
                        this.door = this.getChildByUrl("loading_door").addComponent(LoadingDoor_1.default);
                        this.door.setData(0, 0.4);
                        this.go_back = false;
                        this.pause_root = this.getChildByUrl("anchor-center/pause_root");
                        this.pause_root.active = false;
                        this.setting_root = this.getChildByUrl("anchor-center/setting_root");
                        this.setting_root.active = false;
                        this.gui_tower_builder = this.getChildByUrl("gui_tower_builder").addComponent(GuiTowerBuilder_1.default);
                        this.blood_label = this.getChildByUrl("anchor-lt/ugame_root/blood_label").getComponent(cc.Label);
                        this.uchip_label = this.getChildByUrl("anchor-lt/ugame_root/uchip_label").getComponent(cc.Label);
                        this.round_label = this.getChildByUrl("anchor-lt/ugame_root/round_label").getComponent(cc.Label);
                        this.blood = 0;
                        this.game_started = false;
                        GameDataManager_1.default.getInstance().is_game_paused = false;
                        this.map_root = this.getChildByUrl("map_root");
                        this.checkout = this.getChildByUrl("checkout").addComponent(Checkout_1.default);
                        map_level = GameDataManager_1.default.getInstance().get_cur_level();
                        if (map_level >= this.game_map_set.length) {
                            map_level = this.game_map_set.length - 1;
                        }
                        this.game_map = cc.instantiate(this.game_map_set[map_level]);
                        this.game_map.addComponent(GenMapPath_1.default);
                        this.node.addChild(this.game_map);
                        this.game_map.zIndex = -100;
                        this.map_tag_root = this.game_map.getChildByName("tag_root");
                        EventManager_1.EventManager.getInstance().addEventListener(EventName_1.GameUI.show_tower_builder, this.show_tower_builder, this);
                        EventManager_1.EventManager.getInstance().addEventListener(EventName_1.GameUI.show_game_uchip, this.show_game_uchip, this);
                        EventManager_1.EventManager.getInstance().addEventListener(EventName_1.GameUI.on_player_attacked, this.on_player_attacked, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameUIControl.prototype.onDestroy = function () {
        EventManager_1.EventManager.getInstance().removeEventListener(EventName_1.GameUI.show_tower_builder, this.show_tower_builder, this);
        EventManager_1.EventManager.getInstance().removeEventListener(EventName_1.GameUI.show_game_uchip, this.show_game_uchip, this);
        EventManager_1.EventManager.getInstance().removeEventListener(EventName_1.GameUI.on_player_attacked, this.on_player_attacked, this);
    };
    GameUIControl.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, mapPrefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "Map/levelmap" + i, cc.Prefab)];
                    case 2:
                        mapPrefab = _a.sent();
                        this.game_map_set.push(mapPrefab);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GameUIControl.prototype.start_game = function () {
        if (this.game_started === true) {
            return;
        }
        this.all_enemy_gen = false;
        // 删除掉集合里面所有的敌人
        GameDataManager_1.default.getInstance().clear_ememy_set();
        // end 
        // 取消掉所有的定时器
        this.unscheduleAllCallbacks();
        // end 
        // 取消掉所有的塔
        for (var i = 0; i < this.map_tag_root.children.length; i++) {
            var tower_builder = this.map_tag_root.children[i].addComponent(TowerBuilder_1.default);
            tower_builder.remove_builder_tower();
            tower_builder.setData(i + 1);
        }
        // end 
        // map_root
        this.map_root.removeAllChildren();
        // end 
        this.game_started = true;
        GameDataManager_1.default.getInstance().is_game_started = true;
        this.checkout.node.active = false;
        var cur_user = GameDataManager_1.default.getInstance().get_cur_user();
        this.blood = cur_user.blood;
        // this.blood = 1;
        // 同步我们的金币和血,当前第几波敌人
        this.blood_label.string = "" + this.blood;
        this.uchip_label.string = "" + GameDataManager_1.default.getInstance().get_uchip();
        this.round_label.string = "round 0 / 7";
        // end 
        // 生成我们的第一个波怪物
        this.map_level = GameDataManager_1.default.getInstance().get_cur_level();
        var map_level = this.map_level;
        if (map_level >= this.game_map_set.length) {
            map_level = this.game_map_set.length - 1;
        }
        console.log("map_level #####", map_level, this.map_level);
        this.level_data = MapDataManager_1.default.getInstance()["level_data" + (map_level + 1)]; //require("level" + (map_level + 1));
        // this.level_data = require("level1");
        this.round_label.string = "round 0 / " + this.level_data.length;
        this.cur_round = 0; // 当前要产生的是第几波敌人
        this.cur_road_index = 0; // 在非随机模式下，当前的选择路径的索引
        this.cur_gen_total = 0; // 当前这波产生的总数
        this.cur_gen_now = 0; // 当前已经放出的怪物数量
        this.gen_round_enemy();
        // end 
    };
    GameUIControl.prototype.show_tower_builder = function (data) {
        var is_builded = data.is_builded;
        var tower_builder = data.tower_builder;
        var s = cc.scaleTo(0.3, 1).easing(cc.easeBackOut());
        console.log("show_tower_builder", is_builded);
        if (is_builded === false) { // 还没有塔，所以要show builder
            this.gui_tower_builder.show_tower_builder(tower_builder);
            this.gui_tower_builder.node.scale = 0;
            this.gui_tower_builder.node.runAction(s);
        }
        else { // 已经创建，所以要显示撤销
            this.gui_tower_builder.show_tower_undo(tower_builder);
            this.gui_tower_builder.node.scale = 0;
            this.gui_tower_builder.node.runAction(s);
        }
    };
    GameUIControl.prototype.show_game_uchip = function () {
        this.uchip_label.string = "" + GameDataManager_1.default.getInstance().get_uchip();
    };
    // 打开这个门;
    GameUIControl.prototype.start = function () {
        this.start_game();
        this.door.open_the_door(null);
    };
    // 显示失败的画面
    GameUIControl.prototype.show_game_failed = function () {
        this.checkout.show_failed();
    };
    GameUIControl.prototype.on_player_attacked = function (data) {
        if (this.game_started === false) {
            return;
        }
        this.blood -= data.hurt;
        if (this.blood <= 0) {
            this.blood = 0;
            // 游戏失败结束
            this.game_started = false;
            GameDataManager_1.default.getInstance().is_game_started = false;
            this.show_game_failed();
        }
        this.blood_label.string = "" + this.blood; // 更新当前的血量
    };
    GameUIControl.prototype.gen_one_enemy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cur_round_params, type, road_set, map_road_set, index, random_index, road_data, time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.game_started === false) {
                            return [2 /*return*/];
                        }
                        if (GameDataManager_1.default.getInstance().is_game_paused) {
                            this.scheduleOnce(this.gen_one_enemy.bind(this), this.cur_schedule_time);
                            return [2 /*return*/];
                        }
                        cur_round_params = this.level_data[this.cur_round];
                        type = cur_round_params.type[this.cur_gen_now];
                        road_set = cur_round_params.road_set;
                        map_road_set = GameDataManager_1.default.getInstance().get_map_road_set();
                        index = 0;
                        if (cur_round_params.random_road) {
                            random_index = Math.random() * road_set.length;
                            random_index = Math.floor(random_index);
                            if (random_index >= road_set.length) {
                                random_index = road_set.length - 1;
                            }
                            index = road_set[random_index];
                        }
                        else {
                            index = this.cur_road_index;
                            this.cur_road_index++;
                            if (this.cur_road_index > road_set.length) {
                                this.cur_road_index = 0;
                            }
                            index = road_set[index];
                        }
                        if (index >= map_road_set.length) {
                            index = 0;
                        }
                        road_data = map_road_set[index];
                        //actor.set_actor_params(cur_round_params.actor_params);
                        //actor.gen_at_road(road_data);
                        // 生成敌人
                        return [4 /*yield*/, ECSManager_1.default.getInstance().createEnemyEntity(type, road_data, cur_round_params.actor_params)];
                    case 1:
                        //actor.set_actor_params(cur_round_params.actor_params);
                        //actor.gen_at_road(road_data);
                        // 生成敌人
                        _a.sent();
                        if (this.cur_gen_now === 0) {
                            this.round_label.string = "round " + (this.cur_round + 1) + " / " + this.level_data.length;
                        }
                        this.cur_gen_now++;
                        if (this.cur_gen_now == this.cur_gen_total) { // 放下一波敌人
                            this.cur_round++;
                            this.gen_round_enemy();
                        }
                        else {
                            time = cur_round_params.gen_time_set[this.cur_gen_now];
                            this.cur_schedule_time = time;
                            this.scheduleOnce(this.gen_one_enemy.bind(this), time);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GameUIControl.prototype.think_level_pass = function () {
        if (this.game_started === false ||
            this.all_enemy_gen === false ||
            GameDataManager_1.default.getInstance().ememy_set.length > 0) {
            this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
            return;
        }
        // 通关成功
        var cur_user = GameDataManager_1.default.getInstance().get_cur_user();
        this.checkout.show_passed(cur_user.blood, this.blood);
        this.game_started = false;
        // end 
    };
    // 产生一波敌人
    GameUIControl.prototype.gen_round_enemy = function () {
        if (this.cur_round >= this.level_data.length) { // 整个敌人已经产生完毕
            this.all_enemy_gen = true; // 生成完了。
            this.scheduleOnce(this.think_level_pass.bind(this), 0.5);
            return;
        }
        var cur_round_params = this.level_data[this.cur_round];
        var time = cur_round_params.delay;
        var num = cur_round_params.num;
        this.cur_gen_total = num;
        this.cur_gen_now = 0;
        // 在延时条件下的非随机选路的索引
        this.cur_road_index = 0;
        time += cur_round_params.gen_time_set[this.cur_gen_now];
        this.cur_schedule_time = time;
        this.scheduleOnce(this.gen_one_enemy.bind(this), time);
        return;
    };
    // 跳转到home场景;
    GameUIControl.prototype.goto_roadmap_scene = function () {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        this.checkout.node.active = false;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        this.go_back = true;
        this.door.close_the_door(function () {
            cc.director.loadScene("roadmap_scene", function () {
            });
        }.bind(this));
    };
    // 游戏暂停
    GameUIControl.prototype.on_pause_click = function () {
        this.pause_root.active = true;
        GameDataManager_1.default.getInstance().is_game_paused = true;
    };
    // 游戏重新开始
    GameUIControl.prototype.on_resume_game_click = function () {
        this.pause_root.active = false;
        GameDataManager_1.default.getInstance().is_game_paused = false;
    };
    // end 
    GameUIControl.prototype.on_setting_click = function () {
        this.setting_root.active = true;
        GameDataManager_1.default.getInstance().is_game_paused = true;
    };
    GameUIControl.prototype.on_setting_close_click = function () {
        this.setting_root.active = false;
        GameDataManager_1.default.getInstance().is_game_paused = false;
    };
    GameUIControl.prototype.on_setting_replay_click = function () {
        this.setting_root.active = false;
        this.game_started = false;
        GameDataManager_1.default.getInstance().is_game_paused = false;
        this.on_replay_game_click();
    };
    GameUIControl.prototype.on_replay_game_click = function () {
        this.start_game();
    };
    GameUIControl.prototype.on_start_game_click = function () {
        if (this.game_started === true) {
            return;
        }
        this.game_started = true;
    };
    GameUIControl = __decorate([
        ccclass
    ], GameUIControl);
    return GameUIControl;
}(UIControl_1.UIControl));
exports.default = GameUIControl;

cc._RF.pop();