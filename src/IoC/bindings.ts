import 'reflect-metadata';

import { Container } from 'inversify';
import { Store } from '../Store/Store';
import { Subject } from '../Observer/Subject';

const container = new Container();

container
  .bind<Store>('Store')
  .to(Store)
  .inSingletonScope();

container
  .bind<Subject>('Subject')
  .to(Subject)
  .inSingletonScope();

export { container };
