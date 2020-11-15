import Tiles from './Tiles.js';

export default class TicketGenerator {

  constructor() {
    // This is a list of IDs that will yield a winning ticket!
    // It is controlled by the path from window.location
    this._numberOfLosingTiles = 4;
    this._tiles = {};
    new Tiles().getTiles().forEach(t => this._tiles[t.id] = t.getTicketTile());
    this._winning_ids = {
      // beer x3
      'a6b236d9-1771-4d46-a73f-1f0321dac15c': [{ "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer3", "sound": "random" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "beer3", "sound": "random" }, { "id": "multiply2", "sound": "random" }],
      'e7168ceb-d0cb-4464-93c0-de3d70c2c6a0': [{ "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer", "sound": "random" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer3", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "beer3", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "multiply5", "sound": "random" }],
      '6190a770-1013-4d6c-a967-cc1bc031bcce': [{ "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer3", "sound": "random" }, { "id": "beer3", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer", "sound": "random" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer3", "sound": "random" }, { "id": "multiply5", "sound": "random" }],
      // wine x2
      'c80b15ac-1c18-4b61-9bc6-8e93a8578e70': [{ "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer3", "sound": "random" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "beer", "sound": "random" }, { "id": "wine", "sound": "ohfan" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "wine", "sound": "ohfan" }, { "id": "wine", "sound": "ohfan" }, { "id": "multiply10", "sound": "random" }],
      '4de0ad80-8e9a-446c-a5c7-c713596ef07e': [{ "id": "wine", "sound": "ohfan" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "wine", "sound": "ohfan" }, { "id": "beer", "sound": "random" }, { "id": "wine", "sound": "ohfan" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "multiply5", "sound": "random" }],
      // champagne x2
      '3a516503-be75-4f18-add4-8ec236ec39ec': [{ "id": "beer", "sound": "random" }, { "id": "beer3", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer2", "sound": "klipp_och_klistra" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "multiply5", "sound": "random" }],
      'bf493a15-f8dc-4993-8dfd-6afdef362023': [{ "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "cocktail", "sound": "redbull" }, { "id": "multiply5", "sound": "random" }],
      // wine-hat
      '50c60b42-c2fc-435e-bf19-d7fd8afe0449': [{ "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "hat", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "hat", "sound": "random" }, { "id": "hat", "sound": "random" }, { "id": "multiply1", "sound": "random" }],
      // karaoke x2
      '63eeca7b-7eb1-40de-a804-e327f8b0cb0b': [{ "id": "karaoke", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "karaoke", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "karaoke", "sound": "random" }, { "id": "multiply1", "sound": "random" }],
      'e64c998a-738f-45ef-9ce3-9e2443ada0c9': [{ "id": "beer", "sound": "random" }, { "id": "karaoke", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "karaoke", "sound": "random" }, { "id": "karaoke", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "multiply1", "sound": "random" }],
      // cocktail x2
      '374600b8-e9cc-449b-8694-3b3fbe679b17': [{ "id": "champagne", "sound": "redan_samst" }, { "id": "cocktail", "sound": "redbull" }, { "id": "cocktail", "sound": "redbull" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "cocktail", "sound": "redbull" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "multiply2", "sound": "random" }],
      '136d21cb-05c2-4c87-abd0-81f5cbaef0c3': [{ "id": "champagne", "sound": "redan_samst" }, { "id": "cocktail", "sound": "redbull" }, { "id": "cocktail", "sound": "redbull" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "cocktail", "sound": "redbull" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "multiply10", "sound": "random" }],
      // speech
      '305cc9ba-7a19-4304-b6f7-f0c619a26f0f': [{ "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "speech", "sound": "pest_eller_kolera" }, { "id": "speech", "sound": "pest_eller_kolera" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "speech", "sound": "pest_eller_kolera" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "multiply1", "sound": "random" }],
      // gift x 3
      '5117c122-e784-4461-a91c-a90193f2277a': [{ "id": "champagne", "sound": "redan_samst" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "beer", "sound": "random" }, { "id": "beer", "sound": "random" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "multiply1", "sound": "random" }],
      '91367932-e21c-4ebd-a2cc-7e3c4c9b804e': [{ "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "beer", "sound": "random" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "multiply1", "sound": "random" }],
      'fe0d2040-80a4-405a-874e-3af30b909fcb': [{ "id": "gift", "sound": "pest_eller_kolera" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "gift", "sound": "pest_eller_kolera" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "multiply1", "sound": "random" }],
      // vip x3
      'e7e52cde-d9ba-45af-8689-fd3b50ee176d': [{ "id": "vip", "sound": "vinner_ingenting" }, { "id": "cocktail", "sound": "redbull" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "multiply1", "sound": "random" }],
      '221fda42-af4a-4a4e-8bcf-b785e47c4bbd': [{ "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "cocktail", "sound": "redbull" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "multiply1", "sound": "random" }],
      'd461dcc7-f0c0-4131-bcb4-7a4abc9e324a': [{ "id": "vip", "sound": "vinner_ingenting" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "vip", "sound": "vinner_ingenting" }, { "id": "beer", "sound": "random" }, { "id": "champagne", "sound": "redan_samst" }, { "id": "beer", "sound": "random" }, { "id": "burger", "sound": "hamburgare_eller_baguette" }, { "id": "cocktail", "sound": "redbull" }, { "id": "multiply1", "sound": "random" }],
    };
    this._lose_tile = {
      id: 'cry',
      sound: 'ohfan',
      overlay: 'lose'
    };
  }

  getTile(id) {
    return this._tiles[id];
  }

  _shuffle(arrayToShuffle) {
    return arrayToShuffle.sort(() => 0.5 - Math.random());
  }

  _getExtra() {
    const availableExtra = ['multiply1', 'multiply2', 'multiply5', 'multiply10'];
    const times = this._shuffle(availableExtra)[0];
    return { id: times, sound: 'random' };
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

  isCorrectId(id) {
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
