export var AssetName;
(function (AssetName) {
    AssetName["SpriteSheet"] = "SpriteSheet";
    AssetName["Background"] = "Background";
    AssetName["Logo"] = "Logo";
    AssetName["LevelExample"] = "LevelExample";
    AssetName["Level1"] = "Level1";
    AssetName["Level2"] = "Level2";
    AssetName["Level3"] = "Level3";
})(AssetName || (AssetName = {}));
export var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "image";
    AssetType["TEXT"] = "text";
    AssetType["CSV"] = "text";
})(AssetType || (AssetType = {}));
export class AssetManager {
    constructor() {
        this._assetManifest = [
            {
                id: AssetName.SpriteSheet,
                src: "../../assets/images/AgentMorris_SpriteSheet.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Background,
                src: "../../assets/images/Background/menuBackground.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Logo,
                src: "../../assets/images/Background/logo.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.LevelExample,
                src: "../../assets/levels/example.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level1,
                src: "../../assets/levels/Level1.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level2,
                src: "../../assets/levels/Level2.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level3,
                src: "../../assets/levels/Level3.csv",
                type: AssetType.CSV
            }
        ];
        this._loadQueue = new createjs.LoadQueue();
        this._loadQueue.installPlugin(createjs.Sound);
        this._isLoaded = false;
        this._loadQueue.on("complete", () => {
            this._isLoaded = true;
        });
    }
    get isLoaded() {
        return this._isLoaded;
    }
    load() {
        this._loadQueue.loadManifest(this._assetManifest);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onComplete(callback, scope) {
        this._loadQueue.on("complete", callback, scope);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getResult(asset) {
        return this._loadQueue.getResult(asset);
    }
}
//# sourceMappingURL=AssetManager.js.map