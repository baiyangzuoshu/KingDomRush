"use strict";
cc._RF.push(module, '6f1e6UJ0T5Li4wX+0XGC9uI', 'HomeUIControl');
// Scripts/UI/HomeUIControl.ts

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
var UIManagerPro_1 = require("../../FrameWork/manager/UIManagerPro");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var GameDataManager_1 = require("../Data/GameDataManager");
var EventName_1 = require("../EventName");
var AudioSwich_1 = require("../Tools/AudioSwich");
var LoadingDoor_1 = require("../Tools/LoadingDoor");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomeUIControl = /** @class */ (function (_super) {
    __extends(HomeUIControl, _super);
    function HomeUIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_started = false;
        _this.start_anim_com = null;
        _this.start_click_animclip = null;
        _this.uinfo_enter_anim_com = null;
        _this.outside = false; // 跳出了场景;
        _this.loading_door = null;
        _this.music_switch = null;
        _this.effect_switch = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    HomeUIControl.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var off_spriteframe, on_spriteframe, off_spriteframe2, on_spriteframe2, clip_array;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.onLoad.call(this);
                        this.registerBtnClickEvent();
                        this.loading_door = this.getChildByUrl("anchor-center/loading_door").addComponent(LoadingDoor_1.default);
                        this.loading_door.setData(1, 0.4);
                        this.music_switch = this.getChildByUrl("anchor-center/music_switch").addComponent(AudioSwich_1.default);
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0001", cc.SpriteFrame)];
                    case 1:
                        off_spriteframe = _a.sent();
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0002", cc.SpriteFrame)];
                    case 2:
                        on_spriteframe = _a.sent();
                        this.music_switch.setData(1, off_spriteframe, on_spriteframe);
                        this.effect_switch = this.getChildByUrl("anchor-center/effect_switch").addComponent(AudioSwich_1.default);
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0003", cc.SpriteFrame)];
                    case 3:
                        off_spriteframe2 = _a.sent();
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("textures", "common/options_overlay_buttons_0004", cc.SpriteFrame)];
                    case 4:
                        on_spriteframe2 = _a.sent();
                        this.effect_switch.setData(1, off_spriteframe2, on_spriteframe2);
                        this.game_started = false;
                        this.start_anim_com = this.getChildByUrl("anchor-center/start_anim_root").getComponent(cc.Animation);
                        clip_array = this.start_anim_com.getClips();
                        this.start_click_animclip = clip_array[1];
                        this.uinfo_enter_anim_com = this.getChildByUrl("anchor-center/user_game_info_root").getComponent(cc.Animation);
                        this.outside = false; // 跳出了场景;
                        // 播放背景音乐;
                        //sound_manager.play_music("resources/sounds/music/home_scene_bg.mp3", true);
                        // end
                        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
                        EventManager_1.EventManager.getInstance().addEventListener(EventName_1.HomeUI.open_the_door, this.open_the_door, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeUIControl.prototype.onDestroy = function () {
        EventManager_1.EventManager.getInstance().removeEventListener(EventName_1.HomeUI.open_the_door, this.open_the_door, this);
    };
    HomeUIControl.prototype.open_the_door = function () {
        var _this = this;
        this.loading_door.open_the_door(function () {
            _this.outside = false;
        });
    };
    HomeUIControl.prototype.registerBtnClickEvent = function () {
        this.buttonAddClickEvent("anchor-center/start_anim_root/about_btton_root/about_button", this.goto_about, this);
        this.buttonAddClickEvent("anchor-center/start_anim_root/start_button_root/start_button", this.start_game, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/close_uinfo_dlg_bt", this.close_uinfo_dlg, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user1/entry", this.on_user_entry_click1, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry", this.on_user_entry_click2, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry", this.on_user_entry_click3, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry", this.on_user_entry_click3, this);
        this.buttonAddClickEvent("anchor-center/user_game_info_root/user2/entry", this.on_user_entry_click3, this);
        this.buttonAddClickEvent("anchor-center/music_switch", this.onMusicEvent, this);
        this.buttonAddClickEvent("anchor-center/effect_switch", this.onEffectEvent, this);
    };
    HomeUIControl.prototype.onMusicEvent = function () {
        this.music_switch.on_switch_click();
    };
    HomeUIControl.prototype.onEffectEvent = function () {
        this.effect_switch.on_switch_click();
    };
    HomeUIControl.prototype.onKeyDown = function (event) {
        console.log(event.keyCode);
        // 打印出来back,的键值，你就判断就可以了。
    };
    // user_node, 节点， user,是本地的账户的游戏数据
    HomeUIControl.prototype.set_star_score = function (user_node, user) {
        var star_score_label = user_node.getChildByName("star_score").getComponent(cc.Label);
        star_score_label.string = user.star_num + " / " + user.star_total;
    };
    HomeUIControl.prototype.show_user_data = function () {
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user1"), GameDataManager_1.default.getInstance().user_data[0]);
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user2"), GameDataManager_1.default.getInstance().user_data[1]);
        this.set_star_score(this.getChildByUrl("anchor-center/user_game_info_root/user3"), GameDataManager_1.default.getInstance().user_data[2]);
    };
    // 动态打开
    HomeUIControl.prototype.start = function () {
        // 将我们的用户数据显示到我们的界面上面；
        this.show_user_data();
        // end 
        this.scheduleOnce(function () {
            this.start_anim_com.play("home_scene_start_anim");
        }.bind(this), 0.5);
    };
    HomeUIControl.prototype.start_game = function () {
        if (this.game_started) { // 保证在播放期间，start只调用一次;
            return;
        }
        this.game_started = true;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        // end 
        // 播放我们的收起动画;
        // this.start_click_animclip.wrapMode = cc.WrapMode.Normal;
        this.start_anim_com.play("start_button_click_anim");
        // end 
        // 播放完成了以后，我们再播放我们玩家信息的入场动画;
        this.scheduleOnce(function () {
            this.uinfo_enter_anim_com.play("uinfo_enter_anim");
        }.bind(this), this.start_anim_com.currentClip.duration);
        // end 
    };
    // 关闭我们用户游戏信息的对话框
    HomeUIControl.prototype.close_uinfo_dlg = function () {
        // Step1, 播放关闭动画;
        this.uinfo_enter_anim_com.play("reserve_uinfo_enter_anim");
        // end
        // 再将start按钮掉下来;
        this.scheduleOnce(function () {
            // 在代码里面修改wrapMode没有作用;
            /*
            console.log("#####", this.start_click_animclip.wrapMode);
            this.start_click_animclip.wrapMode = cc.WrapMode.Reverse;
            console.log("#####", this.start_click_animclip.wrapMode);
            this.start_anim_com.play("start_button_click_anim");
            console.log("#####", this.start_click_animclip.wrapMode);
            console.log("#####", this.start_anim_com.currentClip.wrapMode);
            */
            this.game_started = false;
            this.start_anim_com.play("reserve_start_button_click_anim");
        }.bind(this), this.uinfo_enter_anim_com.currentClip.duration); // 动画的时间长度;
    };
    HomeUIControl.prototype.close_door = function () {
        this.loading_door.set_door_state(0);
        this.scheduleOnce(function () {
            this.loading_door.open_the_door();
        }.bind(this), 0.5);
    };
    HomeUIControl.prototype.goto_about = function () {
        if (this.outside) { // 使用变量挡住，防止多次跳转;
            return;
        }
        this.outside = true;
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        this.loading_door.close_the_door(function () {
            this.scheduleOnce(function () {
                //cc.director.loadScene("abount_scene");  
                UIManagerPro_1.UIManagerPro.getInstance().showPrefab("AboutUI");
            }, 0.5);
        }.bind(this));
    };
    // 使用哪个用户进入游戏点击响应
    HomeUIControl.prototype.on_user_entry_click1 = function () {
        this.on_user_entry(0);
    };
    HomeUIControl.prototype.on_user_entry_click2 = function () {
        this.on_user_entry(1);
    };
    HomeUIControl.prototype.on_user_entry_click3 = function () {
        this.on_user_entry(2);
    };
    HomeUIControl.prototype.on_user_entry = function (user_index) {
        if (this.outside) { // 使用变量挡住，防止多次跳转;
            return;
        }
        this.outside = true;
        user_index = parseInt(user_index);
        GameDataManager_1.default.getInstance().set_cur_user(user_index);
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        this.loading_door.close_the_door(function () {
            this.scheduleOnce(function () {
                //cc.director.loadScene("roadmap_scene"); 
                UIManagerPro_1.UIManagerPro.getInstance().showPrefab("RoadMapUI");
            }, 0.5);
        }.bind(this));
    };
    HomeUIControl = __decorate([
        ccclass
    ], HomeUIControl);
    return HomeUIControl;
}(UIControl_1.UIControl));
exports.default = HomeUIControl;

cc._RF.pop();