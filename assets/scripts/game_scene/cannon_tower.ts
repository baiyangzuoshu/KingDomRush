import { _decorator, Component, Node, SpriteFrame, Prefab, v3, Vec3, UITransform, instantiate, tween } from 'cc';
import { Sprite } from 'cc';
import { CannonBullet } from './cannon_bullet';
import { SpriteAnimation } from '../common/frame_anim';
import cannon_tower_params from '../game_data/cannon_tower_params';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('TowerSkin')
export class TowerSkin {
    @property([SpriteFrame])
    shoot_anim: SpriteFrame[] = [];

    @property
    shoot_anim_duration: number = 0.1;

    @property([SpriteFrame])
    shoot_bullet: SpriteFrame[] = [];
}

@ccclass('CannonTower')
export class CannonTower extends Component {
    @property
    tower_level: number = 1;

    @property([TowerSkin])
    tower_skin_set: TowerSkin[] = [];

    @property(Prefab)
    bullet_prefab: Prefab = null;

    @property
    bullet_root_path: string = "UI_ROOT/map_root/bullet_root";

    private anim: Node;
    private bullet_icon: Node;
    private bullet_root: Node;

    onLoad() {
        this.anim = this.node.getChildByName("anim");
        this.bullet_icon = this.anim.getChildByName("bullet_icon");
        this.bullet_icon.scale = new Vec3(0, 0, 0);
        this.set_tower_idle();
        this.bullet_root = this.node.scene.getChildByPath(this.bullet_root_path);
    }

    set_tower_idle() {
        const s = this.anim.getComponent(Sprite);
        s.spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_anim[0];
    }

    _play_preload_bullet_anim() {
        if (this.tower_level === 4) {
            return;
        }

        const start_pos_set = [v3(-24, 2, 0), v3(-24, 3, 0), v3(-24, 2, 0), v3(-24, 2, 0)];
        const end_pos_set = [v3(3, 20, 0), v3(3, 21, 0), v3(3, 24, 0), v3(3, 24, 0)];
        const delay_time_set = [0.8, 1.5, 1.2];
        const rot_degree_set = [180 + Math.random() * 90, 180 + Math.random() * 90, 45];

        this.bullet_icon.getComponent(Sprite).spriteFrame = this.tower_skin_set[this.tower_level - 1].shoot_bullet[0];
        const func = () => {
            this.bullet_icon.scale = new Vec3(1, 1, 1);
            this.bullet_icon.setPosition(start_pos_set[this.tower_level - 1]);
            this.bullet_icon.angle = -45;

            tween(this.bullet_icon)
                .to(0.4, { angle: rot_degree_set[this.tower_level - 1] })
                .start();
        };

        const bz_action = tween(this.bullet_icon)
            .to(0.4, { position: end_pos_set[this.tower_level - 1] })
            .start();

        tween(this.bullet_icon)
            .delay(delay_time_set[this.tower_level - 1])
            .call(func)
            .then(bz_action)
            .to(0.1, { scale: new Vec3(0, 0, 0) })
            .start();
    }

    _shoot_bullet(w_dst_pos: Vec3, bullet_level: number) {
        const delay_set = [0.7, 0.8, 0.6, 1.3, 3.5];
        const start_pos_set = [v3(3, 16, 0), v3(3, 16, 0), v3(3, 16, 0), v3(-1, 20, 0), v3(-22, 24, 0)];
        
        const start_w_pos = this.anim.getComponent(UITransform).convertToWorldSpaceAR(start_pos_set[bullet_level - 1]);

        const func = () => {
            const center_pos = this.tower_center_pos();
            const search_R = cannon_tower_params[this.tower_level - 1].search_R;
            const enemy = ugame.search_enemy(center_pos, search_R);
            if (enemy) {
                w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0));
            }

            const bullet = instantiate(this.bullet_prefab);
            this.bullet_root.addChild(bullet);
            const cannon_bullet = bullet.getComponent(CannonBullet);
            cannon_bullet.bullet_level = bullet_level;
            cannon_bullet.shoot_at(bullet_level, start_w_pos, w_dst_pos);
        };

        tween(this.node)
            .delay(delay_set[bullet_level - 1])
            .call(func)
            .start();
    }

    shoot_at(w_dst_pos: Vec3) {
        const frame_anim = this.anim.getComponent(SpriteAnimation);
        frame_anim.sprite_frames = this.tower_skin_set[this.tower_level - 1].shoot_anim;
        frame_anim.duration = this.tower_skin_set[this.tower_level - 1].shoot_anim_duration;
        frame_anim.play_once(() => this.set_tower_idle());
        this._play_preload_bullet_anim();
        this._shoot_bullet(w_dst_pos, this.tower_level);

        if (this.tower_level === 4) {
            this._shoot_bullet(w_dst_pos, this.tower_level + 1);
        }
    }

    tower_center_pos() {
        const center_pos = this.node.getPosition();
        center_pos.x += -1;
        center_pos.y += 8;
        return center_pos;
    }

    tower_think() {
        const center_pos = this.tower_center_pos();
        const search_R = cannon_tower_params[this.tower_level - 1].search_R;
        const enemy = ugame.search_enemy(center_pos, search_R);
        let time = 0.1;

        if (!ugame.is_game_paused && enemy) {
            const w_dst_pos = enemy.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0));
            this.shoot_at(w_dst_pos);

            time = 1;
            if (this.tower_level === 4) {
                time = 3.5;
            }
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
        this.set_tower_idle();
        return this.tower_level;
    }

    get_tower_level() {
        return this.tower_level;
    }
}
