import { Enemy } from "../Enum"

export default class MapDataManager extends cc.Component {
    private static _instance:MapDataManager=null
    onLoad () {
        if(null===MapDataManager._instance){
            MapDataManager._instance=this
        }
        else{
            this.destroy()
            return
        }
    }

    public static getInstance():MapDataManager{
        return MapDataManager._instance
    }

    public level_data1 = [
        // 1
        {
            desic: "3个哥布林",
            delay: 0, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: false, // 随机的选择怪物放出的路径
            road_set: [1, 0, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励,也可以按照概率来报
            },
            
        },
        
        
        // 2
        {
            desic: "6个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 6,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 3
        {
            desic: "9个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 9,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 4 
        {
            desic: "4个哥布林和1个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 5,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 5
        {
            desic: "3个兽人",
            delay: 5, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small3, Enemy.Small3, Enemy.Small3], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10,// 玩家打死怪物的奖励
            },
            
        },
        
        // 6
        {
            desic: "10个哥布林和4个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 14,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 0.5, 
                           3.5, 0.5, 
                           3.5, 0.5, 0.5, 0.5, 0.5,
                           3.5, 0.5,
                        ],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 7
        {
            delay: 5, // 放出第二波怪物
            num: 16,
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1,
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
            
            gen_time_set: [0, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5,
                           0.5, 0.5, 0.5, 0.5,
                        ],
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 50, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        }
    ]
    public level_data2 = [
        // 1
        {
            desic: "3个哥布林",
            delay: 0, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: false, // 随机的选择怪物放出的路径
            road_set: [1, 0, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励,也可以按照概率来报
            },
            
        },
        
        
        // 2
        {
            desic: "6个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 6,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 3
        {
            desic: "9个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 9,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 4 
        {
            desic: "4个哥布林和1个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 5,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 5
        {
            desic: "3个兽人",
            delay: 5, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small3, Enemy.Small3, Enemy.Small3], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10,// 玩家打死怪物的奖励
            },
            
        },
        
        // 6
        {
            desic: "10个哥布林和4个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 14,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 0.5, 
                           3.5, 0.5, 
                           3.5, 0.5, 0.5, 0.5, 0.5,
                           3.5, 0.5,
                        ],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 7
        {
            delay: 5, // 放出第二波怪物
            num: 16,
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1,
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
            
            gen_time_set: [0, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5,
                           0.5, 0.5, 0.5, 0.5,
                        ],
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 50, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        }
    ]
    public level_data3 = [
        // 1
        {
            desic: "3个哥布林",
            delay: 0, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: false, // 随机的选择怪物放出的路径
            road_set: [1, 0, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励,也可以按照概率来报
            },
            
        },
        
        
        // 2
        {
            desic: "6个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 6,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.6, 0.6, 3.6, 0.6, 0.6],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 3
        {
            desic: "9个哥布林",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 9,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small1, Enemy.Small1, Enemy.Small1],
            gen_time_set: [0, 0.5, 0.5, 3.0, 0.5, 0.5, 3, 0.5, 0.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 4 
        {
            desic: "4个哥布林和1个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 5,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                  Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 3.5],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 5
        {
            desic: "3个兽人",
            delay: 5, // 每波怪物的时间间隔
            num: 3, // 这一波，我们释放多少个怪物
            
            type: [Enemy.Small3, Enemy.Small3, Enemy.Small3], // 当前这个怪物的类型
            gen_time_set: [0, 0.5, 0.5],
            
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2], // 规定要走的路劲
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10,// 玩家打死怪物的奖励
            },
            
        },
        
        // 6
        {
            desic: "10个哥布林和4个兽人",
            delay: 5, // 第一波放出后，间隔多少时间再，放出第二波怪物,
            num: 14,
            
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small3, Enemy.Small3],
            gen_time_set: [0, 0.5, 0.5, 0.5, 0.5, 
                           3.5, 0.5, 
                           3.5, 0.5, 0.5, 0.5, 0.5,
                           3.5, 0.5,
                        ],
           
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: { 
                speed: 50, // 速度
                health: 30, // 血
                attack: 10, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        },
        
        // 7
        {
            delay: 5, // 放出第二波怪物
            num: 16,
            type: [Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1,
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1, 
                   Enemy.Small1, Enemy.Small1, Enemy.Small1, Enemy.Small1],
            
            gen_time_set: [0, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5, 
                           0.5, 0.5, 0.5, 0.5,
                           0.5, 0.5, 0.5, 0.5,
                        ],
            random_road: true, // 随机的选择怪物放出的路径
            road_set: [0, 1, 2],
            
            actor_params: {
                speed: 50, // 速度
                health: 30, // 血
                attack: 50, // 攻击力
                player_hurt: 1, // 对玩家的伤害值
                bonues_chip: 10, // 玩家打死怪物的奖励
            },
        }
    ]
}
