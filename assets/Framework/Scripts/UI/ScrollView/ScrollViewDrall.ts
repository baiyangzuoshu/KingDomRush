import { _decorator, Component, instantiate, Layout, Node, Prefab, ScrollView } from 'cc';
import { ScrollViewDrallItem } from './ScrollViewDrallItem';
import { CollectLabelInNode } from './CollectLabelInNode';
const { ccclass, property } = _decorator;

@ccclass('ScrollViewDrall')
export class ScrollViewDrall extends Component {

    @property(ScrollView)
    scrollView = null;

    @property(Prefab)
    preItem = null;

    protected onLoad(): void {
        
        let list = [];
        for(let i = 0; i< 20; i++){
            let item = {
                id: 'id_' + i,
                des: 'hello scrollVoew' + i
            }
            list.push(item)
        }

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            var itemNode = instantiate(this.preItem);
            itemNode.getComponent(ScrollViewDrallItem).setData(element.id,element.des);
            this.scrollView.content.addChild(itemNode)
        }

        var layout = this.scrollView.content.getComponent(Layout);
        layout.updateLayout();

        
    }

    start() {
        var reParentr = this.scrollView.getComponent(CollectLabelInNode); 
        reParentr.ReAllLabelParent();
    }

    update(deltaTime: number) {
        
    }
}


