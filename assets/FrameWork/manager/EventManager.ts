
class EventNode
{
    public func:Function=null
    public target:any=null
    public name:string=""
}

export class EventManager extends cc.Component {
    public static _instance:EventManager=null
    public static getInstance():EventManager{
        return EventManager._instance
    }
    private eventMap:any={}

    addEventListener(eventName:string,func:Function,target:any):void{
        if(!this.eventMap[eventName]){
            this.eventMap[eventName]=[]
        }

        let isExit=false
        for(let i=0;i<this.eventMap[eventName].length;i++){
            let node=this.eventMap[eventName][i] as EventNode
            if(node.func==func&&node.target==target){
                isExit=true
                break
            }
        }

        if(!isExit){
            let node=new EventNode
            node.func=func
            node.name=eventName
            node.target=target

            this.eventMap[eventName].push(node)
        }
    }

    removeEventListener(eventName:string,func:Function,target:any):void{
        if(!this.eventMap[eventName]){
            return
        }

        for(let i=0;i<this.eventMap[eventName].length;i++){
            let node=this.eventMap[eventName][i] as EventNode
            if(node.func==func&&node.target==target){
                delete this.eventMap[eventName][i]
                break
            }
        }
    }

    emit(eventName:string,data:any={}):void{
        if(!this.eventMap[eventName]){
            return
        }

        for(let i=0;i<this.eventMap[eventName].length;i++){
            let node=this.eventMap[eventName][i] as EventNode
            let func=node.func as Function
            func.call(node.target,data)
        }
    }

    onLoad(){
        if(null==EventManager._instance){
            EventManager._instance=this
        }
        else{
            this.destroy()
        }
    }
}

