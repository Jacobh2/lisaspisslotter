import React, { useState, useRef, useEffect } from 'react';
import ScratchIt from './ScratchIt.min.js';

import brush from './images/brush_big.png';
import klaver from './images/tile_klaver.png'

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
  }, [tile.id]);

  return (
    <div ref={ref} className="grid__tile">
      {isRevealed ? 'REVEALED' : null}
      {tile.id}
    </div>
  );
}

function Grid({ tiles }) {
  return (
    <div className="grid">
      <img style={{ display: 'none' }} src={brush}></img>
      <img style={{ display: 'none' }} src={klaver}></img>
      {tiles.map((tile, i) => <Tile key={i} tile={tile}></Tile>)}
    </div>
  );
}

function App({ tiles }) {
  return (
    <Grid tiles={tiles} />
  );
}

export default App;
