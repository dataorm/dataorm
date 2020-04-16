import { snakeCase } from 'change-case';
import { injectable } from 'inversify';
import Pluralize from 'pluralize';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Model } from '../Model/Model';
import { Schema } from '../Schema/Schema';
import { Entity } from './Contracts/Entity';
import { Store } from './Store';
import { DBConfigOptions } from './types';

export type Models = Record<string, typeof Model>;

@injectable()
class Database {
  public store: Store = container.get(TYPES.Store);

  public config: DBConfigOptions = {
    name: 'db',
    sync: null,
  };

  public initialized: any = false;

  public entities: Entity[] = [];

  public schema: any = {};

  models(): Models {
    return this.entities.reduce<Models>((models, entity) => {
      models[entity.name] = entity.model;
      return models;
    }, {});
  }

  model(model: typeof Model | string): typeof Model {
    const name = typeof model === 'string' ? model : model.entity;
    return this.models()[name];
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
      this.entities.find((m: any) => m.entity === model.entity)
    ) {
      throw new Error(`Duplicate entity name for ${model.name}`);
    }
  }

  private createModelBinding(model: typeof Model): any {
    const name = model.entity ?? snakeCase(Pluralize.plural(model.name));

    Object.defineProperties(model, {
      entity: { value: name },
      store: { value: this.store },
    });

    return {
      name,
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
    this.entities.forEach((entity: Entity): void => {
      this.registerAttributes(entity.model);
      this.registerSchema(entity.model);
    });
  }

  public configure(config: DBConfigOptions) {
    if (this.initialized) {
      throw new Error('Database already initialized');
    }

    this.config = this.generateConfig(config);

    this.store.setState({ [this.config.name]: {} });

    return this;
  }

  public add(model: any) {
    this.checkModelTypeMappingCapabilities(model);

    const entity = this.createModelBinding(model);

    this.entities.push(entity);

    return this;
  }

  public init() {
    this.createSchema();

    this.initialized = true;

    return this;
  }
}

export { Database };
