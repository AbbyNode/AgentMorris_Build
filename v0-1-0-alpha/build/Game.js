import { Global } from "./managers/Global.js";
import { SceneName } from "./managers/SceneManager.js";
class Game {
    constructor() {
        this._canvas = document.getElementsByTagName("canvas")[0];
        if (this._canvas == undefined) {
            throw new Error("Canvas not found");
        }
        this._stage = new createjs.Stage(this._canvas);
        Global.init(this._stage);
        Global.assetManager.onComplete(this.start, this);
        Global.assetManager.load();
    }
    start() {
        Global.sceneManager.setScene(SceneName.Splash);
        // Global.levelManager.start();
        // Global.sceneManager.setScene(SceneName.Menu);
        // Global.sceneManager.setScene(SceneName.LevelExample);
        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on("tick", this.update, this);
    }
    update() {
        Global.sceneManager.update();
        this._stage.update();
    }
}
window.addEventListener("load", () => {
    new Game();
});
//# sourceMappingURL=Game.js.map