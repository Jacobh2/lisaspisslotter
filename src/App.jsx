import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import brush from './images/brush.png';
import klaver from './images/tile_klaver.png';

import './App.css';

const REVEAL_PERCENT = 50;

function Tile({ tile }) {
  const ref = useRef();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasScratchIt, setHasScratchIt] = useState(false);

  const onReveal = () => setIsRevealed(true);

  useEffect(() => {
    if (hasScratchIt) return;
    const overlayImgUrl = klaver;
    const brushImgUrl = brush;

    ScratchIt(ref.current, overlayImgUrl, brushImgUrl, onReveal, REVEAL_PERCENT);
    setHasScratchIt(true);
  }, [hasScratchIt, tile.id]);

  return (
    <div ref={ref} className={`grid__tile ${isRevealed ? 'grid__tile--revealed' : ''}`}>
      <span className="grid__tile__content">
        {tile.id}
      </span>
    </div>
  );
}

function Grid({ tiles }) {

  const tileItems = tiles.map((tile, i) => <Tile key={i} tile={tile}></Tile>);

  const firstRow = tileItems.slice(0, 3);
  const secondRow = tileItems.slice(2, 5);
  const thirdRow = tileItems.slice(6, 9);

  console.assert(firstRow.length === 3, firstRow.length);
  console.assert(secondRow.length === 3, secondRow.length);
  console.assert(thirdRow.length === 3, thirdRow.length);

  return (
    <div className="grid">
      <img style={{ display: 'none' }} src={brush}></img>
      <img style={{ display: 'none' }} src={klaver}></img>
      <div className="grid__row">
        {firstRow}
      </div>
      <div className="grid__row">
        {secondRow}
      </div>
      <div className="grid__row">
        {thirdRow}
      </div>
    </div>
  );
}

function App({ tiles }) {
  return (
    <Grid tiles={tiles} />
  );
}

export default App;
