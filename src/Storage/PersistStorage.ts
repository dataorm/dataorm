import { StorageAdapterInterface } from './Contracts/StorageAdapterInterface';

interface config {
  storage: StorageAdapterInterface;
  key: string;
}

export function createPersistStore(store: any, config: config) {
  const key = config.key || 'root';

  store.db.subscribe((state: any) => {
    config.storage.setItem(key, state);
  });

  return { store, config };
}
