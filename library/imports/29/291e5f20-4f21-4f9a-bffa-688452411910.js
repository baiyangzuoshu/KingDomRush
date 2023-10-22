"use strict";
cc._RF.push(module, '291e58gTyFPmr/6aIRSQRkQ', 'LoginControl');
// Scripts/UI/LoginControl.ts

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
var FGUIManager_1 = require("../../FrameWork/manager/FGUIManager");
var ResManager_1 = require("../../FrameWork/manager/ResManager");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var Cmd_1 = require("../Cmd");
var Stype_1 = require("../Stype");
var MainMenu_1 = require("../demo/MainMenu");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoginControl = /** @class */ (function (_super) {
    __extends(LoginControl, _super);
    function LoginControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.test = 0;
        return _this;
    }
    LoginControl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.buttonAddClickEvent("LoginPop/LoginPop1", this.buttonEvent, this);
        this.buttonAddClickEvent("LoginPop/LoginPop2", this.buttonEvent, this);
        this.buttonAddClickEvent("RegisterPop/RegisterPop11", this.buttonEvent, this);
        this.buttonAddClickEvent("RegisterPop/RegisterPop12", this.buttonEvent, this);
        var arr = [
            "MainMenu", "Bag", "Chat", "HitTest", "Basics", "Cooldown", "Guide", "Joystick", "LoopList", "ListEffect",
            "PullToRefresh", "ScrollPane", "ModalWaiting", "Transition", "TreeView", "VirtualList"
        ];
        arr.forEach(function (v, k, _) {
            console.log(v, k);
            FGUIManager_1.default.getInstance().loadPackageByBundle(ResManager_1.ResManager.getInstance().getBundleByName("UI", v), v);
        });
        this.node.on("start_demo", this.onDemoStart, this);
    };
    LoginControl.prototype.onDemoStart = function (demo) {
        this._currentDemo = demo;
        this._closeButton = fgui.UIPackage.createObject("MainMenu", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100000;
        this._closeButton.onClick(this.onDemoClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
    };
    LoginControl.prototype.onDemoClosed = function () {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        this.node.removeComponent(this._currentDemo);
        this.addComponent(MainMenu_1.default);
    };
    LoginControl.prototype.buttonEvent = function (btn) {
        var name = btn.node.name;
        if ("LoginPop2" == name) {
            var LoginPop = this.getChildByUrl("LoginPop");
            var RegisterPop = this.getChildByUrl("RegisterPop");
            LoginPop.active = false;
            RegisterPop.active = true;
        }
        else if ("RegisterPop12" == name) {
            var LoginPop = this.getChildByUrl("LoginPop");
            var RegisterPop = this.getChildByUrl("RegisterPop");
            LoginPop.active = true;
            RegisterPop.active = false;
        }
        else if ("RegisterPop11" == name) {
            var unameNode = this.getChildByUrl("RegisterPop/RegisterPop6/New EditBox");
            var unameEditBox = unameNode.getComponent(cc.EditBox);
            var uname = unameEditBox.string;
            var upwdNode = this.getChildByUrl("RegisterPop/RegisterPop66/New EditBox");
            var upwdEditBox = upwdNode.getComponent(cc.EditBox);
            var upwd = upwdEditBox.string;
            console.log(uname, upwd);
            //立即注册
            var stype = Stype_1.default.Auth;
            var ctype = Cmd_1.default.UnameRegisterReq;
            var msg = { uname: uname, upwd: upwd };
        }
        else if ("LoginPop1" == name) {
            var unameNode = this.getChildByUrl("LoginPop/LoginPop6/New EditBox");
            var unameEditBox = unameNode.getComponent(cc.EditBox);
            var uname = unameEditBox.string;
            var upwdNode = this.getChildByUrl("LoginPop/LoginPop66/New EditBox");
            var upwdEditBox = upwdNode.getComponent(cc.EditBox);
            var upwd = upwdEditBox.string;
            //登录
            var stype = Stype_1.default.Auth;
            var ctype = Cmd_1.default.UnameLoginReq;
            var msg = { uname: uname, upwd: upwd };
        }
    };
    LoginControl.prototype.start = function () {
    };
    LoginControl.prototype.update = function (dt) {
        this.test++;
        if (60 == this.test) {
            this.addComponent(MainMenu_1.default);
        }
    };
    LoginControl = __decorate([
        ccclass
    ], LoginControl);
    return LoginControl;
}(UIControl_1.UIControl));
exports.default = LoginControl;

cc._RF.pop();