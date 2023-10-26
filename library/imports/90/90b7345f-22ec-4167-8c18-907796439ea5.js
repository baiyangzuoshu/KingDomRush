"use strict";
cc._RF.push(module, '90b73RfIuxBZ4wYkHeWQ56l', 'PlayerSoundManager');
// Scripts/Manager/PlayerSoundManager.ts

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
var PlayerSoundManager = /** @class */ (function (_super) {
    __extends(PlayerSoundManager, _super);
    function PlayerSoundManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.b_music_mute = -1; // 表示我们的背景音乐是否静音，0为没有静音，1为静音;
        _this.b_effect_mute = -1; // 表示我们的音效是否静音，0为没有静音，1为静音;
        _this.bg_music_name = null; // 保存我们的背景音乐的文件名称的;
        _this.bg_music_loop = false;
        return _this;
    }
    PlayerSoundManager_1 = PlayerSoundManager;
    PlayerSoundManager.prototype.onLoad = function () {
        if (null === PlayerSoundManager_1._instance) {
            PlayerSoundManager_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    PlayerSoundManager.getInstance = function () {
        return PlayerSoundManager_1._instance;
    };
    PlayerSoundManager.prototype.set_music_mute = function (b_mute) {
        if (this.b_music_mute == b_mute) { // 状态没有改变;
            return;
        }
        this.b_music_mute = (b_mute) ? 1 : 0;
        // 如果是静音，那么我们就是将背景的音量调整到0，否则为1:
        if (this.b_music_mute === 1) { // 静音
            // cc.audioEngine.setMusicVolume(0);
            cc.audioEngine.stopMusic(); // 停止背景音乐播放
        }
        else if (this.b_music_mute === 0) { // 打开
            if (this.bg_music_name) {
                cc.audioEngine.playMusic(this.bg_music_name, this.bg_music_loop);
            }
            cc.audioEngine.setMusicVolume(1);
        }
        // 将这个参数存储到本地;
        cc.sys.localStorage.setItem("music_mute", this.b_music_mute);
        // end 
    };
    PlayerSoundManager.prototype.set_effect_mute = function (b_mute) {
        if (this.b_effect_mute == b_mute) {
            return;
        }
        this.b_effect_mute = (b_mute) ? 1 : 0;
        /*if (this.b_effect_mute === 1) { // 静音
            cc.audioEngine.setEffectsVolume(0);
        }
        else if(this.b_effect_mute === 0){
            cc.audioEngine.setEffectsVolume(1);
        }*/
        // 将这个参数存储到本地;
        cc.sys.localStorage.setItem("effect_mute", this.b_effect_mute);
        // end 
    };
    PlayerSoundManager.prototype.stop_music = function () {
        cc.audioEngine.stopMusic(); // 先停止当前正在播放的;
        this.bg_music_name = null;
    };
    // 播放背景音乐
    PlayerSoundManager.prototype.play_music = function (file_name, loop) {
        cc.audioEngine.stopMusic(); // 先停止当前正在播放的;
        this.bg_music_name = file_name; // 保存我们当前正在播放的背景音乐;
        this.bg_music_loop = loop;
        if (this.b_music_mute) {
            // cc.audioEngine.setEffectsVolume(0);
        }
        else {
            // cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.playMusic(file_name, loop); // 当我们调用playMusic的时候，volue又回到了1;
        }
    };
    // end
    // 播放背景音效:
    PlayerSoundManager.prototype.play_effect = function (file_name) {
        if (this.b_effect_mute) { // 如果音效静音了，直接return;
            return;
        }
        cc.audioEngine.playEffect(file_name, false);
    };
    var PlayerSoundManager_1;
    PlayerSoundManager._instance = null;
    PlayerSoundManager = PlayerSoundManager_1 = __decorate([
        ccclass
    ], PlayerSoundManager);
    return PlayerSoundManager;
}(cc.Component));
exports.default = PlayerSoundManager;

cc._RF.pop();