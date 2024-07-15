import { _decorator, Asset, Component, isValid, Node } from 'cc';
const { ccclass, property } = _decorator;
/*
[不需要管理部分]
静态资源(拖挂到预制体上的资源)
cc.assetManager.loadRemote(官方不处理。也不addRef用完会在合适的时间自动释放)

[必须手动管理部分] 
cc.resources.load 
cc.resources.loadDir

[注意]
cc.assetManager.releaseAsset强制释放资源，不会进行引用计数检验所以使用需要确保别的地方没有正在用

[优点]
优雅简洁粒度小可精细管理生命周期管理扩展强只需一句话 
this.addAutoReleaseAsset(asset);
程序员再无须担心资源释放问题
*/
//扩展cc.Component增加两个接口
Component.prototype.addAutoReleaseAsset= function(_asset:Asset) {
    let tempAuto = this.node.getComponent(AutoReleaseAssets); 
    if(!isValid(tempAuto)){
        tempAuto = this.node.addComponent(AutoReleaseAssets);
        tempAuto.addAutoReleaseAsset(_asset);
    }
}

Component.prototype.addAutoReleaseAssets=function(_assets:Asset[]){
    let tempAuto = this.node.getComponent(AutoReleaseAssets);
	if(!isValid(tempAuto)){	
        tempAuto = this.node.addComponent(AutoReleaseAssets);
        for (const _assetOne of _assets){
            tempAuto.addAutoReleaseAsset(_assetOne);
        }
    }
}
//
@ccclass('AutoReleaseAssets')
export class AutoReleaseAssets extends Component {
    private dynamicsAssets:Asset[]=[];

    public addAutoReleaseAsset(_asset:Asset){
        if(isValid(_asset)){
            _asset.addRef();
            this.dynamicsAssets.push(_asset);
        }
    }

    protected onDestroy(): void {
        for(let i=0;i<this.dynamicsAssets.length;i++){
            if(isValid(this.dynamicsAssets[i])){
                this.dynamicsAssets[i].decRef();
            }
        }
        this.dynamicsAssets=[];
    }
}


