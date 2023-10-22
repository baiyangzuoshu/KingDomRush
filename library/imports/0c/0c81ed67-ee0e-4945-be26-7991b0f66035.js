"use strict";
cc._RF.push(module, '0c81e1n7g5JRb4meZGw9mA1', 'SoundManager');
// FrameWork/manager/SoundManager.ts

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
exports.SoundManager = void 0;
var SoundManager = /** @class */ (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audioEffect = [];
        _this.audioMax = 8;
        _this.bgMusic = null;
        _this.bgMusicMute = false;
        _this.curAudioEffect = 0;
        return _this;
    }
    SoundManager.getInstance = function () {
        return SoundManager._instance;
    };
    SoundManager.prototype.onLoad = function () {
        if (null == SoundManager._instance) {
            SoundManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        for (var i = 0; i < this.audioMax; i++) {
            var as = this.node.addComponent(cc.AudioSource);
            this.audioEffect.push(as);
        }
        this.bgMusic = this.node.addComponent(cc.AudioSource);
        var value = localStorage.getItem(SoundManager.MUTE_TAG);
        if (value) {
            var mute = parseInt(value);
            this.bgMusicMute = mute == 1;
        }
    };
    SoundManager.prototype.playBgMusic = function (clip, isLoop) {
        this.bgMusic.stop();
        this.bgMusic.clip = clip;
        this.bgMusic.loop = isLoop;
        this.bgMusic.volume = 1.0;
        this.bgMusic.play();
    };
    SoundManager.prototype.stopBgMusic = function () {
        this.bgMusic.stop();
    };
    SoundManager.prototype.playEffect = function (clip) {
        var as = this.audioEffect[this.curAudioEffect];
        as.clip = clip;
        as.loop = false;
        as.play();
        this.curAudioEffect++;
        if (this.curAudioEffect >= this.audioMax) {
            this.curAudioEffect = 0;
        }
    };
    SoundManager.prototype.playOneShotEffect = function (clip, volumeScale) {
        var as = this.audioEffect[this.curAudioEffect];
        as.clip = clip;
        as.loop = false;
        //as.playOneShot(clip,volumeScale)
        this.curAudioEffect++;
        if (this.curAudioEffect >= this.audioMax) {
            this.curAudioEffect = 0;
        }
    };
    SoundManager.prototype.setBgMusicMute = function (mute) {
        if (this.bgMusicMute == mute) {
            return;
        }
        var value = mute ? "1" : "0";
        localStorage.setItem(SoundManager.MUTE_TAG, value);
    };
    SoundManager.MUTE_TAG = "BGMUSIC_MUTE";
    SoundManager._instance = null;
    return SoundManager;
}(cc.Component));
exports.SoundManager = SoundManager;

cc._RF.pop();