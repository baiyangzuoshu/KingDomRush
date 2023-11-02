"use strict";
cc._RF.push(module, 'f0baeMKOwVFyaXHSKBviCZ5', 'Enum');
// Scripts/Enum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowerType = exports.Enemy = exports.ViewUI = void 0;
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

cc._RF.pop();