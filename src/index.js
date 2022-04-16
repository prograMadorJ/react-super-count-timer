import React from 'react';
import ReactDOM from 'react-dom';
import { TimerProvider, TimerSettings } from './CountTimer';

import App from './App';

ReactDOM.render(
  <TimerProvider settings={TimerSettings}>
    <App />
  </TimerProvider>,
  document.getElementById('root')
);
