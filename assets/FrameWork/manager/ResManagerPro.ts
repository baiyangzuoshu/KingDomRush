
export class ResManagerPro extends cc.Component {
    public static Instance: ResManagerPro = null!;

    protected onLoad(): void {
        if(ResManagerPro.Instance !== null) {
            this.destroy();
            return;
        }

        ResManagerPro.Instance = this;
    }

    private async IE_LoadBundle(bundleName: string) {
        return new Promise((resolve, reject)=>{
            cc.assetManager.loadBundle(bundleName, (err, bundleData)=>{
                if(err) {
                    console.log(err);
                    reject(null);
                    return;
                }
                else {
                    resolve(bundleData);
                    return;
                }
            })
        });
    }

    public async Init() {
        // 测试代码
        cc.assetManager.loadBundle("Scenes", (err, bundle: cc.AssetManager.Bundle)=>{
            if(err) {
                console.log(err);
                return;
            }

            console.log(bundle);
            var infos = bundle.getDirWithPath("", cc.SceneAsset);
            console.log(infos)
        });

        var bundle = await this.IE_LoadBundle("Sounds"); 
        console.log(bundle);

        var textData: cc.TextAsset = await this.IE_GetAsset("data", "map", cc.TextAsset) as any; 
        console.log(textData.text);
    }

    private async IE_LoadAllAssetsInBundle(bundle: cc.AssetManager.Bundle, assetType) {
        return new Promise((resolve, reject)=>{
            bundle.loadDir("", assetType as any, (err, infos)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(infos);
                }
            });
        });
    }

    private async IE_LoadAssetInBundle(bundle: cc.AssetManager.Bundle, assetName: string, assetType) {
        return new Promise((resolve, reject)=>{
            bundle.load(assetName, assetType, (err, assetData)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(assetData);
                }
            });
        });
    }

    private async IE_LoadSceneInBundle(bundle: cc.AssetManager.Bundle, sceneName: string) {
        return new Promise((resolve, reject)=>{
            bundle.loadScene(sceneName, (err, sceneData)=>{
                if(err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(sceneData);
                    return;
                }
            });
        });
    }

    public async IE_LoadBundleAndAllAssets(bundleName: string, assetType) {
        var bundle: cc.AssetManager.Bundle = await this.IE_LoadBundle(bundleName) as cc.AssetManager.Bundle; 
        if(bundle === null) {
            return null;
        }

        await this.IE_LoadAllAssetsInBundle(bundle, assetType);
    }

    public async IE_GetScene(bundleName: string, scenePath: string) {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        
        if(bundle === null) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            if(bundle === null) {
                // console.log("bundle load err: " + bundleName);
                return;
            }
        }
        
        var sceneData = await this.IE_LoadSceneInBundle(bundle, scenePath) as any;
        return sceneData;
    }

    public async IE_GetAsset(bundleName: string, assetPath: string, assetType) {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        if(bundle === null) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            if(bundle === null) {
                // console.log("bundle load err: " + bundleName);
                return;
            }
        }

        var assetData = bundle.get(assetPath,assetType);
        if(assetData) {
            return assetData; // 修改了没有返回资源的bug
        }

        assetData = await this.IE_LoadAssetInBundle(bundle, assetPath, assetType) as any;
        return assetData;
    }

    public ReleaseAsset(assetData: cc.Asset): void {
        cc.assetManager.releaseAsset(assetData);
    }

    public ReleaseAllAssetInBundle(bundleName): void {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle("bundleName");
        if(bundle === null) {
            return;
        }

        bundle.releaseAll();

        cc.assetManager.removeBundle(bundle);
    }
}


