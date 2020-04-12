import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from './types';
import { Store } from '../Database/Store';

import getDecorators from 'inversify-inject-decorators';

const container = new Container();

container
  .bind<Store>(TYPES.Store)
  .to(Store)
  .inSingletonScope();

export { container };

export const { lazyInject } = getDecorators(container, false);
