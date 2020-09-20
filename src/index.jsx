import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import AudioPlayer from './AudioPlayer.js';

import TicketGenerator from './TicketGenerator';


// Prevents accidental page update/edge drag causing scratches to fail
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

const audioPlayer = new AudioPlayer();
const ticketGenerator = new TicketGenerator();

function onTileReveal({ tileId, tileNr, tileSound }) {
  audioPlayer.playById(tileSound);

  // TODO Maybe keep global state between tile reveals here
  // Act on all tiles scratched
  // Display different screen (React component) between win and lose
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
