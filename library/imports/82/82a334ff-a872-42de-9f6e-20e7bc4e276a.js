"use strict";
cc._RF.push(module, '82a33T/qHJC3p9uIOe8Tidq', 'VirtualListDemo');
// Scripts/demo/VirtualListDemo.ts

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
var MailItem_1 = require("./MailItem");
var VirtualListDemo = /** @class */ (function (_super) {
    __extends(VirtualListDemo, _super);
    function VirtualListDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        return _this;
    }
    VirtualListDemo.prototype.onLoad = function () {
        var _this = this;
        this.loadMainGUI("VirtualList", "Main");
        this.guiMakeFullScreen();
        fgui.UIObjectFactory.setExtension("ui://VirtualList/mailItem", MailItem_1.default);
        this.getGUIChild("n6").onClick(function () { _this._list.addSelection(500, true); });
        this.getGUIChild("n7").onClick(function () { _this._list.scrollPane.scrollTop(); });
        this.getGUIChild("n8").onClick(function () { _this._list.scrollPane.scrollBottom(); });
        this._list = this.getGUIChild("mailList").asList;
        this._list.setVirtual();
        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 1000;
    };
    VirtualListDemo.prototype.renderListItem = function (index, item) {
        item.setFetched(index % 3 == 0);
        item.setRead(index % 2 == 0);
        item.setTime("5 Nov 2015 16:24:33");
        item.title = index + " Mail title here";
    };
    VirtualListDemo = __decorate([
        ccclass
    ], VirtualListDemo);
    return VirtualListDemo;
}(UIBase_1.default));
exports.default = VirtualListDemo;

cc._RF.pop();