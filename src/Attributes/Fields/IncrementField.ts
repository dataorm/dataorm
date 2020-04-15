import { Fields } from './Fields';

export class IncrementField extends Fields {
  protected value: any = null;
  protected isNullable: boolean = false;
  protected isUnique: boolean = true;

  constructor(model: any) {
    super(model);
  }

  make(data: any, key: string) {
    this.validate(data, key);
  }

  validate(data: any, key: string) {
    if (
      key === this.model.primaryKey &&
      data[key] &&
      Math.sign(data[key]) !== 1
    ) {
      throw new Error('Primary key must be a positive number.');
    }
  }
}
