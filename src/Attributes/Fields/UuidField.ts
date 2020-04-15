import { Fields } from './Fields';
import { v4 } from 'uuid';

export class UuidField extends Fields {
  protected value: any = v4();
  protected isNullable: boolean = false;
  protected isUnique: boolean = true;

  constructor(model: any) {
    super(model);
  }

  make() {}
}
