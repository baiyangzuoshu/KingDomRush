import { _decorator, Component, Node, Button, Label, find, director,Animation } from 'cc';
import { SoundManager } from './modules/sound_manager';
import { ugame } from './modules/ugame';
import { LevelStar } from './roadmap_scene/level_entry_info';
import { HomeScene } from './home_scene';

const { ccclass, property } = _decorator;

@ccclass('RoadmapScene')
export class RoadmapScene extends Component {
    @property
    level_num: number = 19;

    private door: any;
    private outside: boolean = false;
    private new_level_entry: Node;
    private passed_entry: Node[] = [];
    private newest_level: number = -1;
    private upgrade_config: Node;
    go_back: any;

    onLoad() {
        // Play background music
        SoundManager.instance.play_music("resources/sounds/music/roadmap_scene_bg.mp3", true);

        this.door = find("UI_ROOT/loading_door").getComponent("loading_door");
        this.new_level_entry = find("UI_ROOT/anchor-center/new_level_entry");
        this.new_level_entry.active = false;

        const map_entry_root = find("UI_ROOT/anchor-center/map_entry_root");
        for (let i = 0; i < this.level_num; i++) {
            const name = "level" + (i + 1);
            const entry = map_entry_root.getChildByName(name);
            this.passed_entry.push(entry);

            const button = entry.getComponent(Button);
            const clickEventHandler = new Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "RoadmapScene";
            clickEventHandler.handler = "onPassedEntryClick";
            clickEventHandler.customEventData = `${i}`;
            button.clickEvents = [clickEventHandler];
        }

        // Initialize upgrade config
        this.upgrade_config = find("UI_ROOT/anchor-center/upgrade_config");
        this.upgrade_config.active = false;
    }

    private showUserStarInfo() {
        const label = find("UI_ROOT/anchor-rt/game_star_info/star_num").getComponent(Label);
        const cur_user = ugame.get_cur_user();
        label.string = `${cur_user.star_num} / ${cur_user.star_total}`;
    }

    private showGameLevelInfo() {
        const cur_user = ugame.get_cur_user();
        const level_info = cur_user.level_info;
        let i = 0;
        const len = Math.min(level_info.length, this.level_num);

        for (i = 0; i < len; i++) {
            if (level_info[i] === 0) {
                break;
            }
            this.passed_entry[i].active = true;
            this.passed_entry[i].getComponent(LevelStar).show_level_star_info(level_info[i]);
        }

        this.newest_level = i;
        if (this.newest_level >= this.level_num) {
            this.new_level_entry.active = false;
            this.newest_level = this.level_num - 1;
        } else {
            this.new_level_entry.active = true;
            this.new_level_entry.setPosition(this.passed_entry[this.newest_level].getPosition());
        }

        for (; i < this.level_num; i++) {
            this.passed_entry[i].active = false;
        }
    }

    start() {
        this.showGameLevelInfo();
        this.showUserStarInfo();
        this.door.openTheDoor();
    }

    gotoHome() {
        if (this.go_back) {
            return;
        }
        SoundManager.instance.play_effect("resources/sounds/click.wav");
        this.go_back = true;
        this.door.closeTheDoor(() => {
            director.loadScene("home_scene", () => {
                const home_scene = find("UI_ROOT").getComponent(HomeScene);
                home_scene.closeDoor();
            });
        });
    }

    private gotoGameScene(level: number) {
        ugame.set_cur_level(level);
        this.door.closeTheDoor(() => {
            director.loadScene("game_scene");
        });
    }

    onNewEntryClick() {
        if (this.outside) {
            return;
        }
        this.outside = true;
        this.gotoGameScene(this.newest_level);
    }

    onPassedEntryClick(event: Event, level: string) {
        if (this.outside) {
            return;
        }
        this.outside = true;
        this.gotoGameScene(parseInt(level));
    }

    onSkillUpgradeConfigClick() {
        this.upgrade_config.active = true;
        this.upgrade_config.getComponent(Animation).play("road_skill_upgrade_config");
    }
}
