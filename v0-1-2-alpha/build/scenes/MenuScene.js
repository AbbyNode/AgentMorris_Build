import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { SceneName } from "../managers/SceneManager.js";
export class MenuScene extends Scene {
    constructor(stage) {
        super(stage);
        const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        background.scaleX = 4.48;
        background.scaleY = 4.48;
        this.stage.addChild(background);
        this._objects.push(background);
        // Agent sprite
        const agentSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_BackgroundAgent)],
            frames: { width: 640, height: 640, regX: 320, regY: 320 },
            animations: {
                idle: [0, 1, undefined, 0.05],
            }
        };
        const agentSpriteSheet = new createjs.SpriteSheet(agentSpriteData);
        const agentSprite = new createjs.Sprite(agentSpriteSheet);
        agentSprite.x = 500;
        agentSprite.y = 500;
        agentSprite.gotoAndPlay("idle");
        this.stage.addChild(agentSprite);
        const buttonInstructions = new Button("Instructions", (event) => {
            Global.sceneManager.setScene(SceneName.Instructions);
        }, { width: 220, height: 60 });
        buttonInstructions.transform.position = { x: 1500, y: 650 };
        buttonInstructions.init(stage);
        this._objects.push(buttonInstructions);
        const buttonStart = new Button("Start", (event) => {
            Global.levelManager.start();
        }, { width: 220, height: 60 });
        buttonStart.transform.position = { x: 1500, y: 750 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
        const buttonMusic = new Button("Music", (event) => {
            Global.musicManager.togglePause();
        }, { width: 220, height: 60 });
        buttonMusic.transform.position = { x: 1500, y: 200 };
        buttonMusic.init(stage);
        this._objects.push(buttonMusic);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
        Global.musicManager.setMusic(AssetName.Sound_MusicMenu);
        Global.musicManager.play();
    }
    update() {
        // console.log("menu update");
    }
    destroy() {
        super.destroy();
    }
}
// https://createjs.com/tutorials/Mouse%20Interaction/
//# sourceMappingURL=MenuScene.js.map