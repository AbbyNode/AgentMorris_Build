import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
export class MenuScene extends Scene {
    constructor(stage) {
        super(stage);
        let background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Background));
        background.scaleX = 4.48;
        background.scaleY = 4.48;
        this.stage.addChild(background);
        this._objects.push(background);
        let button = new Button("Start", (event) => {
            Global.levelManager.start();
        });
        button.transform.position = { x: 1500, y: 750 };
        button.init(stage);
        this._objects.push(button);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
    }
    update() {
        // console.log("menu update");
    }
}
// https://createjs.com/tutorials/Mouse%20Interaction/
//# sourceMappingURL=MenuScene.js.map