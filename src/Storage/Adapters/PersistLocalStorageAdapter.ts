import { StorageAdapterInterface } from '../Contracts/StorageAdapterInterface';

class PersistLocalStorageAdapter implements StorageAdapterInterface {
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve: any, _: any) => {
      resolve(localStorage.getItem(key));
    });
  }

  setItem(key: string, value: string): Promise<void> {
    return new Promise((__: any, _: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  clearItem(key: string): Promise<void> {
    return new Promise((__: any, _: any) => {
      localStorage.removeItem(key);
    });
  }
}

export const persistLocalStorageAdapter = new PersistLocalStorageAdapter();
