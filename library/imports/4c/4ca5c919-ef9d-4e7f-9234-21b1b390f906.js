"use strict";
cc._RF.push(module, '4ca5ckZ751Of5I0IbGzkPkG', 'TransitionDemo');
// Scripts/demo/TransitionDemo.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TransitionDemo = /** @class */ (function (_super) {
    __extends(TransitionDemo, _super);
    function TransitionDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._btnGroup = null;
        _this._g1 = null;
        _this._g2 = null;
        _this._g3 = null;
        _this._g4 = null;
        _this._g5 = null;
        _this._g6 = null;
        _this._startValue = 0;
        _this._endValue = 0;
        return _this;
    }
    TransitionDemo.prototype.onLoad = function () {
        var _this = this;
        this.loadMainGUI("Transition", "Main");
        this.guiMakeFullScreen();
        this._btnGroup = this.getGUIChild("g0").asGroup;
        this._g1 = fgui.UIPackage.createObject("Transition", "BOSS").asCom;
        this._g2 = fgui.UIPackage.createObject("Transition", "BOSS_SKILL").asCom;
        this._g3 = fgui.UIPackage.createObject("Transition", "TRAP").asCom;
        this._g4 = fgui.UIPackage.createObject("Transition", "GoodHit").asCom;
        this._g5 = fgui.UIPackage.createObject("Transition", "PowerUp").asCom;
        this._g6 = fgui.UIPackage.createObject("Transition", "PathDemo").asCom;
        //play_num_now是在编辑器里设定的名称，这里表示播放到'play_num_now'这个位置时才开始播放数字变化效果
        this._g5.getTransition("t0").setHook("play_num_now", this.__playNum.bind(this));
        this.getGUIChild("btn0").onClick(function () { _this.__play(_this._g1); });
        this.getGUIChild("btn1").onClick(function () { _this.__play(_this._g2); });
        this.getGUIChild("btn2").onClick(function () { _this.__play(_this._g3); });
        this.getGUIChild("btn3").onClick(this.__play4, this);
        this.getGUIChild("btn4").onClick(this.__play5, this);
        this.getGUIChild("btn5").onClick(function () { _this.__play(_this._g6); });
    };
    TransitionDemo.prototype.__play = function (target) {
        var _this = this;
        this._btnGroup.visible = false;
        fgui.GRoot.inst.addChild(target);
        var t = target.getTransition("t0");
        t.play(function () {
            _this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(target);
        });
    };
    TransitionDemo.prototype.__play4 = function () {
        var _this = this;
        this._btnGroup.visible = false;
        this._g4.x = fgui.GRoot.inst.width - this._g4.width - 20;
        this._g4.y = 100;
        fgui.GRoot.inst.addChild(this._g4);
        var t = this._g4.getTransition("t0");
        //播放3次
        t.play(function () {
            _this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(_this._g4);
        }, 3);
    };
    TransitionDemo.prototype.__play5 = function () {
        var _this = this;
        this._btnGroup.visible = false;
        this._g5.x = 20;
        this._g5.y = fgui.GRoot.inst.height - this._g5.height - 100;
        fgui.GRoot.inst.addChild(this._g5);
        var t = this._g5.getTransition("t0");
        this._startValue = 10000;
        var add = Math.ceil(Math.random() * 2000 + 1000);
        this._endValue = this._startValue + add;
        this._g5.getChild("value").text = "" + this._startValue;
        this._g5.getChild("add_value").text = "+" + add;
        t.play(function () {
            _this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(_this._g5);
        });
    };
    TransitionDemo.prototype.__playNum = function () {
        var _this = this;
        //这里演示了一个数字变化的过程
        fgui.GTween.to(this._startValue, this._endValue, 0.3)
            .setEase(fgui.EaseType.Linear)
            .onUpdate(function (tweener) {
            _this._g5.getChild("value").text = "" + Math.floor(tweener.value.x);
        });
    };
    TransitionDemo = __decorate([
        ccclass
    ], TransitionDemo);
    return TransitionDemo;
}(UIBase_1.default));
exports.default = TransitionDemo;

cc._RF.pop();