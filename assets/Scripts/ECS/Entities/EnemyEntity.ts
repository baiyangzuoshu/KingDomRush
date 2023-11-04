import BaseComponent from "../Components/BaseComponent";
import NavComponent from "../Components/NavComponent";
import RoleComponent from "../Components/RoleComponent";
import TransformComponent from "../Components/TransformComponent";
import UnitComponent from "../Components/UnitComponent";

export default class EnemyEntity  {
    public baseComponent: BaseComponent = new BaseComponent();
    public navComponent: NavComponent = new NavComponent();
    public transformComponent: TransformComponent = new TransformComponent();
    public unitComponent: UnitComponent = new UnitComponent();
    public roleComponent: RoleComponent = new RoleComponent();
}
