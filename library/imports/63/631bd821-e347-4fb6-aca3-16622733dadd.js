"use strict";
cc._RF.push(module, '631bdgh40dPtqyjFmInM9rd', 'RoleComponent');
// Scripts/ECS/Components/RoleComponent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum_1 = require("../../Enum");
var RoleComponent = /** @class */ (function () {
    function RoleComponent() {
        this.type = 0;
        this.state = Enum_1.RoleState.Active;
        this.level = 0;
        this.direction = Enum_1.ActorDirection.INVALID_DIR;
    }
    return RoleComponent;
}());
exports.default = RoleComponent;

cc._RF.pop();