// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import FGUIManager from "../../FrameWork/manager/FGUIManager";
import { ResManager } from "../../FrameWork/manager/ResManager";
import { UIControl } from "../../FrameWork/ui/UIControl";
import BagDemo from "../demo/BagDemo";
import Cmd from "../Cmd";
import Stype from "../Stype";
import MainMenu from "../demo/MainMenu";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginControl extends UIControl {
    // LIFE-CYCLE CALLBACKS:
    private test=0
    private _currentDemo
    private _closeButton
    onLoad () {
        super.onLoad()

        this.buttonAddClickEvent("LoginPop/LoginPop1",this.buttonEvent,this)
        this.buttonAddClickEvent("LoginPop/LoginPop2",this.buttonEvent,this)
        this.buttonAddClickEvent("RegisterPop/RegisterPop11",this.buttonEvent,this)
        this.buttonAddClickEvent("RegisterPop/RegisterPop12",this.buttonEvent,this)
        
        let arr=[
            "MainMenu","Bag","Chat","HitTest","Basics","Cooldown","Guide","Joystick","LoopList","ListEffect",
            "PullToRefresh","ScrollPane","ModalWaiting","Transition","TreeView","VirtualList"
        ]
        arr.forEach((v,k,_)=>{
            console.log(v,k)
            FGUIManager.getInstance().loadPackageByBundle(ResManager.getInstance().getBundleByName("UI",v),v)
        })
        
        this.node.on("start_demo", this.onDemoStart, this);
    }

    onDemoStart(demo) {
        this._currentDemo = demo;
        this._closeButton = fgui.UIPackage.createObject("MainMenu", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100000;
        this._closeButton.onClick(this.onDemoClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
    }

    onDemoClosed() {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        this.node.removeComponent(this._currentDemo);

        this.addComponent(MainMenu);
    }

    buttonEvent(btn:cc.Button):void{
        let name=btn.node.name
        if("LoginPop2"==name){
            let LoginPop=this.getChildByUrl("LoginPop")
            let RegisterPop=this.getChildByUrl("RegisterPop")
            LoginPop.active=false
            RegisterPop.active=true
        }
        else if("RegisterPop12"==name){
            let LoginPop=this.getChildByUrl("LoginPop")
            let RegisterPop=this.getChildByUrl("RegisterPop")
            LoginPop.active=true
            RegisterPop.active=false
        }
        else if("RegisterPop11"==name){
            let unameNode=this.getChildByUrl("RegisterPop/RegisterPop6/New EditBox")
            let unameEditBox=unameNode.getComponent(cc.EditBox)
            let uname=unameEditBox.string
            let upwdNode=this.getChildByUrl("RegisterPop/RegisterPop66/New EditBox")
            let upwdEditBox=upwdNode.getComponent(cc.EditBox)
            let upwd=upwdEditBox.string
            console.log(uname,upwd)
            //立即注册
            let stype=Stype.Auth
            let ctype=Cmd.UnameRegisterReq
            let msg={uname:uname,upwd:upwd}
        }
        else if("LoginPop1"==name){
            let unameNode=this.getChildByUrl("LoginPop/LoginPop6/New EditBox")
            let unameEditBox=unameNode.getComponent(cc.EditBox)
            let uname=unameEditBox.string
            let upwdNode=this.getChildByUrl("LoginPop/LoginPop66/New EditBox")
            let upwdEditBox=upwdNode.getComponent(cc.EditBox)
            let upwd=upwdEditBox.string
            //登录
            let stype=Stype.Auth
            let ctype=Cmd.UnameLoginReq
            let msg={uname:uname,upwd:upwd}
        }
    }

    start () {

    }

    update (dt) {
        this.test++
        if(60==this.test){
            this.addComponent(MainMenu);
        }
    }
}
