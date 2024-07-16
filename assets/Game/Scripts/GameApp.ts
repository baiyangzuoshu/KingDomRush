import { Component, Node, TextAsset, find } from 'cc';
import { SceneManager } from '../../Framework/Scripts/Managers/SceneManager';


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


