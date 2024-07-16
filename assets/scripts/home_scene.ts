import { _decorator, Component, find, Animation, Node, Label, director, systemEvent, SystemEventType } from 'cc';
import { EventKeyboard } from 'cc';
import { AnimationClip } from 'cc';
import { SoundManager } from './modules/sound_manager';
import { ugame } from './modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {
    private loadingDoor: any;
    private gameStarted: boolean = false;
    private startAnimCom: Animation;
    private startClickAnimClip: AnimationClip;
    private uinfoEnterAnimCom: Animation;
    private outside: boolean = false; // Indicates if the scene has transitioned out

    onLoad() {
        this.loadingDoor = find("UI_ROOT/anchor-center/loading_door").getComponent("loading_door");
        
        this.startAnimCom = find("UI_ROOT/anchor-center/start_anim_root").getComponent(Animation);
        const clipArray = this.startAnimCom.clips;
        this.startClickAnimClip = clipArray[1];
        this.uinfoEnterAnimCom = find("UI_ROOT/anchor-center/user_game_info_root").getComponent(Animation);

        // Play background music
        SoundManager.instance.play_music("resources/sounds/music/home_scene_bg.mp3", true);

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        console.log(event.keyCode);
        // Handle specific key presses if needed
    }

    setStarScore(userNode: Node, user: any) {
        const starScoreLabel = userNode.getChildByName("star_score").getComponent(Label);
        starScoreLabel.string = `${user.star_num} / ${user.star_total}`;
    }

    showUserData() {
        this.setStarScore(find("UI_ROOT/anchor-center/user_game_info_root/user1"), ugame.user_data[0]);
        this.setStarScore(find("UI_ROOT/anchor-center/user_game_info_root/user2"), ugame.user_data[1]);
        this.setStarScore(find("UI_ROOT/anchor-center/user_game_info_root/user3"), ugame.user_data[2]);
    }

    start() {
        // Display user data on the UI
        this.showUserData();

        // Play start animation after a delay
        this.scheduleOnce(() => {
            this.startAnimCom.play("home_scene_start_anim");
        }, 0.5);
    }

    startGame() {
        if (this.gameStarted) return;
        
        this.gameStarted = true;

        // Play button click sound
        SoundManager.instance.play_effect("resources/sounds/click.wav");

        // Play start button click animation
        this.startAnimCom.play("start_button_click_anim");

        // Schedule user info entrance animation after the start button animation completes
        this.scheduleOnce(() => {
            this.uinfoEnterAnimCom.play("uinfo_enter_anim");
        }, this.startAnimCom.clips[0].duration);
    }

    closeUinfoDlg() {
        // Play user info close animation
        this.uinfoEnterAnimCom.play("reverse_uinfo_enter_anim");

        // Schedule the start button return animation
        this.scheduleOnce(() => {
            this.gameStarted = false;
            this.startAnimCom.play("reverse_start_button_click_anim");
        }, this.uinfoEnterAnimCom.clips[0].duration);
    }

    closeDoor() {
        this.loadingDoor.setDoorState(0);
        this.scheduleOnce(() => {
            this.loadingDoor.openTheDoor();
        }, 0.5);
    }

    gotoAbout() {
        if (this.outside) return;
        this.outside = true;

        // Play button click sound
        SoundManager.instance.play_effect("resources/sounds/click.wav");

        this.loadingDoor.closeTheDoor(() => {
            this.scheduleOnce(() => {
                director.loadScene("about_scene");
            }, 0.5);
        });
    }

    onUserEntryClick(event: Event, userIndex: string) {
        if (this.outside) return;
        this.outside = true;

        const index = parseInt(userIndex);
        ugame.set_cur_user(index);

        // Play button click sound
        SoundManager.instance.play_effect("resources/sounds/click.wav");

        this.loadingDoor.closeTheDoor(() => {
            this.scheduleOnce(() => {
                director.loadScene("roadmap_scene");
            }, 0.5);
        });
    }

    // Uncomment if using update method
    // update(dt: number) {
    // }
}
