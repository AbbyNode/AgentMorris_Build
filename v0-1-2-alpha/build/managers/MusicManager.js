export class MusicManager {
    constructor() {
        this._isPlaying = true;
    }
    //
    setMusic(musicAssetName) {
        if (this._musicInstance) {
            this._musicInstance.stop();
            this._musicInstance = undefined;
        }
        this._musicAssetName = musicAssetName;
        if (this._isPlaying) {
            this.play();
        }
    }
    getMusic() {
        return this._musicAssetName;
    }
    //
    play() {
        // If exists, resume
        if (this._musicInstance) {
            this._musicInstance.paused = false;
        }
        else {
            // Else, create
            if (!this._musicAssetName) {
                throw new Error("No music selected");
            }
            this._musicInstance = createjs.Sound.play(this._musicAssetName, {
                loop: -1
            });
            this._musicInstance.volume = 0.2;
            this._isPlaying = true;
        }
    }
    //
    pause() {
        if (this._musicInstance) {
            this._musicInstance.paused = true;
            this._isPlaying = false;
        }
    }
    togglePause() {
        if (this._isPlaying) {
            if (this._musicInstance) {
                this._musicInstance.paused = true;
            }
            this._isPlaying = false;
        }
        else {
            if (this._musicInstance) {
                this._musicInstance.paused = false;
            }
            else {
                this.play();
            }
            this._isPlaying = true;
        }
    }
    stop() {
        if (this._musicInstance) {
            this._musicInstance.stop();
            this._isPlaying = false;
        }
    }
}
//# sourceMappingURL=MusicManager.js.map