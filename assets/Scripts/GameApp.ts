// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../FrameWork/manager/EventManager";
import { ResManager } from "../FrameWork/manager/ResManager";
import { ResManagerPro } from "../FrameWork/manager/ResManagerPro";
import { UIManager } from "../FrameWork/manager/UIManager";
import Cmd from "./Cmd";
import Enum from "./Enum";
import Stype from "./Stype";

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
        UIManager.getInstance().showUI("Login",this.canvas)
    }

    private test():void{
        ResManagerPro.Instance.Init();
    }

    public startGame():void{
        //加载资源
        let pkg={
            "prefabs":cc.Prefab,
            "img":cc.SpriteFrame,
            "Sounds":cc.AudioClip,
            "data":cc.TextAsset,
            "proto":cc.TextAsset,
            "UI":cc.BufferAsset
            //"UI":[{assetType:cc.BufferAsset,urls:["Bag"]},{assetType:cc.SpriteFrame,urls:["Bag_atlas0"]}],
        }
        this.progressBar.progress=0
        ResManager.getInstance().parsePkg(pkg,(cur,total)=>{
            console.log("cur total",cur,total)
            this.progressBar.progress=cur*1.0/total
        },()=>{
            console.log("end")
            //加载游戏
            this.progressBar.node.active=false
            //测试1
            //this.enterGame()

            //测试2
            this.test();
        })
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
        this.progressBar=this.canvas.getChildByName("ProgressBar").getComponent(cc.ProgressBar)
        this.progressBar.progress=0

        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this,true)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMoved,this,true)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnded,this,true)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this,true)
    }

    touchStart(e:cc.Event.EventTouch):void{
        EventManager.getInstance().emit(Enum.EventName.TouchStart,e)
    }

    touchMoved(e:cc.Event.EventTouch):void{
        EventManager.getInstance().emit(Enum.EventName.TouchMoved,e)
    }

    touchEnded(e:cc.Event.EventTouch):void{
        EventManager.getInstance().emit(Enum.EventName.TouchEnded,e)
    }

    touchCancel(e:cc.Event.EventTouch):void{
        EventManager.getInstance().emit(Enum.EventName.TouchCancel,e)
    }

    start () {

    }

    // update (dt) {}
}
