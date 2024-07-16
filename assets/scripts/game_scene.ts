import { _decorator, Component, Prefab, Node, find, Label, instantiate, director, Vec2 } from 'cc';
import { SoundManager } from './modules/sound_manager';
import { ugame } from './modules/ugame';
import { Actor } from './game_scene/actor';
import { TowerBuilder } from './game_scene/tower_builder';
import { Checkout } from './game_scene/checkout';
import level1_data from './game_data/level1';
import level2_data from './game_data/level2';
import level3_data from './game_data/level3';

const { ccclass, property } = _decorator;

@ccclass('GameSceneManager')
export class GameSceneManager extends Component {
    @property([Prefab])
    enemyPrefabs: Prefab[] = [];

    @property([Prefab])
    gameMapSet: Prefab[] = [];

    private door: any;
    private goBack: boolean = false;
    private pauseRoot: Node;
    private settingRoot: Node;
    private bloodLabel: Label;
    private uchipLabel: Label;
    private roundLabel: Label;
    private blood: number = 0;
    private gameStarted: boolean = false;
    private mapRoot: Node;
    private checkout: Checkout;
    private gameMap: Node;
    private mapTagRoot: Node;
    private levelData: any;
    private curRound: number = 0;
    private curRoadIndex: number = 0;
    private curGenTotal: number = 0;
    private curGenNow: number = 0;
    private allEnemyGen: boolean = false;
    private curScheduleTime: number;

    onLoad() {
        SoundManager.instance.play_music("resources/sounds/music/game_bg1.mp3", true);

        this.door = find("UI_ROOT/loading_door").getComponent("loading_door");
        this.pauseRoot = find("UI_ROOT/anchor-center/pause_root");
        this.pauseRoot.active = false;

        this.settingRoot = find("UI_ROOT/anchor-center/setting_root");
        this.settingRoot.active = false;

        this.bloodLabel = find("UI_ROOT/anchor-lt/ugame_root/blood_label").getComponent(Label);
        this.uchipLabel = find("UI_ROOT/anchor-lt/ugame_root/uchip_label").getComponent(Label);
        this.roundLabel = find("UI_ROOT/anchor-lt/ugame_root/round_label").getComponent(Label);

        ugame.is_game_paused = false;

        this.mapRoot = find("UI_ROOT/map_root");

        this.checkout = find("UI_ROOT/checkout").getComponent(Checkout);

        const mapLevel = Math.min(ugame.get_cur_level(), this.gameMapSet.length - 1);
        this.gameMap = instantiate(this.gameMapSet[mapLevel]);
        this.node.addChild(this.gameMap);
        //this.gameMap.zIndex = -100;
        this.mapTagRoot = this.gameMap.getChildByName("tag_root");
    }

    startGame() {
        if (this.gameStarted) return;

        this.allEnemyGen = false;
        ugame.clear_enemy_set();
        this.unscheduleAllCallbacks();

        for (const child of this.mapTagRoot.children) {
            const towerBuilder = child.getComponent(TowerBuilder);
            towerBuilder.remove_builder_tower();
        }

        this.mapRoot.removeAllChildren();

        this.gameStarted = true;
        ugame.is_game_started = true;
        this.checkout.node.active = false;

        const curUser = ugame.get_cur_user();
        this.blood = curUser.blood;
        this.bloodLabel.string = `${this.blood}`;
        this.uchipLabel.string = `${ugame.get_uchip()}`;
        this.roundLabel.string = "round 0 / 7";

        const mapLevel = Math.min(ugame.get_cur_level(), this.gameMapSet.length - 1);
        if(1==mapLevel){
            this.levelData = level1_data;
        }
        else if(2==mapLevel){
            this.levelData = level2_data;
        }
        else if(3==mapLevel){
            this.levelData = level3_data;
        }
        else{
            this.levelData = level1_data;
        }
        
        this.roundLabel.string = `round 0 / ${this.levelData.length}`;
        this.curRound = 0;
        this.curRoadIndex = 0;
        this.curGenTotal = 0;
        this.curGenNow = 0;
        this.genRoundEnemy();
    }

    showGameUchip() {
        this.uchipLabel.string = `${ugame.get_uchip()}`;
    }

    start() {
        this.startGame();
        this.door.openTheDoor(null);
    }

    showGameFailed() {
        this.checkout.show_failed();
    }

    onPlayerAttacked(hurt: number) {
        if (!this.gameStarted) return;

        this.blood -= hurt;
        if (this.blood <= 0) {
            this.blood = 0;
            this.gameStarted = false;
            ugame.is_game_started = false;
            this.showGameFailed();
        }
        this.bloodLabel.string = `${this.blood}`;
    }

    genOneEnemy() {
        if (!this.gameStarted) return;
        if (ugame.is_game_paused) {
            this.scheduleOnce(this.genOneEnemy.bind(this), this.curScheduleTime);
            return;
        }

        const curRoundParams = this.levelData[this.curRound];
        const type = curRoundParams.type[this.curGenNow];
        const roadSet = curRoundParams.road_set;

        const mapRoadSet = ugame.get_map_road_set();
        const enemy = instantiate(this.enemyPrefabs[type]);
        enemy.active = true;
        this.mapRoot.addChild(enemy);

        ugame.add_enemy(enemy);
        const actor = enemy.getComponent(Actor);

        let index = 0;
        if (curRoundParams.random_road) {
            index = Math.floor(Math.random() * roadSet.length);
        } else {
            index = this.curRoadIndex++;
            if (this.curRoadIndex >= roadSet.length) {
                this.curRoadIndex = 0;
            }
            index = roadSet[index];
        }

        if (index >= mapRoadSet.length) {
            index = 0;
        }

        const roadData = mapRoadSet[index];
        actor.set_actor_params(curRoundParams.actor_params);
        actor.gen_at_road(roadData);

        if (this.curGenNow === 0) {
            this.roundLabel.string = `round ${this.curRound + 1} / ${this.levelData.length}`;
        }

        this.curGenNow++;
        if (this.curGenNow === this.curGenTotal) {
            this.curRound++;
            this.genRoundEnemy();
        } else {
            const time = curRoundParams.gen_time_set[this.curGenNow];
            this.curScheduleTime = time;
            this.scheduleOnce(this.genOneEnemy.bind(this), time);
        }
    }

    thinkLevelPass() {
        if (!this.gameStarted || !this.allEnemyGen || ugame.enemy_set.length > 0) {
            this.scheduleOnce(this.thinkLevelPass.bind(this), 0.5);
            return;
        }

        const curUser = ugame.get_cur_user();
        this.checkout.show_passed(curUser.blood, this.blood);
        this.gameStarted = false;
    }

    genRoundEnemy() {
        if (this.curRound >= this.levelData.length) {
            this.allEnemyGen = true;
            this.scheduleOnce(this.thinkLevelPass.bind(this), 0.5);
            return;
        }

        const curRoundParams = this.levelData[this.curRound];
        const time = curRoundParams.delay + curRoundParams.gen_time_set[0];
        this.curGenTotal = curRoundParams.num;
        this.curGenNow = 0;
        this.curRoadIndex = 0;
        this.curScheduleTime = time;
        this.scheduleOnce(this.genOneEnemy.bind(this), time);
    }

    gotoRoadmapScene() {
        if (this.goBack) return;
        this.checkout.node.active = false;
        SoundManager.instance.play_effect("resources/sounds/click.wav");

        this.goBack = true;
        this.door.closeTheDoor(() => {
            director.loadScene("roadmap_scene");
        });
    }

    onPauseClick() {
        this.pauseRoot.active = true;
        ugame.is_game_paused = true;
    }

    onResumeGameClick() {
        this.pauseRoot.active = false;
        ugame.is_game_paused = false;
    }

    onSettingClick() {
        this.settingRoot.active = true;
        ugame.is_game_paused = true;
    }

    onSettingCloseClick() {
        this.settingRoot.active = false;
        ugame.is_game_paused = false;
    }

    onSettingReplayClick() {
        this.settingRoot.active = false;
        this.gameStarted = false;
        ugame.is_game_paused = false;
        this.onReplayGameClick();
    }

    onReplayGameClick() {
        this.startGame();
    }

    onStartGameClick() {
        if (this.gameStarted) return;
        this.gameStarted = true;
    }
}
