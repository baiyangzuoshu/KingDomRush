import { AnimateState } from "../../Enum";

export default class AnimateComponent {
    public srcPos:cc.Vec2=null;
    public dstPos:cc.Vec2=null;
    public state:AnimateState=AnimateState.None;
    public id:number=0;
    public time:number=0;
}
