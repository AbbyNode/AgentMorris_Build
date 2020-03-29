import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
export class MenuScene extends Scene {
    constructor(stage) {
        super(stage);
        let background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        background.scaleX = 4.48;
        background.scaleY = 4.48;
        this.stage.addChild(background);
        this._objects.push(background);
        let buttonStart = new Button("Start", (event) => {
            Global.levelManager.start();
        });
        buttonStart.transform.position = { x: 1500, y: 750 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
        let buttonMusic = new Button("Music", (event) => {
            this._toggleMusic();
        });
        buttonMusic.transform.position = { x: 1500, y: 200 };
        buttonMusic.init(stage);
        this._objects.push(buttonMusic);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
        this._music = createjs.Sound.play(AssetName.Sound_MusicMenu, {
            loop: -1
        });
    }
    update() {
        // console.log("menu update");
    }
    destroy() {
        super.destroy();
        if (this._music) {
            this._music.stop();
        }
    }
    _toggleMusic() {
        if (this._music) {
            this._music.paused = !this._music.paused;
        }
    }
}
// https://createjs.com/tutorials/Mouse%20Interaction/
//# sourceMappingURL=MenuScene.js.map