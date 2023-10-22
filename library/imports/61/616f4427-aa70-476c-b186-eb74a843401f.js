"use strict";
cc._RF.push(module, '616f4QnqnBHbLGG63SoQ0Af', 'GuideDemo');
// Scripts/demo/GuideDemo.ts

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
var GuideDemo = /** @class */ (function (_super) {
    __extends(GuideDemo, _super);
    function GuideDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._guideLayer = null;
        return _this;
    }
    GuideDemo.prototype.onLoad = function () {
        var _this = this;
        this.loadMainGUI("Guide", "Main");
        this.guiMakeFullScreen();
        this._guideLayer = this.createGUIObject("GuideLayer").asCom;
        this._guideLayer.makeFullScreen();
        this._guideLayer.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
        var bagBtn = this.getGUIChild("bagBtn");
        bagBtn.onClick(function () {
            _this._guideLayer.removeFromParent();
        }, this);
        this.getGUIChild("n2").onClick(function () {
            fgui.GRoot.inst.addChild(_this._guideLayer);
            var rect = bagBtn.localToGlobalRect(0, 0, bagBtn.width, bagBtn.height);
            rect = _this._guideLayer.globalToLocalRect(rect.x, rect.y, rect.width, rect.height);
            var window = _this._guideLayer.getChild("window");
            window.setSize(rect.width, rect.height);
            fgui.GTween.to2(window.x, window.y, rect.x, rect.y, 0.5).setTarget(window, window.setPosition);
        }, this);
    };
    GuideDemo = __decorate([
        ccclass
    ], GuideDemo);
    return GuideDemo;
}(UIBase_1.default));
exports.default = GuideDemo;

cc._RF.pop();