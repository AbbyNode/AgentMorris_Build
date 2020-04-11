import { KeyboardInput } from "./KeyboardInput.js";
import { MoveDirection } from "../engine/components/Mover.js";
import { EventName } from "../engine/components/EventName.js";
import { Bullet } from "../objects/items/Bullet.js";
import { Gun } from "../objects/items/Gun.js";
export class PlayerController {
    constructor(player, stage) {
        this._numBullets = 0;
        this._player = player;
        this._stage = stage;
        this._keyboardInput = new KeyboardInput();
        this._canShoot = true;
        this._shootDirection = MoveDirection.Right;
        this._gun = new Gun();
        this._gun.init(this._stage);
        this._bullets = [];
        //
        this._player.eventManager.addListener(EventName.GameObject_Update, () => {
            this._bullets.forEach((bullet) => {
                bullet.update();
            });
        });
        this._player.eventManager.addListener(EventName.Mover_StartedMoving, (moveDirection) => {
            this._shootDirection = moveDirection;
            this._gun.pointTo(this._shootDirection);
        });
        this._player.eventManager.addListener(EventName.Transform_PositionChange, (newPos) => {
            newPos.y += 5;
            this._gun.transform.position = newPos;
        });
    }
    initWASD() {
        // REMINDER when customizing controls, save and reuse the generated keymaps
        this._keyboardInput.addKey("w", this._genKeyMap(MoveDirection.Up));
        this._keyboardInput.addKey("s", this._genKeyMap(MoveDirection.Down));
        this._keyboardInput.addKey("a", this._genKeyMap(MoveDirection.Left));
        this._keyboardInput.addKey("d", this._genKeyMap(MoveDirection.Right));
        this._keyboardInput.addKey(" ", {
            down: () => {
                this._shoot();
            },
            up: () => {
                // nothing
            },
        });
    }
    initBullets(numBullets) {
        this._numBullets = numBullets;
        for (let index = 0; index < this._numBullets; index++) {
            // TODO: Bullet sprites init
        }
    }
    _shoot() {
        if (!this._canShoot) {
            return;
        }
        this._canShoot = false;
        if (this._numBullets >= 1) {
            this._spawnBullet();
            this._useBullet();
        }
        setTimeout(() => {
            this._canShoot = true;
        }, 500);
    }
    _spawnBullet() {
        const bullet = new Bullet(this._shootDirection);
        bullet.transform.position = this._player.transform.position;
        bullet.init(this._stage);
        this._bullets.push(bullet);
        bullet.eventManager.addListener(EventName.GameObject_Destroy, () => {
            const index = this._bullets.indexOf(bullet);
            if (index != -1) {
                this._bullets.splice(index, 1);
            }
        });
    }
    _useBullet() {
        this._numBullets--;
        // TODO: Bullet sprites update
    }
    _genKeyMap(direction) {
        return {
            down: () => {
                this._player.eventManager.invoke(EventName.Mover_RequestStart, direction);
                // this._player.moveStart(direction);
            },
            up: () => {
                this._player.eventManager.invoke(EventName.Mover_RequestStop, direction);
                // this._player.moveStop(direction);
            },
        };
    }
    destroy() {
        this._keyboardInput.destroy();
        this._gun.destroy();
    }
}
//# sourceMappingURL=PlayerController.js.map