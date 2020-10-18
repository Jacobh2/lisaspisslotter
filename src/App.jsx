import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import QuoteGenerator from "./QuoteGenerator";

import brush from './public/images/brush.png';
import klaver from './public/images/tile_klaver.webp';
import frame from './public/images/trisslott_cutout.webp';

import beer from './public/icons/beer.webp';
import beer2 from './public/icons/beer_2.webp';
import beer3 from './public/icons/beer_3.webp';
import burger from './public/icons/burger.webp';
import cocktail from './public/icons/cocktail.webp';
import key from './public/icons/key.webp';
import wine from './public/icons/wine.webp';
import speech from './public/icons/speech.webp';
import champagne from './public/icons/champagne.webp';
import newTicket from './public/icons/new.webp';
import vip from './public/icons/vip.webp';
import multiply1 from './public/icons/multiply_1.webp';
import multiply2 from './public/icons/multiply_2.webp';
import multiply5 from './public/icons/multiply_5.webp';
import multiply10 from './public/icons/multiply_10.webp';

import './App.css';

const REVEAL_PERCENT = 50;

const iconMap = {
  'beer': beer, 
  'beer2': beer2, 
  'beer3': beer3, 
  'burger': burger, 
  'cocktail': cocktail, 
  'key': key, 
  'wine': wine, 
  'speech': speech, 
  'champagne': champagne, 
  'newTicket': newTicket, 
  'vip': vip, 
  'multiply1': multiply1, 
  'multiply2': multiply2, 
  'multiply5': multiply5, 
  'multiply10': multiply10
};

const OVERLAY_IMG_URL = klaver;
const BRUSH_IMG_URL = brush;

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

    const onRevealInternal = () => {
      setIsRevealed(true);
      onTileReveal({ tileId: tile.id, tileNr, tileSound: tile.sound });
    };

    ScratchIt(ref.current, OVERLAY_IMG_URL, BRUSH_IMG_URL, onRevealInternal, REVEAL_PERCENT);
    setHasScratchIt(true);
  }, [hasScratchIt, tile.id, onTileReveal, tileNr, tile.sound]);

  return (
    <div ref={ref} className={`grid__tile grid__tile--${tileNr} ${isRevealed ? 'grid__tile--revealed' : ''}`}>
      <span className="grid__tile__content">
        <span className={`grid__tile__content__icon`} style={{ backgroundImage: `url(${iconMap[tile.id]})` }}></span>
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

function QuoteSpace({ quote }){
  // Get psudo-random quote to display!
  return (
    <div className="quote-space">
      <span className="quote-space__text">
        {quote}
      </span>
    </div>
  );
}

function App({ tiles, store, onTileReveal, quote }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const fn = () => setState(store.getState());
    store.onUpdate(fn);
    return () => store.offUpdate(fn);
  }, [store]);

  const [imagesPreLoaded, setImagesPreLoaded] = useState('');
  const isAllImagesPreloaded = imagesPreLoaded >= 2;

  return (
    <div className="app">

      {/* Hack to display these before icons */}
      <img src={BRUSH_IMG_URL} style={{ display: 'none' }} onLoad={() => {
        setImagesPreLoaded(imagesPreLoaded + 1);
      }} />
      <img src={OVERLAY_IMG_URL} style={{ display: 'none' }} onLoad={() => {
        setImagesPreLoaded(imagesPreLoaded + 1);
      }} />

      <TicketMessage state={state} />
      {isAllImagesPreloaded && <Grid store={store} tiles={tiles} onTileReveal={onTileReveal} />}
      <QuoteSpace quote={quote} />
    </div>
  );
}

export default App;
