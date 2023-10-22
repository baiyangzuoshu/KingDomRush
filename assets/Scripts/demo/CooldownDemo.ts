import UIBase from "../../FrameWork/ui/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CooldownDemo extends UIBase {
	private _btn0: fgui.GProgressBar = null!;
	private _btn1:fgui.GProgressBar = null!;

    onLoad() {
        this.loadMainGUI("Cooldown", "Main")
        this.guiMakeFullScreen();

        this._btn0 = this.getGUIChild("b0").asProgress
		this._btn1 = this.getGUIChild("b1").asProgress
        
        this._btn0.getChild("icon").icon = "Icons/k0";
		this._btn1.getChild("icon").icon = "Icons/k1";

        fgui.GTween.to(0, 100, 5).setTarget(this._btn0, "value").setRepeat(-1);
        fgui.GTween.to(10, 0, 10).setTarget(this._btn1, "value").setRepeat(-1);
    }
}
