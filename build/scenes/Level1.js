import { LevelScene } from "./LevelScene.js";
import { Wall } from "../objects/Wall.js";
import { Sensor } from "../objects/Sensor.js";
import { EventName } from "../engine/components/EventName.js";
import { Collider } from "../engine/components/Collider.js";
export class Level1 extends LevelScene {
    init(stage) {
        super.init(stage);
        const wall = new Wall();
        wall.transform.position = { x: 200, y: 200 };
        wall.init(stage);
        const sensor = new Sensor();
        sensor.transform.position = { x: 400, y: 200 };
        sensor.init(stage);
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
        this._player.transform.position = { x: 300, y: 200 };
        this._player.init(stage);
        // stage.setChildIndex(this._player.container, stage.numChildren-1);
    }
}
//# sourceMappingURL=Level1.js.map