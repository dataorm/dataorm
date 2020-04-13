export class StringAttr implements ShouldBeValidField {
  protected model: any;
  protected isNull: boolean = false;
  protected isUnique: boolean = false;
  protected defaultValue: string | null = null;

  constructor(model: any) {
    this.model = model;
  }

  public nullable() {
    this.isNull = true;

    return this;
  }

  public unique() {
    this.isUnique = true;

    return this;
  }

  public default(defaultValue: any) {
    this.defaultValue = defaultValue;

    return this;
  }

  validate(data: any, key: string) {
    if (!this.isNull && !data[key]) {
      throw new Error(`${key} can not be null.`);
    }
  }
}
