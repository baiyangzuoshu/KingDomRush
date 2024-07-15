import { _decorator, Component, instantiate, Label, Layout, math, Node, ScrollView, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollectLabelInNode')
export class CollectLabelInNode extends Component {
    
    private labelRoot: Node = null;
    private content: Node = null;

    public onLoad(): void {
        this.content = this.node.getComponent(ScrollView).content;
        if(!this.content) {
            return;
        }

        this.labelRoot = instantiate(this.content);
        this.labelRoot.setParent(this.content.parent);
        this.labelRoot.removeAllChildren();
        this.labelRoot.getComponent(Layout).destroy();
    }

    public ReAllLabelParent(): void {
        
        var labels: Label[]  = this.content.getComponentsInChildren(Label);
        for(let i = 0; i < labels.length; i ++) {
            var worldPos =  labels[i].node.worldPosition.clone();
            labels[i].node.setParent(this.labelRoot);   
            labels[i].node.setWorldPosition(worldPos);
        }
        
    }

    lateUpdate(deltaTime: number) {
        this.labelRoot.setWorldPosition(this.content.worldPosition);
    }
}


