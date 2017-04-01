import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(
  <App playerNumber={3}/>,
  document.getElementById( 'root' ),
);
