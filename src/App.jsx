import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import brush from './public/images/brush.png';
import klaver from './public/images/tile_klaver.webp';
import lose from './public/images/lose.webp';
import frame from './public/images/pisslott_cutout.webp';

import iconMap from './IconMap';

import './App.css';

// How much must the user reveal for an auto-reveal?
const REVEAL_PERCENT = 50;

const overlays = {
  'lose': lose
};

const OVERLAY_IMG_URL = klaver;
const BRUSH_IMG_URL = brush;
const LOSE_OVERLAY_IMG_URL = lose;
const NEW_TICKET_TEXT = "Ny Pisslott!";

function TicketMessage({ state, getTileWinDescription }) {
  let text = 'Keep scratchin\'';
  if (state.hasWon) text = getTileWinDescription(state.prize, state.multiply);
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

  const overlayImgUrl = tile.overlay ? overlays[tile.overlay] : OVERLAY_IMG_URL;

  useEffect(() => {
    if (hasScratchIt) return;

    const onRevealInternal = () => {
      setIsRevealed(true);
      onTileReveal({ tileId: tile.id, tileNr, tileSound: tile.sound });
    };

    ScratchIt(ref.current, overlayImgUrl, BRUSH_IMG_URL, onRevealInternal, REVEAL_PERCENT);
    setHasScratchIt(true);
  }, [hasScratchIt, tile.id, onTileReveal, tileNr, tile.sound, overlayImgUrl]);

  return (
    <div ref={ref} className={`${tile.overlay ? 'grid__tile-big' : 'grid__tile'} grid__tile--${tileNr} ${isRevealed ? 'grid__tile--revealed' : ''}`}>
      <span className="grid__tile__content">
        <span className={`grid__tile__content__icon`} style={{ backgroundImage: `url(${iconMap[tile.id]})` }}></span>
      </span>
    </div>
  );
}

function Grid({ tiles, onTileReveal, quote }) {
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
  const loseTile = tileItems[10];

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
        <QuoteSpace quote={quote} />
        <div className="grid__row__lose-tile">
          {loseTile}
        </div>
      </div>
    </div>
  );
}

function QuoteSpace({ quote }) {
  return (
    <div className="quote-space">
      <span className="quote-space__text">
        {quote}
      </span>
    </div>
  );
}

function TicketIdBox({ isCorrectId }) {

  function handleChange(e) {
    const ticketId = e.target.value.toLowerCase();
    if (isCorrectId(ticketId)) {
      window.location.hash = `#ticket/${ticketId}`;
    }
  }

  return (
    <div className="ticket-id-box">
      <input className="ticket-id-box__input" type="text" placeholder="Ticket ID" onChange={handleChange}></input>
    </div>
  );
}

function NewTicketButton({ state, playNewTicketSound }) {
  const gameOver = state.hasWon || state.hasLost;
  const revealButton = gameOver && state.hasPlayedFinalSound;
  const [isClicked, setIsClicked] = useState(false);

  function handleOnClick(e) {
    setIsClicked(true);
    const audioReference = playNewTicketSound();
    audioReference.addEventListener("ended", function () {
      audioReference.currentTime = 0;
      // When the sound is done, go to start page
      window.location = "/";
    });
  }

  return (
    <div className="new-ticket">
      <button
        type="button"
        onClick={handleOnClick}
        className={`new-ticket__button ${revealButton ? '' : 'hidden'}`}>
        <div className="new-ticket__container">
          <span className="new-ticket__button__text">
            {NEW_TICKET_TEXT}
          </span>
          <div className={`loader ${isClicked ? '' : 'hidden'}`} />
        </div>
      </button>

    </div>
  );
}

function App({ displayNewTicketId, tiles, store, onTileReveal, quote, isCorrectId, playNewTicketSound, getTileWinDescription }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const fn = () => setState(store.getState());
    store.onUpdate(fn);
    return () => store.offUpdate(fn);
  }, [store]);

  const [imagesPreLoaded, setImagesPreLoaded] = useState(0);
  const isAllImagesPreloaded = imagesPreLoaded >= 3;

  return (
    <div className="app">

      {/* Hack to display these before icons */}
      <img src={BRUSH_IMG_URL} style={{ display: 'none' }} onLoad={() => {
        setImagesPreLoaded(imagesPreLoaded + 1);
      }} />
      <img src={OVERLAY_IMG_URL} style={{ display: 'none' }} onLoad={() => {
        setImagesPreLoaded(imagesPreLoaded + 1);
      }} />
      <img src={LOSE_OVERLAY_IMG_URL} style={{ display: 'none' }} onLoad={() => {
        setImagesPreLoaded(imagesPreLoaded + 1);
      }} />

      <TicketMessage state={state} getTileWinDescription={getTileWinDescription} />
      {isAllImagesPreloaded && <Grid quote={quote} store={store} tiles={tiles} onTileReveal={onTileReveal} />}
      <NewTicketButton state={state} playNewTicketSound={playNewTicketSound} />
      {displayNewTicketId && <TicketIdBox isCorrectId={isCorrectId} />}
    </div>
  );
}

export default App;
