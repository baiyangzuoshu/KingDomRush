interface ArrowTowerParams {
    search_R: number;
    build_chip: number; // 造这个塔的价值
}

const arrow_tower_params: ArrowTowerParams[] = [
    {
        search_R: 100,
        build_chip: 100,
    },
    {
        search_R: 120,
        build_chip: 220,
    },
    {
        search_R: 140,
        build_chip: 340,
    },
    {
        search_R: 160,
        build_chip: 540,
    },
];

export default arrow_tower_params;
