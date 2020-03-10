import { Wall } from "../objects/Wall.js";
import { Sensor } from "../objects/Sensor.js";
import { EventName } from "../engine/components/EventName.js";
import { Collider } from "../engine/components/Collider.js";
import { LevelScene } from "../scenes/LevelScene.js";
export class LevelExample extends LevelScene {
    init() {
        super.init();
        const wall = new Wall();
        wall.transform.position = { x: 200, y: 200 };
        wall.init(this.stage);
        const sensor = new Sensor();
        sensor.transform.position = { x: 400, y: 200 };
        sensor.init(this.stage);
        sensor.eventManager.addListener(EventName.Collider_TriggerEnter, collider => {
            if (collider instanceof Collider) {
                if (collider.tag == "player") {
                    console.log("Walked into sensor");
                }
            }
        });
        sensor.eventManager.addListener(EventName.Collider_TriggerExit, collider => {
            if (collider instanceof Collider) {
                if (collider.tag == "player") {
                    console.log("Walked out of sensor");
                }
            }
        });
        this.createWallAt(0, 0);
        this._player.transform.position = { x: 300, y: 200 };
        this.resetPlayerZ();
    }
}
//# sourceMappingURL=LevelExample.js.map