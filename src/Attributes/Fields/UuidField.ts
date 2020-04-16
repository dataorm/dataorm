import { Fields } from './Fields';
import { v4 } from 'uuid';

export class UuidField extends Fields {
  protected value: string = v4();
  protected isNullable: boolean = false;
  protected isUnique: boolean = true;

  constructor(model: any) {
    super(model);
  }

  make(data: any, key: string) {
    this.validate(data, key);

    if (data[key]) {
      return data[key];
    }

    return this.value;
  }

  validate(data: any, key: string) {
    if (
      key === this.model.primaryKey &&
      data[key] &&
      !data[key].match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    ) {
      throw new Error('Primary key must be a valid UUID.');
    }
  }
}
