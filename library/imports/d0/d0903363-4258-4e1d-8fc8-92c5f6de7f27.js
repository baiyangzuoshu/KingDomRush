"use strict";
cc._RF.push(module, 'd0903NjQlhOHY/IksX23n8n', 'MapDataManager');
// Scripts/Data/MapDataManager.ts

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
var Enum_1 = require("../Enum");
var MapDataManager = /** @class */ (function (_super) {
    __extends(MapDataManager, _super);
    function MapDataManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level_data1 = [
            // 1
            {
                desic: "3个哥布林",
                delay: 0,
                num: 3,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5],
                random_road: false,
                road_set: [1, 0, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 2
            {
                desic: "6个哥布林",
                delay: 5,
                num: 6,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 3
            {
                desic: "9个哥布林",
                delay: 5,
                num: 9,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 4 
            {
                desic: "4个哥布林和1个兽人",
                delay: 5,
                num: 5,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 5
            {
                desic: "3个兽人",
                delay: 5,
                num: 3,
                type: [Enum_1.Enemy.Small3, Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 6
            {
                desic: "10个哥布林和4个兽人",
                delay: 5,
                num: 14,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                    3.5, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 7
            {
                delay: 5,
                num: 16,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 50,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            }
        ];
        _this.level_data2 = [
            // 1
            {
                desic: "3个哥布林",
                delay: 0,
                num: 3,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5],
                random_road: false,
                road_set: [1, 0, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 2
            {
                desic: "6个哥布林",
                delay: 5,
                num: 6,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 3
            {
                desic: "9个哥布林",
                delay: 5,
                num: 9,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 4 
            {
                desic: "4个哥布林和1个兽人",
                delay: 5,
                num: 5,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 5
            {
                desic: "3个兽人",
                delay: 5,
                num: 3,
                type: [Enum_1.Enemy.Small3, Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 6
            {
                desic: "10个哥布林和4个兽人",
                delay: 5,
                num: 14,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                    3.5, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 7
            {
                delay: 5,
                num: 16,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 50,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            }
        ];
        _this.level_data3 = [
            // 1
            {
                desic: "3个哥布林",
                delay: 0,
                num: 3,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5],
                random_road: false,
                road_set: [1, 0, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 2
            {
                desic: "6个哥布林",
                delay: 5,
                num: 6,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 3
            {
                desic: "9个哥布林",
                delay: 5,
                num: 9,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 4 
            {
                desic: "4个哥布林和1个兽人",
                delay: 5,
                num: 5,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 5
            {
                desic: "3个兽人",
                delay: 5,
                num: 3,
                type: [Enum_1.Enemy.Small3, Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 6
            {
                desic: "10个哥布林和4个兽人",
                delay: 5,
                num: 14,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small3, Enum_1.Enemy.Small3],
                gen_time_set: [0, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                    3.5, 0.5, 0.5, 0.5, 0.5,
                    3.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 10,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            },
            // 7
            {
                delay: 5,
                num: 16,
                type: [Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1,
                    Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1, Enum_1.Enemy.Small1],
                gen_time_set: [0, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                    0.5, 0.5, 0.5, 0.5,
                ],
                random_road: true,
                road_set: [0, 1, 2],
                actor_params: {
                    speed: 50,
                    health: 30,
                    attack: 50,
                    player_hurt: 1,
                    bonues_chip: 10,
                },
            }
        ];
        return _this;
    }
    MapDataManager.prototype.onLoad = function () {
        if (null === MapDataManager._instance) {
            MapDataManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    MapDataManager.getInstance = function () {
        return MapDataManager._instance;
    };
    MapDataManager._instance = null;
    return MapDataManager;
}(cc.Component));
exports.default = MapDataManager;

cc._RF.pop();