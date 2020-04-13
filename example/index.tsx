import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { OrmProvider, StoreConfig } from 'dataorm';
import { User } from './src/models/User';

const config = new StoreConfig();
const store = config
  .config({ name: 'hello' })
  .add(User)
  .init();

ReactDOM.render(
  <OrmProvider store={store}>
    <App />
  </OrmProvider>,
  document.getElementById('root')
);
