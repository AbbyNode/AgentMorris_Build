import { AssetManager } from "./AssetManager.js";
import { Collider } from "../engine/components/Collider.js";
import { SceneManager, SceneName } from "./SceneManager.js";
import TileMapStrings from "./TileMapStrings.js";
import { LevelManager } from "./LevelManager.js";
import { WinCondition } from "../controllers/LevelController.js";
import { MusicManager } from "./MusicManager.js";
export class Global {
    //#region props
    static get assetManager() {
        return this._assetManager;
    }
    static get sceneManager() {
        return this._sceneManager;
    }
    static get levelManager() {
        return this._levelManager;
    }
    static get musicManager() {
        return this._musicManager;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static get tileMapStrings() {
        return this._tileMapStrings;
    }
    //#endregion
    static init(stage) {
        if (this._assetManager) {
            throw new Error("Asset manager already exist");
        }
        this._assetManager = new AssetManager();
        this._sceneManager = new SceneManager(stage);
        this._levelManager = new LevelManager([
            // {sceneName: SceneName.LevelExample, winCondition: WinCondition.StealAndExit}
            { sceneName: SceneName.Level1, winCondition: WinCondition.Exit },
            { sceneName: SceneName.Level2, winCondition: WinCondition.StealAndExit },
            { sceneName: SceneName.Level3, winCondition: WinCondition.Exit }
        ]);
        this._musicManager = new MusicManager();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._tileMapStrings = TileMapStrings;
        Collider.init();
        // Collider.toggleDebugView(true);
    }
}
//# sourceMappingURL=Global.js.map