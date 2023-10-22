
import { ResManager } from './ResManager';

class Panel{
    public prefab:cc.Prefab=null
    public opening:boolean=false
    public open:boolean=false
    public closeTime:number=0
    public self:cc.Node=null
}
/*
1.代码中构建ui，驱动游戏
2.ui身上挂载代码，驱动游戏
*/
export class UIManager extends cc.Component {
    public static _instance:UIManager=null
    public static getInstance():UIManager{
        return UIManager._instance
    }
    private _canvas:Node=null
    private _allShowPanel={}
    private _localZOrder=1000

    onLoad(){
        if(null==UIManager._instance){
            UIManager._instance=this
        }
        else{
            this.destroy()
        }

        this._canvas=cc.find("Canvas") as unknown as Node
    }

    public getPrefabByName(uiName:string):cc.Node{
        let panel=this._allShowPanel[uiName] as Panel
        if(panel){
            return panel.self
        }
        return null
    }

    private createPrefab(uiName):cc.Prefab{
        let prefab=ResManager.getInstance().getAssetByName("prefabs","UI/"+uiName) as cc.Prefab
        if(!prefab){
            console.error("createPrefab error",uiName)
            return null
        }

        return prefab
    }

    public createOnlyPrefab(uiName):cc.Prefab{
        let prefab=this.createPrefab(uiName)

        return prefab
    }

    public showPrefab(uiName:string):number{
        if(!this._allShowPanel[uiName]){
            this._allShowPanel[uiName]=new Panel()

            let prefab=this.createPrefab(uiName)
            this._allShowPanel[uiName].prefab=prefab
        }
        let panel=this._allShowPanel[uiName] as Panel

        if(panel.open){
            return -1
        }

        panel.opening=true
        panel.open=false
        panel.closeTime=0

        let prefab=panel.prefab as cc.Prefab
        let node=cc.instantiate(prefab)
        node.parent=this._canvas as any
        node.setSiblingIndex(this._localZOrder++)
        
        panel.self=node

        node.addComponent(prefab.data.name+"Control")

        return 0
    }

    public closePrefab(uiName:string):number{
        let panel=this._allShowPanel[uiName] as Panel
        if(!panel){
            console.error("closePrefab !panel ",uiName)
            return -1
        }
        if(!panel.open){
            console.error("closePrefab !panel.open",uiName)
            return -2
        }
        panel.open=false
        panel.opening=false
        panel.closeTime=30

        let node=panel.self
        node.removeFromParent()

        this._localZOrder--

        return 0
    }

    public showUI(uiName:string,parent?:any):cc.Node{
        let prefab=ResManager.getInstance().getAssetByName("prefabs","UI/"+uiName) as cc.Prefab
        if(!prefab){
            console.error("showUI error",uiName)
            return
        }
        
        parent=parent? parent:this._canvas

        let node=cc.instantiate(prefab)
        node.parent=parent

        node.addComponent(prefab.data.name+"Control")

        return node
    }

    update(dt){
        for(let uiName in this._allShowPanel){
            let panel=this._allShowPanel[uiName] as Panel
            if(panel.opening){
                panel.open=true
                panel.opening=false
            }
            else if(!panel.open){
                if(panel.closeTime>0){
                    panel.closeTime-=dt
                }
                else{
                    let prefab=ResManager.getInstance().getAssetByName("prefabs","UI/"+uiName) as cc.Prefab
                    let ts=panel.self.getComponent(prefab.data.name+"Control") as any
                    if(ts){
                        ts.cleanUp()
                    }
                    delete this._allShowPanel[uiName]
                }
            }
        }
    }
}

