import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { MoonLoader } from 'react-spinners';

let rootNode = document.getElementById('root');

let Mode = ({modeName}) => (
  <Suspense fallback={<MoonLoader />}>
    <h1>{modeName} Mode!</h1>
    <App />
  </Suspense>
);

ReactDOM.render(<Mode modeName={'Normal'} />, rootNode);
// ReactDOM.createRoot(rootNode).render(<Mode modeName={'Concurrent'} />);
