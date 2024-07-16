import { _decorator, Component, Animation, Graphics, Color, Vec2, v2 } from 'cc';
import { ugame } from '../modules/ugame';

const { ccclass, property } = _decorator;

@ccclass('RoadManager')
export class RoadManager extends Component {
    @property
    is_debug: boolean = false;

    private anim_com: Animation = null;
    private graphics: Graphics = null;
    private road_data_set: Vec2[][] = [];

    onLoad() {
        this.anim_com = this.getComponent(Animation);
        const clips = this.anim_com.clips;
        const clip = clips[0];

        this.graphics = this.addComponent(Graphics);
        this.graphics.fillColor = new Color(255, 0, 0, 255);
        const paths = []//clip.curveData.paths;

        for (const key in paths) {
            const road_data = paths[key].props.position;
            this.gen_path_data(road_data);
        }

        if (this.is_debug) {
            this.draw_roads();
        }

        ugame.set_map_road_set(this.road_data_set);
    }

    start() {
        // Test logic if needed
    }

    get_road_set(): Vec2[][] {
        return this.road_data_set;
    }

    gen_path_data(road_data) {
        let ctrl1: Vec2 = null;
        let start_point: Vec2 = null;

        const road_curve_path = []; // [start_point, ctrl1, ctrl2, end_point]

        for (let i = 0; i < road_data.length; i++) {
            const key_frame = road_data[i];
            if (ctrl1 !== null) {
                road_curve_path.push([start_point, ctrl1, ctrl1, v2(key_frame.value[0], key_frame.value[1])]);
            }

            start_point = v2(key_frame.value[0], key_frame.value[1]);

            for (let j = 0; j < key_frame.motionPath.length; j++) {
                const end_point = v2(key_frame.motionPath[j][0], key_frame.motionPath[j][1]);
                const ctrl2 = v2(key_frame.motionPath[j][2], key_frame.motionPath[j][3]);
                if (ctrl1 === null) {
                    ctrl1 = ctrl2;
                }
                road_curve_path.push([start_point, ctrl1, ctrl2, end_point]);
                ctrl1 = v2(key_frame.motionPath[j][4], key_frame.motionPath[j][5]);
                start_point = end_point;
            }
        }

        const one_road: Vec2[] = [road_curve_path[0][0]];

        for (const path of road_curve_path) {
            start_point = path[0];
            ctrl1 = path[1];
            const ctrl2 = path[2];
            const end_point = path[3];

            const len = this.bezier_length(start_point, ctrl1, ctrl2, end_point);
            const OFFSET = 16;
            const count = Math.floor(len / OFFSET);
            const t_delta = 1 / count;
            let t = t_delta;

            for (let i = 0; i < count; i++) {
                const x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
                const y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
                one_road.push(v2(x, y));
                t += t_delta;
            }
        }

        this.road_data_set.push(one_road);
    }

    draw_roads() {
        this.graphics.clear();

        for (const path of this.road_data_set) {
            for (const point of path) {
                this.graphics.moveTo(point.x - 1, point.y + 1);
                this.graphics.lineTo(point.x - 1, point.y - 1);
                this.graphics.lineTo(point.x + 1, point.y - 1);
                this.graphics.lineTo(point.x + 1, point.y + 1);
                //this.graphics.closePath();
            }
        }

        this.graphics.fill();
    }

    bezier_length(start_point: Vec2, ctrl1: Vec2, ctrl2: Vec2, end_point: Vec2): number {
        let prev_point = start_point;
        let length = 0;
        let t = 0.05;

        for (let i = 0; i < 20; i++) {
            const x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
            const y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
            const now_point = v2(x, y);
            const dir = now_point.subtract(prev_point);
            prev_point = now_point;
            length += dir.length();

            t += 0.05;
        }

        return length;
    }
}
