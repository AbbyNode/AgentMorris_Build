import { Floor } from "../objects/tiles/Floor.js";
import { Wall } from "../objects/tiles/Wall.js";
import { Sensor } from "../objects/tiles/Sensor.js";
import { Exit } from "../objects/tiles/Exit.js";
import { Player } from "../objects/entities/Player.js";
import { Enemy } from "../objects/entities/Enemy.js";
import { EnemyHorizontal } from "../objects/entities/enemies/EnemyHorizontal.js";
import { EnemyVertical } from "../objects/entities/enemies/EnemyVertical.js";
import { Intel } from "../objects/entities/Intel.js";
const TileMapStrings = new Map();
TileMapStrings.set("", Floor);
TileMapStrings.set("w", Wall);
// TileMapStrings.set("t", Sensor); // TODO: Make Trap tile
TileMapStrings.set("s", Sensor);
TileMapStrings.set("i", Intel);
TileMapStrings.set("x", Exit);
TileMapStrings.set("p", Player);
TileMapStrings.set("e", Enemy);
TileMapStrings.set("eh", EnemyHorizontal);
TileMapStrings.set("ev", EnemyVertical);
export default TileMapStrings;
//# sourceMappingURL=TileMapStrings.js.map