interface CannonBulletParams {
    speed: number;
    attack: number;
    bomb_R: number;
}

const cannon_bullet_params: CannonBulletParams[] = [
    { // 等级1的子弹
        speed: 200,
        attack: 10,
        bomb_R: 30,
    },
    { // 等级2的子弹
        speed: 200,
        attack: 20,
        bomb_R: 30,
    },
    { // 等级3的子弹
        speed: 200,
        attack: 30,
        bomb_R: 30,
    },
    { // 等级4的子弹
        speed: 200,
        attack: 30,
        bomb_R: 30,
    },
    { // 等级5的子弹
        speed: 200,
        attack: 10,
        bomb_R: 30,
    },
];

export default cannon_bullet_params;
