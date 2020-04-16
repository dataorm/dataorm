import { Container } from 'inversify';
import { Subject } from '../Observer/Subject';
import { Database } from '../Store/Database';
import { Store } from '../Store/Store';
import { TYPES } from './types';

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
  .bind<Database>(TYPES.Database)
  .to(Database)
  .inSingletonScope();

export { container };
