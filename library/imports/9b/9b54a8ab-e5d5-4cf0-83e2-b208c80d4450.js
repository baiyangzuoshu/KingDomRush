"use strict";
cc._RF.push(module, '9b54air5dVM8IPisgjIDURQ', 'ResManager');
// FrameWork/manager/ResManager.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResManager = void 0;
var ResManager = /** @class */ (function (_super) {
    __extends(ResManager, _super);
    function ResManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.totalAsset = 0;
        _this.curAsset = 0;
        _this.totalRes = 0;
        _this.curRes = 0;
        _this.endCb = null;
        _this.processCb = null;
        _this.bundles = {};
        return _this;
    }
    ResManager.getInstance = function () {
        return ResManager._istance;
    };
    ResManager.prototype.onLoad = function () {
        if (ResManager._istance == null) {
            ResManager._istance = this;
        }
        else {
            this.destroy();
        }
    };
    ResManager.prototype.getBundleByName = function (abName, url) {
        var bundle = this.bundles[abName];
        if (!bundle) {
            console.error("getAssetByName error", abName, url);
            return null;
        }
        return bundle;
    };
    ResManager.prototype.getAssetByName = function (abName, url) {
        var bundle = this.bundles[abName];
        if (!bundle) {
            console.error("getAssetByName error", abName, url);
            return null;
        }
        return bundle.get(url);
    };
    ResManager.prototype.getAssetUrlsByName = function (abName) {
        var bundle = this.bundles[abName];
        if (!bundle) {
            console.error("getAssetUrlsByName error", abName);
            return [];
        }
        var urls = [];
        var infos = bundle.getDirWithPath("/");
        for (var i = 0; i < infos.length; i++) {
            urls.push(infos[i].path);
        }
        return urls;
    };
    // pkg格式
    // 1.{
    //     data:assetType
    // }
    // 2.{
    //     data:[
    //         {assetType:TextAsset,urls:[]}
    //     ]
    // }
    ResManager.prototype.parsePkg = function (pkg, _processCb, _endCb) {
        var _this = this;
        this.endCb = _endCb;
        this.processCb = _processCb;
        this.totalAsset = 0;
        this.totalRes = 0;
        this.curAsset = 0;
        this.curRes = 0;
        for (var abName in pkg) {
            this.totalAsset++;
            if (pkg[abName] instanceof Array) {
                for (var i = 0; i < pkg[abName].length; i++) {
                    this.totalRes += pkg[abName][i].urls.length;
                }
            }
        }
        var _loop_1 = function (abName) {
            this_1.loadAssetBundle(abName, function (err, bundle) {
                _this.curAsset++;
                if (!(pkg[abName] instanceof Array)) {
                    var infos = bundle.getDirWithPath("/", pkg[abName]);
                    _this.totalRes += infos.length;
                    console.log(abName, infos, "this.totalRes=", _this.totalRes);
                }
                if (_this.curAsset >= _this.totalAsset) {
                    _this.preloadAssetRes(pkg);
                }
            });
        };
        var this_1 = this;
        for (var abName in pkg) {
            _loop_1(abName);
        }
    };
    ResManager.prototype.loadAssetBundle = function (abName, _endCb) {
        var _this = this;
        cc.assetManager.loadBundle(abName, function (err, bundle) {
            if (err) {
                console.error("loadAssetBundle error", err);
                return;
            }
            _this.bundles[abName] = bundle;
            if (_endCb) {
                _endCb(err, bundle);
            }
        });
    };
    ResManager.prototype.preloadAssetRes = function (pkg) {
        for (var abName in pkg) {
            var bundle = this.bundles[abName];
            if (!bundle) {
                continue;
            }
            if (pkg[abName] instanceof Array) {
                for (var i = 0; i < pkg[abName].length; i++) {
                    this.loadAssetRes(abName, pkg[abName][i].assetType, pkg[abName][i].urls);
                }
            }
            else {
                var assetType = pkg[abName];
                var infos = bundle.getDirWithPath("/", pkg[abName]);
                var urls = [];
                for (var i = 0; i < infos.length; i++) {
                    urls.push(infos[i].path);
                }
                this.loadAssetRes(abName, assetType, urls);
            }
        }
    };
    ResManager.prototype.loadAssetRes = function (abName, assetType, urls) {
        var _this = this;
        var bundle = this.bundles[abName];
        for (var k = 0; k < urls.length; k++) {
            bundle.load(urls[k], assetType, function (err, data) {
                if (err) {
                    console.error("loadAssetRes error=", err);
                    return;
                }
                _this.curRes++;
                _this.processCb(_this.curRes, _this.totalRes);
                if (_this.curRes == _this.totalRes) {
                    _this.endCb();
                }
            });
        }
    };
    ResManager._istance = null;
    return ResManager;
}(cc.Component));
exports.ResManager = ResManager;

cc._RF.pop();