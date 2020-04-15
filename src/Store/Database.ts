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
  private store: Store = container.get(TYPES.Store);

  private generateConfig(config: any) {
    return Object.assign(this.store.config, config);
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

  public getState() {
    return this.store.state[this.store.config.name];
  }

  private registerSchema(model: any): void {
    this.store.schema[model.entity] = Schema.create(model.model);
  }

  private createSchema() {
    this.store.models.forEach((model: any): void => {
      this.registerSchema(model);
    });
  }

  public config(config: DBConfigOptions) {
    if (this.store.init) {
      throw new Error('Database already initialized');
    }

    this.store.config = this.generateConfig(config);

    this.store.setState({ [this.store.config.name]: {} });

    return this;
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

export { Database };
