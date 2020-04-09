export class DatetimeAttr {
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
}
