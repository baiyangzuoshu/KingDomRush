// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../../FrameWork/manager/EventManager";
import { UIManager } from "../../FrameWork/manager/UIManager";
import { UIControl } from "../../FrameWork/ui/UIControl";
import Enum from "../Enum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CityControl extends UIControl {
    // LIFE-CYCLE CALLBACKS:
    private _map:cc.Node=null
    onLoad () {
        super.onLoad()
        this._map=this.getChildByUrl("map")

        EventManager.getInstance().addEventListener(Enum.EventName.TouchStart,this.touchStart,this)
        EventManager.getInstance().addEventListener(Enum.EventName.TouchMoved,this.touchMoved,this)
        EventManager.getInstance().addEventListener(Enum.EventName.TouchEnded,this.touchEnded,this)
        EventManager.getInstance().addEventListener(Enum.EventName.TouchCancel,this.touchCancel,this)

        this.buttonAddClickEvent("map/build/ID_420",this.clickBtnEvent,this)
    }

    clickBtnEvent():void{
        let UINode:cc.Node=UIManager.getInstance().showUI("buildBtn1",this._map)
        if(UINode)
        {
            let id420=this.getChildByUrl("map/build/ID_420")
            let worldPos=id420.convertToWorldSpaceAR(cc.v2(0,-90))
            let nodePos=this._map.convertToNodeSpaceAR(worldPos)
            UINode.x=nodePos.x
            UINode.y=nodePos.y
        }
    }

    touchStart(_,e:cc.Event.EventTouch):void{
        //console.log("touchStart")
    }

    touchMoved(_,e:cc.Event.EventTouch):void{
        //console.log("touchMoved",e)
        let p=e.getDelta()
        this._map.x+=p.x
        this._map.y+=p.y
        let _width=59
        if(this._map.y<=(-464+30)){
            this._map.y=(-464+30)
        }
        if(this._map.y>=(560-225)){
            this._map.y=(560-225)
        }

        if(this._map.x<=-1024+720/2+_width){
            this._map.x=-1024+720/2+_width
        }
        if(this._map.x>=985-720/2+_width){
            this._map.x=985-720/2+_width
        }
    }

    touchEnded(_,e:cc.Event.EventTouch):void{
        UIManager.getInstance().closePrefab("buildBtn1")
        //console.log("touchEnded")
    }

    touchCancel(_,e:cc.Event.EventTouch):void{
        //console.log("touchCancel")
    }

    start () {

    }

    // update (dt) {}
}
