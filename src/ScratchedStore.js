function getPrize({ scratchedTiles }) {
  const tileIds = Object.keys(scratchedTiles);
  const tileIdsWithThreeMatches = tileIds.filter(id => scratchedTiles[id] === 3);
  console.assert(tileIdsWithThreeMatches.length <= 1, scratchedTiles);
  return tileIdsWithThreeMatches[0];
}

function getMultiply({ scratchedTiles }) {
  const tileIds = Object.keys(scratchedTiles);
  for(const tileId of tileIds){
    if(tileId.startsWith("multiply")){
      return tileId.replace("multiply", "");
    }
  }
}

export default class ScratchedStore {
  
  constructor(audioPlayer) {
    this.audioPlayer = audioPlayer;
    this._state = {
      numberOfScratchedTiles: 0,
      scratchedTiles: {},
      winningSoundPlayed: false,
      won: false
    };
    this.TOTAL_NUMBER_OF_TILES = 10;
    this._callbacks = new Set();
    this._hasPlayedLostSound = false;
    this._hasPlayedWinSound = false;
  }
  
  _hasWon() {
    return (
      !this._hasPlayedLostSound &&
      Object.values(this._state.scratchedTiles).includes(3)
    );
  }
  
  _hasLost() {
    return (
      this._hasScratchedLosingTile() ||
      this._hasScratchedAll() &&
      !this._hasWon()
    );
  }

  _hasScratchedLosingTile() {
    return !!this._state.scratchedTiles.cry;
  }
  
  _hasScratchedAll(){
    return this._state.numberOfScratchedTiles === this.TOTAL_NUMBER_OF_TILES;
  }

  _hasPlayedFinalSound(){
    return this._hasPlayedLostSound || this._hasPlayedWinSound;
  }
  
  updateState(tileId, audioReference) {
    this._state.numberOfScratchedTiles++;
    
    // Add the scratched tile to the state
    if (tileId in this._state.scratchedTiles) {
      this._state.scratchedTiles[tileId]++;
    } else {
      this._state.scratchedTiles[tileId] = 1;
    }
    
    const audioPlayer = this.audioPlayer;
    
    if (this._hasWon() && !this._state.winningSoundPlayed) {
      this._state.winningSoundPlayed = true;
      audioReference.addEventListener("ended", () => {
        audioReference.currentTime = 0;
        const winSound = audioPlayer.playWin();
        winSound.addEventListener("ended", () => {
          winSound.currentTime = 0;
          this._hasPlayedWinSound = true;
          this._callbacks.forEach(fn => fn());
        });
      });
    }
    
    if (this._hasLost()) {
      audioReference.addEventListener("ended", () => {
        audioReference.currentTime = 0;
        const lostSound = audioPlayer.playLost();
        lostSound.addEventListener("ended", () => {
          lostSound.currentTime = 0;
          this._hasPlayedLostSound = true;
          this._callbacks.forEach(fn => fn());
        });
      });
    }

    this._callbacks.forEach(fn => fn());
  }

  onUpdate(fn) {
    this._callbacks.add(fn);
  }

  offUpdate(fn) {
    this._callbacks.delete(fn);
  }

  getState() {
    return {
      hasWon: this._hasWon(),
      hasLost: this._hasLost(),
      prize: getPrize(this._state),
      multiply: getMultiply(this._state),
      hasPlayedFinalSound: this._hasPlayedFinalSound(),
    };
  }
}
