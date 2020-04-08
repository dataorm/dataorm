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
    return this.queries.filter(q => {
      if (q.value instanceof Object || q.value instanceof Array) {
        throw new Error('Invalid Query');
      }

      //   switch (q.modifier) {
      //   case '=': {
      //     const queryResult = this.data.filter(
      //       user => user[q.key] === q.value
      //     );

      //     console.log(queryResult);

      //     if (q.selector === 'orWhere') {
      //       this.filteredData = [...this.filteredData, ...queryResult];
      //     } else {
      //       this.filteredData = queryResult;
      //     }
      //   }
      // }

      return true;
    });
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
          modifier: '=',
          value: args[0][key],
          query,
        });
      });
    }

    this.queries.push({
      key: args[0],
      modifier: args.length === 2 ? '=' : args[1],
      value: args.length === 2 ? args[1] : args[2],
      query,
    });
  }

  public where(...args: any[]): QueryBuilder {
    this.generateFilterableQuery(args, 'where');

    return this;
  }

  public orWhere(...args: any[]): QueryBuilder {
    this.generateFilterableQuery(args, 'orWhere');

    return this;
  }

  public get(): Collection {
    const filteredData = this.filterData();

    return new Collection(filteredData);
  }
}
