import { StorageAdapterInterface } from 'Storage/Contracts/StorageAdapterInterface';
import AsyncStorage from '@react-native-community/async-storage';

class PersistAsyncStorageAdapter implements StorageAdapterInterface {
  getItem(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  setItem(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  clearItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export const persistAsyncStorageAdapter = new PersistAsyncStorageAdapter();
