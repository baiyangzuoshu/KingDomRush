"use strict";
cc._RF.push(module, '8358elxENZIs49ztCRwYpxA', 'EnemyEntity');
// Scripts/ECS/Entities/EnemyEntity.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("../Components/BaseComponent");
var NavComponent_1 = require("../Components/NavComponent");
var RoleComponent_1 = require("../Components/RoleComponent");
var TransformComponent_1 = require("../Components/TransformComponent");
var UnitComponent_1 = require("../Components/UnitComponent");
var EnemyEntity = /** @class */ (function () {
    function EnemyEntity() {
        this.baseComponent = new BaseComponent_1.default();
        this.navComponent = new NavComponent_1.default();
        this.transformComponent = new TransformComponent_1.default();
        this.unitComponent = new UnitComponent_1.default();
        this.roleComponent = new RoleComponent_1.default();
    }
    return EnemyEntity;
}());
exports.default = EnemyEntity;

cc._RF.pop();