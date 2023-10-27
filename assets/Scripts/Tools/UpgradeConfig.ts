// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameDataManager from "../Data/GameDataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UpgradeConfig extends cc.Component {
    outside:boolean = false;
    last_str_lable:cc.Label = null;
    config_items = []; // 技能0， 5个，技能1 5个，[[item1, item2, item3, item4, item5], [], [], [], [], []]

    // 0 表示置灰, 1，表示可以点击, 2 表示已经升级了，不能点击，但是不能置灰,隐藏掉金币数目
    _set_button_state(item, state) {
        var bt = item.getComponent(cc.Button);
        var bt1 = item.getChildByName("star_bg").getComponent(cc.Button);
        var bt2 = item.getChildByName("star_str").getComponent(cc.Button);
        if (state === 0) { // 置灰
            bt.interactable = false;
            bt.enableAutoGrayEffect = true;
            
            bt1.interactable = false;
            bt1.enableAutoGrayEffect = true;
            
            bt2.interactable = false;
            bt2.enableAutoGrayEffect = true;
            
            item.getChildByName("star_bg").active = true;
            item.getChildByName("star_str").active = true;
        }
        else if(state === 1) {
            bt.interactable = true;
            
            bt1.interactable = false;
            bt1.enableAutoGrayEffect = false;
            
            bt2.interactable = false;
            bt2.enableAutoGrayEffect = false;
            
            item.getChildByName("star_bg").active = true;
            item.getChildByName("star_str").active = true;
        }
        else if(state === 2) {
            bt.interactable = false;
            bt.enableAutoGrayEffect = false;
            
            item.getChildByName("star_bg").active = false;
            item.getChildByName("star_str").active = false;
        }
    } 
    
    // use this for initialization
    onLoad () {
        this.outside = false;
        var anim_root = this.node.getChildByName("anim_root");
        this.last_str_lable = anim_root.getChildByName("last_star").getComponent(cc.Label);
        
        this.config_items = []; // 技能0， 5个，技能1 5个，[[item1, item2, item3, item4, item5], [], [], [], [], []]
        for(var col = 0; col < 6; col ++) {
            var line_items = [];
            // 找到每一列的每一个item,加入数组
            var node = anim_root.getChildByName("skill" + (col + 1));
            for(var line = 0; line < 5; line ++) {
                var item = node.getChildByName("" + (line + 1));
                line_items.push(item);
                var button = item.addComponent(cc.Button);
                
                var eventHandler = new cc.Component.EventHandler();
                eventHandler.target = this.node;
                eventHandler.component = "UpgradeConfig";
                eventHandler.handler = "on_config_item_click";
                eventHandler.customEventData = ((col + 1) + "" + (line + 1));
                
                button.clickEvents = [eventHandler];
                
                item.getChildByName("star_bg").addComponent(cc.Button);
                item.getChildByName("star_str").addComponent(cc.Button);
                
                this._set_button_state(item, 1);
            }
            // end 
            this.config_items.push(line_items);
        }
        
        // this._show_skill_upgrade_config([0, 1, 2, 3, 4, 5]);
        var udata = GameDataManager.getInstance().get_cur_user();
        //console.log(udata.skill_level_info, udata.star_num)
        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }
    
    // [skill_level, skill2_level2, skill3_leve3, skill_4_leve3, skill5_level3, ]
    // [0, 1, 2, 3, 4, 5]
    _show_skill_upgrade_config(level_config_data, star_num) {
        // 根据我们用户当前的升级配置表，我们要计算出来，当前用户还剩下多少颗星星
        var last_star = star_num;
        var i, j, level;
        for(i = 0; i < level_config_data.length; i ++) {
            level = level_config_data[i];
            for(j = 0; j <= level; j ++) {
                let consume = GameDataManager.getInstance().tower_skills_upgrade_config[i][j];
                last_star -= consume;
            }
        }
        // end 
        
        for(i = 0; i < level_config_data.length; i ++) {
            // skill i 的级别
            level = level_config_data[i];
            var line_items = this.config_items[i]; // 这个技能的所有级别的按钮集合
            console.log(i,line_items)
            j = 0;
            for(j = 0; j < level; j ++) { // 表示你已经升级了
                this._set_button_state(line_items[j], 2);
            }
            // 把当前下一个升级的级别这里设置可以升级的状态;
            // 剩余的进步数目也要足够
            if (j < 5 && last_star >= GameDataManager.getInstance().tower_skills_upgrade_config[i][level + 1]) {
                this._set_button_state(line_items[j], 1);
                j ++;
            }
            // 后面都是不能点击的，状态要置灰
            for(; j < 5; j ++) {
                this._set_button_state(line_items[j], 0);
            }
            // end 
        }
        
        // 更新一下剩余的星星的数目;
        this.last_str_lable.string = "" + last_star;
        // end 
    }
    
    // 我们的配置升级点击
    // 11, skill, 1级别, 21 skill2, 1级别
    on_config_item_click(t, skill_level) {
        if (this.outside === true) {
            return;
        }
        
        skill_level = parseInt(skill_level);
        console.log(skill_level);
        
        var index = Math.floor(skill_level / 10); // 获取了这个的10位
        var level = skill_level - index * 10;
        index --;
        
        var udata = GameDataManager.getInstance().get_cur_user();
        udata.skill_level_info[index] = level;
        
        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }
    // end 
    
    // 完成按钮点击
    on_done_click() {
        if (this.outside === true) {
            return;
        }
        this.outside = true;
        // 保存用户数据
        GameDataManager.getInstance().sync_user_data();
        // end 
        
        // 隐藏掉这个界面
        var anim_com = this.node.getComponent(cc.Animation);
        anim_com.play("reserve_road_skill_upgrade_config");
        this.scheduleOnce(function() {
            this.node.active = false;
            this.outside = false;
        }.bind(this), anim_com.currentClip.duration);
        // end 
    }
    // end 
    
    // 重置按钮点击
    on_reset_click() {
        if (this.outside === true) {
            return;
        }
        
        var udata = GameDataManager.getInstance().get_cur_user();
        udata.skill_level_info = [0, 0, 0, 0, 0, 0];
        
        this._show_skill_upgrade_config(udata.skill_level_info, udata.star_num);
    }
}
