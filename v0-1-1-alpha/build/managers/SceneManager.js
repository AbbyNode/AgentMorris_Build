import { Global } from "./Global.js";
import { AssetName } from "./AssetManager.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { LevelScene } from "../scenes/LevelScene.js";
import { WinScene } from "../scenes/WinScene.js";
import { LoseScene } from "../scenes/LoseScene.js";
import { SplashScene } from "../scenes/SplashScene.js";
export var SceneName;
(function (SceneName) {
    SceneName[SceneName["Splash"] = 0] = "Splash";
    SceneName[SceneName["Menu"] = 1] = "Menu";
    SceneName[SceneName["LevelExample"] = 2] = "LevelExample";
    SceneName[SceneName["Level1"] = 3] = "Level1";
    SceneName[SceneName["Level2"] = 4] = "Level2";
    SceneName[SceneName["Level3"] = 5] = "Level3";
    SceneName[SceneName["Win"] = 6] = "Win";
    SceneName[SceneName["Lose"] = 7] = "Lose";
})(SceneName || (SceneName = {}));
export class SceneManager {
    constructor(stage) {
        this._stage = stage;
    }
    update() {
        var _a;
        (_a = this._currentScene) === null || _a === void 0 ? void 0 : _a.update();
    }
    setScene(sceneName) {
        var _a;
        (_a = this._currentScene) === null || _a === void 0 ? void 0 : _a.destroy();
        // Ideally the scene should have removed everything, but just in case
        this._stage.removeAllChildren();
        this._stage.removeAllEventListeners();
        this._currentScene = this._newScene(sceneName);
        this._currentScene.init();
        return this._currentScene;
    }
    goToWinScene() {
        this.setScene(SceneName.Win);
    }
    _newScene(sceneName) {
        switch (sceneName) {
            case SceneName.Splash:
                return new SplashScene(this._stage);
            case SceneName.Menu:
                return new MenuScene(this._stage);
            case SceneName.LevelExample:
                return this._newLevelScene(AssetName.Level_Example);
            case SceneName.Level1:
                return this._newLevelScene(AssetName.Level_1);
            case SceneName.Level2:
                return this._newLevelScene(AssetName.Level_2);
            case SceneName.Level3:
                return this._newLevelScene(AssetName.Level_3);
            case SceneName.Win:
                return new WinScene(this._stage);
            case SceneName.Lose:
                return new LoseScene(this._stage);
        }
    }
    _newLevelScene(assetName) {
        const levelCsv = Global.assetManager.getResult(assetName);
        return new LevelScene(this._stage, levelCsv);
    }
}
//# sourceMappingURL=SceneManager.js.map