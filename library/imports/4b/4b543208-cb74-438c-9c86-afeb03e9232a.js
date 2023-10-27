"use strict";
cc._RF.push(module, '4b543IIy3RDjJyGr+sD6SMq', 'LevelEntryInfo');
// Scripts/Tools/LevelEntryInfo.ts

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
var UIControl_1 = require("../../FrameWork/ui/UIControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelEntryInfo = /** @class */ (function (_super) {
    __extends(LevelEntryInfo, _super);
    function LevelEntryInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.star_set = [];
        _this.star_num = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    LevelEntryInfo.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.star_set[0] = this.getChildByUrl("star1/star");
        this.star_set[1] = this.getChildByUrl("star2/star");
        this.star_set[2] = this.getChildByUrl("star3/star");
    };
    LevelEntryInfo.prototype.setData = function (star_num) {
        this.star_num = star_num;
        this.show_level_star_info(this.star_num);
    };
    // 显示我们当前关卡的成绩，几颗星
    LevelEntryInfo.prototype.show_level_star_info = function (star_num) {
        if (star_num < 0 || star_num > 3) {
            return;
        }
        var i;
        for (i = 0; i < star_num; i++) {
            this.star_set[i].active = true;
        }
        for (; i < 3; i++) {
            this.star_set[i].active = false;
        }
    };
    LevelEntryInfo = __decorate([
        ccclass
    ], LevelEntryInfo);
    return LevelEntryInfo;
}(UIControl_1.UIControl));
exports.default = LevelEntryInfo;

cc._RF.pop();