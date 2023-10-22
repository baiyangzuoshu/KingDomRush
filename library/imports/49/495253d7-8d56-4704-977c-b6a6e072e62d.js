"use strict";
cc._RF.push(module, '49525PXjVZHBJd8tqbgcuYt', 'JoystickModule');
// Scripts/demo/JoystickModule.ts

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
var JoystickModule = /** @class */ (function (_super) {
    __extends(JoystickModule, _super);
    function JoystickModule(mainView) {
        var _this = _super.call(this) || this;
        _this._startStageX = 0;
        _this._startStageY = 0;
        _this._lastStageX = 0;
        _this._lastStageY = 0;
        _this._tweener = null;
        _this._button = mainView.getChild("joystick").asButton;
        _this._button.changeStateOnClick = false;
        _this._thumb = _this._button.getChild("thumb");
        _this._touchArea = mainView.getChild("joystick_touch");
        _this._center = mainView.getChild("joystick_center");
        _this._InitX = _this._center.x + _this._center.width / 2;
        _this._InitY = _this._center.y + _this._center.height / 2;
        _this._touchId = -1;
        _this.radius = 150;
        _this._curPos = new cc.Vec2();
        _this._touchArea.on(fgui.Event.TOUCH_BEGIN, _this.onTouchDown, _this);
        _this._touchArea.on(fgui.Event.TOUCH_MOVE, _this.onTouchMove, _this);
        _this._touchArea.on(fgui.Event.TOUCH_END, _this.onTouchEnd, _this);
        return _this;
    }
    JoystickModule.prototype.trigger = function (evt) {
        this.onTouchDown(evt);
    };
    JoystickModule.prototype.onTouchDown = function (evt) {
        if (this._touchId == -1) { //First touch
            this._touchId = evt.touchId;
            if (this._tweener) {
                this._tweener.kill();
                this._tweener = null;
            }
            fgui.GRoot.inst.globalToLocal(evt.pos.x, evt.pos.y, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            this._button.selected = true;
            if (bx < 0)
                bx = 0;
            else if (bx > this._touchArea.width)
                bx = this._touchArea.width;
            if (by > fgui.GRoot.inst.height)
                by = fgui.GRoot.inst.height;
            else if (by < this._touchArea.y)
                by = this._touchArea.y;
            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;
            this._center.visible = true;
            this._center.x = bx - this._center.width / 2;
            this._center.y = by - this._center.height / 2;
            this._button.x = bx - this._button.width / 2;
            this._button.y = by - this._button.height / 2;
            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this._thumb.rotation = degrees + 90;
            evt.captureTouch();
        }
    };
    JoystickModule.prototype.onTouchMove = function (evt) {
        if (this._touchId != -1 && evt.touchId == this._touchId) {
            var bx = evt.pos.x;
            var by = evt.pos.y;
            var moveX = bx - this._lastStageX;
            var moveY = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX = this._button.x + moveX;
            var buttonY = this._button.y + moveY;
            var offsetX = buttonX + this._button.width / 2 - this._startStageX;
            var offsetY = buttonY + this._button.height / 2 - this._startStageY;
            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;
            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;
            buttonX = this._startStageX + offsetX;
            buttonY = this._startStageY + offsetY;
            if (buttonX < 0)
                buttonX = 0;
            if (buttonY > fgui.GRoot.inst.height)
                buttonY = fgui.GRoot.inst.height;
            this._button.x = buttonX - this._button.width / 2;
            this._button.y = buttonY - this._button.height / 2;
            this.emit(JoystickModule.JoystickMoving, degree);
        }
    };
    JoystickModule.prototype.onTouchEnd = function (evt) {
        if (this._touchId != -1 && evt.touchId == this._touchId) {
            this._touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            this._tweener = fgui.GTween.to2(this._button.x, this._button.y, this._InitX - this._button.width / 2, this._InitY - this._button.height / 2, 0.3)
                .setTarget(this._button, this._button.setPosition)
                .setEase(fgui.EaseType.CircOut)
                .onComplete(this.onTweenComplete, this);
            this.emit(JoystickModule.JoystickUp);
        }
    };
    JoystickModule.prototype.onTweenComplete = function () {
        this._tweener = null;
        this._button.selected = false;
        this._thumb.rotation = 0;
        this._center.visible = true;
        this._center.x = this._InitX - this._center.width / 2;
        this._center.y = this._InitY - this._center.height / 2;
    };
    JoystickModule.JoystickMoving = "JoystickMoving";
    JoystickModule.JoystickUp = "JoystickUp";
    return JoystickModule;
}(cc.EventTarget));
exports.default = JoystickModule;

cc._RF.pop();