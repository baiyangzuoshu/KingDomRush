
export default class FGUIManager extends cc.Component {
    private guiObjects={}
    private static _instance:FGUIManager=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(null==FGUIManager._instance)
        {
            FGUIManager._instance=this
        }
        else{
            this.destroy()
            return
        }
        //创建UI根节点
        fgui.GRoot.create();
    }

    public static getInstance():FGUIManager{
        return FGUIManager._instance
    }

    public loadPackageByPath(path:string):number{
        if(this.guiObjects[path]){
            return -1;
        }

        fgui.UIPackage.loadPackage(path, this.onUILoaded.bind(this));

        return 0;
    }

    public loadPackageByBundle(bundle: cc.AssetManager.Bundle, path: string):number{
        if(this.guiObjects[path]){
            return -1;
        }
        
        fgui.UIPackage.loadPackage(bundle,path,this.onUILoaded.bind(this));

        return 0;
    }

    public onUILoaded(error: any, pkg: fgui.UIPackage) {
        if(error){
            console.error("onUILoaded error",error)
            return
        }
        this.guiObjects[pkg.path]=pkg;

        console.log("onUILoaded",error,pkg)
    }
}
