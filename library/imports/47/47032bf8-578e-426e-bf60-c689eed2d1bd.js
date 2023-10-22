"use strict";
cc._RF.push(module, '47032v4V45Cbr9gxonu0tG9', 'PullToRefreshDemo');
// Scripts/demo/PullToRefreshDemo.ts

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
var ScrollPaneHeader_1 = require("./ScrollPaneHeader");
var PullToRefreshDemo = /** @class */ (function (_super) {
    __extends(PullToRefreshDemo, _super);
    function PullToRefreshDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list1 = null;
        _this._list2 = null;
        return _this;
    }
    PullToRefreshDemo.prototype.onLoad = function () {
        fgui.UIObjectFactory.setExtension("ui://PullToRefresh/Header", ScrollPaneHeader_1.default);
        this.loadMainGUI("PullToRefresh", "Main");
        this.guiMakeFullScreen();
        this._list1 = this.getGUIChild("list1").asList;
        this._list1.itemRenderer = this.renderListItem1.bind(this);
        this._list1.setVirtual();
        this._list1.numItems = 1;
        this._list1.on(fgui.Event.PULL_DOWN_RELEASE, this.onPullDownToRefresh, this);
        this._list2 = this.getGUIChild("list2").asList;
        this._list2.itemRenderer = this.renderListItem2.bind(this);
        this._list2.setVirtual();
        this._list2.numItems = 1;
        this._list2.on(fgui.Event.PULL_UP_RELEASE, this.onPullUpToRefresh, this);
    };
    PullToRefreshDemo.prototype.renderListItem1 = function (index, item) {
        item.text = "Item " + (this._list1.numItems - index - 1);
    };
    PullToRefreshDemo.prototype.renderListItem2 = function (index, item) {
        item.text = "Item " + index;
    };
    PullToRefreshDemo.prototype.onPullDownToRefresh = function () {
        var header = (this._list1.scrollPane.header);
        if (header.readyToRefresh) {
            header.setRefreshStatus(2);
            this._list1.scrollPane.lockHeader(header.sourceHeight);
            //Simulate a async resquest
            this.scheduleOnce(this.simulateAsynWorkFinished, 2);
        }
    };
    PullToRefreshDemo.prototype.onPullUpToRefresh = function () {
        var footer = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 1;
        this._list2.scrollPane.lockFooter(footer.sourceHeight);
        //Simulate a async resquest
        this.scheduleOnce(this.simulateAsynWorkFinished2, 2);
    };
    PullToRefreshDemo.prototype.simulateAsynWorkFinished = function () {
        this._list1.numItems += 5;
        //Refresh completed
        var header = (this._list1.scrollPane.header);
        header.setRefreshStatus(3);
        this._list1.scrollPane.lockHeader(35);
        this.scheduleOnce(this.simulateHintFinished, 2);
    };
    PullToRefreshDemo.prototype.simulateHintFinished = function () {
        var header = (this._list1.scrollPane.header);
        header.setRefreshStatus(0);
        this._list1.scrollPane.lockHeader(0);
    };
    PullToRefreshDemo.prototype.simulateAsynWorkFinished2 = function () {
        this._list2.numItems += 5;
        //Refresh completed
        var footer = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 0;
        this._list2.scrollPane.lockFooter(0);
    };
    PullToRefreshDemo = __decorate([
        ccclass
    ], PullToRefreshDemo);
    return PullToRefreshDemo;
}(UIBase_1.default));
exports.default = PullToRefreshDemo;

cc._RF.pop();