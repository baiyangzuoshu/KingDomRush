"use strict";
cc._RF.push(module, '9cf40bpIr5I0qWMd0LeQaNj', 'UnitComponent');
// Scripts/ECS/Components/UnitComponent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitComponent = /** @class */ (function () {
    function UnitComponent() {
        this.speed = 0; // 速度
        this.health = 0; // 血
        this.maxHp = 0; // 最大血量
        this.attack = 0; // 攻击力
        this.player_hurt = 0; // 对玩家的伤害值
        this.bonues_chip = 0; // 玩家打死怪物的奖励,也可以按照概率来报
    }
    return UnitComponent;
}());
exports.default = UnitComponent;

cc._RF.pop();