"use strict";
cc._RF.push(module, 'e94f2CEJlBOBaalMdcSji2e', 'NetManager');
// FrameWork/manager/Net/NetManager.ts

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
exports.NetManager = void 0;
var EventManager_1 = require("../EventManager");
var State;
(function (State) {
    State[State["Disconnected"] = 0] = "Disconnected";
    State[State["Connecting"] = 1] = "Connecting";
    State[State["Connected"] = 2] = "Connected";
})(State || (State = {}));
;
var NetManager = /** @class */ (function (_super) {
    __extends(NetManager, _super);
    function NetManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = "ws://127.0.0.1:6081/ws";
        _this.state = State.Disconnected;
        _this.sock = null;
        return _this;
    }
    NetManager.getInstance = function () {
        return NetManager._instance;
    };
    NetManager.prototype.onLoad = function () {
        if (NetManager._instance === null) {
            NetManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        this.state = State.Disconnected;
    };
    NetManager.prototype.Init = function (url) {
        this.url = url;
        this.state = State.Disconnected;
    };
    NetManager.prototype.send_data = function (data_arraybuf) {
        if (this.state === State.Connected && this.sock) {
            this.sock.send(data_arraybuf);
        }
    };
    NetManager.prototype.connect_to_server = function () {
        if (this.state !== State.Disconnected) {
            return;
        }
        // 抛出一个正在重新连接的事件;
        EventManager_1.EventManager.getInstance().emit("net_connecting", null);
        this.state = State.Connecting;
        this.sock = new WebSocket(this.url); // H5标准，底层做好了;
        this.sock.binaryType = "arraybuffer"; // blob, 二进制;
        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
    };
    NetManager.prototype._on_recv_data = function (event) {
        EventManager_1.EventManager.getInstance().emit("net_message", event.data);
    };
    NetManager.prototype._on_socket_close = function (event) {
        this.close_socket();
    };
    NetManager.prototype._on_socket_err = function (event) {
        this.close_socket();
    };
    NetManager.prototype.close_socket = function () {
        if (this.state === State.Connected) {
            if (this.sock !== null) {
                this.sock.close();
                this.sock = null;
            }
        }
        EventManager_1.EventManager.getInstance().emit("net_disconnect", null);
        this.state = State.Disconnected;
    };
    // 连接成功了
    NetManager.prototype._on_opened = function (event) {
        this.state = State.Connected;
        console.log("connect to server: " + this.url + " sucess!");
        EventManager_1.EventManager.getInstance().emit("net_connect", null);
    };
    NetManager.prototype.update = function (dt) {
        if (this.state !== State.Disconnected) {
            return;
        }
        this.connect_to_server();
    };
    NetManager._instance = null;
    return NetManager;
}(cc.Component));
exports.NetManager = NetManager;

cc._RF.pop();