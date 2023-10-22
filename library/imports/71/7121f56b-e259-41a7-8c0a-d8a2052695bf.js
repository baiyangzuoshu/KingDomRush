"use strict";
cc._RF.push(module, '7121fVr4llBp4wK2KIFJpW/', 'CooldownDemo');
// Scripts/demo/CooldownDemo.ts

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
var CooldownDemo = /** @class */ (function (_super) {
    __extends(CooldownDemo, _super);
    function CooldownDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._btn0 = null;
        _this._btn1 = null;
        return _this;
    }
    CooldownDemo.prototype.onLoad = function () {
        this.loadMainGUI("Cooldown", "Main");
        this.guiMakeFullScreen();
        this._btn0 = this.getGUIChild("b0").asProgress;
        this._btn1 = this.getGUIChild("b1").asProgress;
        this._btn0.getChild("icon").icon = "Icons/k0";
        this._btn1.getChild("icon").icon = "Icons/k1";
        fgui.GTween.to(0, 100, 5).setTarget(this._btn0, "value").setRepeat(-1);
        fgui.GTween.to(10, 0, 10).setTarget(this._btn1, "value").setRepeat(-1);
    };
    CooldownDemo = __decorate([
        ccclass
    ], CooldownDemo);
    return CooldownDemo;
}(UIBase_1.default));
exports.default = CooldownDemo;

cc._RF.pop();