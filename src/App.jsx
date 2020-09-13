import React, { useState } from 'react';
import './App.css';

function Tile({ tile }) {
  return (
    <div className="grid__tile">{tile.id}</div>
  );
}

function Grid({ tiles }) {
  return (
    <div className="grid">
      {tiles.map(tile => <Tile tile={tile}></Tile>)}
    </div>
  );
}

function App({ tiles }) {
  return (
    <Grid tiles={tiles} />
  );
}

export default App;
