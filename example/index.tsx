import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { OrmProvider, Database } from 'dataorm';
import { User } from './src/models/User';
import { Post } from './src/models/Post';

const database = new Database();
const store = database
  .config({ name: 'hello' })
  .add(User)
  .add(Post)
  .init();

console.log(database, 'database');

ReactDOM.render(
  <OrmProvider store={store}>
    <App />
  </OrmProvider>,
  document.getElementById('root')
);
