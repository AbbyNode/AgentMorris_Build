import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
import { Mover } from "../../engine/components/Mover.js";
import { EventName } from "../../engine/components/EventName.js";
import { Enemy } from "../entities/Enemy.js";
export class Bullet extends GameObject {
    constructor(moveDirection) {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                moving: [33, 34, undefined, 0.1],
            },
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Bullet,
            isTrigger: true,
            size: { width: 16, height: 16 },
            offset: { x: 24, y: 24 }
        }));
        this.addComponent(Mover, new Mover(this, 8));
        //
        this.eventManager.addListener(EventName.Collider_TriggerEnter, collider => {
            if (collider instanceof Collider) {
                if (collider.tag == ColliderTag.Wall) {
                    this.destroy();
                }
                else if (collider.tag == ColliderTag.Enemy) {
                    if (collider.gameObject instanceof Enemy) {
                        collider.gameObject.hitByBullet();
                    }
                    this.destroy();
                }
            }
        });
        //
        this._moveDirection = moveDirection;
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("moving");
            this.eventManager.invoke(EventName.Mover_RequestStart, this._moveDirection);
        });
    }
}
//# sourceMappingURL=Bullet.js.map