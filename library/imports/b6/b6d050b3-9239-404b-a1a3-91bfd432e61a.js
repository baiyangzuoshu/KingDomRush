"use strict";
cc._RF.push(module, 'b6d05CzkjlAS6Gjkb/UMuYa', 'LoadingDoor');
// Scripts/Tools/LoadingDoor.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingDoor = /** @class */ (function (_super) {
    __extends(LoadingDoor, _super);
    function LoadingDoor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.l_door = null;
        _this.r_door = null;
        _this.door_state = 0; // 0 表示关, 1表示开
        _this.anim_duration = 0.1;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    LoadingDoor.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.l_door = this.getChildByUrl("l_door");
        this.r_door = this.getChildByUrl("r_door");
    };
    LoadingDoor.prototype.setData = function (state, duration) {
        this.door_state = state;
        this.anim_duration = duration;
        this._set_door_state(this.door_state);
    };
    LoadingDoor.prototype._set_door_state = function (state) {
        this.door_state = state;
        var win_size = cc.director.getWinSize();
        if (this.door_state === 0) { // 关门
            this.l_door.x = 2;
            this.r_door.x = -2;
        }
        else if (this.door_state === 1) { // 开门
            this.l_door.x = -win_size.width * 0.5;
            this.r_door.x = win_size.width * 0.5;
        }
    };
    LoadingDoor.prototype.set_door_state = function (state) {
        if (this.door_state == state) {
            return;
        }
        this._set_door_state(state);
    };
    LoadingDoor.prototype.close_the_door = function (end_func) {
        if (this.door_state === 0) {
            return;
        }
        var win_size = cc.director.getWinSize();
        this.door_state = 0;
        this.l_door.x = -win_size.width * 0.5;
        this.r_door.x = win_size.width * 0.5;
        var m1 = cc.moveBy(this.anim_duration, (win_size.width * 0.5 + 2), 0);
        this.l_door.runAction(m1);
        var m2 = cc.moveBy(this.anim_duration, -(win_size.width * 0.5 + 2), 0);
        var call_back = cc.callFunc(function () {
            // 播放关门的音效
            //sound_manager.play_effect("resources/sounds/close_door.mp3");
            if (end_func) {
                end_func();
            }
        }.bind(this), this.l_door);
        var seq = cc.sequence([m2, call_back]);
        this.r_door.runAction(seq);
    };
    LoadingDoor.prototype.open_the_door = function (end_func) {
        if (this.door_state === 1) {
            return;
        }
        this.door_state = 1;
        this.l_door.x = 2;
        this.r_door.x = -2;
        var win_size = cc.director.getWinSize();
        var m1 = cc.moveBy(this.anim_duration, -win_size.width * 0.5 - 2, 0);
        this.l_door.runAction(m1);
        var m2 = cc.moveBy(this.anim_duration, win_size.width * 0.5 + 2, 0);
        var call_back = cc.callFunc(function () {
            if (end_func) {
                end_func();
            }
        }.bind(this), this.r_door);
        var seq = cc.sequence([m2, call_back]);
        this.r_door.runAction(seq);
    };
    LoadingDoor = __decorate([
        ccclass
    ], LoadingDoor);
    return LoadingDoor;
}(UIControl_1.UIControl));
exports.default = LoadingDoor;

cc._RF.pop();