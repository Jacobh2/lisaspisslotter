import ohfan from './public/sounds/ohfan.mp3';
import anton_skratt from './public/sounds/anton_skratt.mp3';
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
      anton_skratt: new Audio(anton_skratt),
      hamburgare_eller_baguette: new Audio(hamburgare_eller_baguette),
      ny_lott: new Audio(ny_lott),
      pest_eller_kolera: new Audio(pest_eller_kolera),
      redbull: new Audio(redbull),
      drivmedel_100_kr: new Audio(drivmedel_100_kr),
      klipp_och_klistra: new Audio(klipp_och_klistra),
      redan_samst: new Audio(redan_samst),
      vinner_ingenting: new Audio(vinner_ingenting),
    };

    this._winSound = new Audio(win);
  }

  playRandom() {
    const list = Object.values(this._sounds).sort(() => 0.5 - Math.random());
    const audio = list[0];
    audio.play();
    return audio;
  }

  playById(id) {
    if (id === 'random') {
      return this.playRandom();
    } else {
      const audio = this._sounds[id];
      audio.play();
      return audio;
    }
  }

  playWin() {
    this._winSound.play();
    return this._winSound;
  }

  playLost() {
    this._sounds.vinner_ingenting.play();
    return this._sounds.vinner_ingenting;
  }
}