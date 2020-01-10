import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

let rootNode = document.getElementById('root');

let Mode = ({modeName}) => (
  <div>
    <h1>{modeName} Mode!</h1>
    <App />
  </div>
);

// ReactDOM.render(<Mode modeName={'Normal'} />, rootNode);
ReactDOM.createRoot(rootNode).render(<Mode modeName={'Concurrent'} />);
