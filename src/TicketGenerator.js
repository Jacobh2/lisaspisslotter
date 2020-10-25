
export default class TicketGenerator {

  constructor() {
    // This is a list of IDs that will yield a winning ticket!
    // It is controlled by the path from window.location
    this._numberOfLosingTiles = 4;
    this._tiles = {
      champagne: { id: 'champagne', sound: 'redan_samst' },
      beer: { id: 'beer', sound: 'random' },
      vip: { id: 'vip', sound: 'vinner_ingenting' },
      burger: { id: 'burger', sound: 'hamburgare_eller_baguette' },
      cocktail: { id: 'cocktail', sound: 'redbull' },
      hat: { id: 'hat', sound: 'random' },
      key: { id: 'key', sound: 'drivmedel_100_kr' },
      beer2: { id: 'beer2', sound: 'klipp_och_klistra' },
      wine: { id: 'wine', sound: 'ohfan' },
      speech: { id: 'speech', sound: 'pest_eller_kolera' },
      beer3: { id: 'beer3', sound: 'random' },
      new: { id: 'new', sound: 'ny_lott' },
      karaoke: { id: 'karaoke', sound: 'random' },
    };
    this._winning_ids = {
      'beerwithme': [{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer3","sound":"random"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"beer","sound":"random"},{"id":"beer","sound":"random"},{"id":"vip","sound":"vinner_ingenting"},{"id":"beer","sound":"random"},{"id":"beer3","sound":"random"},{"id":"multiply2","sound":"anton_skratt"}],
      'anyonesaidbeer': [{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer","sound":"random"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer3","sound":"random"},{"id":"beer","sound":"random"},{"id":"beer3","sound":"random"},{"id":"vip","sound":"vinner_ingenting"},{"id":"multiply5","sound":"anton_skratt"}],
      'morebeertothepeople': [{"id":"vip","sound":"vinner_ingenting"},{"id":"beer3","sound":"random"},{"id":"beer3","sound":"random"},{"id":"beer","sound":"random"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"beer","sound":"random"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer3","sound":"random"},{"id":"multiply5","sound":"anton_skratt"}],
      'wineanddine': [{"id":"beer","sound":"random"},{"id":"vip","sound":"vinner_ingenting"},{"id":"beer3","sound":"random"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"beer","sound":"random"},{"id":"wine","sound":"ohfan"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"wine","sound":"ohfan"},{"id":"wine","sound":"ohfan"},{"id":"multiply10","sound":"anton_skratt"}],
      'morebubbles': [{"id":"beer","sound":"random"},{"id":"beer3","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"champagne","sound":"redan_samst"},{"id":"champagne","sound":"redan_samst"},{"id":"beer2","sound":"klipp_och_klistra"},{"id":"vip","sound":"vinner_ingenting"},{"id":"beer","sound":"random"},{"id":"multiply5","sound":"anton_skratt"}],
      'winehat': [{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"hat","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"champagne","sound":"redan_samst"},{"id":"beer","sound":"random"},{"id":"beer","sound":"random"},{"id":"vip","sound":"vinner_ingenting"},{"id":"hat","sound":"random"},{"id":"hat","sound":"random"},{"id":"multiply5","sound":"anton_skratt"}],
      'karaokeuntilyoudrop': [{"id":"karaoke","sound":"random"},{"id":"beer","sound":"random"},{"id":"karaoke","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"champagne","sound":"redan_samst"},{"id":"vip","sound":"vinner_ingenting"},{"id":"beer","sound":"random"},{"id":"karaoke","sound":"random"},{"id":"multiply10","sound":"anton_skratt"}],
      'karaokeallnight':  [{"id":"beer","sound":"random"},{"id":"karaoke","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"karaoke","sound":"random"},{"id":"karaoke","sound":"random"},{"id":"beer","sound":"random"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"champagne","sound":"redan_samst"},{"id":"vip","sound":"vinner_ingenting"},{"id":"multiply5","sound":"anton_skratt"}],
      'comewinewithme': [{"id":"wine","sound":"ohfan"},{"id":"champagne","sound":"redan_samst"},{"id":"beer","sound":"random"},{"id":"wine","sound":"ohfan"},{"id":"beer","sound":"random"},{"id":"wine","sound":"ohfan"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"champagne","sound":"redan_samst"},{"id":"vip","sound":"vinner_ingenting"},{"id":"multiply5","sound":"anton_skratt"}],
      'bubblebubblesbubbles': [{"id":"beer","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"champagne","sound":"redan_samst"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"champagne","sound":"redan_samst"},{"id":"vip","sound":"vinner_ingenting"},{"id":"vip","sound":"vinner_ingenting"},{"id":"beer","sound":"random"},{"id":"cocktail","sound":"redbull"},{"id":"multiply5","sound":"anton_skratt"}],
      'shakennotstirred': [{"id":"champagne","sound":"redan_samst"},{"id":"cocktail","sound":"redbull"},{"id":"cocktail","sound":"redbull"},{"id":"vip","sound":"vinner_ingenting"},{"id":"cocktail","sound":"redbull"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"champagne","sound":"redan_samst"},{"id":"beer","sound":"random"},{"id":"beer","sound":"random"},{"id":"multiply2","sound":"anton_skratt"}],
      'ontherocks': [{"id":"champagne","sound":"redan_samst"},{"id":"cocktail","sound":"redbull"},{"id":"cocktail","sound":"redbull"},{"id":"champagne","sound":"redan_samst"},{"id":"beer","sound":"random"},{"id":"cocktail","sound":"redbull"},{"id":"beer","sound":"random"},{"id":"vip","sound":"vinner_ingenting"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"multiply10","sound":"anton_skratt"}],
      'longestspeechever': [{"id":"vip","sound":"vinner_ingenting"},{"id":"beer","sound":"random"},{"id":"speech","sound":"pest_eller_kolera"},{"id":"speech","sound":"pest_eller_kolera"},{"id":"champagne","sound":"redan_samst"},{"id":"speech","sound":"pest_eller_kolera"},{"id":"burger","sound":"hamburgare_eller_baguette"},{"id":"beer","sound":"random"},{"id":"champagne","sound":"redan_samst"},{"id":"multiply2","sound":"anton_skratt"}],
    };
    this._lose_tile = {
      id: 'cry',
      sound: 'ohfan',
      overlay: 'lose'
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

  isCorrectId(id){
    return this._winning_ids[id];
  }

  getRandomLosingGameBoard() {
    const board = this._generateBoard(false, this._getRandom());
    board.push(this._lose_tile);
    return board;
  }

  getGameBoardByHash() {
    const path = window.location.hash;
    const winningId = path.slice(8);
    let board = null;
    if (this.isCorrectId(winningId)) {
      board = this._winning_ids[winningId];
      board.push(this._lose_tile);
      return board;
    }
    board = this._generateBoard(false, this._getRandom());
    board.push(this._lose_tile);
    return board;
  }

}
