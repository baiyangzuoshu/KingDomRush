
export class ResManager extends cc.Component {
    private totalAsset:number=0
    private curAsset:number=0
    private totalRes:number=0
    private curRes:number=0
    private endCb:Function=null
    private processCb:Function=null
    private bundles:any={}

    public static _istance:ResManager=null
    public static getInstance():ResManager{
        return ResManager._istance
    }

    onLoad(){
        if(ResManager._istance==null){
            ResManager._istance=this
        }
        else{
            this.destroy()
        }
    }

    getBundleByName(abName:string,url:string):cc.AssetManager.Bundle{
        let bundle:cc.AssetManager.Bundle=this.bundles[abName]
        if(!bundle){
            console.error("getAssetByName error",abName,url)
            return null
        }

        return bundle
    }

    getAssetByName(abName:string,url:string):cc.Asset{
        let bundle:cc.AssetManager.Bundle=this.bundles[abName]
        if(!bundle){
            console.error("getAssetByName error",abName,url)
            return null
        }

        return bundle.get(url)
    }
    getAssetUrlsByName(abName:string):Array<string>{
        let bundle:cc.AssetManager.Bundle=this.bundles[abName]
        if(!bundle){
            console.error("getAssetUrlsByName error",abName)
            return []
        }

        let urls=[]
        let infos=bundle.getDirWithPath("/")
        for(let i=0;i<infos.length;i++){
            urls.push(infos[i].path)
        }
        return urls
    }
    // pkg格式
    // 1.{
    //     data:assetType
    // }
    // 2.{
    //     data:[
    //         {assetType:TextAsset,urls:[]}
    //     ]
    // }

    parsePkg(pkg:any,_processCb:Function,_endCb:Function):void{
        this.endCb=_endCb
        this.processCb=_processCb
        this.totalAsset=0
        this.totalRes=0
        this.curAsset=0
        this.curRes=0
        for(let abName in pkg){
            this.totalAsset++
            if(pkg[abName] instanceof Array){
                for(let i=0;i<pkg[abName].length;i++){
                    this.totalRes+=pkg[abName][i].urls.length
                }
            }
        }
        
        for(let abName in pkg){
            this.loadAssetBundle(abName,(err,bundle)=>{
                this.curAsset++

                if(!(pkg[abName] instanceof Array)){
                    let infos=bundle.getDirWithPath("/",pkg[abName])
                    this.totalRes+=infos.length
                    console.log(abName,infos,"this.totalRes=",this.totalRes)
                }
                
                if(this.curAsset>=this.totalAsset){
                    this.preloadAssetRes(pkg)
                }
            })
        }
    }

    loadAssetBundle(abName:string,_endCb:Function):void{
        cc.assetManager.loadBundle(abName,(err:Error,bundle:cc.AssetManager.Bundle)=>{
            if(err){
                console.error("loadAssetBundle error",err)
                return
            }

            this.bundles[abName]=bundle
            if(_endCb){
                _endCb(err,bundle)
            }
       }) 
    }
    preloadAssetRes(pkg:any):void{
        for(let abName in pkg){
            let bundle:cc.AssetManager.Bundle=this.bundles[abName]
            if(!bundle){
                continue
            }

            if(pkg[abName] instanceof Array){
                for(let i=0;i<pkg[abName].length;i++)
                {
                    this.loadAssetRes(abName,pkg[abName][i].assetType,pkg[abName][i].urls)
                }
            }
            else{
                let assetType=pkg[abName]
                let infos=bundle.getDirWithPath("/",pkg[abName])

                let urls=[]
                for(let i=0;i<infos.length;i++){
                    urls.push(infos[i].path)
                }

                this.loadAssetRes(abName,assetType,urls)
            }
        }
    }

    loadAssetRes(abName:string,assetType:any,urls:string[]):void{
        let bundle:cc.AssetManager.Bundle=this.bundles[abName]
        for(let k=0;k<urls.length;k++){
            bundle.load(urls[k],assetType,(err:Error,data:cc.Asset)=>{
                if(err){
                    console.error("loadAssetRes error=",err)
                    return
                }
                
                this.curRes++

                this.processCb(this.curRes,this.totalRes)
                if(this.curRes==this.totalRes){
                    this.endCb()
                }
            })
        }
    }
}

