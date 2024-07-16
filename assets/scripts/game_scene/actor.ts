import { find } from 'cc';
import { v3 } from 'cc';
import { SpriteFrame } from 'cc';
import { _decorator, Component, Node, ProgressBar, Vec2, Vec3  } from 'cc';
import { SpriteAnimation } from '../common/frame_anim';
import { ugame } from '../modules/ugame';
import { v2 } from 'cc';

const { ccclass, property } = _decorator;
export const State = {
    IDLE: 0, // 静止状态
    WALK: 1, // 行走状态
    ATTACK: 2, // 攻击
    DEAD: 3, // 死亡状态
    ARRIVED: 4, // 到达目的地
};


export const Direction = {
    INVALID_DIR: -1,
    UP_DIR: 0,
    DOWN_DIR: 1,
    LEFT_DIR: 2,
    RIGHT_DIR: 3,
};

class walk_anim_params {
    anim_frames: SpriteFrame[] = [];
    anim_duration: number = 0.1;
    scale_x: number = 1;
}

@ccclass('Actor')
export class Actor extends Component {
    @property([walk_anim_params])
    walk_anim_set: walk_anim_params[] = [];

    private speed: number = 50;
    private state: number = State.IDLE;
    private blood_bar: ProgressBar;
    private anim: Node;
    private frame_anim: SpriteAnimation;
    private anim_dir: number = Direction.INVALID_DIR;
    private actor_params: any = null;
    private game_scene: any;
    private is_paused: boolean = false;
    private road_data: Vec2[] = [];
    private next_step: number = 1;
    private walk_time_total: number = 0;
    private walk_time: number = 0;
    private vx: number = 0;
    private vy: number = 0;
    health: number = 0;
    attack: number = 0;
    player_hurt: number = 0;

    onLoad() {
        this.blood_bar = this.node.getChildByName("blood_bar").getComponent(ProgressBar);
        this.anim = this.node.getChildByName("anim");
        this.frame_anim = this.anim.addComponent(SpriteAnimation);

        this.game_scene = find("UI_ROOT").getComponent("game_scene");
    }

    set_actor_params(actor_params: any) {
        this.actor_params = actor_params;
        this.speed = this.actor_params.speed;
        this.health = this.actor_params.health;
        this.attack = this.actor_params.attack;
        this.player_hurt = this.actor_params.player_hurt;
    }

    gen_at_road(road_data: Vec2[]) {
        if (road_data.length < 2) {
            return;
        }

        this.road_data = road_data;
        this.state = State.WALK;

        this.node.setPosition(v3(road_data[0].x, road_data[0].y, 0));
        this.next_step = 1;
        this.walk_to_next();
    }

    play_walk_anim(dir: Vec2) {
        const r = Math.atan2(dir.y, dir.x);
        let now_dir = Direction.INVALID_DIR;

        if (r >= -Math.PI && r < -0.75 * Math.PI) {
            now_dir = Direction.LEFT_DIR;
        } else if (r >= -0.75 * Math.PI && r < -0.25 * Math.PI) {
            now_dir = Direction.DOWN_DIR;
        } else if (r >= -0.25 * Math.PI && r < 0.25 * Math.PI) {
            now_dir = Direction.RIGHT_DIR;
        } else if (r >= 0.25 * Math.PI && r < 0.75 * Math.PI) {
            now_dir = Direction.UP_DIR;
        } else {
            now_dir = Direction.LEFT_DIR;
        }

        if (now_dir == this.anim_dir) {
            return;
        }

        this.anim_dir = now_dir;
        this.frame_anim.stop_anim();
        this.frame_anim.sprite_frames = this.walk_anim_set[this.anim_dir].anim_frames;
        this.frame_anim.duration = this.walk_anim_set[this.anim_dir].anim_duration;
        this.anim.scale = v3(this.walk_anim_set[this.anim_dir].scale_x,1,1);
        this.frame_anim.play_loop();
    }

    walk_to_next() {
        this.state = State.WALK;

        const start_pos = this.node.getPosition();
        const end_pos = this.road_data[this.next_step];
        const dir = end_pos.subtract(v2(start_pos.x,start_pos.y));
        const len = dir.length();
        this.walk_time_total = len / this.speed;

        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.walk_time = 0;

        this.play_walk_anim(dir);
    }

    attack_player() {
        this.game_scene.on_player_attacked(this.player_hurt);
        ugame.remove_enemy(this.node);
        this.node.removeFromParent();
    }

    position_after_time(dt: number): Vec2 {
        if (this.state != State.WALK) {
            return v2(this.node.getPosition().x,this.node.getPosition().y);
        }

        let prev_pos = this.node.getPosition();
        let next_step = this.next_step;

        while (dt > 0 && next_step < this.road_data.length) {
            const now_pos = this.road_data[next_step];
            const dir = now_pos.subtract(v2(prev_pos.x,prev_pos.y));
            const len = dir.length();

            const t = len / this.speed;
            if (dt > t) {
                dt -= t;
                prev_pos = v3(now_pos.x,now_pos.y,0);
                next_step++;
            } else {
                const vx = this.speed * dir.x / len;
                const vy = this.speed * dir.y / len;
                prev_pos = prev_pos.add(new Vec3(vx * dt, vy * dt));
                return v2(prev_pos.x,prev_pos.y);
            }
        }

        return this.road_data[next_step - 1];
    }

    walk_update(dt: number) {
        if (this.state != State.WALK) {
            return;
        }

        this.walk_time += dt;
        if (this.walk_time >= this.walk_time_total) {
            dt -= (this.walk_time - this.walk_time_total);
        }

        let _x=this.node.position.x + this.vx * dt;
        let _y=this.node.position.y + this.vy * dt;
        this.node.setPosition(v3(_x,_y,0));

        if (this.walk_time >= this.walk_time_total) {
            this.next_step++;
            if (this.next_step >= this.road_data.length) {
                this.state = State.ARRIVED;
                this.attack_player();
            } else {
                this.walk_to_next();
            }
        }
    }

    update(dt: number) {
        if (!ugame.is_game_started) {
            this.frame_anim.stop_anim();
            return;
        }

        if (ugame.is_game_paused) {
            this.frame_anim.stop_anim();
            this.is_paused = true;
            return;
        }

        if (this.is_paused) {
            this.frame_anim.play_loop();
            this.is_paused = false;
        }

        if (this.state == State.WALK) {
            this.walk_update(dt);
        }
    }

    on_common_bullet_attack(attack_value: number) {
        this.health -= attack_value;
        if (this.health <= 0) {
            this.health = 0;
            ugame.add_chip(this.actor_params.bonues_chip);
            this.game_scene.show_game_uchip();
            this.state = State.DEAD;
            ugame.remove_enemy(this.node);
            this.node.removeFromParent();
        } else {
            this.blood_bar.progress = this.health / this.actor_params.health;
        }
    }

    on_bomb_bullet_attack(attack_value: number) {
        this.on_common_bullet_attack(attack_value);
    }

    on_warlock_bullet_attack(attack_value: number) {
        this.on_common_bullet_attack(attack_value);
    }

    on_arrow_bullet_attack(attack_value: number) {
        this.on_common_bullet_attack(attack_value);
    }
}
