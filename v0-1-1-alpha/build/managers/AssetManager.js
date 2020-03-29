export var AssetName;
(function (AssetName) {
    // Images
    AssetName["Image_SpriteSheet"] = "Image_SpriteSheet";
    AssetName["Image_Background"] = "Image_Background";
    AssetName["Image_Logo"] = "Image_Logo";
    // CSVs
    AssetName["Level_Example"] = "Level_Example";
    AssetName["Level_1"] = "Level_1";
    AssetName["Level_2"] = "Level_2";
    AssetName["Level_3"] = "Level_3";
    // Sounds
    AssetName["Sound_MusicMenu"] = "Sound_MusicMenu";
    AssetName["Sound_MusicGame"] = "Sound_MusicGame";
    AssetName["Sound_EnemyFound"] = "Sound_EnemyFound";
    AssetName["Sound_GunShot"] = "Sound_GunShot";
})(AssetName || (AssetName = {}));
export var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "image";
    AssetType["TEXT"] = "text";
    AssetType["CSV"] = "text";
    AssetType["SOUND"] = "sound";
})(AssetType || (AssetType = {}));
export class AssetManager {
    constructor() {
        this._assetManifest = [
            // Images
            {
                id: AssetName.Image_SpriteSheet,
                src: "./assets/images/AgentMorris_SpriteSheet.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_Background,
                src: "./assets/images/Background/menuBackground.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_Logo,
                src: "./assets/images/Background/logo.png",
                type: AssetType.IMAGE
            },
            // CSVs
            {
                id: AssetName.Level_Example,
                src: "./assets/levels/example.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level_1,
                src: "./assets/levels/Level1.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level_2,
                src: "./assets/levels/Level2.csv",
                type: AssetType.CSV
            },
            {
                id: AssetName.Level_3,
                src: "./assets/levels/Level3.csv",
                type: AssetType.CSV
            },
            // Sounds
            {
                id: AssetName.Sound_MusicMenu,
                src: "./assets/sounds/BGM/3223-Spyvs.mp3",
                type: AssetType.SOUND
            },
            {
                id: AssetName.Sound_MusicGame,
                src: "./assets/sounds/BGM/SpyEyes.mp3",
                type: AssetType.SOUND
            },
            {
                id: AssetName.Sound_EnemyFound,
                src: "./assets/sounds/EnemyFound/FoundSoundEffect.wav",
                type: AssetType.SOUND
            },
            {
                id: AssetName.Sound_GunShot,
                src: "./assets/sounds/GunShoot/8bit_gunloop_explosion.wav",
                type: AssetType.SOUND
            },
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