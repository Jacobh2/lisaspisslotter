import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import AudioPlayer from './AudioPlayer.js';
import TicketGenerator from './TicketGenerator';
import ScratchedState from './ScratchedState';


// Prevents accidental page update/edge drag causing scratches to fail
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

const audioPlayer = new AudioPlayer();
const ticketGenerator = new TicketGenerator();
const state = new ScratchedState(audioPlayer);

function onTileReveal({ tileId, tileNr, tileSound }) {
  const audioReference = audioPlayer.playById(tileSound);
  state.updateState(tileId, audioReference)

  if(state.hasScratchedAll()){
    // The game is finished!
    if(state.hasWon()){
      //TODO: Show a winning display (React component)
      console.log("Congratz!");
    } else {
      //TODO: Show a losing display (React component)
      console.log("Too bad!");
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App tiles={ticketGenerator.getGameBoardByUrl()} onTileReveal={onTileReveal} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
