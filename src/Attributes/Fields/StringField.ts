import { Fields } from './Fields';

export class StringField extends Fields {
  protected value: string | null = null;
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

  public default(defaultValue: string | Date) {
    this.value =
      defaultValue instanceof Date ? defaultValue.toISOString() : defaultValue;

    return this;
  }

  make(data: any, key: string) {
    this.validate(data, key);

    return data ? data : this.value;
  }

  validate(data: any, key: string) {
    if (!this.isNullable && !this.value && !data) {
      throw new Error(`${key} can not be null.`);
    }
  }
}
