import { _decorator, Component, Node } from 'cc';

export class EventManager extends Component {
    public static Instance: EventManager = null;

    private eventMap: any = null;  // {"eventName": [ {func: 回调的函数, caller: 函数里面的this}], "eventName": [], }

    protected onLoad(): void {
        if(EventManager.Instance !== null) {
           this.destroy();
           return; 
        }    

        EventManager.Instance = this;
    }

    public Init(): void {
        this.eventMap = {};
    }

    // func(eventName: string, udata: any)
    public AddEventListener(eventName: string, callback:Function, caller:any): void {
        if(!this.eventMap[eventName]) {
            this.eventMap[eventName] = []; // [函数1()， 函数2(), ....]
        }

        var listeners = this.eventMap[eventName];
        var listenNode = {
            func: callback,
            self: caller, 
        };

        listeners.push(listenNode);
    }

    public RemoveEventListener(eventName: string, callback, caller): void {
        if(!this.eventMap[eventName]) {
            return;
        }

        var listeners: Array<any> = this.eventMap[eventName] as Array<any>;
        for(var i = 0; i < listeners.length; i ++) {
            if(listeners[i].func === callback && listeners[i].self === caller) {
                listeners.splice(i, 1);
                // i --;
                return;
            }
        }
    }

    public async Emit(eventName: string, udata: any={}): Promise<void> {
        if(!this.eventMap[eventName]) {
            return;
        }

        var listeners: Array<any> = this.eventMap[eventName] as Array<any>;
        for(var i = 0; i < listeners.length; i ++) {
            await listeners[i].func.call(listeners[i].self, eventName, udata);
        }
    }

    public async EmitAll(eventName: string, udata: any={}): Promise<void> {
        if(!this.eventMap[eventName]) {
            return;
        }
    
        var listeners: Array<any> = this.eventMap[eventName] as Array<any>;
        var promises = listeners.map(listener => listener.func.call(listener.self, eventName, udata));
        await Promise.all(promises);
    }
    
}
