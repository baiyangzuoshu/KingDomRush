"use strict";
cc._RF.push(module, 'd8753QTl1xBFp/SoXSI6Q8R', 'UIBase');
// FrameWork/ui/UIBase.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIBase = /** @class */ (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = {};
        _this.pkgName = "";
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    UIBase.prototype.onLoad = function () {
    };
    UIBase.prototype.loadMainGUI = function (pkgName, resName) {
        this.pkgName = pkgName;
        this.gui = fgui.UIPackage.createObject(pkgName, resName).asCom;
        fgui.GRoot.inst.addChild(this.gui);
        this.traverseAllChildren(this.gui, "");
        //console.log(this.view)
    };
    UIBase.prototype.traverseAllChildren = function (node, url) {
        if (!node || !node._children) {
            return;
        }
        for (var i = 0; i < node._children.length; i++) {
            var child = node._children[i];
            var name = child.name;
            this.view[url + name] = child;
            this.traverseAllChildren(child.asCom, url + name + "/");
        }
    };
    UIBase.prototype.guiMakeFullScreen = function () {
        this.gui.makeFullScreen();
    };
    UIBase.prototype.buttonAddClickEvent = function (name, func, target) {
        this.gui.getChild(name).onClick(func, target);
    };
    UIBase.prototype.createGUIObject = function (resName, userClass) {
        var obj = fgui.UIPackage.createObject(this.pkgName, resName, userClass);
        return obj;
    };
    UIBase.prototype.getGUIChild = function (name) {
        return this.gui.getChild(name);
    };
    UIBase.prototype.getGUIController = function (name) {
        return this.gui.getController(name);
    };
    UIBase.prototype.getChildrenNum = function () {
        return this.gui.numChildren;
    };
    UIBase.prototype.getGUIChildAt = function (idx) {
        return this.gui.getChildAt(idx);
    };
    UIBase.prototype.getGUIItemURL = function (resName) {
        return fgui.UIPackage.getItemURL(this.pkgName, resName);
    };
    UIBase.prototype.getMainGUI = function () {
        return this.gui;
    };
    UIBase.prototype.setGUISize = function (width, height) {
        this.gui.setSize(width, height);
    };
    UIBase.prototype.onDestroy = function () {
        this.gui.dispose();
    };
    UIBase = __decorate([
        ccclass
    ], UIBase);
    return UIBase;
}(cc.Component));
exports.default = UIBase;

cc._RF.pop();