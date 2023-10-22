"use strict";
cc._RF.push(module, 'f48d7DChiVEV6Or+kET29/V', 'Cmd');
// Scripts/Cmd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cmd = /** @class */ (function () {
    function Cmd() {
    }
    Cmd.UnameLoginReq = 9;
    Cmd.UnameLoginRes = 10;
    Cmd.C2SGetVersion = 34;
    Cmd.S2CGetVersion = 35;
    Cmd.UnameRegisterReq = 36;
    Cmd.UnameRegisterRes = 37;
    Cmd.C2SUpdateUser = 38;
    Cmd.S2CUpdateUser = 39;
    Cmd.Id2Name = [
        "INVALID_CMD",
        "GuestLoginReq",
        "GuestLoginRes",
        "Relogin",
        "UserLostConn",
        "EditProfileReq",
        "EditProfileRes",
        "AccountUpgradeReq",
        "AccountUpgradeRes",
        "UnameLoginReq",
        "UnameLoginRes",
        "LoginOutReq",
        "LoginOutRes",
        "GetUgameInfoReq",
        "GetUgameInfoRes",
        "RecvLoginBonuesReq",
        "RecvLoginBonuesRes",
        "GetWorldRankUchipReq",
        "GetWorldRankUchipRes",
        "GetSysMsgReq",
        "GetSysMsgRes",
        "LoginLogicReq",
        "LoginLogicRes",
        "EnterZoneReq",
        "EnterZoneRes",
        "EnterMatch",
        "UserArrived",
        "ExitMatchReq",
        "ExitMatchRes",
        "UserExitMatch",
        "GameStart",
        "UdpTest",
        "LogicFrame",
        "NextFrameOpts",
        "C2SGetVersion",
        "S2CGetVersion",
        "UnameRegisterReq",
        "UnameRegisterRes",
        "C2SUpdateUser",
        "S2CUpdateUser",
    ];
    return Cmd;
}());
exports.default = Cmd;

cc._RF.pop();