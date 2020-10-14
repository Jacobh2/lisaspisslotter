
export default class TicketGenerator {

  constructor() {
    // This is a list of IDs that will yield a winning ticket!
    // It is controlled by the path from window.location
    this._winning_ids = [
      'abc123', 'def456', 'ghi789'
    ];
    this._numberOfLosingTiles = 4;
    this._tiles = {
      beer: { id: 'beer', sound: 'random' },
      beer2: { id: 'beer2', sound: 'klipp_och_klistra' },
      beer3: { id: 'beer3', sound: 'random' },
      vip: { id: 'vip', sound: 'vinner_ingenting' },
      burger: { id: 'burger', sound: 'hamburgare_eller_baguette' },
      cocktail: { id: 'cocktail', sound: 'redbull' },
      key: { id: 'key', sound: 'drivmedel_100_kr' },
      wine: { id: 'wine', sound: 'ohfan' },
      speech: { id: 'speech', sound: 'pest_eller_kolera' },
      champagne: { id: 'champagne', sound: 'redan_samst' },
      new: { id: 'new', sound: 'ny_lott' },
    };
  }

  getTile(id){
    return this._tiles[id];
  }

  _shuffle(arrayToShuffle) {
    return arrayToShuffle.sort(() => 0.5 - Math.random());
  }

  _getExtra() {
    const availableExtra = ['multiply1', 'multiply2', 'multiply5', 'multiply10'];
    const times = this._shuffle(availableExtra)[0];
    return { id: times, sound: 'anton_skratt' };
  }

  _getRandom(selectFrom) {
    // Get a random tile
    if (selectFrom === undefined) {
      selectFrom = Object.values(this._tiles);
    }
    return this._shuffle(selectFrom)[0];
  }

  _getAllTilesExcept(selectedTile) {
    const allTilesExceptSelected = Object.assign({}, this._tiles);
    delete allTilesExceptSelected[selectedTile.id];
    return Object.values(allTilesExceptSelected);
  }

  _generateBoard(winning, selectedTile) {
    const gameBoard = [];

    // Add winning tile 3 tiles if 'winning', else 2 times
    const addAmountWinning = winning ? 3 : 2;
    for (let i = 0; i < addAmountWinning; i++) {
      gameBoard.push(selectedTile);
    }

    const allTilesExceptSelected = this._getAllTilesExcept(selectedTile);
    const losingTiles = allTilesExceptSelected.slice(0, this._numberOfLosingTiles);
    // Add the losing tile 6 times (9 - 3) if 'winning', else 7
    const addAmountLosing = winning ? 6 : 7;
    for (let i = 0; i < addAmountLosing; i++) {
      gameBoard.push(losingTiles[i % this._numberOfLosingTiles]);
    }

    // Shuffle the game board!
    const shuffledGameBoard = this._shuffle(gameBoard);

    // Add extra tile at the end
    shuffledGameBoard.push(this._getExtra());

    return shuffledGameBoard;
  }

  getRandomLosingGameBoard() {
    return this._generateBoard(false, this._getRandom());
  }

  getGameBoardByHash() {
    const path = window.location.hash;
    if (this._winning_ids.includes(path.slice(8))) {
      return this._generateBoard(true, this._getRandom());
    }
    return this._generateBoard(false, this._getRandom());
  }

}
