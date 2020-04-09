export interface StorageAdapter {
  LocalStorage: 'LocalStorage';
  AsyncStorage: 'AsyncStorage';
}

export interface DbConfig {
  name: string;
  sync: string | null;
}

export interface DbConfigOptions {
  name?: string;
  sync?: string | null;
}

export interface Action {
  type: string;
  payload: { model: any; data?: any };
}
