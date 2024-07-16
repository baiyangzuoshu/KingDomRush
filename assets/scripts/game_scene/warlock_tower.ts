import { _decorator, Component, Node, SpriteFrame, Prefab, Vec2, Vec3, tween, Sprite, UITransform } from 'cc';
import { SpriteAnimation } from '../common/frame_anim';
import { find } from 'cc';
import { instantiate } from 'cc';
import warlock_tower_params from '../game_data/warlock_tower_params';
import { ugame } from '../modules/ugame';
import { WarlockBullet } from './warlock_bullet';

const { ccclass, property } = _decorator;

@ccclass('WarlockSkin')
class WarlockSkin {
    @property({ type: [SpriteFrame] })
    tower_anim: SpriteFrame[] = [];

    @property
    tower_anim_duration: number = 0.1;

    @property({ type: [SpriteFrame] })
    shoot_up_anim: SpriteFrame[] = [];

    @property
    up_anim_duration: number = 0.1;

    @property({ type: [SpriteFrame] })
    shoot_down_anim: SpriteFrame[] = [];

    @property
    down_anim_duration: number = 0.1;

    @property
    xpos: number = -1;

    @property
    ypos: number = 19;
}

@ccclass('WarlockTower')
export class WarlockTower extends Component {
    @property
    tower_level: number = 1;

    @property({ type: [WarlockSkin] })
    tower_skin_set: WarlockSkin[] = [];

    @property({ type: Prefab })
    bullet_prefab: Prefab = null;

    @property
    bullet_root_path: string = "UI_ROOT/map_root/bullet_root";

    private anim: Node = null;
    private man: Node = null;
    private bullet_root: Node = null;

    onLoad() {
        this.anim = this.node.getChildByName('anim');
        this.man = this.node.getChildByName('man');
        this._set_tower_idle();
        this._set_man_idle(true);
        this.bullet_root = find(this.bullet_root_path);
    }

    private _set_tower_idle() {
        const sprite = this.anim.getComponent(Sprite);
        sprite.spriteFrame = this.tower_skin_set[this.tower_level - 1].tower_anim[0];
    }

    private _set_man_idle(b_up: boolean) {
        this.man.setPosition(new Vec3(this.tower_skin_set[this.tower_level - 1].xpos, this.tower_skin_set[this.tower_level - 1].ypos));
        const sprite = this.man.getComponent(Sprite);
        sprite.spriteFrame = b_up ? this.tower_skin_set[this.tower_level - 1].shoot_up_anim[0] : this.tower_skin_set[this.tower_level - 1].shoot_down_anim[0];
    }

    private _play_tower_anim() {
        const frame_anim = this.anim.getComponent(SpriteAnimation);
        frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].tower_anim;
        frame_anim.duration = this.tower_skin_set[this.tower_level - 1].tower_anim_duration;
        frame_anim.play_once(this._set_tower_idle.bind(this));
    }

    private _shoot_bullet(w_dst_pos: Vec3, b_up: boolean) {
        const delay_set_up = [0.6, 0.6, 0.6, 0.6];
        const delay_set_down = [0.5, 0.5, 0.5, 0.5];
        const start_pos_up = [new Vec2(6, 6), new Vec2(6, 6), new Vec2(6, 6), new Vec2(6, 6)];
        const start_pos_down = [new Vec2(-5, 8), new Vec2(-5, 8), new Vec2(-5, 8), new Vec2(-5, 8)];

        const time = b_up ? delay_set_up[this.tower_level - 1] : delay_set_down[this.tower_level - 1];
        const start_pos = b_up ? start_pos_up[this.tower_level - 1] : start_pos_down[this.tower_level - 1];

        const delay = tween().delay(time);
        const func = tween().call(() => {
            const center_pos = this.tower_center_pos();
            const search_R = warlock_tower_params[this.tower_level - 1].search_R;
            const enemy = ugame.search_enemy(center_pos, search_R);
            if (enemy) {
                w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0));
            }

            const w_start_pos = this.man.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(start_pos.x, start_pos.y));
            const bullet = instantiate(this.bullet_prefab);
            this.bullet_root.addChild(bullet);
            bullet.active = true;
            bullet.getComponent(WarlockBullet).shoot_at(this.tower_level, new Vec3(w_start_pos.x, w_start_pos.y), w_dst_pos, enemy);
        });

        tween(this.node).then(delay).then(func).start();
    }

    private _play_shoot_man_anim(w_dst_pos: Vec3) {
        const frame_anim = this.man.getComponent(SpriteAnimation);
        const w_start_pos = this.man.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0));
        const b_up = w_start_pos.y < w_dst_pos.y;

        if (b_up) {
            frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_up_anim;
            frame_anim.duration = this.tower_skin_set[this.tower_level - 1].up_anim_duration;
        } else {
            frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_down_anim;
            frame_anim.duration = this.tower_skin_set[this.tower_level - 1].down_anim_duration;
        }

        frame_anim.play_once(() => {
            this._set_man_idle(b_up);
        });

        this._shoot_bullet(w_dst_pos, b_up);
    }

    shoot_at(w_dst_pos: Vec3) {
        this._play_tower_anim();
        this._play_shoot_man_anim(w_dst_pos);
    }

    tower_center_pos(): Vec3 {
        const center_pos = this.node.getPosition();
        center_pos.x += -5;
        center_pos.y += 7;
        return new Vec3(center_pos.x, center_pos.y);
    }

    tower_think() {
        const center_pos = this.tower_center_pos();
        const search_R = warlock_tower_params[this.tower_level - 1].search_R;
        const enemy = ugame.search_enemy(center_pos, search_R);
        let time = 0.1;

        if (!ugame.is_game_paused && enemy) {
            const w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0));
            this.shoot_at(new Vec3(w_dst_pos.x, w_dst_pos.y));
            time = 1;
        }

        this.scheduleOnce(this.tower_think.bind(this), time);
    }

    start() {
        this.scheduleOnce(this.tower_think.bind(this), 0.1);
    }

    upgrade_tower(): number {
        if (this.tower_level >= 4) {
            return this.tower_level;
        }
        this.tower_level++;
        this._set_tower_idle();
        this._set_man_idle(true);
        return this.tower_level;
    }

    get_tower_level(): number {
        return this.tower_level;
    }
}
