"use strict";
cc._RF.push(module, 'd8418u+MnlPSIkhfEQQz76z', 'BasicsDemo');
// Scripts/demo/BasicsDemo.ts

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
var TestWin_1 = require("./TestWin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicDemo = /** @class */ (function (_super) {
    __extends(BasicDemo, _super);
    function BasicDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._backBtn = null;
        _this._demoContainer = null;
        _this._cc = null;
        _this._demoObjects = {};
        //------------------------------
        _this._winA = null;
        _this._winB = null;
        //------------------------------
        _this._pm = null;
        _this._popupCom = null;
        //------------------------------
        _this.startPos = new cc.Vec2();
        return _this;
    }
    BasicDemo.prototype.onLoad = function () {
        fgui.UIConfig.verticalScrollBar = "ui://Basics/ScrollBar_VT";
        fgui.UIConfig.horizontalScrollBar = "ui://Basics/ScrollBar_HZ";
        fgui.UIConfig.popupMenu = "ui://Basics/PopupMenu";
        fgui.UIConfig.buttonSound = "ui://Basics/click";
        this.loadMainGUI("Basics", "Main");
        this.guiMakeFullScreen();
        this._backBtn = this.getGUIChild("btn_Back");
        this._backBtn.visible = false;
        this._backBtn.onClick(this.onClickBack, this);
        this._demoContainer = this.getGUIChild("container").asCom;
        this._cc = this.getGUIController("c1");
        var cnt = this.getChildrenNum();
        for (var i = 0; i < cnt; i++) {
            var obj = this.getGUIChildAt(i);
            if (obj.group && obj.group.name == "btns")
                obj.onClick(this.runDemo, this);
        }
    };
    BasicDemo.prototype.runDemo = function (evt) {
        var type = evt.initiator.parent.name.substr(4);
        var obj = this._demoObjects[type];
        if (obj == null) {
            obj = this.createGUIObject("Demo_" + type).asCom;
            this._demoObjects[type] = obj;
        }
        this._demoContainer.removeChildren();
        this._demoContainer.addChild(obj);
        this._cc.selectedIndex = 1;
        this._backBtn.visible = true;
        switch (type) {
            case "Button":
                this.playButton();
                break;
            case "Text":
                this.playText();
                break;
            case "Window":
                this.playWindow();
                break;
            case "Popup":
                this.playPopup();
                break;
            case "Drag&Drop":
                this.playDragDrop();
                break;
            case "Depth":
                this.playDepth();
                break;
            case "Grid":
                this.playGrid();
                break;
            case "ProgressBar":
                this.playProgressBar();
                break;
        }
    };
    BasicDemo.prototype.onClickBack = function (evt) {
        this._cc.selectedIndex = 0;
        this._backBtn.visible = false;
    };
    //------------------------------
    BasicDemo.prototype.playButton = function () {
        var obj = this._demoObjects["Button"];
        obj.getChild("n34").onClick(this.__clickButton, this);
    };
    BasicDemo.prototype.__onDragStart = function (evt) {
        var btn = evt.initiator;
        btn.stopDrag(); //取消对原目标的拖动，换成一个替代品
        fgui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
    };
    BasicDemo.prototype.__clickButton = function () {
        console.log("click button");
    };
    //------------------------------
    BasicDemo.prototype.playText = function () {
        var obj = this._demoObjects["Text"];
        obj.getChild("n12").on(fgui.Event.LINK, this.__clickLink, this);
        obj.getChild("n25").onClick(this.__clickGetInput, this);
    };
    BasicDemo.prototype.__clickLink = function (link) {
        var obj = this._demoObjects["Text"];
        obj.getChild("n12").text = "[img]ui://9leh0eyft9fj5f[/img][color=#FF0000]你点击了链接[/color]：" + link;
    };
    BasicDemo.prototype.__clickGetInput = function () {
        var obj = this._demoObjects["Text"];
        obj.getChild("n24").text = obj.getChild("n22").text;
    };
    BasicDemo.prototype.playWindow = function () {
        var obj = this._demoObjects["Window"];
        obj.getChild("n0").onClick(this.__clickWindowA, this);
        obj.getChild("n1").onClick(this.__clickWindowB, this);
    };
    BasicDemo.prototype.__clickWindowA = function () {
        if (this._winA == null)
            this._winA = new TestWin_1.WindowA();
        this._winA.show();
    };
    BasicDemo.prototype.__clickWindowB = function () {
        if (this._winB == null)
            this._winB = new TestWin_1.WindowB();
        this._winB.show();
    };
    BasicDemo.prototype.playPopup = function () {
        if (this._pm == null) {
            this._pm = new fgui.PopupMenu();
            this._pm.addItem("Item 1");
            this._pm.addItem("Item 2");
            this._pm.addItem("Item 3");
            this._pm.addItem("Item 4");
            if (this._popupCom == null) {
                this._popupCom = this.createGUIObject("Component12").asCom;
                this._popupCom.center();
            }
        }
        var obj = this._demoObjects["Popup"];
        var btn = obj.getChild("n0");
        btn.onClick(this.__clickPopup1, this);
        var btn2 = obj.getChild("n1");
        btn2.onClick(this.__clickPopup2, this);
    };
    BasicDemo.prototype.__clickPopup1 = function (evt) {
        var btn = fgui.GObject.cast(evt.currentTarget);
        this._pm.show(btn);
    };
    BasicDemo.prototype.__clickPopup2 = function () {
        fgui.GRoot.inst.showPopup(this._popupCom);
    };
    //------------------------------
    BasicDemo.prototype.playDragDrop = function () {
        var obj = this._demoObjects["Drag&Drop"];
        var btnA = obj.getChild("a");
        btnA.draggable = true;
        var btnB = obj.getChild("b");
        btnB.draggable = true;
        btnB.on(fgui.Event.DRAG_START, this.__onDragStart, this);
        var btnC = obj.getChild("c");
        btnC.icon = null;
        btnC.on(fgui.Event.DROP, this.__onDrop, this);
        var btnD = obj.getChild("d");
        btnD.draggable = true;
        var bounds = obj.getChild("bounds");
        var rect = bounds.localToGlobalRect(0, 0, bounds.width, bounds.height);
        rect = fgui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
        //因为这时候面板还在从右往左动，所以rect不准确，需要用相对位置算出最终停下来的范围
        rect.x -= obj.parent.x;
        btnD.dragBounds = rect;
    };
    BasicDemo.prototype.__onDrop = function (target, data) {
        target.icon = data;
    };
    BasicDemo.prototype.playDepth = function () {
        var obj = this._demoObjects["Depth"];
        var testContainer = obj.getChild("n22").asCom;
        var fixedObj = testContainer.getChild("n0");
        fixedObj.sortingOrder = 100;
        fixedObj.draggable = true;
        var numChildren = testContainer.numChildren;
        var i = 0;
        while (i < numChildren) {
            var child = testContainer.getChildAt(i);
            if (child != fixedObj) {
                testContainer.removeChildAt(i);
                numChildren--;
            }
            else
                i++;
        }
        this.startPos.x = fixedObj.x;
        this.startPos.y = fixedObj.y;
        obj.getChild("btn0").onClick(this.__click1, this);
        obj.getChild("btn1").onClick(this.__click2, this);
    };
    BasicDemo.prototype.__click1 = function () {
        var graph = new fgui.GGraph();
        this.startPos.x += 10;
        this.startPos.y += 10;
        graph.setPosition(this.startPos.x, this.startPos.y);
        graph.setSize(150, 150);
        graph.drawRect(1, cc.Color.BLACK, cc.Color.RED);
        var obj = this._demoObjects["Depth"];
        obj.getChild("n22").asCom.addChild(graph);
    };
    BasicDemo.prototype.__click2 = function () {
        var graph = new fgui.GGraph();
        this.startPos.x += 10;
        this.startPos.y += 10;
        graph.setPosition(this.startPos.x, this.startPos.y);
        graph.setSize(150, 150);
        graph.drawRect(1, cc.Color.BLACK, cc.Color.GREEN);
        graph.sortingOrder = 200;
        var obj = this._demoObjects["Depth"];
        obj.getChild("n22").asCom.addChild(graph);
    };
    //------------------------------
    BasicDemo.prototype.playGrid = function () {
        var obj = this._demoObjects["Grid"];
        var list1 = obj.getChild("list1").asList;
        list1.removeChildrenToPool();
        var testNames = ["苹果手机操作系统", "安卓手机操作系统", "微软手机操作系统", "微软桌面操作系统", "苹果桌面操作系统", "未知操作系统"];
        var testColors = [cc.Color.YELLOW, cc.Color.RED, cc.Color.WHITE, cc.Color.BLUE];
        var cnt = testNames.length;
        for (var i = 0; i < cnt; i++) {
            var item = list1.addItemFromPool();
            item.getChild("t0").text = "" + (i + 1);
            item.getChild("t1").text = testNames[i];
            item.getChild("t2").asTextField.color = testColors[Math.floor(Math.random() * 4)];
            item.getChild("star").asProgress.value = (Math.floor(Math.random() * 3) + 1) / 3 * 100;
        }
        var list2 = obj.getChild("list2").asList;
        list2.removeChildrenToPool();
        for (var i = 0; i < cnt; i++) {
            var item = list2.addItemFromPool();
            item.getChild("cb").asButton.selected = false;
            item.getChild("t1").text = testNames[i];
            item.getChild("mc").asMovieClip.playing = i % 2 == 0;
            item.getChild("t3").text = "" + Math.floor(Math.random() * 10000);
        }
    };
    //---------------------------------------------
    BasicDemo.prototype.playProgressBar = function () {
        var obj = this._demoObjects["ProgressBar"];
        this.schedule(this.__playProgress, 0.01);
    };
    BasicDemo.prototype.__playProgress = function () {
        var obj = this._demoObjects["ProgressBar"];
        var cnt = obj.numChildren;
        for (var i = 0; i < cnt; i++) {
            var child = obj.getChildAt(i);
            if (child instanceof fgui.GProgressBar) {
                child.value += 1;
                if (child.value > child.max)
                    child.value = 0;
            }
        }
    };
    BasicDemo = __decorate([
        ccclass
    ], BasicDemo);
    return BasicDemo;
}(UIBase_1.default));
exports.default = BasicDemo;

cc._RF.pop();