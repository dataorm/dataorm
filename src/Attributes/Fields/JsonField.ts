import { Fields } from './Fields';

export class JsonField extends Fields {
  protected value: any = null;
  protected isNullable: boolean = true;
  protected isUnique: boolean = false;

  constructor(model: any) {
    super(model);
  }

  public nullable() {
    this.isNullable = true;

    return this;
  }

  make(data: any, key: string) {
    this.validate(data, key);
  }

  validate(data: any, key: string) {
    if (
      data[key] instanceof Object === false ||
      data[key] instanceof Array === false
    ) {
      throw new Error('Not a valid JSON.');
    }
  }
}
