import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SortChildren')
export class SortChildren extends Component {

    onLoad() {
        // Initialization if needed
    }

    update(dt: number) {
        const children = this.node.children;
        children.sort((lhs, rhs) => {
            if (lhs.position.y > rhs.position.y) {
                return -1;
            } else if (lhs.position.y < rhs.position.y) {
                return 1;
            }
            return 0;
        });

        // y larger nodes will be in front, y smaller nodes will be behind
        for (let i = 0; i < children.length; i++) {
            //children[i].zIndex = 1000 + i;
        }
    }
}
