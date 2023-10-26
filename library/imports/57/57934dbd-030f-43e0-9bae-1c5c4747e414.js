"use strict";
cc._RF.push(module, '5793429Aw9D4JuuHFxHR+QU', 'GameLanch');
// Scripts/GameLanch.ts

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
var ExcelManager_1 = require("../FrameWork/manager/ExcelManager");
var FGUIManager_1 = require("../FrameWork/manager/FGUIManager");
var ResManager_1 = require("../FrameWork/manager/ResManager");
var ResManagerPro_1 = require("../FrameWork/manager/ResManagerPro");
var UIManager_1 = require("../FrameWork/manager/UIManager");
var UIManagerPro_1 = require("../FrameWork/manager/UIManagerPro");
var GameDataManager_1 = require("./Data/GameDataManager");
var GameApp_1 = require("./GameApp");
var PlayerSoundManager_1 = require("./Manager/PlayerSoundManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLanch = /** @class */ (function (_super) {
    __extends(GameLanch, _super);
    function GameLanch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    GameLanch.prototype.onLoad = function () {
        //框架
        this.addComponent(FGUIManager_1.default);
        this.addComponent(ExcelManager_1.ExcelManager);
        this.addComponent(EventManager_1.EventManager);
        this.addComponent(ResManager_1.ResManager);
        this.addComponent(UIManager_1.UIManager);
        this.addComponent(ResManagerPro_1.ResManagerPro);
        this.addComponent(UIManagerPro_1.UIManagerPro);
        //游戏
        this.addComponent(GameApp_1.default);
        this.addComponent(GameDataManager_1.default);
        this.addComponent(PlayerSoundManager_1.default);
    };
    GameLanch.prototype.start = function () {
        GameApp_1.default.getInstance().startGame();
    };
    GameLanch = __decorate([
        ccclass
    ], GameLanch);
    return GameLanch;
}(cc.Component));
exports.default = GameLanch;

cc._RF.pop();