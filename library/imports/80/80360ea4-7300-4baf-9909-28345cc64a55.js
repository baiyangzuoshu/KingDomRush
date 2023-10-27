"use strict";
cc._RF.push(module, '803606kcwBLr5kJKDRcxkpV', 'Checkout');
// Scripts/Game/Checkout.ts

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
var GameDataManager_1 = require("../Data/GameDataManager");
var Utils_1 = require("../Tools/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Checkout = /** @class */ (function (_super) {
    __extends(Checkout, _super);
    function Checkout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failed_root = null;
        _this.passed_root = null;
        _this.tip = null;
        _this.star1 = null;
        _this.star2 = null;
        _this.star3 = null;
        _this.game_tips = [];
        return _this;
    }
    // LIFE-CYC LE CALLBACKS:
    Checkout.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.failed_root = this.getChildByUrl("failed_root");
        this.passed_root = this.getChildByUrl("passed_root");
        this.tip = this.getChildByUrl("failed_root/tip").getComponent(cc.Label);
        this.star1 = this.getChildByUrl("passed_root/star1");
        this.star2 = this.getChildByUrl("passed_root/star2");
        this.star3 = this.getChildByUrl("passed_root/star3");
    };
    Checkout.prototype.show_failed = function () {
        this.node.active = true;
        if (this.game_tips.length > 0) {
            var index = Utils_1.default.random_int(0, this.game_tips.length - 1);
            this.tip.string = this.game_tips[index];
        }
        this.failed_root.active = true;
        this.passed_root.active = false;
    };
    Checkout.prototype.show_passed = function (total, last) {
        this.node.active = true;
        this.failed_root.active = false;
        this.passed_root.active = true;
        var score = 1;
        this.star1.active = true;
        // 评价得分
        if (last > 2 * total / 3) {
            score = 3;
            this.star2.active = true;
            this.star3.active = true;
        }
        else if (last > total / 3) {
            score = 2;
            this.star2.active = true;
            this.star3.active = false;
        }
        else {
            this.star2.active = false;
            this.star3.active = false;
        }
        var cur_user = GameDataManager_1.default.getInstance().get_cur_user();
        var cur_level = GameDataManager_1.default.getInstance().get_cur_level();
        if (score > cur_user.level_info[cur_level]) {
            var add_value = score - cur_user.level_info[cur_level];
            cur_user.level_info[cur_level] = score;
            cur_user.star_num += add_value;
            GameDataManager_1.default.getInstance().sync_user_data();
        }
    };
    Checkout = __decorate([
        ccclass
    ], Checkout);
    return Checkout;
}(UIControl_1.UIControl));
exports.default = Checkout;

cc._RF.pop();