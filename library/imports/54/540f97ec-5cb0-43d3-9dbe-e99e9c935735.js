"use strict";
cc._RF.push(module, '540f9fsXLBD052+6Z6ck1c1', 'FGUIManager');
// FrameWork/manager/FGUIManager.ts

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
var FGUIManager = /** @class */ (function (_super) {
    __extends(FGUIManager, _super);
    function FGUIManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guiObjects = {};
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    FGUIManager.prototype.onLoad = function () {
        if (null == FGUIManager._instance) {
            FGUIManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        //创建UI根节点
        fgui.GRoot.create();
    };
    FGUIManager.getInstance = function () {
        return FGUIManager._instance;
    };
    FGUIManager.prototype.loadPackageByPath = function (path) {
        if (this.guiObjects[path]) {
            return -1;
        }
        fgui.UIPackage.loadPackage(path, this.onUILoaded.bind(this));
        return 0;
    };
    FGUIManager.prototype.loadPackageByBundle = function (bundle, path) {
        if (this.guiObjects[path]) {
            return -1;
        }
        fgui.UIPackage.loadPackage(bundle, path, this.onUILoaded.bind(this));
        return 0;
    };
    FGUIManager.prototype.onUILoaded = function (error, pkg) {
        if (error) {
            console.error("onUILoaded error", error);
            return;
        }
        this.guiObjects[pkg.path] = pkg;
        console.log("onUILoaded", error, pkg);
    };
    FGUIManager._instance = null;
    return FGUIManager;
}(cc.Component));
exports.default = FGUIManager;

cc._RF.pop();