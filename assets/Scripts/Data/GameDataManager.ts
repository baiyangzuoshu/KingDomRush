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
export default class GameDataManager extends cc.Component {
    private static _instance:GameDataManager=null
    onLoad () {
        if(null===GameDataManager._instance){
            GameDataManager._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():GameDataManager{
        return GameDataManager._instance
    }

    start () {
        // 从本地加载用户数据，如果没有加载到则初始化,并回存本地
        this._load_user_data();
        this._compute_user_star();
    }

    user_data:any
    cur_user: 0 // 默认为0;
    tower_skills_upgrade_config:any= {
        0: [0, 1, 1, 2, 2, 3], // 弓箭塔 
        1: [0, 1, 1, 2, 2, 3], // 步兵塔
        2: [0, 1, 1, 2, 2, 3], // 术士塔;
        3: [0, 1, 1, 3, 3, 3], // 火炮塔
        
        4: [0, 1, 1, 2, 2, 3], // 技能炸弹;
        5: [0, 2, 3, 3, 3, 4],  // 技能步兵
    }
    cur_playing_level: 0 // 保存当前我们正在游戏的关卡的索引
    is_game_started:boolean= false // 是否在游戏中
    is_game_paused:boolean= false// 游戏是否暂停
    ememy_set: Array<any>
    map_road_set:any 
    // 清除敌人的集合敌人的集合
    clear_ememy_set() {
        this.ememy_set = [];
    }
    // 判断一下，集合里面有没有这个敌人。
    is_enemy_active(e) {
        var index = this.ememy_set.indexOf(e);
        if (index < 0 || index >= this.ememy_set.length) {
            return false;
        }

        return true;
    }

    add_ememy(e) {
        this.ememy_set.push(e);        
    }

    remove_ememy(e) {
        var index = this.ememy_set.indexOf(e);
        this.ememy_set.splice(index, 1);
    }

    get_enemy_set() {
        return this.ememy_set;
    }


    search_enemy(center_pos, search_R) {
        for(var i = 0; i < this.ememy_set.length; i ++) {
            var dst = this.ememy_set[i].getPosition();
            // var dir = cc.pSub(dst, center_pos);
            var dir = dst.sub(center_pos);
            if (search_R >= (dir.mag())) {
                return this.ememy_set[i];
            }
        }

        return null;
    }

    // + 增加，-表示消耗
    add_chip(chip) {
        var cur_user = this.get_cur_user();
        cur_user.chip += chip;

        this.sync_user_data();
    }

    get_uchip() {
        var cur_user = this.get_cur_user();
        return 999999//cur_user.chip;
    }

    // 同步数据
    sync_user_data() {
        var json_str = JSON.stringify(this.user_data);
        cc.sys.localStorage.setItem("user_data", json_str);
    }

    // 设置以哪个用户的数据进入游戏；
    set_cur_user(user_index) {
        if (user_index < 0 || user_index >= 3) {
            user_index = 0;
        }
        this.cur_user = user_index;
    }

    // 返回当前游戏用户的数据
    get_cur_user():any{
        return this.user_data[this.cur_user];
    }
    // end 

    set_cur_level(level) {
        this.cur_playing_level = level;
    }

    get_cur_level():number{
        return this.cur_playing_level;
    }

    set_map_road_set(road_data_set) {
        this.map_road_set = road_data_set;
    }

    get_map_road_set() {
        return this.map_road_set;
    }

    private _load_user_data() {
        var j_user_data = cc.sys.localStorage.getItem("user_data");
        if (j_user_data) { // 本地存储
        // if (0) { // 测试重置数据;
            this.user_data = JSON.parse(j_user_data);
            console.log("load from localStorage ######");
            console.log(this.user_data);
            return;
        }
        
        // 本地没有存储
        this.user_data= {
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
        this.sync_user_data();
        // end 
    }

    private _compute_user_star() {
        for(var i = 0; i < 3; i ++) {
            this.user_data[i].star_num = 0;
            for(var j = 0; j < this.user_data[i].level_info.length; j ++) {
                this.user_data[i].star_num += this.user_data[i].level_info[j];    
            }
        }
    }
    // end
    public arrow_bullet_params = [
        { // 等级1的子弹
            speed: 200,
            attack: 10,
        },
        
        { // 等级2的子弹
            speed: 200,
            attack: 10
        },
        
        { // 等级3的子弹
            speed: 200,
            attack: 10
        },
        
        { // 等级4的子弹
            speed: 200,
            attack: 10
        },
    ]

    public arrow_tower_params = [
        {
            search_R: 100,
            build_chip: 100, // 造这个塔的价值
        },
    
        {
            search_R: 120,
            build_chip: 220, // 造这个塔的价值,升级所带的消耗就是 220 - 100 = 120
        },
    
        {
            search_R: 140,
            build_chip: 340
        },
        {
            search_R: 160,
            build_chip: 540        
        },
    ];

    public cannon_bullet = [
        { // 等级1的子弹
            speed: 200,
            attack: 10,
            bomb_R: 30,
        },
        
        { // 等级2的子弹
            speed: 200,
            attack: 20,
            bomb_R: 30,
        },
        
        { // 等级3的子弹
            speed: 200,
            attack: 30,
            bomb_R: 30,
        },
        
        { // 等级4的子弹
            speed: 200,
            attack: 30,
            bomb_R: 30,
        },
        
        { // 等级5的子弹
            speed: 200,
            attack: 10,
            bomb_R: 30,
        },
    ];
    
    public cannon_tower_params = [
        {
            search_R: 100,
            build_chip: 200, // 造这个塔的价值
        },
    
        {
            search_R: 120,
            build_chip: 400, // 造这个塔的价值
        },
    
        {
            search_R: 140,
            build_chip: 600, // 造这个塔的价值
        },
        {
            search_R: 160,
            build_chip: 900, // 造这个塔的价值
        },
    ];

    public infantry_actor = [
        { // 等级1的兵
            speed: 50,
            attack: 10,
            blood: 100,
        },
        
        { // 等级2的兵
            speed: 50,
            attack: 10,
            blood: 100,
        },
        
        { // 等级3的兵
            speed: 50,
            attack: 10,
            blood: 100,
        },
        
        { // 等级4的兵
            speed: 50,
            attack: 10,
            blood: 100,
        },
    ];

    public infantry_tower_params = [
        {
            search_R: 100,
            build_chip: 150,
        },
    
        {
            search_R: 120,
            build_chip: 300,
        },
    
        {
            search_R: 140,
            build_chip: 450,
        },
        {
            search_R: 160,
            build_chip: 600,
        },
    ];

    public warlock_tower_params = [
        {
            search_R: 100,
            build_chip: 150,
        },
    
        {
            search_R: 120,
            build_chip: 300,
        },
    
        {
            search_R: 140,
            build_chip: 450,
        },
        {
            search_R: 160,
            build_chip: 600,
        },
    ];

    public warlock_bullet_params = [
        { // 等级1的子弹
            speed: 200,
            attack: 10,
        },
        
        { // 等级2的子弹
            speed: 200,
            attack: 10
        },
        
        { // 等级3的子弹
            speed: 200,
            attack: 10
        },
        
        { // 等级4的子弹
            speed: 200,
            attack: 10
        },
    ]
}
