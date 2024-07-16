import { _decorator, Component, Node, SpriteFrame, Vec2, v2, v3, UITransform } from 'cc';
import { SpriteAnimation } from '../common/frame_anim';
import { Sprite } from 'cc';
import { Vec3 } from 'cc';
import { infantry_actor_params } from '../game_data/infantry_actor_params';

const { ccclass, property } = _decorator;

export class InfantryActorSkin {
    @property({ type: [SpriteFrame] })
    walk_anim: SpriteFrame[] = [];

    @property
    walk_duration: number = 0.1;

    @property({ type: [SpriteFrame] })
    attack_anim: SpriteFrame[] = [];

    @property
    attack_duration: number = 0.1;

    @property({ type: [SpriteFrame] })
    dead_anim: SpriteFrame[] = [];

    @property
    dead_duration: number = 0.1;
}

@ccclass('InfantryActor')
export class InfantryActor extends Component {
    @property
    actor_level: number = 1;

    @property({ type: [InfantryActorSkin] })
    actor_skin_set: InfantryActorSkin[] = [];

    private anim: Node;
    private state: number = 0;
    private walk_dst_pos: Vec3 = v3(0, 0,0);
    private walk_time: number = 0;
    private walk_vx: number = 0;
    private walk_vy: number = 0;
    private face_dir: number = 1;
    speed: number = 0;

    onLoad() {
        this.anim = this.node.getChildByName('anim');
        this.anim.addComponent(SpriteAnimation);
        this.setActorIdle(true);
    }

    setActorIdle(b_right: boolean) {
        this.anim.setScale(b_right ? 1 : -1, 1, 1);
        const s = this.anim.getComponent(Sprite);
        s.spriteFrame = this.actor_skin_set[this.actor_level - 1].walk_anim[0];
    }

    genActor(w_start_pos: Vec3, w_dst_pos: Vec2) {
        this.setActorIdle(true);
        this.speed = infantry_actor_params[this.actor_level - 1].speed;
        const pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(w_start_pos.x, w_start_pos.y));
        this.node.setPosition(pos);
        this.walkToDst(w_dst_pos);
    }

    walkToDst(w_dst_pos: Vec2) {
        this.state = 1;
        this.walk_dst_pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(w_dst_pos.x, w_dst_pos.y));
        const start_pos = this.node.getPosition();
        const dir = v2(this.walk_dst_pos.x - start_pos.x, this.walk_dst_pos.y - start_pos.y);
        const len = dir.length();
        this.walk_time = len / this.speed;
        this.walk_vx = this.speed * dir.x / len;
        this.walk_vy = this.speed * dir.y / len;

        if (this.walk_vx < 0) {
            this.face_dir = 0;
            this.anim.setScale(-1, 1, 1);
        } else {
            this.face_dir = 1;
            this.anim.setScale(1, 1, 1);
        }

        const frame_anim = this.anim.getComponent(SpriteAnimation);
        frame_anim.sprite_frames = this.actor_skin_set[this.actor_level - 1].walk_anim;
        frame_anim.duration = this.actor_skin_set[this.actor_level - 1].walk_duration;
        frame_anim.play_loop();
    }

    actorAi() {
        if (this.state === 3) {
            return;
        }
        // Add AI logic here
    }

    private walkUpdate(dt: number) {
        if (this.walk_time <= 0) {
            this.state = 0;
            const frame_anim = this.anim.getComponent(SpriteAnimation);
            frame_anim.stop_anim();
            this.setActorIdle(this.face_dir === 1);
            this.walk_vx = 0;
            this.walk_vy = 0;
            return;
        }

        if (this.walk_time < dt) {
            dt = this.walk_time;
        }

        this.node.setPosition(this.node.position.x + this.walk_vx * dt, this.node.position.y + this.walk_vy * dt);
        this.walk_time -= dt;
    }

    update(dt: number) {
        if (this.state === 0) {
            return;
        } else if (this.state === 1) {
            this.walkUpdate(dt);
            return;
        }
    }
}
