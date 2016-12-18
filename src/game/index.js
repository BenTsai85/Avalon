import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(
  <App player_number={3}/>,
  document.getElementById( 'root' ),
);
