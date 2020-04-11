import { Scene } from "./Scene.js";
import { Player } from "../objects/entities/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { TileMap } from "../engine/tiles/TileMap.js";
import { Global } from "../managers/Global.js";
import { GameObject } from "../engine/gameobject/GameObject.js";
import { Button } from "../objects/ui/Button.js";
export class LevelScene extends Scene {
    constructor(stage, levelCsv) {
        super(stage);
        this._tileMap = new TileMap();
        const _levelJson = Papa.parse(levelCsv).data;
        this._tileMap.loadFromJSON(_levelJson, Global.tileMapStrings);
        this._tileMap.init(this.stage);
        this._player = this.getPlayerFromTileMap();
        GameObject.bringZToFront(this._player, this.stage);
        this._playerController = new PlayerController(this._player, this.stage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const buttonMusic = new Button("Music", (event) => {
            Global.musicManager.togglePause();
        }, { width: 100, height: 40 });
        buttonMusic.transform.position = { x: 10, y: 10 };
        buttonMusic.init(stage);
        this._objects.push(buttonMusic);
    }
    get tileMap() {
        return this._tileMap;
    }
    get player() {
        return this._player;
    }
    getPlayerFromTileMap() {
        const player = this._tileMap.getFirstTileOfType(Player);
        if (!player) {
            throw new Error("No Player instance in TileMap");
        }
        return player;
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
        this._playerController.initWASD();
        this._playerController.initBullets(1); // Only one bullet
    }
    update() {
        this._tileMap.updateAllEntities();
    }
    destroy() {
        super.destroy();
        this._playerController.destroy();
        this._tileMap.destroyAllTiles();
    }
}
//# sourceMappingURL=LevelScene.js.map