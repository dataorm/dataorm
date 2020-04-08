import { snakeCase } from 'change-case';
import Pluralize from 'pluralize';
import { Model } from '../Model/Model';
import { Database } from './DB';
import { DbConfig, DbConfigOptions } from './types';

class DBConfig {
  static instance: DBConfig;

  private db: Database = Database.getInstance();

  dbConfig: DbConfig = {
    name: 'db',
    storage: 'LocalStorage',
  };

  initialized: boolean = false;

  private generateConfig(config: any) {
    const newConfig: any = this.dbConfig;

    Object.keys(this.dbConfig).forEach((key: string) => {
      newConfig[key] = config[key];
    });

    return newConfig;
  }

  private setStore(dbConfig: DbConfigOptions) {
    this.dbConfig = this.generateConfig(dbConfig);

    this.db.state = {
      [this.dbConfig.name]: {},
    };
  }

  private checkModelTypeMappingCapabilities(model: any): any {
    if (model.prototype instanceof Model === false) {
      throw new Error('Invalid Model Bindings');
    }
    if (
      model.entity &&
      this.db.models.find((m: any) => m.entity == model.entity)
    ) {
      throw new Error(`Duplicate entity name for ${model.name}`);
    }
  }

  private createModelBinding(model: any): any {
    const entity = model.entity ?? snakeCase(Pluralize.plural(model.name));

    Object.defineProperties(model, {
      entity: { value: entity },
      store: { value: this },
    });

    return {
      entity,
      model,
    };
  }

  private registerSchema(model: any): void {
    if (!this.db.state[this.dbConfig.name].hasOwnProperty(model.entity)) {
      this.db.state[this.dbConfig.name][model.entity] = [];
    }
  }

  private createSchema() {
    this.db.models.forEach((model: any): void => {
      this.registerSchema(model);
    });
  }

  config(dbConfig: DbConfigOptions = this.dbConfig) {
    if (this.initialized) {
      throw new Error('Database already initialized');
    }

    this.setStore(dbConfig);

    return this;
  }

  register(model: any) {
    this.checkModelTypeMappingCapabilities(model);

    const entity = this.createModelBinding(model);

    this.db.models.push(entity);

    return this;
  }

  start() {
    this.createSchema();

    this.initialized = true;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DBConfig();
    }

    return this.instance;
  }
}

const DB = new DBConfig();

export { DBConfig, DB };
