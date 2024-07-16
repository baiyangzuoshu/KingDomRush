import { _decorator, Component, Node, Prefab, instantiate, Vec2, v2, Sprite, SpriteFrame, tween } from 'cc';
import { InfantryActor } from './infantry_actor';
import { v3 } from 'cc';

const { ccclass, property } = _decorator;
export class InfantrySkin {
    @property({ type: [SpriteFrame] })
    open_anim: SpriteFrame[] = [];

    @property
    anim_duration: number = 0.2;
}

@ccclass('InfantryTower')
export class InfantryTower extends Component {
    @property
    tower_level: number = 1;

    @property({ type: [InfantrySkin] })
    tower_skin: InfantrySkin[] = [];

    @property({ type: Prefab })
    actor_prefab: Prefab = null;

    @property
    actor_root_path: string = "UI_ROOT/map_root/bullet_root";

    private anim: Node = null;
    private actor_root: Node = null;

    _set_tower_idle() {
        const s = this.anim.getComponent(Sprite);
        s.spriteFrame = this.tower_skin[this.tower_level - 1].open_anim[0];
    }

    onLoad() {
        this.tower_level = 1;
        this.anim = this.node.getChildByName("anim");
        this._set_tower_idle();
        this.actor_root = this.node.parent.getChildByPath(this.actor_root_path);
    }

    _play_open_door_anim() {
        const frame_anim = this.anim.getComponent(Sprite);
        tween(frame_anim).sequence(
            tween(frame_anim)
                .to(this.tower_skin[this.tower_level - 1].anim_duration, { spriteFrame: this.tower_skin[this.tower_level - 1].open_anim }),
            tween(frame_anim).call(() => {
                this._set_tower_idle();
            })
        ).start();
    }

    _gen_actor(w_dst_pos: Vec2) {
        tween(this.node).delay(0.6).call(() => {
            const actor = instantiate(this.actor_prefab);
            this.actor_root.addChild(actor);
            actor.active = true;

            const com = actor.getComponent(InfantryActor);
            com.actor_level = this.tower_level;

            com.genActor(this.node.getWorldPosition(), w_dst_pos);
        }).start();
    }

    gen_infantry(w_dst_pos: Vec2) {
        this._play_open_door_anim();
        this._gen_actor(w_dst_pos);
    }

    start() {
        this.schedule(() => {
            const R = 60;
            const r = Math.random() * 2 * Math.PI;
            const w_dst_pos = this.node.getWorldPosition().add(v3(R * Math.cos(r), R * Math.sin(r)));

            this.gen_infantry(v2(w_dst_pos.x, w_dst_pos.y));
        }, 4);
    }

    upgrade_tower() {
        if (this.tower_level >= 4) {
            return this.tower_level;
        }

        this.tower_level++;
        this._set_tower_idle();
        return this.tower_level;
    }

    get_tower_level() {
        return this.tower_level;
    }
}
