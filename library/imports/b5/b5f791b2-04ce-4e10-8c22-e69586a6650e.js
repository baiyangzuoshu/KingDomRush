"use strict";
cc._RF.push(module, 'b5f79GyBM5OEIwi5pWGpmUO', 'GameDataManager');
// Scripts/Data/GameDataManager.ts

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
/*
玩家的数据
chip: 2000, // 玩家的金币
blood: 20, // 玩家的血
// 玩家闯关的数据,如果通过，根据成绩来评价你获得的最好的星， 3颗星，2颗星，1颗星;
level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, ...]; // 共19关 [2, 3, 1, 0, 0, 0, 0, 0,]
star_num: 12, // 玩家当前获得了多少颗星;

star_total: 77, // 玩家总共可以获得星;

tower_skills_level: {
    arrow_level: 1, // 弓箭
    infantry_level: 1 // 兵营;
    warlock_level: 1, // 术士;
    artillery_level: 1, // 火炮的级别;
    skills_bomb_level: 1 // 炸弹技能的级别;
    skills_infantry_level // 放兵的技能的级别
},
  
技能升级:
key: tower_skills_upgrade_config
技能升级星星配置表:
玩家有4种防御塔以及2中技能;所以就是有6个配置

{
    arrow_tower: [0, 1, 1, 2, 2, 3] // 弓箭塔
    infantry_tower: [0, 1, 1, 2, 2, 3]; // 步兵塔
    warlock_tower: [0, 1, 1, 2, 2, 3]; // 术士塔;
    artillery_tower: [0, 1, 1, 3, 3, 3]; // 火炮塔
    
    skills_bomb: [0, 1, 1, 2, 2, 3]; // 技能炸弹;
    skills_infantry: [0, 2, 3, 3, 3, 4]; // 技能步兵
}
// end
*/
var GameDataManager = /** @class */ (function (_super) {
    __extends(GameDataManager, _super);
    function GameDataManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameDataManager.prototype.onLoad = function () {
        if (null === GameDataManager._instance) {
            GameDataManager._instance = this;
        }
        else {
            this.destroy();
            return;
        }
    };
    GameDataManager.getInstance = function () {
        return GameDataManager._instance;
    };
    GameDataManager.prototype.start = function () {
        // 从本地加载用户数据，如果没有加载到则初始化,并回存本地
        this._load_user_data();
        this._compute_user_star();
    };
    // 清除敌人的集合敌人的集合
    GameDataManager.prototype.clear_ememy_set = function () {
        this.ememy_set = [];
    };
    // 判断一下，集合里面有没有这个敌人。
    GameDataManager.prototype.is_enemy_active = function (e) {
        var index = this.ememy_set.indexOf(e);
        if (index < 0 || index >= this.ememy_set.length) {
            return false;
        }
        return true;
    };
    GameDataManager.prototype.add_ememy = function (e) {
        this.ememy_set.push(e);
    };
    GameDataManager.prototype.remove_ememy = function (e) {
        var index = this.ememy_set.indexOf(e);
        this.ememy_set.splice(index, 1);
    };
    GameDataManager.prototype.get_enemy_set = function () {
        return this.ememy_set;
    };
    GameDataManager.prototype.search_enemy = function (center_pos, search_R) {
        for (var i = 0; i < this.ememy_set.length; i++) {
            var dst = this.ememy_set[i].getPosition();
            // var dir = cc.pSub(dst, center_pos);
            var dir = dst.sub(center_pos);
            if (search_R >= (dir.mag())) {
                return this.ememy_set[i];
            }
        }
        return null;
    };
    // + 增加，-表示消耗
    GameDataManager.prototype.add_chip = function (chip) {
        var cur_user = this.get_cur_user();
        cur_user.chip += chip;
        this.sync_user_data();
    };
    GameDataManager.prototype.get_uchip = function () {
        var cur_user = this.get_cur_user();
        return cur_user.chip;
    };
    // 同步数据
    GameDataManager.prototype.sync_user_data = function () {
        var json_str = JSON.stringify(this.user_data);
        cc.sys.localStorage.setItem("user_data", json_str);
    };
    // 设置以哪个用户的数据进入游戏；
    GameDataManager.prototype.set_cur_user = function (user_index) {
        if (user_index < 0 || user_index >= 3) {
            user_index = 0;
        }
        this.cur_user = user_index;
    };
    // 返回当前游戏用户的数据
    GameDataManager.prototype.get_cur_user = function () {
        return this.user_data[this.cur_user];
    };
    // end 
    GameDataManager.prototype.set_cur_level = function (level) {
        this.cur_playing_level = level;
    };
    GameDataManager.prototype.get_cur_level = function () {
        return this.cur_playing_level;
    };
    GameDataManager.prototype.set_map_road_set = function (road_data_set) {
        this.map_road_set = road_data_set;
    };
    GameDataManager.prototype.get_map_road_set = function () {
        return this.map_road_set;
    };
    GameDataManager.prototype._load_user_data = function () {
        var j_user_data = cc.sys.localStorage.getItem("user_data");
        if (j_user_data) { // 本地存储
            // if (0) { // 测试重置数据;
            this.user_data = JSON.parse(j_user_data);
            console.log("load from localStorage ######");
            console.log(this.user_data);
            return;
        }
        // 本地没有存储
        this.user_data = {
            0: {
                chip: 2000,
                blood: 20,
                level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                star_num: 0,
                star_total: 77,
                skill_level_info: [0, 0, 0, 0, 0, 0],
            },
            1: {
                chip: 2000,
                blood: 20,
                level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                star_num: 0,
                star_total: 77,
                skill_level_info: [0, 0, 0, 0, 0, 0],
            },
            2: {
                chip: 2000,
                blood: 20,
                level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                star_num: 0,
                star_total: 77,
                skill_level_info: [0, 0, 0, 0, 0, 0],
            }
        };
        // end 
        // 存回本地
        this.sync_user_data();
        // end 
    };
    GameDataManager.prototype._compute_user_star = function () {
        for (var i = 0; i < 3; i++) {
            this.user_data[i].star_num = 0;
            for (var j = 0; j < this.user_data[i].level_info.length; j++) {
                this.user_data[i].star_num += this.user_data[i].level_info[j];
            }
        }
    };
    GameDataManager._instance = null;
    return GameDataManager;
}(cc.Component));
exports.default = GameDataManager;

cc._RF.pop();