import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
import { SoundManager } from '../modules/sound_manager';

const { ccclass, property } = _decorator;

@ccclass('AudioSwitch')
export class AudioSwitch extends Component {
    @property({ type: Number })
    public type: number = 0;

    @property({ type: SpriteFrame })
    public off_spriteframe: SpriteFrame = null;

    @property({ type: SpriteFrame })
    public on_spriteframe: SpriteFrame = null;

    private sp: Sprite = null;

    onLoad() {
        this.sp = this.getComponent(Sprite);
    }

    start() {
        if (this.type === 0) {
            this.sp.spriteFrame = SoundManager.instance.b_music_mute ? this.off_spriteframe : this.on_spriteframe;
        } else if (this.type === 1) {
            this.sp.spriteFrame = SoundManager.instance.b_effect_mute ? this.off_spriteframe : this.on_spriteframe;
        }
    }

    on_switch_click() {
        let b_mute: boolean;
        if (this.type === 0) {
            b_mute = !SoundManager.instance.b_music_mute;
            SoundManager.instance.set_music_mute(b_mute);
        } else if (this.type === 1) {
            b_mute = !SoundManager.instance.b_effect_mute;
            SoundManager.instance.set_effect_mute(b_mute);
        }

        this.sp.spriteFrame = b_mute ? this.off_spriteframe : this.on_spriteframe;
    }
}
