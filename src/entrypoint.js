import React from 'react';
import ReactDOM from 'react-dom';

import Application from './';

console.info(`%cRunning in ${global.environment}`, 'background-color: #333; font-size: 18px; color: #EEE; padding: 8px;');

ReactDOM.render(
  <Application />,
  document.getElementById('entrypoint'),
);

if (module.hot) {
  module.hot.accept();
}
