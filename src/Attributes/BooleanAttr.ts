export class BooleanAttr implements ShouldBeValidField {
  protected model: any;
  protected defaultValue: boolean = false;

  constructor(model: any) {
    this.model = model;
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
