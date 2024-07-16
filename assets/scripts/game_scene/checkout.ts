import { _decorator, Component, Node, Label } from 'cc';
import { utils } from '../modules/utils';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('Checkout')
export class Checkout extends Component {
    @property([String])
    game_tips: string[] = [];

    private failed_root: Node;
    private passed_root: Node;
    private tip: Label;
    private star1: Node;
    private star2: Node;
    private star3: Node;

    onLoad() {
        this.failed_root = this.node.getChildByName('failed_root');
        this.passed_root = this.node.getChildByName('passed_root');
        
        this.tip = this.failed_root.getChildByName('tip').getComponent(Label);

        this.star1 = this.passed_root.getChildByName('star1');
        this.star2 = this.passed_root.getChildByName('star2');
        this.star3 = this.passed_root.getChildByName('star3');
    }

    show_failed() {
        this.node.active = true;
        if (this.game_tips.length > 0) {
            const index = utils.random_int(0, this.game_tips.length - 1);
            this.tip.string = this.game_tips[index];
        }
        this.failed_root.active = true;
        this.passed_root.active = false;
    }

    show_passed(total: number, last: number) {
        this.node.active = true;
        this.failed_root.active = false;
        this.passed_root.active = true;

        let score = 1;
        this.star1.active = true;

        if (last > 2 * total / 3) {
            score = 3;
            this.star2.active = true;
            this.star3.active = true;
        } else if (last > total / 3) {
            score = 2;
            this.star2.active = true;
            this.star3.active = false;
        } else {
            this.star2.active = false;
            this.star3.active = false;
        }

        const cur_user = ugame.get_cur_user();
        const cur_level = ugame.get_cur_level();

        if (score > cur_user.level_info[cur_level]) {
            const add_value = score - cur_user.level_info[cur_level];
            cur_user.level_info[cur_level] = score;
            cur_user.star_num += add_value;
            ugame.sync_user_data();
        }
    }
}
