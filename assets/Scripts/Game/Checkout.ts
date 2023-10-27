// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UIControl } from "../../FrameWork/ui/UIControl";
import GameDataManager from "../Data/GameDataManager";
import Utils from "../Tools/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Checkout extends UIControl {


    failed_root: cc.Node = null;
    passed_root: cc.Node = null;
    tip: cc.Label = null;
    star1: cc.Node = null;
    star2: cc.Node = null;
    star3: cc.Node = null;
    game_tips=[];
    // LIFE-CYC LE CALLBACKS:

    onLoad () {
        super.onLoad();

        this.failed_root = this.getChildByUrl("failed_root");
        this.passed_root = this.getChildByUrl("passed_root");
        
        this.tip = this.getChildByUrl("failed_root/tip").getComponent(cc.Label);

        this.star1 = this.getChildByUrl("passed_root/star1");
        this.star2 = this.getChildByUrl("passed_root/star2");
        this.star3 = this.getChildByUrl("passed_root/star3");
    }
    
    show_failed() {
        this.node.active = true;
        if (this.game_tips.length > 0) {
            var index = Utils.random_int(0, this.game_tips.length - 1);
            this.tip.string = this.game_tips[index];
        }
        this.failed_root.active = true;
        this.passed_root.active = false;
    }
    
    
    show_passed(total, last) {
        this.node.active = true;
        this.failed_root.active = false;
        this.passed_root.active = true;

        var score = 1;
        this.star1.active = true;
        // 评价得分
        if (last > 2 * total / 3) {
            score = 3;
            this.star2.active = true;
            this.star3.active = true;
        }
        else if (last > total / 3) {
            score = 2;
            this.star2.active = true;
            this.star3.active = false;
        }
        else {
            this.star2.active = false;
            this.star3.active = false;
        }

        var cur_user = GameDataManager.getInstance().get_cur_user();
        var cur_level = GameDataManager.getInstance().get_cur_level();

        if (score > cur_user.level_info[cur_level]) {
            var add_value = score - cur_user.level_info[cur_level];
            cur_user.level_info[cur_level] = score;
            cur_user.star_num += add_value;
            GameDataManager.getInstance().sync_user_data();
        }
    }
}
