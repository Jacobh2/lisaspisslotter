import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import AudioPlayer from './AudioPlayer.js';
import TicketGenerator from './TicketGenerator';
import ScratchedStore from './ScratchedStore';
import QuoteGenerator from './QuoteGenerator';
import Message from './Message';


// Prevents accidental page update/edge drag causing scratches to fail
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
window.addEventListener('hashchange', function () { window.location.reload(); });

const audioPlayer = new AudioPlayer();
const ticketGenerator = new TicketGenerator();
const store = new ScratchedStore(audioPlayer);
const quoteGenerator = new QuoteGenerator();
const message = new Message();

// Should we generate a winning ticket or not
const pathStartsWithTicketId = window.location.hash.startsWith('#ticket/');

function onTileReveal({ tileId, tileNr, tileSound }) {
  const audioReference = audioPlayer.playById(tileSound);
  store.updateState(tileId, audioReference)
}

function isCorrectId(id) {
  return ticketGenerator.isCorrectId(id);
}

function playNewTicketSound() {
  return audioPlayer.playNewTicket();
}

function getTileWinDescription(prizeId, multiple) {
  return message.getText(prizeId, multiple)
}

// Only show 'ticket id' box if we do not already have a winning board
const displayNewTicketId = !pathStartsWithTicketId;
// Generate the winning board given the ticket id if given
const tiles = pathStartsWithTicketId ? ticketGenerator.getGameBoardByHash() : ticketGenerator.getRandomLosingGameBoard();

ReactDOM.render(
  <React.StrictMode>
    <App 
      displayNewTicketId={displayNewTicketId}
      store={store}
      tiles={tiles}
      onTileReveal={onTileReveal}
      quote={quoteGenerator.get()}
      isCorrectId={isCorrectId}
      playNewTicketSound={playNewTicketSound}
      getTileWinDescription={getTileWinDescription}
      />
  </React.StrictMode>,
  document.getElementById('root'),
);


// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
