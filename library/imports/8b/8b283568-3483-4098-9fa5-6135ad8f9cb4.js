"use strict";
cc._RF.push(module, '8b283VoNINAmJ+lYTWtj5y0', 'ListEffectDemo');
// Scripts/demo/ListEffectDemo.ts

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
var ListEffectDemo = /** @class */ (function (_super) {
    __extends(ListEffectDemo, _super);
    function ListEffectDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        return _this;
    }
    ListEffectDemo.prototype.onLoad = function () {
        this.loadMainGUI("ListEffect", "Main");
        this.setGUISize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        fgui.UIObjectFactory.setExtension("ui://ListEffect/mailItem", MailItem_1.default);
        this._list = this.getGUIChild("mailList").asList;
        for (var i = 0; i < 10; i++) {
            var item = this._list.addItemFromPool();
            item.setFetched(i % 3 == 0);
            item.setRead(i % 2 == 0);
            item.setTime("5 Nov 2015 16:24:33");
            item.title = "Mail title here";
        }
        this._list.ensureBoundsCorrect();
        var delay = 0;
        for (var i = 0; i < 10; i++) {
            var item = this._list.getChildAt(i);
            if (this._list.isChildInView(item)) {
                item.playEffect(delay);
                delay += 0.2;
            }
            else
                break;
        }
    };
    ListEffectDemo = __decorate([
        ccclass
    ], ListEffectDemo);
    return ListEffectDemo;
}(UIBase_1.default));
exports.default = ListEffectDemo;

cc._RF.pop();