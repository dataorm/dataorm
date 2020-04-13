export interface StorageAdapterInterface {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): void;
  clearItem(key: string): void;
}
