import { _decorator, AudioSource, Component, sys } from 'cc';
const { ccclass } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    private static _instance: SoundManager;

    public b_music_mute: boolean = false;
    public b_effect_mute: boolean = false;

    private bg_music_name: string = null;
    private bg_music_loop: boolean = false;
    private audioSource: AudioSource = null;

    public static get instance(): SoundManager {
        if (!this._instance) {
            this._instance = new SoundManager();
            this._instance.init();
        }
        return this._instance;
    }

    private init() {
        const music_mute = sys.localStorage.getItem("music_mute");
        this.b_music_mute = music_mute ? Boolean(parseInt(music_mute)) : false;

        const effect_mute = sys.localStorage.getItem("effect_mute");
        this.b_effect_mute = effect_mute ? Boolean(parseInt(effect_mute)) : false;

        this.audioSource = this.getComponent(AudioSource);
    }

    public set_music_mute(mute: boolean) {
        if (this.b_music_mute === mute) return;

        this.b_music_mute = mute;
        if (mute) {
            this.audioSource.stop();
        } else if (this.bg_music_name) {
            this.play_music(this.bg_music_name, this.bg_music_loop);
        }
        sys.localStorage.setItem("music_mute", mute ? '1' : '0');
    }

    public set_effect_mute(mute: boolean) {
        if (this.b_effect_mute === mute) return;

        this.b_effect_mute = mute;
        sys.localStorage.setItem("effect_mute", mute ? '1' : '0');
    }

    public stop_music() {
        this.audioSource.stop();
        this.bg_music_name = null;
    }

    public play_music(file_name: string, loop: boolean) {
        this.stop_music();
        this.bg_music_name = file_name;
        this.bg_music_loop = loop;

        if (!this.b_music_mute) {
            //this.audioSource.clip = file_name; // You will need to load the AudioClip properly
            this.audioSource.loop = loop;
            this.audioSource.play();
        }
    }

    public play_effect(file_name: string) {
        if (!this.b_effect_mute) {
            // Use another AudioSource or AudioSourcePool to play effects
            const effectSource = new AudioSource();
            //effectSource.clip = file_name; // You will need to load the AudioClip properly
            effectSource.play();
        }
    }
}
