import beer from './images/tiles/beer.png';
import burger from './images/tiles/burger.png';
import cocktail from './images/tiles/cocktail.png';
import key from './images/tiles/key.png';
import wine from './images/tiles/wine.png';
import speech from './images/tiles/speech.png';
import champange from './images/tiles/champange.png';
import newTicket from './images/tiles/new.png';
import multiply1 from './images/tiles/multiply_1.png';
import multiply2 from './images/tiles/multiply_2.png';
import multiply5 from './images/tiles/multiply_5.png';
import multiply10 from './images/tiles/multiply_10.png';


export default class TicketGenerator {

  constructor() {
    // This is a list of IDs that will yield a winning ticket!
    // It is controlled by the path from window.location
    this._winning_ids = [
      'abc123', 'def456', 'ghi789'
    ];
    this._numberOfLosingTiles = 4;
    this._tiles = {
      beer: { id: 'beer', icon: beer, sound: 'random' },
      burger: { id: 'burger', icon: burger, sound: 'hamburgare_eller_baguette' },
      cocktail: { id: 'cocktail', icon: cocktail, sound: 'redbull' },
      key: { id: 'key', icon: key, sound: 'drivmedel_100_kr' },
      wine: { id: 'wine', icon: wine, sound: 'ohfan' },
      speech: { id: 'speech', icon: speech, sound: 'pest_eller_kolera' },
      champange: { id: 'champange', icon: champange, sound: 'redan_samst' },
      new: { id: 'new', icon: newTicket, sound: 'ny_lott' },
    };
  }

  _shuffle(arrayToShuffle) {
    return arrayToShuffle.sort(() => 0.5 - Math.random());
  }

  _getExtra() {
    const availableExtra = [multiply1, multiply2, multiply5, multiply10];
    const times = this._shuffle(availableExtra)[0];
    return { id: 'multiply', icon: times, sound: 'anton_skratt' };
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

  _generateBoard(winning) {
    const gameBoard = [];

    const selectedTile = this._getRandom();
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

  getGameBoardByUrl() {
    const path = window.location.pathname;
    if (this._winning_ids.includes(path.slice(8))) {
      return this._generateBoard(true);
    }
    return this._generateBoard(false);
  }

}
