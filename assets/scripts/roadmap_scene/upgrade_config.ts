import { _decorator, Component, Node, Label, Button,Animation } from 'cc';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('UpgradeConfig')
export class UpgradeConfig extends Component {

    @property({ type: [Node], tooltip: 'Sprite frames for the buttons' })
    public sprite_frames: Node[] = [];

    @property
    public duration: number = 0.1;

    @property
    public loop: boolean = false;

    @property
    public play_onload: boolean = false;

    private outside: boolean = false;
    private last_star_label: Label;
    private config_items: Node[][] = [];

    // 0 表示置灰, 1，表示可以点击, 2 表示已经升级了，不能点击，但是不能置灰,隐藏掉金币数目
    private _set_button_state(item: Node, state: number) {
        const bt = item.getComponent(Button);
        const bt1 = item.getChildByName("star_bg").getComponent(Button);
        const bt2 = item.getChildByName("star_str").getComponent(Button);

        if (state === 0) { // 置灰
            bt.interactable = false;
            //bt.enableAutoGrayEffect = true;
            bt1.interactable = false;
            //bt1.enableAutoGrayEffect = true;
            bt2.interactable = false;
            //bt2.enableAutoGrayEffect = true;
            item.getChildByName("star_bg").active = true;
            item.getChildByName("star_str").active = true;
        } else if (state === 1) {
            bt.interactable = true;
            bt1.interactable = false;
            //bt1.enableAutoGrayEffect = false;
            bt2.interactable = false;
            //bt2.enableAutoGrayEffect = false;
            item.getChildByName("star_bg").active = true;
            item.getChildByName("star_str").active = true;
        } else if (state === 2) {
            bt.interactable = false;
            //bt.enableAutoGrayEffect = false;
            item.getChildByName("star_bg").active = false;
            item.getChildByName("star_str").active = false;
        }
    }

    onLoad() {
        this.outside = false;
        const anim_root = this.node.getChildByName("anim_root");
        this.last_star_label = anim_root.getChildByName("last_star").getComponent(Label);

        this.config_items = []; // 技能0， 5个，技能1 5个，[[item1, item2, item3, item4, item5], [], [], [], [], []]
        for (let col = 0; col < 6; col++) {
            const line_items: Node[] = [];
            // 找到每一列的每一个item,加入数组
            const node = anim_root.getChildByName("skill" + (col + 1));
            for (let line = 0; line < 5; line++) {
                const item = node.getChildByName("" + (line + 1));
                line_items.push(item);
                const button = item.addComponent(Button);

                const eventHandler = new Button.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "UpgradeConfig";
                eventHandler.handler = "on_config_item_click";
                eventHandler.customEventData = ((col + 1) + "" + (line + 1));

                button.clickEvents = [eventHandler];

                item.getChildByName("star_bg").addComponent(Button);
                item.getChildByName("star_str").addComponent(Button);

                this._set_button_state(item, 1);
            }
            this.config_items.push(line_items);
        }

        const udata = ugame.get_cur_user();
        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }

    // [skill_level, skill2_level2, skill3_leve3, skill_4_leve3, skill5_level3, ]
    // [0, 1, 2, 3, 4, 5]
    private _show_skill_upgrade_config(level_config_data: number[], star_num: number) {
        // 根据我们用户当前的升级配置表，我们要计算出来，当前用户还剩下多少颗星星
        let last_star = star_num;
        for (let i = 0; i < level_config_data.length; i++) {
            const level = level_config_data[i];
            for (let j = 0; j <= level; j++) {
                last_star -= ugame.tower_skills_upgrade_config[i][j];
            }
        }

        for (let i = 0; i < level_config_data.length; i++) {
            const level = level_config_data[i];
            const line_items = this.config_items[i]; // 这个技能的所有级别的按钮集合

            let j = 0;
            for (j = 0; j < level; j++) { // 表示你已经升级了
                this._set_button_state(line_items[j], 2);
            }
            // 把当前下一个升级的级别这里设置可以升级的状态;
            // 剩余的进步数目也要足够
            if (j < 5 && last_star >= ugame.tower_skills_upgrade_config[i][level + 1]) {
                this._set_button_state(line_items[j], 1);
                j++;
            }
            // 后面都是不能点击的，状态要置灰
            for (; j < 5; j++) {
                this._set_button_state(line_items[j], 0);
            }
        }

        // 更新一下剩余的星星的数目;
        this.last_star_label.string = "" + last_star;
    }

    // 我们的配置升级点击
    // 11, skill, 1级别, 21 skill2, 1级别
    on_config_item_click(event: Event, skill_level: string) {
        if (this.outside === true) {
            return;
        }

        const skillLevel = parseInt(skill_level);
        const index = Math.floor(skillLevel / 10) - 1; // 获取了这个的10位
        const level = skillLevel % 10;

        const udata = ugame.get_cur_user();
        udata.skill_level_info[index] = level;

        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }

    // 完成按钮点击
    on_done_click() {
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        // 保存用户数据
        ugame.sync_user_data();

        // 隐藏掉这个界面
        const anim_com = this.node.getComponent(Animation);
        anim_com.play("reserve_road_skill_upgrade_config");
        this.scheduleOnce(() => {
            this.node.active = false;
            this.outside = false;
        }, anim_com.clips[0].duration);
    }

    // 重置按钮点击
    on_reset_click() {
        if (this.outside === true) {
            return;
        }

        const udata = ugame.get_cur_user();
        udata.skill_level_info = [0, 0, 0, 0, 0, 0];

        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }
}
