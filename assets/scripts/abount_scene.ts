import { _decorator, Component, find, director } from 'cc';
import { HomeScene } from './home_scene';
import { LoadingDoor } from './loading_door';
import { SoundManager } from './modules/sound_manager';

const { ccclass, property } = _decorator;

@ccclass('LoadingManager')
export class LoadingManager extends Component {
    private door: LoadingDoor;
    private go_back: boolean = false;

    onLoad() {
        this.door = find("UI_ROOT/anchor-center/loading_door").getComponent(LoadingDoor);
    }

    start() {
        this.door.openTheDoor(null);
    }

    gotoHome() {
        if (this.go_back === true) {
            return;
        }
        SoundManager.instance.play_effect("resources/sounds/click.wav");

        this.go_back = true;
        this.door.closeTheDoor(() => {
            director.loadScene("home_scene", () => {
                const homeSceneNode = find("UI_ROOT");
                if (homeSceneNode) {
                    const homeScene = homeSceneNode.getComponent(HomeScene);
                    homeScene.closeDoor();
                }
            });
        });
    }
}
