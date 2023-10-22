"use strict";
cc._RF.push(module, '62e18aTC+VALplnMt9Rph59', 'TreeViewDemo');
// Scripts/demo/TreeViewDemo.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UIBase_1 = require("../../FrameWork/ui/UIBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TreeViewDemo = /** @class */ (function (_super) {
    __extends(TreeViewDemo, _super);
    function TreeViewDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tree1 = null;
        _this._tree2 = null;
        _this._fileURL = null;
        return _this;
    }
    TreeViewDemo.prototype.onLoad = function () {
        this.loadMainGUI("TreeView", "Main");
        this.guiMakeFullScreen();
        this._fileURL = "ui://TreeView/file";
        this._tree1 = this.getGUIChild("tree").asTree;
        this._tree1.on(fgui.Event.CLICK_ITEM, this.__clickNode, this);
        this._tree2 = this.getGUIChild("tree2").asTree;
        this._tree2.on(fgui.Event.CLICK_ITEM, this.__clickNode, this);
        this._tree2.treeNodeRender = this.renderTreeNode.bind(this);
        var topNode = new fgui.GTreeNode(true);
        topNode.data = "I'm a top node";
        this._tree2.rootNode.addChild(topNode);
        for (var i = 0; i < 5; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "Hello " + i;
            topNode.addChild(node);
        }
        var aFolderNode = new fgui.GTreeNode(true);
        aFolderNode.data = "A folder node";
        topNode.addChild(aFolderNode);
        for (var i = 0; i < 5; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "Good " + i;
            aFolderNode.addChild(node);
        }
        for (var i = 0; i < 3; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "World " + i;
            topNode.addChild(node);
        }
        var anotherTopNode = new fgui.GTreeNode(false);
        anotherTopNode.data = ["I'm a top node too", "ui://TreeView/heart"];
        this._tree2.rootNode.addChild(anotherTopNode);
    };
    TreeViewDemo.prototype.renderTreeNode = function (node, obj) {
        if (node.isFolder) {
            obj.text = node.data;
        }
        else if (node.data instanceof Array) {
            obj.icon = node.data[1];
            obj.text = node.data[0];
        }
        else {
            obj.icon = this._fileURL;
            obj.text = node.data;
        }
    };
    TreeViewDemo.prototype.__clickNode = function (itemObject) {
        var node = itemObject.treeNode;
        console.log(node.text);
    };
    TreeViewDemo = __decorate([
        ccclass
    ], TreeViewDemo);
    return TreeViewDemo;
}(UIBase_1.default));
exports.default = TreeViewDemo;

cc._RF.pop();