import { Scene } from "./Scene.js";
import { Player } from "../objects/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { Wall } from "../objects/Wall.js";
export class LevelScene extends Scene {
    constructor(stage) {
        super(stage);
        this._player = new Player();
        this._playerController = new PlayerController(this._player);
        this._wallGrid = [];
        this._wallGridWidth = 8;
        this._wallGridHeight = 8;
    }
    init() {
        this._player.init(this.stage);
        this._playerController.initWASD();
    }
    update() {
        this._player.update();
    }
    //
    resetPlayerZ() {
        if (this.stage != undefined) {
            this.stage.setChildIndex(this._player.container, this.stage.numChildren - 1);
        }
    }
    createMultipleWalls(xStart, xStop, yStart, yStop) {
        for (let x = xStart; x <= xStop; x++) {
            for (let y = yStart; y <= yStop; y++) {
                this.createWallAt(x, y);
            }
        }
    }
    createWallAt(x, y) {
        if (this.stage == undefined) {
            throw new Error("Stage is not defined");
        }
        // TODO: Don't hard-code wall size?
        // Maybe yes hard-code, but elsewhere
        // Or determine by asset resolution setting
        let xPos = x * 64;
        let yPos = y * 64;
        const wall = new Wall();
        wall.transform.position = { x: xPos, y: yPos };
        wall.init(this.stage);
        let index = x + (this._wallGridWidth * y);
        this._wallGrid[index] = wall;
        console.log(index);
    }
}
//# sourceMappingURL=LevelScene.js.map