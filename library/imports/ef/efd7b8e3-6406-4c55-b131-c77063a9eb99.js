"use strict";
cc._RF.push(module, 'efd7bjjZAZMVbExx3BjqeuZ', 'ModalWaitingDemo');
// Scripts/demo/ModalWaitingDemo.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIBase_1 = require("../../FrameWork/ui/UIBase");
var TestWin_1 = require("./TestWin");
var ModalWaitingDemo = /** @class */ (function (_super) {
    __extends(ModalWaitingDemo, _super);
    function ModalWaitingDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._testWin = null;
        return _this;
    }
    ModalWaitingDemo.prototype.onLoad = function () {
        var _this = this;
        fgui.UIConfig.globalModalWaiting = "ui://ModalWaiting/GlobalModalWaiting";
        fgui.UIConfig.windowModalWaiting = "ui://ModalWaiting/WindowModalWaiting";
        this.loadMainGUI("ModalWaiting", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        this._testWin = new TestWin_1.TestWin();
        this.getGUIChild("n0").onClick(function () { _this._testWin.show(); });
        //这里模拟一个要锁住全屏的等待过程
        fgui.GRoot.inst.showModalWait();
        this.scheduleOnce(function () {
            fgui.GRoot.inst.closeModalWait();
        }, 3);
    };
    ModalWaitingDemo = __decorate([
        ccclass
    ], ModalWaitingDemo);
    return ModalWaitingDemo;
}(UIBase_1.default));
exports.default = ModalWaitingDemo;

cc._RF.pop();