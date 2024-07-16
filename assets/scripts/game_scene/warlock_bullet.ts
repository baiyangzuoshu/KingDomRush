import { _decorator, Component, Node, SpriteFrame, Vec2, Vec3, UITransform, tween, Sprite } from 'cc';
import { Actor } from './actor'; // Adjust the import path as needed
import { SpriteAnimation } from '../common/frame_anim';
import warlock_bullet_params from '../game_data/warlock_bullet_params';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('WarlockBulletSkin')
class WarlockBulletSkin {
    @property({ type: SpriteFrame })
    bullet_icon: SpriteFrame = null;

    @property({ type: [SpriteFrame] })
    bomb_anim: SpriteFrame[] = [];

    @property
    bomb_duration: number = 0.1;
}

@ccclass('WarlockBullet')
export class WarlockBullet extends Component {
    @property
    bullet_level: number = 1;

    @property({ type: [WarlockBulletSkin] })
    bullet_skin_set: WarlockBulletSkin[] = [];

    private anim: Node = null;
    private shoot_enemy: Node = null;

    onLoad() {
        this.anim = this.node.getChildByName('anim');
    }

    private _set_bullet_idle() {
        const sprite = this.anim.getComponent(Sprite);
        sprite.spriteFrame = this.bullet_skin_set[this.bullet_level - 1].bullet_icon;
    }

    shoot_at(level: number, w_start_pos: Vec3, w_dst_pos: Vec3, enemy: Node) {
        if (!this.node.parent) {
            return;
        }

        this.bullet_level = level;
        this.shoot_enemy = enemy;

        this._set_bullet_idle();

        const start_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(w_start_pos.x, w_start_pos.y));
        const dst_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(w_dst_pos.x, w_dst_pos.y));
        this.node.setPosition(start_pos);

        const dir = w_dst_pos.subtract(w_start_pos);
        const len = dir.length();
        const time = len / warlock_bullet_params[this.bullet_level - 1].speed;

        if (this.shoot_enemy !== null) {
            const actor = this.shoot_enemy.getComponent(Actor);
            const after_pos = actor.position_after_time(time);
            w_dst_pos = this.shoot_enemy.parent.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(after_pos.x, after_pos.y));
        }

        tween(this.node)
            .to(time, { position: dst_pos })
            .call(() => {
                const frame_anim = this.anim.getComponent(SpriteAnimation);
                frame_anim.sprite_frames = this.bullet_skin_set[this.bullet_level - 1].bomb_anim;
                frame_anim.duration = this.bullet_skin_set[this.bullet_level - 1].bomb_duration;
                frame_anim.play_once(() => {
                    this.on_bullet_bomb();
                    this.node.removeFromParent();
                });
            })
            .start();
    }

    private on_bullet_bomb() {
        if (this.shoot_enemy === null) {
            return;
        }

        if (ugame.is_enemy_active(this.shoot_enemy)) {
            const actor = this.shoot_enemy.getComponent(Actor);
            actor.on_warlock_bullet_attack(warlock_bullet_params[this.bullet_level - 1].attack);
        }
    }
}
