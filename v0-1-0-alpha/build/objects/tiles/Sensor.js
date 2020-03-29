import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { EventName } from "../../engine/components/EventName.js";
import { Tile } from "../../engine/tiles/Tile.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
export class Sensor extends Tile {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 254
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Sensor,
            isTrigger: true,
            size: {
                width: 64,
                height: 64
            },
            offset: { x: 0, y: 0 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
        this.eventManager.addListener(EventName.Collider_TriggerEnter, () => {
            console.log("Sensor!");
        });
    }
}
//# sourceMappingURL=Sensor.js.map