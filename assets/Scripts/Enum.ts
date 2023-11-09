import NavComponent from "./ECS/Components/NavComponent";

export enum ViewUI{
    HomeUI="HomeUI",
    GameUI="GameUI",
    AboutUI="AboutUI",
    RoadMapUI="RoadMapUI",
}

export enum Enemy {
    Bear= 0,
    Forkman= 1,
    Small1= 2,
    Gorilla= 3,
    Small2= 4,
    Carry= 5,
    Small3= 6,
}

export enum TowerType{
    Arrow=1,
    Warlock=2,
    Cannon=3,
    Infantry=4,
}

export enum AnimateState{
    None=1,
    Start=2,
    Playing=3,
    Stop=4
}

export enum  ActorState{
    IDLE=0, // 静止状态
    WALK= 1, // 行走状态
    ATTACK= 2, // 攻击
    DEAD= 3, // 死亡状态
    ARRIVED= 4, // 到达目的地
}

export enum  ActorDirection{
    INVALID_DIR= -1,
    UP_DIR= 0,
    DOWN_DIR= 1,
    LEFT_DIR=2,
    RIGHT_DIR= 3,
}

export enum RoleState{
    None=1,
    Active=2,
    Dead=3,
    Clean=4
}