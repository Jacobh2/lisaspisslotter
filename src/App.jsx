import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import brush from './images/brush.png';
import klaver from './images/tile_klaver.png';
import frame from './images/trisslott_cutout.png';

import './App.css';

const REVEAL_PERCENT = 50;

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
      onTileReveal({ tileId: tile.id, tileNr });
    };

    ScratchIt(ref.current, overlayImgUrl, brushImgUrl, onRevealInternal, REVEAL_PERCENT);
    setHasScratchIt(true);
  }, [hasScratchIt, tile.id, onTileReveal, tileNr]);

  return (
    <div ref={ref} className={`grid__tile grid__tile--${tileNr} ${isRevealed ? 'grid__tile--revealed' : ''}`}>
      <span className="grid__tile__content">
        {tile.id}
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
  const secondRow = tileItems.slice(2, 5);
  const thirdRow = tileItems.slice(6, 9);
  const specialTile = tileItems[tileItems.length - 1];

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

function App({ tiles, onTileReveal }) {
  return (
    <Grid tiles={tiles} onTileReveal={onTileReveal} />
  );
}

export default App;
