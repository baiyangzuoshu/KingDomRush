const { ccclass, property } = cc._decorator;

@ccclass
export class UIControl extends cc.Component {
    public view:any={}
    onLoad() {
        this.traverseAllChildren(this.node,"")
    }
    
    start():void{

    }

    cleanUp():void{

    }

    private traverseAllChildren(node:cc.Node,url:string):void
    {
        for(let i=0;i<node.children.length;i++)
        {
            let child=node.children[i]
            let name=child.name
            this.view[url+name]=child

            this.traverseAllChildren(child,url+name+"/")
        }
    }

    getChildByUrl(url:string):cc.Node{
        return this.view[url] as cc.Node
    }

    buttonAddClickEvent(url:string,func:Function,target:any):void{
        let node=this.getChildByUrl(url)
        if(!node){
            console.error("buttonAddClickEvent url=",url)
            return
        }

        let btn=node.getComponent(cc.Button) as cc.Button
        if(!btn){
            console.error("buttonAddClickEvent btn",url)
            return
        }
 
        node.on("click",func,target)
    }

    
}

