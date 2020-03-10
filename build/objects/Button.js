import { GameObject } from "../engine/GameObject";
import { SpriteRenderer } from "../engine/components/SpriteRenderer";
import { EventName } from "../engine/components/EventName";
export class Button extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: ["./Assets/images/default.png"],
            frames: { width: 64, height: 64 },
            animations: {
                idle: 0
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
}
//# sourceMappingURL=Button.js.map