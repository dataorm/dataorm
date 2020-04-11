import { StoreConfigOptions } from './types';
import { Store } from './Store';
import { Model } from '../Model/Model';

import { snakeCase } from 'change-case';
import Pluralize from 'pluralize';

class StoreConfig {
  private static _instance: StoreConfig = new StoreConfig();

  private store: Store = Store.instance;

  private constructor() {
    if (StoreConfig._instance) {
      throw new Error('Already initialized');
    }

    StoreConfig._instance = this;
  }

  public static get instance(): StoreConfig {
    return this._instance;
  }

  private generateConfig(config: any) {
    const defaultConfig: any = this.store.config;

    Object.keys(defaultConfig).forEach((key: any) => {
      defaultConfig[key] = config.hasOwnProperty(key)
        ? config[key]
        : defaultConfig[key];
    });

    return defaultConfig;
  }

  public config(config: StoreConfigOptions) {
    if (this.store.init) {
      throw new Error('Database already initialized');
    }

    this.store.config = this.generateConfig(config);

    this.store.setState({ [this.store.config.name]: {} });

    return this;
  }

  private checkModelTypeMappingCapabilities(model: any): any {
    if (model.prototype instanceof Model === false) {
      throw new Error('Invalid Model Bindings');
    }
    if (
      model.entity &&
      this.store.models.find((m: any) => m.entity === model.entity)
    ) {
      throw new Error(`Duplicate entity name for ${model.name}`);
    }
  }

  private createModelBinding(model: any): any {
    const entity = model.entity ?? snakeCase(Pluralize.plural(model.name));

    Object.defineProperties(model, {
      entity: { value: entity },
      store: { value: this.store },
    });

    return {
      entity,
      model,
    };
  }

  private registerSchema(model: any): void {
    const rootState = this.store.state[this.store.config.name];

    if (!rootState.hasOwnProperty(model.entity)) {
      rootState[model.entity] = [];
    }
  }

  private createSchema() {
    this.store.models.forEach((model: any): void => {
      this.registerSchema(model);
    });
  }

  public add(model: any) {
    this.checkModelTypeMappingCapabilities(model);

    const entity = this.createModelBinding(model);

    this.store.models.push(entity);

    return this;
  }

  public init() {
    this.createSchema();

    this.store.init = true;

    return this.store;
  }
}

const configureStore = StoreConfig.instance;

export { StoreConfig, configureStore };
