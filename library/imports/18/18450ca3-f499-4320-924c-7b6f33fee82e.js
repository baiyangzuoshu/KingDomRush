"use strict";
cc._RF.push(module, '18450yj9JlDIJJMe28z/ugu', 'UIControl');
// FrameWork/ui/UIControl.ts

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
exports.UIControl = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIControl = /** @class */ (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = {};
        return _this;
    }
    UIControl.prototype.onLoad = function () {
        this.traverseAllChildren(this.node, "");
    };
    UIControl.prototype.start = function () {
    };
    UIControl.prototype.cleanUp = function () {
    };
    UIControl.prototype.traverseAllChildren = function (node, url) {
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            var name = child.name;
            this.view[url + name] = child;
            this.traverseAllChildren(child, url + name + "/");
        }
    };
    UIControl.prototype.getChildByUrl = function (url) {
        return this.view[url];
    };
    UIControl.prototype.buttonAddClickEvent = function (url, func, target) {
        var node = this.getChildByUrl(url);
        if (!node) {
            console.error("buttonAddClickEvent url=", url);
            return;
        }
        var btn = node.getComponent(cc.Button);
        if (!btn) {
            console.error("buttonAddClickEvent btn", url);
            return;
        }
        node.on("click", func, target);
    };
    UIControl = __decorate([
        ccclass
    ], UIControl);
    return UIControl;
}(cc.Component));
exports.UIControl = UIControl;

cc._RF.pop();