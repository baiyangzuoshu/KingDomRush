import AIComponent from "../Components/AIComponent";
import NavComponent from "../Components/NavComponent";
import BulletEntity from "./BulletEntity";

export class InfantryActor extends BulletEntity{
    public navComponent:NavComponent=new NavComponent();
    public aiComponent:AIComponent=new AIComponent();
}