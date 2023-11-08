"use strict";
cc._RF.push(module, '2bbc6UvAoxPS5UW1xqKp4Mj', 'InfantryActor');
// Scripts/ECS/Entities/InfantryActor.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfantryActor = void 0;
var AIComponent_1 = require("../Components/AIComponent");
var NavComponent_1 = require("../Components/NavComponent");
var BulletEntity_1 = require("./BulletEntity");
var InfantryActor = /** @class */ (function (_super) {
    __extends(InfantryActor, _super);
    function InfantryActor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.navComponent = new NavComponent_1.default();
        _this.aiComponent = new AIComponent_1.default();
        return _this;
    }
    return InfantryActor;
}(BulletEntity_1.default));
exports.InfantryActor = InfantryActor;

cc._RF.pop();