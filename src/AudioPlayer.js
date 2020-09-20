import ohfan from './sounds/ohfan.wav';
import anton_skratt from './sounds/anton_skratt.wav';
import hamburgare_eller_baguette from './sounds/hamburgare_eller_baguette.wav';
import ny_lott from './sounds/ny_lott.wav';
import pest_eller_kolera from './sounds/pest_eller_kolera.wav';
import redbull from './sounds/redbull.wav';
import drivmedel_100_kr from './sounds/drivmedel_100_kr.wav';
import klipp_och_klistra from './sounds/klipp_och_klistra.wav';
import redan_samst from './sounds/redan_samst.wav';
import vinner_ingenting from './sounds/vinner_ingenting.wav';

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
  }

  playRandom() {
    const list = Object.values(this._sounds).sort(() => 0.5 - Math.random());
    const audio = list[0];
    audio.play();
  }

  playById(id) {
    if (id === 'random') {
      console.log("Will play something random");
      this.playRandom();
    } else {
      console.log("Will play", id);
      this._sounds[id].play();
    }
  }

  playLost() {
    this._sounds.vinner_ingenting.play();
  }
}