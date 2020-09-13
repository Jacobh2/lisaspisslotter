import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Tile({ tile }) {
  return (
    <div>{tile.id}</div>
  );
}

function App({ tiles }) {
  return (
    <div className="App">
      {tiles.map(tile => <Tile tile={tile}></Tile>)}
    </div>
  );
}

export default App;
