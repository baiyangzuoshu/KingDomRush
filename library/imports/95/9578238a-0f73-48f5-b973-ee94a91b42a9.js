"use strict";
cc._RF.push(module, '95782OKD3NI9blz7pSpG0Kp', 'NickNameControl');
// Scripts/UI/NickNameControl.ts

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
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var Cmd_1 = require("../Cmd");
var Stype_1 = require("../Stype");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NickNameControl = /** @class */ (function (_super) {
    __extends(NickNameControl, _super);
    function NickNameControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    NickNameControl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.buttonAddClickEvent("ID_4478", this.btnEvent, this);
        this.buttonAddClickEvent("ID_4479", this.btnEvent, this);
        this.buttonAddClickEvent("createRoleBtn", this.btnEvent, this);
    };
    NickNameControl.prototype.btnEvent = function (ref) {
        var name = ref.node.name;
        if ("ID_4478" == name) {
            var ID_4478 = this.getChildByUrl("ID_4478");
            var ID_4479 = this.getChildByUrl("ID_4479");
            ID_4478.setScale(1.1);
            ID_4479.setScale(1.0);
        }
        else if ("ID_4479" == name) {
            var ID_4478 = this.getChildByUrl("ID_4478");
            var ID_4479 = this.getChildByUrl("ID_4479");
            ID_4478.setScale(1.0);
            ID_4479.setScale(1.1);
        }
        else if ("createRoleBtn" == name) {
            //创建角色
            var nicknameNode = this.getChildByUrl("ID_447/New EditBox");
            var nicknameEditBox = nicknameNode.getComponent(cc.EditBox);
            var nickname = nicknameEditBox.string;
            var sex = 2;
            var stype = Stype_1.default.Auth;
            var ctype = Cmd_1.default.C2SUpdateUser;
            var msg = { uname: "maomao", sex: sex, name: nickname };
        }
    };
    NickNameControl.prototype.start = function () {
    };
    NickNameControl = __decorate([
        ccclass
    ], NickNameControl);
    return NickNameControl;
}(UIControl_1.UIControl));
exports.default = NickNameControl;

cc._RF.pop();