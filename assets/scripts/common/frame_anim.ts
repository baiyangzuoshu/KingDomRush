import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteAnimation')
export class SpriteAnimation extends Component {
    @property([SpriteFrame])
    public sprite_frames: SpriteFrame[] = [];

    @property
    public duration: number = 0.1;

    @property
    public loop: boolean = false;

    @property
    public play_onload: boolean = false;

    private sprite: Sprite = null;
    private is_playing: boolean = false;
    private play_time: number = 0;
    private is_loop: boolean = false;
    private end_func: Function = null;

    onLoad() {
        this.sprite = this.node.getComponent(Sprite);
        if (!this.sprite) {
            this.sprite = this.node.addComponent(Sprite);
        }

        this.is_playing = false;
        this.play_time = 0;
        this.is_loop = false;
        this.end_func = null;

        if (this.sprite_frames.length > 0) {
            this.sprite.spriteFrame = this.sprite_frames[0];
        }

        if (this.play_onload) {
            if (!this.loop) {
                this.play_once(null);
            } else {
                this.play_loop();
            }
        }
    }

    play_once(end_func: Function) {
        this.play_time = 0;
        this.is_playing = true;
        this.is_loop = false;
        this.end_func = end_func;
    }

    play_loop() {
        this.play_time = 0;
        this.is_playing = true;
        this.is_loop = true;
    }

    stop_anim() {
        this.play_time = 0;
        this.is_playing = false;
        this.is_loop = false;
    }

    update(dt: number) {
        if (!this.is_playing) {
            return;
        }

        this.play_time += dt;

        const index = Math.floor(this.play_time / this.duration);

        if (!this.is_loop) {
            if (index >= this.sprite_frames.length) {
                this.sprite.spriteFrame = this.sprite_frames[this.sprite_frames.length - 1];
                this.is_playing = false;
                this.play_time = 0;
                if (this.end_func) {
                    this.end_func();
                }
                return;
            } else {
                this.sprite.spriteFrame = this.sprite_frames[index];
            }
        } else {
            let loopedIndex = index;
            while (loopedIndex >= this.sprite_frames.length) {
                loopedIndex -= this.sprite_frames.length;
                this.play_time -= this.duration * this.sprite_frames.length;
            }
            this.sprite.spriteFrame = this.sprite_frames[loopedIndex];
        }
    }
}
