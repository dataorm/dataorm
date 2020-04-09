import { StorageAdapterInterface } from './Contracts/StorageAdapterInterface';

interface config {
  storage: StorageAdapterInterface;
  key: string;
}

export function createPersistStore(store: any, config: config) {
  const key = config.key || 'root';

  config.storage.getItem(key).then(data => {
    const persistedData = data ? JSON.parse(data) : store.db.state;

    store.db.setState(persistedData);
    store.persisted = true;
  });

  store.db.subscribe((state: any) => {
    config.storage.setItem(key, state);
  });

  return store;
}
