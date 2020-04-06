export interface StorageAdapter {
  LocalStorage: 'LocalStorage';
  AsyncStorage: 'AsyncStorage';
}

export interface DbConfig {
  name: string;
  storage: keyof StorageAdapter;
}

export interface DbConfigOptions {
  name?: string;
  storage?: keyof StorageAdapter;
}
