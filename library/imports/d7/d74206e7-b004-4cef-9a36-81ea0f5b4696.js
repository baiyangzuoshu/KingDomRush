"use strict";
cc._RF.push(module, 'd7420bnsARM75o2geoPW0aW', 'ScrollPaneDemo');
// Scripts/demo/ScrollPaneDemo.ts

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
var UIBase_1 = require("../../FrameWork/ui/UIBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollPaneDemo = /** @class */ (function (_super) {
    __extends(ScrollPaneDemo, _super);
    function ScrollPaneDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        return _this;
    }
    ScrollPaneDemo.prototype.onLoad = function () {
        this.loadMainGUI("ScrollPane", "Main");
        this.guiMakeFullScreen();
        this._list = this.getGUIChild("list").asList;
        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.setVirtual();
        this._list.numItems = 1000;
        this._list.on(fgui.Event.TOUCH_BEGIN, this.onClickList, this);
    };
    ScrollPaneDemo.prototype.renderListItem = function (index, item) {
        item.title = "Item " + index;
        item.scrollPane.posX = 0; //reset scroll pos
        item.getChild("b0").onClick(this.onClickStick, this);
        item.getChild("b1").onClick(this.onClickDelete, this);
    };
    ScrollPaneDemo.prototype.onClickList = function (evt) {
        //点击列表时，查找是否有项目处于编辑状态， 如果有就归位
        var cnt = this._list.numChildren;
        for (var i = 0; i < cnt; i++) {
            var item = this._list.getChildAt(i).asButton;
            if (item.scrollPane.posX != 0) {
                //Check if clicked on the button
                if (item.getChild("b0").asButton.isAncestorOf(fgui.GRoot.inst.touchTarget)
                    || item.getChild("b1").asButton.isAncestorOf(fgui.GRoot.inst.touchTarget)) {
                    return;
                }
                item.scrollPane.setPosX(0, true);
                //取消滚动面板可能发生的拉动。
                item.scrollPane.cancelDragging();
                this._list.scrollPane.cancelDragging();
                break;
            }
        }
    };
    ScrollPaneDemo.prototype.onClickStick = function (evt) {
        this.getGUIChild("txt").text = "Stick " + evt.initiator.parent.text;
    };
    ScrollPaneDemo.prototype.onClickDelete = function (evt) {
        this.getGUIChild("txt").text = "Delete " + evt.initiator.parent.text;
    };
    ScrollPaneDemo = __decorate([
        ccclass
    ], ScrollPaneDemo);
    return ScrollPaneDemo;
}(UIBase_1.default));
exports.default = ScrollPaneDemo;

cc._RF.pop();