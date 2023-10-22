import UIBase from "../../FrameWork/ui/UIBase";
import UIWindow from "../../FrameWork/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BagDemo extends UIBase {
    private _bagWindow: UIWindow;

    onLoad() {
        this.loadMainGUI("Bag","Main");
        this.guiMakeFullScreen();

        this._bagWindow = new BagWindow();
        this.buttonAddClickEvent("bagBtn",() => { this._bagWindow.show(); }, this);
    }
}

class BagWindow extends UIWindow {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.loadWindow("Bag","BagWin");
        this.windowCenter();
    }

    protected onShown(): void {
        var list: fgui.GList = this.getWindowChildByName("list").asList;
        list.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = 45;
    }

    private renderListItem(index: number, obj: fgui.GObject): void {
        obj.icon = "Icons/i" + Math.floor(Math.random() * 10);
        obj.text = "" + Math.floor(Math.random() * 100);
    }

    private onClickItem(item: fgui.GObject): void {
        this.getWindowChildByName("n11").asLoader.url = item.icon;
        this.getWindowChildByName("n13").text = item.icon;
    }
}