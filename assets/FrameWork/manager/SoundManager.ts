

export class SoundManager extends cc.Component {
    private static MUTE_TAG="BGMUSIC_MUTE"
    private static _instance:SoundManager=null
    public  static getInstance():SoundManager{
        return SoundManager._instance
    }

    private audioEffect:Array<cc.AudioSource>=[]
    private audioMax:number=8
    private bgMusic:cc.AudioSource=null
    private bgMusicMute:boolean=false
    private curAudioEffect:number=0

    onLoad(){
        if(null==SoundManager._instance){
            SoundManager._instance=this
        }
        else{
            this.destroy()
            return
        }

        for(let i=0;i<this.audioMax;i++){
            let as:cc.AudioSource=this.node.addComponent(cc.AudioSource)
            this.audioEffect.push(as)
        }

        this.bgMusic=this.node.addComponent(cc.AudioSource)
        let value=localStorage.getItem(SoundManager.MUTE_TAG)
        if(value){
            let mute=parseInt(value)
            this.bgMusicMute=mute==1
        }
    }

    playBgMusic(clip:cc.AudioClip,isLoop:boolean):void{
        this.bgMusic.stop()
        
        this.bgMusic.clip=clip
        this.bgMusic.loop=isLoop
        this.bgMusic.volume=1.0
        this.bgMusic.play()
    }

    stopBgMusic():void{
        this.bgMusic.stop()
    }

    playEffect(clip:cc.AudioClip):void{
        let as=this.audioEffect[this.curAudioEffect]
        as.clip=clip
        as.loop=false
        as.play()

        this.curAudioEffect++
        if(this.curAudioEffect>=this.audioMax){
            this.curAudioEffect=0
        }
    }

    playOneShotEffect(clip:cc.AudioClip,volumeScale?: number):void{
        let as=this.audioEffect[this.curAudioEffect]
        as.clip=clip
        as.loop=false
        //as.playOneShot(clip,volumeScale)

        this.curAudioEffect++
        if(this.curAudioEffect>=this.audioMax){
            this.curAudioEffect=0
        }
    }

    setBgMusicMute(mute:boolean):void{
        if(this.bgMusicMute==mute){
            return
        }

        let value=mute?"1":"0"
        localStorage.setItem(SoundManager.MUTE_TAG,value)
    }
}

