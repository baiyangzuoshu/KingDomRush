import AnimateComponent from "../Components/AnimateComponent";
import AttackComponent from "../Components/AttackComponent";
import BaseComponent from "../Components/BaseComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";

export default class BulletEntity{
    baseComponent: BaseComponent=new BaseComponent();
    transformComponent: TransformComponent=new TransformComponent();
    animateComponent: AnimateComponent=new AnimateComponent();
    roleComponent: RoleComponent=new RoleComponent();
    attackComponent: AttackComponent=new AttackComponent();
}
