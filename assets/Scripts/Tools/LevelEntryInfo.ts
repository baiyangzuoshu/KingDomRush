// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelEntryInfo extends UIControl {
    star_set: cc.Node[] = [];
    star_num: number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.star_set[0] = this.getChildByUrl("star1/star");
        this.star_set[1] = this.getChildByUrl("star2/star");
        this.star_set[2] = this.getChildByUrl("star3/star");
    }

    setData(star_num:number){
        this.star_num = star_num;
        this.show_level_star_info(this.star_num);
    }
    
    // 显示我们当前关卡的成绩，几颗星
    show_level_star_info(star_num:number) {
        if (star_num < 0 || star_num > 3) {
            return;
        }
        
        var i;
        for(i= 0; i < star_num; i ++) {
            this.star_set[i].active = true;    
        }
        
        for(; i < 3; i ++) {
            this.star_set[i].active = false;    
        }
    }
}
