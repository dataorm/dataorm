import { Container } from 'inversify';
import { Subject } from '../Observer/Subject';
import { Store } from '../Store/Store';
import { StoreConfig } from '../Store/StoreConfig';
import { TYPES } from './types';
import { QueryBuilder } from '../Store/QueryBuilder';
import { Query } from '../Store/Query';
import { Mutation } from '../Store/Mutation';

var container = new Container();

container
  .bind<Store>(TYPES.Store)
  .to(Store)
  .inSingletonScope();

container
  .bind<Subject>(TYPES.Subject)
  .to(Subject)
  .inSingletonScope();

container
  .bind<StoreConfig>(TYPES.StoreConfig)
  .to(StoreConfig)
  .inSingletonScope();

container
  .bind<Query>(TYPES.Query)
  .to(Query)
  .inSingletonScope();

container
  .bind<Mutation>(TYPES.Mutation)
  .to(Mutation)
  .inSingletonScope();

container
  .bind<QueryBuilder>(TYPES.QueryBuilder)
  .to(QueryBuilder)
  .inSingletonScope();

export { container };
