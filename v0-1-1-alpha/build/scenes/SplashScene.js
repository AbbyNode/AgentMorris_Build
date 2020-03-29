import { Scene } from "./Scene.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { SolidBackground } from "../objects/ui/SolidBackground.js";
import { SceneName } from "../managers/SceneManager.js";
import { Label } from "../objects/ui/Label.js";
import { EventName } from "../engine/components/EventName.js";
export class SplashScene extends Scene {
    constructor(stage) {
        super(stage);
        let background = new SolidBackground({ width: 1856, height: 896 }, "gray");
        background.init(this.stage);
        this._objects.push(background);
        this._fadeContainer = new createjs.Container();
        let label = new Label("A game by:", true);
        label.transform.position = { x: 928, y: 150 };
        // label.init(this.stage);
        // this._objects.push(label);
        this._fadeContainer.addChild(label.container);
        label.eventManager.invoke(EventName.GameObject_Init, this.stage);
        this._logo = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Logo));
        this._logo.scaleX = 2;
        this._logo.scaleY = 2;
        this._logo.x = 688;
        this._logo.y = 208;
        // this.stage.addChild(this._logo);
        this._fadeContainer.addChild(this._logo);
        this._fadeContainer.alpha = 0;
        this.stage.addChild(this._fadeContainer);
        this._objects.push(this._fadeContainer);
    }
    init() {
        createjs.Tween.get(this._fadeContainer)
            .to({ alpha: 1 }, 2000)
            .wait(1000)
            .to({ alpha: 0.1 }, 1000)
            .call(() => {
            Global.sceneManager.setScene(SceneName.Menu);
        });
    }
    update() { }
}
//# sourceMappingURL=SplashScene.js.map