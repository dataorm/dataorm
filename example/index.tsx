import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { OrmProvider, DB } from 'dataorm';

import App from './src/App';
import { User } from './src/models/User';

const store = DB.config({ name: 'hello', storage: 'LocalStorage' })
  .register(User)
  .start();

ReactDOM.render(
  <OrmProvider store={store}>
    <App />
  </OrmProvider>,
  document.getElementById('root')
);
