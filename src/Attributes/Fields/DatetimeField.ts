import { Fields } from './Fields';

export class DatetimeField extends Fields {
  protected value: string | null = null;
  protected isNullable: boolean = false;
  protected isUnique: boolean = true;

  constructor(model: any) {
    super(model);
  }

  public default(defaultValue: string | Date) {
    this.value =
      defaultValue instanceof Date ? defaultValue.toISOString() : defaultValue;

    return this;
  }

  make() {}
}
