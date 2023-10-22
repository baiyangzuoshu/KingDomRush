export default class Cmd {
    
    public static UnameLoginReq: number = 9;
    public static UnameLoginRes: number = 10;
    public static C2SGetVersion: number = 34;
    public static S2CGetVersion: number = 35;
    public static UnameRegisterReq: number = 36;
    public static UnameRegisterRes: number = 37;
    public static C2SUpdateUser: number = 38;
    public static S2CUpdateUser: number = 39;

    public static Id2Name = [
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
}