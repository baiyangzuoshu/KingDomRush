import UIBase from "../../FrameWork/ui/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HitTestDemo extends UIBase {
    onLoad() {

        this.loadMainGUI("HitTest","Main");
        this.guiMakeFullScreen();
    }
}
