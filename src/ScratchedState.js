

export default class ScratchedState {

    constructor(audioPlayer) {
        console.log("Player:", audioPlayer);
        this.audioPlayer = audioPlayer;
        this._state = {
            numberOfScratchedTiles: 0,
            scratchedTiles: {},
            winningSoundPlayed: false,
            won: false
        };
        this.TOTAL_NUMBER_OF_TILES = 10;
    }

    _setWon() {
        // We need 3 of the same thing to win
        this._state.won = Object.values(this._state.scratchedTiles).includes(3);
    }

    hasWon() {
        return this._state.won;
    }

    hasScratchedAll(){
        return this._state.numberOfScratchedTiles === this.TOTAL_NUMBER_OF_TILES;
    }

    updateState(tileId, audioReference) {
        this._state.numberOfScratchedTiles++;

        // Add the scratched tile to the state
        if (tileId in this._state.scratchedTiles) {
            this._state.scratchedTiles[tileId]++;
        } else {
            this._state.scratchedTiles[tileId] = 1;
        }

        // Check if we've won
        this._setWon();

        const audioPlayer = this.audioPlayer;

        if (this.hasWon() && !this._state.winningSoundPlayed) {
            this._state.winningSoundPlayed = true;
            audioReference.addEventListener("ended", function(){
                audioReference.currentTime = 0;
                audioPlayer.playWin();
           });
        }

        if (this.hasScratchedAll() && !this.hasWon()) {
            audioReference.addEventListener("ended", function(){
                audioReference.currentTime = 0;
                audioPlayer.playLost();
            });
        }
    }
}
