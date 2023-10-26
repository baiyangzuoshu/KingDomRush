// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ResManagerPro } from "../FrameWork/manager/ResManagerPro";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameApp extends cc.Component {
    private static _instance:GameApp=null
    private canvas:cc.Node=null
    private progressBar:cc.ProgressBar=null
    // LIFE-CYCLE CALLBACKS:

    public static getInstance():GameApp{
        return GameApp._instance
    }

    public enterGame():void{
        
    }

    public async startGame():Promise<void>{
        //加载资源
        this.progressBar.progress=0.1;
        await ResManagerPro.Instance.IE_LoadBundleAndAllAssets("prefabs",cc.Prefab);
        this.progressBar.progress=0.5;
        await ResManagerPro.Instance.IE_LoadBundleAndAllAssets("Sounds",cc.AudioClip);
        this.progressBar.progress=0.8;
        await ResManagerPro.Instance.IE_LoadBundleAndAllAssets("textures",cc.SpriteFrame);
        this.progressBar.progress=1;
    }

    onLoad () {
        if(null===GameApp._instance){
            GameApp._instance=this
        }
        else{
            this.destroy()
            return
        }

        this.canvas=cc.find("Canvas")
        this.progressBar=this.canvas.getChildByName("myProgressBar").getComponent(cc.ProgressBar)
        this.progressBar.progress=0
    }

    start () {

    }

    // update (dt) {}
}
