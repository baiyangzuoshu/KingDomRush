"use strict";
cc._RF.push(module, '570ffM0E/RBqJGPDqSWRuF6', 'CannonEntity');
// Scripts/ECS/Entities/CannonEntity.ts

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
var TowerEntity_1 = require("./TowerEntity");
var CannonEntity = /** @class */ (function (_super) {
    __extends(CannonEntity, _super);
    function CannonEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CannonEntity;
}(TowerEntity_1.default));
exports.default = CannonEntity;

cc._RF.pop();