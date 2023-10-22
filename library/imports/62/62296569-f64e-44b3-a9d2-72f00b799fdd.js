"use strict";
cc._RF.push(module, '62296Vp9k5Es6nScvALeZ/d', 'JoystickDemo');
// Scripts/demo/JoystickDemo.ts

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
var JoystickModule_1 = require("./JoystickModule");
var JoystickDemo = /** @class */ (function (_super) {
    __extends(JoystickDemo, _super);
    function JoystickDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._joystick = null;
        _this._text = null;
        return _this;
    }
    JoystickDemo.prototype.onLoad = function () {
        this.loadMainGUI("Joystick", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        this._text = this.getGUIChild("n9").asTextField;
        this._joystick = new JoystickModule_1.default(this.getMainGUI());
        this._joystick.on(JoystickModule_1.default.JoystickMoving, this.onJoystickMoving, this);
        this._joystick.on(JoystickModule_1.default.JoystickUp, this.onJoystickUp, this);
    };
    JoystickDemo.prototype.onJoystickMoving = function (degree) {
        this._text.text = "" + degree;
    };
    JoystickDemo.prototype.onJoystickUp = function () {
        this._text.text = "";
    };
    JoystickDemo = __decorate([
        ccclass
    ], JoystickDemo);
    return JoystickDemo;
}(UIBase_1.default));
exports.default = JoystickDemo;

cc._RF.pop();