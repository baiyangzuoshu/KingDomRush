"use strict";
cc._RF.push(module, 'e041aOQc6dE0I9i5tI20qvq', 'BagDemo');
// Scripts/demo/BagDemo.ts

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
var UIWindow_1 = require("../../FrameWork/ui/UIWindow");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BagDemo = /** @class */ (function (_super) {
    __extends(BagDemo, _super);
    function BagDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BagDemo.prototype.onLoad = function () {
        var _this = this;
        this.loadMainGUI("Bag", "Main");
        this.guiMakeFullScreen();
        this._bagWindow = new BagWindow();
        this.buttonAddClickEvent("bagBtn", function () { _this._bagWindow.show(); }, this);
    };
    BagDemo = __decorate([
        ccclass
    ], BagDemo);
    return BagDemo;
}(UIBase_1.default));
exports.default = BagDemo;
var BagWindow = /** @class */ (function (_super) {
    __extends(BagWindow, _super);
    function BagWindow() {
        return _super.call(this) || this;
    }
    BagWindow.prototype.onInit = function () {
        this.loadWindow("Bag", "BagWin");
        this.windowCenter();
    };
    BagWindow.prototype.onShown = function () {
        var list = this.getWindowChildByName("list").asList;
        list.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = 45;
    };
    BagWindow.prototype.renderListItem = function (index, obj) {
        obj.icon = "Icons/i" + Math.floor(Math.random() * 10);
        obj.text = "" + Math.floor(Math.random() * 100);
    };
    BagWindow.prototype.onClickItem = function (item) {
        this.getWindowChildByName("n11").asLoader.url = item.icon;
        this.getWindowChildByName("n13").text = item.icon;
    };
    return BagWindow;
}(UIWindow_1.default));

cc._RF.pop();