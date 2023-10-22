"use strict";
cc._RF.push(module, 'd9100j9dLdF66G5UP9WZSQL', 'ScrollPaneHeader');
// Scripts/demo/ScrollPaneHeader.ts

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
var ScrollPaneHeader = /** @class */ (function (_super) {
    __extends(ScrollPaneHeader, _super);
    function ScrollPaneHeader() {
        var _this = _super.call(this) || this;
        _this._c1 = null;
        return _this;
    }
    ScrollPaneHeader.prototype.onConstruct = function () {
        this._c1 = this.getController("c1");
        this.on(fgui.Event.SIZE_CHANGED, this.onSizeChanged, this);
    };
    ScrollPaneHeader.prototype.onSizeChanged = function () {
        if (this._c1.selectedIndex == 2 || this._c1.selectedIndex == 3)
            return;
        if (this.height > this.sourceHeight)
            this._c1.selectedIndex = 1;
        else
            this._c1.selectedIndex = 0;
    };
    Object.defineProperty(ScrollPaneHeader.prototype, "readyToRefresh", {
        get: function () {
            return this._c1.selectedIndex == 1;
        },
        enumerable: false,
        configurable: true
    });
    ScrollPaneHeader.prototype.setRefreshStatus = function (value) {
        this._c1.selectedIndex = value;
    };
    return ScrollPaneHeader;
}(fgui.GComponent));
exports.default = ScrollPaneHeader;

cc._RF.pop();