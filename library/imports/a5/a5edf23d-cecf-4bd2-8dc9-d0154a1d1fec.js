"use strict";
cc._RF.push(module, 'a5edfI9zs9L0o3J0BVKHR/s', 'UIManager');
// FrameWork/manager/UIManager.ts

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
exports.UIManager = void 0;
var ResManager_1 = require("./ResManager");
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
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._canvas = null;
        _this._allShowPanel = {};
        _this._localZOrder = 1000;
        return _this;
    }
    UIManager.getInstance = function () {
        return UIManager._instance;
    };
    UIManager.prototype.onLoad = function () {
        if (null == UIManager._instance) {
            UIManager._instance = this;
        }
        else {
            this.destroy();
        }
        this._canvas = cc.find("Canvas");
    };
    UIManager.prototype.getPrefabByName = function (uiName) {
        var panel = this._allShowPanel[uiName];
        if (panel) {
            return panel.self;
        }
        return null;
    };
    UIManager.prototype.createPrefab = function (uiName) {
        var prefab = ResManager_1.ResManager.getInstance().getAssetByName("prefabs", "UI/" + uiName);
        if (!prefab) {
            console.error("createPrefab error", uiName);
            return null;
        }
        return prefab;
    };
    UIManager.prototype.createOnlyPrefab = function (uiName) {
        var prefab = this.createPrefab(uiName);
        return prefab;
    };
    UIManager.prototype.showPrefab = function (uiName) {
        if (!this._allShowPanel[uiName]) {
            this._allShowPanel[uiName] = new Panel();
            var prefab_1 = this.createPrefab(uiName);
            this._allShowPanel[uiName].prefab = prefab_1;
        }
        var panel = this._allShowPanel[uiName];
        if (panel.open) {
            return -1;
        }
        panel.opening = true;
        panel.open = false;
        panel.closeTime = 0;
        var prefab = panel.prefab;
        var node = cc.instantiate(prefab);
        node.parent = this._canvas;
        node.setSiblingIndex(this._localZOrder++);
        panel.self = node;
        node.addComponent(prefab.data.name + "Control");
        return 0;
    };
    UIManager.prototype.closePrefab = function (uiName) {
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
    UIManager.prototype.showUI = function (uiName, parent) {
        var prefab = ResManager_1.ResManager.getInstance().getAssetByName("prefabs", "UI/" + uiName);
        if (!prefab) {
            console.error("showUI error", uiName);
            return;
        }
        parent = parent ? parent : this._canvas;
        var node = cc.instantiate(prefab);
        node.parent = parent;
        node.addComponent(prefab.data.name + "Control");
        return node;
    };
    UIManager.prototype.update = function (dt) {
        for (var uiName in this._allShowPanel) {
            var panel = this._allShowPanel[uiName];
            if (panel.opening) {
                panel.open = true;
                panel.opening = false;
            }
            else if (!panel.open) {
                if (panel.closeTime > 0) {
                    panel.closeTime -= dt;
                }
                else {
                    var prefab = ResManager_1.ResManager.getInstance().getAssetByName("prefabs", "UI/" + uiName);
                    var ts = panel.self.getComponent(prefab.data.name + "Control");
                    if (ts) {
                        ts.cleanUp();
                    }
                    delete this._allShowPanel[uiName];
                }
            }
        }
    };
    UIManager._instance = null;
    return UIManager;
}(cc.Component));
exports.UIManager = UIManager;

cc._RF.pop();