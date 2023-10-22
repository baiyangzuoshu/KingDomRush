"use strict";
cc._RF.push(module, '62a39ciiPdONZqk/t0zo8PH', 'GameApp');
// Scripts/GameApp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameApp = /** @class */ (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvas = null;
        _this.progressBar = null;
        return _this;
        // update (dt) {}
    }
    GameApp_1 = GameApp;
    // LIFE-CYCLE CALLBACKS:
    GameApp.getInstance = function () {
        return GameApp_1._instance;
    };
    GameApp.prototype.enterGame = function () {
    };
    GameApp.prototype.startGame = function () {
        //加载资源
    };
    GameApp.prototype.onLoad = function () {
        if (null === GameApp_1._instance) {
            GameApp_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        this.canvas = cc.find("Canvas");
        this.progressBar = this.canvas.getChildByName("myProgressBar").getComponent(cc.ProgressBar);
        this.progressBar.progress = 0;
    };
    GameApp.prototype.start = function () {
    };
    var GameApp_1;
    GameApp._instance = null;
    GameApp = GameApp_1 = __decorate([
        ccclass
    ], GameApp);
    return GameApp;
}(cc.Component));
exports.default = GameApp;

cc._RF.pop();