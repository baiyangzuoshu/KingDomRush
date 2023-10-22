"use strict";
cc._RF.push(module, '62a39ciiPdONZqk/t0zo8PH', 'GameApp');
// Scripts/GameApp.ts

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
var EventManager_1 = require("../FrameWork/manager/EventManager");
var ResManager_1 = require("../FrameWork/manager/ResManager");
var ResManagerPro_1 = require("../FrameWork/manager/ResManagerPro");
var UIManager_1 = require("../FrameWork/manager/UIManager");
var Enum_1 = require("./Enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameApp = /** @class */ (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvas = null;
        _this.progressBar = null;
        return _this;
        // update (dt) {}
    }
    GameApp_1 = GameApp;
    // LIFE-CYCLE CALLBACKS:
    GameApp.getInstance = function () {
        return GameApp_1._instance;
    };
    GameApp.prototype.enterGame = function () {
        UIManager_1.UIManager.getInstance().showUI("Login", this.canvas);
    };
    GameApp.prototype.test = function () {
        ResManagerPro_1.ResManagerPro.Instance.Init();
    };
    GameApp.prototype.startGame = function () {
        var _this = this;
        //加载资源
        var pkg = {
            "prefabs": cc.Prefab,
            "img": cc.SpriteFrame,
            "Sounds": cc.AudioClip,
            "data": cc.TextAsset,
            "proto": cc.TextAsset,
            "UI": cc.BufferAsset
            //"UI":[{assetType:cc.BufferAsset,urls:["Bag"]},{assetType:cc.SpriteFrame,urls:["Bag_atlas0"]}],
        };
        this.progressBar.progress = 0;
        ResManager_1.ResManager.getInstance().parsePkg(pkg, function (cur, total) {
            console.log("cur total", cur, total);
            _this.progressBar.progress = cur * 1.0 / total;
        }, function () {
            console.log("end");
            //加载游戏
            _this.progressBar.node.active = false;
            //测试1
            //this.enterGame()
            //测试2
            _this.test();
        });
    };
    GameApp.prototype.onLoad = function () {
        if (null === GameApp_1._instance) {
            GameApp_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        this.canvas = cc.find("Canvas");
        this.progressBar = this.canvas.getChildByName("ProgressBar").getComponent(cc.ProgressBar);
        this.progressBar.progress = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnded, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this, true);
    };
    GameApp.prototype.touchStart = function (e) {
        EventManager_1.EventManager.getInstance().emit(Enum_1.default.EventName.TouchStart, e);
    };
    GameApp.prototype.touchMoved = function (e) {
        EventManager_1.EventManager.getInstance().emit(Enum_1.default.EventName.TouchMoved, e);
    };
    GameApp.prototype.touchEnded = function (e) {
        EventManager_1.EventManager.getInstance().emit(Enum_1.default.EventName.TouchEnded, e);
    };
    GameApp.prototype.touchCancel = function (e) {
        EventManager_1.EventManager.getInstance().emit(Enum_1.default.EventName.TouchCancel, e);
    };
    GameApp.prototype.start = function () {
    };
    var GameApp_1;
    GameApp._instance = null;
    GameApp = GameApp_1 = __decorate([
        ccclass
    ], GameApp);
    return GameApp;
}(cc.Component));
exports.default = GameApp;

cc._RF.pop();