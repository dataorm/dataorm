import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { OrmProvider, StoreConfig } from 'dataorm';

const config = new StoreConfig();
const store = config.init();

ReactDOM.render(
  <OrmProvider store={store}>
    <App />
  </OrmProvider>,
  document.getElementById('root')
);
