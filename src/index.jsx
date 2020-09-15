import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// TODO Get correct ticket based on URL or something
// import tickets from  './generated-tickets';

const tiles = [
  { id: 'beer', icon: '', sound: '' },
  { id: 'cheers', icon: '', sound: '' },
  { id: 'c', icon: '', sound: '' },
  { id: 'd', icon: '', sound: '' },
  { id: 'e', icon: '', sound: '' },
  { id: 'f', icon: '', sound: '' },
  { id: 'g', icon: '', sound: '' },
  { id: 'h', icon: '', sound: '' },
  { id: 'i', icon: '', sound: '' },
  { id: 'j', icon: '', sound: '' },
];

// Prevents accidental page update/edge drag causing scratches to fail
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

ReactDOM.render(
  <React.StrictMode>
    <App tiles={tiles} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
