"use strict";
cc._RF.push(module, '558c6y6xgBGhbWuAWp5T7Uy', 'GuiTowerBuilder');
// Scripts/Game/GuiTowerBuilder.ts

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
var GuiTowerBuilder = /** @class */ (function (_super) {
    __extends(GuiTowerBuilder, _super);
    function GuiTowerBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gui_builder = null;
        _this.gui_undo = null;
        _this.tower_builder = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    GuiTowerBuilder.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.gui_builder = this.getChildByUrl("gui_builder");
        this.gui_undo = this.getChildByUrl("gui_undo");
        this.node.active = false;
        this.tower_builder = null;
        this.buttonAddClickEvent("gui_builder/mask", this.close_gui_builder, this);
        this.buttonAddClickEvent("gui_undo/mask", this.close_gui_builder, this);
        this.buttonAddClickEvent("gui_builder/build_arrow_icon", this.on_build_tower_click, this);
        this.buttonAddClickEvent("gui_builder/build_fasi_icon", this.on_build_tower_click, this);
        this.buttonAddClickEvent("gui_builder/build_bing_icon", this.on_build_tower_click, this);
        this.buttonAddClickEvent("gui_builder/build_zd_icon", this.on_build_tower_click, this);
    };
    GuiTowerBuilder.prototype.show_tower_builder = function (tower_buidler) {
        this.tower_builder = tower_buidler;
        if (!this.tower_builder) {
            return;
        }
        this.node.active = true;
        this.gui_builder.active = true;
        this.gui_undo.active = false;
        this.node.x = tower_buidler.node.x;
        this.node.y = tower_buidler.node.y;
    };
    GuiTowerBuilder.prototype.show_tower_undo = function (tower_buidler) {
        this.tower_builder = tower_buidler;
        if (!this.tower_builder) {
            return;
        }
        this.node.active = true;
        this.gui_builder.active = false;
        this.gui_undo.active = true;
        this.node.x = tower_buidler.node.x;
        this.node.y = tower_buidler.node.y;
    };
    GuiTowerBuilder.prototype.on_build_tower_click = function (t) {
        //console.log("on_build_tower_click",t.name,this.tower_builder)
        if (!this.tower_builder) {
            return;
        }
        var tower_type = 0;
        if ("build_arrow_icon<Button>" == t.name) {
            tower_type = 1;
        }
        else if ("build_fasi_icon<Button>" == t.name) {
            tower_type = 2;
        }
        else if ("build_bing_icon<Button>" == t.name) {
            tower_type = 4;
        }
        else if ("build_zd_icon<Button>" == t.name) {
            tower_type = 3;
        }
        this.tower_builder.on_tower_build_click(t, tower_type);
        this.close_gui_builder();
    };
    GuiTowerBuilder.prototype.on_undo_tower_click = function () {
        if (!this.tower_builder) {
            return;
        }
        this.tower_builder.on_tower_undo_click();
        this.close_gui_builder();
    };
    GuiTowerBuilder.prototype.on_upgrade_tower_click = function () {
        if (!this.tower_builder) {
            return;
        }
        this.tower_builder.on_tower_upgrade_click();
        this.close_gui_builder();
    };
    GuiTowerBuilder.prototype.close_gui_builder = function () {
        this.node.active = false;
    };
    GuiTowerBuilder = __decorate([
        ccclass
    ], GuiTowerBuilder);
    return GuiTowerBuilder;
}(UIControl_1.UIControl));
exports.default = GuiTowerBuilder;

cc._RF.pop();