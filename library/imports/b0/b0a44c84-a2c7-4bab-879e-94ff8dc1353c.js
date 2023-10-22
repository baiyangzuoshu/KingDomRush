"use strict";
cc._RF.push(module, 'b0a44yEosdLq4eelP+NwTU8', 'MainMenu');
// Scripts/demo/MainMenu.ts

"use strict";
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
var UIBase_1 = require("../../FrameWork/ui/UIBase");
var BagDemo_1 = require("./BagDemo");
var BasicsDemo_1 = require("./BasicsDemo");
var ChatDemo_1 = require("./ChatDemo");
var CooldownDemo_1 = require("./CooldownDemo");
var GuideDemo_1 = require("./GuideDemo");
var HitTestDemo_1 = require("./HitTestDemo");
var JoystickDemo_1 = require("./JoystickDemo");
var ListEffectDemo_1 = require("./ListEffectDemo");
var LoopListDemo_1 = require("./LoopListDemo");
var ModalWaitingDemo_1 = require("./ModalWaitingDemo");
var PullToRefreshDemo_1 = require("./PullToRefreshDemo");
var ScrollPaneDemo_1 = require("./ScrollPaneDemo");
var TransitionDemo_1 = require("./TransitionDemo");
var TreeViewDemo_1 = require("./TreeViewDemo");
var VirtualListDemo_1 = require("./VirtualListDemo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainMenu = /** @class */ (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.onLoad = function () {
        var _this = this;
        this.loadMainGUI("MainMenu", "Main");
        this.guiMakeFullScreen();
        this.buttonAddClickEvent("n1", function () {
            _this.startDemo(BasicsDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n2", function () {
            _this.startDemo(TransitionDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n4", function () {
            _this.startDemo(VirtualListDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n5", function () {
            _this.startDemo(LoopListDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n6", function () {
            _this.startDemo(HitTestDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n7", function () {
            _this.startDemo(PullToRefreshDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n8", function () {
            _this.startDemo(ModalWaitingDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n9", function () {
            _this.startDemo(JoystickDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n10", function () {
            _this.startDemo(BagDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n11", function () {
            _this.startDemo(ChatDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n12", function () {
            _this.startDemo(ListEffectDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n13", function () {
            _this.startDemo(ScrollPaneDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n14", function () {
            _this.startDemo(TreeViewDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n15", function () {
            _this.startDemo(GuideDemo_1.default);
        }, this);
        this.buttonAddClickEvent("n16", function () {
            _this.startDemo(CooldownDemo_1.default);
        }, this);
    };
    MainMenu.prototype.startDemo = function (demoClass) {
        var demo = this.addComponent(demoClass);
        this.node.emit("start_demo", demo);
        this.destroy();
    };
    MainMenu = __decorate([
        ccclass
    ], MainMenu);
    return MainMenu;
}(UIBase_1.default));
exports.default = MainMenu;

cc._RF.pop();