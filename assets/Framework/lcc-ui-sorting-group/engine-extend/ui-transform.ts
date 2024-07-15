import { UITransform } from "cc";
import { JSB } from "cc/env";

declare module 'cc' {
    interface UITransform {
        
        /**
         * 排序优先级 - private
         */
        _sortingPriority:number;

        /**
         * 排序优先级
         */
        sortingPriority:number;

        /**
         * 排序优使能 - private
         */
        _sortingEnabled:boolean;

        /**
         * 排序优使能
         */
        sortingEnabled:boolean;
    }
}

if(!('sortingPriority' in UITransform.prototype)){
    Object.defineProperty(UITransform.prototype, 'sortingPriority', {
        get: function() { 
            return this._sortingPriority; 
        },
        set: function(value) { 
            this._sortingPriority = value;
            if(JSB){
                this.node.uiSortingPriority = value;
            }
        },
        enumerable: true
    });

    Object.defineProperty(UITransform.prototype, 'sortingEnabled', {
        get: function() { 
            return this._sortingEnabled; 
        },
        set: function(value) { 
            this._sortingEnabled = value;
            if(JSB){
                this.node.uiSortingEnabled = value;
            }
        },
        enumerable: true
    });
}
