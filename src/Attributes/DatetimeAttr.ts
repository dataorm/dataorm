export class DatetimeAttr implements ShouldBeValidField {
  protected model: any;
  protected defaultValue: string | null = null;

  constructor(model: any) {
    this.model = model;
  }

  public default(defaultValue: string | Date) {
    this.defaultValue =
      defaultValue instanceof Date ? defaultValue.toISOString() : defaultValue;

    return this;
  }

  validate(data: any, key: string) {
    console.log(data, key);

    throw new Error('Method not implemented.');
  }
}
