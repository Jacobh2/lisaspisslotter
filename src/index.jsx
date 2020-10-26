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

function onTileReveal({ tileId, tileNr, tileSound }) {
  console.log("Scratched tile", tileNr, tileId, "with sound", tileSound);
  audioPlayer.playById(tileSound);
  store.updateState(tileId);

  if (store._hasScratchedAll()) {
    // The game is finished!
    if (store._hasWon()) {
      //TODO: Show a winning display (React component)
      console.log("Congratz!");
    } else {
      //TODO: Show a losing display (React component)
      console.log("Too bad!");
    }
  }
}

function isCorrectId(id){
  return ticketGenerator.isCorrectId(id);
}

function playNewTicketSound(){
  return audioPlayer.queueNewTicket();
}

function getTileWinDescription(prizeId, multiple){
  return message.getText(prizeId, multiple);
}

if (!window.location.hash.startsWith('#ticket/')) {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} tiles={ticketGenerator.getRandomLosingGameBoard()} onTileReveal={onTileReveal} quote={quoteGenerator.get()} isCorrectId={isCorrectId} playNewTicketSound={playNewTicketSound} getTileWinDescription={getTileWinDescription} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} tiles={ticketGenerator.getGameBoardByHash()} onTileReveal={onTileReveal} quote={quoteGenerator.get()} isCorrectId={isCorrectId} playNewTicketSound={playNewTicketSound} getTileWinDescription={getTileWinDescription} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}



// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
