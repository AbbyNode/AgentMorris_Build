import { Mover, MoveDirection } from "../../engine/components/Mover.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { EventName } from "../../engine/components/EventName.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { Entity } from "../../engine/tiles/Entity.js";
import { Floor } from "../tiles/Floor.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
import { SceneName } from "../../managers/SceneManager.js";
export class Enemy extends Entity {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: [16, 17, undefined, 0.1],
                walk: [16, 17, undefined, 0.2]
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Enemy,
            isTrigger: false,
            size: { width: 26, height: 48 },
            offset: { x: 19, y: 16 }
        }));
        this.addComponent(Mover, new Mover(this, 3));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
        //
        this._moveDirection = MoveDirection.Right;
        this._waiting = false;
        this.eventManager.addListener(EventName.Collider_CollidedTick, collider => {
            if (collider instanceof Collider) {
                if (collider.tag == ColliderTag.Wall || collider.tag == ColliderTag.Enemy) {
                    this._hitWall();
                }
                if (collider.tag == ColliderTag.Player) {
                    // TODO: Health component?
                    Global.sceneManager.setScene(SceneName.Lose);
                }
            }
        });
    }
    get floorTile() {
        return Floor;
    }
    // TODO: Move this into an AI GameComponent?
    _switchDirection() {
        switch (this._moveDirection) {
            case MoveDirection.Right:
                this._moveDirection = MoveDirection.Left;
                break;
            case MoveDirection.Left:
                this._moveDirection = MoveDirection.Right;
                break;
            case MoveDirection.Up:
                this._moveDirection = MoveDirection.Down;
                break;
            case MoveDirection.Down:
                this._moveDirection = MoveDirection.Up;
                break;
        }
    }
    _move() {
        this.eventManager.invoke(EventName.Mover_RequestStart, this._moveDirection);
    }
    _hitWall() {
        if (this._waiting) {
            return;
        }
        this._waiting = true;
        this.eventManager.invoke(EventName.Mover_RequestStop, this._moveDirection);
        setTimeout(() => {
            this._switchDirection();
            this._move();
            this._waiting = false;
        }, 1000);
    }
}
//# sourceMappingURL=Enemy.js.map