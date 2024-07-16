import { Vec3 } from 'cc';
import { _decorator, Component, Node, Prefab, Vec2, instantiate, find, tween, easing } from 'cc';
import arrow_tower_params from '../game_data/arrow_tower_params';
import warlock_tower_params from '../game_data/warlock_tower_params';
import cannon_tower_params from '../game_data/cannon_tower_params';
import { infantry_tower_params } from '../game_data/infantry_tower_params';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('TowerBuilder')
export class TowerBuilder extends Component {
    @property({ type: [Prefab] })
    tower_prefabs: Prefab[] = [];

    @property({ type: [Vec3] })
    tower_offset: Vec3[] = [];

    private gui_tower_builder: any = null; // The type should match the type of `gui_tower_builder`
    private icon: Node = null;
    private tower_type: number = 0;
    private builded_tower: Node = null;
    private is_builded: boolean = false;
    private map_root: Node = null;
    private game_scene: any = null; // The type should match the type of `game_scene`

    private tower_params: any[] = [null, arrow_tower_params, warlock_tower_params, cannon_tower_params, infantry_tower_params];

    onLoad() {
        this.gui_tower_builder = find("UI_ROOT/gui_tower_builder").getComponent("gui_tower_builder");

        this.icon = this.node.getChildByName("icon");

        this.tower_type = 0;
        this.builded_tower = null;
        this.is_builded = false;
        this.map_root = find("UI_ROOT/map_root");

        this.game_scene = find("UI_ROOT").getComponent("game_scene");
    }

    check_uchip_when_build(tower_type: number, level: number): boolean {
        const build_chip = this.tower_params[tower_type][level - 1].build_chip;

        const uchip = ugame.get_uchip();
        return uchip >= build_chip;
    }

    show_tower_builder() {
        const s = tween().to(0.3, { scale: 1 }, { easing: easing.backOut });
        if (this.is_builded === false) {
            this.gui_tower_builder.show_tower_builder(this);
            this.gui_tower_builder.node.scale = 0;
            s.target(this.gui_tower_builder.node).start();
        } else {
            this.gui_tower_builder.show_tower_undo(this);
            this.gui_tower_builder.node.scale = 0;
            s.target(this.gui_tower_builder.node).start();
        }
    }

    remove_builder_tower() {
        if (this.is_builded === false) {
            return;
        }
        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    }

    on_tower_undo_click() {
        if (this.is_builded === false) {
            return;
        }

        const tower_com = this.get_build_tower_com();
        const tower_level = tower_com.get_tower_level();
        const undo_chip = this.tower_params[this.tower_type][tower_level - 1].build_chip;
        ugame.add_chip(undo_chip);
        this.game_scene.show_game_uchip();

        this.builded_tower.removeFromParent();
        this.builded_tower = null;
        this.is_builded = false;
        this.tower_type = 0;
        this.icon.active = true;
    }

    on_tower_build_click(t: any, tower_type: string) {
        const type = parseInt(tower_type);

        if (type <= 0 || type > 4) {
            return;
        }

        if (!this.check_uchip_when_build(type, 1)) {
            return;
        }

        this.tower_type = type;
        this.icon.active = false;

        this.builded_tower = instantiate(this.tower_prefabs[type - 1]);
        this.map_root.addChild(this.builded_tower);

        const center_pos = this.node.getPosition();
        center_pos.add(this.tower_offset[type - 1]);

        this.builded_tower.setPosition(center_pos);
        this.builded_tower.active = true;
        this.is_builded = true;

        const build_chip = this.tower_params[type][0].build_chip;
        ugame.add_chip(-build_chip);
        this.game_scene.show_game_uchip();
    }

    get_build_tower_com(): any {
        switch (this.tower_type) {
            case 1:
                return this.builded_tower.getComponent("arrow_tower");
            case 2:
                return this.builded_tower.getComponent("warlock_tower");
            case 3:
                return this.builded_tower.getComponent("cannon_tower");
            case 4:
                return this.builded_tower.getComponent("infantry_tower");
        }
    }

    on_tower_upgrade_click() {
        if (this.is_builded === false || this.builded_tower === null) {
            return;
        }

        const tower_com = this.get_build_tower_com();
        const tower_level = tower_com.get_tower_level();
        if (tower_level >= 4) {
            return;
        }

        const upgrade_chip = this.tower_params[this.tower_type][tower_level].build_chip -
            this.tower_params[this.tower_type][tower_level - 1].build_chip;

        if (upgrade_chip > ugame.get_uchip()) {
            return;
        }

        if (tower_com) {
            tower_com.upgrade_tower();
        }

        ugame.add_chip(-upgrade_chip);
        this.game_scene.show_game_uchip();
    }
}
