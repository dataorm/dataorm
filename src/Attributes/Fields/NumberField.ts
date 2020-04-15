import { Fields } from './Fields';

export class NumberField extends Fields {
  protected value: number | null = null;
  protected isNullable: boolean = false;
  protected isUnique: boolean = false;

  constructor(model: any) {
    super(model);
  }

  public nullable() {
    this.isNullable = true;

    return this;
  }

  public unique() {
    this.isUnique = true;

    return this;
  }

  public default(defaultValue: number) {
    this.value = defaultValue;

    return this;
  }

  make(data: any, key: string) {
    this.validate(data, key);
  }

  validate(data: any, key: string) {
    if (!this.isNullable && !data[key]) {
      throw new Error(`${key} can not be null.`);
    }
  }
}
