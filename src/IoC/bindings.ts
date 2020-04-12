import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';

import { Container } from 'inversify';
import { TYPES } from './types';

import { Store } from '../Database/Store';
import { StoreConfig } from '../Store/StoreConfig';

const container = new Container();

container
  .bind<Store>(TYPES.Store)
  .to(Store)
  .inSingletonScope();

container
  .bind<StoreConfig>(TYPES.StoreConfig)
  .to(StoreConfig)
  .inSingletonScope();

export { container };

export const { lazyInject } = getDecorators(container, false);
