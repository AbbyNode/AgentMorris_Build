import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { UIBackground } from "../objects/ui/UIBackground.js";
import { Label } from "../objects/ui/Label.js";
export class InstructionsScene extends Scene {
    constructor(stage) {
        super(stage);
        const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        background.scaleX = 4.48;
        background.scaleY = 4.48;
        this.stage.addChild(background);
        this._objects.push(background);
        const xOffset = 450;
        const ySpacing = 80;
        let yPos = 50;
        const uiBackground = new UIBackground({ width: 900, height: 800 }, "#7777ff");
        uiBackground.transform.position = { x: xOffset, y: yPos };
        uiBackground.init(this.stage);
        this._objects.push(uiBackground);
        yPos += ySpacing;
        // Objective		
        const objectiveLabel = new Label("You are an secret agent trying to steal intel");
        objectiveLabel.transform.position = { x: xOffset + 40, y: yPos };
        objectiveLabel.init(this.stage);
        this._objects.push(objectiveLabel);
        yPos += ySpacing;
        const objectiveLabel2 = new Label("Use WASD to move. Space to Shoot.");
        objectiveLabel2.transform.position = { x: xOffset + 40, y: yPos };
        objectiveLabel2.init(this.stage);
        this._objects.push(objectiveLabel2);
        yPos += ySpacing;
        // Agent sprite
        const agentSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: [0, 1, undefined, 0.1],
            }
        };
        const agentSpriteSheet = new createjs.SpriteSheet(agentSpriteData);
        const agentSprite = new createjs.Sprite(agentSpriteSheet);
        agentSprite.x = xOffset + 100;
        agentSprite.y = yPos;
        agentSprite.gotoAndPlay("idle");
        this.stage.addChild(agentSprite);
        // Intel sprite
        const intelSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 51
            }
        };
        const intelSpriteSheet = new createjs.SpriteSheet(intelSpriteData);
        const intelSprite = new createjs.Sprite(intelSpriteSheet);
        intelSprite.x = xOffset + 200;
        intelSprite.y = yPos;
        intelSprite.gotoAndPlay("idle");
        this.stage.addChild(intelSprite);
        yPos += ySpacing;
        // Enemies
        const enemyLabel = new Label("Don't let enemy agents catch you");
        enemyLabel.transform.position = { x: xOffset + 40, y: yPos };
        enemyLabel.init(this.stage);
        this._objects.push(enemyLabel);
        yPos += ySpacing;
        // Bullet
        const bulletLabel = new Label("You only get one bullet per level");
        bulletLabel.transform.position = { x: xOffset + 40, y: yPos };
        bulletLabel.init(this.stage);
        this._objects.push(bulletLabel);
        yPos += ySpacing;
        // Enemy sprite
        const enemySpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: [16, 17, undefined, 0.1],
            }
        };
        const enemySpriteSheet = new createjs.SpriteSheet(enemySpriteData);
        const enemySprite = new createjs.Sprite(enemySpriteSheet);
        enemySprite.x = xOffset + 100;
        enemySprite.y = yPos;
        enemySprite.gotoAndPlay("idle");
        this.stage.addChild(enemySprite);
        // Bullet sprite
        const bulletSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                moving: [33, 34, undefined, 0.1],
            },
        };
        const bulletSpriteSheet = new createjs.SpriteSheet(bulletSpriteData);
        const bulletSprite = new createjs.Sprite(bulletSpriteSheet);
        bulletSprite.x = xOffset + 200;
        bulletSprite.y = yPos;
        bulletSprite.gotoAndPlay("moving");
        this.stage.addChild(bulletSprite);
        yPos += ySpacing;
        // Exit
        const exitLabel = new Label("Reach the exit to escape");
        exitLabel.transform.position = { x: xOffset + 40, y: yPos };
        exitLabel.init(this.stage);
        this._objects.push(exitLabel);
        yPos += ySpacing;
        // Exit sprite
        const exitSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SpriteSheet)],
            frames: { width: 64, height: 64, regX: 32, regY: 32, spacing: 1 },
            animations: {
                idle: 83
            }
        };
        const exitSpriteSheet = new createjs.SpriteSheet(exitSpriteData);
        const exitSprite = new createjs.Sprite(exitSpriteSheet);
        exitSprite.x = xOffset + 100;
        exitSprite.y = yPos;
        exitSprite.gotoAndPlay("idle");
        this.stage.addChild(exitSprite);
        //
        const buttonStart = new Button("Start", (event) => {
            Global.levelManager.start();
        });
        buttonStart.transform.position = { x: 1500, y: 750 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
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
//# sourceMappingURL=InstructionsScene.js.map