// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";
import Cmd from "../Cmd";
import Stype from "../Stype";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NickNameControl extends UIControl {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad()

        this.buttonAddClickEvent("ID_4478",this.btnEvent,this)
        this.buttonAddClickEvent("ID_4479",this.btnEvent,this)
        this.buttonAddClickEvent("createRoleBtn",this.btnEvent,this)
    }

    btnEvent(ref:cc.Button):void{
        let name=ref.node.name
        if("ID_4478"==name){
            let ID_4478=this.getChildByUrl("ID_4478")
            let ID_4479=this.getChildByUrl("ID_4479")
            ID_4478.setScale(1.1)
            ID_4479.setScale(1.0)
        }
        else if("ID_4479"==name){
            let ID_4478=this.getChildByUrl("ID_4478")
            let ID_4479=this.getChildByUrl("ID_4479")
            ID_4478.setScale(1.0)
            ID_4479.setScale(1.1)
        }
        else if("createRoleBtn"==name){
            //创建角色
            let nicknameNode=this.getChildByUrl("ID_447/New EditBox")
            let nicknameEditBox=nicknameNode.getComponent(cc.EditBox)
            let nickname=nicknameEditBox.string
            let sex=2
            let stype=Stype.Auth
            let ctype=Cmd.C2SUpdateUser
            let msg={uname:"maomao",sex:sex,name:nickname}
        }
    }

    start () {

    }

    // update (dt) {}
}
