import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Database } from './Database';

export class DBConfig {
  private static _instance: DBConfig = new DBConfig();

  public database: Database = container.get(TYPES.Database);

  private constructor() {
    if (DBConfig._instance) {
      throw new Error('Already Initialized');
    }

    DBConfig._instance = this;
  }

  public static get instance() {
    return this._instance;
  }
}

export const DB = DBConfig.instance.database;
