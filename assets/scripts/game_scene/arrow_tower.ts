import { Sprite } from 'cc';
import { _decorator, Component, Node, SpriteFrame, Prefab, instantiate, Vec3, UITransform, v3 } from 'cc';
import { SpriteAnimation } from '../common/frame_anim';
import arrow_tower_params from '../game_data/arrow_tower_params';
import { ugame } from '../modules/ugame';
import { ArrowBullet } from './arrow_bullet';
import { v2 } from 'cc';

const { ccclass, property } = _decorator;

class ArrowTowerSkin {
    @property(SpriteFrame)
    tower_bg: SpriteFrame = null;

    @property(SpriteFrame)
    up_idle: SpriteFrame = null;

    @property(SpriteFrame)
    down_idle: SpriteFrame = null;

    @property([SpriteFrame])
    up_anim: SpriteFrame[] = [];

    @property([SpriteFrame])
    down_anim: SpriteFrame[] = [];

    @property
    man_ypos: number = 29;
}

@ccclass('ArrowTower')
export class ArrowTower extends Component {
    @property
    tower_level: number = 1;

    @property([ArrowTowerSkin])
    level_tower_skin_res: ArrowTowerSkin[] = [];

    @property
    anim_duration: number = 0.1;

    @property(Prefab)
    arrow_bullet_prefab: Prefab = null;

    @property
    boot_root_path: string = "UI_ROOT/map_root";

    private lhs: Node;
    private rhs: Node;
    private cur_anchor_index: number = 0;
    private bullet_root: Node;

    onLoad() {
        this.tower_level = 1;
        this.cur_anchor_index = 0;
        this.lhs = this.node.getChildByName("lhs");
        this.rhs = this.node.getChildByName("rhs");
        this._set_tower_skin_by_level();
        this.bullet_root = this.node.scene.getChildByPath(this.boot_root_path);
    }

    _set_tower_skin_by_level() {
        this.lhs.setPosition(this.lhs.position.x, this.level_tower_skin_res[this.tower_level - 1].man_ypos, this.lhs.position.z);
        this.rhs.setPosition(this.rhs.position.x, this.level_tower_skin_res[this.tower_level - 1].man_ypos, this.rhs.position.z);

        const s = this.node.getComponent(Sprite);
        s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].tower_bg;

        if (Math.random() < 0.5) {
            this._set_anim_idle(this.lhs, 0);
            this._set_anim_idle(this.rhs, 0);
        } else {
            this._set_anim_idle(this.lhs, 1);
            this._set_anim_idle(this.rhs, 1);
        }
    }

    _set_anim_idle(man: Node, dir: number) {
        const s = man.getComponent(Sprite);
        if (dir === 0) {
            s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].up_idle;
        } else {
            s.spriteFrame = this.level_tower_skin_res[this.tower_level - 1].down_idle;
        }
    }

    _shoot_anim_at(man: Node, w_dst_pos: Vec3) {
        let f_anim = man.getComponent(SpriteAnimation);
        if (!f_anim) {
            f_anim = man.addComponent(SpriteAnimation);
        }

        const w_pos = man.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0));
        const dir = w_dst_pos.subtract(w_pos);

        if (dir.y > 0) {
            f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].up_anim;
            f_anim.duration = this.anim_duration;
            f_anim.play_once(() => {
                this._set_anim_idle(man, 0);
            });
        } else {
            f_anim.sprite_frames = this.level_tower_skin_res[this.tower_level - 1].down_anim;
            f_anim.duration = this.anim_duration;
            f_anim.play_once(() => {
                this._set_anim_idle(man, 1);
            });
        }

        const center_pos = this.tower_center_pos();
        const search_R = arrow_tower_params[this.tower_level - 1].search_R;
        const enemy = ugame.search_enemy(center_pos, search_R);

        if (enemy) {
            w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0));
        }

        const bullet = instantiate(this.arrow_bullet_prefab);
        this.bullet_root.addChild(bullet);
        bullet.active = true;
        bullet.getComponent(ArrowBullet).shoot_at(this.tower_level, v2(w_pos.x, w_pos.y), v2(w_dst_pos.x, w_dst_pos.y), enemy);
    }

    shoot_at(w_dst_pos: Vec3) {
        if (this.cur_anchor_index === 0) {
            this._shoot_anim_at(this.lhs, w_dst_pos);
        } else {
            this._shoot_anim_at(this.rhs, w_dst_pos);
        }

        this.cur_anchor_index = (this.cur_anchor_index + 1) % 2;
    }

    tower_center_pos() {
        const center_pos = this.node.getPosition().clone();
        center_pos.x += -8;
        center_pos.y += -4;
        return center_pos;
    }

    tower_think() {
        const center_pos = this.tower_center_pos();
        const search_R = arrow_tower_params[this.tower_level - 1].search_R;
        const enemy = ugame.search_enemy(center_pos, search_R);
        let time = 0.1;

        if (!ugame.is_game_paused && enemy) {
            const w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0));
            this.shoot_at(w_dst_pos);
            time = 1;
        }
        this.scheduleOnce(this.tower_think.bind(this), time);
    }

    start() {
        this.scheduleOnce(this.tower_think.bind(this), 0.1);
    }

    upgrade_tower() {
        if (this.tower_level >= 4) {
            return this.tower_level;
        }

        this.tower_level++;
        this._set_tower_skin_by_level();
        return this.tower_level;
    }

    get_tower_level() {
        return this.tower_level;
    }
}
