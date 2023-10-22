"use strict";
cc._RF.push(module, 'f8364yVFG5Omr8IDuyJIVCX', 'ResManagerPro');
// FrameWork/manager/ResManagerPro.ts

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
exports.ResManagerPro = void 0;
var ResManagerPro = /** @class */ (function (_super) {
    __extends(ResManagerPro, _super);
    function ResManagerPro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResManagerPro.prototype.onLoad = function () {
        if (ResManagerPro.Instance !== null) {
            this.destroy();
            return;
        }
        ResManagerPro.Instance = this;
    };
    ResManagerPro.prototype.IE_LoadBundle = function (bundleName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.assetManager.loadBundle(bundleName, function (err, bundleData) {
                            if (err) {
                                console.log(err);
                                reject(null);
                                return;
                            }
                            else {
                                resolve(bundleData);
                                return;
                            }
                        });
                    })];
            });
        });
    };
    ResManagerPro.prototype.Init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bundle, textData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 测试代码
                        cc.assetManager.loadBundle("Scenes", function (err, bundle) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(bundle);
                            var infos = bundle.getDirWithPath("", cc.SceneAsset);
                            console.log(infos);
                        });
                        return [4 /*yield*/, this.IE_LoadBundle("Sounds")];
                    case 1:
                        bundle = _a.sent();
                        console.log(bundle);
                        return [4 /*yield*/, this.IE_GetAsset("data", "map", cc.TextAsset)];
                    case 2:
                        textData = _a.sent();
                        console.log(textData.text);
                        return [2 /*return*/];
                }
            });
        });
    };
    ResManagerPro.prototype.IE_LoadAllAssetsInBundle = function (bundle, assetType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        bundle.loadDir("", assetType, function (err, infos) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            else {
                                resolve(infos);
                            }
                        });
                    })];
            });
        });
    };
    ResManagerPro.prototype.IE_LoadAssetInBundle = function (bundle, assetName, assetType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        bundle.load(assetName, assetType, function (err, assetData) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            else {
                                resolve(assetData);
                            }
                        });
                    })];
            });
        });
    };
    ResManagerPro.prototype.IE_LoadSceneInBundle = function (bundle, sceneName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        bundle.loadScene(sceneName, function (err, sceneData) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            else {
                                resolve(sceneData);
                                return;
                            }
                        });
                    })];
            });
        });
    };
    ResManagerPro.prototype.IE_LoadBundleAndAllAssets = function (bundleName, assetType) {
        return __awaiter(this, void 0, void 0, function () {
            var bundle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.IE_LoadBundle(bundleName)];
                    case 1:
                        bundle = _a.sent();
                        if (bundle === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.IE_LoadAllAssetsInBundle(bundle, assetType)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResManagerPro.prototype.IE_GetScene = function (bundleName, scenePath) {
        return __awaiter(this, void 0, void 0, function () {
            var bundle, sceneData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bundle = cc.assetManager.getBundle(bundleName);
                        if (!(bundle === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.IE_LoadBundle(bundleName)];
                    case 1:
                        bundle = (_a.sent());
                        if (bundle === null) {
                            // console.log("bundle load err: " + bundleName);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.IE_LoadSceneInBundle(bundle, scenePath)];
                    case 3:
                        sceneData = _a.sent();
                        return [2 /*return*/, sceneData];
                }
            });
        });
    };
    ResManagerPro.prototype.IE_GetAsset = function (bundleName, assetPath, assetType) {
        return __awaiter(this, void 0, void 0, function () {
            var bundle, assetData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bundle = cc.assetManager.getBundle(bundleName);
                        if (!(bundle === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.IE_LoadBundle(bundleName)];
                    case 1:
                        bundle = (_a.sent());
                        if (bundle === null) {
                            // console.log("bundle load err: " + bundleName);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        assetData = bundle.get(assetPath, assetType);
                        if (assetData) {
                            return [2 /*return*/, assetData]; // 修改了没有返回资源的bug
                        }
                        return [4 /*yield*/, this.IE_LoadAssetInBundle(bundle, assetPath, assetType)];
                    case 3:
                        assetData = (_a.sent());
                        return [2 /*return*/, assetData];
                }
            });
        });
    };
    ResManagerPro.prototype.ReleaseAsset = function (assetData) {
        cc.assetManager.releaseAsset(assetData);
    };
    ResManagerPro.prototype.ReleaseAllAssetInBundle = function (bundleName) {
        var bundle = cc.assetManager.getBundle("bundleName");
        if (bundle === null) {
            return;
        }
        bundle.releaseAll();
        cc.assetManager.removeBundle(bundle);
    };
    ResManagerPro.Instance = null;
    return ResManagerPro;
}(cc.Component));
exports.ResManagerPro = ResManagerPro;

cc._RF.pop();