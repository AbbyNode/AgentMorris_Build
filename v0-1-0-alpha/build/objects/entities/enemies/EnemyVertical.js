import { Enemy } from "../Enemy.js";
import { EventName } from "../../../engine/components/EventName.js";
import { MoveDirection } from "../../../engine/components/Mover.js";
export class EnemyVertical extends Enemy {
    constructor() {
        super();
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._moveDirection = MoveDirection.Down;
            this._move();
        });
    }
}
//# sourceMappingURL=EnemyVertical.js.map