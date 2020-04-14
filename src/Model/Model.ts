import { Attributes } from '../Attributes/Attributes';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Relations } from '../Relations/Relations';
import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';
import { Store } from '../Store/Store';

class Model {
  private store: Store = container.get(TYPES.Store);

  protected static entity: string | null = null;

  protected static primaryKey: string = 'id';

  protected static get attributes() {
    return new Attributes(this);
  }

  protected static get relations() {
    return new Relations(this);
  }

  protected get fields() {
    const model = this.store.models.find(model => {
      return this instanceof model.model === true;
    });

    return model.model.fields();
  }

  private static get dispatchQuery() {
    return new Query(this);
  }

  private static get dispatchMutation() {
    return new Mutation(this);
  }

  static overwrite() {
    return this.dispatchQuery.with();
  }

  static with() {
    return this.dispatchQuery.with();
  }

  static where() {
    return this.dispatchQuery.where();
  }

  static all() {
    return this.dispatchQuery.all();
  }

  static firstOrFail() {
    return this.dispatchQuery.with();
  }

  static firstOrCreate() {
    return this.dispatchQuery.with();
  }

  static firstOrNew() {
    return this.dispatchQuery.with();
  }

  static firstWhere() {
    return this.dispatchQuery.with();
  }

  static find() {
    return this.dispatchQuery.with();
  }

  public static first() {
    return this.dispatchQuery.first();
  }

  public static has() {
    return this.dispatchQuery.has();
  }

  public static doesntHave() {
    return this.dispatchQuery.doesntHave();
  }

  public static whereHas() {
    return this.dispatchQuery.whereHas();
  }

  public static whereDoesntHave() {
    return this.dispatchQuery.whereDoesntHave();
  }

  public static findOrFail() {
    return this.dispatchQuery.with();
  }

  public static create(object: any) {
    return this.dispatchMutation.create(object);
  }

  public static createOrUpdate(object: any) {
    return this.dispatchMutation.create(object);
  }

  public static updateOrCreate(object: any) {
    return this.dispatchMutation.create(object);
  }

  public static destroy(object: any) {
    return this.dispatchMutation.create(object);
  }

  public delete() {
    console.log('delete record if exists');
  }

  public fill(data: any) {
    const modelInstance = Object.assign(this);

    Object.keys(this.fields).forEach(key => {
      Object.defineProperty(modelInstance, 'email', {
        value: data[key],
      });
    });
  }

  public save() {
    const modelInstance = Object.assign(this);

    return Object.keys(this.fields).reduce((carry, item) => {
      return { ...carry, [item]: modelInstance[item] };
    }, {});
  }

  public toJson() {
    const modelInstance = Object.assign(this);

    if (modelInstance === null) return null;
    return Object.keys(this.fields).reduce((carry, item) => {
      return { ...carry, ...{ [item]: modelInstance[item] } };
    }, {});
  }
}

export { Model };
