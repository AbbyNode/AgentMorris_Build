import { Scene } from "./Scene.js";
import { Player } from "../objects/entities/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { TileMap } from "../engine/tiles/TileMap.js";
import { Global } from "../managers/Global.js";
import { GameObject } from "../engine/gameobject/GameObject.js";
import { AssetName } from "../managers/AssetManager.js";
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
        this._playerController = new PlayerController(this._player);
        let buttonMusic = new Button("Music", (event) => {
            this._toggleMusic();
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
        let player = this._tileMap.getFirstTileOfType(Player);
        if (!player) {
            throw new Error("No Player instance in TileMap");
        }
        return player;
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
        this._playerController.initWASD();
        this._music = createjs.Sound.play(AssetName.Sound_MusicGame, {
            loop: -1
        });
    }
    update() {
        this._tileMap.updateAllEntities();
    }
    destroy() {
        super.destroy();
        this._playerController.destroy();
        this._tileMap.destroyAllTiles();
        if (this._music) {
            this._music.stop();
        }
    }
    _toggleMusic() {
        if (this._music) {
            this._music.paused = !this._music.paused;
        }
    }
}
//# sourceMappingURL=LevelScene.js.map