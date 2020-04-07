import { snakeCase } from 'change-case';
import Pluralize from 'pluralize';
import { Model } from '../Model/Model';
import { Database } from './DB';
import { DbConfigOptions } from './types';

class DBConfig {
  private db: Database = Database.getInstance();

  private generateConfig(config: any) {
    const newConfig: any = this.db.dbConfig;

    Object.keys(this.db.dbConfig).forEach((key: string) => {
      newConfig[key] = config[key];
    });

    return newConfig;
  }

  private setStore(dbConfig: DbConfigOptions) {
    this.db.dbConfig = this.generateConfig(dbConfig);

    this.db.state = {
      [this.db.dbConfig.name]: {},
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
    if (!this.db.state[this.db.dbConfig.name].hasOwnProperty(model.entity)) {
      this.db.state[this.db.dbConfig.name][model.entity] = [];
    }
  }

  private createSchema() {
    this.db.models.forEach((model: any): void => {
      this.registerSchema(model);
    });
  }

  config(dbConfig: DbConfigOptions = this.db.dbConfig) {
    if (this.db.initialized) {
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

    this.db.initialized = true;
  }
}

export { DBConfig };
