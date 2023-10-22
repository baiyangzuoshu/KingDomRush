"use strict";
cc._RF.push(module, '4f9a2KFKoNGkq/rzTyBZi7G', 'TestWin');
// Scripts/demo/TestWin.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowB = exports.WindowA = exports.TestWin = void 0;
var UIWindow_1 = require("../../FrameWork/ui/UIWindow");
var TestWin = /** @class */ (function (_super) {
    __extends(TestWin, _super);
    function TestWin() {
        return _super.call(this) || this;
    }
    TestWin.prototype.onInit = function () {
        this.loadWindow("ModalWaiting", "TestWin");
        this.windowCenter();
        this.getWindowChildByName("n1").onClick(this.onClickStart, this);
    };
    TestWin.prototype.onClickStart = function () {
        var _this = this;
        //这里模拟一个要锁住当前窗口的过程，在锁定过程中，窗口仍然是可以移动和关闭的
        this.showModalWait();
        fgui.GTween.delayedCall(3).onComplete(function () { _this.closeModalWait(); }, this);
    };
    return TestWin;
}(UIWindow_1.default));
exports.TestWin = TestWin;
var WindowA = /** @class */ (function (_super) {
    __extends(WindowA, _super);
    function WindowA() {
        return _super.call(this) || this;
    }
    WindowA.prototype.onInit = function () {
        this.loadWindow("Basics", "WindowA");
        this.windowCenter();
    };
    WindowA.prototype.onShown = function () {
        var list = this.getWindowChildByName("n6").asList;
        list.removeChildrenToPool();
        for (var i = 0; i < 6; i++) {
            var item = list.addItemFromPool();
            item.title = "" + i;
            item.icon = fgui.UIPackage.getItemURL("Basics", "r4");
        }
    };
    return WindowA;
}(UIWindow_1.default));
exports.WindowA = WindowA;
var WindowB = /** @class */ (function (_super) {
    __extends(WindowB, _super);
    function WindowB() {
        return _super.call(this) || this;
    }
    WindowB.prototype.onInit = function () {
        this.loadWindow("Basics", "WindowB");
        this.windowCenter();
        //弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);
    };
    WindowB.prototype.doShowAnimation = function () {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    };
    WindowB.prototype.doHideAnimation = function () {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    };
    WindowB.prototype.onShown = function () {
        this.getWindowTransition("t1").play();
    };
    WindowB.prototype.onHide = function () {
        this.getWindowTransition("t1").stop();
    };
    return WindowB;
}(UIWindow_1.default));
exports.WindowB = WindowB;

cc._RF.pop();