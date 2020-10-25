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
      ohfan: this._registerAudio('ohfan', ohfan),
      anton_skratt: this._registerAudio('anton_skratt', anton_skratt),
      hamburgare_eller_baguette: this._registerAudio('hamburgare_eller_baguette', hamburgare_eller_baguette),
      pest_eller_kolera: this._registerAudio('pest_eller_kolera', pest_eller_kolera),
      redbull: this._registerAudio('redbull', redbull),
      drivmedel_100_kr: this._registerAudio('drivmedel_100_kr', drivmedel_100_kr),
      klipp_och_klistra: this._registerAudio('klipp_och_klistra', klipp_och_klistra),
      redan_samst: this._registerAudio('redan_samst', redan_samst),
      vinner_ingenting: this._registerAudio('vinner_ingenting', vinner_ingenting),
    };

    this._winSound = this._registerAudio('win', win);
    this._newTicketSound = this._registerAudio('ny_lott', ny_lott);

    this._state = {
      playingAudios: new Set()
    };

    this._callbacks = new Set();
  }

  _registerAudio(id, input) {
    const audio = new Audio(input);
    audio.addEventListener('play', () => {
      console.log('audio started', id);
      this._state.playingAudios.add(id);
      this._callbacks.forEach(fn => fn());
    });
    audio.addEventListener('ended', () => {
      console.log('audio ended', id);
      audio.currentTime = 0;
      this._state.playingAudios.delete(id);
      this._callbacks.forEach(fn => fn());
    });

    return audio;
  }

  onUpdate(fn) {
    this._callbacks.add(fn);
  }

  offUpdate(fn) {
    this._callbacks.delete(fn);
  }

  isPlaying() {
    return this._state.playingAudios.size > 0;
  }

  playRandom() {
    const list = Object.values(this._sounds).sort(() => 0.5 - Math.random());
    const audio = list[0];
    audio.play();
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
  }

  _queueAudio(audio) {
    if (!this.isPlaying()) return audio.play();

    const fn = () => {
      if (this.isPlaying()) return;

      audio.play();
      this.offUpdate(fn);
    };
    this.onUpdate(fn);
  }

  queueWin() {
    this._queueAudio(this._winSound);
  }

  queueLost() {
    this._queueAudio(this._sounds.vinner_ingenting);
  }

  queueNewTicket() {
    this._queueAudio(this._sounds.ny_lott);
  }
}