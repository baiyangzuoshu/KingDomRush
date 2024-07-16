import { _decorator, Node, Vec3, sys } from 'cc';
const { ccclass, property } = _decorator;

interface UserData {
    chip: number;
    blood: number;
    level_info: number[];
    star_num: number;
    star_total: number;
    skill_level_info: number[];
}

interface TowerSkillsUpgradeConfig {
    [key: number]: number[];
}

@ccclass('Ugame')
class Ugame {
    user_data: { [key: number]: UserData } = {};
    cur_user: number = 0;
    tower_skills_upgrade_config: TowerSkillsUpgradeConfig = {
        0: [0, 1, 1, 2, 2, 3], // 弓箭塔 
        1: [0, 1, 1, 2, 2, 3], // 步兵塔
        2: [0, 1, 1, 2, 2, 3], // 术士塔;
        3: [0, 1, 1, 3, 3, 3], // 火炮塔
        4: [0, 1, 1, 2, 2, 3], // 技能炸弹;
        5: [0, 2, 3, 3, 3, 4],  // 技能步兵
    };

    cur_playing_level: number = 0;
    is_game_started: boolean = false;
    is_game_paused: boolean = false;
    enemy_set: Node[] = [];
    map_road_set: any = null;

    constructor() {
        this.load_user_data();
        this.compute_user_star();
    }

    clear_enemy_set() {
        this.enemy_set = [];
    }

    is_enemy_active(e: Node): boolean {
        var index = this.enemy_set.indexOf(e);
        if (index < 0 || index >= this.enemy_set.length) {
            return false;
        }

        return true;
    }

    add_enemy(e: Node) {
        this.enemy_set.push(e);
    }

    remove_enemy(e: Node) {
        const index = this.enemy_set.indexOf(e);
        if (index > -1) {
            this.enemy_set.splice(index, 1);
        }
    }

    get_enemy_set(): Node[] {
        return this.enemy_set;
    }

    search_enemy(center_pos: Vec3, search_R: number): Node | null {
        for (let enemy of this.enemy_set) {
            const dst = enemy.getPosition();
            const dir = dst.subtract(center_pos);
            if (search_R >= dir.length()) {
                return enemy;
            }
        }
        return null;
    }

    add_chip(chip: number) {
        const cur_user = this.get_cur_user();
        cur_user.chip += chip;
        this.sync_user_data();
    }

    get_uchip(): number {
        return this.get_cur_user().chip;
    }

    sync_user_data() {
        const json_str = JSON.stringify(this.user_data);
        sys.localStorage.setItem("user_data", json_str);
    }

    set_cur_user(user_index: number) {
        if (user_index < 0 || user_index >= 3) {
            user_index = 0;
        }
        this.cur_user = user_index;
    }

    get_cur_user(): UserData {
        return this.user_data[this.cur_user];
    }

    set_cur_level(level: number) {
        this.cur_playing_level = level;
    }

    get_cur_level(): number {
        return this.cur_playing_level;
    }

    set_map_road_set(road_data_set: any) {
        this.map_road_set = road_data_set;
    }

    get_map_road_set() {
        return this.map_road_set;
    }

    private load_user_data() {
        const j_user_data = sys.localStorage.getItem("user_data");
        if (j_user_data) {
            this.user_data = JSON.parse(j_user_data);
            console.log("load from localStorage ######");
            console.log(this.user_data);
            return;
        }

        this.user_data = {
            0: { chip: 2000, blood: 20, level_info: Array(19).fill(0), star_num: 0, star_total: 77, skill_level_info: Array(6).fill(0) },
            1: { chip: 2000, blood: 20, level_info: Array(19).fill(0), star_num: 0, star_total: 77, skill_level_info: Array(6).fill(0) },
            2: { chip: 2000, blood: 20, level_info: Array(19).fill(0), star_num: 0, star_total: 77, skill_level_info: Array(6).fill(0) }
        };

        this.sync_user_data();
    }

    private compute_user_star() {
        for (let i = 0; i < 3; i++) {
            this.user_data[i].star_num = this.user_data[i].level_info.reduce((acc, stars) => acc + stars, 0);
        }
    }
}

export const ugame = new Ugame();
