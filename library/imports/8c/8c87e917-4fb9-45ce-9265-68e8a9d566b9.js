"use strict";
cc._RF.push(module, '8c87ekXT7lFzpJlaOip1Wa5', 'AnimateComponent');
// Scripts/ECS/Components/AnimateComponent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum_1 = require("../../Enum");
var AnimateComponent = /** @class */ (function () {
    function AnimateComponent() {
        this.srcPos = null;
        this.dstPos = null;
        this.state = Enum_1.AnimateState.None;
        this.id = 0;
        this.time = 0;
    }
    return AnimateComponent;
}());
exports.default = AnimateComponent;

cc._RF.pop();