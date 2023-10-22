"use strict";
cc._RF.push(module, '268b1/xCVRAWKsVB5pyQxxF', 'CityControl');
// Scripts/UI/CityControl.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
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
var EventManager_1 = require("../../FrameWork/manager/EventManager");
var UIManager_1 = require("../../FrameWork/manager/UIManager");
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var Enum_1 = require("../Enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CityControl = /** @class */ (function (_super) {
    __extends(CityControl, _super);
    function CityControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this._map = null;
        return _this;
        // update (dt) {}
    }
    CityControl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._map = this.getChildByUrl("map");
        EventManager_1.EventManager.getInstance().addEventListener(Enum_1.default.EventName.TouchStart, this.touchStart, this);
        EventManager_1.EventManager.getInstance().addEventListener(Enum_1.default.EventName.TouchMoved, this.touchMoved, this);
        EventManager_1.EventManager.getInstance().addEventListener(Enum_1.default.EventName.TouchEnded, this.touchEnded, this);
        EventManager_1.EventManager.getInstance().addEventListener(Enum_1.default.EventName.TouchCancel, this.touchCancel, this);
        this.buttonAddClickEvent("map/build/ID_420", this.clickBtnEvent, this);
    };
    CityControl.prototype.clickBtnEvent = function () {
        var UINode = UIManager_1.UIManager.getInstance().showUI("buildBtn1", this._map);
        if (UINode) {
            var id420 = this.getChildByUrl("map/build/ID_420");
            var worldPos = id420.convertToWorldSpaceAR(cc.v2(0, -90));
            var nodePos = this._map.convertToNodeSpaceAR(worldPos);
            UINode.x = nodePos.x;
            UINode.y = nodePos.y;
        }
    };
    CityControl.prototype.touchStart = function (_, e) {
        //console.log("touchStart")
    };
    CityControl.prototype.touchMoved = function (_, e) {
        //console.log("touchMoved",e)
        var p = e.getDelta();
        this._map.x += p.x;
        this._map.y += p.y;
        var _width = 59;
        if (this._map.y <= (-464 + 30)) {
            this._map.y = (-464 + 30);
        }
        if (this._map.y >= (560 - 225)) {
            this._map.y = (560 - 225);
        }
        if (this._map.x <= -1024 + 720 / 2 + _width) {
            this._map.x = -1024 + 720 / 2 + _width;
        }
        if (this._map.x >= 985 - 720 / 2 + _width) {
            this._map.x = 985 - 720 / 2 + _width;
        }
    };
    CityControl.prototype.touchEnded = function (_, e) {
        UIManager_1.UIManager.getInstance().closePrefab("buildBtn1");
        //console.log("touchEnded")
    };
    CityControl.prototype.touchCancel = function (_, e) {
        //console.log("touchCancel")
    };
    CityControl.prototype.start = function () {
    };
    CityControl = __decorate([
        ccclass
    ], CityControl);
    return CityControl;
}(UIControl_1.UIControl));
exports.default = CityControl;

cc._RF.pop();