
import { _decorator, Component, Node, ccenum, CCInteger, CCFloat, Enum, director, UI, UIRenderer, UITransform } from 'cc';
import { ORDER_IN_LAYER_MAX, SortingLayer } from './sorting-define';
const { ccclass, property, type, disallowMultiple, requireComponent, executeInEditMode } = _decorator;

@ccclass('lcc-ui/SortingGroup')
@requireComponent(UITransform)
@disallowMultiple(true)
@executeInEditMode(true)
export class SortingGroup extends Component {
    /**
     * 排序层
     */
    @type(Enum(SortingLayer))
    private _sortingLayer:SortingLayer = SortingLayer.DEFAULT;

    /**
     * 排序层
     */
    @type(Enum(SortingLayer))
    get sortingLayer(){
        return this._sortingLayer;
    }
    set sortingLayer(value:SortingLayer){
        this._sortingLayer = value;
        this.uiTransform.sortingPriority = Math.sign(this._sortingLayer) * (Math.abs(this._sortingLayer) * ORDER_IN_LAYER_MAX + this._orderInLayer);
    }
    
    /**
     * 排序值
     */
    @property({ type:CCFloat, min: 0, max : ORDER_IN_LAYER_MAX })
    private _orderInLayer:number = 0;

    /**
     * 排序值
     */
    @property({ type:CCFloat, min: 0, max : ORDER_IN_LAYER_MAX })
    get orderInLayer(){
        return this._orderInLayer;
    }
    set orderInLayer(value:number){
        this._orderInLayer = value;
        this.uiTransform.sortingPriority = Math.sign(this._sortingLayer) * (Math.abs(this._sortingLayer) * ORDER_IN_LAYER_MAX + this._orderInLayer);
    }

    /**
     * UITransform
     */
    private _uiTransform:UITransform = null;

    /**
     * UITransform
     */
    get uiTransform(){
        if(this._uiTransform == null){
            this._uiTransform = this.getComponent(UITransform);
        }
        return this._uiTransform;
    }

    onEnable(){
        this.uiTransform.sortingPriority = Math.sign(this._sortingLayer) * (Math.abs(this._sortingLayer) * ORDER_IN_LAYER_MAX + this._orderInLayer);
        this.uiTransform.sortingEnabled = true;
    }

    onDisable(){
        this.uiTransform.sortingPriority = 0;
        this.uiTransform.sortingEnabled = false;
    }
}
