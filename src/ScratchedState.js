

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

    _checkIfWon() {
        // We need 3 of the same thing to win
        console.log("Scratched tiles:", this._state.scratchedTiles);
        return Object.values(this._state.scratchedTiles).includes(3);
    }


    onTileReveal(tileId, audioReference) {
        this._state.numberOfScratchedTiles++;
        console.log("Have scratched", this._state.numberOfScratchedTiles, "tiles");

        // Add the scratched tile to the state
        if (tileId in this._state.scratchedTiles) {
            this._state.scratchedTiles[tileId]++;
        } else {
            this._state.scratchedTiles[tileId] = 1;
        }

        // Check if we've won
        this._state.won = this._checkIfWon();

        if (this._state.won && !this._state.winningSoundPlayed) {
            console.log("Play win sound!!");
            this._state.winningSoundPlayed = true;
            audioReference.addEventListener("ended", function(){
                audioReference.currentTime = 0;
                this.audioPlayer.playWin();
                console.log("Win sound should have been played");
           });
        }

        if (this._state.numberOfScratchedTiles === this.TOTAL_NUMBER_OF_TILES) {
            // We're done! Check if we lost
            if (!this._state.won) {
                console.log("Play lose sound!!");
                audioReference.addEventListener("ended", function(){
                    audioReference.currentTime = 0;
                    this.audioPlayer.playLost();
                    console.log("Lose sound should have been played");
               });
            }
        }
    }
}
