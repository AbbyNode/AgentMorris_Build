import { Mover } from "../../engine/components/Mover.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { EventName } from "../../engine/components/EventName.js";
import { Global } from "../../managers/Global.js";
import { AssetName } from "../../managers/AssetManager.js";
import { Entity } from "../../engine/tiles/Entity.js";
import { Floor2 } from "../tiles/Floor.js";
import { ColliderTag } from "../../managers/ColliderTag.js";
export class Player extends Entity {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: [0, 1, undefined, 0.1],
                walk: [2, 3, undefined, 0.2],
                run: [2, 3, undefined, 0.4]
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Player,
            isTrigger: false,
            size: { width: 26, height: 28 },
            offset: { x: 19, y: 36 }
        }));
        this.addComponent(Mover, new Mover(this));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
    get floorTile() {
        return Floor2;
    }
}
//# sourceMappingURL=Player.js.map