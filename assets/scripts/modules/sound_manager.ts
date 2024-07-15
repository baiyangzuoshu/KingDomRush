console.log("###### init_audio manager ############");

// 声音管理模块对象 
var sound_manager = {
    b_music_mute: -1, // 表示我们的背景音乐是否静音，0为没有静音，1为静音;
    b_effect_mute: -1, // 表示我们的音效是否静音，0为没有静音，1为静音;
    
    bg_music_name: null, // 保存我们的背景音乐的文件名称的;
    bg_music_loop: false,
    
    set_music_mute: function(b_mute) {
        if(this.b_music_mute == b_mute) { // 状态没有改变;
            return;
        }
        this.b_music_mute = (b_mute) ? 1 : 0;
        
        // 如果是静音，那么我们就是将背景的音量调整到0，否则为1:
        if (this.b_music_mute === 1) { // 静音
            // cc.audioEngine.setMusicVolume(0);
            cc.audioEngine.stopMusic(false); // 停止背景音乐播放
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
    }, 
    
    set_effect_mute: function(b_mute) {
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
    }, 
    
    stop_music: function() {
        cc.audioEngine.stopMusic(false); // 先停止当前正在播放的;
        this.bg_music_name = null;
    }, 
    
    // 播放背景音乐
    play_music: function(file_name, loop) {
        cc.audioEngine.stopMusic(false); // 先停止当前正在播放的;
        var url = cc.url.raw(file_name);
        this.bg_music_name = url; // 保存我们当前正在播放的背景音乐;
        this.bg_music_loop = loop;
        
        if (this.b_music_mute) {
            // cc.audioEngine.setEffectsVolume(0);
        }
        else {
            // cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.playMusic(url, loop); // 当我们调用playMusic的时候，volue又回到了1;
        }
    }, 
    // end
    
    // 播放背景音效:
    play_effect: function(file_name) {
        if (this.b_effect_mute) { // 如果音效静音了，直接return;
            return;
        }
        var url = cc.url.raw(file_name);
        cc.audioEngine.playEffect(url);
    }
    // end 
};


// 从本地获取这个用户的声音设置;
var music_mute = cc.sys.localStorage.getItem("music_mute");
if (music_mute) { // 如果本地有输出，才处理;
    music_mute = parseInt(music_mute);
}
else {
    music_mute = 0;
}
sound_manager.set_music_mute(music_mute);
// end

// 从本地获取这个用户的声音设置;
var effect_mute = cc.sys.localStorage.getItem("effect_mute");
if (effect_mute) { // 如果本地有输出，才处理;
    effect_mute = parseInt(effect_mute);
}
else {
    effect_mute = 0;
}
sound_manager.set_effect_mute(effect_mute);
// end

module.exports = sound_manager;


