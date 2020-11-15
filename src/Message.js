import Tiles from './Tiles';

export default class Message {
  constructor() {
    this._tiles = new Tiles().getTilesDict();
  }

  getText(id, multiple) {
    const text = this._tiles[id].getText(multiple);
    if (!text) {
      return '😎🍺🍾 Wooohoo! You won yourself a ' + id;
    }
    return text;
  }

}
