import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './src/App';

import { DB, OrmProvider } from 'dataorm';
import { Post } from './src/models/Post';
import { User } from './src/models/User';

const database = DB.configure({ name: 'hello' })
  .add(User)
  .add(Post)
  .init();

console.log(database, 'database');

ReactDOM.render(
  <OrmProvider database={database}>
    <App />
  </OrmProvider>,
  document.getElementById('root')
);
