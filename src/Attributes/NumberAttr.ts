export class NumberAttr implements ShouldBeValidField {
  protected model: any;
  protected isNull: boolean = false;
  protected isUnique: boolean = false;
  protected defaultValue: number | null = null;

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
    console.log(data, key);

    throw new Error('Method not implemented.');
  }
}
