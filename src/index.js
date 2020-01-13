import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { MoonLoader } from 'react-spinners';

let rootNode = document.getElementById('root');

// ReactDOM.render(<Mode modeName={'Normal'} />, rootNode);
ReactDOM.createRoot(rootNode).render(<App />);
