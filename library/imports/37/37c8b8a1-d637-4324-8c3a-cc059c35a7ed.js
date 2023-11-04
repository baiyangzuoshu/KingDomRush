"use strict";
cc._RF.push(module, '37c8bih1jdDJIw6zAWcNaft', 'BulletEntity');
// Scripts/ECS/Entities/BulletEntity.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimateComponent_1 = require("../Components/AnimateComponent");
var AttackComponent_1 = require("../Components/AttackComponent");
var BaseComponent_1 = require("../Components/BaseComponent");
var RoleComponent_1 = require("../Components/RoleComponent");
var TransformComponent_1 = require("../Components/TransformComponent");
var BulletEntity = /** @class */ (function () {
    function BulletEntity() {
        this.baseComponent = new BaseComponent_1.default();
        this.transformComponent = new TransformComponent_1.default();
        this.animateComponent = new AnimateComponent_1.default();
        this.roleComponent = new RoleComponent_1.default();
        this.attackComponent = new AttackComponent_1.default();
    }
    return BulletEntity;
}());
exports.default = BulletEntity;

cc._RF.pop();