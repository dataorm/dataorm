import { Fields } from './Fields';

export class BooleanField extends Fields {
  protected value: boolean = false;
  protected isNullable: boolean = false;
  protected isUnique: boolean = true;

  constructor(model: any) {
    super(model);
  }

  public default(defaultValue: any) {
    this.value = defaultValue;

    return this;
  }

  public make() {}
}
