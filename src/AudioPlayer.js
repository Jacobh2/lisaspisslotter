import ohfan from './public/sounds/ohfan.mp3';
import hamburgare_eller_baguette from './public/sounds/hamburgare_eller_baguette.mp3';
import ny_lott from './public/sounds/ny_lott.mp3';
import pest_eller_kolera from './public/sounds/pest_eller_kolera.mp3';
import redbull from './public/sounds/redbull.mp3';
import drivmedel_100_kr from './public/sounds/drivmedel_100_kr.mp3';
import klipp_och_klistra from './public/sounds/klipp_och_klistra.mp3';
import redan_samst from './public/sounds/redan_samst.mp3';
import vinner_ingenting from './public/sounds/vinner_ingenting.mp3';
import win from './public/sounds/win.mp3';

export default class AudioPlayer {

  constructor() {
    this._sounds = {
      ohfan: new Audio(ohfan),
      hamburgare_eller_baguette: new Audio(hamburgare_eller_baguette),
      pest_eller_kolera: new Audio(pest_eller_kolera),
      redbull: new Audio(redbull),
      drivmedel_100_kr: new Audio(drivmedel_100_kr),
      klipp_och_klistra: new Audio(klipp_och_klistra),
      redan_samst: new Audio(redan_samst),
      vinner_ingenting: new Audio(vinner_ingenting),
    };

    this._winSound = new Audio(win);
    this._newTicketSound = new Audio(ny_lott);
  }

  playRandom() {
    const list = Object.values(this._sounds).sort(() => 0.5 - Math.random());
    const audio = list[0];
    audio.play();
    return audio;
  }

  playById(id) {
    let sound = null;
    switch(id){
      case 'random':
        return this.playRandom();
      case 'ny_lott':
        sound = this._newTicketSound;
        break;
      case 'win':
        sound = this._winSound;
        break;
      default:
        sound = this._sounds[id];
        break;
    }
    sound.play();
    return sound;
  }

  playWin() {
    return this.playById('win');
  }

  playLost() {
    return this.playById('vinner_ingenting');
  }

  playNewTicket() {
    return this.playById('ny_lott');
  }
}