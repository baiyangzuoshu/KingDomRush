import { Component, Node, TextAsset, find } from 'cc';
import { SceneManager } from '../../Framework/Scripts/Managers/SceneManager';
import { TimerManager } from '../../Framework/Scripts/Managers/TimerManager';
import { UIManager } from '../../Framework/Scripts/Managers/UIManager';
import { ECSFactory } from './ECS/ECSFactory';


export class GameApp extends Component {
    public static Instance: GameApp = null;

    protected onLoad(): void {
        if(GameApp.Instance !== null) {
            this.destroy();
            return;
        }

        GameApp.Instance = this;
    }

    public Init(): void {
        
    }

    public async EnterGame() {
        SceneManager.Instance.EnterScene("start");
    }
}


