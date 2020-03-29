import { Scene } from "./Scene.js";
import { Player } from "../objects/entities/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { TileMap } from "../engine/tiles/TileMap.js";
import { Global } from "../managers/Global.js";
import { GameObject } from "../engine/gameobject/GameObject.js";
export class LevelScene extends Scene {
    constructor(stage, levelCsv) {
        super(stage);
        this._tileMap = new TileMap();
        const _levelJson = Papa.parse(levelCsv).data;
        this._tileMap.loadFromJSON(_levelJson, Global.tileMapStrings);
        this._tileMap.init(this.stage);
        this._player = this.getPlayerFromTileMap();
        GameObject.bringZToFront(this._player, this.stage);
        this._playerController = new PlayerController(this._player);
    }
    get tileMap() {
        return this._tileMap;
    }
    get player() {
        return this._player;
    }
    getPlayerFromTileMap() {
        let player = this._tileMap.getFirstTileOfType(Player);
        if (!player) {
            throw new Error("No Player instance in TileMap");
        }
        return player;
    }
    init() {
        this._playerController.initWASD();
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