function getPrize({ scratchedTiles }) {
  const tileIds = Object.keys(scratchedTiles);
  const tileIdsWithThreeMatches = tileIds.filter(id => scratchedTiles[id] === 3);
  console.assert(tileIdsWithThreeMatches.length <= 1, scratchedTiles);
  return tileIdsWithThreeMatches[0];
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
  }
  
  _hasWon() {
    return Object.values(this._state.scratchedTiles).includes(3);
  }
  
  _hasLost() {
    return (
      this._hasScratchedAll() &&
      !this._hasWon()
    );
  }
  
  _hasScratchedAll(){
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
    
    const audioPlayer = this.audioPlayer;
    
    if (this._hasWon() && !this._state.winningSoundPlayed) {
      this._state.winningSoundPlayed = true;
      audioReference.addEventListener("ended", function(){
        audioReference.currentTime = 0;
        audioPlayer.playWin();
      });
    }
    
    if (this._hasLost()) {
      audioReference.addEventListener("ended", function(){
        audioReference.currentTime = 0;
        audioPlayer.playLost();
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
      prize: getPrize(this._state)
    };
  }
}
