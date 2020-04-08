import { Database } from '../Database/DB';
import { Collection } from './Collection';
import { DB } from '../Database/DBConfig';

export class QueryBuilder {
  private model: any;

  private db = Database.getInstance();

  private queries: any[] = [];

  constructor(model: any) {
    this.model = model;
  }

  get collection() {
    return this.db.state[DB.dbConfig.name][this.model.entity];
  }

  protected filterData() {
    const filteredOrQueries = this.collection.filter((collection: any) => {
      return this.queries
        .filter(q => q.query === 'or')
        .some(query => this.verifyQuerySelector(query, collection));
    });

    const filteredAndQueries = this.collection.filter((collection: any) => {
      return this.queries
        .filter(q => q.query === 'and')
        .every(query => this.verifyQuerySelector(query, collection));
    });

    return mergeObjectsInUnique(
      [...filteredOrQueries, ...filteredAndQueries],
      'id'
    );
  }

  protected generateFilterableQuery(args: any[], query: string) {
    if (args.length > 3 || args.length < 1) throw new Error('Invalid Query');

    if (
      args.length > 1 &&
      args.filter(arg => arg instanceof Object || arg instanceof Array).length
    ) {
      throw new Error('Invalid Query 3');
    }

    if (args.length === 1 && args[0] instanceof Object === false) {
      throw new Error('Invalid Query');
    }

    if (args.length === 1 && args[0] instanceof Object) {
      return Object.keys(args[0]).forEach((key: string) => {
        this.queries.push({
          key: key,
          selector: '=',
          value: args[0][key],
          query,
        });
      });
    }

    this.queries.push({
      key: args[0],
      selector: args.length === 2 ? '=' : args[1],
      value: args.length === 2 ? args[1] : args[2],
      query,
    });
  }

  public where(...args: any[]): QueryBuilder {
    this.generateFilterableQuery(args, 'and');

    return this;
  }

  public orWhere(...args: any[]): QueryBuilder {
    this.generateFilterableQuery(args, 'or');

    return this;
  }

  public get(): Collection {
    const filteredData = this.filterData();

    return new Collection(filteredData);
  }

  protected verifyQuerySelector(query: any, collection: any) {
    switch (query.selector) {
      case '=': {
        return collection[query.key] === query.value;
      }
      case '>': {
        return collection[query.key] > query.value;
      }
      default: {
        return false;
      }
    }
  }
}

export function mergeObjectsInUnique(array: any[], property: any): any[] {
  const newArray = new Map();

  array.forEach((item: any) => {
    const propertyValue = item[property];
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) })
      : newArray.set(propertyValue, item);
  });

  return Array.from(newArray.values());
}
