"use strict";
cc._RF.push(module, 'f637b3DXLRDK53KLSE+BcEi', 'LoopListDemo');
// Scripts/demo/LoopListDemo.ts

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
var LoopListDemo = /** @class */ (function (_super) {
    __extends(LoopListDemo, _super);
    function LoopListDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        return _this;
    }
    LoopListDemo.prototype.onLoad = function () {
        this.loadMainGUI("LoopList", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        this._list = this.getGUIChild("list").asList;
        this._list.setVirtualAndLoop();
        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 5;
        this._list.on(fgui.Event.SCROLL, this.doSpecialEffect, this);
        this.doSpecialEffect();
    };
    LoopListDemo.prototype.doSpecialEffect = function () {
        //change the scale according to the distance to the middle
        var midX = this._list.scrollPane.posX + this._list.viewWidth / 2;
        var cnt = this._list.numChildren;
        for (var i = 0; i < cnt; i++) {
            var obj = this._list.getChildAt(i);
            var dist = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width) //no intersection
                obj.setScale(1, 1);
            else {
                var ss = 1 + (1 - dist / obj.width) * 0.24;
                obj.setScale(ss, ss);
            }
        }
        this.getGUIChild("n3").text = "" + ((this._list.getFirstChildInView() + 1) % this._list.numItems);
    };
    LoopListDemo.prototype.renderListItem = function (index, item) {
        item.setPivot(0.5, 0.5);
        item.icon = fgui.UIPackage.getItemURL("LoopList", "n" + (index + 1));
    };
    LoopListDemo = __decorate([
        ccclass
    ], LoopListDemo);
    return LoopListDemo;
}(UIBase_1.default));
exports.default = LoopListDemo;

cc._RF.pop();