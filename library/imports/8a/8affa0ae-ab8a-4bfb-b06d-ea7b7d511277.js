"use strict";
cc._RF.push(module, '8affaCuq4pL+7Bt6nt9URJ3', 'AttackComponent');
// Scripts/ECS/Components/AttackComponent.ts

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
var AttackComponent = /** @class */ (function (_super) {
    __extends(AttackComponent, _super);
    function AttackComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyID = 0;
        _this.activeTime = 0;
        return _this;
    }
    return AttackComponent;
}(cc.Component));
exports.default = AttackComponent;

cc._RF.pop();