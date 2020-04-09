import { Database } from '../Database/DB';
import { Collection } from './Collection';
import { DB } from '../Database/DBConfig';
import { mergeObjectsInUnique } from '../Utils/unique';

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

  public update(updatableData: any) {
    const updatableRecords = this.filterData();

    return this.db.dispatch({
      type: 'update',
      payload: {
        model: this.model,
        data: {
          updatableData,
          updatableRecords,
        },
      },
    });
  }

  public get(): Collection {
    const filteredData = this.filterData();

    return new Collection().fromArray(filteredData);
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

  public orderBy(key: string, value: keyof { asc: 'asc'; desc: 'desc' }) {
    this.collection.sort((a: any, b: any) => {
      const param1 = a[key];
      const param2 = b[key];

      if (typeof param1 === 'string' && typeof param2 === 'string') {
        if (value === 'asc') {
          return param1 < param2 ? -1 : 1;
        }

        if (value === 'desc') {
          return param1 > param2 ? 1 : -1;
        }

        return 0;
      }

      if (typeof param1 === 'number' && typeof param2 === 'number') {
        if (value === 'asc') {
          return param1 - param2 ? -1 : 1;
        }

        if (value === 'desc') {
          return param1 - param2 ? 1 : -1;
        }

        return 0;
      }

      return 0;
    });

    return this;
  }

  public take(limit: number) {
    return this.collection.splice(0, limit);
  }

  public count() {
    return this.collection.length;
  }
}
