"use strict";
cc._RF.push(module, '538b1eYUCZPr6G1ttqXmYxo', 'TowerEntity');
// Scripts/ECS/Entities/TowerEntity.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("../Components/BaseComponent");
var RoleComponent_1 = require("../Components/RoleComponent");
var TransformComponent_1 = require("../Components/TransformComponent");
var TowerEntity = /** @class */ (function () {
    function TowerEntity() {
        this.baseComponent = new BaseComponent_1.default();
        this.transformComponent = new TransformComponent_1.default();
        this.roleComponent = new RoleComponent_1.default();
    }
    return TowerEntity;
}());
exports.default = TowerEntity;

cc._RF.pop();