import { snakeCase } from 'change-case';
import { injectable } from 'inversify';
import Pluralize from 'pluralize';
import { container } from '../IoC/bindings';
import { TYPES } from '../IoC/types';
import { Model } from '../Model/Model';
import { Store } from './Store';
import { StoreConfigOptions } from './types';

@injectable()
class StoreConfig {
  private store: Store = container.get(TYPES.Store);

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

const configureStore = container.get(TYPES.StoreConfig);

export { StoreConfig, configureStore };
