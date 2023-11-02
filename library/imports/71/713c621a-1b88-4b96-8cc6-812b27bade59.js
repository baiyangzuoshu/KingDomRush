"use strict";
cc._RF.push(module, '713c6IaG4hLlozGgSsnut5Z', 'InfantryEntity');
// Scripts/ECS/Entities/InfantryEntity.ts

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
var InfantryEntity = /** @class */ (function (_super) {
    __extends(InfantryEntity, _super);
    function InfantryEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InfantryEntity;
}(TowerEntity_1.default));
exports.default = InfantryEntity;

cc._RF.pop();