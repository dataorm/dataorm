import { snakeCase } from 'change-case';
import { injectable } from 'inversify';
import Pluralize from 'pluralize';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Model } from '../Model/Model';
import { Store } from './Store';
import { DBConfigOptions } from './types';
import { Schema } from '../Schema/Schema';

@injectable()
class Database {
  public store: Store = container.get(TYPES.Store);

  public config: DBConfigOptions = {
    name: 'db',
    sync: null,
  };

  public initialized: any = false;

  public models: any[] = [];

  public schema: any = {};

  public constructor(config: DBConfigOptions) {
    if (this.initialized) {
      throw new Error('Database already initialized');
    }

    this.config = this.generateConfig(config);

    this.store.setState({ [this.config.name]: {} });
  }

  private generateConfig(config: any) {
    return Object.assign(this.config, config);
  }

  private checkModelTypeMappingCapabilities(model: any): any {
    if (model.prototype instanceof Model === false) {
      throw new Error('Invalid Model Bindings');
    }
    if (
      model.entity &&
      this.models.find((m: any) => m.entity === model.entity)
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

  public getState() {
    return this.store.state[this.config.name];
  }

  private registerSchema(model: any): void {
    this.schema[model.entity] = Schema.create(model);
  }

  private registerAttributes(model: any): void {
    Object.defineProperty(model, 'cachedAttributes', {
      value: Object.assign(model.fields(), model.relations()),
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }

  private createSchema() {
    this.models.forEach((model: any): void => {
      this.registerAttributes(model.model);
      this.registerSchema(model.model);
    });
  }

  public add(model: any) {
    this.checkModelTypeMappingCapabilities(model);

    const entity = this.createModelBinding(model);

    this.models.push(entity);

    return this;
  }

  public init() {
    this.createSchema();

    this.initialized = true;

    return this;
  }
}

export { Database };
