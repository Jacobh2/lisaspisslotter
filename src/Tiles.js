class Text {
  constructor(singular, plural) {
    this.PLACEHOLDER_PLURAL = "@";
    this._singular = singular;
    this._plural = plural;
  }

  getSingular() {
    return this._singular;
  }

  getPlural(times) {
    return this._plural.replace(this.PLACEHOLDER_PLURAL, times);
  }
}

class Tile {
  constructor(id, sound, startEmpoji, endEmoji, singularText, pluralText) {
    this.id = id;
    this._sound = sound;
    this._startEmoji = startEmpoji;
    this._endEmoji = endEmoji;
    this._text = new Text(singularText, pluralText);
  }

  getTicketTile() {
    return { id: this.id, sound: this._sound };
  }

  getText(multiple) {
    multiple = multiple ? multiple : '1';
    const text = multiple > 1 ? this._text.getPlural(multiple) : this._text.getSingular();
    return `${this._startEmoji} ${text} ${this._endEmoji}`;
  }

}

export default class Tiles {
  constructor() {
    this._tiles = [
      new Tile('champagne', 'redan_samst', '🍾🍾🍾', '🥂🥂🥂', 'Woho! Drink bubbles with Lisa!', 'Woho! Drink @ bubbles with Lisa!'),
      new Tile('beer', 'random', '🍻🍺🍻', '🍻🍺🍻', 'Cheers with Lisa', 'Cheers @ times with Lisa!'),
      new Tile('vip', 'vinner_ingenting', '😎😎😎', '😎😎😎', 'Omg, you just won 1 VIP ticket', 'Omg, you still just won 1 VIP ticket'),
      new Tile('burger', 'hamburgare_eller_baguette', '🍔🍔🍔', '🍔🍔🍔', 'Have some tasty snacks!', 'Have @ tasty snacks!'),
      new Tile('cocktail', 'redbull', '🍸🍹🍸', '🍹🍸🍹', 'Wooh! You won a drink', 'Wohoo! You won @ drinks!'),
      new Tile('hat', 'random', '🍷🎩🍷', '🎩🍷🎩', 'You won the wine-hat!', 'You won the wine-hat!!'),
      new Tile('key', 'drivmedel_100_kr', '🔑🔑🔑', '🔑🔑🔑', 'You are the designated driver!', 'You are the designated driver for a week!'),
      new Tile('beer2', 'klipp_och_klistra', '🍻🍺🍻', '🍻🍺🍻', 'Drink beer!', 'Drink @ beers!'),
      new Tile('wine', 'ohfan', '🍷🍷🍷', '🍷🍷🍷', 'Congratz! Have some wine!', 'Congratz! Drink @ wineglases!!'),
      new Tile('speech', 'pest_eller_kolera', '💬💬💬', '💬💬💬', 'Hold a speech to Lisa', 'Hold @ speeches to Lisa during the evening'),
      new Tile('beer3', 'random', '🍺🍺🍺', '🍺🍺🍺', 'Drink more beer!', 'Drink @ more beers!'),
      new Tile('new', 'ny_lott', '🆕🆕🆕', '🆕🆕🆕', 'New ticket: Go to toastmasters to find out', '@ new tickets: Go to toastmasters to find out'),
      new Tile('karaoke', 'random', '🎤🎙️🎤', '🎤🎙️🎤', 'Sing a Karaoke song!', 'Sing @ Karaoke songs during the night!'),
      new Tile('gift', 'pest_eller_kolera', '🎁🎁🎁', '🎁🎁🎁', 'You won yourself a gift!', 'You won yourself a gift!'),
    ];
    this._tiles_dict = {};
    this._tiles.forEach(t => this._tiles_dict[t.id] = t);
  }

  getTiles() {
    return this._tiles;
  }

  getTilesDict() {
    return this._tiles_dict;
  }
}
