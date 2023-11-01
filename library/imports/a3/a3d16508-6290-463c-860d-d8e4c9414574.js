"use strict";
cc._RF.push(module, 'a3d16UIYpBGPIYN2OTJQUV0', 'NavComponent');
// Scripts/ECS/Components/NavComponent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.path = [];
        this.curIndex = 0;
        this.curTime = 0;
        this.vx = 0;
        this.vy = 0;
        this.speed = 0;
    }
    return NavComponent;
}());
exports.default = NavComponent;

cc._RF.pop();