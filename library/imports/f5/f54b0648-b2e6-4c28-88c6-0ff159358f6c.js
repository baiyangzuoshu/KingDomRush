"use strict";
cc._RF.push(module, 'f54b0ZIsuZMKIjGD/FZNY9s', 'WarlockEntity');
// Scripts/ECS/Entities/WarlockEntity.ts

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
var WarlockEntity = /** @class */ (function (_super) {
    __extends(WarlockEntity, _super);
    function WarlockEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WarlockEntity;
}(TowerEntity_1.default));
exports.default = WarlockEntity;

cc._RF.pop();