import { _decorator, Component, Node, SpriteFrame, Vec2, Vec3, UITransform, v3, instantiate, tween } from 'cc';
import { SpriteAnimation } from '../common/frame_anim';
import { Sprite } from 'cc';
import { ugame } from '../modules/ugame';
import { Actor } from './actor';
import cannon_bullet_params from '../game_data/cannon_bullet_params';

const { ccclass, property } = _decorator;

@ccclass('BulletSkin')
export class BulletSkin {
    @property(SpriteFrame)
    bullet_icon: SpriteFrame = null;

    @property([SpriteFrame])
    bomb_anim_frames: SpriteFrame[] = [];

    @property
    duration: number = 0.08;
}

@ccclass('CannonBullet')
export class CannonBullet extends Component {
    @property
    bullet_level: number = 1;

    @property([BulletSkin])
    bullet_skin_res: BulletSkin[] = [];

    private anim: Node;
    private phy_params: any;

    onLoad() {
        this.anim = this.node.getChildByName("anim");
        this.anim.addComponent(SpriteAnimation);
        this._set_bullet_idle();
    }

    _set_bullet_idle() {
        const s = this.anim.getComponent(Sprite);
        s.spriteFrame = this.bullet_skin_res[this.bullet_level - 1].bullet_icon;
    }

    shoot_at(level: number, w_start_pos: Vec3, w_dst_pos: Vec3) {
        if (!this.node.parent) {
            return;
        }
        this._set_bullet_idle();
        this.bullet_level = level;
        this.phy_params = cannon_bullet_params[this.bullet_level - 1];

        const start_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(w_start_pos);
        let dst_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(w_dst_pos);

        this.node.setPosition(start_pos);
        this.anim.angle = 0;

        const dir = w_dst_pos.subtract(w_start_pos);
        const len = dir.length();
        const time = len / this.phy_params.speed;

        const ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
        const ctrl_y = Math.max(start_pos.y, dst_pos.y) + 40;
        const ctrl_point_set = [v3(ctrl_x, ctrl_y), v3(ctrl_x, ctrl_y), dst_pos];

        tween(this.node)
            .bezierTo(time, ctrl_point_set)
            .call(() => {
                this.on_bullet_bomb(w_dst_pos);
                this.play_bullet_bomb_anim();
            })
            .start();

        const degree = w_dst_pos.x < w_start_pos.x ? -180 + Math.random() * 10 : 180 - Math.random() * 10;
        tween(this.anim)
            .to(time, { angle: degree })
            .start();
    }

    play_bullet_bomb_anim() {
        this.anim.angle = 0;
        const frame_com = this.anim.getComponent(SpriteAnimation);
        frame_com.sprite_frames = this.bullet_skin_res[this.bullet_level - 1].bomb_anim_frames;
        frame_com.duration = this.bullet_skin_res[this.bullet_level - 1].duration;

        frame_com.play_once(() => {
            this.node.removeFromParent();
        });
    }

    on_bullet_bomb(w_dst_pos: Vec3) {
        const bomb_R = this.phy_params.bomb_R;
        const bomb_pos = this.node.getPosition();

        const enemy_set = ugame.get_enemy_set();
        for (let i = 0; i < enemy_set.length; i++) {
            const pos = enemy_set[i].getPosition();
            const dir = pos.subtract(bomb_pos);
            if (dir.length() <= bomb_R) {
                const actor = enemy_set[i].getComponent(Actor);
                actor.on_bomb_bullet_attack(this.phy_params.attack);
            }
        }
    }
}
