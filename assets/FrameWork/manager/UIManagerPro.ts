import { ResManagerPro } from "./ResManagerPro"

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
export class UIManagerPro extends cc.Component {
    public static _instance:UIManagerPro=null
    public static getInstance():UIManagerPro{
        return UIManagerPro._instance
    }
    private _canvas:Node=null
    private _allShowPanel={}
    private _localZOrder=1000

    onLoad(){
        if(null==UIManagerPro._instance){
            UIManagerPro._instance=this
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

    private async createPrefab(uiName,bundleName="UI"):Promise<cc.Prefab>{
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs",bundleName+"/"+uiName,cc.Prefab) as cc.Prefab;
        if(!prefab){
            console.error("createPrefab error",uiName)
            return null
        }

        return prefab
    }

    public async createOnlyPrefab(uiName,bundleName="UI"):Promise<cc.Prefab>{
        let prefab=await this.createPrefab(uiName,bundleName)

        return prefab
    }

    public async showPrefab(uiName:string,bundleName="UI",parent?:any):Promise<any>{
        if(!this._allShowPanel[uiName]){
            this._allShowPanel[uiName]=new Panel()

            let prefab=await this.createPrefab(uiName,bundleName)
            this._allShowPanel[uiName].prefab=prefab
        }
        let panel=this._allShowPanel[uiName] as Panel

        if(panel.open){
            return null
        }

        panel.opening=true
        panel.open=false
        panel.closeTime=0

        parent=parent? parent:this._canvas

        let prefab=panel.prefab as cc.Prefab
        let node=cc.instantiate(prefab)
        node.parent=parent
        node.setSiblingIndex(this._localZOrder++)
        
        panel.self=node

        let ts=node.addComponent(prefab.data.name+"Control")

        return ts
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

    public async showUI(uiName:string,parent?:any):Promise<cc.Node>{
        let prefab=await ResManagerPro.Instance.IE_GetAsset("prefabs","UI/"+uiName,cc.Prefab) as cc.Prefab
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

    async update(dt){
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
                    let prefab=await this.createPrefab(uiName)
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

