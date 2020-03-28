import { Enemy } from "../Enemy.js";
import { EventName } from "../../../engine/components/EventName.js";
import { MoveDirection } from "../../../engine/components/Mover.js";
// TODO: Move these inside Enemy.ts
export class EnemyHorizontal extends Enemy {
    constructor() {
        super();
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._moveDirection = MoveDirection.Right;
            this._move();
        });
    }
}
//# sourceMappingURL=EnemyHorizontal.js.map