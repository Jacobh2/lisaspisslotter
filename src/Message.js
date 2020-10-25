class Text {
  constructor(singular, plural){
    this.PLACEHOLDER_PLURAL = "@";
    this._singular = singular;
    this._plural = plural;
  }

  getSingular(){
    return this._singular;
  }

  getPlural(times){
    return this._plural.replace(this.PLACEHOLDER_PLURAL, times);
  }
}


export default class Message {
  constructor() {
    this._iconStart = {
      'champagne': '🍾🍾🍾',
      'speech': '💬💬💬',
      'beer': '🍻🍺🍻',
      'beer2': '🍻🍺🍻',
      'beer3': '🍺🍺🍺',
      'vip': '😎😎😎',
      'new': '🆕🆕🆕',
      'wine': '🍷🍷🍷',
      'burger': '🍔🍔🍔',
      'karaoke': '🎤🎙️🎤',
      'hat': '🍷🎩🍷',
    };
    this._iconEnd = {
      'champagne': '🥂🥂🥂',
      'speech': '💬💬💬',
      'beer': '🍻🍺🍻',
      'beer2': '🍻🍺🍻',
      'beer3': '🍺🍺🍺',
      'vip': '😎😎😎',
      'new': '🆕🆕🆕',
      'wine': '🍷🍷🍷',
      'burger': '🍔🍔🍔',
      'karaoke': '🎤🎙️🎤',
      'hat': '🎩🍷🎩',
    };
    this._texts = {
      'champagne': new Text('Woho! Drink bubbles with Lisa!', 'Woho! Drink @ bubbles with Lisa!'),
      'speech': new Text('Hold a speech to Lisa', 'Hold @ speeches to Lisa during the evening'),
      'beer': new Text('Cheers with Lisa', 'Cheers @ times with Lisa!'),
      'beer2': new Text('Drink beer!', 'Drink @ beers!'),
      'beer3': new Text('Drink more beer!', 'Drink @ more beers!'),
      'vip': new Text('Omg, you just won 1 VIP ticket', 'Omg, you still just won 1 VIP ticket'),
      'new': new Text('New ticket: Go to toastmasters to find out', '@ new tickets: Go to toastmasters to find out'),
      'wine': new Text('Congratz! Have some wine!', 'Congratz! Drink @ wineglases!!'),
      'burger': new Text('Have some tasty snacks!', 'Have @ tasty snacks!'),
      'karaoke': new Text('Sing a Karaoke song with Lisa\'s dad!', 'Sing @ Karaoke songs during the night!'),
      'hat': new Text('You won the wine-hat!', 'You won the wine-hat!!'),
    };
  }

  _getText(prizeId, multiple){
    console.log("Getting price", prizeId);
    const text = this._texts[prizeId];
    console.log("yield text", text);
    if(!text){
      return '😎🍺🍾 Wooohoo! You won yourself a ' + prizeId;
    }
    return  multiple > 1 ? text.getPlural(multiple) : text.getSingular();
  }

  getText(prizeId, multiple){
    console.log("Will get text for price", prizeId, multiple, "With this:", this);
    multiple = multiple ? multiple : '1';
    return `${this._iconStart[prizeId]} ${this._getText(prizeId, multiple)} ${this._iconEnd[prizeId]}`;
  }

}
