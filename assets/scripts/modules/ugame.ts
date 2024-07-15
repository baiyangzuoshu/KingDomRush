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


var ugame = {
    user_data: {
        0: null, // 玩家1的数据
        1: null, // 玩家2的数据
        2: null, // 玩家3的数据;
    }, 
    
    cur_user: 0, // 默认为0;
    
    tower_skills_upgrade_config: {
        0: [0, 1, 1, 2, 2, 3], // 弓箭塔 
        1: [0, 1, 1, 2, 2, 3], // 步兵塔
        2: [0, 1, 1, 2, 2, 3], // 术士塔;
        3: [0, 1, 1, 3, 3, 3], // 火炮塔
        
        4: [0, 1, 1, 2, 2, 3], // 技能炸弹;
        5: [0, 2, 3, 3, 3, 4],  // 技能步兵
    },
    
    
    cur_playing_level: 0, // 保存当前我们正在游戏的关卡的索引
    
    is_game_started: false, // 是否在游戏中
    is_game_paused: false, // 游戏是否暂停

    ememy_set: [], 
    // 清除敌人的集合敌人的集合
    clear_ememy_set: function() {
        this.ememy_set = [];
    },

    // 判断一下，集合里面有没有这个敌人。
    is_enemy_active: function(e) {
        var index = this.ememy_set.indexOf(e);
        if (index < 0 || index >= this.ememy_set.length) {
            return false;
        }

        return true;
    },

    add_ememy: function(e) {
        this.ememy_set.push(e);        
    },

    remove_ememy: function(e) {
        var index = this.ememy_set.indexOf(e);
        this.ememy_set.splice(index, 1);
    },

    get_enemy_set: function() {
        return ugame.ememy_set;
    },


    search_enemy: function(center_pos, search_R) {
        for(var i = 0; i < ugame.ememy_set.length; i ++) {
            var dst = ugame.ememy_set[i].getPosition();
            // var dir = cc.pSub(dst, center_pos);
            var dir = dst.sub(center_pos);
            if (search_R >= (dir.mag())) {
                return ugame.ememy_set[i];
            }
        }

        return null;
    },

    // + 增加，-表示消耗
    add_chip: function(chip) {
        var cur_user = ugame.get_cur_user();
        cur_user.chip += chip;

        ugame.sync_user_data();
    },

    get_uchip: function() {
        var cur_user = ugame.get_cur_user();
        return cur_user.chip;
    },

    // 同步数据
    sync_user_data: function() {
        var json_str = JSON.stringify(ugame.user_data);
        cc.sys.localStorage.setItem("user_data", json_str);
    },
    
    // 设置以哪个用户的数据进入游戏；
    set_cur_user: function(user_index) {
        if (user_index < 0 || user_index >= 3) {
            user_index = 0;
        }
        ugame.cur_user = user_index;
    }, 
    
    // 返回当前游戏用户的数据
    get_cur_user: function() {
        return ugame.user_data[ugame.cur_user];
    },
    // end 
    
    set_cur_level: function(level) {
        ugame.cur_playing_level = level;
    }, 
    
    get_cur_level: function() {
        return ugame.cur_playing_level;
    },
    
    set_map_road_set: function(road_data_set) {
        ugame.map_road_set = road_data_set;
    },
    
    get_map_road_set: function() {
        return ugame.map_road_set;
    },
};

function _load_user_data() {
    var j_user_data = cc.sys.localStorage.getItem("user_data");
    if (j_user_data) { // 本地存储
    // if (0) { // 测试重置数据;
        ugame.user_data = JSON.parse(j_user_data);
        console.log("load from localStorage ######");
        console.log(ugame.user_data);
        return;
    }
    
    // 本地没有存储
    ugame.user_data = {
        0: { // 第0个玩家的数据
            chip: 2000,
            blood: 20,
            level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19关全部为0
            star_num: 0,
            star_total: 77,
            
            skill_level_info: [0, 0, 0, 0, 0, 0], // [skill0, skill1, skill2, skill, skill2, skill]
        },
        
        1: {
            chip: 2000,
            blood: 20,
            level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19关全部为0
            star_num: 0,
            star_total: 77,
            skill_level_info: [0, 0, 0, 0, 0, 0], // [skill0, skill1, skill2, skill, skill2, skill]
        }, 
        
        2: {
            chip: 2000,
            blood: 20,
            level_info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19关全部为0
            star_num: 0,
            star_total: 77,
            skill_level_info: [0, 0, 0, 0, 0, 0], // [skill0, skill1, skill2, skill, skill2, skill]
        }
    };
    // end 
    
    // 存回本地
    ugame.sync_user_data();
    // end 
}

function _compute_user_star() {
    for(var i = 0; i < 3; i ++) {
        ugame.user_data[i].star_num = 0;
        for(var j = 0; j < ugame.user_data[i].level_info.length; j ++) {
            ugame.user_data[i].star_num += ugame.user_data[i].level_info[j];    
        }
    }
}

// 从本地加载用户数据，如果没有加载到则初始化,并回存本地
_load_user_data();
_compute_user_star();

module.exports = ugame;

