import { LevelExample } from "./levels/LevelExample.js";
class Game {
    // TODO: Rename assets/images to lowercase?
    constructor() {
        window.addEventListener("load", () => {
            this.init();
        });
    }
    init() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        if (this.canvas == undefined) {
            throw new Error("Canvas not found");
        }
        this.stage = new createjs.Stage(this.canvas);
        this.levelScene = new LevelExample(this.stage);
        this.levelScene.init();
        // stage.enableMouseOver(20);
        // Collider.toggleDebugView(true);
        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on('tick', this.update, this);
    }
    update() {
        if (this.stage == undefined) {
            throw new Error("Stage is not defined");
        }
        // If stage is defined, levelScene is probably defined too
        this.levelScene.update();
        this.stage.update();
    }
}
new Game();
//# sourceMappingURL=Game.js.map