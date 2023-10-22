
class TimerNode
{
    public func:Function=null
    public params:any=null
    public delay:number=0
    public duration:number=0
    public timerId:number=0
    public totalTime:number=0
    public isRemoved:boolean=false
    public repeat:number=0
}

export class TimerManager extends cc.Component {
    public static _instance:TimerManager=null
    public static getInstance():TimerManager{
        return TimerManager._instance
    }
    private autoTimerId:number=0
    private timers:any={}
    private newAddTimerList:Array<TimerNode>=[]
    private removedTimerList:Array<TimerNode>=[]

    onLoad(){
        if(null==TimerManager._instance){
            TimerManager._instance=this
        }
        else{
            this.destroy()
            return
        }
    }
    public ScheduleOnce(_func:Function,_delay:number):number{
        return this.Schedule(_func,null,_delay,0,1)
    }

    public ShceduleOnce2(_func:Function,_params:any,_delay:number):number{
        return this.Schedule(_func,_params,_delay,0,1)
    }

    public Schedule(_func:Function,_params:any,_delay:number,_duration:number,_repeat:number):number{
        let node=new TimerNode()
        node.func=_func
        node.params=_params
        node.delay=_delay
        node.duration=_duration
        node.timerId=this.autoTimerId++
        node.totalTime=_duration
        node.isRemoved=false
        node.repeat=_repeat

        this.newAddTimerList.push(node)

        return node.timerId
    }

    public UnSchedule(timerId:number):void{
        if(!this.timers[timerId]){
            return
        }

        let node=this.timers[timerId] as TimerNode
        node.isRemoved=true
    }

    update(deltaTime: number) {
        for(let i=0;i<this.newAddTimerList.length;i++){
            let node=this.newAddTimerList[i]
            this.timers[node.timerId]=node
        }
        this.newAddTimerList.length=0

        for(let k in this.timers){
            let node=this.timers[k]
            if(node.isRemoved){
                this.removedTimerList.push(node)
                continue
            }

            node.totalTime+=deltaTime
            if(node.totalTime>=(node.delay+node.duration)){
                node.func(node.params)
                node.repeat--
                node.totalTime-=(node.delay+node.duration)
                node.delay=0

                if(0==node.repeat){
                    node.isRemoved=true
                    this.removedTimerList.push(node)
                }
            }
        }

        for(let i=0;i<this.removedTimerList.length;i++){
            let timerId=this.removedTimerList[i].timerId
            delete this.timers[timerId]
        }
        this.removedTimerList.length=0
    }
}

