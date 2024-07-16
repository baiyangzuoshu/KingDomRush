import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelStar')
export class LevelStar extends Component {

    @property
    public star_num: number = 1; // test

    private star_set: Node[] = [null, null, null];

    onLoad() {
        this.star_set[0] = this.node.getChildByName("star1").getChildByName("star");
        this.star_set[1] = this.node.getChildByName("star2").getChildByName("star");
        this.star_set[2] = this.node.getChildByName("star3").getChildByName("star");

        // test show_level_star_info
        this.show_level_star_info(this.star_num);
    }

    // 显示我们当前关卡的成绩，几颗星
    show_level_star_info(star_num: number) {
        if (star_num < 0 || star_num > 3) {
            return;
        }

        let i: number;
        for (i = 0; i < star_num; i++) {
            this.star_set[i].active = true;
        }

        for (; i < 3; i++) {
            this.star_set[i].active = false;
        }
    }

    // Uncomment and implement if needed
    // update(dt: number) {

    // }
}
