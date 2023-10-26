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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResManagerPro_1 = require("../FrameWork/manager/ResManagerPro");
var UIManagerPro_1 = require("../FrameWork/manager/UIManagerPro");
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
    GameApp.getInstance = function () {
        return GameApp_1._instance;
    };
    GameApp.prototype.enterGame = function () {
        UIManagerPro_1.UIManagerPro.getInstance().showPrefab("HomeUI");
    };
    GameApp.prototype.startGame = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //加载资源
                        this.progressBar.progress = 0.1;
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_LoadBundleAndAllAssets("prefabs", cc.Prefab)];
                    case 1:
                        _a.sent();
                        this.progressBar.progress = 0.5;
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_LoadBundleAndAllAssets("Sounds", cc.AudioClip)];
                    case 2:
                        _a.sent();
                        this.progressBar.progress = 0.8;
                        return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_LoadBundleAndAllAssets("textures", cc.SpriteFrame)];
                    case 3:
                        _a.sent();
                        this.progressBar.progress = 1;
                        this.enterGame();
                        return [2 /*return*/];
                }
            });
        });
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