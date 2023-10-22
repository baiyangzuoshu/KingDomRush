"use strict";
cc._RF.push(module, '0ba11CUDwNJrJ2l4cszCbu6', 'EventManager');
// FrameWork/manager/EventManager.ts

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
exports.EventManager = void 0;
var EventNode = /** @class */ (function () {
    function EventNode() {
        this.func = null;
        this.target = null;
        this.name = "";
    }
    return EventNode;
}());
var EventManager = /** @class */ (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventMap = {};
        return _this;
    }
    EventManager.getInstance = function () {
        return EventManager._instance;
    };
    EventManager.prototype.addEventListener = function (eventName, func, target) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [];
        }
        var isExit = false;
        for (var i = 0; i < this.eventMap[eventName].length; i++) {
            var node = this.eventMap[eventName][i];
            if (node.func == func && node.target == target) {
                isExit = true;
                break;
            }
        }
        if (!isExit) {
            var node = new EventNode;
            node.func = func;
            node.name = eventName;
            node.target = target;
            this.eventMap[eventName].push(node);
        }
    };
    EventManager.prototype.removeEventListener = function (eventName, func, target) {
        if (!this.eventMap[eventName]) {
            return;
        }
        for (var i = 0; i < this.eventMap[eventName].length; i++) {
            var node = this.eventMap[eventName][i];
            if (node.func == func && node.target == target) {
                delete this.eventMap[eventName][i];
                break;
            }
        }
    };
    EventManager.prototype.emit = function (eventName, data) {
        if (!this.eventMap[eventName]) {
            return;
        }
        for (var i = 0; i < this.eventMap[eventName].length; i++) {
            var node = this.eventMap[eventName][i];
            var func = node.func;
            func.call(node.target, data);
        }
    };
    EventManager.prototype.onLoad = function () {
        if (null == EventManager._instance) {
            EventManager._instance = this;
        }
        else {
            this.destroy();
        }
    };
    EventManager._instance = null;
    return EventManager;
}(cc.Component));
exports.EventManager = EventManager;

cc._RF.pop();