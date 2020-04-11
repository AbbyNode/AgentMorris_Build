import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { MoveDirection } from "../../engine/components/Mover.js";
import { EventName } from "../../engine/components/EventName.js";
export class Gun extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 32,
            },
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
    pointTo(direction) {
        switch (direction) {
            case MoveDirection.Right:
                this._spriteRenderer.sprite.scaleX = 1;
                this._spriteRenderer.sprite.rotation = 0;
                break;
            case MoveDirection.Left:
                this._spriteRenderer.sprite.scaleX = -1;
                this._spriteRenderer.sprite.rotation = 0;
                break;
            case MoveDirection.Up:
                this._spriteRenderer.sprite.scaleX = 1;
                this._spriteRenderer.sprite.rotation = -90;
                break;
            case MoveDirection.Down:
                this._spriteRenderer.sprite.scaleX = 1;
                this._spriteRenderer.sprite.rotation = 90;
                break;
        }
    }
}
//# sourceMappingURL=Gun.js.map