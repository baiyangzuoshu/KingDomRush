"use strict";
cc._RF.push(module, 'caa56WHZ45F37Op8GVbchuS', 'AboutUIControl');
// Scripts/UI/AboutUIControl.ts

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
var EventName_1 = require("../EventName");
var LoadingDoor_1 = require("../Tools/LoadingDoor");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AboutUIControl = /** @class */ (function (_super) {
    __extends(AboutUIControl, _super);
    function AboutUIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loading_door = null;
        _this.go_back = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    AboutUIControl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.loading_door = this.getChildByUrl("anchor-center/loading_door").addComponent(LoadingDoor_1.default);
        this.loading_door.setData(0, 0.4);
        this.buttonAddClickEvent("anchor-center/back_bt", this.goto_home, this);
    };
    // 打开这个门;
    AboutUIControl.prototype.start = function () {
        this.loading_door.open_the_door(null);
    };
    // 跳转到home场景;
    AboutUIControl.prototype.goto_home = function () {
        if (this.go_back === true) { // 使用变量挡住在播放动画时候的 按钮多次点击。
            return;
        }
        // 播放按钮的音效
        //sound_manager.play_effect("resources/sounds/click.wav");
        this.go_back = true;
        this.loading_door.close_the_door(function () {
            UIManagerPro_1.UIManagerPro.getInstance().closePrefab("AboutUI");
            EventManager_1.EventManager.getInstance().emit(EventName_1.HomeUI.open_the_door);
        }.bind(this));
    };
    AboutUIControl = __decorate([
        ccclass
    ], AboutUIControl);
    return AboutUIControl;
}(UIControl_1.UIControl));
exports.default = AboutUIControl;

cc._RF.pop();