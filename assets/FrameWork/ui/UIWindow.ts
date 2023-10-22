// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIWindow extends fgui.Window {
    public view:any={}
    public constructor() {
        super();
    }

    public loadWindow(pkgName: string, resName: string){
        this.contentPane = fgui.UIPackage.createObject(pkgName, resName).asCom;
        this.traverseAllChildren(this.contentPane,"")
        //console.log(this.view)
    }

    private traverseAllChildren(node:fgui.GComponent,url:string):void
    {
        if(!node||!node._children){
            return
        }
        
        for(let i=0;i<node._children.length;i++)
        {
            let child=node._children[i]
            let name=child.name
            this.view[url+name]=child

            this.traverseAllChildren(child.asCom,url+name+"/")
        }
    }

    public windowCenter(restraint?: boolean): void
    {
        this.center(restraint);
    }

    public getWindowChildByName(name: string): fgui.GObject
    {
        return this.contentPane.getChild(name)
    }

    public getWindowTransition(transName: string): fgui.Transition
    {
        return this.contentPane.getTransition(transName)
    }
}
