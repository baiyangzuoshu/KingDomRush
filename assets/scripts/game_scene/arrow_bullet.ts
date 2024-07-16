import { v3, Vec2, v2, tween, UITransform, _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
import { Actor } from './actor';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

export const arrow_bullet_params = [
    { speed: 200, attack: 10 },
    { speed: 220, attack: 20 },
    { speed: 240, attack: 30 },
    { speed: 260, attack: 40 },
];

@ccclass('ArrowBullet')
export class ArrowBullet extends Component {
    @property
    speed: number = 200;

    @property
    attack: number = 10;

    @property
    bullet_level: number = 1;

    @property(SpriteFrame)
    arrow_sprite_frame: SpriteFrame = null;

    @property(SpriteFrame)
    decal_arrow_sprite_frame: SpriteFrame = null;

    private anim: Node;
    private shoot_enemy: Node = null;

    onLoad() {
        this.anim = this.node.getChildByName('anim');
    }

    shoot_at(level: number, w_start_pos: Vec2, w_dst_pos: Vec2, enemy: Node) {
        if (!this.node.parent) {
            console.log("shoot_at must add to parent first");
            return;
        }

        this.bullet_level = level;
        this.speed = arrow_bullet_params[this.bullet_level - 1].speed;
        this.shoot_enemy = enemy;

        const start_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(w_start_pos.x, w_start_pos.y));
        let dst_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(w_dst_pos.x, w_dst_pos.y));

        this.node.setPosition(start_pos);
        this.anim.angle = 90;

        const dir = w_dst_pos.subtract(w_start_pos);
        const len = dir.length();
        const time = len / this.speed;

        if (this.shoot_enemy !== null) {
            const actor = this.shoot_enemy.getComponent(Actor);
            const after_pos = actor.position_after_time(time);
            const pos = this.shoot_enemy.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(after_pos.x, after_pos.y));
            w_dst_pos = v2(pos.x, pos.y);
            dst_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(w_dst_pos.x, w_dst_pos.y));
        }

        const ctrl_x = (start_pos.x + dst_pos.x) * 0.5;
        let ctrl_y = Math.max(start_pos.y, dst_pos.y) + 40;

        const ctrl_point_set = [v2(ctrl_x, ctrl_y), v2(ctrl_x, ctrl_y), dst_pos];
        const bezierAction = tween().to(time, { position: dst_pos }, { easing: 'linear' });

        const changeSpriteFunc = () => {
            const s = this.anim.getComponent(Sprite);
            s.spriteFrame = this.decal_arrow_sprite_frame;
            this.on_bullet_shoot(w_dst_pos);
        };

        const removeNodeFunc = () => {
            this.node.removeFromParent();
        };

        tween(this.node)
            .then(bezierAction)
            .call(changeSpriteFunc)
            .delay(3)
            .removeSelf()
            .start();

        const degree = w_dst_pos.x < w_start_pos.x ? -180 + Math.random() * 10 : 180 - Math.random() * 10;
        tween(this.anim)
            .by(time, { angle: degree })
            .start();
    }

    on_bullet_shoot(w_dst_pos: Vec2) {
        if (this.shoot_enemy === null || !ugame.is_enemy_active(this.shoot_enemy)) {
            return;
        }

        const actor = this.shoot_enemy.getComponent(Actor);
        actor.on_arrow_bullet_attack(arrow_bullet_params[this.bullet_level - 1].attack);

        this.node.removeFromParent();
    }
}
