import { Container } from 'inversify';
import { Subject } from '../Observer/Subject';
import { Store } from '../Store/Store';
import { StoreConfig } from '../Store/StoreConfig';
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
  .bind<StoreConfig>(TYPES.StoreConfig)
  .to(StoreConfig)
  .inSingletonScope();

export { container };
