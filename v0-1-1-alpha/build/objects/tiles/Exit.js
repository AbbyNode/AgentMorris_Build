import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { EventName } from "../../engine/components/EventName.js";
import { Tile } from "../../engine/tiles/Tile.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
export class Exit extends Tile {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 83
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Exit,
            isTrigger: false,
            size: {
                width: 64,
                height: 64
            },
            offset: { x: 0, y: 0 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
}
//# sourceMappingURL=Exit.js.map