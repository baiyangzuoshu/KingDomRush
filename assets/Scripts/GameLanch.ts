// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../FrameWork/manager/EventManager";
import { ExcelManager } from "../FrameWork/manager/ExcelManager";
import FGUIManager from "../FrameWork/manager/FGUIManager";
import { ResManager } from "../FrameWork/manager/ResManager";
import { ResManagerPro } from "../FrameWork/manager/ResManagerPro";
import { UIManager } from "../FrameWork/manager/UIManager";
import { UIManagerPro } from "../FrameWork/manager/UIManagerPro";
import GameDataManager from "./Data/GameDataManager";
import MapDataManager from "./Data/MapDataManager";
import ECSFactory from "./ECS/ECSFactory";
import ECSManager from "./ECS/ECSManager";
import NavSystem from "./ECS/Systems/NavSystem";
import GameApp from "./GameApp";
import PlayerSoundManager from "./Manager/PlayerSoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLanch extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
         //框架
         this.addComponent(FGUIManager)
         this.addComponent(ExcelManager)
         this.addComponent(EventManager)
         this.addComponent(ResManager)
         this.addComponent(UIManager)
         this.addComponent(ResManagerPro)
         this.addComponent(UIManagerPro)
         //游戏
         this.addComponent(GameApp)
         this.addComponent(GameDataManager)
         this.addComponent(PlayerSoundManager)
         this.addComponent(ECSFactory)
         this.addComponent(ECSManager)
         this.addComponent(NavSystem)
         this.addComponent(MapDataManager)
    }

    start () {
        GameApp.getInstance().startGame()
    }

    // update (dt) {}
}
