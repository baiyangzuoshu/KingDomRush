import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";

export default class TowerEntity {
    public baseComponent:BaseComponent=new BaseComponent();
    public transformComponent:TransformComponent=new TransformComponent();
    public roleComponent:RoleComponent=new RoleComponent();
    public attackComponent:AttackComponent=new AttackComponent();
}
