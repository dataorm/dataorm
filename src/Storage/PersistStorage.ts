import { StorageAdapterInterface } from './Contracts/StorageAdapterInterface';
import { Store } from '../Database/Store';

interface config {
  storage: StorageAdapterInterface;
  key: string;
}

export function createPersistStore(store: Store, config: config) {
  const key = config.key || 'root';

  store.subscribe((state: any) => {
    config.storage.setItem(key, state);
  });

  return { store, config };
}
