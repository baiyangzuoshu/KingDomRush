"use strict";
cc._RF.push(module, 'a0fdeeek1pJcaB7A/AlMrqC', 'UIManagerPro');
// FrameWork/manager/UIManagerPro.ts

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
exports.UIManagerPro = void 0;
var ResManagerPro_1 = require("./ResManagerPro");
var Panel = /** @class */ (function () {
    function Panel() {
        this.prefab = null;
        this.opening = false;
        this.open = false;
        this.closeTime = 0;
        this.self = null;
    }
    return Panel;
}());
/*
1.代码中构建ui，驱动游戏
2.ui身上挂载代码，驱动游戏
*/
var UIManagerPro = /** @class */ (function (_super) {
    __extends(UIManagerPro, _super);
    function UIManagerPro() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._canvas = null;
        _this._allShowPanel = {};
        _this._localZOrder = 1000;
        return _this;
    }
    UIManagerPro.getInstance = function () {
        return UIManagerPro._instance;
    };
    UIManagerPro.prototype.onLoad = function () {
        if (null == UIManagerPro._instance) {
            UIManagerPro._instance = this;
        }
        else {
            this.destroy();
        }
        this._canvas = cc.find("Canvas");
    };
    UIManagerPro.prototype.getPrefabByName = function (uiName) {
        var panel = this._allShowPanel[uiName];
        if (panel) {
            return panel.self;
        }
        return null;
    };
    UIManagerPro.prototype.createPrefab = function (uiName, bundleName) {
        if (bundleName === void 0) { bundleName = "UI"; }
        return __awaiter(this, void 0, Promise, function () {
            var prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", bundleName + "/" + uiName, cc.Prefab)];
                    case 1:
                        prefab = _a.sent();
                        if (!prefab) {
                            console.error("createPrefab error", uiName);
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, prefab];
                }
            });
        });
    };
    UIManagerPro.prototype.createOnlyPrefab = function (uiName, bundleName) {
        if (bundleName === void 0) { bundleName = "UI"; }
        return __awaiter(this, void 0, Promise, function () {
            var prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createPrefab(uiName, bundleName)];
                    case 1:
                        prefab = _a.sent();
                        return [2 /*return*/, prefab];
                }
            });
        });
    };
    UIManagerPro.prototype.showPrefab = function (uiName, bundleName) {
        if (bundleName === void 0) { bundleName = "UI"; }
        return __awaiter(this, void 0, Promise, function () {
            var prefab_1, panel, prefab, node, ts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._allShowPanel[uiName]) return [3 /*break*/, 2];
                        this._allShowPanel[uiName] = new Panel();
                        return [4 /*yield*/, this.createPrefab(uiName, bundleName)];
                    case 1:
                        prefab_1 = _a.sent();
                        this._allShowPanel[uiName].prefab = prefab_1;
                        _a.label = 2;
                    case 2:
                        panel = this._allShowPanel[uiName];
                        if (panel.open) {
                            return [2 /*return*/, null];
                        }
                        panel.opening = true;
                        panel.open = false;
                        panel.closeTime = 0;
                        prefab = panel.prefab;
                        node = cc.instantiate(prefab);
                        node.parent = this._canvas;
                        node.setSiblingIndex(this._localZOrder++);
                        panel.self = node;
                        ts = node.addComponent(prefab.data.name + "Control");
                        return [2 /*return*/, ts];
                }
            });
        });
    };
    UIManagerPro.prototype.closePrefab = function (uiName) {
        var panel = this._allShowPanel[uiName];
        if (!panel) {
            console.error("closePrefab !panel ", uiName);
            return -1;
        }
        if (!panel.open) {
            console.error("closePrefab !panel.open", uiName);
            return -2;
        }
        panel.open = false;
        panel.opening = false;
        panel.closeTime = 30;
        var node = panel.self;
        node.removeFromParent();
        this._localZOrder--;
        return 0;
    };
    UIManagerPro.prototype.showUI = function (uiName, parent) {
        return __awaiter(this, void 0, Promise, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ResManagerPro_1.ResManagerPro.Instance.IE_GetAsset("prefabs", "UI/" + uiName, cc.Prefab)];
                    case 1:
                        prefab = _a.sent();
                        if (!prefab) {
                            console.error("showUI error", uiName);
                            return [2 /*return*/];
                        }
                        parent = parent ? parent : this._canvas;
                        node = cc.instantiate(prefab);
                        node.parent = parent;
                        node.addComponent(prefab.data.name + "Control");
                        return [2 /*return*/, node];
                }
            });
        });
    };
    UIManagerPro.prototype.update = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, uiName, panel, prefab, ts;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in this._allShowPanel)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        uiName = _a[_i];
                        panel = this._allShowPanel[uiName];
                        if (!panel.opening) return [3 /*break*/, 2];
                        panel.open = true;
                        panel.opening = false;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!!panel.open) return [3 /*break*/, 5];
                        if (!(panel.closeTime > 0)) return [3 /*break*/, 3];
                        panel.closeTime -= dt;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.createPrefab(uiName)];
                    case 4:
                        prefab = _c.sent();
                        ts = panel.self.getComponent(prefab.data.name + "Control");
                        if (ts) {
                            ts.cleanUp();
                        }
                        delete this._allShowPanel[uiName];
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UIManagerPro._instance = null;
    return UIManagerPro;
}(cc.Component));
exports.UIManagerPro = UIManagerPro;

cc._RF.pop();