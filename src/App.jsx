import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import brush from './public/images/brush.png';
import klaver from './public/images/tile_klaver.webp';
import frame from './public/images/trisslott_cutout.webp';

import './App.css';

const REVEAL_PERCENT = 50;

function getTileWinDescription(prizeId) {
  return {
    'champagne': '🍾🍾🍾 Woho! Drink bubbles with Lisa! 🥂🥂🥂',
    'speech': '💬💬💬 Hold a speech to Lisa 💬💬💬',
    'beer': '🍻🍻🍻 Cheers with Lisa 🍻🍻🍻',
    'beee2': '🍺🍺🍺 Drink beer! 🍺🍺🍺',
    'beer3': '🍺🍺🍺 Drink more beer! 🍺🍺🍺',
    'vip': '😎😎😎 Omg, you just won a VIP ticket 😎😎😎',
    'new': '🆕🆕🆕 New ticket: Go to toastmasters to find out 🆕🆕🆕',
    'wine': '🍷🍷🍷 Congratz! Take some wine! 🍷🍷🍷',
    'burger': '🍔🍔🍔 Have some tasty snacks! 🍔🍔🍔'
  }[prizeId] || '😎🍺🍾: ' + prizeId;
}

function TicketMessage({ state }) {

  let text = 'Keep scratchin\'';
  if (state.hasWon) text = getTileWinDescription(state.prize);
  if (state.hasLost) text = 'Det blev sämst igen!';

  return (
    <div className="ticket-message">
      <span className="ticket-message__text">
        {text}
      </span>
    </div>
  );
}

function Tile({ tile, tileNr, onTileReveal }) {
  const ref = useRef();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScratchIt, setHasScratchIt] = useState(false);

  useEffect(() => {
    if (hasScratchIt) return;
    const overlayImgUrl = klaver;
    const brushImgUrl = brush;

    const onRevealInternal = () => {
      setIsRevealed(true);
      onTileReveal({ tileId: tile.id, tileNr, tileSound: tile.sound });
    };

    ScratchIt(ref.current, overlayImgUrl, brushImgUrl, onRevealInternal, REVEAL_PERCENT);
    setHasScratchIt(true);
  }, [hasScratchIt, tile.id, onTileReveal, tileNr, tile.sound]);

  return (
    <div ref={ref} className={`grid__tile grid__tile--${tileNr} ${isRevealed ? 'grid__tile--revealed' : ''}`}>
      <span className="grid__tile__content">
        <span className={`grid__tile__content__icon`} style={{ backgroundImage: `url(${tile.icon})` }}></span>
      </span>
    </div>
  );
}

function Grid({ tiles, onTileReveal }) {

  const tileItems = tiles.map((tile, i) => (
    <Tile
      key={i}
      tileNr={i}
      tile={tile}
      onTileReveal={onTileReveal}
    />
  ));

  const firstRow = tileItems.slice(0, 3);
  const secondRow = tileItems.slice(3, 6);
  const thirdRow = tileItems.slice(6, 9);
  const specialTile = tileItems[9];

  console.assert(firstRow.length === 3, firstRow.length);
  console.assert(secondRow.length === 3, secondRow.length);
  console.assert(thirdRow.length === 3, thirdRow.length);

  return (
    <div className="grid">
      <span className="grid__overlay" style={{ backgroundImage: `url(${frame})` }} />
      <div className="grid__frame">
        <div className="grid__row">
          {firstRow}
        </div>
        <div className="grid__row">
          {secondRow}
        </div>
        <div className="grid__row">
          {thirdRow}
        </div>
        <div className="grid__row__special-tile">
          {specialTile}
        </div>
      </div>
    </div>
  );
}

function App({ tiles, store, onTileReveal }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const fn = () => setState(store.getState());
    store.onUpdate(fn);
    return () => store.offUpdate(fn);
  }, [store]);

  return (
    <div className="app">
      <TicketMessage state={state} />
      <Grid store={store} tiles={tiles} onTileReveal={onTileReveal} />
    </div>
  );
}

export default App;
