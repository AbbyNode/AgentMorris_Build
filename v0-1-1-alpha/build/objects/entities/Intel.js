import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { EventName } from "../../engine/components/EventName.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
import { Entity } from "../../engine/tiles/Entity.js";
import { Floor } from "../tiles/Floor.js";
export class Intel extends Entity {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 51
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Sensor,
            isTrigger: true,
            size: {
                width: 44,
                height: 48
            },
            offset: { x: 9, y: 11 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
    get floorTile() {
        return Floor;
    }
}
//# sourceMappingURL=Intel.js.map