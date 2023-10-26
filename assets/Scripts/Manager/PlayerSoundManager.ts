// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerSoundManager extends cc.Component {
    private static _instance:PlayerSoundManager=null
    onLoad () {
        if(null===PlayerSoundManager._instance){
            PlayerSoundManager._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():PlayerSoundManager{
        return PlayerSoundManager._instance
    }

    b_music_mute: number=-1 // 表示我们的背景音乐是否静音，0为没有静音，1为静音;
    b_effect_mute:number= -1 // 表示我们的音效是否静音，0为没有静音，1为静音;
    
    bg_music_name:cc.AudioClip= null // 保存我们的背景音乐的文件名称的;
    bg_music_loop:boolean= false
    
    set_music_mute(b_mute) {
        if(this.b_music_mute == b_mute) { // 状态没有改变;
            return;
        }
        this.b_music_mute = (b_mute) ? 1 : 0;
        
        // 如果是静音，那么我们就是将背景的音量调整到0，否则为1:
        if (this.b_music_mute === 1) { // 静音
            // cc.audioEngine.setMusicVolume(0);
            cc.audioEngine.stopMusic(); // 停止背景音乐播放
        }
        else if(this.b_music_mute === 0) { // 打开
            if (this.bg_music_name) {
                cc.audioEngine.playMusic(this.bg_music_name, this.bg_music_loop)
            }
            
            cc.audioEngine.setMusicVolume(1);
        }
        // 将这个参数存储到本地;
        cc.sys.localStorage.setItem("music_mute", this.b_music_mute);
        // end 
    }
    
    set_effect_mute(b_mute) {
        if (this.b_effect_mute == b_mute) {
            return;
        }
        
        this.b_effect_mute = (b_mute) ? 1 : 0;
        /*if (this.b_effect_mute === 1) { // 静音
            cc.audioEngine.setEffectsVolume(0);
        }
        else if(this.b_effect_mute === 0){
            cc.audioEngine.setEffectsVolume(1);
        }*/
        
        // 将这个参数存储到本地;
        cc.sys.localStorage.setItem("effect_mute", this.b_effect_mute);
        // end 
    }
    
    stop_music() {
        cc.audioEngine.stopMusic(); // 先停止当前正在播放的;
        this.bg_music_name = null;
    }
    
    // 播放背景音乐
    play_music(file_name:cc.AudioClip, loop) {
        cc.audioEngine.stopMusic(); // 先停止当前正在播放的;
        this.bg_music_name = file_name; // 保存我们当前正在播放的背景音乐;
        this.bg_music_loop = loop;
        
        if (this.b_music_mute) {
            // cc.audioEngine.setEffectsVolume(0);
        }
        else {
            // cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.playMusic(file_name, loop); // 当我们调用playMusic的时候，volue又回到了1;
        }
    } 
    // end
    
    // 播放背景音效:
    play_effect(file_name:cc.AudioClip) {
        if (this.b_effect_mute) { // 如果音效静音了，直接return;
            return;
        }
        cc.audioEngine.playEffect(file_name,false);
    }
}
