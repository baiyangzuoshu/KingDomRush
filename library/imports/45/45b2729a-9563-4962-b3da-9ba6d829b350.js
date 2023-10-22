"use strict";
cc._RF.push(module, '45b27KalWNJYrPam6bYKbNQ', 'ProtoManager');
// FrameWork/manager/Net/ProtoManager.ts

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
exports.ProtoManager = void 0;
var ProtoManager = /** @class */ (function (_super) {
    __extends(ProtoManager, _super);
    function ProtoManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 协议描述文件的文本对象
        _this.pbTexAsset = null;
        // 根据协议描述文本对象，我们生成一个动态解析的对象;
        _this.pb = null;
        return _this;
    }
    ProtoManager.getInstance = function () {
        return ProtoManager._intance;
    };
    ProtoManager.prototype.Init = function (pbTex) {
        this.pbTexAsset = pbTex;
        this.pb = protobuf.parse(this.pbTexAsset);
        console.log(this.pbTexAsset);
        console.log(this.pb);
    };
    ProtoManager.prototype.onLoad = function () {
        if (ProtoManager._intance === null) {
            ProtoManager._intance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    ProtoManager.prototype.SerializeMsg = function (msgName, msgBody) {
        var rs = this.pb.root.lookupType(msgName);
        var msg = rs.create(msgBody);
        var buf = rs.encode(msg).finish();
        return buf;
    };
    ProtoManager.prototype.DeserializeMsg = function (msgName, msgBuf) {
        var rs = this.pb.root.lookupType(msgName);
        var msg = rs.decode(msgBuf);
        return msg;
    };
    ProtoManager._intance = null;
    return ProtoManager;
}(cc.Component));
exports.ProtoManager = ProtoManager;

cc._RF.pop();