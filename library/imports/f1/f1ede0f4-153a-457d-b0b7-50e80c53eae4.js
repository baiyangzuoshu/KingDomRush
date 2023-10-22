"use strict";
cc._RF.push(module, 'f1edeD0FTpFfbC3UOgMU+rk', 'MailItem');
// Scripts/demo/MailItem.ts

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
var MailItem = /** @class */ (function (_super) {
    __extends(MailItem, _super);
    function MailItem() {
        var _this = _super.call(this) || this;
        _this._timeText = null;
        _this._readController = null;
        _this._fetchController = null;
        _this._trans = null;
        return _this;
    }
    MailItem.prototype.onConstruct = function () {
        this._timeText = this.getChild("timeText").asTextField;
        this._readController = this.getController("IsRead");
        this._fetchController = this.getController("c1");
        this._trans = this.getTransition("t0");
    };
    MailItem.prototype.setTime = function (value) {
        this._timeText.text = value;
    };
    MailItem.prototype.setRead = function (value) {
        this._readController.selectedIndex = value ? 1 : 0;
    };
    MailItem.prototype.setFetched = function (value) {
        this._fetchController.selectedIndex = value ? 1 : 0;
    };
    MailItem.prototype.playEffect = function (delay) {
        this.visible = false;
        this._trans.play(null, 1, delay);
    };
    return MailItem;
}(fgui.GButton));
exports.default = MailItem;

cc._RF.pop();