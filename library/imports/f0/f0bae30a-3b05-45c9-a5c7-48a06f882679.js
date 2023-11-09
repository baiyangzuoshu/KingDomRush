"use strict";
cc._RF.push(module, 'f0baeMKOwVFyaXHSKBviCZ5', 'Enum');
// Scripts/Enum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleState = exports.ActorDirection = exports.ActorState = exports.AnimateState = exports.TowerType = exports.Enemy = exports.ViewUI = void 0;
var ViewUI;
(function (ViewUI) {
    ViewUI["HomeUI"] = "HomeUI";
    ViewUI["GameUI"] = "GameUI";
    ViewUI["AboutUI"] = "AboutUI";
    ViewUI["RoadMapUI"] = "RoadMapUI";
})(ViewUI = exports.ViewUI || (exports.ViewUI = {}));
var Enemy;
(function (Enemy) {
    Enemy[Enemy["Bear"] = 0] = "Bear";
    Enemy[Enemy["Forkman"] = 1] = "Forkman";
    Enemy[Enemy["Small1"] = 2] = "Small1";
    Enemy[Enemy["Gorilla"] = 3] = "Gorilla";
    Enemy[Enemy["Small2"] = 4] = "Small2";
    Enemy[Enemy["Carry"] = 5] = "Carry";
    Enemy[Enemy["Small3"] = 6] = "Small3";
})(Enemy = exports.Enemy || (exports.Enemy = {}));
var TowerType;
(function (TowerType) {
    TowerType[TowerType["Arrow"] = 1] = "Arrow";
    TowerType[TowerType["Warlock"] = 2] = "Warlock";
    TowerType[TowerType["Cannon"] = 3] = "Cannon";
    TowerType[TowerType["Infantry"] = 4] = "Infantry";
})(TowerType = exports.TowerType || (exports.TowerType = {}));
var AnimateState;
(function (AnimateState) {
    AnimateState[AnimateState["None"] = 1] = "None";
    AnimateState[AnimateState["Start"] = 2] = "Start";
    AnimateState[AnimateState["Playing"] = 3] = "Playing";
    AnimateState[AnimateState["Stop"] = 4] = "Stop";
})(AnimateState = exports.AnimateState || (exports.AnimateState = {}));
var ActorState;
(function (ActorState) {
    ActorState[ActorState["IDLE"] = 0] = "IDLE";
    ActorState[ActorState["WALK"] = 1] = "WALK";
    ActorState[ActorState["ATTACK"] = 2] = "ATTACK";
    ActorState[ActorState["DEAD"] = 3] = "DEAD";
    ActorState[ActorState["ARRIVED"] = 4] = "ARRIVED";
})(ActorState = exports.ActorState || (exports.ActorState = {}));
var ActorDirection;
(function (ActorDirection) {
    ActorDirection[ActorDirection["INVALID_DIR"] = -1] = "INVALID_DIR";
    ActorDirection[ActorDirection["UP_DIR"] = 0] = "UP_DIR";
    ActorDirection[ActorDirection["DOWN_DIR"] = 1] = "DOWN_DIR";
    ActorDirection[ActorDirection["LEFT_DIR"] = 2] = "LEFT_DIR";
    ActorDirection[ActorDirection["RIGHT_DIR"] = 3] = "RIGHT_DIR";
})(ActorDirection = exports.ActorDirection || (exports.ActorDirection = {}));
var RoleState;
(function (RoleState) {
    RoleState[RoleState["None"] = 1] = "None";
    RoleState[RoleState["Active"] = 2] = "Active";
    RoleState[RoleState["Dead"] = 3] = "Dead";
    RoleState[RoleState["Clean"] = 4] = "Clean";
})(RoleState = exports.RoleState || (exports.RoleState = {}));

cc._RF.pop();