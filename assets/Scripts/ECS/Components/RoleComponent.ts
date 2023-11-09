import { ActorDirection, RoleState } from "../../Enum";

export default class RoleComponent  {
    public type:number=0;
    public state:RoleState=RoleState.Active;
    public level:number=0;
    public direction:ActorDirection=ActorDirection.INVALID_DIR;
}
