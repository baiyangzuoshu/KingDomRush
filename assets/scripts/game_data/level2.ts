import { Enemy } from '../modules/Enemy';

interface ActorParams {
    speed: number;
    health: number;
    attack: number;
    player_hurt: number;
    bonues_chip: number;
}

interface LevelData {
    desic?: string;
    delay: number;
    num: number;
    type: Enemy[];
    gen_time_set: number[];
    random_road: boolean;
    road_set: number[];
    actor_params: ActorParams;
}

const level2_data: LevelData[] = [
    {
        desic: "3个哥布林",
        delay: 0,
        num: 3,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1],
        gen_time_set: [0, 0.5, 0.5],
        random_road: false,
        road_set: [1, 0, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        desic: "6个哥布林",
        delay: 5,
        num: 6,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
        gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        desic: "9个哥布林",
        delay: 5,
        num: 9,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
        gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        desic: "4个哥布林和1个兽人",
        delay: 5,
        num: 5,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small3],
        gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        desic: "3个兽人",
        delay: 5,
        num: 3,
        type: [Enemy.Small3, Enemy.Small3, Enemy.Small3],
        gen_time_set: [0, 0.5, 0.5],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        desic: "10个哥布林和4个兽人",
        delay: 5,
        num: 14,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small3, Enemy.Small3, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small3, Enemy.Small3],
        gen_time_set: [0, 0.5, 0.5, 0.5, 0.5, 3.5, 0.5, 3.5, 0.5, 0.5, 0.5, 0.5, 3.5, 0.5],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 10,
            player_hurt: 1,
            bonues_chip: 10,
        },
    },
    {
        delay: 5,
        num: 16,
        type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
        gen_time_set: [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        random_road: true,
        road_set: [0, 1, 2],
        actor_params: {
            speed: 50,
            health: 30,
            attack: 50,
            player_hurt: 1,
            bonues_chip: 10,
        },
    }
];

export default level2_data;
