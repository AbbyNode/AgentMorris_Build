import { EventName } from "../engine/components/EventName.js";
import { Collider } from "../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { Exit } from "../objects/tiles/Exit.js";
import { Intel } from "../objects/entities/Intel.js";
export var WinCondition;
(function (WinCondition) {
    WinCondition[WinCondition["Exit"] = 0] = "Exit";
    WinCondition[WinCondition["StealAndExit"] = 1] = "StealAndExit";
})(WinCondition || (WinCondition = {}));
export class LevelController {
    //#endregion
    constructor(levelSceneName, winCondition, winCallback) {
        this._levelSceneName = levelSceneName;
        this._winCondition = winCondition;
        this._winCallback = winCallback;
        this._intelStolen = false;
    }
    //#region props
    get levelSceneName() {
        return this._levelSceneName;
    }
    get winCondition() {
        return this._winCondition;
    }
    set winCondition(v) {
        this._winCondition = v;
    }
    init(tileMap) {
        switch (this._winCondition) {
            case WinCondition.Exit:
                this._initWinExit(tileMap);
                break;
            case WinCondition.StealAndExit:
                this._initWinStealAndExit(tileMap);
                break;
        }
    }
    _initWinExit(tileMap) {
        let exitTile = tileMap.getFirstTileOfType(Exit);
        if (!exitTile) {
            throw new Error("No exit found on level");
        }
        exitTile.eventManager.addListener(EventName.Collider_CollidedTick, (collider) => {
            if (collider instanceof Collider) {
                if (collider.tag == ColliderTag.Player) {
                    this._winCallback();
                }
            }
        });
    }
    _initWinStealAndExit(tileMap) {
        let exitTile = tileMap.getFirstTileOfType(Exit);
        if (!exitTile) {
            throw new Error("No exit found on level");
        }
        let intelTile = tileMap.getFirstTileOfType(Intel);
        if (!intelTile) {
            throw new Error("No intel found on level");
        }
        intelTile.eventManager.addListener(EventName.Collider_TriggerEnter, (collider) => {
            var _a;
            if (collider instanceof Collider) {
                if (collider.tag == ColliderTag.Player) {
                    this._intelStolen = true;
                    (_a = intelTile) === null || _a === void 0 ? void 0 : _a.destroy();
                }
            }
        });
        exitTile.eventManager.addListener(EventName.Collider_CollidedTick, (collider) => {
            if (collider instanceof Collider) {
                if (collider.tag == ColliderTag.Player) {
                    if (this._intelStolen) {
                        this._winCallback();
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=LevelController.js.map