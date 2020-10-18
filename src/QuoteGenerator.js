
export default class QuoteGenerator {

  constructor() {
    this.MAX_LENGTH = 17;
    this._quotes = [
      "ååh faan",
      "jävla pisslott",
      "vinner ju inget",
      "va äre för en dag",
      "lisa lisa lisa"
    ];
    this._fixes = {
      1: ["1", "0"],
      2: ["-1", "-0"],
      3: ["-10", "-01"],
      4: ["-110", "-001"],
      5: ["-1-01", "-0-11"],
      6: ["-1-001", "-0-110"],
    };
  }

  _getRandom(array){
    return array.sort(() => 0.5 - Math.random())[0];
  }

  _addFix(text, length, location){
    const fix = this._getRandom(this._fixes[length]);
    if (location == -1) {
      text += fix;
    } else {
      text = text.slice(0, location) + fix + text.slice(location);
    }
    return text;
  }

  _formatter(quote) {
    /*
    Make sure that quotes are no longer than MAX_LENGTH
    characters as well as replace all spaces with dash.
    If shorted than MAX_LENGTH characters, fill in with
    numbers to make it look like a real ticket
    */
    quote = quote.replaceAll(' ', '-');
    quote = quote.toUpperCase();
    const padLength = this.MAX_LENGTH - quote.length;
    const firstDashIndex = quote.indexOf("-");
    switch (padLength){
      case 9:
        // Split into 3 + 6
        quote = this._addFix(quote, 3, firstDashIndex);
        quote = this._addFix(quote, 6, -1);
        break;
      case 8:
        // Split 4 + 4
        quote = this._addFix(quote, 4, firstDashIndex);
        quote = this._addFix(quote, 4, -1);
        break;
      case 7:
        // Split 3 + 4
        quote = this._addFix(quote, 3, firstDashIndex);
        quote = this._addFix(quote, 4, -1);
        break;
      case 0:
        break;
      default:
        quote = this._addFix(quote, padLength, firstDashIndex);
        break;
    }
    return quote;
  }

  get(){
    const quote = this._getRandom(this._quotes);
    return this._formatter(quote);
  }

}
