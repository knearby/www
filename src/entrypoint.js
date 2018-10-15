import React from 'react';
import ReactDOM from 'react-dom';

import Application from './';

ReactDOM.render(
  <Application />,
  document.getElementById('entrypoint'),
);

if (module.hot) {
  module.hot.accept();
}
