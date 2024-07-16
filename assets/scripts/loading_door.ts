import { _decorator, Component, Node, director, Vec2, tween } from 'cc';
import { Vec3 } from 'cc';
import { view } from 'cc';
import { SoundManager } from './modules/sound_manager';

const { ccclass, property } = _decorator;

@ccclass('LoadingDoor')
export class LoadingDoor extends Component {
    @property
    door_state: number = 0;

    @property
    anim_duration: number = 0.1;

    private l_door: Node;
    private r_door: Node;

    onLoad() {
        this.l_door = this.node.getChildByName("l_door");
        this.r_door = this.node.getChildByName("r_door");

        this._setDoorState(this.door_state);
    }

    start() { }

    private _setDoorState(state: number) {
        this.door_state = state;

        const winSize = view.getVisibleSize();

        if (this.door_state === 0) { // Closed
            this.l_door.setPosition(new Vec3(2, this.l_door.position.y));
            this.r_door.setPosition(new Vec3(-2, this.r_door.position.y));
        } else if (this.door_state === 1) { // Opened
            this.l_door.setPosition(new Vec3(-winSize.width * 0.5, this.l_door.position.y));
            this.r_door.setPosition(new Vec3(winSize.width * 0.5, this.r_door.position.y));
        }
    }

    setDoorState(state: number) {
        if (this.door_state === state) {
            return;
        }

        this._setDoorState(state);
    }

    closeTheDoor(endFunc?: Function) {
        if (this.door_state === 0) {
            return;
        }

        const winSize = view.getVisibleSize();
        this.door_state = 0;

        this.l_door.setPosition(new Vec3(-winSize.width * 0.5, this.l_door.position.y));
        this.r_door.setPosition(new Vec3(winSize.width * 0.5, this.r_door.position.y));

        tween(this.l_door)
            .to(this.anim_duration, { position: new Vec3(2, this.l_door.position.y) })
            .start();

        tween(this.r_door)
            .to(this.anim_duration, { position: new Vec3(-2, this.r_door.position.y) })
            .call(() => {
                // Play closing door sound effect
                SoundManager.instance.play_effect("resources/sounds/close_door.mp3");
                if (endFunc) {
                    endFunc();
                }
            })
            .start();
    }

    openTheDoor(endFunc?: Function) {
        if (this.door_state === 1) {
            return;
        }

        this.door_state = 1;
        this.l_door.setPosition(new Vec3(2, this.l_door.position.y));
        this.r_door.setPosition(new Vec3(-2, this.r_door.position.y));

        const winSize = view.getVisibleSize();

        tween(this.l_door)
            .to(this.anim_duration, { position: new Vec3(-winSize.width * 0.5, this.l_door.position.y) })
            .start();

        tween(this.r_door)
            .to(this.anim_duration, { position: new Vec3(winSize.width * 0.5, this.r_door.position.y) })
            .call(() => {
                if (endFunc) {
                    endFunc();
                }
            })
            .start();
    }
}
