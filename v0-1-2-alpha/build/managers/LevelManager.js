import { LevelController } from "../controllers/LevelController.js";
import { SceneName } from "./SceneManager.js";
import { Global } from "./Global.js";
import { AssetName } from "./AssetManager.js";
export class LevelManager {
    constructor(levelDatas) {
        this._levels = [];
        this._triggeredWinCondition = false;
        this._currentLevelIndex = 0;
        for (let index = 0; index < levelDatas.length; index++) {
            const levelData = levelDatas[index];
            const newLevelController = new LevelController(levelData.sceneName, levelData.winCondition, () => {
                if (!this._triggeredWinCondition) {
                    this._triggeredWinCondition = true;
                    this._goToLevel(index + 1);
                }
            });
            this._levels.push(newLevelController);
        }
    }
    start() {
        Global.musicManager.setMusic(AssetName.Sound_MusicGame);
        this._goToLevel(0);
    }
    restartLevel() {
        Global.musicManager.setMusic(AssetName.Sound_MusicGame);
        this._goToLevel(this._currentLevelIndex);
    }
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    enemyHit(enemy) {
        // TODO: Health component?
        Global.musicManager.setMusic(AssetName.Sound_MusicMenu);
        Global.sceneManager.setScene(SceneName.Lose);
    }
    //
    _goToLevel(levelIndex) {
        if (levelIndex >= this._levels.length) {
            this._winGame();
        }
        else {
            this._triggeredWinCondition = false;
            this._currentLevelIndex = levelIndex;
            const nextLevel = this._levels[levelIndex];
            const scene = Global.sceneManager.setScene(nextLevel.levelSceneName);
            nextLevel.init(scene.tileMap);
        }
    }
    _winGame() {
        Global.musicManager.setMusic(AssetName.Sound_MusicMenu);
        Global.sceneManager.goToWinScene();
    }
}
//# sourceMappingURL=LevelManager.js.map