import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('TowerBuilderGUI')
export class TowerBuilderGUI extends Component {

    private gui_builder: Node = null;
    private gui_undo: Node = null;
    private tower_builder: any = null;

    onLoad() {
        this.gui_builder = this.node.getChildByName("gui_builder");
        this.gui_undo = this.node.getChildByName("gui_undo");

        this.node.active = false;
    }

    show_tower_builder(tower_builder: any) {
        this.tower_builder = tower_builder;
        if (!this.tower_builder) {
            return;
        }

        this.node.active = true;
        this.gui_builder.active = true;
        this.gui_undo.active = false;

        this.node.setPosition(this.tower_builder.node.getPosition());
    }

    show_tower_undo(tower_builder: any) {
        this.tower_builder = tower_builder;
        if (!this.tower_builder) {
            return;
        }

        this.node.active = true;
        this.gui_builder.active = false;
        this.gui_undo.active = true;

        this.node.setPosition(this.tower_builder.node.getPosition());
    }

    on_build_tower_click(event: any, tower_type: string) {
        if (!this.tower_builder) {
            return;
        }

        this.tower_builder.on_tower_build_click(event, tower_type);
        this.close_gui_builder();
    }

    on_undo_tower_click() {
        if (!this.tower_builder) {
            return;
        }

        this.tower_builder.on_tower_undo_click();
        this.close_gui_builder();
    }

    on_upgrade_tower_click() {
        if (!this.tower_builder) {
            return;
        }
        this.tower_builder.on_tower_upgrade_click();
        this.close_gui_builder();
    }

    close_gui_builder() {
        this.node.active = false;
    }
}
