import {
  createPersistStore,
  OrmProvider,
  OrmStore,
  PersistGate,
  persistLocalStorageAdapter,
} from 'dataorm';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import App from './src/App';
import { User } from './src/models/User';

const store = OrmStore.config({ name: 'hello' })
  .register(User)
  .start();

const persistor = createPersistStore(store, {
  key: 'root',
  storage: persistLocalStorageAdapter,
});

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <OrmProvider store={store}>
      <App />
    </OrmProvider>
  </PersistGate>,
  document.getElementById('root')
);
