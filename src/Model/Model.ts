import { Relations } from 'Attributes/Contracts/Relations';
import { Fields } from '../Attributes/Contracts/Fields';
import { StringField } from '../Attributes/Fields/StringField';
import { BelongsTo } from '../Attributes/Relations/BelongsTo';
import { BelongsToMany } from '../Attributes/Relations/BelongsToMany';
import { HasMany } from '../Attributes/Relations/HasMany';
import { HasOne } from '../Attributes/Relations/HasOne';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Database } from '../Store/Database';
import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';

abstract class Model {
  public static database: Database = container.get(TYPES.Database);

  public static entity: string;

  public static primaryKey: string | string[] = 'id';

  public static getIndexIdFromRecord(record: any) {
    const key: any = this.primaryKey;

    if (key instanceof Array) {
      return JSON.stringify(key.map(k => record[k]));
    }

    return record[key] ? JSON.stringify(record[key]) : null;
  }

  static fields(): Fields {
    return {};
  }

  static relations(): Relations {
    return {};
  }

  static localKey(key?: string): string {
    if (key) {
      return key;
    }

    return typeof this.primaryKey === 'string' ? this.primaryKey : 'id';
  }

  static relation(model: typeof Model | string): typeof Model {
    if (typeof model !== 'string') {
      return model;
    }

    return this.database.model(model);
  }

  public static string() {
    return new StringField(this);
  }

  public static hasOne(related: any, foreignKey: string, localKey: string) {
    return new HasOne(this, related, foreignKey, this.localKey(localKey));
  }

  public static hasMany(related: any, foreignKey: string, localKey: string) {
    return new HasMany(this, related, foreignKey, this.localKey(localKey));
  }

  public static belongsTo(parent: any, foreignKey: string, ownerKey: string) {
    return new BelongsTo(
      this,
      parent,
      foreignKey,
      this.relation(parent).localKey(ownerKey)
    );
  }

  static belongsToMany(
    related: typeof Model,
    pivot: typeof Model,
    foreignPivotKey: string,
    relatedPivotKey: string,
    parentKey?: string,
    relatedKey?: string
  ) {
    return new BelongsToMany(
      this,
      related,
      pivot,
      foreignPivotKey,
      relatedPivotKey,
      this.localKey(parentKey),
      this.relation(related).localKey(relatedKey)
    );
  }

  static isPrimaryKey(key: string): boolean {
    if (this.primaryKey instanceof Array === false) {
      return this.primaryKey === key;
    }

    return this.primaryKey.includes(key);
  }

  static isCompositePrimaryKey(): boolean {
    return this.primaryKey instanceof Array === false;
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

  public $self() {
    return this.constructor as typeof Model;
  }

  public fill(data: any) {
    const modelInstance = Object.assign(this);

    const fields = this.$self().fields();

    return Object.keys(fields).forEach((key: string) => {
      Object.defineProperty(modelInstance, 'email', {
        value: data[key],
      });
    });
  }

  public save() {
    const modelInstance = Object.assign(this);

    const fields = this.$self().fields();

    return Object.keys(fields).reduce((carry, item) => {
      return { ...carry, [item]: modelInstance[item] };
    }, {});
  }

  public delete() {
    console.log('delete record if exists', this.$self().fields());
  }

  public toJson() {
    const modelInstance = Object.assign(this);

    const fields = this.$self().fields();

    if (modelInstance === null) return null;

    return Object.keys(fields).reduce((carry, item) => {
      return { ...carry, ...{ [item]: modelInstance[item] } };
    }, {});
  }
}

export { Model };
