"use strict";
cc._RF.push(module, '942dem2/zlDXZpTRzxJ6pdP', 'frame_animation');
// FrameWork/Utils/frame_animation.ts

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
exports.frame_animation = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var frame_animation = /** @class */ (function (_super) {
    __extends(frame_animation, _super);
    function frame_animation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 0.1; // 帧的时间间隔
        _this.loop = false; // 是否循环播放
        _this.play_onload = false; // 是否在组件加载的时候播放;
        _this.sprite = null;
        _this.is_playing = false;
        _this.play_time = 0;
        _this.is_loop = false;
        _this.end_func = null;
        return _this;
    }
    // use this for initialization
    frame_animation.prototype.onLoad = function () {
        // 判断一下在组件所挂在的节点上面有没有cc.Sprite组件；
        var s_com = this.node.getComponent(cc.Sprite);
        if (!s_com) { // 没有cc.Sprite组件，要显示图片一定要有cc.Sprite组件,所以我们添加一个cc.Sprite组件;
            s_com = this.node.addComponent(cc.Sprite);
        }
        this.sprite = s_com; // 精灵组件
        // end 
    };
    frame_animation.prototype.init = function () {
        this.is_playing = false; // 是否正在播放;
        this.play_time = 0;
        this.is_loop = false;
        this.end_func = null;
        // 显示第0个frame;
        this.sprite.spriteFrame = this.sprite_frames[0];
        if (this.play_onload) {
            if (!this.loop) {
                this.play_once(null);
            }
            else {
                this.play_loop();
            }
        }
    };
    // 实现播放一次,
    frame_animation.prototype.play_once = function (end_func) {
        this.play_time = 0;
        this.is_playing = true;
        this.is_loop = false;
        this.end_func = end_func;
    };
    // end 
    // 实现循环播放
    frame_animation.prototype.play_loop = function () {
        this.play_time = 0;
        this.is_playing = true;
        this.is_loop = true;
    };
    // end 
    frame_animation.prototype.stop_anim = function () {
        this.play_time = 0;
        this.is_playing = false;
        this.is_loop = false;
    };
    // called every frame, uncomment this function to activate update callback
    // 每一次刷新的时候需要调用的函数，dt距离上一次刷新过去的时间;
    frame_animation.prototype.update = function (dt) {
        if (this.is_playing === false) { // 没有启动播放，不做处理
            return;
        }
        this.play_time += dt; // 累积我们播放的时间;
        // 计算时间，应当播放第几帧，而不是随便的下一帧，
        // 否则的话，同样的动画1, 60帧，你在30FPS的机器上你会播放2秒，
        // 你在60FPS的机器上你会播放1秒，动画就不同步;
        var index = Math.floor(this.play_time / this.duration); // 向下取整数
        // index
        if (this.is_loop === false) { // 播放一次
            if (index >= this.sprite_frames.length) { // 非循环播放结束
                // 精灵显示的是最后一帧;
                this.sprite.spriteFrame = this.sprite_frames[this.sprite_frames.length - 1];
                // end 
                this.is_playing = false;
                this.play_time = 0;
                if (this.end_func) { // 调用回掉函数
                    this.end_func();
                }
                return;
            }
            else {
                this.sprite.spriteFrame = this.sprite_frames[index];
            }
        }
        else { // 循环播放;
            while (index >= this.sprite_frames.length) {
                index -= this.sprite_frames.length;
                this.play_time -= (this.duration * this.sprite_frames.length);
            }
            //  在合法的范围之内
            this.sprite.spriteFrame = this.sprite_frames[index];
            // end 
        }
    };
    frame_animation = __decorate([
        ccclass
    ], frame_animation);
    return frame_animation;
}(cc.Component));
exports.frame_animation = frame_animation;

cc._RF.pop();