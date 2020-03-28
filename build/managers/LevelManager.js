import { LevelController } from "../controllers/LevelController.js";
import { Global } from "./Global.js";
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
        this._goToLevel(0);
    }
    restartLevel() {
        this._goToLevel(this._currentLevelIndex);
    }
    _goToLevel(levelIndex) {
        if (levelIndex >= this._levels.length) {
            Global.sceneManager.goToWinScene();
        }
        else {
            this._triggeredWinCondition = false;
            this._currentLevelIndex = levelIndex;
            const nextLevel = this._levels[levelIndex];
            const scene = Global.sceneManager.setScene(nextLevel.levelSceneName);
            nextLevel.init(scene.tileMap);
        }
    }
}
//# sourceMappingURL=LevelManager.js.map