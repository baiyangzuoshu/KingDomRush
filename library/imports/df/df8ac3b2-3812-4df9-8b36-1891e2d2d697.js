"use strict";
cc._RF.push(module, 'df8acOyOBJN+Ys2GJHi0taX', 'TimerManager');
// FrameWork/manager/TimerManager.ts

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
exports.TimerManager = void 0;
var TimerNode = /** @class */ (function () {
    function TimerNode() {
        this.func = null;
        this.params = null;
        this.delay = 0;
        this.duration = 0;
        this.timerId = 0;
        this.totalTime = 0;
        this.isRemoved = false;
        this.repeat = 0;
    }
    return TimerNode;
}());
var TimerManager = /** @class */ (function (_super) {
    __extends(TimerManager, _super);
    function TimerManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoTimerId = 0;
        _this.timers = {};
        _this.newAddTimerList = [];
        _this.removedTimerList = [];
        return _this;
    }
    TimerManager.getInstance = function () {
        return TimerManager._instance;
    };
    TimerManager.prototype.onLoad = function () {
        if (null == TimerManager._instance) {
            TimerManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    TimerManager.prototype.ScheduleOnce = function (_func, _delay) {
        return this.Schedule(_func, null, _delay, 0, 1);
    };
    TimerManager.prototype.ShceduleOnce2 = function (_func, _params, _delay) {
        return this.Schedule(_func, _params, _delay, 0, 1);
    };
    TimerManager.prototype.Schedule = function (_func, _params, _delay, _duration, _repeat) {
        var node = new TimerNode();
        node.func = _func;
        node.params = _params;
        node.delay = _delay;
        node.duration = _duration;
        node.timerId = this.autoTimerId++;
        node.totalTime = _duration;
        node.isRemoved = false;
        node.repeat = _repeat;
        this.newAddTimerList.push(node);
        return node.timerId;
    };
    TimerManager.prototype.UnSchedule = function (timerId) {
        if (!this.timers[timerId]) {
            return;
        }
        var node = this.timers[timerId];
        node.isRemoved = true;
    };
    TimerManager.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.newAddTimerList.length; i++) {
            var node = this.newAddTimerList[i];
            this.timers[node.timerId] = node;
        }
        this.newAddTimerList.length = 0;
        for (var k in this.timers) {
            var node = this.timers[k];
            if (node.isRemoved) {
                this.removedTimerList.push(node);
                continue;
            }
            node.totalTime += deltaTime;
            if (node.totalTime >= (node.delay + node.duration)) {
                node.func(node.params);
                node.repeat--;
                node.totalTime -= (node.delay + node.duration);
                node.delay = 0;
                if (0 == node.repeat) {
                    node.isRemoved = true;
                    this.removedTimerList.push(node);
                }
            }
        }
        for (var i = 0; i < this.removedTimerList.length; i++) {
            var timerId = this.removedTimerList[i].timerId;
            delete this.timers[timerId];
        }
        this.removedTimerList.length = 0;
    };
    TimerManager._instance = null;
    return TimerManager;
}(cc.Component));
exports.TimerManager = TimerManager;

cc._RF.pop();