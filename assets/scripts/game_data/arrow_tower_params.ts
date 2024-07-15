var arrow_tower_params = [
    {
        search_R: 100,
        build_chip: 100, // 造这个塔的价值
    },

    {
        search_R: 120,
        build_chip: 220, // 造这个塔的价值,升级所带的消耗就是 220 - 100 = 120
    },

    {
        search_R: 140,
        build_chip: 340
    },
    {
        search_R: 160,
        build_chip: 540        
    },
];

module.exports = arrow_tower_params;
