"use strict";
cc._RF.push(module, 'b1ffc9VFONKboW61p0OeHpZ', 'AudioSwich');
// Scripts/Tools/AudioSwich.ts

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
var PlayerSoundManager_1 = require("../Manager/PlayerSoundManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AudioSwich = /** @class */ (function (_super) {
    __extends(AudioSwich, _super);
    function AudioSwich() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp = null; // 用来显示图片的Sprite组件
        _this.type = 0; // 0 表示music的开关，1表示effect的开关；
        _this.off_spriteframe = null; // off状态的图片
        _this.on_spriteframe = null; // on状态的图片
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    AudioSwich.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // 获取换状态图片的Sprite组件，
        this.sp = this.node.getComponent(cc.Sprite);
        // end 
    };
    AudioSwich.prototype.setData = function (type, off_spriteframe, on_spriteframe) {
        this.type = type;
        this.off_spriteframe = off_spriteframe;
        this.on_spriteframe = on_spriteframe;
    };
    AudioSwich.prototype.start = function () {
        if (this.type === 0) { // 表示是music的开关；
            if (PlayerSoundManager_1.default.getInstance().b_music_mute) {
                this.sp.spriteFrame = this.off_spriteframe;
            }
            else {
                this.sp.spriteFrame = this.on_spriteframe;
            }
        }
        else if (this.type === 1) {
            if (PlayerSoundManager_1.default.getInstance().b_effect_mute) {
                this.sp.spriteFrame = this.off_spriteframe;
            }
            else {
                this.sp.spriteFrame = this.on_spriteframe;
            }
        }
    };
    // 声音按钮按下，切换状态；
    AudioSwich.prototype.on_switch_click = function () {
        var b_mute;
        if (this.type === 0) { // music 的switch;
            b_mute = (PlayerSoundManager_1.default.getInstance().b_music_mute) ? 0 : 1;
            PlayerSoundManager_1.default.getInstance().set_music_mute(b_mute);
        }
        else if (this.type === 1) {
            b_mute = (PlayerSoundManager_1.default.getInstance().b_effect_mute) ? 0 : 1;
            PlayerSoundManager_1.default.getInstance().set_effect_mute(b_mute);
        }
        if (b_mute) { // off图片
            this.sp.spriteFrame = this.off_spriteframe;
        }
        else { // on图片。
            this.sp.spriteFrame = this.on_spriteframe;
        }
    };
    AudioSwich = __decorate([
        ccclass
    ], AudioSwich);
    return AudioSwich;
}(UIControl_1.UIControl));
exports.default = AudioSwich;

cc._RF.pop();