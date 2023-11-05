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