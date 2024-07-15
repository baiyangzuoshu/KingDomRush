import { _decorator, Component, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollViewDrallItem')
export class ScrollViewDrallItem extends Component {

    @property({
        type: Label
    })
    private labId  = null;

    @property({
        type: Label
    })
    private lab2  = null;

 
    setData(id: string, des: string){
        this.labId.string = id;
        this.lab2.string = des;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


